import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";
import { createPostAction } from "../actions";

export const metadata: Metadata = {
  title: "Tulis Berita",
};

export default function NewPostPage() {
  return <PostForm action={createPostAction} />;
}
