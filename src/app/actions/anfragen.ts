"use server";

import { createAdminClient } from "@/lib/supabase/admin";

interface AnfrageData {
  name: string;
  email: string;
  telefon?: string;
  betreff?: string;
  nachricht: string;
  maschine_id?: string;
  typ: "kauf" | "verkauf" | "allgemein";
}

export async function sendeAnfrage(data: AnfrageData) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("anfragen").insert({
    name: data.name,
    email: data.email,
    telefon: data.telefon || null,
    betreff: data.betreff || null,
    nachricht: data.nachricht,
    maschine_id: data.maschine_id || null,
    typ: data.typ,
  });

  if (error) {
    console.error("Fehler beim Speichern der Anfrage:", error);
    return { success: false };
  }

  return { success: true };
}
