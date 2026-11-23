"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Achievement } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

const filters = ["Semua", "Akademik", "Non-akademik"] as const;

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const filtered =
    filter === "Semua"
      ? achievements
      : achievements.filter((achievement) => achievement.category === filter);

  useEffect(() => {
    railRef.current?.scrollTo({
      left: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [filter, reduce]);

  const scrollRail = (direction: number) => {
    railRef.current?.scrollBy({
      left: direction * 380,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section id="prestasi" className="section-pad bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="05">Prestasi</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Prestasi yang tumbuh dari proses.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-[36ch] text-pretty text-sm font-normal leading-[1.9] text-ink-soft">
              Dari olimpiade matematika sampai pramuka dan tari, setiap hasil
              adalah jejak kerja murid, guru, dan keluarga di rumah.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter prestasi"
          >
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 eyebrow text-[11px] transition-colors duration-300 ${
                    active
                      ? "border-matcha-deep bg-matcha-deep text-cream"
                      : "border-line text-muted hover:border-matcha-deep hover:text-matcha-deep"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream"
              aria-label="Geser prestasi ke kiri"
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream"
              aria-label="Geser prestasi ke kanan"
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} prestasi ditampilkan.
        </p>

        <div
          ref={railRef}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {filtered.map((achievement, index) => {
            const lead = index === 0;
            return (
              <article
                key={`${filter}-${achievement.title}`}
                data-tilt className={`group flex min-h-[290px] w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[26px] border p-6 transition-all duration-500 sm:w-[360px] sm:p-7 ${
                  lead
                    ? "gloss-sheen border-white/20 bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] text-cream shadow-[0_22px_50px_rgba(24,56,35,0.18)]"
                    : "border-[rgba(47,93,59,0.14)] bg-white text-ink shadow-[0_16px_40px_rgba(24,56,35,0.08)] hover:border-matcha/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`eyebrow text-[11px] ${
                        lead ? "text-cream/85" : "text-matcha-deep"
                      }`}
                    >
                      {achievement.level}
                    </span>
                    <span
                      className={`eyebrow text-[11px] ${
                        lead ? "text-cream/80" : "text-muted"
                      }`}
                    >
                      {achievement.year}
                    </span>
                  </div>

                  <p
                    className={`mt-6 font-display text-4xl font-semibold leading-none ${
                      lead ? "text-matcha-light/40" : "text-matcha/30"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 max-w-[15ch] text-balance font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.1] tracking-[-0.03em]">
                    {achievement.title}
                  </h3>
                </div>

                <div
                  className={`mt-10 flex items-center justify-between gap-4 border-t pt-4 ${
                    lead ? "border-cream/15" : "border-line"
                  }`}
                >
                  <span
                    className={`text-[12px] font-normal ${
                      lead ? "text-cream/85" : "text-muted"
                    }`}
                  >
                    {achievement.recipient}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className={lead ? "text-matcha-light" : "text-matcha-deep"}
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-[11px]">Catatan prestasi sekolah · 2024–2026</p>
          <a
            href="#prestasi"
            className="group inline-flex items-center gap-2 eyebrow text-[11px] transition-colors hover:text-matcha-deep"
          >
            Arsip prestasi
            <ArrowRight size={12} className="link-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
