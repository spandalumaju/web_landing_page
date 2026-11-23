import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { deletePostAction } from "./actions";

export const metadata: Metadata = {
  title: "Berita",
};

export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
  const rows = db.select().from(posts).orderBy(desc(posts.updatedAt)).all();

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Konten</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Berita
          </h1>
          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            {rows.length} berita tersimpan. Publikasikan untuk menampilkan di
            halaman berita.
          </p>
        </div>
        <Link
          href="/admin/berita/baru"
          className="inline-flex items-center gap-2 rounded-full gloss-button px-4 py-3 font-display text-[11px] font-semibold tracking-[-0.01em] text-cream transition-colors "
        >
          <Plus size={14} aria-hidden="true" />
          Tulis berita
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[22px] border border-line bg-cream">
        {rows.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[13px] text-muted">Belum ada berita.</p>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {rows.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-white/50 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-[14px] font-semibold text-ink">
                      {post.title}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium tracking-[-0.01em] ${
                        post.status === "published"
                          ? "bg-matcha-soft text-matcha-deep"
                          : "bg-[#b42318]/5 text-[#8a1c14]"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    /{post.slug} · {post.category}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                  <Link
                    href={`/admin/berita/${post.id}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                    aria-label={`Edit ${post.title}`}
                  >
                    <Pencil size={14} aria-hidden="true" />
                  </Link>
                  <ConfirmForm
                    action={deletePostAction.bind(null, post.id)}
                    message={`Hapus berita "${post.title}"?`}
                  >
                    <button
                      type="submit"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-[#b42318]/40 hover:text-[#8a1c14]"
                      aria-label={`Hapus ${post.title}`}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </ConfirmForm>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
