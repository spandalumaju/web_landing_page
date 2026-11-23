import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const databasePath =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "smpn2ambulu.db");

fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const sqlite = new Database(databasePath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("busy_timeout = 5000");

migrate(drizzle(sqlite), { migrationsFolder: "./drizzle" });
sqlite.close();
console.log(`Database migrated: ${databasePath}`);
