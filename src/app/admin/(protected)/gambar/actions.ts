"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteImages } from "@/lib/db/schema";
import { assertAdmin } from "@/lib/auth/guard";
import { isSafeMediaUrl } from "@/lib/media";
import { siteImageSlots } from "@/lib/site-images/slots";

export type SiteImagesFormState = {
  error?: string;
  success?: boolean;
  message?: string;
};

export async function updateSiteImagesAction(
  _previous: SiteImagesFormState,
  formData: FormData,
): Promise<SiteImagesFormState> {
  await assertAdmin();

  const updates = siteImageSlots.map((slot) => {
    const url = String(formData.get(`image:${slot.key}`) ?? "").trim();
    const alt = String(formData.get(`alt:${slot.key}`) ?? "").trim();
    return { slot, url, alt };
  });

  const invalid = updates.find(
    (item) => item.url && !isSafeMediaUrl(item.url),
  );
  if (invalid) {
    return {
      error: `Gambar "${invalid.slot.label}" tidak valid. Unggah ulang.`,
    };
  }

  const tooLongAlt = updates.find((item) => item.alt.length > 220);
  if (tooLongAlt) {
    return { error: "Teks alternatif maksimal 220 karakter." };
  }

  try {
    db.transaction((tx) => {
      for (const item of updates) {
        tx.update(siteImages)
          .set({
            url: item.url,
            alt: item.alt,
            updatedAt: new Date(),
          })
          .where(eq(siteImages.key, item.slot.key))
          .run();
      }
    });
  } catch {
    return { error: "Gambar situs gagal disimpan. Coba lagi." };
  }

  revalidatePath("/");
  revalidatePath("/guru");
  revalidatePath("/berita");
  revalidatePath("/admin/gambar");
  return { success: true, message: "Gambar situs disimpan." };
}
