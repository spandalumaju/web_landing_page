import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PostItem } from "@/lib/content";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/site/section-label";

export function NewsSection({ posts }: { posts: PostItem[] }) {
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <section id="berita" className="section-pad bg-[radial-gradient(circle_at_top_left,rgba(183,227,156,0.13),transparent_34%),linear-gradient(180deg,#ffffff,#fbfdf8)]">
        <div className="container-x">
          <SectionLabel index="07">Berita</SectionLabel>
          <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
            Kabar dan catatan dari <span className="font-medium text-matcha-deep">sekolah.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.9] text-muted">
            Belum ada berita yang diterbitkan. Tambahkan dari panel admin.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="berita" className="section-pad bg-[radial-gradient(circle_at_top_left,rgba(183,227,156,0.13),transparent_34%),linear-gradient(180deg,#ffffff,#fbfdf8)]">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="07">Berita</SectionLabel>
            <Reveal variant="mask">
              <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-ink">
                Kabar dan catatan dari <span className="font-medium text-matcha-deep">sekolah.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Link
              href="/berita"
              className="group inline-flex items-center gap-2 eyebrow text-[11px] text-matcha-deep transition-colors hover:text-ink"
            >
              Semua berita
              <ArrowRight size={13} className="link-arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <Reveal variant="scale" className="md:col-span-7">
            <Link
              href={`/berita/${featured.slug}`}
              data-tilt
              data-cursor="Baca"
              className="group block"
              aria-label={`Baca: ${featured.title}`}
            >
              <ParallaxImage
                src={featured.image}
                alt={featured.alt}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="aspect-[16/10] rounded-[28px]"
                distance={18}
              />
              <div className="mt-5 flex items-center gap-3 eyebrow text-[11px]">
                <span className="text-matcha-deep">{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-matcha/50" />
                <span className="text-muted">{featured.date}</span>
              </div>
              <h3 className="mt-3 max-w-[20ch] text-balance font-display text-[clamp(1.4rem,2.1vw,1.9rem)] leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-matcha-deep">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[52ch] text-sm font-normal leading-[1.9] text-muted">
                {featured.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 eyebrow text-[11px] text-ink">
                Baca berita
                <ArrowUpRight
                  size={13}
                  className="link-arrow"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>

          <div className="md:col-span-5">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={0.06 + index * 0.05}>
                <Link
                  href={`/berita/${post.slug}`}
                  data-tilt
                  data-cursor="Baca"
                  className={`group grid grid-cols-[92px_1fr] gap-4 sm:grid-cols-[120px_1fr] ${
                    index === 0 ? "pt-0" : "border-t border-line py-5"
                  }`}
                  aria-label={`Baca: ${post.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-matcha-mist">
                    <ParallaxImage
                      src={post.image}
                      alt={post.alt}
                      sizes="120px"
                      className="absolute inset-0 h-full w-full"
                      distance={10}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 eyebrow text-[11px] text-muted">
                      <span className="text-matcha-deep">{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-matcha/50" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="mt-2 text-balance font-display text-[1.1rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-matcha-deep">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs font-normal leading-[1.7] text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <div className="mt-6 border-t border-line pt-5">
                <p className="eyebrow text-[11px] leading-relaxed text-muted">
                  Catatan dan dokumentasi diperbarui oleh admin sekolah.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
