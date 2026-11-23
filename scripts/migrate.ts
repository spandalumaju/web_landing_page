import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { migrate } = await import("drizzle-orm/node-postgres/migrator");
  const { db, closeDb } = await import("@/lib/db");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Database PostgreSQL siap.");
  await closeDb();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
