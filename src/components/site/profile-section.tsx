import { ArrowRight } from "lucide-react";
import { profileFacts, site } from "@/lib/content";
import { getSiteImagesByGroup } from "@/lib/db/queries/site-images";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function ProfileSection() {
  const profileImages = getSiteImagesByGroup("profile");
  const mainImage = profileImages.find((image) => image.key === "profile-main");
  const secondaryImage = profileImages.find(
    (image) => image.key === "profile-secondary",
  );

  return (
    <section id="profil" className="section-pad bg-cream">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="relative order-2 lg:order-1 lg:col-span-6">
            <div
              aria-hidden="true"
              className="absolute -left-6 top-10 h-40 w-40 rounded-full border border-matcha/25"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 right-8 h-52 w-52 rounded-full bg-matcha-soft/70"
            />

            <Reveal variant="scale">
              <ParallaxImage
                src={mainImage?.url ?? ""}
                alt={mainImage?.alt || "Suasana pembelajaran di sekolah"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative aspect-[4/5] rounded-[28px] shadow-[0_30px_80px_rgba(24,56,35,0.16),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/50"
                distance={24}
              />
            </Reveal>

            <Reveal delay={0.12} variant="scale" className="relative -mt-20 ml-auto w-[48%] sm:-mt-24 sm:w-[42%]">
              <div className="overflow-hidden rounded-[20px] border-[6px] border-white/90 shadow-[0_24px_60px_rgba(24,56,35,0.16)]">
                <ParallaxImage
                  src={secondaryImage?.url ?? ""}
                  alt={secondaryImage?.alt || "Kegiatan murid di sekolah"}
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="aspect-[4/5]"
                  distance={16}
                />
              </div>
            </Reveal>

            <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-[0_14px_35px_rgba(24,56,35,0.12)] backdrop-blur-md sm:left-6 sm:top-6">
              <p className="eyebrow text-[11px] text-matcha-deep">
                Profil sekolah
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-8 xl:pl-14">
            <SectionLabel index="01">Profil</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[13ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Sekolah negeri yang <span className="font-medium text-matcha-deep">tumbuh bersama warga Sabrang.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="measure mt-7 text-pretty text-[14px] font-normal leading-[1.9] text-ink-soft sm:text-[15px]">
                SMP Negeri 2 Ambulu berada di Jalan Watu Ulo No. 57, Sabrang,
                Ambulu. Sekitar {site.students} murid belajar di sini, didampingi{" "}
                {site.educatorsCount} pendidik dan {site.staffCount} tenaga
                kependidikan. Kami menjaga pembelajaran tetap tertata,
                lingkungan tetap asri, dan hubungan guru, murid, serta orang tua
                tetap hangat.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="mt-10 border-l border-matcha-deep/35 pl-6">
                <blockquote className="max-w-[30ch] font-sans text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.12] tracking-[-0.025em] text-ink">
                  “Lingkungan belajar yang bersih, rindang, asri, aman, dan
                  sehat.”
                </blockquote>
                <figcaption className="mt-4 eyebrow text-[11px] text-muted">
                  Indikator visi sekolah
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
                {profileFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow text-[11px] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-[12px] font-normal leading-snug text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href="#visi"
                className="group mt-9 inline-flex items-center gap-3 text-[11px] font-medium tracking-[-0.01em] text-matcha-deep transition-colors hover:text-ink"
              >
                Lihat arah sekolah
                <ArrowRight
                  size={14}
                  className="link-arrow"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
