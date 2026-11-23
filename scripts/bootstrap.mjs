import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const databasePath =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "smpn2ambulu.db");
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Admin Sekolah";

if (!email || !password) {
  console.log("Bootstrap admin dilewati: ADMIN_EMAIL/ADMIN_PASSWORD tidak diisi.");
  process.exit(0);
}

fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const sqlite = new Database(databasePath);
sqlite.pragma("journal_mode = WAL");

const existing = sqlite
  .prepare("select id from users where email = ? limit 1")
  .get(email);

if (existing) {
  sqlite.close();
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
const now = Date.now();

sqlite
  .prepare(
    "insert into users (id, email, name, role, password_hash, created_at, updated_at) values (?, ?, ?, 'admin', ?, ?, ?)",
  )
  .run(crypto.randomUUID(), email, name, passwordHash, now, now);
sqlite.close();
console.log(`Admin dibuat: ${email}`);
