import type { Metadata } from "next";
import { asc, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { achievements } from "@/lib/db/schema";
import {
  AchievementsManager,
  type AchievementRow,
} from "@/components/admin/achievements-manager";

export const metadata: Metadata = {
  title: "Prestasi",
};

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const rows: AchievementRow[] = (
    await db
      .select()
      .from(achievements)
      .orderBy(desc(achievements.featured), desc(achievements.year), asc(achievements.sortOrder))
  ).map((row) => ({
      id: row.id,
      title: row.title,
      recipient: row.recipient,
      level: row.level,
      year: row.year,
      category: row.category as "Akademik" | "Non-akademik",
      featured: row.featured,
      sortOrder: row.sortOrder,
      updatedAt: row.updatedAt.toISOString(),
    }));

  return <AchievementsManager rows={rows} />;
}
