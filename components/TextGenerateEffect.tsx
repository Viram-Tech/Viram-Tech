"use client";

import { motion } from "motion/react";

/**
 * Reveals text word-by-word (fade + de-blur), staggered, when scrolled into
 * view. Respects reduced motion (motion library honours prefers-reduced-motion).
 */
export function TextGenerateEffect({
  words,
  className = "",
  filter = true,
}: {
  words: string;
  className?: string;
  filter?: boolean;
}) {
  const wordsArray = words.split(" ");

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.055 } } }}
    >
      {wordsArray.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block"
          variants={{
            hidden: { opacity: 0, filter: filter ? "blur(8px)" : "none" },
            show: { opacity: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default TextGenerateEffect;
