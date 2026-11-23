import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error("ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di .env.local");
}

const user = db.select().from(users).where(eq(users.email, email)).get();
if (!user) {
  throw new Error(`Admin ${email} belum ada. Jalankan db:seed terlebih dahulu.`);
}

db.update(users)
  .set({
    passwordHash: hashPassword(password),
    updatedAt: new Date(),
  })
  .where(eq(users.id, user.id))
  .run();

console.log(`Password admin ${email} diperbarui.`);
