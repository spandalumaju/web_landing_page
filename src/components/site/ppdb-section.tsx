import { ArrowUpRight } from "lucide-react";
import { ppdbSteps, site } from "@/lib/content";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function PpdbSection() {
  return (
    <section id="ppdb" className="bg-cream py-6 sm:py-10">
      <div className="container-x">
        <div className="gloss-sheen relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#4c8a5b_0%,#2f5d3b_45%,#163722_100%)] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_30px_80px_rgba(24,56,35,0.2)] sm:rounded-[44px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 hidden h-[30rem] w-[30rem] rounded-full border border-cream/10 sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-matcha-light/15 blur-3xl"
          />
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 top-0 select-none font-display text-[clamp(5rem,18vw,16rem)] leading-none tracking-[-0.07em] text-cream/[0.05]"
          >
            {site.ppdbYear}
          </p>

          <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <SectionLabel index="09" onMatcha>
                  SPMB
                </SectionLabel>
                <Reveal variant="mask">
                  <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(2.1rem,3.4vw,3.6rem)] leading-[1.02] tracking-[-0.045em]">
                    Penerimaan murid{" "}
                    <span className="font-medium text-matcha-light">baru.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-6 max-w-[40ch] text-sm font-normal leading-[1.9] text-cream/85">
                    Informasi SPMB tahun ajaran {site.ppdbYear}. Jalur prestasi,
                    afirmasi, mutasi, dan zonasi mengikuti ketentuan resmi dari
                    sekolah dan dinas pendidikan.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-matcha-light" />
                    <span className="eyebrow text-[11px] text-cream/85">
                      Pantau kanal resmi
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.14}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/spmb" variant="cream">
                      Info SPMB lengkap
                    </ButtonLink>
                    <ButtonLink href="#kontak" variant="outlineLight">
                      Tanya panitia
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <div className="border-t border-cream/15">
                  {ppdbSteps.map((item, index) => (
                    <Reveal key={item.step} delay={index * 0.05}>
                      <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-cream/15 py-6 sm:grid-cols-[4rem_1fr] sm:py-7">
                        <span className="font-display text-lg font-semibold leading-none text-cream/85">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.15] tracking-[-0.02em]">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-[50ch] text-[12px] font-normal leading-[1.8] text-cream/85">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.18}>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[46ch] eyebrow text-[11px] leading-relaxed text-cream/85">
                      Selalu verifikasi informasi melalui kanal resmi sekolah dan
                      dinas pendidikan.
                    </p>
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex shrink-0 items-center gap-2 eyebrow text-[11px] text-cream/85 transition-colors hover:text-cream"
                    >
                      Lokasi sekolah
                      <ArrowUpRight
                        size={12}
                        className="link-arrow"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
