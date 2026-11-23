"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  LoaderCircle,
  Save,
  Sparkles,
} from "lucide-react";
import type { PostRecord } from "@/lib/db/schema";
import type { PostFormState } from "@/lib/validation/posts";
import { postCategories, slugify } from "@/lib/validation/posts";
import { ImageDropzone } from "@/components/admin/image-dropzone";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { useAdminToast } from "@/components/admin/toast";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-matcha-deep";
const labelClass =
  "mb-1.5 block font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft";

function SubmitButton({ label = "Simpan berita" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full gloss-button px-5 py-3 font-display text-[12px] font-semibold text-cream transition-colors disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <Save size={14} aria-hidden="true" />
      )}
      {pending ? "Menyimpan..." : label}
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
  const router = useRouter();
  const toast = useAdminToast();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const lastSuccess = useRef<PostFormState | null>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [cover, setCover] = useState<string | null>(post?.cover ?? null);
  const [gallery, setGallery] = useState<string[]>(() => {
    if (!post?.images) {
      return [];
    }
    try {
      const parsed: unknown = JSON.parse(post.images);
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!state.success || lastSuccess.current === state) {
      return;
    }
    lastSuccess.current = state;

    setDirty(false);
    toast.push(state.message || "Berita disimpan.");

    if (!post && state.id) {
      router.replace(`/admin/berita/${state.id}`);
      return;
    }
    router.refresh();
  }, [post, router, state, toast]);

  useEffect(() => {
    const element = titleRef.current;
    if (!element) {
      return;
    }
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [title]);

  useEffect(() => {
    if (!dirty) {
      return;
    }

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const published = status === "published";
  const publicHref = `/berita/${slug || post?.slug || ""}`;

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={() => setDirty(true)}
      className="mt-7"
      noValidate
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/berita"
          className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Semua berita
        </Link>
        <div className="flex items-center gap-2 text-[11px] text-muted">
          {dirty ? (
            <span className="inline-flex items-center gap-1.5 text-[#8a4b06]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />
              Belum disimpan
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-matcha-deep">
              <CheckCircle2 size={12} aria-hidden="true" />
              {post ? "Tersimpan" : "Draf baru"}
            </span>
          )}
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span className="hidden sm:inline">Ctrl/⌘ + S untuk simpan</span>
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#8a1c14]"
        >
          {state.error}
        </p>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          <section className="gloss-card rounded-[22px] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow text-[11px] text-matcha-deep">
                {post ? "Edit berita" : "Berita baru"}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  published
                    ? "bg-matcha-soft text-matcha-deep"
                    : "bg-[#b45309]/10 text-[#8a4b06]"
                }`}
              >
                {published ? "Terbit" : "Draf"}
              </span>
            </div>

            <label htmlFor="title" className="sr-only">
              Judul berita
            </label>
            <textarea
              ref={titleRef}
              id="title"
              name="title"
              required
              rows={1}
              value={title}
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);
                setDirty(true);
                if (!slugTouched) {
                  setSlug(slugify(value));
                }
              }}
              placeholder="Judul berita yang jelas dan manusiawi"
              className="mt-4 block w-full resize-none overflow-hidden border-0 bg-transparent p-0 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink outline-none placeholder:text-muted/40"
            />

            <div className="mt-4 flex items-center gap-1.5 text-[12px] text-muted">
              <span className="shrink-0">/berita/</span>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                  setSlugTouched(true);
                  setDirty(true);
                }}
                placeholder="slug-berita"
                className="min-w-0 flex-1 border-b border-transparent bg-transparent pb-0.5 text-ink outline-none transition-colors focus:border-matcha-deep"
              />
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label htmlFor="excerpt" className={labelClass}>
                  Ringkasan
                </label>
                <span className={`text-[10px] ${excerpt.length > 320 ? "text-[#8a1c14]" : "text-muted"}`}>
                  {excerpt.length}/320
                </span>
              </div>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={excerpt}
                onChange={(event) => {
                  setExcerpt(event.target.value);
                  setDirty(true);
                }}
                className={`${inputClass} resize-y`}
                placeholder="Satu sampai dua kalimat yang membuat orang ingin membaca."
              />
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-display text-[12px] font-semibold text-ink">
                Isi berita
              </label>
              <span className="text-[10px] text-muted">
                Drag/drop atau tempel gambar ke editor
              </span>
            </div>
            <RichTextEditor
              initialContent={post?.contentHtml ?? ""}
              onChange={() => setDirty(true)}
            />
          </section>

        </div>

        <aside className="space-y-4 xl:sticky xl:top-6">
          <section className="rounded-[20px] border border-line bg-cream p-4">
            <h2 className="font-display text-sm font-semibold text-ink">
              Publikasi
            </h2>
            <div className="mt-3 space-y-3">
              <div>
                <label htmlFor="status" className={labelClass}>
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setDirty(true);
                  }}
                  className={inputClass}
                >
                  <option value="draft">Draf — belum tampil</option>
                  <option value="published">Terbit — tampil di situs</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={post?.category ?? "berita"}
                  onChange={() => setDirty(true)}
                  className={inputClass}
                >
                  {postCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <SubmitButton label={post ? "Simpan perubahan" : "Simpan berita"} />
              {post && published && publicHref !== "/berita/" && (
                <Link
                  href={publicHref}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                >
                  <Eye size={13} aria-hidden="true" />
                  Lihat artikel
                </Link>
              )}
            </div>
          </section>

          <section className="rounded-[20px] border border-line bg-cream p-4">
            <ImageDropzone
              name="cover"
              folder="posts"
              label="Gambar cover"
              value={cover}
              onChange={(value) => {
                setCover(typeof value === "string" ? value : null);
                setDirty(true);
              }}
              aspect="aspect-[16/10]"
              hint="Tampil sebagai gambar utama kartu berita."
            />
          </section>

          <section className="rounded-[20px] border border-line bg-cream p-4">
            <ImageDropzone
              name="images"
              folder="posts"
              multiple
              maxFiles={6}
              label="Foto tambahan"
              value={gallery}
              onChange={(value) => {
                setGallery(Array.isArray(value) ? value : []);
                setDirty(true);
              }}
              hint="1–6 foto untuk galeri di bawah artikel."
            />
          </section>

          <div className="rounded-[18px] border border-dashed border-line px-4 py-3 text-[11px] leading-relaxed text-muted">
            <Sparkles size={13} className="mb-1 text-matcha-deep" aria-hidden="true" />
            Editor menyimpan HTML yang sudah dibersihkan. Gambar diunggah ke
            penyimpanan lokal dan tidak memakai path manual.
          </div>
        </aside>
      </div>
    </form>
  );
}
