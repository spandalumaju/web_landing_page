"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { educators } from "@/lib/db/schema";
import { assertAdmin } from "@/lib/auth/guard";
import { isSafeMediaUrl } from "@/lib/media";
import {
  educatorSchema,
  type EducatorFormState,
} from "@/lib/validation/educators";

function readForm(formData: FormData) {
  return educatorSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    unit: formData.get("unit"),
    quote: formData.get("quote") ?? "",
    level: formData.get("level"),
    sortOrder: formData.get("sortOrder"),
    published: formData.get("published"),
    photo: formData.get("photo") ?? undefined,
  });
}

function resolvePhoto(value: string | undefined): string | null {
  if (!value) {
    return "";
  }
  return isSafeMediaUrl(value) ? value : null;
}

export async function createEducatorAction(
  _previous: EducatorFormState,
  formData: FormData,
): Promise<EducatorFormState> {
  await assertAdmin();
  const parsed = readForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const photo = resolvePhoto(parsed.data.photo);
  if (photo === null) {
    return { error: "Foto tidak valid. Unggah ulang foto." };
  }

  try {
    await db.insert(educators)
      .values({
        id: randomUUID(),
        name: parsed.data.name,
        role: parsed.data.role,
        unit: parsed.data.unit,
        photo,
        quote: parsed.data.quote,
        level: parsed.data.level,
        sortOrder: parsed.data.sortOrder,
        published: parsed.data.published,
      });
  } catch {
    return { error: "Gagal menyimpan data ke database." };
  }

  revalidatePath("/guru");
  revalidatePath("/");
  revalidatePath("/admin/guru");
  return { success: true, message: "Pendidik berhasil ditambahkan." };
}

export async function updateEducatorAction(
  id: string,
  _previous: EducatorFormState,
  formData: FormData,
): Promise<EducatorFormState> {
  await assertAdmin();
  const existingRows = await db
    .select()
    .from(educators)
    .where(eq(educators.id, id))
    .limit(1);
  const existing = existingRows[0];
  if (!existing) {
    return { error: "Data pendidik tidak ditemukan." };
  }

  const parsed = readForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const resolvedPhoto = resolvePhoto(parsed.data.photo);
  const photo = resolvedPhoto === null ? existing.photo : resolvedPhoto;

  try {
    await db.update(educators)
      .set({
        name: parsed.data.name,
        role: parsed.data.role,
        unit: parsed.data.unit,
        photo,
        quote: parsed.data.quote,
        level: parsed.data.level,
        sortOrder: parsed.data.sortOrder,
        published: parsed.data.published,
        updatedAt: new Date(),
      })
      .where(eq(educators.id, id));
  } catch {
    return { error: "Gagal memperbarui data." };
  }

  revalidatePath("/guru");
  revalidatePath("/");
  revalidatePath("/admin/guru");
  return { success: true, message: "Data pendidik diperbarui." };
}

export async function deleteEducatorAction(id: string): Promise<{
  success?: boolean;
  error?: string;
}> {
  await assertAdmin();
  const existingRows = await db
    .select()
    .from(educators)
    .where(eq(educators.id, id))
    .limit(1);
  const existing = existingRows[0];
  if (!existing) {
    return { error: "Data pendidik sudah tidak ada." };
  }

  await db.delete(educators).where(eq(educators.id, id));
  revalidatePath("/guru");
  revalidatePath("/");
  revalidatePath("/admin/guru");
  return { success: true };
}
