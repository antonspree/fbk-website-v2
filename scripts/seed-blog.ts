/**
 * Spielt die Blog-Artikel aus supabase/seed.sql und supabase/seed_blog_additional.sql
 * in DATABASE_URL ein. Bereits vorhandene Slugs werden übersprungen.
 * Usage: npm run db:seed-blog
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

const FILES = ["supabase/seed.sql", "supabase/seed_blog_additional.sql"];

/** Nur die INSERT-Statements für blog_posts, jeweils mit ON CONFLICT ergänzt. */
function blogInserts(raw: string): string[] {
  return raw
    .split(/^(?=INSERT INTO )/m)
    .filter((chunk) => chunk.startsWith("INSERT INTO blog_posts"))
    .map((chunk) => {
      const end = chunk.lastIndexOf(");");
      if (end === -1) throw new Error("Statement-Ende nicht gefunden");
      return `${chunk.slice(0, end + 1)}\nON CONFLICT (slug) DO NOTHING;`;
    });
}

async function main() {
  const statements = FILES.flatMap((f) =>
    blogInserts(readFileSync(resolve(process.cwd(), f), "utf8"))
  );
  const sql = postgres(url!, { max: 1 });
  try {
    const vorher = await sql`SELECT count(*)::int AS n FROM blog_posts`;
    await sql.begin(async (tx) => {
      for (const s of statements) await tx.unsafe(s);
    });
    const nachher = await sql`SELECT count(*)::int AS n FROM blog_posts`;
    console.log(
      `${statements.length} Artikel verarbeitet, ${nachher[0].n - vorher[0].n} neu angelegt (gesamt ${nachher[0].n}).`
    );
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
