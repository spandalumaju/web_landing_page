"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  db.update(feedback)
    .set({ status, updatedAt: new Date() })
    .where(eq(feedback.id, id))
    .run();

  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
  redirect("/admin/kritik-saran");
}

export async function resendFeedbackAction(id: string): Promise<void> {
  await assertAdmin();
  const item = db.select().from(feedback).where(eq(feedback.id, id)).get();
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

  db.update(feedback)
    .set({
      telegramSent: result.ok,
      telegramError: result.error ?? null,
      updatedAt: new Date(),
    })
    .where(eq(feedback.id, id))
    .run();

  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
  redirect("/admin/kritik-saran");
}

export async function deleteFeedbackAction(id: string): Promise<void> {
  await assertAdmin();
  db.delete(feedback).where(eq(feedback.id, id)).run();
  revalidatePath("/admin/kritik-saran");
  revalidatePath("/admin");
  redirect("/admin/kritik-saran");
}
