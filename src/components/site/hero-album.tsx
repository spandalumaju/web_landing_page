"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, GripHorizontal } from "lucide-react";
import { heroAlbum } from "@/lib/content";

export function HeroAlbum() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const current = heroAlbum[index];

  const go = (step: number) => {
    setDirection(step);
    setIndex((value) => (value + step + heroAlbum.length) % heroAlbum.length);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Album sekolah"
      data-cursor="Geser"
      className="relative"
    >
      <div className="gloss-sheen relative aspect-[4/5] overflow-hidden rounded-[32px] bg-matcha-dark shadow-[0_34px_90px_rgba(24,56,35,0.24),inset_0_1px_0_rgba(255,255,255,0.28)] ring-1 ring-white/30 sm:aspect-[5/5.4]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.src}
            custom={direction}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, x: direction * 42 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -direction * 42 }}
            transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragDirectionLock
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                go(1);
              } else if (info.offset.x > 60) {
                go(-1);
              }
            }}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
              className="image-soft object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-cream sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="eyebrow text-[11px] text-cream/70">
                  Album sekolah
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold leading-none tracking-[-0.02em]">
                  {current.caption}
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[0.02em] text-cream/70">
                <GripHorizontal size={13} aria-hidden="true" />
                geser
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 sm:top-5 sm:px-5">
          <span className="rounded-full border border-cream/25 bg-ink/30 px-3 py-1.5 eyebrow text-[11px] text-cream">
            Album
          </span>
          <span className="rounded-full border border-cream/25 bg-ink/30 px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.02em] text-cream">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(heroAlbum.length).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 sm:left-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto album sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 bg-ink/25 text-cream transition-colors hover:bg-matcha-deep"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 sm:right-4">
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto album berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 bg-ink/25 text-cream transition-colors hover:bg-matcha-deep"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Foto {index + 1} dari {heroAlbum.length}: {current.caption}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {heroAlbum.map((photo, photoIndex) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => {
              setDirection(photoIndex > index ? 1 : -1);
              setIndex(photoIndex);
            }}
            aria-label={`Tampilkan foto: ${photo.caption}`}
            aria-pressed={photoIndex === index}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-16 sm:w-20 ${
              photoIndex === index
                ? "border-white opacity-100 shadow-[0_6px_18px_rgba(24,56,35,0.16)]"
                : "border-white/40 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="64px"
              className="image-soft object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
