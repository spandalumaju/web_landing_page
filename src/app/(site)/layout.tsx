import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { PageIntro } from "@/components/site/page-intro";
import { PointerExperience } from "@/components/motion/pointer-experience";
import { getSiteImagesByGroup } from "@/lib/db/queries/site-images";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const introPhotos = (await getSiteImagesByGroup("hero"))
    .filter((image) => image.url)
    .slice(0, 5)
    .map((image) => ({ src: image.url, alt: image.alt }));
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-matcha-deep focus:px-5 focus:py-3 focus:text-xs focus:text-cream"
      >
        Lewati ke konten
      </a>
      <PageIntro photos={introPhotos} />
      <PointerExperience />
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="pt-20 md:pt-24">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
