"use client";

import { motion } from "motion/react";
import { LuCloud, LuInfinity, LuBoxes, LuShieldCheck, LuLock } from "react-icons/lu";
import { infrastructureComponents, type Capability } from "@/lib/content";

const icons = [LuCloud, LuInfinity, LuBoxes, LuShieldCheck];
const visuals = [MultiCloudVisual, PipelineVisual, MicroservicesVisual, SecurityVisual];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function InfrastructureDeepDive({
  className = "mt-24",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Infrastructure that scales with you
      </h2>
      <p className="mt-3 max-w-xl text-lg opacity-70">
        The backbone that keeps every solution running — portable, automated and
        secure enough for real production load.
      </p>

      <div className="mt-12 space-y-10 sm:space-y-16">
        {infrastructureComponents.map((item, i) => (
          <InfraSection key={item.slug} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function InfraSection({ item, index }: { item: Capability; index: number }) {
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
      className="grid min-h-[58vh] scroll-mt-28 items-center gap-10 rounded-3xl border border-black/5 bg-black/[0.015] p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <motion.div variants={fadeUp} className={flipped ? "lg:order-2" : ""}>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <Icon size={26} />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
            0{index + 1} / Infrastructure
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {item.name}
        </h3>
        <p className="mt-2 text-lg font-semibold text-indigo-600 dark:text-indigo-300">
          {item.tagline}
        </p>
        <p className="mt-4 max-w-md text-base leading-relaxed opacity-75">{item.body}</p>

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

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-indigo-500/20 bg-[var(--background)] px-3 py-1.5 text-xs font-bold shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

// 01 — Multi-cloud: one workload feeding three clouds, with flowing connectors.
function MultiCloudVisual() {
  const clouds: { name: string; x: number; y: number }[] = [
    { name: "AWS", x: 50, y: 12 },
    { name: "GCP", x: 16, y: 84 },
    { name: "Azure", x: 84, y: 84 },
  ];
  return (
    <VisualShell>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {clouds.map((c) => (
            <motion.line
              key={c.name}
              x1="50"
              y1="50"
              x2={c.x}
              y2={c.y}
              className="stroke-indigo-500/40"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              animate={{ strokeDashoffset: [0, -12] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </svg>

        <Chip className="absolute left-1/2 top-1/2 border-indigo-500/40 bg-indigo-500/10">
          <LuCloud className="mr-1.5 text-indigo-500" size={14} /> Your workload
        </Chip>

        {clouds.map((c) => (
          <motion.div
            key={c.name}
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Chip>{c.name}</Chip>
          </motion.div>
        ))}
      </div>
    </VisualShell>
  );
}

// 02 — CI/CD: a four-stage pipeline with a dot traveling through.
function PipelineVisual() {
  const stages = ["Commit", "Build", "Test", "Deploy"];
  return (
    <VisualShell>
      <div className="flex h-full flex-col justify-center">
        <div className="relative">
          {/* rail */}
          <div className="absolute left-0 right-0 top-3 h-0.5 -translate-y-1/2 bg-black/10 dark:bg-white/10" />
          {/* traveling dot */}
          <motion.div
            className="absolute top-3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.6)]"
            animate={{ left: ["0%", "33%", "66%", "100%", "0%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.6, 0.9, 1] }}
          />
          <div className="relative flex justify-between">
            {stages.map((s, i) => (
              <div key={s} className="flex flex-col items-center">
                <motion.span
                  className="h-6 w-6 rounded-full border-2 border-indigo-500/40 bg-[var(--background)]"
                  animate={{
                    backgroundColor: [
                      "rgba(99,102,241,0)",
                      "rgba(99,102,241,0.9)",
                      "rgba(99,102,241,0)",
                    ],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    delay: i * 0.8,
                  }}
                />
                <span className="mt-2 text-[11px] font-semibold opacity-70">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs opacity-60">
          <LuInfinity className="text-indigo-500" size={16} /> Continuous delivery
        </div>
      </div>
    </VisualShell>
  );
}

// 03 — Microservices: independent services autoscaling replicas up and down.
function MicroservicesVisual() {
  const services = ["Auth", "Inference", "Data"];
  return (
    <VisualShell>
      <div className="flex h-full flex-col justify-center gap-5">
        <Chip className="mx-auto translate-x-0 translate-y-0 border-indigo-500/40 bg-indigo-500/10">
          API Gateway
        </Chip>
        <div className="grid grid-cols-3 gap-3">
          {services.map((s, col) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              {[0, 1, 2].map((row) => (
                <motion.div
                  key={row}
                  className="h-6 w-full rounded-md border border-indigo-500/25 bg-indigo-500/10"
                  animate={{ opacity: row === 0 ? 1 : [0.15, 1, 0.15], scale: row === 0 ? 1 : [0.9, 1, 0.9] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: col * 0.4 + row * 0.5,
                  }}
                />
              ))}
              <span className="mt-1 text-[11px] font-semibold opacity-70">{s}</span>
            </div>
          ))}
        </div>
        <span className="text-center text-xs opacity-60">Replicas scale on demand</span>
      </div>
    </VisualShell>
  );
}

// 04 — Security: radar-style protection rings pulsing around a lock.
function SecurityVisual() {
  return (
    <VisualShell>
      <div className="relative flex h-full items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-20 w-20 rounded-full border border-indigo-500/40"
            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }}
          />
        ))}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3F56A4] to-[#33A5DB] text-white shadow-lg">
          <LuLock size={26} />
        </span>
      </div>
    </VisualShell>
  );
}

export default InfrastructureDeepDive;
