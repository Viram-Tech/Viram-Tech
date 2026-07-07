"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * "Company OS" finale — an original ViramTech diagram (not a production line):
 * a central company core, marked with the brand Λ, powered by eight phase
 * subsystems on an orbital hub. Spokes energise and a ring fills the core to
 * SYSTEM ONLINE as the section scrolls in. Theme-aware via currentColor.
 */

const PHASES = [
  { code: "01", label: "RESEARCH", tint: "#3f56a4", glyph: "search" },
  { code: "02", label: "BRAND", tint: "#4c66b0", glyph: "type" },
  { code: "03", label: "SITE", tint: "#5876bc", glyph: "window" },
  { code: "04", label: "LEGAL", tint: "#6486c8", glyph: "target" },
  { code: "05", label: "MFG", tint: "#7091d0", glyph: "envelope" },
  { code: "06", label: "MARKET", tint: "#7c9dd8", glyph: "rocket" },
  { code: "07", label: "OPS", tint: "#88a9e0", glyph: "gear" },
  { code: "08", label: "ACCTS", tint: "#94b4e8", glyph: "sigma" },
] as const;

const ACTIVE = "#33a5db"; // brand Sky — the "online" signal

const CX = 450;
const CY = 300;
const RX = 330;
const RY = 214;
const N = PHASES.length;

const nodePos = (i: number) => {
  const a = (-90 + i * (360 / N)) * (Math.PI / 180);
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
};

const RING_R = 82;
const RING_C = 2 * Math.PI * RING_R;

function Glyph({ kind, cx, cy, color }: { kind: string; cx: number; cy: number; color: string }) {
  const s = 13;
  const common = { stroke: color, strokeWidth: 2.2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "search":
      return (
        <g {...common}>
          <circle cx={cx - 2} cy={cy - 2} r={s * 0.5} />
          <line x1={cx + 4} y1={cy + 4} x2={cx + 10} y2={cy + 10} />
        </g>
      );
    case "type":
      return <text x={cx} y={cy + 6} fontFamily="Georgia, serif" fontSize="19" fontWeight="700" fill={color} textAnchor="middle">Aa</text>;
    case "window":
      return (
        <g {...common}>
          <rect x={cx - 12} y={cy - 9} width="24" height="18" rx="3" />
          <line x1={cx - 12} y1={cy - 3} x2={cx + 12} y2={cy - 3} />
        </g>
      );
    case "target":
      return (
        <g {...common}>
          <circle cx={cx} cy={cy} r={s * 0.75} />
          <circle cx={cx} cy={cy} r={s * 0.3} />
        </g>
      );
    case "envelope":
      return (
        <g {...common}>
          <rect x={cx - 12} y={cy - 8} width="24" height="16" rx="2" />
          <path d={`M${cx - 12} ${cy - 6} L${cx} ${cy + 3} L${cx + 12} ${cy - 6}`} />
        </g>
      );
    case "rocket":
      return (
        <g {...common}>
          <path d={`M${cx - 7} ${cy + 7} L${cx + 7} ${cy - 7}`} strokeWidth="3" />
          <path d={`M${cx + 2} ${cy - 8} L${cx + 8} ${cy - 8} L${cx + 8} ${cy - 2}`} />
        </g>
      );
    case "gear":
      return (
        <g {...common}>
          <circle cx={cx} cy={cy} r={s * 0.45} />
          {Array.from({ length: 8 }).map((_, k) => {
            const a = (k / 8) * Math.PI * 2;
            return <line key={k} x1={cx + Math.cos(a) * 8} y1={cy + Math.sin(a) * 8} x2={cx + Math.cos(a) * 11} y2={cy + Math.sin(a) * 11} />;
          })}
        </g>
      );
    default:
      return <text x={cx} y={cy + 7} fontFamily="Georgia, serif" fontSize="21" fill={color} textAnchor="middle">Σ</text>;
  }
}

