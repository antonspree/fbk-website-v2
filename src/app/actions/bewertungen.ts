"use server";

import { createAdminClient } from "@/lib/supabase/admin";

interface BewertungData {
  name: string;
  bewertung: number;
  text: string;
}

export async function sendeBewertung(data: BewertungData) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("bewertungen").insert({
    name: data.name,
    bewertung: data.bewertung,
    text: data.text,
    freigegeben: false,
  });

  if (error) {
    console.error("Fehler beim Speichern der Bewertung:", error);
    return { success: false };
  }

  return { success: true };
}
