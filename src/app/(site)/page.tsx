import { AcademicSection } from "@/components/site/academic-section";
import { AchievementsSection } from "@/components/site/achievements-section";
import { ContactSection } from "@/components/site/contact-section";
import { FacilitiesSection } from "@/components/site/facilities-section";
import { GallerySection } from "@/components/site/gallery-section";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { NewsSection } from "@/components/site/news-section";
import { PpdbSection } from "@/components/site/ppdb-section";
import { ProfileSection } from "@/components/site/profile-section";
import { TeachersSection } from "@/components/site/teachers-section";
import { VisionSection } from "@/components/site/vision-section";
import {
  getPublishedAchievements,
  getPublishedPosts,
} from "@/lib/db/queries/content";
import { getSiteImagesByGroup } from "@/lib/db/queries/site-images";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const news = getPublishedPosts();
  const achievements = getPublishedAchievements();
  const gallery = getSiteImagesByGroup("gallery")
    .filter((image) => image.url)
    .map((image) => ({
      src: image.url,
      alt: image.alt,
      caption: image.label,
    }));

  return (
    <>
      <Hero />
      <Marquee />
      <ProfileSection />
      <VisionSection />
      <AcademicSection />
      <FacilitiesSection />
      <AchievementsSection achievements={achievements} />
      <TeachersSection />
      <NewsSection posts={news} />
      <GallerySection images={gallery} />
      <PpdbSection />
      <ContactSection />
    </>
  );
}
