"use client";

import { motion, useReducedMotion } from "motion/react";

const lines = ["Sekolah untuk", "bertanya, mencoba,", "dan bertumbuh."];

export function HeroHeadline() {
  const reduce = useReducedMotion();

  return (
    <h1 className="font-display text-[clamp(1.85rem,3.5vw,3.3rem)] font-bold leading-[1.02] tracking-[-0.045em] text-ink">
      <span className="sr-only">SMP Negeri 2 Ambulu — </span>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.04em]">
          {reduce ? (
            <span
              className={`block ${
                index === 2 ? "font-medium text-matcha-deep" : ""
              }`}
            >
              {line}
            </span>
          ) : (
            <motion.span
              className={`block ${
                index === 2 ? "font-medium text-matcha-deep" : ""
              }`}
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.05,
                delay: 0.18 + index * 0.13,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </h1>
  );
}
