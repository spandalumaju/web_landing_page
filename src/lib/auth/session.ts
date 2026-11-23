import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { sessions, users } from "@/lib/db/schema";
import { SESSION_COOKIE, SESSION_DURATION_MS } from "@/lib/auth/constants";

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const requestHeaders = await headers();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const ip = await getClientIp();

  db.insert(sessions)
    .values({
      id: crypto.randomUUID(),
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ipHash: createHash("sha256").update(ip).digest("hex"),
      userAgent: requestHeaders.get("user-agent")?.slice(0, 300) ?? null,
    })
    .run();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" ||
      requestHeaders.get("x-forwarded-proto") === "https",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    db.delete(sessions)
      .where(eq(sessions.tokenHash, hashToken(token)))
      .run();
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const row = db
    .select({
      session: sessions,
      user: users,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.tokenHash, hashToken(token)),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .get();

  if (!row) {
    return null;
  }

  return row;
}
