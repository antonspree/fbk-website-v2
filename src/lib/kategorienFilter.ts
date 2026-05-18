import type { SupabaseClient } from "@supabase/supabase-js";

/** Liefert alle kategorie_id-Werte für einen Slug-Filter (Hauptkategorie inkl. Unterkategorien). */
export async function resolveKategorieIdsForSlug(
  supabase: SupabaseClient,
  slug: string
): Promise<string[] | null> {
  const { data: kat } = await supabase
    .from("kategorien")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (!kat) return null;

  const rootId = (kat as { id: string }).id;
  const { data: children } = await supabase
    .from("kategorien")
    .select("id")
    .eq("parent_id", rootId);

  const childIds = (children ?? []).map((c) => (c as { id: string }).id);
  if (childIds.length > 0) {
    return [rootId, ...childIds];
  }
  return [rootId];
}
