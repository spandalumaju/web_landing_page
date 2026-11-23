import { createHash } from "node:crypto";
import { and, eq, gt, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { loginAttempts } from "@/lib/db/schema";
import { LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS } from "@/lib/auth/constants";

export function loginIdentifier(email: string, ip: string): string {
  return createHash("sha256")
    .update(`${email.trim().toLowerCase()}|${ip}`)
    .digest("hex");
}

export function loginIpIdentifier(ip: string): string {
  return createHash("sha256").update(`ip|${ip}`).digest("hex");
}

export async function isLoginRateLimited(identifier: string): Promise<boolean> {
  const cutoff = new Date(Date.now() - LOGIN_WINDOW_MS);
  const failures = await db
    .select({ id: loginAttempts.id })
    .from(loginAttempts)
    .where(
      and(
        eq(loginAttempts.identifier, identifier),
        eq(loginAttempts.success, false),
        gt(loginAttempts.createdAt, cutoff),
      ),
    );
  return failures.length >= LOGIN_MAX_ATTEMPTS;
}

export async function recordLoginFailure(identifier: string): Promise<void> {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await db.delete(loginAttempts)
    .where(
      and(
        eq(loginAttempts.identifier, identifier),
        lt(loginAttempts.createdAt, cutoff),
      ),
    );
  await db.insert(loginAttempts)
    .values({
      id: crypto.randomUUID(),
      identifier,
      success: false,
    });
}

export async function clearLoginFailures(identifier: string): Promise<void> {
  await db.delete(loginAttempts)
    .where(eq(loginAttempts.identifier, identifier));
}
