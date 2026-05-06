import type { Kategorie } from "@/lib/types";

/** Hauptkategorien (ohne parent) und Map parent_id → Unterkategorien (sortiert). */
export function partitionKategorienHierarchie(kategorien: Kategorie[]) {
  const roots = kategorien
    .filter((k) => !k.parent_id)
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
  const childrenByParent = new Map<string, Kategorie[]>();
  for (const k of kategorien) {
    if (k.parent_id) {
      const list = childrenByParent.get(k.parent_id) ?? [];
      list.push(k);
      childrenByParent.set(k.parent_id, list);
    }
  }
  for (const [, list] of childrenByParent) {
    list.sort((a, b) => a.name.localeCompare(b.name, "de"));
  }
  return { roots, childrenByParent };
}
