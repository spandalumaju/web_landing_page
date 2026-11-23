import type { Metadata } from "next";
import { getSiteImages } from "@/lib/db/queries/site-images";
import { SiteImagesManager } from "@/components/admin/site-images-manager";
import { updateSiteImagesAction } from "./actions";

export const metadata: Metadata = {
  title: "Gambar Situs",
};

export const dynamic = "force-dynamic";

export default async function AdminSiteImagesPage() {
  const rows = await getSiteImages();
  return <SiteImagesManager rows={rows} action={updateSiteImagesAction} />;
}
