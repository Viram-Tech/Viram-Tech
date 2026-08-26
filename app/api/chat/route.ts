import { NextResponse } from "next/server";
import { coreFacts, retrieve, estimateTokens } from "@/lib/chat/corpus";
import {
  LIMITS,
  REFUSAL,
  buildSystemPrompt,
  stripDisallowedLinks,
  validateQuestion,
} from "@/lib/chat/guardrails";
import { checkRateLimit } from "@/lib/chat/rateLimit";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// Needs a request per call and must never be prerendered or cached.
export const dynamic = "force-dynamic";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
/**
 * Free OpenRouter models share one global quota, so any single `:free` slug
 * returns 429 "temporarily rate-limited upstream" at unpredictable times.
 * OpenRouter's `models` array routes to the first one that is actually up, so
 * a busy pool degrades to a slower model instead of a broken widget.
 */
const PRIMARY = process.env.OPENROUTER_MODEL ?? "google/gemma-4-31b-it:free";
const FALLBACKS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "minimax/minimax-m3:free",
];
// OpenRouter rejects a `models` array longer than 3.
const MODELS = [...new Set([PRIMARY, ...FALLBACKS])].slice(0, 3);

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    // Never leak configuration detail to the browser.
    console.error("[chat] OPENROUTER_API_KEY is not set");
    return NextResponse.json(
      { error: "The assistant is not available right now." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "That's a lot of questions! Give it a minute and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let payload: { messages?: ClientMessage[] };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const history = Array.isArray(payload.messages) ? payload.messages : [];
  const last = history.at(-1);
  if (!last || last.role !== "user") {
    return NextResponse.json({ error: "No question provided." }, { status: 400 });
  }

  const checked = validateQuestion(last.content);
  if (!checked.ok) {
    return NextResponse.json({ error: checked.reason }, { status: 400 });
  }
  const { question } = checked;

  // Only the sections that match the question are sent, and only the most
  // recent turns of history — both bound the prompt size per request.
  const { picked } = await retrieve(question, LIMITS.retrievalBudgetTokens);
  const system = buildSystemPrompt(coreFacts(), picked);

  const trimmed = history
    .slice(-LIMITS.maxHistoryMessages)
    .filter((m) => m && typeof m.content === "string")
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content.slice(0, LIMITS.maxQuestionChars),
    }));

  const body = JSON.stringify({
    model: MODELS[0],
    models: MODELS,
    messages: [{ role: "system", content: system }, ...trimmed],
    max_tokens: LIMITS.maxOutputTokens,
    temperature: 0.2,
  });

  const deadline = Date.now() + LIMITS.requestTimeoutMs;

  /**
   * The whole free pool can be rate-limited for a second or two at a time, and
   * OpenRouter's own `models` fallback only helps when at least one candidate
   * is free right then. A couple of quick retries ride out that window.
   */
  async function callUpstream(): Promise<Response> {
    let last: Response | null = null;
    for (let attempt = 0; attempt < LIMITS.upstreamAttempts; attempt++) {
      if (attempt > 0) {
        const wait = Math.min(LIMITS.retryBackoffMs * attempt, deadline - Date.now());
        if (wait <= 0) break;
        await new Promise((r) => setTimeout(r, wait));
      }
      const perAttempt = new AbortController();
      const t = setTimeout(() => perAttempt.abort(), Math.max(1000, deadline - Date.now()));
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          signal: perAttempt.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            // OpenRouter attribution headers.
            "HTTP-Referer": SITE_URL,
            "X-Title": SITE_NAME,
          },
          body,
        });
        // Only a busy pool or a provider blip is worth another attempt.
        if (res.ok || (res.status !== 429 && res.status < 500)) return res;
        last = res;
      } finally {
        clearTimeout(t);
      }
    }
    return last ?? new Response("", { status: 502 });
  }

  try {
    const upstream = await callUpstream();

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error(`[chat] upstream ${upstream.status}: ${detail.slice(0, 300)}`);
      const busy = upstream.status === 429;
      return NextResponse.json(
        {
          error: busy
            ? "I'm getting a lot of requests right now. Give it a few seconds and ask again."
            : "I couldn't reach the assistant. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    const data = await upstream.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";
    const answer = stripDisallowedLinks(raw.trim()) || REFUSAL;
    const usage = data?.usage ?? {};
    const served = data?.model ?? MODELS[0];

    // Unanswered questions are a content roadmap; log them for review.
    console.log(
      `[chat] model=${served} q=${JSON.stringify(question.slice(0, 120))} sections=${picked
        .map((p) => p.path)
        .join(",")} prompt_tokens=${usage.prompt_tokens ?? estimateTokens(system)} completion_tokens=${
        usage.completion_tokens ?? "?"
      }${answer.startsWith(REFUSAL.slice(0, 30)) ? " REFUSED" : ""}`,
    );

    return NextResponse.json({ answer });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    console.error(`[chat] ${aborted ? "timeout" : "error"}:`, err);
    return NextResponse.json(
      { error: "That took too long. Please try again." },
      { status: aborted ? 504 : 500 },
    );
  }
}
