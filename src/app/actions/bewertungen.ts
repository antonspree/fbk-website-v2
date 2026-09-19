"use server";

import { db } from "@/lib/db";
import { bewertungen } from "@/lib/db/schema";

interface BewertungData {
  name: string;
  bewertung: number;
  text: string;
}

export async function sendeBewertung(data: BewertungData) {
  try {
    await db.insert(bewertungen).values({
      name: data.name,
      bewertung: data.bewertung,
      text: data.text,
      freigegeben: false,
    });
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Speichern der Bewertung:", error);
    return { success: false };
  }
}
