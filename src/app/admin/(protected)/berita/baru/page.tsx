import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/post-form";
import { createPostAction } from "../actions";

export const metadata: Metadata = {
  title: "Tulis Berita",
};

export default function NewPostPage() {
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
        <p className="eyebrow text-[11px] text-matcha-deep">Baru</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-ink">
          Tulis berita
        </h1>
      </div>
      <PostForm action={createPostAction} />
    </div>
  );
}
