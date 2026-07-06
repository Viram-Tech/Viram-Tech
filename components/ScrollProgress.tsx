"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Page-wide "FACTORY ONLINE" HUD — a fixed strip that fills green as you scroll
 * the entire LaunchLine page, reaching 100% at the finale. Theme-aware.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const width = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const pctText = useTransform(smooth, (v) => `${Math.round(v * 100)}%`);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#eef2f9]/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0a0a]/85">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-2.5">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand-sky" />
        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-brand-royal dark:text-brand-sky">
          System online
        </span>
        <motion.span className="font-[family-name:var(--font-jetbrains)] text-[11px] font-bold tabular-nums text-brand-royal dark:text-brand-sky">
          {pctText}
        </motion.span>
        <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-royal to-brand-sky"
            style={{ width }}
          />
        </span>
      </div>
    </div>
  );
}

export default ScrollProgress;
