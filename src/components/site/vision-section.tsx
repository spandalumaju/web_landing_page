import { missions, site, values } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function VisionSection() {
  return (
    <section id="visi" className="gloss-dark relative overflow-hidden text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full border border-matcha/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-matcha-light/10 blur-3xl"
      />

      <div className="container-x section-pad relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="02" dark>
                Arah
              </SectionLabel>
              <h2 className="mt-7 font-display text-[clamp(2.1rem,3.4vw,3.6rem)] leading-[1.02] tracking-[-0.045em]">
                Visi
                <br />
                <span className="font-medium text-matcha-light">&amp; Misi</span>
              </h2>
              <p className="mt-7 max-w-[24ch] text-sm font-normal leading-[1.9] text-cream/60">
                Arah sekolah kami bertumpu pada iman, keterampilan, dan
                kemandirian murid.
              </p>
              <div className="mt-8 h-px w-24 bg-matcha-light/40" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal variant="mask">
              <p className="text-balance font-display text-[clamp(1.6rem,2.8vw,2.8rem)] font-medium leading-[1.12] tracking-[-0.03em] text-cream/95">
                “{site.vision}”
              </p>
            </Reveal>

            <div className="mt-14">
              {missions.map((mission, index) => (
                <Reveal key={mission} delay={index * 0.05}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-cream/15 py-6 sm:grid-cols-[4rem_1fr] sm:py-7">
                    <span className="font-display text-base font-semibold tracking-[-0.02em] text-matcha-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[58ch] text-pretty text-sm font-normal leading-[1.9] text-cream/70 sm:text-sm">
                      {mission}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-cream/15 pt-8 sm:grid-cols-2">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.04}>
                  <div className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-matcha-light" />
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-cream">
                        {value.title}
                      </h3>
                      <p className="mt-1.5 max-w-[36ch] text-[13px] font-normal leading-[1.8] text-cream/60">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
