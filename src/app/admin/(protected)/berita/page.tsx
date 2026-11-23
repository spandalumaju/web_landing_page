import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { parsePostImages } from "@/lib/db/queries/content";
import { PostsManager, type PostRow } from "@/components/admin/posts-manager";

export const metadata: Metadata = {
  title: "Berita",
};

export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
  const rows: PostRow[] = db
    .select()
    .from(posts)
    .orderBy(desc(posts.updatedAt))
    .all()
    .map((post) => {
      const gallery = parsePostImages(post.images);
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        status: post.status,
        cover: post.cover || gallery[0] || "",
        imageCount: gallery.length,
        publishedAt: post.publishedAt?.toISOString() ?? null,
        updatedAt: post.updatedAt.toISOString(),
      };
    });

  return <PostsManager rows={rows} />;
}
