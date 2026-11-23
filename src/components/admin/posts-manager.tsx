"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Eye,
  FileText,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { SchoolMark } from "@/components/site/school-mark";
import { deletePostAction } from "@/app/admin/(protected)/berita/actions";

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: string;
  cover: string;
  imageCount: number;
  publishedAt: string | null;
  updatedAt: string;
};

const categoryLabels: Record<string, string> = {
  berita: "Berita",
  kegiatan: "Kegiatan",
  prestasi: "Prestasi",
  pengumuman: "Pengumuman",
  artikel: "Artikel",
};

const inputClass =
  "h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-[12px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const selectClass =
  "h-10 rounded-xl border border-line bg-white px-3 text-[12px] text-ink-soft outline-none transition-colors focus:border-matcha-deep";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function PostsManager({ rows }: { rows: PostRow[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () => Array.from(new Set(rows.map((row) => row.category))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !search ||
        [row.title, row.slug, row.excerpt, row.category]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || row.category === categoryFilter;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, deferredQuery, rows, statusFilter]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Konten</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Berita &amp; kegiatan
          </h1>
          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            {rows.length} berita · {rows.filter((row) => row.status === "published").length}{" "}
            terbit. Tulis, edit, dan unggah foto tanpa mengelola path manual.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/berita/baru"
            className="inline-flex items-center gap-2 rounded-full gloss-button px-4 py-2.5 font-display text-[12px] font-semibold text-cream"
          >
            <Plus size={14} aria-hidden="true" />
            Tulis berita
          </Link>
          <a
            href="/berita"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 font-display text-[12px] font-semibold text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
          >
            Halaman publik
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-7 rounded-[20px] border border-line bg-cream p-3">
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
              placeholder="Cari judul, slug, atau isi ringkasan..."
              className={inputClass}
              aria-label="Cari berita"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={selectClass}
              aria-label="Filter status"
            >
              <option value="all">Semua status</option>
              <option value="published">Terbit</option>
              <option value="draft">Draf</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className={selectClass}
              aria-label="Filter kategori"
            >
              <option value="all">Semua kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category] ?? category}
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
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-matcha-deep"
          >
            <SlidersHorizontal size={12} aria-hidden="true" />
            Reset filter
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-[20px] border border-line bg-cream p-10 text-center">
            <FileText size={24} className="mx-auto text-matcha-deep/40" aria-hidden="true" />
            <p className="mt-3 text-[13px] font-medium text-ink">
              Tidak ada berita yang cocok.
            </p>
            <p className="mt-1 text-[11px] text-muted">
              Ubah kata kunci atau reset filter.
            </p>
          </div>
        ) : (
          filtered.map((post) => (
            <article
              key={post.id}
              className="flex flex-col gap-4 rounded-[20px] border border-line bg-cream p-3 transition-colors hover:border-matcha-deep/25 sm:flex-row sm:items-center sm:p-4"
            >
              <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-matcha-mist sm:h-20 sm:w-28">
                {post.cover ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </>
                ) : (
                  <SchoolMark className="h-7 w-7 opacity-70" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      post.status === "published"
                        ? "bg-matcha-soft text-matcha-deep"
                        : "bg-[#b45309]/10 text-[#8a4b06]"
                    }`}
                  >
                    {post.status === "published" ? "Terbit" : "Draf"}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-muted">
                    {categoryLabels[post.category] ?? post.category}
                  </span>
                  {post.imageCount > 0 && (
                    <span className="text-[10px] text-muted">
                      +{post.imageCount} foto
                    </span>
                  )}
                </div>
                <h2 className="mt-1.5 truncate font-display text-[14px] font-semibold text-ink">
                  {post.title}
                </h2>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  /berita/{post.slug} · diperbarui {formatDate(post.updatedAt)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto">
                {post.status === "published" && (
                  <a
                    href={`/berita/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Lihat ${post.title}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                  >
                    <Eye size={13} aria-hidden="true" />
                  </a>
                )}
                <Link
                  href={`/admin/berita/${post.id}`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-[11px] text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                >
                  <Pencil size={13} aria-hidden="true" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
                <DeleteButton
                  onConfirm={() => deletePostAction(post.id)}
                  title="Hapus berita?"
                  description={`"${post.title}" akan dihapus dari situs. Tindakan ini tidak bisa dibatalkan.`}
                  successMessage="Berita dihapus."
                  label={`Hapus ${post.title}`}
                />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
