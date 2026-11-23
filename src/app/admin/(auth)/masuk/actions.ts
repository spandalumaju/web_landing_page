"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, getClientIp } from "@/lib/auth/session";
import { verifyTurnstile } from "@/lib/security/turnstile";
import {
  clearLoginFailures,
  isLoginRateLimited,
  loginIdentifier,
  loginIpIdentifier,
  recordLoginFailure,
} from "@/lib/auth/rate-limit";

export type LoginState = {
  error?: string;
};

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Email atau password tidak valid." };
  }

  const email = parsed.data.email.toLowerCase();
  const ip = await getClientIp();
  const turnstile = await verifyTurnstile(
    String(formData.get("cf-turnstile-response") ?? ""),
    ip,
  );
  if (!turnstile.ok) {
    return { error: turnstile.error || "Verifikasi keamanan gagal." };
  }
  const identifier = loginIdentifier(email, ip);
  const ipIdentifier = loginIpIdentifier(ip);

  if (
    isLoginRateLimited(identifier) ||
    isLoginRateLimited(ipIdentifier)
  ) {
    return {
      error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit.",
    };
  }

  const user = db.select().from(users).where(eq(users.email, email)).get();

  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    recordLoginFailure(identifier);
    recordLoginFailure(ipIdentifier);
    return { error: "Email atau password salah." };
  }

  clearLoginFailures(identifier);
  clearLoginFailures(ipIdentifier);
  await createSession(user.id);
  redirect("/admin");
}
