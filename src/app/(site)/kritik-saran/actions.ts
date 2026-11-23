"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq, gt, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { feedback, feedbackRateLimits } from "@/lib/db/schema";
import { getClientIp } from "@/lib/auth/session";
import { sendFeedbackToTelegram } from "@/lib/telegram";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  feedbackSchema,
  type FeedbackFormState,
} from "@/lib/validation/feedback";

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT = 3;

export async function submitFeedbackAction(
  _previous: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { success: true };
  }

  const parsed = feedbackSchema.safeParse({
    name: formData.get("name") ?? "",
    contact: formData.get("contact") ?? "",
    category: formData.get("category"),
    message: formData.get("message"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  if (!parsed.data.consent) {
    return { error: "Centang persetujuan sebelum mengirim." };
  }

  const ip = await getClientIp();
  const turnstile = await verifyTurnstile(
    String(formData.get("cf-turnstile-response") ?? ""),
    ip,
  );
  if (!turnstile.ok) {
    return { error: turnstile.error || "Verifikasi keamanan gagal." };
  }
  const ipHash = createHash("sha256").update(ip).digest("hex");
  const cutoff = new Date(Date.now() - RATE_WINDOW_MS);

  const recent = await db
    .select({ id: feedbackRateLimits.id })
    .from(feedbackRateLimits)
    .where(
      and(
        eq(feedbackRateLimits.ipHash, ipHash),
        gt(feedbackRateLimits.createdAt, cutoff),
      ),
    )
    ;

  if (recent.length >= RATE_LIMIT) {
    return {
      error: "Terlalu banyak kiriman dari jaringan ini. Coba lagi nanti.",
    };
  }

  const requestHeaders = await headers();
  const id = crypto.randomUUID();
  const createdAt = new Date();

  try {
    await db.insert(feedbackRateLimits)
      .values({ id: crypto.randomUUID(), ipHash });
    await db.delete(feedbackRateLimits)
      .where(
        and(
          eq(feedbackRateLimits.ipHash, ipHash),
          lt(feedbackRateLimits.createdAt, new Date(Date.now() - 24 * RATE_WINDOW_MS)),
        ),
      );

    await db.insert(feedback)
      .values({
        id,
        name: parsed.data.name?.trim() || null,
        contact: parsed.data.contact?.trim() || null,
        category: parsed.data.category,
        message: parsed.data.message,
        status: "baru",
        ipHash,
        userAgent: requestHeaders.get("user-agent")?.slice(0, 300) ?? null,
        createdAt,
        updatedAt: createdAt,
      });
  } catch {
    return { error: "Pesan gagal disimpan. Coba lagi." };
  }

  const telegram = await sendFeedbackToTelegram({
    name: parsed.data.name,
    contact: parsed.data.contact,
    category: parsed.data.category,
    message: parsed.data.message,
    createdAt,
  });

  await db.update(feedback)
    .set({
      telegramSent: telegram.ok,
      telegramError: telegram.error ?? null,
    })
    .where(eq(feedback.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/kritik-saran");
  return { success: true };
}
