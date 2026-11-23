import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SchoolMark } from "@/components/site/school-mark";
import { LoginForm } from "./login-form";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Masuk",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <SchoolMark className="h-11 w-11 text-matcha-deep" />
          <div>
            <p className="font-display text-lg font-semibold leading-none text-ink">
              SMPN 2 Ambulu
            </p>
            <p className="mt-1 eyebrow text-[11px] text-muted">
              Panel pengelola
            </p>
          </div>
        </div>

        <div className="gloss-card rounded-[28px] p-7 sm:p-9">
          <p className="eyebrow text-[11px] text-matcha-deep">Akses terbatas</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            Masuk ke panel
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Kelola profil, guru, berita, dan konten sekolah. Halaman ini tidak
            ditautkan dari situs publik.
          </p>

          <LoginForm
            action={loginAction}
            turnstileSiteKey={
              process.env.TURNSTILE_SECRET_KEY
                ? process.env.TURNSTILE_SITE_KEY
                : undefined
            }
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Kembali ke situs
          </Link>
          <p className="eyebrow text-[11px] text-muted">Admin · SMPN 2</p>
        </div>
      </div>
    </main>
  );
}
