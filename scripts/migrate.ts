import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db, databasePath } from "@/lib/db";

migrate(db, { migrationsFolder: "./drizzle" });
console.log(`Database siap: ${databasePath}`);
