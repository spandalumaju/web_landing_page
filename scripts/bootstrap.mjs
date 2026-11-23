import crypto from "node:crypto";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Admin Sekolah";

if (!connectionString) {
  console.error("DATABASE_URL wajib diisi.");
  process.exit(1);
}
if (!email || !password) {
  console.log("Bootstrap admin dilewati: ADMIN_EMAIL/ADMIN_PASSWORD tidak diisi.");
  process.exit(0);
}

const pool = new Pool({ connectionString, max: 1 });
const existing = await pool.query("select id from users where email = $1 limit 1", [email]);

if ((existing.rowCount ?? 0) > 0) {
  await pool.end();
  console.log(`Admin sudah ada: ${email}`);
  process.exit(0);
}

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 64;
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto
  .scryptSync(password, salt, KEY_LENGTH, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P })
  .toString("hex");
const passwordHash = `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt}$${hash}`;

await pool.query(
  "insert into users (id, email, name, role, password_hash) values ($1, $2, $3, 'admin', $4)",
  [crypto.randomUUID(), email, name, passwordHash],
);
await pool.end();
console.log(`Admin dibuat: ${email}`);
