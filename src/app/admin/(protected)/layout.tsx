import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth/guard";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { SchoolMark } from "@/components/site/school-mark";
import { ToastProvider } from "@/components/admin/toast";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <ToastProvider>
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/70 bg-[linear-gradient(180deg,#fcfdf8,#f4faef)] px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-dvh">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <SchoolMark className="h-10 w-10 text-matcha-deep" />
          <span>
            <span className="block font-display text-base font-semibold leading-none text-ink">
              SMPN 2 Ambulu
            </span>
            <span className="mt-1 block eyebrow text-[11px] text-muted">
              Panel pengelola
            </span>
          </span>
        </Link>

        <div className="mt-8">
          <p className="px-3.5 eyebrow text-[11px] text-muted">Konten</p>
          <div className="mt-3">
            <AdminNav />
          </div>
        </div>

        <div className="mt-auto border-t border-line pt-5">
          <div className="px-3.5">
            <p className="font-display text-[12px] font-semibold text-ink">
              {session.user.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-muted">
              {session.user.email}
            </p>
          </div>
          <div className="mt-4 space-y-1">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[12px] text-ink-soft transition-colors hover:bg-matcha-soft/70 hover:text-ink"
            >
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="font-display font-medium">Lihat situs</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[12px] text-ink-soft transition-colors hover:bg-[#b42318]/5 hover:text-[#8a1c14]"
              >
                <LogOut size={15} aria-hidden="true" />
                <span className="font-display font-medium">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-cream/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin" className="flex items-center gap-2.5">
              <SchoolMark className="h-8 w-8 text-matcha-deep" />
              <span className="font-display text-sm font-semibold text-ink">
                SMPN 2 Admin
              </span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft"
                aria-label="Keluar"
              >
                <LogOut size={15} aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className="mt-3">
            <AdminNav mobile />
          </div>
        </header>

        <main className="mx-auto min-w-0 w-full max-w-[1500px] flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
    </ToastProvider>
  );
}
