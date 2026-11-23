"use client";

import { useState } from "react";
import type { Educator } from "@/lib/content";
import { TeacherFlipCard } from "@/components/site/teacher-flip-card";

export function TeacherGrid({ educators }: { educators: Educator[] }) {
  const filters = [
    "Semua",
    ...Array.from(new Set(educators.map((educator) => educator.unit))),
  ];
  const [filter, setFilter] = useState("Semua");
  const filtered =
    filter === "Semua"
      ? educators
      : educators.filter((educator) => educator.unit === filter);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter pendidik"
      >
        {filters.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 font-display text-[11px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                active
                  ? "gloss-button border-transparent text-cream"
                  : "border-line text-muted hover:border-matcha-deep hover:text-matcha-deep"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} pendidik ditampilkan.
      </p>

      {filtered.length === 0 ? (
        <div className="gloss-card mt-8 rounded-[22px] p-8 text-center">
          <p className="text-[13px] text-muted">
            Belum ada pendidik yang ditampilkan.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((educator) => (
            <TeacherFlipCard key={educator.id} educator={educator} />
          ))}
        </div>
      )}

      <p className="mt-8 eyebrow text-[11px] leading-relaxed text-muted">
        Kartu dan kutipan masih contoh; data lengkap menyusul setelah izin tersedia.
      </p>
    </div>
  );
}
