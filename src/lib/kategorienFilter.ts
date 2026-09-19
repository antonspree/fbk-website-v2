import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { kategorien } from "@/lib/db/schema";

/** Liefert alle kategorie_id-Werte für einen Slug-Filter (Hauptkategorie inkl. Unterkategorien). */
export async function resolveKategorieIdsForSlug(slug: string): Promise<string[] | null> {
  const [kat] = await db.select().from(kategorien).where(eq(kategorien.slug, slug)).limit(1);
  if (!kat) return null;
  const children = await db
    .select({ id: kategorien.id })
    .from(kategorien)
    .where(eq(kategorien.parentId, kat.id));
  if (children.length > 0) {
    return [kat.id, ...children.map((c) => c.id)];
  }
  return [kat.id];
}
