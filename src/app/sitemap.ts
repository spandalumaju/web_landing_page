import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/db/queries/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://smpn2ambulu.sch.id",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://smpn2ambulu.sch.id/guru",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://smpn2ambulu.sch.id/kritik-saran",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://smpn2ambulu.sch.id/berita",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...(await getPublishedPosts()).map((post) => ({
      url: `https://smpn2ambulu.sch.id/berita/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
