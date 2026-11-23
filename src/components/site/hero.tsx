import { ArrowDown } from "lucide-react";
import { heroStats, site } from "@/lib/content";
import { getSiteImagesByGroup } from "@/lib/db/queries/site-images";
import { ButtonLink } from "@/components/site/button-link";
import { HeroAlbum } from "@/components/site/hero-album";
import { HeroHeadline } from "@/components/site/hero-headline";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  const heroPhotos = getSiteImagesByGroup("hero")
    .filter((image) => image.url)
    .map((image) => ({
      src: image.url,
      alt: image.alt,
      caption: image.label.replace(/^Foto utama — /, ""),
    }));

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-10 hidden h-[38rem] w-[38rem] rounded-full border border-matcha/15 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(183,227,156,0.6),rgba(242,248,236,0)_68%)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-14 pb-16 pt-12 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <p className="flex items-center gap-3 eyebrow text-[11px] text-muted">
                <span className="h-2 w-2 rounded-full bg-matcha-deep" />
                {site.name} · {site.location}
              </p>
            </Reveal>

            <div className="mt-7" id="hero-title">
              <HeroHeadline />
            </div>

            <Reveal delay={0.25}>
              <p className="mt-7 max-w-[39ch] text-pretty text-[14px] font-normal leading-[1.9] text-ink-soft sm:text-[15px]">
                SMP Negeri 2 Ambulu berada di Sabrang, Ambulu. Kami menemani{" "}
                {site.students} murid belajar lewat pertanyaan, percobaan,
                kerja sama, dan pembiasaan karakter.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#profil" variant="matcha">
                  Kenali sekolah
                </ButtonLink>
                <ButtonLink href="#ppdb" variant="outline">
                  Informasi SPMB
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
                {heroStats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <dt className="eyebrow min-h-[3em] text-[11px] text-muted sm:min-h-0">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-[12px] font-medium leading-snug text-ink">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.42}>
              <a
                href="#profil"
                className="group mt-8 inline-flex items-center gap-4 text-muted transition-colors hover:text-matcha-deep"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong">
                  <span className="absolute top-2.5 h-1 w-1 rounded-full bg-matcha-deep scroll-dot" />
                  <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="eyebrow text-[11px]">Gulir untuk menjelajah</span>
              </a>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-8 h-[86%] w-[88%] rounded-[36px] bg-[linear-gradient(135deg,#e7f2df,#cfe8bf)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:-right-8"
            />
            <div
              aria-hidden="true"
              className="absolute -left-8 bottom-10 h-24 w-24 rounded-full border border-matcha/30"
            />

            <Reveal variant="scale" delay={0.12}>
              <HeroAlbum photos={heroPhotos} />
            </Reveal>

          </div>
        </div>
      </div>

    </section>
  );
}
