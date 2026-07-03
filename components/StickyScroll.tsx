"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

type Item = { title: string; description: ReactNode; content?: ReactNode };

export function StickyScroll({ content }: { content: Item[] }) {
  const [activeCard, setActiveCard] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active = whichever card is crossing the centre line of the viewport,
  // so the pinned number stays in sync with the card you're actually reading.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActiveCard(idx);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    const els = itemRefs.current.filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content.length]);

  return (
    <div className="relative">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Left: boxed cards the page scrolls through */}
        <div>
          {content.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className="flex min-h-[50vh] flex-col justify-center"
            >
              <motion.div
                initial={false}
                animate={{ opacity: activeCard === index ? 1 : 0.5 }}
                className="max-w-xl rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-xl sm:p-10 dark:border-white/10"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                  {item.title}
                </h2>
                <div className="mt-6">{item.description}</div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Right: number/visual pinned at the viewport centre, beside the active card */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  y: activeCard === index ? 0 : 12,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ pointerEvents: activeCard === index ? "auto" : "none" }}
              >
                {item.content ?? null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyScroll;
