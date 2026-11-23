"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Variant = "matcha" | "ink" | "outline" | "outlineLight" | "cream" | "ghost";

const variants: Record<Variant, string> = {
  matcha: "gloss-button text-cream",
  ink: "bg-[linear-gradient(135deg,#1c2d21,#0b120d)] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(11,18,13,0.16)] hover:brightness-110",
  outline:
    "border border-line-strong bg-white/35 text-ink backdrop-blur-sm hover:border-matcha-deep hover:bg-white/70 hover:text-matcha-deep",
  outlineLight:
    "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  cream: "border border-white/70 bg-white/90 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(24,56,35,0.08)] hover:bg-matcha-soft",
  ghost: "px-0 text-ink hover:text-matcha-deep",
};

export function ButtonLink({
  href,
  children,
  variant = "matcha",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [canHover, setCanHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const magnetic = canHover && !reduce;

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const limit = 8;

    x.set(Math.max(-limit, Math.min(limit, dx * 0.18)));
    y.set(Math.max(-limit, Math.min(limit, dy * 0.18)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={anchorRef}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={magnetic ? { scale: 0.97 } : undefined}
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 font-display text-[12px] font-semibold tracking-[-0.01em] transition-colors duration-500 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.8}
        className="link-arrow"
        aria-hidden="true"
      />
    </motion.a>
  );
}
