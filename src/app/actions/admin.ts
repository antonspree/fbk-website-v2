"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Kategorie } from "@/lib/types";

export async function markAnfrageGelesen(id: string, gelesen: boolean) {
  const supabase = createAdminClient();
  await supabase.from("anfragen").update({ gelesen }).eq("id", id);
  revalidatePath("/admin/anfragen");
}

export async function deleteAnfrage(id: string) {
  const supabase = createAdminClient();
  await supabase.from("anfragen").delete().eq("id", id);
  revalidatePath("/admin/anfragen");
}

export async function freigabeBewertung(id: string, freigegeben: boolean) {
  const supabase = createAdminClient();
  await supabase.from("bewertungen").update({ freigegeben }).eq("id", id);
  revalidatePath("/admin/bewertungen");
  revalidatePath("/bewertungen");
}

export async function deleteBewertung(id: string) {
  const supabase = createAdminClient();
  await supabase.from("bewertungen").delete().eq("id", id);
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
  const supabase = createAdminClient();

  if (data.parent_id) {
    const { data: parent, error: pErr } = await supabase
      .from("kategorien")
      .select("id, parent_id")
      .eq("id", data.parent_id)
      .single();
    if (pErr || !parent) {
      return { success: false, error: "Übergeordnete Kategorie nicht gefunden." };
    }
    if ((parent as { parent_id: string | null }).parent_id !== null) {
      return {
        success: false,
        error: "Unterkategorien können nur unter einer Hauptkategorie angelegt werden.",
      };
    }
  }

  const insert = {
    name: data.name,
    slug: data.slug,
    beschreibung: data.beschreibung ?? null,
    parent_id: data.parent_id ?? null,
    icon: data.icon?.trim() || null,
    icon_url: data.icon_url?.trim() || null,
  };

  const { data: row, error } = await supabase.from("kategorien").insert(insert).select().single();
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/kategorien");
  revalidatePath("/maschinen");
  revalidatePath("/maschinen-neu");
  revalidatePath("/");
  return { success: true, data: row as Kategorie };
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
  const supabase = createAdminClient();
  const patch = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.slug !== undefined && { slug: data.slug }),
    ...(data.beschreibung !== undefined && { beschreibung: data.beschreibung }),
    ...(data.icon !== undefined && { icon: data.icon?.trim() || null }),
    ...(data.icon_url !== undefined && { icon_url: data.icon_url?.trim() || null }),
  };
  const { data: row, error } = await supabase
    .from("kategorien")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/kategorien");
  revalidatePath("/maschinen");
  revalidatePath("/");
  return { success: true, data: row as Kategorie };
}

export async function deleteKategorie(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();
  const { data: children } = await supabase.from("kategorien").select("id").eq("parent_id", id);
  for (const row of children ?? []) {
    const r = await deleteKategorie((row as { id: string }).id);
    if (!r.success) return r;
  }
  const { error } = await supabase.from("kategorien").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/kategorien");
  revalidatePath("/maschinen");
  revalidatePath("/maschinen-neu");
  revalidatePath("/");
  return { success: true };
}

export async function saveBlogPost(id: string | null, data: {
  titel: string;
  slug: string;
  teaser: string;
  inhalt: string;
  kategorie?: string;
  bild_url?: string;
  seo_title?: string;
  seo_description?: string;
  veroeffentlicht: boolean;
}) {
  const supabase = createAdminClient();

  if (id) {
    const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from("blog_posts").insert(data);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}
