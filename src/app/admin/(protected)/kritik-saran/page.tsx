import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { MessageSquareText, RefreshCw, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { feedback } from "@/lib/db/schema";
import { ConfirmForm } from "@/components/admin/confirm-form";
import {
  feedbackCategoryLabel,
  feedbackStatuses,
  feedbackStatusLabel,
} from "@/lib/validation/feedback";
import {
  deleteFeedbackAction,
  resendFeedbackAction,
  updateFeedbackStatusAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Kritik & Saran",
};

export const dynamic = "force-dynamic";

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(value);
}

function statusClass(status: string): string {
  switch (status) {
    case "baru":
      return "bg-[#b45309]/10 text-[#8a4b06]";
    case "dibaca":
      return "bg-matcha-soft text-matcha-deep";
    case "ditindaklanjuti":
      return "bg-matcha-deep text-cream";
    default:
      return "bg-line/40 text-muted";
  }
}

export default async function AdminFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = feedbackStatuses.some((item) => item.value === status)
    ? status
    : "semua";
  const all = db.select().from(feedback).orderBy(desc(feedback.createdAt)).all();
  const rows =
    activeStatus && activeStatus !== "semua"
      ? db
          .select()
          .from(feedback)
          .where(eq(feedback.status, activeStatus))
          .orderBy(desc(feedback.createdAt))
          .all()
      : all;
  const counts = {
    semua: all.length,
    baru: all.filter((item) => item.status === "baru").length,
    dibaca: all.filter((item) => item.status === "dibaca").length,
    ditindaklanjuti: all.filter((item) => item.status === "ditindaklanjuti").length,
    arsip: all.filter((item) => item.status === "arsip").length,
  };
  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[11px] text-matcha-deep">CRM</p>
          <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-ink">
            Kritik &amp; saran
          </h1>
          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            {all.length} pesan masuk. Tinjau, tandai tindak lanjut, dan teruskan
            ulang ke Telegram jika perlu.
          </p>
        </div>
        {!telegramConfigured && (
          <div className="max-w-sm rounded-xl border border-[#b45309]/20 bg-[#b45309]/5 px-4 py-3 text-[11px] leading-relaxed text-[#8a4b06]">
            Telegram bot belum dikonfigurasi. Isi `TELEGRAM_BOT_TOKEN` dan
            `TELEGRAM_CHAT_ID` di `.env.local` untuk notifikasi otomatis.
          </div>
        )}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {[
          { value: "semua", label: "Semua", count: counts.semua },
          ...feedbackStatuses.map((item) => ({
            value: item.value,
            label: item.label,
            count: counts[item.value as keyof typeof counts] ?? 0,
          })),
        ].map((filter) => {
          const active = activeStatus === filter.value;
          return (
            <Link
              key={filter.value}
              href={
                filter.value === "semua"
                  ? "/admin/kritik-saran"
                  : `/admin/kritik-saran?status=${filter.value}`
              }
              className={`rounded-full border px-3.5 py-2 font-display text-[11px] font-semibold tracking-[-0.01em] transition-colors ${
                active
                  ? "border-matcha-deep bg-matcha-deep text-cream"
                  : "border-line text-muted hover:border-matcha-deep hover:text-matcha-deep"
              }`}
            >
              {filter.label} ({filter.count})
            </Link>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {rows.length === 0 && (
          <div className="rounded-[22px] border border-line bg-cream p-8 text-center">
            <MessageSquareText
              size={26}
              className="mx-auto text-matcha-deep/40"
              aria-hidden="true"
            />
            <p className="mt-3 text-[13px] text-muted">
              Belum ada pesan pada filter ini.
            </p>
          </div>
        )}

        {rows.map((item) => (
          <article
            key={item.id}
            className="rounded-[22px] border border-line bg-cream p-5 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-matcha-soft px-2.5 py-1 text-[11px] font-medium tracking-[-0.01em] text-matcha-deep">
                    {feedbackCategoryLabel(item.category)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[-0.01em] ${statusClass(item.status)}`}
                  >
                    {feedbackStatusLabel(item.status)}
                  </span>
                  <span className="text-[11px] text-muted">
                    {formatDate(item.createdAt)} WIB
                  </span>
                </div>
                <p className="mt-3 font-display text-[13px] font-semibold text-ink">
                  {item.name || "Anonim"}
                  {item.contact && (
                    <span className="ml-2 font-sans text-[11px] font-normal text-muted">
                      {item.contact}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <form
                  action={updateFeedbackStatusAction.bind(null, item.id)}
                  className="flex items-center gap-2"
                >
                  <label htmlFor={`status-${item.id}`} className="sr-only">
                    Status pesan
                  </label>
                  <select
                    id={`status-${item.id}`}
                    name="status"
                    defaultValue={item.status}
                    className="rounded-full border border-line bg-white px-3 py-2 text-[11px] text-ink-soft outline-none focus:border-matcha-deep"
                  >
                    {feedbackStatuses.map((statusItem) => (
                      <option key={statusItem.value} value={statusItem.value}>
                        {statusItem.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-ink px-3 py-2 font-display text-[11px] font-semibold tracking-[-0.01em] text-cream transition-colors hover:bg-matcha-deep"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-[13px] leading-[1.8] text-ink-soft">
              {item.message}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p
                className={`text-[11px] ${
                  item.telegramSent ? "text-matcha-deep" : "text-[#8a4b06]"
                }`}
              >
                {item.telegramSent
                  ? "Terkirim ke Telegram"
                  : `Telegram: ${item.telegramError || "belum dikirim"}`}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <form action={resendFeedbackAction.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 font-display text-[11px] font-semibold tracking-[-0.01em] text-ink-soft transition-colors hover:border-matcha-deep hover:text-matcha-deep"
                  >
                    <RefreshCw size={11} aria-hidden="true" />
                    Kirim ulang Telegram
                  </button>
                </form>
                <ConfirmForm
                  action={deleteFeedbackAction.bind(null, item.id)}
                  message="Hapus pesan kritik & saran ini?"
                >
                  <button
                    type="submit"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-[#b42318]/40 hover:text-[#8a1c14]"
                    aria-label="Hapus pesan"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                  </button>
                </ConfirmForm>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
