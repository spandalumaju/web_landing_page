"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import type { PostRecord } from "@/lib/db/schema";
import type { PostFormState } from "@/lib/validation/posts";
import { postCategories } from "@/lib/validation/posts";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const labelClass =
  "mb-2 block font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full gloss-button px-5 py-3 font-display text-[11px] font-semibold tracking-[-0.01em] text-cream transition-colors  disabled:opacity-60"
    >
      <Save size={14} aria-hidden="true" />
      {pending ? "Menyimpan..." : "Simpan berita"}
    </button>
  );
}

export function PostForm({
  action,
  post,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: PostRecord;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="mt-7 grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <section className="rounded-[22px] border border-line bg-cream p-5 sm:p-6">
          <div className="grid gap-4">
            <div>
              <label htmlFor="title" className={labelClass}>
                Judul
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={post?.title}
                className={inputClass}
                placeholder="Judul berita"
              />
            </div>
            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug URL
              </label>
              <input
                id="slug"
                name="slug"
                defaultValue={post?.slug}
                className={inputClass}
                placeholder="otomatis-dari-judul"
              />
              <p className="mt-1.5 text-[11px] text-muted">
                Biarkan kosong untuk dibuat otomatis.
              </p>
            </div>
            <div>
              <label htmlFor="excerpt" className={labelClass}>
                Ringkasan
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={post?.excerpt}
                className={`${inputClass} resize-y`}
                placeholder="Ringkasan singkat untuk kartu berita..."
              />
            </div>
            <div>
              <label htmlFor="contentHtml" className={labelClass}>
                Konten
              </label>
              <textarea
                id="contentHtml"
                name="contentHtml"
                rows={14}
                defaultValue={post?.contentHtml}
                className={`${inputClass} resize-y font-sans`}
                placeholder="<p>Isi berita...</p>"
              />
              <p className="mt-1.5 text-[11px] text-muted">
                HTML sederhana didukung. Editor kaya akan ditambahkan pada modul
                berikutnya.
              </p>
            </div>
          </div>
        </section>

        {state.error && (
          <p
            role="alert"
            className="rounded-xl border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#8a1c14]"
          >
            {state.error}
          </p>
        )}
      </div>

      <div className="space-y-5">
        <section className="rounded-[22px] border border-line bg-cream p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Publikasi
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="category" className={labelClass}>
                Kategori
              </label>
              <select
                id="category"
                name="category"
                defaultValue={post?.category ?? "berita"}
                className={inputClass}
              >
                {postCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={post?.status ?? "draft"}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label htmlFor="cover" className={labelClass}>
                Path cover
              </label>
              <input
                id="cover"
                name="cover"
                defaultValue={post?.cover ?? ""}
                className={inputClass}
                placeholder="/images/classroom.jpg"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between gap-3">
          <Link
            href="/admin/berita"
            className="text-[11px] text-muted transition-colors hover:text-ink"
          >
            Batal
          </Link>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
