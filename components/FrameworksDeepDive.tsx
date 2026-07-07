"use client";

import { motion } from "motion/react";
import { LuLink, LuArrowRightLeft, LuServer, LuSlidersHorizontal } from "react-icons/lu";
import { aiFrameworks, type Capability } from "@/lib/content";

const icons = [LuLink, LuArrowRightLeft, LuServer, LuSlidersHorizontal];
const visuals = [LangChainVisual, RouterVisual, OpenSourceVisual, FineTuneVisual];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function FrameworksDeepDive({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <div className="mt-24">
      {showHeading && (
        <>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Frameworks that tie it all together
          </h2>
          <p className="mt-3 max-w-xl text-lg opacity-70">
            The tooling layer — orchestration, model integration and fine-tuning
            — that turns raw models into solutions that speak your business.
          </p>
        </>
      )}

      <div className={`${showHeading ? "mt-16" : ""} space-y-24 sm:space-y-36`}>
        {aiFrameworks.map((item, i) => (
          <FrameworkSection key={item.slug} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function FrameworkSection({ item, index }: { item: Capability; index: number }) {
  const Icon = icons[index];
  const Visual = visuals[index];
  const flipped = index % 2 === 1;

  return (
    <motion.section
      id={item.slug}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, staggerChildren: 0.08 }}
      className="grid min-h-[58vh] scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div
        variants={fadeUp}
        className={`lg:max-w-md ${flipped ? "lg:order-2 lg:ml-auto" : ""}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <Icon size={26} />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
            0{index + 1} / Framework
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {item.name}
        </h3>
        <p className="mt-2 font-[family-name:var(--font-playfair)] text-xl italic text-brand-royal dark:text-brand-sky">
          {item.tagline}
        </p>
        <p className="mt-4 text-base leading-relaxed opacity-75">{item.body}</p>

        <ul className="mt-7 space-y-4">
          {item.points.map((p) => (
            <li key={p.label} className="flex gap-3.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>
                <span className="font-bold">{p.label}</span>
                <span className="opacity-70"> — {p.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 inline-flex items-baseline gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2">
          <span className="bg-gradient-to-r from-[#3F56A4] to-[#33A5DB] bg-clip-text text-xl font-extrabold text-transparent">
            {item.metric.value}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide opacity-60">
            {item.metric.label}
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`flex items-center justify-center ${flipped ? "lg:order-1" : ""}`}
      >
        <Visual />
      </motion.div>
    </motion.section>
  );
}

/* ----------------------------- Visuals ----------------------------- */

function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
      {children}
    </div>
  );
}

function Pill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-1.5 text-xs font-bold shadow-sm transition ${
        active
          ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
          : "border-indigo-500/20 bg-[var(--background)]"
      }`}
    >
      {children}
    </div>
  );
}

// 01 — LangChain: a chain of steps with a pulse traveling through.
function LangChainVisual() {
  const steps = ["Prompt", "LLM", "Tool", "Output"];
  return (
    <VisualShell>
      <div className="flex h-full flex-col items-center justify-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <motion.div
              animate={{
                borderColor: [
                  "rgba(99,102,241,0.2)",
                  "rgba(99,102,241,0.7)",
                  "rgba(99,102,241,0.2)",
                ],
                backgroundColor: [
                  "rgba(99,102,241,0)",
                  "rgba(99,102,241,0.12)",
                  "rgba(99,102,241,0)",
                ],
              }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.8, times: [0, 0.5, 1] }}
              className="w-36 rounded-lg border px-3 py-1.5 text-center text-xs font-bold shadow-sm"
            >
              {s}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="h-4 w-px bg-indigo-500/30" />
            )}
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

// 02 — Custom LLM: one request routed to whichever model fits, cycling.
function RouterVisual() {
  const models = ["GPT-4", "Claude", "Llama 3"];
  return (
    <VisualShell>
      <div className="flex h-full items-center justify-between gap-4">
        <Pill active>Request</Pill>
        <div className="flex flex-1 flex-col gap-3">
          {models.map((m, i) => (
            <div key={m} className="flex items-center gap-2">
              <motion.div
                className="h-px flex-1 origin-left bg-indigo-500/40"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i, times: [0, 0.5, 1] }}
              />
              <motion.div
                animate={{
                  borderColor: ["rgba(99,102,241,0.2)", "rgba(99,102,241,0.7)", "rgba(99,102,241,0.2)"],
                  backgroundColor: ["rgba(99,102,241,0)", "rgba(99,102,241,0.15)", "rgba(99,102,241,0)"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i, times: [0, 0.5, 1] }}
                className="rounded-lg border px-3 py-1.5 text-xs font-bold shadow-sm"
              >
                {m}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

// 03 — Open-source: models running inside your own cloud boundary.
function OpenSourceVisual() {
  const models = ["Llama 3", "Mistral", "Phi-3", "Gemma"];
  return (
    <VisualShell>
      <div className="flex h-full items-center justify-center">
        <div className="relative rounded-2xl border-2 border-dashed border-indigo-500/40 p-6">
          <span className="absolute -top-2.5 left-4 bg-[var(--background)] px-2 text-[10px] font-bold uppercase tracking-wide text-indigo-500">
            Your cloud
          </span>
          <div className="grid grid-cols-2 gap-3">
            {models.map((m, i) => (
              <motion.div
                key={m}
                animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                <Pill>{m}</Pill>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

// 04 — Fine-tuning: tuning sliders converging a base model to your data.
function FineTuneVisual() {
  const sliders = [0.7, 0.4, 0.85];
  return (
    <VisualShell>
      <div className="flex h-full flex-col justify-center gap-6">
        <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide opacity-60">
          <span>Base model</span>
          <span className="text-indigo-500">Tuned →</span>
        </div>
        {sliders.map((v, i) => (
          <div key={i} className="relative h-1.5 rounded-full bg-black/10 dark:bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#3F56A4] to-[#33A5DB]"
              animate={{ width: [`${v * 40}%`, `${v * 100}%`, `${v * 40}%`] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-500 bg-[var(--background)] shadow"
              animate={{ left: [`${v * 40}%`, `${v * 100}%`, `${v * 40}%`] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

export default FrameworksDeepDive;
