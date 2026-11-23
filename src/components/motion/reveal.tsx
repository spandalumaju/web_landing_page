"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Variant = "up" | "mask" | "scale";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === "mask"
      ? { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 10 }
      : variant === "scale"
        ? { opacity: 0, scale: 0.965 }
        : { opacity: 0, y };

  const animate =
    variant === "mask"
      ? { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 }
      : variant === "scale"
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, y: 0 };

  return (
    <motion.div
      data-reveal
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: variant === "mask" ? 1.05 : 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
