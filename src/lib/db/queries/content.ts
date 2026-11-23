import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { achievements, posts } from "@/lib/db/schema";
import type { PostRecord } from "@/lib/db/schema";
import {
  achievements as fallbackAchievements,
  posts as fallbackPosts,
  type Achievement,
  type PostItem,
} from "@/lib/content";

const categoryLabels: Record<string, string> = {
  berita: "Berita",
  kegiatan: "Kegiatan",
  prestasi: "Prestasi",
  pengumuman: "Pengumuman",
  artikel: "Artikel",
};

export function parsePostImages(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

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

export async function getPublishedPosts(): Promise<PostItem[]> {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

    return rows.map((post) => ({
      slug: post.slug,
      category: categoryLabels[post.category.toLowerCase()] ?? post.category ?? "Berita",
      date: formatDate(post.publishedAt ?? post.createdAt),
      title: post.title,
      excerpt: post.excerpt,
      image: post.cover || parsePostImages(post.images)[0] || "",
      alt: post.title,
      featured: false,
    }));
  } catch {
    return fallbackPosts;
  }
}

export async function getPublishedAchievements(): Promise<Achievement[]> {
  try {
    const rows = await db
      .select()
      .from(achievements)
      .orderBy(desc(achievements.featured), desc(achievements.year), asc(achievements.sortOrder));

    return rows.map((achievement) => ({
      title: achievement.title,
      recipient: achievement.recipient,
      level: achievement.level,
      year: String(achievement.year),
      category:
        achievement.category === "Non-akademik"
          ? "Non-akademik"
          : "Akademik",
    }));
  } catch {
    return fallbackAchievements;
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<PostRecord | null> {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
      .limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}
