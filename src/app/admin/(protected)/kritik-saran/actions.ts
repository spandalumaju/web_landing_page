"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { feedback } from "@/lib/db/schema";
import { assertAdmin } from "@/lib/auth/guard";
import { sendFeedbackToTelegram } from "@/lib/telegram";
import { feedbackStatuses } from "@/lib/validation/feedback";

const validStatuses = new Set(feedbackStatuses.map((status) => status.value));

export async function updateFeedbackStatusAction(
  id: string,
  formData: FormData,
): Promise<void> {
  await assertAdmin();
  const status = String(formData.get("status") ?? "");
  if (!validStatuses.has(status)) {
    return;
  }

  await db
    .update(feedback)
    .set({ status, updatedAt: new Date() })
    .where(eq(feedback.id, id));

  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
}

export async function resendFeedbackAction(id: string): Promise<void> {
  await assertAdmin();
  const itemRows = await db
    .select()
    .from(feedback)
    .where(eq(feedback.id, id))
    .limit(1);
  const item = itemRows[0];
  if (!item) {
    return;
  }

  const result = await sendFeedbackToTelegram({
    name: item.name,
    contact: item.contact,
    category: item.category,
    message: item.message,
    createdAt: item.createdAt,
  });

  await db
    .update(feedback)
    .set({
      telegramSent: result.ok,
      telegramError: result.error ?? null,
      updatedAt: new Date(),
    })
    .where(eq(feedback.id, id));

  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
}

export async function deleteFeedbackAction(id: string): Promise<{
  success?: boolean;
  error?: string;
}> {
  await assertAdmin();
  const existingRows = await db
    .select()
    .from(feedback)
    .where(eq(feedback.id, id))
    .limit(1);
  const existing = existingRows[0];
  if (!existing) {
    return { error: "Pesan sudah tidak ada." };
  }

  await db.delete(feedback).where(eq(feedback.id, id));
  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
  return { success: true };
}
