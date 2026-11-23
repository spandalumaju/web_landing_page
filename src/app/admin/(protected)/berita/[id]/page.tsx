import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
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
  const post = db.select().from(posts).where(eq(posts.id, id)).get();
  if (!post) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/berita"
        className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-matcha-deep"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        Kembali ke daftar
      </Link>
      <div className="mt-4">
        <p className="eyebrow text-[11px] text-matcha-deep">Edit</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-ink">
          {post.title}
        </h1>
      </div>
      <PostForm
        action={updatePostAction.bind(null, post.id)}
        post={post}
      />
    </div>
  );
}
