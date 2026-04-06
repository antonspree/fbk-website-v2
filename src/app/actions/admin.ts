"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function createKategorie(data: { name: string; slug: string; beschreibung?: string; parent_id?: string }) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("kategorien").insert(data);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/kategorien");
  return { success: true };
}

export async function deleteKategorie(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("kategorien").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/kategorien");
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
