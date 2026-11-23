"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { achievements } from "@/lib/db/schema";
import { assertAdmin } from "@/lib/auth/guard";
import {
  achievementSchema,
  type AchievementFormState,
} from "@/lib/validation/achievements";

function parse(formData: FormData) {
  return achievementSchema.safeParse({
    title: formData.get("title"),
    recipient: formData.get("recipient") ?? "",
    level: formData.get("level"),
    year: formData.get("year"),
    category: formData.get("category"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });
}

export async function createAchievementAction(
  _previous: AchievementFormState,
  formData: FormData,
): Promise<AchievementFormState> {
  await assertAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    await db.insert(achievements)
      .values({
        id: randomUUID(),
        title: parsed.data.title,
        recipient: parsed.data.recipient,
        level: parsed.data.level,
        year: parsed.data.year,
        category: parsed.data.category,
        featured: parsed.data.featured,
        sortOrder: parsed.data.sortOrder,
      });
  } catch {
    return { error: "Gagal menyimpan prestasi." };
  }

  revalidatePath("/");
  revalidatePath("/admin/prestasi");
  return { success: true, message: "Prestasi berhasil ditambahkan." };
}

export async function updateAchievementAction(
  id: string,
  _previous: AchievementFormState,
  formData: FormData,
): Promise<AchievementFormState> {
  await assertAdmin();
  const existingRows = await db
    .select()
    .from(achievements)
    .where(eq(achievements.id, id))
    .limit(1);
  const existing = existingRows[0];
  if (!existing) {
    return { error: "Prestasi tidak ditemukan." };
  }

  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    await db.update(achievements)
      .set({
        title: parsed.data.title,
        recipient: parsed.data.recipient,
        level: parsed.data.level,
        year: parsed.data.year,
        category: parsed.data.category,
        featured: parsed.data.featured,
        sortOrder: parsed.data.sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(achievements.id, id));
  } catch {
    return { error: "Gagal memperbarui prestasi." };
  }

  revalidatePath("/");
  revalidatePath("/admin/prestasi");
  return { success: true, message: "Prestasi diperbarui." };
}

export async function deleteAchievementAction(id: string): Promise<{
  success?: boolean;
  error?: string;
}> {
  await assertAdmin();
  const existingRows = await db
    .select()
    .from(achievements)
    .where(eq(achievements.id, id))
    .limit(1);
  const existing = existingRows[0];
  if (!existing) {
    return { error: "Prestasi sudah tidak ada." };
  }

  await db.delete(achievements).where(eq(achievements.id, id));
  revalidatePath("/");
  revalidatePath("/admin/prestasi");
  return { success: true };
}
