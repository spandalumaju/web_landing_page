import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/content";
import { getPublishedEducators } from "@/lib/db/queries/educators";
import { ButtonLink } from "@/components/site/button-link";
import { OrgChart } from "@/components/site/org-chart";
import { SectionLabel } from "@/components/site/section-label";
import { TeacherGrid } from "@/components/site/teacher-grid";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tenaga Pendidik & Kependidikan",
  description:
    "Struktur organisasi, tenaga pendidik, dan tenaga kependidikan SMP Negeri 2 Ambulu. Kenali guru dan staf yang menjaga proses belajar.",
  alternates: {
    canonical: "/guru",
  },
  openGraph: {
    title: "Tenaga Pendidik & Kependidikan — SMP Negeri 2 Ambulu",
    description:
      "Struktur organisasi, tenaga pendidik, dan tenaga kependidikan SMP Negeri 2 Ambulu.",
    images: ["/logos/og-smpn2ambulu.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
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
      name: "Guru & Tenaga Kependidikan",
      item: "https://smpn2ambulu.sch.id/guru",
    },
  ],
};

const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function GuruPage() {
  const educatorList = getPublishedEducators();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 eyebrow text-[11px] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-matcha-deep">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-matcha-deep">Guru &amp; tenaga kependidikan</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <SectionLabel index="01">Sumber daya</SectionLabel>
              <Reveal variant="mask">
                <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.3rem,3.6vw,3.8rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink">
                  Tenaga pendidik &amp;{" "}
                  <span className="font-medium text-matcha-deep">
                    kependidikan.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[46ch] text-[14px] leading-[1.9] text-ink-soft">
                  Ada {site.educatorsCount} pendidik dan {site.staffCount} tenaga
                  kependidikan yang merancang pembelajaran, menjaga layanan, dan
                  mendampingi murid setiap hari.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
                  <div>
                    <dt className="eyebrow text-[11px] text-muted">
                      Pendidik
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                      {site.educatorsCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[11px] text-muted">
                      Tenaga kependidikan
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                      {site.staffCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[11px] text-muted">
                      Dimensi profil
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                      8
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/#kontak" variant="matcha">
                    Hubungi sekolah
                  </ButtonLink>
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 eyebrow text-[11px] text-muted transition-colors hover:text-matcha-deep"
                  >
                    <ArrowLeft
                      size={13}
                      className="transition-transform duration-300 group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                    Kembali ke beranda
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="relative lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute -right-5 -top-6 h-[76%] w-[82%] rounded-[32px] bg-[linear-gradient(135deg,#e7f2df,#cfe8bf)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              />
              <Reveal variant="scale" delay={0.08}>
                <div className="relative grid grid-cols-2 gap-3">
                  {educatorList.slice(0, 4).map((educator, index) => (
                    <div
                      key={educator.id}
                      className={`relative overflow-hidden rounded-[22px] bg-matcha-mist soft-shadow ${
                        index % 2 === 0 ? "translate-y-5" : ""
                      }`}
                    >
                      <div className="relative aspect-[3/4]">
                        {educator.photo ? (
                          <Image
                            src={educator.photo}
                            alt={`Foto ${educator.name}`}
                            fill
                            sizes="(max-width: 1024px) 40vw, 20vw"
                            className="grayscale object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#dcefd0,#f7fbf2)]">
                            <span className="font-display text-3xl font-semibold tracking-[-0.05em] text-matcha-deep/70">
                              {educator.name
                                .split(" ")
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((part) => part[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                          aria-hidden="true"
                        />
                        <p className="absolute bottom-3 left-3 right-3 font-display text-[11px] font-semibold leading-tight text-cream">
                          {educator.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="02">Struktur</SectionLabel>
              <Reveal variant="mask">
                <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                  Struktur yang membuat kerja lebih mudah.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[38ch] text-[14px] leading-[1.9] text-ink-soft">
                Setiap peran punya tanggung jawab yang jelas. Struktur ini
                membantu guru, staf, dan pimpinan bergerak ke arah yang sama.
              </p>
            </div>
          </div>

          <OrgChart />
        </div>
      </section>

      <section id="direktori" className="section-pad bg-matcha-mist">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="03">Direktori</SectionLabel>
              <Reveal variant="mask">
                <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                  Orang-orang di balik kelas.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[38ch] text-[14px] leading-[1.9] text-ink-soft">
                Klik kartu untuk membaca kutipan singkat. Foto dan nama lengkap
                akan diperbarui setelah data dan izin tersedia.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <TeacherGrid educators={educatorList} />
          </div>
        </div>
      </section>

      <section className="bg-cream py-6 sm:py-10">
        <div className="container-x">
          <div className="gloss-sheen relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] px-6 py-12 text-cream shadow-[0_24px_60px_rgba(24,56,35,0.16)] sm:rounded-[36px] sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-cream/10"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="eyebrow text-[11px] text-matcha-light">
                  Informasi lebih lanjut
                </p>
                <h2 className="mt-3 max-w-[24ch] font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                  Ingin tahu lebih banyak tentang sekolah?
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/#kontak" variant="cream">
                  Hubungi sekolah
                </ButtonLink>
                <ButtonLink href="/" variant="outlineLight">
                  Beranda
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
