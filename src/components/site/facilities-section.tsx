import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { getSiteImagesByGroup } from "@/lib/db/queries/site-images";

const facilityList = [
  "Ruang kelas",
  "Perpustakaan",
  "Laboratorium IPA",
  "Ruang TIK",
  "Ruang PID",
  "Lapangan",
  "Mushola",
  "Pendopo",
  "Kantin",
  "UKS",
  "Toilet",
  "Ruang guru",
];

export async function FacilitiesSection() {
  const facilityImages = await getSiteImagesByGroup("facilities");
  const library = facilityImages.find((image) => image.key === "facility-library");
  const smallFacilities = [
    {
      title: "Laboratorium IPA",
      caption: "Belajar dengan tangan",
      image: facilityImages.find((image) => image.key === "facility-lab")?.url ?? "",
      alt:
        facilityImages.find((image) => image.key === "facility-lab")?.alt ||
        "Laboratorium IPA sekolah",
    },
    {
      title: "Lapangan",
      caption: "Gerak dan kebersamaan",
      image: facilityImages.find((image) => image.key === "facility-sports")?.url ?? "",
      alt:
        facilityImages.find((image) => image.key === "facility-sports")?.alt ||
        "Lapangan olahraga sekolah",
    },
  ];

  return (
    <section id="fasilitas" className="section-pad bg-matcha-mist">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04">Fasilitas</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Ruang belajar yang terawat.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.08}>
              <p className="max-w-[38ch] text-pretty text-sm font-normal leading-[1.9] text-ink-soft">
                Dari ruang kelas, perpustakaan, laboratorium IPA, ruang TIK,
                sampai pendopo dan lapangan: fasilitas sekolah dipakai bersama
                dan dirawat bersama.
              </p>
              <a
                href="#galeri"
                className="group mt-6 inline-flex items-center gap-2 eyebrow text-[11px] text-matcha-deep transition-colors hover:text-ink"
              >
                Lihat galeri
                <ArrowUpRight
                  size={13}
                  className="link-arrow"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          <Reveal variant="scale" className="md:col-span-7">
            <figure data-tilt className="group relative overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(24,56,35,0.14)] ring-1 ring-white/60">
              <ParallaxImage
                src={library?.url ?? ""}
                alt={library?.alt || "Perpustakaan sekolah"}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="aspect-[4/3]"
                distance={20}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-cream sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="eyebrow text-[11px] text-cream/85">
                    Fasilitas utama
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-none tracking-[-0.02em]">
                    Perpustakaan
                  </p>
                </div>
                <p className="eyebrow text-[11px] text-cream/85">
                  Ruang baca
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:col-span-5">
            {smallFacilities.map((facility, index) => (
              <Reveal key={facility.title} variant="scale" delay={0.06 + index * 0.05}>
                <figure data-tilt className="group relative overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(24,56,35,0.1)] ring-1 ring-white/70">
                  <ParallaxImage
                    src={facility.image}
                    alt={facility.alt}
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="aspect-[16/10]"
                    distance={14}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-cream">
                    <p className="font-display text-base font-semibold leading-none tracking-[-0.02em]">
                      {facility.title}
                    </p>
                    <p className="eyebrow text-[11px] text-cream/85">
                      {facility.caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-matcha-deep/15 pt-8 sm:grid-cols-4">
            {facilityList.map((facility) => (
              <li key={facility} className="flex items-baseline gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-matcha-deep/60" />
                <span className="text-[12px] font-normal text-ink-soft">
                  {facility}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
