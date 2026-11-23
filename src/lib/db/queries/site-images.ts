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

function ensureRows(): void {
  db.insert(siteImages)
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
    .onConflictDoNothing()
    .run();
}

export function getSiteImages(): SiteImageRow[] {
  ensureRows();
  return db
    .select()
    .from(siteImages)
    .orderBy(asc(siteImages.group), asc(siteImages.sortOrder))
    .all() as SiteImageRow[];
}

export function getSiteImagesByGroup(group: SiteImageGroup): SiteImageRow[] {
  ensureRows();
  return db
    .select()
    .from(siteImages)
    .where(eq(siteImages.group, group))
    .orderBy(asc(siteImages.sortOrder))
    .all() as SiteImageRow[];
}

export function getSiteImage(key: string): SiteImageRow | null {
  ensureRows();
  return (
    (db.select().from(siteImages).where(eq(siteImages.key, key)).get() as
      | SiteImageRow
      | undefined) ?? null
  );
}
