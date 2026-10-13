import { NextResponse } from "next/server";
import { roles } from "@/lib/careers";
import { saveApplication } from "@/lib/careers-notion";

// Needs a request per call and must never be prerendered or cached.
export const dynamic = "force-dynamic";

// Keep in sync with MAX_RESUME_MB in components/ApplicationForm.tsx. Vercel
// caps request bodies at 4.5 MB and Notion's free plan files at 5 MB.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const RESUME_TYPES: Record<string, { mime: string; magic: number[] }> = {
  ".pdf": { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  ".docx": {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04], // zip
  },
  ".doc": { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
};
const ALLOWED_ROLES = new Set(["General application", ...roles.map((r) => r.title)]);
const MIN_FILL_MS = 3000; // faster than this is a bot

/**
 * In-memory limits: per IP and per email. Like lib/chat/rateLimit.ts, they
 * don't hold across serverless instances — fine for a careers form.
 */
const IP_LIMIT = { max: 5, windowMs: 60 * 60_000 };
const EMAIL_COOLDOWN_MS = 10 * 60_000;
const ipHits = new Map<string, { count: number; resetAt: number }>();
const emailSeen = new Map<string, number>();

function tooMany(ip: string, email: string): string | null {
  const now = Date.now();
  if (now - (emailSeen.get(email) ?? 0) < EMAIL_COOLDOWN_MS) {
    return "We already received an application from this email address. Please wait a few minutes before sending another.";
  }
  const entry = ipHits.get(ip);
  if (entry && now < entry.resetAt && entry.count >= IP_LIMIT.max) {
    return "Too many applications from your network. Please try again in an hour.";
  }
  return null;
}

function recordSubmission(ip: string, email: string) {
  const now = Date.now();
  emailSeen.set(email, now);
  const entry = ipHits.get(ip);
  if (!entry || now >= entry.resetAt) ipHits.set(ip, { count: 1, resetAt: now + IP_LIMIT.windowMs });
  else entry.count += 1;
  if (ipHits.size > 5000) for (const [k, v] of ipHits) if (now >= v.resetAt) ipHits.delete(k);
  if (emailSeen.size > 5000)
    for (const [k, t] of emailSeen) if (now - t >= EMAIL_COOLDOWN_MS) emailSeen.delete(k);
}

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_CAREERS_DATABASE_ID) {
    console.error("[careers] NOTION_TOKEN / NOTION_CAREERS_DATABASE_ID not set — see integrations/careers-notion/SETUP.md");
    return fail("Applications aren't open just yet — please try again later.", 503);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Malformed request.");
  }
  const text = (key: string, max: number) => String(form.get(key) ?? "").trim().slice(0, max);

  // Honeypot filled or submitted impossibly fast: report success, store nothing.
  if (text("website", 200) || Number(form.get("elapsedMs")) < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const app = {
    role: text("role", 120),
    firstName: text("firstName", 80),
    lastName: text("lastName", 80),
    email: text("email", 200).toLowerCase(),
    linkedin: text("linkedin", 300),
    note: text("note", 4000),
  };
  if (!ALLOWED_ROLES.has(app.role)) return fail("Unknown role.");
  if (!app.firstName || !app.lastName) return fail("Please fill in all required fields.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(app.email)) return fail("Please enter a valid email address.");
  if (!/^https?:\/\/\S+$/i.test(app.linkedin))
    return fail("The LinkedIn / portfolio link must start with https://");
  if (form.get("consent") !== "on") return fail("Please agree to the storage of your application.");

  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) return fail("Please attach your résumé.");
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const type = RESUME_TYPES[ext];
  if (!type) return fail("Please attach your résumé as a PDF, DOC or DOCX file.");
  if (file.size > MAX_RESUME_BYTES) return fail("Your résumé is larger than 4 MB.");
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  if (!type.magic.every((b, i) => head[i] === b)) {
    return fail("That file doesn't look like a valid PDF, DOC or DOCX.");
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const limited = tooMany(ip, app.email);
  if (limited) return fail(limited, 429);

  try {
    await saveApplication({
      ...app,
      resume: new File([file], file.name, { type: type.mime }),
    });
  } catch (err) {
    console.error("[careers] saving to Notion failed:", err);
    return fail("Something went wrong on our side. Please try again later.", 502);
  }
  recordSubmission(ip, app.email);
  return NextResponse.json({ ok: true });
}
