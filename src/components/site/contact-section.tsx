import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

const contactItems = [
  {
    icon: MapPin,
    label: "Alamat",
    content: site.address,
    href: site.mapsUrl,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    content: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    icon: Clock,
    label: "Jam layanan",
    content: "Senin–Jumat · 07.00–15.00 WIB",
    href: null,
    external: false,
  },
];

export function ContactSection() {
  return (
    <section id="kontak" className="section-pad bg-cream">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel index="10">Kontak</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(2.1rem,3.4vw,3.6rem)] leading-[1.02] tracking-[-0.045em] text-ink">
                Mampir atau <span className="font-medium text-matcha-deep">hubungi kami.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[38ch] text-sm font-normal leading-[1.9] text-ink-soft">
                Untuk pertanyaan tentang sekolah, kunjungan, atau informasi SPMB,
                silakan hubungi kanal resmi kami.
              </p>
            </Reveal>

            <div className="mt-10 border-t border-line">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-matcha-soft text-matcha-deep">
                      <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="eyebrow block text-[11px] text-muted">
                        {item.label}
                      </span>
                      <span className="mt-1 block max-w-[36ch] text-[12px] font-normal leading-relaxed text-ink">
                        {item.content}
                      </span>
                    </span>
                    {item.href && (
                      <ArrowUpRight
                        size={14}
                        className="mt-2 shrink-0 text-matcha-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                return (
                  <Reveal key={item.label} delay={0.1 + index * 0.04}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="group flex gap-4 border-b border-line py-5"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex gap-4 border-b border-line py-5">
                        {body}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-5 eyebrow text-[11px] leading-relaxed text-muted">
                Email, nomor telepon, dan WhatsApp resmi akan ditampilkan
                setelah data sekolah diverifikasi.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="scale" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,#f7fbf2,#e2f0d8)] shadow-[0_24px_60px_rgba(24,56,35,0.1)] sm:aspect-[16/11]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${site.name}, ${site.address}`,
                  )}&z=16&output=embed`}
                  title="Peta lokasi SMP Negeri 2 Ambulu di Google Maps"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />

                <div className="pointer-events-none absolute left-4 top-4 max-w-[min(19rem,calc(100%-2rem))] sm:left-5 sm:top-5">
                  <div className="pointer-events-auto rounded-[18px] border border-white/70 bg-cream/95 p-4 shadow-[0_16px_40px_rgba(24,56,35,0.14)] backdrop-blur-md">
                    <p className="flex items-center gap-1.5 eyebrow text-[11px] text-matcha-deep">
                      <MapPin size={12} aria-hidden="true" />
                      Lokasi sekolah
                    </p>
                    <p className="mt-1.5 font-display text-lg font-semibold leading-tight tracking-[-0.025em] text-ink">
                      SMP Negeri 2 Ambulu
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">
                      {site.address}
                    </p>
                  </div>
                </div>

                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1c2d21,#0b120d)] px-4 py-3 text-[11px] font-medium tracking-[-0.01em] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_rgba(11,18,13,0.2)] transition-colors hover:brightness-110 sm:bottom-5 sm:right-5"
                >
                  Buka di Google Maps
                  <ArrowUpRight size={13} className="link-arrow" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <Link
                href="/kritik-saran"
                data-tilt data-cursor="Kirim" className="gloss-card group mt-4 flex items-center justify-between gap-4 rounded-[20px] px-5 py-4 transition-colors hover:border-matcha-deep/40"
              >
                <div>
                  <p className="eyebrow text-[11px] text-matcha-deep">
                    Kritik &amp; saran
                  </p>
                  <p className="mt-1 font-display text-[13px] font-semibold text-ink">
                    Sampaikan masukan untuk sekolah
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-matcha-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <p className="eyebrow text-[11px] text-muted">
                  Media sosial resmi
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {["Instagram", "YouTube", "Facebook"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="group inline-flex items-center gap-1.5 text-[11px] font-normal text-ink-soft transition-colors hover:text-matcha-deep"
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
