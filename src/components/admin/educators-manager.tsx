"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Eye,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { EducatorForm } from "@/components/admin/educator-form";
import {
  createEducatorAction,
  deleteEducatorAction,
  updateEducatorAction,
} from "@/app/admin/(protected)/guru/actions";
import type { EducatorFormState } from "@/lib/validation/educators";

export type EducatorRow = import("@/components/admin/educator-form").EducatorFormValues & {
  updatedAt: string;
};

const inputClass =
  "h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-[12px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const selectClass =
  "h-10 rounded-xl border border-line bg-white px-3 text-[12px] text-ink-soft outline-none transition-colors focus:border-matcha-deep";

export function EducatorsManager({ rows }: { rows: EducatorRow[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const deferredQuery = useDeferredValue(query);

  const units = useMemo(
    () => Array.from(new Set(rows.map((row) => row.unit))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !search ||
        [row.name, row.role, row.unit, row.quote]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesUnit = unitFilter === "all" || row.unit === unitFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" ? row.published : !row.published);
      return matchesQuery && matchesUnit && matchesStatus;
    });
  }, [deferredQuery, rows, statusFilter, unitFilter]);

  const selected = selectedId
    ? rows.find((row) => row.id === selectedId) ?? null
    : null;

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
    ? (state: EducatorFormState, formData: FormData) =>
        updateEducatorAction(selected.id, state, formData)
    : createEducatorAction;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Direktori</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Pendidik &amp; staf
          </h1>
          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            {rows.length} kartu · {rows.filter((row) => row.published).length}{" "}
            tampil. Kelola kartu langsung di halaman ini.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full gloss-button px-4 py-2.5 font-display text-[12px] font-semibold text-cream"
          >
            <Plus size={14} aria-hidden="true" />
            Tambah
          </button>
          <a
            href="/guru"
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
                  placeholder="Cari nama, jabatan, atau unit..."
                  className={inputClass}
                  aria-label="Cari pendidik"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={unitFilter}
                  onChange={(event) => setUnitFilter(event.target.value)}
                  className={selectClass}
                  aria-label="Filter unit kerja"
                >
                  <option value="all">Semua unit</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className={selectClass}
                  aria-label="Filter status publikasi"
                >
                  <option value="all">Semua status</option>
                  <option value="published">Tampil</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[11px] text-muted">
              <span>{filtered.length} hasil</span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setUnitFilter("all");
                  setStatusFilter("all");
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
                <Users size={24} className="mx-auto text-matcha-deep/40" aria-hidden="true" />
                <p className="mt-3 text-[13px] font-medium text-ink">Tidak ada pendidik yang cocok.</p>
                <p className="mt-1 text-[11px] text-muted">Ubah kata kunci atau reset filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {filtered.map((educator) => (
                  <div
                    key={educator.id}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-white/60 sm:gap-4 sm:px-4"
                  >
                    <div className="flex h-14 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-matcha-soft">
                      {educator.photo ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={educator.photo}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </>
                      ) : (
                        <span className="font-display text-[11px] font-semibold text-matcha-deep/70">
                          {educator.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate font-display text-[13px] font-semibold text-ink">
                          {educator.name}
                        </h2>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            educator.published
                              ? "bg-matcha-soft text-matcha-deep"
                              : "bg-[#b42318]/5 text-[#8a1c14]"
                          }`}
                        >
                          {educator.published ? "Tampil" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted">
                        {educator.role} · {educator.unit}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(educator.id)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-[11px] text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                      >
                        <Pencil size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <DeleteButton
                        onConfirm={async () => {
                          const result = await deleteEducatorAction(educator.id);
                          if (result.success && selectedId === educator.id) {
                            setSelectedId(null);
                          }
                          return result;
                        }}
                        title="Hapus pendidik?"
                        description={`${educator.name} akan dihapus dari direktori dan halaman publik. Tindakan ini tidak bisa dibatalkan.`}
                        successMessage="Pendidik dihapus."
                        label={`Hapus ${educator.name}`}
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
          <EducatorForm
            key={`${selected?.id ?? "new"}-${formVersion}`}
            action={action}
            educator={selected ?? undefined}
            onSaved={handleSaved}
            onCancel={() => {
              setPanelOpen(false);
              setSelectedId(null);
              setFormVersion((value) => value + 1);
            }}
          />

          {!selected && (
            <div className="mt-4 rounded-xl border border-dashed border-line px-3.5 py-3 text-[11px] leading-relaxed text-muted">
              <Eye size={13} className="mb-1 text-matcha-deep" aria-hidden="true" />
              Pilih edit pada daftar untuk memperbarui kartu. Form di kanan
              tetap terbuka agar alur kerja tidak terputus.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
