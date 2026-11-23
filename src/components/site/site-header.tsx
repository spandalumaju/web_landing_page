"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { ButtonLink } from "@/components/site/button-link";
import { SchoolMark } from "@/components/site/school-mark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-cream/85 backdrop-blur-2xl transition-shadow duration-500 ${
        scrolled || open ? "shadow-[0_1px_0_rgba(255,255,255,0.8),0_18px_50px_rgba(24,56,35,0.08)]" : ""
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between md:h-24">
        <Link
          href="/#top"
          className="group flex items-center gap-3.5"
          aria-label="SMP Negeri 2 Ambulu — kembali ke atas"
        >
          <SchoolMark className="h-10 w-10 text-matcha-deep transition-transform duration-500 group-hover:rotate-6 md:h-11 md:w-11" />
          <span className="flex flex-col gap-1">
            <span className="font-display text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink md:text-[27px]">
              SMPN 2
            </span>
            <span className="eyebrow text-[11px] text-muted">
              Sabrang · Ambulu
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => {
            const active =
              (item.href === "/guru" && pathname === "/guru") ||
              (item.href === "/berita" && pathname.startsWith("/berita"));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link relative eyebrow text-[11px] transition-colors duration-300 hover:text-matcha-deep ${
                  active ? "text-matcha-deep" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <ButtonLink href="/#kontak" variant="matcha">
              Hubungi
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-matcha-deep hover:text-matcha-deep lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? (
              <X size={18} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Menu size={18} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="gloss-dark fixed inset-0 top-20 z-40 flex h-[calc(100dvh-5rem)] flex-col overflow-hidden text-cream md:top-24 md:h-[calc(100dvh-6rem)] lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-cream/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-matcha/20 blur-2xl"
            />

            <nav
              aria-label="Navigasi seluler"
              className="container-x relative flex flex-1 flex-col justify-between overflow-y-auto py-10"
            >
              <div>
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between border-b border-cream/15 py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow text-[11px] text-cream/85">
                        0{index + 1}
                      </span>
                      <span className="font-display text-[clamp(1.8rem,7vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] text-cream transition-colors duration-300 group-hover:text-matcha-light">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-matcha-light/60 transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 max-w-[26ch]">
                <p className="font-sans text-3xl leading-[1.05] text-matcha-light">
                  Sekolah untuk bertanya, mencoba, dan bertumbuh.
                </p>
                <p className="mt-3 eyebrow text-[11px] text-cream/60">
                  SMP Negeri 2 Ambulu · Sabrang
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                <ButtonLink href="/#kontak" variant="cream" className="w-full">
                  Hubungi sekolah
                </ButtonLink>
                <address className="not-italic">
                  <p className="eyebrow text-[11px] leading-relaxed text-cream/85">
                    {site.name}
                    <br />
                    {site.address}
                  </p>
                </address>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
