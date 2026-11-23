import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquareText, ShieldCheck, Send } from "lucide-react";
import { SectionLabel } from "@/components/site/section-label";
import { FeedbackForm } from "./feedback-form";
import { submitFeedbackAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kritik & Saran",
  description:
    "Kirim kritik, saran, atau aspirasi untuk SMP Negeri 2 Ambulu. Pesan diterima panel pengelola sekolah dan kanal Telegram internal.",
  alternates: {
    canonical: "/kritik-saran",
  },
};

export default function FeedbackPage() {
  return (
    <main id="top" className="section-pad bg-cream">
      <div className="container-x">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Kembali ke beranda
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Aspirasi</SectionLabel>
            <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.4rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
              Kritik &amp;{" "}
              <span className="font-medium text-matcha-deep">saran.</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[14px] leading-[1.9] text-ink-soft">
              Masukan Anda membantu sekolah memperbaiki layanan dan proses
              belajar. Pesan bisa dikirim dengan nama atau anonim.
            </p>

            <div className="gloss-card mt-8 rounded-[26px] p-5 sm:p-7">
              <FeedbackForm
                action={submitFeedbackAction}
                turnstileSiteKey={
                  process.env.TURNSTILE_SECRET_KEY
                    ? process.env.TURNSTILE_SITE_KEY
                    : undefined
                }
              />
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-16">
            <div className="gloss-sheen rounded-[26px] bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] p-6 text-cream shadow-[0_22px_50px_rgba(24,56,35,0.16)] sm:p-7">
              <MessageSquareText
                size={24}
                className="text-matcha-light"
                aria-hidden="true"
              />
              <h2 className="mt-5 max-w-[16ch] font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">
                Pesan Anda sampai ke pengelola.
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-cream/70">
                Setiap kiriman masuk ke dashboard admin. Jika bot Telegram
                sekolah aktif, notifikasi juga dikirim ke kanal internal.
              </p>
              <div className="mt-6 space-y-4 border-t border-cream/15 pt-5">
                {[
                  {
                    icon: Send,
                    title: "Masuk ke dashboard",
                    text: "Admin dapat membaca, menandai, dan menindaklanjuti pesan.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Dipakai secara internal",
                    text: "Pesan tidak ditampilkan sebagai komentar publik.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3">
                      <Icon
                        size={15}
                        className="mt-0.5 shrink-0 text-matcha-light"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-[11px] font-semibold">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-cream/60">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-line bg-matcha-mist p-5">
              <p className="eyebrow text-[11px] text-matcha-deep">
                Catatan privasi
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
                Nama dan kontak bersifat opsional. Jangan mengirim data pribadi
                sensitif. Pesan disimpan untuk keperluan evaluasi sekolah.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
