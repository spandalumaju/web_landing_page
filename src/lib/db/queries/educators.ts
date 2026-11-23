import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { educators } from "@/lib/db/schema";
import { educators as fallback, type Educator } from "@/lib/content";

export function getPublishedEducators(): Educator[] {
  try {
    const rows = db
      .select()
      .from(educators)
      .where(eq(educators.published, true))
      .orderBy(asc(educators.sortOrder), asc(educators.name))
      .all();

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      unit: row.unit,
      photo: row.photo,
      quote: row.quote,
    }));
  } catch {
    return fallback;
  }
}
