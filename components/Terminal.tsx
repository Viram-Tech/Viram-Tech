"use client";

import { motion } from "motion/react";

const lines: { text: string; tone: "cmd" | "ok" | "note" }[] = [
  { text: "$ viramtech deploy --env production", tone: "cmd" },
  { text: "✓ Building model pipeline", tone: "ok" },
  { text: "✓ Provisioning multi-cloud infra (AWS · GCP · Azure)", tone: "ok" },
  { text: "✓ Eval suite passed — 94% accuracy", tone: "ok" },
  { text: "→ Live in 4m 12s · monitoring enabled", tone: "note" },
];

export function Terminal({ className }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0c111c] shadow-2xl ${className ?? ""}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-white/40">
          viramtech — zsh
        </span>
      </div>

      {/* Body — lines reveal in sequence when scrolled into view */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.5 } } }}
        className="space-y-1.5 p-5 font-mono text-sm leading-relaxed"
      >
        {lines.map((l, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0 },
            }}
            className={
              l.tone === "cmd"
                ? "text-white"
                : l.tone === "ok"
                  ? "text-[#33A5DB]"
                  : "text-white/60"
            }
          >
            {l.text}
          </motion.p>
        ))}
        <motion.span
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="inline-block h-4 w-2 animate-pulse bg-[#33A5DB] align-middle motion-reduce:animate-none"
        />
      </motion.div>
    </div>
  );
}

export default Terminal;
