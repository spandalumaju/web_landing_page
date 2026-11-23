import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/db/queries/content";
import { SectionLabel } from "@/components/site/section-label";
import { Reveal } from "@/components/motion/reveal";
import { ImagePlaceholder } from "@/components/site/image-placeholder";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita & Kegiatan Sekolah",
  description:
    "Berita, kegiatan belajar, prestasi, dan catatan sekolah dari SMP Negeri 2 Ambulu, Sabrang, Jember. Ikuti kabar terbaru dari kelas dan kegiatan murid.",
  alternates: { canonical: "/berita" },
};

const breadcrumbJsonLd = {
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
      name: "Berita",
      item: "https://smpn2ambulu.sch.id/berita",
    },
  ],
};

export default async function BeritaIndexPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <main id="top" className="section-pad bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-x">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Kembali ke beranda
        </Link>

        <div className="mt-10 max-w-[60ch]">
          <SectionLabel index="01">Berita</SectionLabel>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            Kabar dari <span className="font-medium text-matcha-deep">SMP Negeri 2 Ambulu.</span>
          </h1>
          <p className="mt-5 text-[14px] leading-[1.9] text-ink-soft">
            Catatan kegiatan, pembelajaran, dan keseharian di SMP Negeri 2 Ambulu.
          </p>
        </div>

        {!featured ? (
          <div className="mt-12 rounded-[24px] border border-line bg-white p-8">
            <p className="text-[13px] text-muted">Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <>
            <Reveal variant="scale" className="mt-12">
              <Link
                href={`/berita/${featured.slug}`}
                data-tilt
                data-cursor="Baca"
                className="gloss-card group grid grid-cols-1 gap-6 rounded-[28px] p-4 sm:p-5 lg:grid-cols-12 lg:items-center"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-matcha-mist lg:col-span-7">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="image-soft object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <ImagePlaceholder label="Foto berita belum diunggah" />
                  )}
                </div>
                <div className="lg:col-span-5 lg:pr-4">
                  <div className="flex items-center gap-2 eyebrow text-[11px] text-muted">
                    <span className="text-matcha-deep">{featured.category}</span>
                    <span className="h-1 w-1 rounded-full bg-matcha/50" />
                    <span>{featured.date}</span>
                  </div>
                  <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink transition-colors group-hover:text-matcha-deep">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-[48ch] text-[13px] leading-[1.8] text-muted">
                    {featured.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 eyebrow text-[11px] text-matcha-deep">
                    Baca berita
                    <ArrowUpRight
                      size={12}
                      className="link-arrow"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/berita/${post.slug}`}
                  data-tilt
                  data-cursor="Baca"
                  className="group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-matcha-mist">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="image-soft object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <ImagePlaceholder label="Foto berita belum diunggah" />
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 eyebrow text-[11px] text-muted">
                    <span className="text-matcha-deep">{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-matcha/50" />
                    <span>{post.date}</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-[1.12] tracking-[-0.025em] text-ink transition-colors group-hover:text-matcha-deep">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
