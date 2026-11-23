import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  FileText,
  HelpCircle,
  MapPin,
  Phone,
} from "lucide-react";
import {
  ppdbDocuments,
  ppdbRoutes,
  ppdbSteps,
  site,
} from "@/lib/content";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

const pageUrl = "https://smpn2ambulu.sch.id/spmb";
const pageTitle = `SPMB ${site.ppdbYear}`;
const pageDescription = `Informasi SPMB ${site.name} tahun ajaran ${site.ppdbYear}: jalur pendaftaran, dokumen, alur, dan kontak panitia. Ikuti pengumuman resmi sekolah.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/spmb",
  },
  openGraph: {
    title: `${pageTitle} — ${site.name}`,
    description: pageDescription,
    url: pageUrl,
    images: ["/logos/og-smpn2ambulu.png"],
  },
};

const faqs = [
  {
    question: "Jalur apa saja yang tersedia?",
    answer: `SPMB SMP memakai jalur ${ppdbRoutes.map((route) => route.title.toLowerCase()).join(", ")}. Setiap jalur punya syarat yang berbeda, jadi pastikan pilihanmu sesuai ketentuan panitia.`,
  },
  {
    question: "Dokumen apa yang perlu disiapkan?",
    answer: `Siapkan ${ppdbDocuments.map((document) => document.toLowerCase()).join(", ")}. Dokumen final mengikuti jalur yang dipilih dan ketentuan panitia.`,
  },
  {
    question: "Bagaimana alur pendaftarannya?",
    answer:
      "Pahami jalur dan jadwal, siapkan dokumen, lalu daftar melalui kanal resmi yang ditetapkan panitia. Simpan bukti pendaftaran dan pantau pengumuman resmi sekolah.",
  },
  {
    question: "Di mana jadwal dan tautan pendaftaran diumumkan?",
    answer:
      "Jadwal dan tautan pendaftaran mengikuti pengumuman resmi panitia SPMB dan Dinas Pendidikan. Gunakan hanya kanal yang diumumkan sekolah; jangan menggunakan tautan yang tidak jelas asalnya.",
  },
  {
    question: "Bagaimana cara menghubungi panitia?",
    answer: `Hubungi sekolah di ${site.phone} pada jam layanan Senin–Jumat, 07.00–15.00 WIB, atau datang ke ${site.address}.`,
  },
];

const breadcrumbJsonLd = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Beranda",
      item: "https://smpn2ambulu.sch.id",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: `SPMB ${site.ppdbYear}`,
      item: pageUrl,
    },
  ],
};

const faqJsonLd = {
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [breadcrumbJsonLd, faqJsonLd],
}).replace(/</g, "\\u003c");

export default function SpmbPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <section
        id="top"
        className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14"
      >
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 eyebrow text-[11px] text-muted">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-matcha-deep"
                >
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-matcha-deep">SPMB {site.ppdbYear}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <SectionLabel index="01">SPMB {site.ppdbYear}</SectionLabel>
              <Reveal variant="mask">
                <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.3rem,4vw,4.15rem)] font-semibold leading-[1] tracking-[-0.05em] text-ink">
                  Penerimaan murid{" "}
                  <span className="font-medium text-matcha-deep">baru.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[46ch] text-[14px] leading-[1.9] text-ink-soft">
                  Informasi awal SPMB {site.name} tahun ajaran{" "}
                  {site.ppdbYear}. Jalur, syarat, dan jadwal resmi mengikuti
                  pengumuman panitia serta Dinas Pendidikan.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="#alur" variant="matcha">
                    Lihat alur
                  </ButtonLink>
                  <ButtonLink href={site.phoneHref} variant="outline">
                    Hubungi panitia
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[44ch] eyebrow text-[11px] leading-relaxed text-muted">
                  Halaman ini adalah informasi awal, bukan pengganti pengumuman
                  resmi SPMB.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="scale" delay={0.1}>
                <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#4c8a5b_0%,#2f5d3b_45%,#163722_100%)] p-6 text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_30px_80px_rgba(24,56,35,0.2)] sm:rounded-[38px] sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-cream/10"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-matcha-light/15 blur-3xl"
                  />

                  <div className="relative">
                    <p className="eyebrow text-[11px] text-cream/70">
                      Tahun ajaran
                    </p>
                    <p className="mt-3 font-display text-[clamp(3.2rem,7vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                      {site.ppdbYear}
                    </p>
                    <p className="mt-4 max-w-[32ch] text-[12px] leading-[1.8] text-cream/80">
                      Lima jalur pendaftaran dengan ketentuan yang berbeda.
                      Pilih jalur yang paling sesuai sebelum menyiapkan
                      dokumen.
                    </p>

                    <div className="mt-8 border-t border-cream/15">
                      {ppdbRoutes.map((route, index) => (
                        <div
                          key={route.title}
                          className="flex items-baseline gap-4 border-b border-cream/15 py-3.5"
                        >
                          <span className="font-display text-[11px] font-semibold text-cream/55">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[13px] font-medium text-cream">
                            {route.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 eyebrow text-[10px] leading-relaxed text-cream/60">
                      Verifikasi syarat melalui panitia SPMB.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="jalur" className="section-pad border-t border-line bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="02">Jalur</SectionLabel>
              <Reveal variant="mask">
                <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                  Lima jalur,{" "}
                  <span className="font-medium text-matcha-deep">
                    satu tujuan.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[38ch] text-[14px] leading-[1.9] text-ink-soft">
                {ppdbSteps[0].description} Syarat setiap jalur wajib
                diverifikasi melalui pengumuman resmi.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ppdbRoutes.map((route, index) => (
              <Reveal key={route.title} delay={index * 0.05}>
                <article className="h-full rounded-[24px] border border-line bg-cream p-6">
                  <span className="eyebrow text-[11px] text-matcha-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-[clamp(1.2rem,1.6vw,1.5rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
                    {route.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.8] text-ink-soft">
                    {route.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-[70ch] text-[12px] leading-[1.8] text-muted">
            Jalur dan persyaratan dapat berubah sesuai kebijakan pemerintah
            daerah. Selalu cek pengumuman resmi sebelum mendaftar.
          </p>
        </div>
      </section>

      <section id="alur" className="section-pad bg-matcha-mist">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <SectionLabel index="03">Persiapan</SectionLabel>
              <Reveal variant="mask">
                <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                  Dokumen dan alur{" "}
                  <span className="font-medium text-matcha-deep">
                    pendaftaran.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.9] text-ink-soft">
                  Siapkan berkas sejak awal. Dokumen final mengikuti jalur yang
                  dipilih dan ketentuan panitia SPMB.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ppdbDocuments.map((document, index) => (
                  <Reveal key={document} delay={0.1 + index * 0.04}>
                    <div className="flex h-full items-start gap-3 rounded-[18px] border border-white/80 bg-white/65 p-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-matcha-soft text-matcha-deep">
                        <Check size={13} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="text-[12px] leading-[1.7] text-ink">
                        {document}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.24}>
                <div className="mt-6 flex items-start gap-3 rounded-[18px] border border-line bg-white/55 p-4">
                  <FileText
                    size={16}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-matcha-deep"
                    aria-hidden="true"
                  />
                  <p className="max-w-[50ch] text-[12px] leading-[1.8] text-ink-soft">
                    Simpan bukti pendaftaran dan pantau pengumuman resmi
                    sekolah. Jangan mengirim dokumen pribadi ke kanal yang tidak
                    terverifikasi.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="scale" delay={0.1}>
                <div className="rounded-[28px] border border-white/80 bg-cream p-6 shadow-[0_20px_50px_rgba(24,56,35,0.08)] sm:p-8">
                  <p className="eyebrow text-[11px] text-muted">Alur singkat</p>
                  <div className="mt-6">
                    {ppdbSteps.map((item) => (
                      <div
                        key={item.step}
                        className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5"
                      >
                        <span className="font-display text-lg font-semibold leading-none text-matcha-deep">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-display text-[clamp(1.1rem,1.5vw,1.35rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[12px] leading-[1.8] text-ink-soft">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <ButtonLink
                      href={site.phoneHref}
                      variant="matcha"
                      className="w-full"
                    >
                      Tanya panitia
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad bg-cream">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <SectionLabel index="04">FAQ</SectionLabel>
              <Reveal variant="mask">
                <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                  Pertanyaan yang{" "}
                  <span className="font-medium text-matcha-deep">
                    sering muncul.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[32ch] text-[13px] leading-[1.9] text-ink-soft">
                  Kalau informasi yang kamu cari belum ada di sini, hubungi
                  sekolah melalui kanal resmi.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-line">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start gap-3">
                        <HelpCircle
                          size={16}
                          strokeWidth={1.6}
                          className="mt-0.5 shrink-0 text-matcha-deep"
                          aria-hidden="true"
                        />
                        <span className="font-display text-[clamp(1.05rem,1.5vw,1.3rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
                          {faq.question}
                        </span>
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.6}
                        className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-[66ch] pb-5 pl-7 text-[13px] leading-[1.9] text-ink-soft">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontak-spmb" className="pb-16 sm:pb-24">
        <div className="container-x">
          <div className="gloss-dark relative overflow-hidden rounded-[32px] px-6 py-12 text-cream sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-matcha-light/10 blur-3xl"
            />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className="eyebrow text-[11px] text-matcha-light/75">
                  Kontak SPMB
                </p>
                <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2rem,3.4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  Butuh informasi{" "}
                  <span className="font-medium text-matcha-light">resmi?</span>
                </h2>
                <p className="mt-5 max-w-[42ch] text-[13px] leading-[1.9] text-cream/75">
                  Hubungi sekolah pada jam layanan untuk memastikan jalur,
                  dokumen, dan jadwal SPMB terbaru.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={site.phoneHref} variant="cream">
                    Telepon sekolah
                  </ButtonLink>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-cream/25 px-6 py-3.5 font-display text-[12px] font-semibold text-cream transition-colors duration-500 hover:border-cream hover:bg-cream hover:text-ink"
                  >
                    Lihat lokasi
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className="link-arrow"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[24px] border border-cream/15 bg-cream/[0.06] p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Phone
                      size={16}
                      strokeWidth={1.6}
                      className="mt-0.5 shrink-0 text-matcha-light"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="eyebrow text-[10px] text-cream/55">
                        Telepon
                      </p>
                      <a
                        href={site.phoneHref}
                        className="mt-1 block text-[13px] text-cream transition-colors hover:text-matcha-light"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start gap-3 border-t border-cream/15 pt-5">
                    <MapPin
                      size={16}
                      strokeWidth={1.6}
                      className="mt-0.5 shrink-0 text-matcha-light"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="eyebrow text-[10px] text-cream/55">
                        Alamat
                      </p>
                      <p className="mt-1 max-w-[30ch] text-[12px] leading-[1.7] text-cream/80">
                        {site.address}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-cream/15 pt-5 eyebrow text-[10px] leading-relaxed text-cream/55">
                    Senin–Jumat · 07.00–15.00 WIB
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <nav
                aria-label="Tautan terkait SPMB"
                className="flex flex-wrap gap-x-6 gap-y-3"
              >
                <Link
                  href="/guru"
                  className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-cream/70 transition-colors hover:text-matcha-light"
                >
                  Tenaga pendidik
                  <ArrowUpRight
                    size={11}
                    className="link-arrow"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/berita"
                  className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-cream/70 transition-colors hover:text-matcha-light"
                >
                  Berita sekolah
                  <ArrowUpRight
                    size={11}
                    className="link-arrow"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/#fasilitas"
                  className="group inline-flex items-center gap-1.5 eyebrow text-[11px] text-cream/70 transition-colors hover:text-matcha-light"
                >
                  Fasilitas
                  <ArrowUpRight
                    size={11}
                    className="link-arrow"
                    aria-hidden="true"
                  />
                </Link>
              </nav>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 eyebrow text-[11px] text-cream/70 transition-colors hover:text-cream"
              >
                <ArrowLeft
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Kembali ke beranda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
