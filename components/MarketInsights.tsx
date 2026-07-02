"use client";

import { motion } from "motion/react";
import {
  marketStats,
  marketGrowth,
  adoptionBars,
  agenticLeap,
} from "@/lib/content";

export function MarketInsights() {
  return (
    <div className="mt-14 space-y-16">
      <GrowthChart />
      <StatCards />
      <AdoptionMomentum />
      <AgenticLeap />
      <Sources />
    </div>
  );
}

/* --- Market growth area chart --- */
function GrowthChart() {
  const pts = marketGrowth.points;
  const max = Math.max(...pts.map((p) => p.value));
  const W = 760;
  const H = 280;
  const padX = 24;
  const padTop = 24;
  const padBottom = 44;
  const x = (i: number) => padX + (i / (pts.length - 1)) * (W - padX * 2);
  const y = (v: number) =>
    padTop + (1 - v / max) * (H - padTop - padBottom);

  const line = pts.map((p, i) => `${x(i)},${y(p.value)}`).join(" ");
  const area = `M${x(0)},${H - padBottom} L${line
    .split(" ")
    .join(" L")} L${x(pts.length - 1)},${H - padBottom} Z`;

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-black/[0.02] p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            The enterprise AI market is compounding
          </h2>
          <p className="mt-1 text-sm opacity-60">
            Global AI market size, USD trillions · {marketGrowth.source}
          </p>
        </div>
        <span className="inline-flex items-baseline gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2">
          <span className="bg-gradient-to-r from-[#3F56A4] to-[#33A5DB] bg-clip-text text-lg font-extrabold text-transparent">
            {marketGrowth.cagr}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide opacity-60">
            CAGR
          </span>
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#33A5DB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#33A5DB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padX}
            x2={W - padX}
            y1={padTop + (1 - f) * (H - padTop - padBottom)}
            y2={padTop + (1 - f) * (H - padTop - padBottom)}
            className="stroke-black/5 dark:stroke-white/10"
            strokeWidth="1"
          />
        ))}

        {/* area */}
        <motion.path
          d={area}
          fill="url(#areaFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        {/* line */}
        <motion.polyline
          points={line}
          fill="none"
          className="stroke-[#3F56A4] dark:stroke-[#7d97ef]"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* points + year labels */}
        {pts.map((p, i) => (
          <g key={p.year}>
            <motion.circle
              cx={x(i)}
              cy={y(p.value)}
              r="4"
              className="fill-[#3F56A4] dark:fill-[#7d97ef]"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.12, type: "spring" }}
            />
            <text
              x={x(i)}
              y={H - padBottom + 24}
              textAnchor="middle"
              className="fill-current text-[13px] opacity-50"
            >
              {p.year}
            </text>
          </g>
        ))}
        {/* endpoint value */}
        <motion.text
          x={x(pts.length - 1)}
          y={y(max) - 12}
          textAnchor="end"
          className="fill-current text-[15px] font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          ${max.toFixed(2)}T
        </motion.text>
      </svg>
    </div>
  );
}

/* --- Sourced stat cards --- */
function StatCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {marketStats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex flex-col rounded-2xl border border-black/5 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <div className="text-4xl font-extrabold tracking-tight text-on-surface">
            {s.value}
          </div>
          <div className="mt-2 flex-1 text-sm opacity-70">{s.label}</div>
          <div className="mt-4 text-[11px] font-semibold uppercase tracking-wide opacity-45">
            {s.source}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* --- Adoption momentum (horizontal bars) --- */
function AdoptionMomentum() {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
        Adoption has already gone mainstream
      </h2>
      <p className="mt-1 text-sm opacity-60">
        Share of organizations, McKinsey &ldquo;The state of AI&rdquo;, 2024
      </p>
      <div className="mt-7 space-y-6">
        {adoptionBars.map((b, i) => (
          <div key={b.label}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm font-semibold">{b.label}</span>
              <span className="text-sm font-bold text-indigo-500">{b.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#3F56A4] to-[#33A5DB]"
                initial={{ width: 0 }}
                whileInView={{ width: `${b.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15 + i * 0.15, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- The agentic leap (2024 → 2028) --- */
function AgenticLeap() {
  return (
    <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.06] to-sky-500/[0.04] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            The agentic leap is next
          </h2>
          <p className="mt-1 text-sm opacity-60">
            Projected {agenticLeap.fromYear} → {agenticLeap.toYear} ·{" "}
            {agenticLeap.source}
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-7">
        {agenticLeap.rows.map((r, i) => (
          <div key={r.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="shrink-0 text-sm">
                <span className="opacity-50">{r.fromLabel}</span>
                <span className="mx-1.5 text-indigo-500">→</span>
                <span className="font-bold text-indigo-500">{r.toLabel}</span>
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              {/* from baseline */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-indigo-500/30"
                style={{ width: `${r.from}%` }}
              />
              {/* projected */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3F56A4] to-[#33A5DB]"
                initial={{ width: `${r.from}%` }}
                whileInView={{ width: `${r.to}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Sources footnote --- */
function Sources() {
  return (
    <p className="text-xs leading-relaxed opacity-45">
      Sources: Grand View Research, &ldquo;Artificial Intelligence Market Size
      Report&rdquo; (2024); PwC, &ldquo;Sizing the Prize&rdquo; (AI &amp; global
      GDP by 2030); McKinsey &amp; Company, &ldquo;The state of AI&rdquo; (2024);
      Gartner press releases (2024). Figures are the latest publicly reported
      estimates and projections from the cited studies.
    </p>
  );
}

export default MarketInsights;
