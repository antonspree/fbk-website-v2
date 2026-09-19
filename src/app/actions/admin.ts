"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { anfragen, bewertungen, blogPosts, kategorien } from "@/lib/db/schema";
import { mapKategorie } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/require-admin";
import type { Kategorie } from "@/lib/types";

export async function markAnfrageGelesen(id: string, gelesen: boolean) {
  await requireAdmin();
  await db.update(anfragen).set({ gelesen }).where(eq(anfragen.id, id));
  revalidatePath("/admin/anfragen");
}

export async function deleteAnfrage(id: string) {
  await requireAdmin();
  await db.delete(anfragen).where(eq(anfragen.id, id));
  revalidatePath("/admin/anfragen");
}

export async function freigabeBewertung(id: string, freigegeben: boolean) {
  await requireAdmin();
  await db.update(bewertungen).set({ freigegeben }).where(eq(bewertungen.id, id));
  revalidatePath("/admin/bewertungen");
  revalidatePath("/bewertungen");
}

export async function deleteBewertung(id: string) {
  await requireAdmin();
  await db.delete(bewertungen).where(eq(bewertungen.id, id));
  revalidatePath("/admin/bewertungen");
}

export async function createKategorie(data: {
  name: string;
  slug: string;
  beschreibung?: string | null;
  parent_id?: string | null;
  icon?: string | null;
  icon_url?: string | null;
}): Promise<{ success: true; data: Kategorie } | { success: false; error: string }> {
  try {
    await requireAdmin();
    if (data.parent_id) {
      const [parent] = await db
        .select()
        .from(kategorien)
        .where(eq(kategorien.id, data.parent_id))
        .limit(1);
      if (!parent) return { success: false, error: "Übergeordnete Kategorie nicht gefunden." };
      if (parent.parentId !== null) {
        return {
          success: false,
          error: "Unterkategorien können nur unter einer Hauptkategorie angelegt werden.",
        };
      }
    }
    const [row] = await db
      .insert(kategorien)
      .values({
        name: data.name,
        slug: data.slug,
        beschreibung: data.beschreibung ?? null,
        parentId: data.parent_id ?? null,
        icon: data.icon?.trim() || null,
        iconUrl: data.icon_url?.trim() || null,
      })
      .returning();
    revalidatePath("/admin/kategorien");
    revalidatePath("/maschinen");
    revalidatePath("/maschinen-neu");
    revalidatePath("/");
    return { success: true, data: mapKategorie(row) };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Unbekannter Fehler" };
  }
}

export async function updateKategorie(
  id: string,
  data: {
    icon?: string | null;
    icon_url?: string | null;
    name?: string;
    slug?: string;
    beschreibung?: string | null;
  }
): Promise<{ success: true; data: Kategorie } | { success: false; error: string }> {
  try {
    await requireAdmin();
    const [row] = await db
      .update(kategorien)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.beschreibung !== undefined && { beschreibung: data.beschreibung }),
        ...(data.icon !== undefined && { icon: data.icon?.trim() || null }),
        ...(data.icon_url !== undefined && { iconUrl: data.icon_url?.trim() || null }),
      })
      .where(eq(kategorien.id, id))
      .returning();
    if (!row) return { success: false, error: "Kategorie nicht gefunden." };
    revalidatePath("/admin/kategorien");
    revalidatePath("/maschinen");
    revalidatePath("/");
    return { success: true, data: mapKategorie(row) };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Unbekannter Fehler" };
  }
}

export async function deleteKategorie(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();
    const children = await db.select({ id: kategorien.id }).from(kategorien).where(eq(kategorien.parentId, id));
    for (const row of children) {
      const r = await deleteKategorie(row.id);
      if (!r.success) return r;
    }
    await db.delete(kategorien).where(eq(kategorien.id, id));
    revalidatePath("/admin/kategorien");
    revalidatePath("/maschinen");
    revalidatePath("/maschinen-neu");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler beim Löschen" };
  }
}

export async function saveBlogPost(
  id: string | null,
  data: {
    titel: string;
    slug: string;
    teaser: string;
    inhalt: string;
    kategorie?: string;
    bild_url?: string;
    seo_title?: string;
    seo_description?: string;
    veroeffentlicht: boolean;
  }
) {
  try {
    await requireAdmin();
    const values = {
      titel: data.titel,
      slug: data.slug,
      teaser: data.teaser,
      inhalt: data.inhalt,
      kategorie: data.kategorie || null,
      bildUrl: data.bild_url || null,
      seoTitle: data.seo_title || null,
      seoDescription: data.seo_description || null,
      veroeffentlicht: data.veroeffentlicht,
    };
    if (id) {
      await db.update(blogPosts).set(values).where(eq(blogPosts.id, id));
    } else {
      await db.insert(blogPosts).values(values);
    }
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await requireAdmin();
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}
