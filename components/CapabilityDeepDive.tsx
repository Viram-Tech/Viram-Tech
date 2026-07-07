"use client";

import { motion } from "motion/react";
import {
  LuLanguages,
  LuEye,
  LuAudioLines,
  LuTrendingUp,
  LuBot,
} from "react-icons/lu";
import { aiCapabilities, type Capability } from "@/lib/content";

const icons = [LuLanguages, LuEye, LuAudioLines, LuTrendingUp, LuBot];

// Map each capability to the bespoke visual that explains it best.
const visuals = [NlpVisual, VisionVisual, SpeechVisual, ForecastVisual, AgentVisual];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function CapabilityDeepDive() {
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Capabilities for every business need
      </h2>
      <p className="mt-3 max-w-xl text-lg opacity-70">
        Five core AI capabilities power everything we build — here&apos;s how each
        one turns into business value.
      </p>

      <div className="mt-16 space-y-24 sm:space-y-36">
        {aiCapabilities.map((cap, i) => (
          <CapabilitySection key={cap.slug} cap={cap} index={i} />
        ))}
      </div>
    </div>
  );
}

function CapabilitySection({ cap, index }: { cap: Capability; index: number }) {
  const Icon = icons[index];
  const Visual = visuals[index];
  const flipped = index % 2 === 1;

  return (
    <motion.section
      id={cap.slug}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, staggerChildren: 0.08 }}
      className="grid min-h-[58vh] scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      {/* Copy — a left-aligned block, pushed to the right edge when flipped */}
      <motion.div
        variants={fadeUp}
        className={`lg:max-w-md ${flipped ? "lg:order-2 lg:ml-auto" : ""}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <Icon size={26} />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
            0{index + 1} / Capability
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {cap.name}
        </h3>
        <p className="mt-2 font-[family-name:var(--font-playfair)] text-xl italic text-brand-royal dark:text-brand-sky">
          {cap.tagline}
        </p>
        <p className="mt-4 text-base leading-relaxed opacity-75">{cap.body}</p>

        <ul className="mt-7 space-y-4">
          {cap.points.map((p) => (
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
            {cap.metric.value}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide opacity-60">
            {cap.metric.label}
          </span>
        </div>
      </motion.div>

      {/* Visual */}
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

// 01 — NLP: a sentence with highlighted entities + intent/sentiment bars.
function NlpVisual() {
  const bars = [
    { label: "Intent · Refund request", value: 0.97, color: "#3F56A4" },
    { label: "Urgency", value: 0.74, color: "#33A5DB" },
    { label: "Sentiment · Negative", value: 0.61, color: "#A05BD3" },
  ];
  return (
    <VisualShell>
      <p className="text-sm leading-7">
        Please refund the{" "}
        <span className="rounded bg-indigo-500/15 px-1 font-semibold text-indigo-600 dark:text-indigo-300">
          ₹4,200
        </span>{" "}
        charged on invoice{" "}
        <span className="rounded bg-sky-500/15 px-1 font-semibold text-sky-600 dark:text-sky-300">
          #A-2231
        </span>{" "}
        by{" "}
        <span className="rounded bg-violet-500/15 px-1 font-semibold text-violet-600 dark:text-violet-300">
          Friday
        </span>
        .
      </p>
      <div className="mt-6 space-y-3">
        {bars.map((b, i) => (
          <div key={b.label}>
            <div className="mb-1 flex justify-between text-[11px] opacity-70">
              <span>{b.label}</span>
              <span>{Math.round(b.value * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: b.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${b.value * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </VisualShell>
  );
}

// 02 — Computer Vision: image frame with animated detection boxes + scan line.
function VisionVisual() {
  const boxes = [
    { top: "16%", left: "12%", w: "34%", h: "40%", label: "Person · 0.98" },
    { top: "44%", left: "55%", w: "32%", h: "34%", label: "Package · 0.94" },
    { top: "20%", left: "62%", w: "24%", h: "20%", label: "Label · 0.89" },
  ];
  return (
    <VisualShell>
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1c2b54] via-[#26407a] to-[#33A5DB]/60">
        {/* scanning line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-cyan-300/80 shadow-[0_0_12px_2px_rgba(103,232,249,0.6)]"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {boxes.map((b, i) => (
          <motion.div
            key={b.label}
            className="absolute rounded border-2 border-cyan-300/90"
            style={{ top: b.top, left: b.left, width: b.w, height: b.h }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.25 }}
          >
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-cyan-300 px-1.5 py-0.5 text-[10px] font-bold text-[#102a43]">
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>
    </VisualShell>
  );
}

// 03 — Speech: animated waveform + streaming transcript.
function SpeechVisual() {
  const heights = [0.4, 0.7, 0.35, 0.9, 0.55, 0.8, 0.3, 0.65, 0.95, 0.45, 0.75, 0.5, 0.85, 0.4, 0.6];
  return (
    <VisualShell>
      <div className="flex h-1/2 items-center justify-center gap-1.5">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#3F56A4] to-[#33A5DB]"
            initial={{ scaleY: 0.2 }}
            animate={{ scaleY: [0.2, h, 0.3, h * 0.8, 0.2] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.06,
              ease: "easeInOut",
            }}
            style={{ height: 70, originY: 1 }}
          />
        ))}
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
            Speaker 1
          </span>
          <motion.span
            className="text-xs opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            &ldquo;Can you check my order status?&rdquo;
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-300">
            Agent
          </span>
          <motion.span
            className="text-xs opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            &ldquo;It ships tomorrow.&rdquo;
          </motion.span>
        </div>
      </div>
    </VisualShell>
  );
}

// 04 — Predictive Analytics: line chart with history + dashed forecast + band.
function ForecastVisual() {
  // points (x 0..300, y 0..150 — lower y = higher value)
  const history = "0,120 50,95 100,105 150,70 200,80 250,55";
  const forecast = "250,55 300,30";
  const band = "250,75 300,52 300,8 250,35";
  return (
    <VisualShell>
      <svg viewBox="0 0 300 160" className="h-full w-full">
        {/* grid */}
        {[40, 80, 120].map((y) => (
          <line
            key={y}
            x1="0"
            x2="300"
            y1={y}
            y2={y}
            className="stroke-black/5 dark:stroke-white/10"
            strokeWidth="1"
          />
        ))}
        {/* confidence band */}
        <motion.polygon
          points={band}
          className="fill-[#33A5DB]/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        {/* history line — draws on mount */}
        <motion.polyline
          points={history}
          fill="none"
          className="stroke-[#3F56A4]"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {/* forecast line (dashed) — fade in (manual dash, so no pathLength) */}
        <motion.polyline
          points={forecast}
          fill="none"
          className="stroke-[#33A5DB]"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        {/* forecast endpoint */}
        <motion.circle
          cx="300"
          cy="30"
          r="5"
          className="fill-[#33A5DB]"
          style={{ transformOrigin: "300px 30px" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide opacity-50">
        <span>History</span>
        <span>Forecast →</span>
      </div>
    </VisualShell>
  );
}

// 05 — Agentic: a perceive→plan→act→verify loop with a traveling dot.
function AgentVisual() {
  const nodes = [
    { label: "Perceive", x: 50, y: 14 },
    { label: "Plan", x: 88, y: 50 },
    { label: "Act", x: 50, y: 86 },
    { label: "Verify", x: 12, y: 50 },
  ];
  return (
    <VisualShell>
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative aspect-square w-full max-w-[240px]">
          {/* rotating ring + dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-indigo-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-indigo-500 shadow-[0_0_12px_2px_rgba(99,102,241,0.6)]" />
          </motion.div>

          {/* center label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-500/80">
              Agent
            </span>
          </div>

          {/* nodes */}
          {nodes.map((n, i) => (
            <motion.div
              key={n.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-500/25 bg-[var(--background)] px-3 py-1.5 text-xs font-bold shadow-sm"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.18, type: "spring" }}
            >
              {n.label}
            </motion.div>
          ))}
        </div>
      </div>
    </VisualShell>
  );
}

export default CapabilityDeepDive;
