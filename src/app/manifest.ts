import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Sekolah Negeri di Sabrang, Jember`,
    short_name: site.shortName,
    description:
      "Profil resmi SMP Negeri 2 Ambulu: pembelajaran, guru, fasilitas, prestasi, berita, dan SPMB.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfdf8",
    theme_color: "#2f5d3b",
    lang: "id",
    icons: [
      {
        src: "/logos/smpn2ambulu.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
