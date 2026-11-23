"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type HoverState = {
  active: boolean;
  label: string;
};

const initialHover: HoverState = { active: false, label: "" };

function resetTilt(card: HTMLElement) {
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--tilt-lift", "0px");
  card.style.setProperty("--spot-x", "50%");
  card.style.setProperty("--spot-y", "50%");
  card.classList.remove("is-tilting");
}

function createBloom(event: PointerEvent) {
  if (event.button !== 0) {
    return;
  }

  const target = event.target as Element | null;
  if (target?.closest("input, textarea, select, [contenteditable='true']")) {
    return;
  }

  const bloom = document.createElement("span");
  bloom.className = "click-bloom";
  bloom.style.left = `${event.clientX}px`;
  bloom.style.top = `${event.clientY}px`;
  document.body.appendChild(bloom);
  window.setTimeout(() => bloom.remove(), 700);
}

export function PointerExperience() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [overField, setOverField] = useState(false);
  const [hover, setHover] = useState<HoverState>(initialHover);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 27, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 260, damping: 27, mass: 0.55 });

  useEffect(() => {
    if (reduce) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)");
    const canHover = window.matchMedia("(hover: hover)");
    if (!finePointer.matches || !canHover.matches) {
      return;
    }

    let cursorReady = false;
    let activeCard: HTMLElement | null = null;
    let frame = 0;
    let lastEvent: PointerEvent | null = null;
    const hoverRef = { current: initialHover };
    const fieldRef = { current: false };

    const syncHover = (next: HoverState) => {
      if (
        hoverRef.current.active === next.active &&
        hoverRef.current.label === next.label
      ) {
        return;
      }
      hoverRef.current = next;
      setHover(next);
    };

    const syncField = (next: boolean) => {
      if (fieldRef.current === next) {
        return;
      }
      fieldRef.current = next;
      setOverField(next);
    };

    const applyTilt = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest<HTMLElement>("[data-tilt]") ?? null;

      if (!card) {
        if (activeCard) {
          resetTilt(activeCard);
          activeCard = null;
        }
        return;
      }

      if (activeCard !== card) {
        if (activeCard) {
          resetTilt(activeCard);
        }
        activeCard = card;
      }

      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const tiltX = (px - 0.5) * 4;
      const tiltY = (py - 0.5) * -4;

      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      card.style.setProperty("--tilt-lift", "-3px");
      card.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
      card.classList.add("is-tilting");
    };

    const scheduleTilt = (event: PointerEvent) => {
      lastEvent = event;
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (lastEvent) {
          applyTilt(lastEvent);
        }
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      if (!cursorReady) {
        cursorReady = true;
        document.documentElement.classList.add("cursor-ready");
      }

      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      syncField(
        Boolean(
          target.closest(
            "input, textarea, select, [contenteditable='true']",
          ),
        ),
      );

      const labelNode = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest(
        "a, button, [role='button'], label, [data-cursor]",
      );
      syncHover({
        active: Boolean(interactive),
        label: labelNode?.dataset.cursor ?? "",
      });

      scheduleTilt(event);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      setPressed(true);
      syncHover(initialHover);
      createBloom(event);
    };

    const onPointerUp = () => setPressed(false);

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest<HTMLElement>("[data-tilt]");
      if (
        card &&
        (!(event.relatedTarget instanceof Node) ||
          !card.contains(event.relatedTarget))
      ) {
        resetTilt(card);
        if (activeCard === card) {
          activeCard = null;
        }
      }
    };

    const onLeave = () => {
      setVisible(false);
      setPressed(false);
      syncHover(initialHover);
      syncField(false);
      if (activeCard) {
        resetTilt(activeCard);
        activeCard = null;
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [reduce, x, y]);

  if (reduce) {
    return null;
  }

  const ringScale = pressed ? 0.82 : hover.label ? 1.55 : hover.active ? 1.4 : 1;
  const show = visible && !overField;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-matcha-deep/65 bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.92),0_4px_18px_rgba(24,56,35,0.14)]"
          animate={{ opacity: show ? 1 : 0, scale: ringScale }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
        {hover.label ? (
          <motion.span
            className="absolute left-6 top-5 whitespace-nowrap rounded-full bg-matcha-deep px-2.5 py-1 font-display text-[11px] font-semibold tracking-[-0.01em] text-cream shadow-[0_6px_18px_rgba(11,18,13,0.2)]"
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4 }}
          >
            {hover.label}
          </motion.span>
        ) : null}
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-matcha-deep shadow-[0_0_0_1px_rgba(255,255,255,0.95)]"
        style={{ x, y }}
        animate={{
          opacity: show ? 1 : 0,
          scale: pressed ? 1.5 : hover.active ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      />
    </div>
  );
}
