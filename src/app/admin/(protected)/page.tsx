import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import {
  ArrowUpRight,
  Newspaper,
  Trophy,
  Users,
  MessageSquareText,
} from "lucide-react";
import { db } from "@/lib/db";
import { achievements, educators, feedback, posts } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Ringkasan",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  const [
    recentEducators,
    recentPosts,
    recentFeedback,
    educatorCount,
    publishedEducatorCount,
    postCount,
    achievementCount,
    feedbackCount,
    newFeedbackCount,
  ] = await Promise.all([
    db
      .select()
      .from(educators)
      .orderBy(desc(educators.updatedAt))
      .limit(5),
    db.select().from(posts).orderBy(desc(posts.updatedAt)).limit(4),
    db
      .select()
      .from(feedback)
      .orderBy(desc(feedback.createdAt))
      .limit(3),
    db.select({ value: sql<number>`count(*)` }).from(educators),
    db
      .select({ value: sql<number>`count(*)` })
      .from(educators)
      .where(eq(educators.published, true)),
    db.select({ value: sql<number>`count(*)` }).from(posts),
    db.select({ value: sql<number>`count(*)` }).from(achievements),
    db.select({ value: sql<number>`count(*)` }).from(feedback),
    db
      .select({ value: sql<number>`count(*)` })
      .from(feedback)
      .where(eq(feedback.status, "baru")),
  ]);

  const counts = {
    educators: Number(educatorCount[0]?.value ?? 0),
    publishedEducators: Number(publishedEducatorCount[0]?.value ?? 0),
    posts: Number(postCount[0]?.value ?? 0),
    achievements: Number(achievementCount[0]?.value ?? 0),
    feedback: Number(feedbackCount[0]?.value ?? 0),
    newFeedback: Number(newFeedbackCount[0]?.value ?? 0),
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">Panel pengelola</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Selamat datang, {session?.user.name.split(" ")[0] ?? "Admin"}.
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-muted">
            Ringkasan konten sekolah. Semua perubahan langsung tersimpan ke
            database dan halaman publik yang terhubung.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/berita/baru"
            className="inline-flex shrink-0 items-center gap-2 rounded-full gloss-button px-5 py-3 font-display text-[11px] font-semibold tracking-[-0.01em] text-cream transition-colors "
          >
            Tulis berita
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <Link
            href="/admin/guru"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-cream px-5 py-3 font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
          >
            Kelola pendidik
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Kartu pendidik",
            value: counts.educators,
            hint: `${counts.publishedEducators} kartu tampil di situs`,
            icon: Users,
            href: "/admin/guru",
          },
          {
            label: "Berita",
            value: counts.posts,
            hint: "Draft & published",
            icon: Newspaper,
            href: "/admin/berita",
          },
          {
            label: "Prestasi",
            value: counts.achievements,
            hint: "Arsip prestasi",
            icon: Trophy,
            href: "/admin/prestasi",
          },
          {
            label: "Kritik & saran",
            value: counts.feedback,
            hint: `${counts.newFeedback} belum dibaca`,
            icon: MessageSquareText,
            href: "/admin/kritik-saran",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-[20px] border border-line bg-cream p-5 transition-colors hover:border-matcha-deep/30 hover:bg-white"
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow text-[11px] text-muted">{card.label}</p>
                <Icon
                  size={16}
                  className="text-matcha-deep/60"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
                {card.value}
              </p>
              <p className="mt-1 text-[11px] text-muted">{card.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-[22px] border border-line bg-cream p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-[11px] text-muted">Terakhir diperbarui</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Direktori pendidik
              </h2>
            </div>
            <Link
              href="/admin/guru"
              className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-matcha-deep"
            >
              Kelola
              <ArrowUpRight size={12} className="link-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-line">
            {recentEducators.length === 0 && (
              <p className="py-5 text-[12px] text-muted">Belum ada data.</p>
            )}
            {recentEducators.map((educator) => (
              <div
                key={educator.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-matcha-soft">
                  {educator.photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={educator.photo}
                        alt=""
                        className="h-full w-full object-cover grayscale"
                      />
                    </>
                  ) : (
                    <span className="font-display text-[9px] font-semibold text-matcha-deep/70">
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
                  <p className="truncate font-display text-[12px] font-semibold text-ink">
                    {educator.name}
                  </p>
                  <p className="truncate text-[11px] text-muted">
                    {educator.role}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-medium tracking-[-0.01em] ${
                    educator.published
                      ? "bg-matcha-soft text-matcha-deep"
                      : "bg-[#b42318]/5 text-[#8a1c14]"
                  }`}
                >
                  {educator.published ? "Tampil" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[22px] border border-line bg-cream p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-[11px] text-muted">Terakhir diperbarui</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Berita
              </h2>
            </div>
            <Link
              href="/admin/berita"
              className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-matcha-deep"
            >
              Kelola
              <ArrowUpRight size={12} className="link-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-line">
            {recentPosts.length === 0 && (
              <p className="py-5 text-[12px] text-muted">Belum ada berita.</p>
            )}
            {recentPosts.map((post) => (
              <div key={post.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-display text-[12px] font-semibold text-ink">
                    {post.title}
                  </p>
                  <span className="shrink-0 text-[11px] tracking-[-0.01em] text-muted">
                    {post.status === "published" ? "Terbit" : "Draf"}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  /{post.slug} · <span className="capitalize">{post.category}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[22px] border border-line bg-cream p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-[11px] text-muted">CRM</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Kritik &amp; saran terbaru
            </h2>
          </div>
          <Link
            href="/admin/kritik-saran"
            className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-matcha-deep"
          >
            Kelola
            <ArrowUpRight size={12} className="link-arrow" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 divide-y divide-line">
          {recentFeedback.length === 0 && (
            <p className="py-5 text-[12px] text-muted">Belum ada pesan.</p>
          )}
          {recentFeedback.map((item) => (
            <div key={item.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-matcha-soft px-2 py-0.5 text-[11px] tracking-[-0.01em] text-matcha-deep">
                  {item.category}
                </span>
                <span className="text-[11px] text-muted">
                  {item.name || "Anonim"}
                </span>
                <span className="ml-auto text-[11px] tracking-[-0.01em] text-muted">
                  {item.status}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink-soft">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
