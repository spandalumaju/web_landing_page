"use client";

import Image from "next/image";
import { useState } from "react";
import { Quote, RotateCcw } from "lucide-react";
import type { Educator } from "@/lib/content";

export function TeacherFlipCard({ educator }: { educator: Educator }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`${educator.name}, ${educator.role}. ${
        flipped ? "Sembunyikan kutipan" : "Tampilkan kutipan"
      }`}
      data-tilt data-cursor="Balik" className="group block w-full rounded-[24px] text-left [perspective:1200px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-matcha-deep"
    >
      <div
        className={`relative aspect-[3/4] w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div
          aria-hidden={flipped}
          className="absolute inset-0 overflow-hidden rounded-[24px] bg-matcha-mist [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
        >
          <Image
            src={educator.photo}
            alt={`Foto ${educator.name}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="grayscale object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
          />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <span className="rounded-full border border-cream/25 bg-ink/25 px-3 py-1 eyebrow text-[11px] text-cream">
              {educator.unit}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/25 bg-ink/25 text-cream">
              <RotateCcw size={12} aria-hidden="true" />
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-cream">
            <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em]">
              {educator.name}
            </h3>
            <p className="mt-1 text-[11px] text-cream/70">{educator.role}</p>
            <p className="mt-3 eyebrow text-[11px] text-cream/50">
              Klik untuk membaca
            </p>
          </div>
        </div>

        <div
          aria-hidden={!flipped}
          className="gloss-sheen absolute inset-0 flex flex-col justify-between rounded-[24px] bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] p-5 text-cream shadow-[0_18px_45px_rgba(24,56,35,0.18)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6"
        >
          <div className="flex items-start justify-between">
            <Quote size={20} className="text-matcha-light" aria-hidden="true" />
            <span className="eyebrow text-[11px] text-cream/50">Kutipan</span>
          </div>
          <blockquote className="font-sans text-[13px] leading-relaxed text-cream/95 sm:text-[14px]">
            “{educator.quote}”
          </blockquote>
          <div className="border-t border-cream/15 pt-4">
            <p className="font-display text-sm font-semibold leading-tight">
              {educator.name}
            </p>
            <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-cream/65">{educator.role}</p>
              <span className="eyebrow text-[11px] text-cream/50">
                Klik kembali
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