function Spoke({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const { x, y } = nodePos(i);
  const len = Math.hypot(x - CX, y - CY);
  const t0 = (i / N) * 0.72;
  // Explicit dash length (no DOM measurement) keeps SSR and client identical.
  const offset = useTransform(progress, [t0, t0 + 0.16], [len, 0]);
  const opacity = useTransform(progress, [t0, t0 + 0.08], [0, 1]);
  return (
    <>
      <line x1={CX} y1={CY} x2={x} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.14" />
      <motion.line
        x1={CX}
        y1={CY}
        x2={x}
        y2={y}
        stroke={ACTIVE}
        strokeWidth="1.4"
        strokeDasharray={len}
        style={{ strokeDashoffset: offset, opacity }}
      />
    </>
  );
}

function Node({ progress, i }: { progress: MotionValue<number>; i: number }) {
  const p = PHASES[i];
  const { x, y } = nodePos(i);
  const t0 = (i / N) * 0.72;
  const appear = useTransform(progress, [t0 + 0.04, t0 + 0.2], [0, 1]);
  const scale = useTransform(progress, [t0 + 0.04, t0 + 0.2], [0.82, 1]);
  const W = 96;
  const H = 78;
  return (
    <motion.g style={{ opacity: appear, scale, transformOrigin: `${x}px ${y}px` } as never}>
      <text x={x} y={y - 49} fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing="1" fill="currentColor" opacity="0.55" textAnchor="middle">PH·{p.code}</text>
      <rect x={x - W / 2} y={y - H / 2} width={W} height={H} rx="12" stroke={p.tint} strokeWidth="1.8" fill={p.tint} fillOpacity="0.08" />
      <circle cx={x + W / 2 - 12} cy={y - H / 2 + 12} r="2.6" fill={p.tint} />
      <Glyph kind={p.glyph} cx={x} cy={y - 8} color={p.tint} />
      <text x={x} y={y + 27} fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing="1" fill="currentColor" textAnchor="middle">{p.label}</text>
    </motion.g>
  );
}

export function CompanyOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  // Client-only: a scroll-driven decoration whose motion styles can't round-trip
  // through SSR. Render a same-size placeholder until mounted (no layout shift).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Scrub the power-up from when the diagram enters near the bottom until it
  // is centred in the viewport — so it reaches the full "online" state while
  // still fully visible, before it scrolls off the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });

  const coreOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.35, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.9]);
  const ringOffset = useTransform(scrollYProgress, [0.1, 1], [RING_C, 0]);
  const tickRotate = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const statusOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  if (!mounted) {
    return (
      <div
        ref={ref}
        className="mx-auto w-full max-w-[900px]"
        style={{ aspectRatio: "900 / 640" }}
        aria-hidden
      />
    );
  }

  return (
    <div ref={ref} className="text-[#3f56a4] dark:text-[#7fa8e6]">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 900 640"
          className="mx-auto h-auto w-full min-w-[640px] max-w-[900px]"
          role="img"
          aria-label="Diagram of the ViramTech Company OS: a central company core powered by eight phase subsystems on an orbital hub."
        >
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ACTIVE} stopOpacity="0.55" />
              <stop offset="100%" stopColor={ACTIVE} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint orbital guide */}
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12" strokeDasharray="2 6" />

          {/* spokes (behind core + nodes) */}
          {PHASES.map((_, i) => (
            <Spoke key={`s${i}`} progress={scrollYProgress} i={i} />
          ))}

          {/* ── core ── */}
          <motion.circle cx={CX} cy={CY} r="120" fill="url(#coreGlow)" style={{ opacity: glowOpacity }} />

          {/* rotating tick ring */}
          <motion.g style={{ rotate: tickRotate, transformOrigin: `${CX}px ${CY}px` } as never} opacity="0.5">
            {Array.from({ length: 36 }).map((_, k) => {
              const a = (k / 36) * Math.PI * 2;
              const r1 = 96;
              const r2 = k % 3 === 0 ? 104 : 100;
              return <line key={k} x1={CX + Math.cos(a) * r1} y1={CY + Math.sin(a) * r1} x2={CX + Math.cos(a) * r2} y2={CY + Math.sin(a) * r2} stroke="currentColor" strokeWidth="1" />;
            })}
          </motion.g>

          {/* progress ring */}
          <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="currentColor" strokeWidth="3" opacity="0.14" />
          <motion.circle
            cx={CX}
            cy={CY}
            r={RING_R}
            fill="none"
            stroke={ACTIVE}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            style={{ strokeDashoffset: ringOffset }}
            transform={`rotate(-90 ${CX} ${CY})`}
          />

          {/* core disc + brand mark */}
          <circle cx={CX} cy={CY} r="62" fill="rgba(51,165,219,0.06)" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <motion.g style={{ opacity: coreOpacity }}>
            <text x={CX} y={CY + 4} fontFamily="var(--font-display), Georgia, serif" fontSize="52" fontWeight="700" fill={ACTIVE} textAnchor="middle">Λ</text>
            <text x={CX} y={CY + 34} fontFamily="var(--font-jetbrains), monospace" fontSize="9" letterSpacing="3" fill="currentColor" opacity="0.7" textAnchor="middle">COMPANY</text>
          </motion.g>

          {/* online readout under core (fades in as the company powers up) */}
          <motion.text x={CX} y={CY + 130} fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing="3" fill={ACTIVE} textAnchor="middle" style={{ opacity: statusOpacity }}>
            SYSTEM ONLINE
          </motion.text>

          {/* nodes */}
          {PHASES.map((_, i) => (
            <Node key={`n${i}`} progress={scrollYProgress} i={i} />
          ))}

          {/* annotations */}
          <g fontFamily="var(--font-jetbrains), monospace" opacity="0.75">
            <text x="40" y="620" fontSize="11" letterSpacing="1.5" fill="currentColor">VT · COMPANY OS</text>
            <text x={CX} y="620" fontSize="11" letterSpacing="1.5" fill="currentColor" textAnchor="middle" opacity="0.7">8 SUBSYSTEMS — ONE COMPANY</text>
          </g>
          <motion.g style={{ opacity: statusOpacity }}>
            <rect x="740" y="606" width="120" height="20" rx="4" fill="none" stroke={ACTIVE} strokeWidth="1.5" />
            <text x="800" y="620" fontFamily="var(--font-jetbrains), monospace" fontSize="10.5" letterSpacing="1" fill={ACTIVE} textAnchor="middle">STATUS: LIVE</text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

export default CompanyOrbit;
