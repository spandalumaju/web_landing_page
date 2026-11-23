import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, teachers } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

const tones = [
  "from-[#dcefd0] via-[#f0f9e9] to-white",
  "from-[#d2e9c3] via-[#ebf7e2] to-white",
  "from-[#e2f2d6] via-[#f4fbea] to-white",
  "from-[#d7edc8] via-[#eef8e7] to-white",
];

export function TeachersSection() {
  return (
    <section id="guru" className="section-pad bg-cream">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="06">Pendidik</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Guru yang menemani{" "}
                <span className="font-medium text-matcha-deep">proses belajar.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.08}>
              <p className="max-w-[38ch] text-pretty text-sm font-normal leading-[1.9] text-ink-soft">
                {site.educatorsCount} pendidik dan {site.staffCount} tenaga
                kependidikan bekerja bersama agar setiap murid punya ruang untuk
                bertanya, mencoba, dan bertumbuh.
              </p>
              <Link
                href="/guru"
                className="group mt-6 inline-flex items-center gap-2 eyebrow text-[11px] text-matcha-deep transition-colors hover:text-ink"
              >
                Lihat direktori
                <ArrowUpRight
                  size={13}
                  className="link-arrow"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <Reveal key={teacher.initials} variant="scale" delay={index * 0.03}>
              <article className="group">
                <div
                  data-tilt
                  className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[26px] border border-[rgba(47,93,59,0.14)] bg-gradient-to-br shadow-[0_16px_38px_rgba(24,56,35,0.07)] ${tones[index % tones.length]} p-4 sm:p-5`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-matcha-deep opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="eyebrow text-[11px] text-matcha-deep/80 transition-colors duration-500 group-hover:text-cream/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-1 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="font-display text-[clamp(3.2rem,5.5vw,4.8rem)] font-semibold leading-none tracking-[-0.05em] text-matcha-deep/85 transition-all duration-500 group-hover:scale-[1.04] group-hover:text-cream"
                    >
                      {teacher.initials}
                    </span>
                  </div>
                  <div className="relative z-10 h-px w-8 bg-matcha-deep/20 transition-all duration-500 group-hover:w-14 group-hover:bg-matcha-light/70" />
                </div>
                <h3 className="mt-4 text-[12px] font-medium leading-snug text-ink">
                  {teacher.role}
                </h3>
                <p className="mt-1 text-[11px] font-normal leading-snug text-muted">
                  {teacher.focus}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 eyebrow text-[11px] text-muted">
            Kartu menampilkan peran contoh. Foto dan nama lengkap menyusul setelah data serta izin tersedia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
