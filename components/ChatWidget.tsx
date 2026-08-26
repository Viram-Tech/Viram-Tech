"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuX, LuSend } from "react-icons/lu";

type Message = { role: "user" | "assistant"; content: string; at: string };

const GREETING =
  "Hi — I'm the ViramTech assistant. I can answer questions about our AI products, the industries we work in, and our technology.";

/** Starter prompts, chosen because the site content can actually answer them. */
const SUGGESTIONS = [
  "What AI products do you offer?",
  "Do you work with banking?",
  "What's in your tech stack?",
];

const MAX_CHARS = 500;

const now = () =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

/** Brand mark on a glass disc with a soft glow behind it. */
function LogoBadge({ size = 34 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/80 shadow-[0_2px_10px_rgba(20,40,78,0.18)] dark:border-white/20 dark:bg-white/15"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand-sky/50 blur-md"
      />
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="h-[55%] w-auto"
      />
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  // The widget is client-only (ssr: false), so there is no server render to
  // mismatch — the greeting timestamp can be built during the first render.
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: GREETING, at: now() },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    const next: Message[] = [
      ...messages,
      { role: "user", content: question.trim(), at: now() },
    ];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Drop the canned greeting — it is UI, not conversation.
        body: JSON.stringify({
          messages: next
            .slice(1)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            data.answer ?? data.error ?? "Something went wrong. Please try again.",
          at: now(),
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "I couldn't reach the server. Please try again.",
          at: now(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const showSuggestions = messages.length <= 1 && !busy;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Ask ViramTech"
          className="relative mb-3 flex h-[30rem] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/65 shadow-[0_24px_70px_rgba(20,40,78,0.28)] backdrop-blur-2xl dark:border-white/12 dark:bg-brand-navy/55"
        >
          {/* Ambient brand wash behind the frosted surface */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-sky/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-brand-royal/25 blur-3xl"
          />

          {/* Header */}
          <div className="relative flex items-start gap-3 border-b border-white/40 px-5 py-4 dark:border-white/10">
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight tracking-tight text-brand-navy dark:text-white">
                ViramTech Assistant
              </p>
              <p className="mt-0.5 truncate text-xs text-brand-navy/55 dark:text-white/55">
                Answers drawn from this site
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition hover:bg-brand-slate dark:bg-white/15 dark:hover:bg-white/25"
            >
              <LuX size={15} />
            </button>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="relative flex-1 space-y-4 overflow-y-auto px-5 py-4"
          >
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="flex gap-2.5">
                  <LogoBadge size={28} />
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-semibold text-brand-navy dark:text-white">
                      ViramTech
                      <span className="ml-1.5 font-normal opacity-50">
                        · {m.at}
                      </span>
                    </p>
                    <div className="rounded-2xl rounded-tl-md border border-white/60 bg-white/75 px-3.5 py-2.5 text-[13px] leading-relaxed text-brand-navy shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-white/90">
                      {m.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-end">
                  <p className="mb-1 text-xs font-semibold text-brand-navy dark:text-white">
                    <span className="mr-1.5 font-normal opacity-50">
                      {m.at} ·
                    </span>
                    You
                  </p>
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-to-br from-brand-royal to-brand-slate px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-md">
                    {m.content}
                  </div>
                </div>
              ),
            )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pl-[38px]">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-brand-royal/25 bg-brand-royal/10 px-3 py-1.5 text-[12px] font-medium text-brand-royal transition hover:bg-brand-royal/20 dark:border-brand-sky/30 dark:bg-brand-sky/10 dark:text-brand-sky dark:hover:bg-brand-sky/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {busy && (
              <div className="flex gap-2.5">
                <LogoBadge size={28} />
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-white/60 bg-white/75 px-3.5 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-royal/60 dark:bg-brand-sky/70"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="relative border-t border-white/40 px-4 py-3.5 dark:border-white/10"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/70 py-1.5 pl-4 pr-1.5 shadow-sm backdrop-blur-sm dark:border-white/12 dark:bg-white/10">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                placeholder="Type message…"
                aria-label="Your question"
                maxLength={MAX_CHARS}
                className="flex-1 bg-transparent text-[13px] text-brand-navy outline-none placeholder:text-brand-navy/40 dark:text-white dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-royal to-brand-sky text-white shadow-md transition hover:brightness-110 disabled:opacity-40"
              >
                <LuSend size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask ViramTech"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/80 shadow-[0_10px_30px_rgba(20,40,78,0.3)] backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/15"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand-sky/50 blur-lg"
        />
        {open ? (
          <LuX size={20} className="text-brand-navy dark:text-white" />
        ) : (
          <Image src="/logo.svg" alt="" width={30} height={26} className="h-6 w-auto" />
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
