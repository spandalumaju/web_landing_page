import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { PostForm } from "@/components/admin/post-form";
import { updatePostAction } from "../actions";

export const metadata: Metadata = {
  title: "Edit Berita",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  const post = rows[0];
  if (!post) {
    notFound();
  }

  return (
    <PostForm
      action={updatePostAction.bind(null, post.id)}
      post={post}
    />
  );
}
