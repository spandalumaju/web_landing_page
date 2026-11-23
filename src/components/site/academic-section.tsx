import Image from "next/image";
import { ImagePlaceholder } from "@/components/site/image-placeholder";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  academicPrograms,
  extracurriculars,
  learningFlow,
} from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function AcademicSection() {
  const [featured, ...rest] = academicPrograms;
  const featuredImage = featured?.image ?? "";
  const featuredAlt =
    featured?.alt ?? "Ruang kelas dengan meja dan kursi yang tertata";

  return (
    <section id="akademik" className="section-pad bg-[radial-gradient(circle_at_top_right,rgba(183,227,156,0.16),transparent_38%),linear-gradient(180deg,#ffffff,#fbfdf8)]">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Akademik</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Belajar lewat pengalaman, bukan hanya hafalan.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.08}>
              <p className="max-w-[38ch] text-pretty text-sm font-normal leading-[1.9] text-ink-soft">
                Kurikulum Merdeka di SMPN 2 Ambulu dijalankan dengan pendekatan
                pembelajaran mendalam. Murid diajak memahami, mencoba, dan
                memakai ilmunya.
              </p>
              <span className="mt-6 inline-flex rounded-full border border-matcha/35 bg-matcha-mist px-4 py-2 eyebrow text-[11px] text-matcha-deep">
                Kurikulum Merdeka
              </span>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal variant="scale">
            <a
              href="#akademik"
              data-tilt data-cursor="Program" className="gloss-sheen group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#163722,#0b120d)] p-6 text-cream shadow-[0_28px_70px_rgba(24,56,35,0.2)] ring-1 ring-white/10 sm:min-h-[440px] sm:p-8"
            >
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={featuredAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="image-soft object-cover opacity-90 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              ) : (
                <ImagePlaceholder
                  dark
                  label="Foto program pembelajaran"
                  className="absolute inset-0"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <p className="eyebrow text-[11px] text-matcha-light">
                  {featured?.index} / Program
                </p>
                <h3 className="mt-3 max-w-[15ch] font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.1] tracking-[-0.03em]">
                  {featured?.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[13px] font-normal leading-[1.8] text-cream/85">
                  {featured?.description}
                </p>
              </div>
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors group-hover:border-matcha-light group-hover:text-matcha-light">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </a>
          </Reveal>

          <Reveal variant="scale" delay={0.06}>
            <div data-tilt className="gloss-mint flex h-full min-h-[300px] flex-col rounded-[24px] p-6 sm:min-h-[340px] sm:p-8">
              <div className="flex items-start justify-between">
                <p className="eyebrow text-[11px] text-matcha-deep">
                  {rest[0]?.index} / Program
                </p>
                <ArrowUpRight
                  size={16}
                  className="text-matcha-deep/60"
                  aria-hidden="true"
                />
              </div>
              <div className="my-auto py-10">
                <h3 className="max-w-[13ch] font-display text-[clamp(1.2rem,1.8vw,1.55rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                  {rest[0]?.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[13px] font-normal leading-[1.8] text-ink-soft">
                  {rest[0]?.description}
                </p>
              </div>
              <div className="mt-auto pt-8">
                <span className="block h-px w-10 bg-matcha-deep/25" />
              </div>
            </div>
          </Reveal>

          {rest.slice(1).map((program, index) => (
            <Reveal key={program.index} variant="scale" delay={0.08 + index * 0.04}>
              <div data-tilt className="gloss-card flex h-full min-h-[250px] flex-col rounded-[24px] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <p className="eyebrow text-[11px] text-muted">
                    {program.index}
                  </p>
                  <ArrowUpRight
                    size={15}
                    className="text-muted/60"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                    {program.title}
                  </h3>
                  <p className="mt-2.5 text-[12px] font-normal leading-[1.8] text-muted">
                    {program.description}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <span className="block h-px w-8 bg-line-strong" />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal variant="scale" delay={0.12} className="md:col-span-2">
            <div data-tilt className="gloss-sheen flex h-full min-h-[210px] flex-col rounded-[24px] bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] p-6 text-cream shadow-[0_24px_60px_rgba(24,56,35,0.16)] sm:p-8">
              <p className="eyebrow text-[11px] text-matcha-light/80">
                05 / Di luar kelas
              </p>
              <div className="mt-8">
                <h3 className="max-w-[14ch] font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                  Ruang untuk mencoba hal baru.
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {extracurriculars.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cream/20 px-3 py-1 eyebrow text-[11px] text-cream/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow text-[11px] text-matcha-deep">Ritme belajar</p>
          <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {learningFlow.map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span className="font-sans text-xl text-ink">
                  {step}
                </span>
                {index < learningFlow.length - 1 && (
                  <ArrowRight
                    size={13}
                    className="text-matcha/60"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
