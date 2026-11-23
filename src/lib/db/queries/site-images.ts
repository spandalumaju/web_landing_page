import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteImages } from "@/lib/db/schema";
import {
  siteImageSlots,
  type SiteImageGroup,
} from "@/lib/site-images/slots";

export type SiteImageRow = {
  key: string;
  group: SiteImageGroup;
  label: string;
  alt: string;
  url: string;
  sortOrder: number;
};

let ensurePromise: Promise<void> | null = null;

async function ensureRows(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = seedRows().catch((error) => {
      ensurePromise = null;
      throw error;
    });
  }
  await ensurePromise;
}

async function seedRows(): Promise<void> {
  await db.insert(siteImages)
    .values(
      siteImageSlots.map((slot) => ({
        key: slot.key,
        group: slot.group,
        label: slot.label,
        alt: slot.alt,
        url: "",
        sortOrder: slot.sortOrder,
      })),
    )
    .onConflictDoNothing();
}

export async function getSiteImages(): Promise<SiteImageRow[]> {
  await ensureRows();
  return (await db
    .select()
    .from(siteImages)
    .orderBy(asc(siteImages.group), asc(siteImages.sortOrder))) as SiteImageRow[];
}

export async function getSiteImagesByGroup(
  group: SiteImageGroup,
): Promise<SiteImageRow[]> {
  await ensureRows();
  return (await db
    .select()
    .from(siteImages)
    .where(eq(siteImages.group, group))
    .orderBy(asc(siteImages.sortOrder))) as SiteImageRow[];
}

export async function getSiteImage(key: string): Promise<SiteImageRow | null> {
  await ensureRows();
  const rows = await db
    .select()
    .from(siteImages)
    .where(eq(siteImages.key, key))
    .limit(1);
  return (rows[0] as SiteImageRow | undefined) ?? null;
}
