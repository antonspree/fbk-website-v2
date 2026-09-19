"use server";

import { db } from "@/lib/db";
import { anfragen } from "@/lib/db/schema";

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
  try {
    await db.insert(anfragen).values({
      name: data.name,
      email: data.email,
      telefon: data.telefon || null,
      betreff: data.betreff || null,
      nachricht: data.nachricht,
      maschineId: data.maschine_id || null,
      typ: data.typ,
    });
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Speichern der Anfrage:", error);
    return { success: false };
  }
}
