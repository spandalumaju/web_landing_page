import { z } from "zod";

export const postSchema = z
  .object({
    title: z.string().trim().min(4, "Judul minimal 4 karakter").max(180),
    slug: z.string().trim().max(180).optional(),
    excerpt: z.string().trim().max(320, "Ringkasan maksimal 320 karakter"),
    contentHtml: z.string().trim().max(120000, "Konten terlalu panjang"),
    category: z.enum(["berita", "prestasi", "kegiatan", "pengumuman", "artikel"]),
    status: z.enum(["draft", "published"]),
    cover: z.string().trim().max(300).optional(),
    images: z.array(z.string().trim().max(300)).max(6, "Maksimal 6 foto tambahan").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status !== "published") {
      return;
    }

    if (data.excerpt.trim().length < 20) {
      ctx.addIssue({
        code: "custom",
        path: ["excerpt"],
        message: "Ringkasan minimal 20 karakter sebelum dipublikasikan.",
      });
    }

    const plain = data.contentHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (plain.length < 80) {
      ctx.addIssue({
        code: "custom",
        path: ["contentHtml"],
        message: "Isi berita minimal 80 karakter sebelum dipublikasikan.",
      });
    }
  });

export type PostFormState = {
  error?: string;
  success?: boolean;
  message?: string;
  id?: string;
};

export const postCategories = [
  { value: "berita", label: "Berita" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "prestasi", label: "Prestasi" },
  { value: "pengumuman", label: "Pengumuman" },
  { value: "artikel", label: "Artikel" },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}
