/**
 * Wendet drizzle/0000_init.sql auf DATABASE_URL an.
 * Usage: npm run db:migrate
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { resolve } from "path";
import postgres from "postgres";

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.error("DATABASE_URL fehlt.");
  process.exit(1);
}

const file = resolve(process.cwd(), "drizzle/0000_init.sql");
const raw = readFileSync(file, "utf8");

async function main() {
  const sql = postgres(url!, { max: 1 });
  try {
    await sql.unsafe(raw);
    console.log("Schema angewendet.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
