import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

async function main() {
  const { db, closeDb } = await import("@/lib/db");
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi.");
  }

  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = rows[0];
  if (!user) {
    throw new Error(`Admin ${email} belum ada. Jalankan db:seed terlebih dahulu.`);
  }

  await db
    .update(users)
    .set({
      passwordHash: hashPassword(password),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  console.log(`Password admin ${email} diperbarui.`);
  await closeDb();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
