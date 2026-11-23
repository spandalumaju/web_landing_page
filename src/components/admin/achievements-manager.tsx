"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  AchievementForm,
  type AchievementFormValues,
} from "@/components/admin/achievement-form";
import {
  createAchievementAction,
  deleteAchievementAction,
  updateAchievementAction,
} from "@/app/admin/(protected)/prestasi/actions";
import type { AchievementFormState } from "@/lib/validation/achievements";

export type AchievementRow = AchievementFormValues & {
  updatedAt: string;
};

const inputClass =
  "h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-[12px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const selectClass =
  "h-10 rounded-xl border border-line bg-white px-3 text-[12px] text-ink-soft outline-none transition-colors focus:border-matcha-deep";

export function AchievementsManager({ rows }: { rows: AchievementRow[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const deferredQuery = useDeferredValue(query);

  const levels = useMemo(
    () => Array.from(new Set(rows.map((row) => row.level))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !search ||
        [row.title, row.recipient, row.level, String(row.year)]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesCategory =
        categoryFilter === "all" || row.category === categoryFilter;
      const matchesLevel = levelFilter === "all" || row.level === levelFilter;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [categoryFilter, deferredQuery, levelFilter, rows]);

  const selected = selectedId
    ? rows.find((row) => row.id === selectedId) ?? null
    : null;
  const selectedUpdatedAt = selected?.updatedAt
    ? new Date(selected.updatedAt).getTime()
    : 0;

  const openCreate = () => {
    setSelectedId(null);
    setFormVersion((value) => value + 1);
    setPanelOpen(true);
  };

  const openEdit = (id: string) => {
    setSelectedId(id);
    setPanelOpen(true);
  };

  const handleSaved = useCallback(() => {
    router.refresh();
    setPanelOpen(false);
    setFormVersion((value) => value + 1);
  }, [router]);

  const action = selected
    ? (state: AchievementFormState, formData: FormData) =>
        updateAchievementAction(selected.id, state, formData)
    : createAchievementAction;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Arsip</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Prestasi
          </h1>
          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            {rows.length} catatan prestasi · {rows.filter((row) => row.featured).length}{" "}
            unggulan. Kelola tanpa berpindah halaman.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full gloss-button px-4 py-2.5 font-display text-[12px] font-semibold text-cream"
          >
            <Plus size={14} aria-hidden="true" />
            Tambah prestasi
          </button>
          <a
            href="/#prestasi"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 font-display text-[12px] font-semibold text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
          >
            Halaman publik
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="min-w-0">
          <div className="rounded-[20px] border border-line bg-cream p-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari prestasi, penerima, atau tahun..."
                  className={inputClass}
                  aria-label="Cari prestasi"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className={selectClass}
                  aria-label="Filter kategori"
                >
                  <option value="all">Semua kategori</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Non-akademik">Non-akademik</option>
                </select>
                <select
                  value={levelFilter}
                  onChange={(event) => setLevelFilter(event.target.value)}
                  className={selectClass}
                  aria-label="Filter tingkat"
                >
                  <option value="all">Semua tingkat</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[11px] text-muted">
              <span>{filtered.length} hasil</span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategoryFilter("all");
                  setLevelFilter("all");
                }}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-matcha-deep"
              >
                <SlidersHorizontal size={12} aria-hidden="true" />
                Reset filter
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[20px] border border-line bg-cream">
            {filtered.length === 0 ? (
              <div className="p-10 text-center">
                <Trophy size={24} className="mx-auto text-matcha-deep/40" aria-hidden="true" />
                <p className="mt-3 text-[13px] font-medium text-ink">Tidak ada prestasi yang cocok.</p>
                <p className="mt-1 text-[11px] text-muted">Ubah kata kunci atau filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {filtered.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-white/60 sm:gap-4 sm:px-4"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-matcha-soft font-display text-[12px] font-semibold text-matcha-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate font-display text-[13px] font-semibold text-ink">
                          {achievement.title}
                        </h2>
                        {achievement.featured && (
                          <span className="rounded-full bg-matcha-deep px-2 py-0.5 text-[10px] font-medium text-cream">
                            Unggulan
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted">
                        {achievement.recipient || "Tanpa penerima"} · {achievement.level} ·{" "}
                        {achievement.year} · {achievement.category}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(achievement.id)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-[11px] text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                      >
                        <Pencil size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <DeleteButton
                        onConfirm={async () => {
                          const result = await deleteAchievementAction(achievement.id);
                          if (result.success && selectedId === achievement.id) {
                            setSelectedId(null);
                          }
                          return result;
                        }}
                        title="Hapus prestasi?"
                        description={`Prestasi "${achievement.title}" akan dihapus dari arsip dan halaman publik.`}
                        successMessage="Prestasi dihapus."
                        label={`Hapus ${achievement.title}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {panelOpen && (
          <div
            className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-sm xl:hidden"
            onClick={() => setPanelOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`${
            panelOpen
              ? "fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto rounded-t-[24px] bg-cream p-5 shadow-[0_-20px_60px_rgba(11,18,13,0.18)]"
              : "hidden"
          } xl:static xl:z-auto xl:block xl:h-fit xl:overflow-visible xl:rounded-[20px] xl:border xl:border-line xl:bg-cream xl:p-5 xl:shadow-none`}
        >
          <AchievementForm
            key={`${selected?.id ?? "new"}-${formVersion}-${selectedUpdatedAt}`}
            action={action}
            achievement={selected ?? undefined}
            onSaved={handleSaved}
            onCancel={() => {
              setPanelOpen(false);
              setSelectedId(null);
              setFormVersion((value) => value + 1);
            }}
          />

          {!selected && (
            <div className="mt-4 rounded-xl border border-dashed border-line px-3.5 py-3 text-[11px] leading-relaxed text-muted">
              Klik Edit pada baris prestasi untuk memperbarui. Form tetap di
              kanan agar daftar dan editor bisa dipakai bergantian.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
