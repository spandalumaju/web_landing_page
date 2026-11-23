"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function GallerySection({ images }: { images: { src: string; alt: string; caption: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (index: number) => {
    lastFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setActive(index);
  };

  const step = useCallback((direction: number) => {
    setActive((current) => {
      if (current === null) {
        return current;
      }
      if (images.length === 0) {
        return current;
      }
      return (current + direction + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (active === null) {
      lastFocused.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        return;
      }
      if (event.key === "ArrowRight") {
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, step]);

  const current = active !== null ? images[active] : null;

  return (
    <section id="galeri" className="gloss-dark section-pad text-cream">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="08" dark>
              Galeri
            </SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em]">
                Potongan keseharian di <span className="font-medium text-matcha-light">sekolah.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="eyebrow text-[11px] text-cream/70">
              Geser untuk melihat · klik untuk memperbesar
            </p>
          </Reveal>
        </div>

        {images.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-[26px] border border-dashed border-cream/20 bg-white/[0.03] px-6 py-14 text-center">
              <p className="font-display text-xl font-semibold text-cream">
                Dokumentasi segera hadir.
              </p>
              <p className="mx-auto mt-2 max-w-[42ch] text-[13px] leading-relaxed text-cream/60">
                Foto kegiatan dan fasilitas sekolah akan ditambahkan oleh
                pengelola melalui panel admin.
              </p>
            </div>
          </Reveal>
        ) : (
        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {images.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => open(index)}
                aria-label={`Buka foto: ${item.caption}`}
                data-cursor="Perbesar"
                className="group relative h-[320px] w-[80vw] shrink-0 snap-start overflow-hidden rounded-[26px] bg-matcha-dark text-left shadow-[0_22px_50px_rgba(6,16,10,0.22)] ring-1 ring-white/15 sm:h-[380px] sm:w-[46vw] lg:h-[440px] lg:w-[31vw] xl:w-[29vw]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 31vw"
                  className="image-soft object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-300 group-hover:border-matcha-light group-hover:bg-matcha-deep">
                  <Expand size={14} aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <span className="font-display text-base font-semibold leading-tight tracking-[-0.02em] text-cream">
                    {item.caption}
                  </span>
                  <span className="eyebrow text-[11px] text-cream/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
        )}
      </div>

      <AnimatePresence>
        {current && active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto sekolah"
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink p-4 text-cream sm:p-6"
            onClick={() => setActive(null)}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-[11px] text-cream/70">
                Galeri / {String(active + 1).padStart(2, "0")} dari{" "}
                {String(images.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-matcha-light hover:bg-matcha-deep"
                aria-label="Tutup galeri"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center py-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-matcha-light hover:bg-matcha-deep"
                aria-label="Foto sebelumnya"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>

              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[62vh] w-full max-w-6xl overflow-hidden rounded-[22px] sm:h-[70vh]"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-matcha-light hover:bg-matcha-deep"
                aria-label="Foto berikutnya"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <p
              className="mx-auto max-w-2xl text-center font-sans text-lg text-cream/80"
              aria-live="polite"
            >
              {current.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
