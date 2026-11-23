"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { assertAdmin } from "@/lib/auth/guard";
import { isSafeMediaUrl } from "@/lib/media";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { postSchema, slugify, type PostFormState } from "@/lib/validation/posts";

function parsePost(formData: FormData) {
  return postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    contentHtml: formData.get("contentHtml") ?? "",
    category: formData.get("category"),
    status: formData.get("status"),
    cover: formData.get("cover") ?? "",
    images: formData
      .getAll("images")
      .map(String)
      .filter(Boolean),
  });
}

function resolveSlug(value: string | undefined, title: string): string {
  return slugify(value?.trim() || title);
}

function slugExists(slug: string, excludeId?: string): boolean {
  const conditions = excludeId
    ? and(eq(posts.slug, slug), ne(posts.id, excludeId))
    : eq(posts.slug, slug);
  return Boolean(db.select({ id: posts.id }).from(posts).where(conditions).get());
}

function resolveMedia(cover: string | undefined, images: string[]) {
  if (cover && !isSafeMediaUrl(cover)) {
    return { error: "Cover tidak valid. Unggah ulang gambar." } as const;
  }

  const uniqueImages = Array.from(new Set(images));
  if (uniqueImages.some((image) => !isSafeMediaUrl(image))) {
    return { error: "Salah satu foto tambahan tidak valid." } as const;
  }

  return {
    cover: cover || null,
    images: uniqueImages.slice(0, 6),
  } as const;
}

export async function createPostAction(
  _previous: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await assertAdmin();
  const parsed = parsePost(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const slug = resolveSlug(parsed.data.slug, parsed.data.title);
  if (!slug) {
    return { error: "Slug tidak valid." };
  }
  if (slugExists(slug)) {
    return { error: "Slug sudah dipakai berita lain." };
  }

  const media = resolveMedia(parsed.data.cover, parsed.data.images ?? []);
  if ("error" in media) {
    return { error: media.error };
  }

  const id = randomUUID();
  try {
    db.insert(posts)
      .values({
        id,
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        contentHtml: sanitizeArticleHtml(parsed.data.contentHtml),
        category: parsed.data.category,
        status: parsed.data.status,
        cover: media.cover,
        images: JSON.stringify(media.images),
        publishedAt: parsed.data.status === "published" ? new Date() : null,
      })
      .run();
  } catch {
    return { error: "Gagal menyimpan berita." };
  }

  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  return { success: true, message: "Berita dibuat.", id };
}

export async function updatePostAction(
  id: string,
  _previous: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await assertAdmin();
  const existing = db.select().from(posts).where(eq(posts.id, id)).get();
  if (!existing) {
    return { error: "Berita tidak ditemukan." };
  }

  const parsed = parsePost(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const slug = resolveSlug(parsed.data.slug, parsed.data.title);
  if (!slug) {
    return { error: "Slug tidak valid." };
  }
  if (slugExists(slug, id)) {
    return { error: "Slug sudah dipakai berita lain." };
  }

  const media = resolveMedia(parsed.data.cover, parsed.data.images ?? []);
  if ("error" in media) {
    return { error: media.error };
  }

  try {
    db.update(posts)
      .set({
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        contentHtml: sanitizeArticleHtml(parsed.data.contentHtml),
        category: parsed.data.category,
        status: parsed.data.status,
        cover: media.cover,
        images: JSON.stringify(media.images),
        publishedAt:
          parsed.data.status === "published"
            ? existing.publishedAt ?? new Date()
            : existing.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .run();
  } catch {
    return { error: "Gagal memperbarui berita." };
  }

  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath(`/berita/${slug}`);
  revalidatePath("/admin/berita");
  return { success: true, message: "Perubahan berita disimpan.", id };
}

export async function deletePostAction(id: string): Promise<{
  success?: boolean;
  error?: string;
}> {
  await assertAdmin();
  const existing = db.select().from(posts).where(eq(posts.id, id)).get();
  if (!existing) {
    return { error: "Berita sudah tidak ada." };
  }

  db.delete(posts).where(eq(posts.id, id)).run();
  revalidatePath("/");
  revalidatePath("/berita");
  revalidatePath(`/berita/${existing.slug}`);
  revalidatePath("/admin/berita");
  return { success: true };
}
