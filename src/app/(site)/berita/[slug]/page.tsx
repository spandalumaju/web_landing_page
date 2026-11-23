import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  parsePostImages,
} from "@/lib/db/queries/content";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null): string {
  if (!value) {
    return "";
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Berita tidak ditemukan" };
  }
  const images = [
    post.cover,
    ...parsePostImages(post.images),
  ].filter((image): image is string => Boolean(image));

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/berita/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: images.length > 0 ? images : undefined,
    },
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = getPublishedPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const html = sanitizeArticleHtml(post.contentHtml || `<p>${post.excerpt}</p>`);
  const gallery = parsePostImages(post.images).filter((image) => image !== post.cover);
  const cover = post.cover || gallery[0] || "/images/classroom.jpg";
  const jsonLdImage = [cover, ...gallery].map((image) =>
    new URL(image, "https://smpn2ambulu.sch.id").toString(),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: jsonLdImage,
    datePublished: (post.publishedAt ?? post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: site.name,
      url: "https://smpn2ambulu.sch.id",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: "https://smpn2ambulu.sch.id/icon.svg",
      },
    },
    mainEntityOfPage: `https://smpn2ambulu.sch.id/berita/${post.slug}`,
  };
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <main id="top" className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <div className="container-x section-pad">
        <Link
          href="/berita"
          className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Semua berita
        </Link>

        <article className="mx-auto mt-10 max-w-4xl">
          <div className="flex items-center gap-2 eyebrow text-[11px] text-muted">
            <span className="text-matcha-deep">{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-matcha/50" />
            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
          </div>
          <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.9] text-ink-soft">
            {post.excerpt}
          </p>

          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[24px] bg-matcha-mist shadow-[0_24px_60px_rgba(24,56,35,0.14)] ring-1 ring-white/60">
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="image-soft object-cover"
              priority
            />
          </div>

          <div
            className="mx-auto mt-8 max-w-[68ch] text-[15px] leading-[1.9] text-ink-soft [&_a]:text-matcha-deep [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l [&_blockquote]:border-matcha-deep/30 [&_blockquote]:pl-5 [&_blockquote]:font-sans [&_blockquote]:text-xl [&_figcaption]:mt-2 [&_figcaption]:text-xs [&_figcaption]:text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_img]:mt-6 [&_img]:rounded-[20px] [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-5"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {gallery.length > 0 && (
            <section className="mx-auto mt-12 max-w-4xl border-t border-line pt-8">
              <p className="eyebrow text-[11px] text-matcha-deep">Dokumentasi</p>
              <div
                className={`mt-4 grid gap-3 ${
                  gallery.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"
                }`}
              >
                {gallery.map((image, index) => (
                  <figure
                    key={`${image}-${index}`}
                    className="relative overflow-hidden rounded-[20px] bg-matcha-mist ring-1 ring-white/70"
                  >
                    <Image
                      src={image}
                      alt={`Dokumentasi ${index + 1}: ${post.title}`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="h-auto w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl border-t border-line pt-8">
            <p className="eyebrow text-[11px] text-matcha-deep">
              Berita lainnya
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/berita/${item.slug}`}
                  className="gloss-card group rounded-[20px] p-5 transition-colors hover:border-matcha-deep/40"
                >
                  <p className="eyebrow text-[11px] text-muted">
                    {item.category} · {item.date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-matcha-deep">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
