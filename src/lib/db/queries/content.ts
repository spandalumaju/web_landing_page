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

export function getPublishedPosts(): PostItem[] {
  try {
    const rows = db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
      .all();

    return rows.map((post) => ({
      slug: post.slug,
      category: categoryLabels[post.category.toLowerCase()] ?? post.category ?? "Berita",
      date: formatDate(post.publishedAt ?? post.createdAt),
      title: post.title,
      excerpt: post.excerpt,
      image: post.cover || parsePostImages(post.images)[0] || "/images/classroom.jpg",
      alt: post.title,
      featured: false,
    }));
  } catch {
    return fallbackPosts;
  }
}

export function getPublishedAchievements(): Achievement[] {
  try {
    const rows = db
      .select()
      .from(achievements)
      .orderBy(desc(achievements.featured), desc(achievements.year), asc(achievements.sortOrder))
      .all();

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

export function getPublishedPostBySlug(slug: string): PostRecord | null {
  try {
    return (
      db
        .select()
        .from(posts)
        .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
        .get() ?? null
    );
  } catch {
    return null;
  }
}
