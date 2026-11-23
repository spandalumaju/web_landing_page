import { ArrowUp, ArrowUpRight } from "lucide-react";
import { footerLinks, site } from "@/lib/content";
import { SchoolMark } from "@/components/site/school-mark";

const socials = ["Instagram", "YouTube", "Facebook", "TikTok"];

export function SiteFooter() {
  return (
    <footer className="gloss-dark relative overflow-hidden text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-matcha-deep/20 blur-3xl"
      />
      <div className="container-x relative py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <a
              href="#top"
              className="group flex items-start gap-5"
              aria-label="Kembali ke atas"
            >
              <SchoolMark className="mt-2 h-12 w-12 shrink-0 text-matcha-light" />
              <span className="font-display text-[clamp(2.6rem,4.6vw,4.2rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                SMPN 2
                <br />
                <span className="font-medium text-matcha-light">Ambulu</span>
              </span>
            </a>
            <p className="mt-8 max-w-sm text-sm font-normal leading-relaxed text-cream/70">
              Sekolah negeri di Sabrang, Ambulu. Kami merawat cara berpikir,
              karakter, dan rasa ingin tahu murid.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-cream/70 transition-colors hover:text-matcha-light"
                  aria-label={`${social} SMP Negeri 2 Ambulu`}
                >
                  {social}
                  <ArrowUpRight
                    size={11}
                    className="link-arrow"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow text-[11px] text-matcha-light/70">
                  {group.title}
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-normal text-cream/70 transition-colors hover:text-cream"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="eyebrow text-[11px] text-matcha-light/70">
                Kontak
              </h2>
              <address className="mt-6 space-y-3.5 text-sm not-italic font-normal leading-relaxed text-cream/70">
                <p>{site.address}</p>
                <p>
                  <a
                    href={`mailto:${site.email}`}
                    className="underline decoration-cream/20 underline-offset-4 transition-colors hover:text-cream"
                  >
                    {site.email}
                  </a>
                </p>
                <p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 underline decoration-cream/20 underline-offset-4 transition-colors hover:text-cream"
                  >
                    Google Maps
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-6 text-[11px] text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="transition-colors hover:text-cream">
              Kebijakan privasi
            </a>
            <span className="hidden h-3 w-px bg-cream/15 sm:block" />
            <span className="eyebrow text-[11px] text-cream/60">
              Profil sekolah · 2026
            </span>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream"
            >
              Kembali ke atas
              <ArrowUp size={12} className="link-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
