import type { Metadata } from "next";
import { asc, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { educators } from "@/lib/db/schema";
import { EducatorsManager, type EducatorRow } from "@/components/admin/educators-manager";

export const metadata: Metadata = {
  title: "Guru & Tenaga Kependidikan",
};

export const dynamic = "force-dynamic";

export default async function AdminEducatorsPage() {
  const rows: EducatorRow[] = (
    await db
      .select()
      .from(educators)
      .orderBy(asc(educators.sortOrder), desc(educators.updatedAt))
  ).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      unit: row.unit,
      photo: row.photo,
      quote: row.quote,
      level: row.level,
      sortOrder: row.sortOrder,
      published: row.published,
      updatedAt: row.updatedAt.toISOString(),
    }));

  return <EducatorsManager rows={rows} />;
}
