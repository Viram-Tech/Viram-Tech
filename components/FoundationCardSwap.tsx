"use client";

import type { ReactNode } from "react";
import CardSwap, { Card } from "./CardSwap";
import { foundation } from "@/lib/content";

function SparkleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2 2 7l10 5 10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

const icons: ReactNode[] = [<SparkleIcon key="s" />, <LayersIcon key="l" />, <CodeIcon key="c" />];

// Brand-blue blobs that give each card its abstract backdrop.
const blobs = [
  ["bg-[#33A5DB]/40", "bg-[#3F56A4]/50", "bg-[#597CBD]/30"],
  ["bg-[#3F56A4]/45", "bg-[#14284E]/60", "bg-[#33A5DB]/30"],
  ["bg-[#597CBD]/40", "bg-[#3F56A4]/50", "bg-[#33A5DB]/30"],
];

export function FoundationCardSwap() {
  return (
    <CardSwap
      width={400}
      height={460}
      cardDistance={55}
      verticalDistance={62}
      delay={3800}
      pauseOnHover
      skewAmount={5}
      easing="linear"
    >
      {foundation.map((f, i) => (
        <Card
          key={f.title}
          className="flex flex-col overflow-hidden border border-white/15 bg-black text-white shadow-2xl"
        >
          {/* window header */}
          <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
            <span className="text-white/75">{icons[i % icons.length]}</span>
            <span className="text-sm font-semibold">{f.title}</span>
          </div>

          {/* abstract content */}
          <div className="relative flex flex-1 flex-col justify-end overflow-hidden bg-neutral-950 p-5">
            <div
              className={`absolute -left-10 top-4 h-44 w-44 rounded-full blur-3xl ${blobs[i][0]}`}
            />
            <div
              className={`absolute -right-6 bottom-0 h-48 w-48 rounded-full blur-3xl ${blobs[i][1]}`}
            />
            <div
              className={`absolute left-1/3 bottom-2 h-32 w-32 rounded-full blur-3xl ${blobs[i][2]}`}
            />

            <span className="pointer-events-none absolute right-5 top-2 text-7xl font-black leading-none text-white/10">
              0{i + 1}
            </span>

            <ul className="relative space-y-2.5">
              {f.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-2.5 text-sm font-medium text-white/90"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </CardSwap>
  );
}

export default FoundationCardSwap;
