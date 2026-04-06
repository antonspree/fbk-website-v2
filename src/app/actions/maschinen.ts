"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateSlug } from "@/lib/utils";

export interface MaschineFormData {
  titel: string;
  hersteller: string;
  typ: string;
  baujahr?: number | null;
  zustand: "neu" | "gebraucht";
  preis?: number | null;
  preis_auf_anfrage: boolean;
  kategorie_id?: string | null;
  beschreibung?: string | null;
  specs?: Record<string, string> | null;
  featured: boolean;
  aktiv: boolean;
}

export async function createMaschine(data: MaschineFormData) {
  const supabase = createAdminClient();
  const slug = generateSlug(`${data.hersteller}-${data.typ}-${data.titel}-${Date.now()}`);

  const { data: maschine, error } = await supabase
    .from("maschinen")
    .insert({
      ...data,
      slug,
      baujahr: data.baujahr || null,
      preis: data.preis_auf_anfrage ? null : data.preis || null,
      kategorie_id: data.kategorie_id || null,
      specs: data.specs || null,
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/maschinen");
  revalidatePath("/admin/maschinen");
  return { success: true, id: maschine.id };
}

export async function updateMaschine(id: string, data: MaschineFormData) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("maschinen")
    .update({
      ...data,
      baujahr: data.baujahr || null,
      preis: data.preis_auf_anfrage ? null : data.preis || null,
      kategorie_id: data.kategorie_id || null,
      specs: data.specs || null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/maschinen");
  revalidatePath("/admin/maschinen");
  return { success: true };
}

export async function deleteMaschine(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("maschinen").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/maschinen");
  revalidatePath("/admin/maschinen");
  return { success: true };
}

export async function saveMaschineBildMetadata(
  maschineId: string,
  publicUrl: string,
  istTitelbild: boolean,
  position: number
) {
  const supabase = createAdminClient();

  if (istTitelbild) {
    await supabase
      .from("maschinen_bilder")
      .update({ ist_titelbild: false })
      .eq("maschine_id", maschineId);
  }

  const { error } = await supabase.from("maschinen_bilder").insert({
    maschine_id: maschineId,
    url: publicUrl,
    position,
    ist_titelbild: istTitelbild,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/maschinen/${maschineId}`);
  return { success: true };
}

export async function deleteMaschineBild(bildId: string, url: string) {
  const supabase = createAdminClient();

  const urlParts = url.split("/maschinen-bilder/");
  if (urlParts[1]) {
    await supabase.storage.from("maschinen-bilder").remove([urlParts[1]]);
  }

  const { error } = await supabase.from("maschinen_bilder").delete().eq("id", bildId);
  if (error) return { success: false };

  return { success: true };
}
