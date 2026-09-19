"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { del, put } from "@vercel/blob";
import { db } from "@/lib/db";
import { maschinen, maschinenBilder } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/require-admin";
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
  try {
    await requireAdmin();
    const slug = generateSlug(`${data.hersteller}-${data.typ}-${data.titel}-${Date.now()}`);
    const [maschine] = await db
      .insert(maschinen)
      .values({
        slug,
        titel: data.titel,
        hersteller: data.hersteller,
        typ: data.typ,
        baujahr: data.baujahr || null,
        zustand: data.zustand,
        preis: data.preis_auf_anfrage ? null : data.preis != null ? String(data.preis) : null,
        preisAufAnfrage: data.preis_auf_anfrage,
        kategorieId: data.kategorie_id || null,
        beschreibung: data.beschreibung || null,
        specs: data.specs || null,
        featured: data.featured,
        aktiv: data.aktiv,
      })
      .returning({ id: maschinen.id });

    revalidatePath("/maschinen");
    revalidatePath("/admin/maschinen");
    return { success: true, id: maschine.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function updateMaschine(id: string, data: MaschineFormData) {
  try {
    await requireAdmin();
    await db
      .update(maschinen)
      .set({
        titel: data.titel,
        hersteller: data.hersteller,
        typ: data.typ,
        baujahr: data.baujahr || null,
        zustand: data.zustand,
        preis: data.preis_auf_anfrage ? null : data.preis != null ? String(data.preis) : null,
        preisAufAnfrage: data.preis_auf_anfrage,
        kategorieId: data.kategorie_id || null,
        beschreibung: data.beschreibung || null,
        specs: data.specs || null,
        featured: data.featured,
        aktiv: data.aktiv,
      })
      .where(eq(maschinen.id, id));

    revalidatePath("/maschinen");
    revalidatePath("/admin/maschinen");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function deleteMaschine(id: string) {
  try {
    await requireAdmin();
    const bilder = await db
      .select({ url: maschinenBilder.url })
      .from(maschinenBilder)
      .where(eq(maschinenBilder.maschineId, id));
    for (const b of bilder) {
      if (b.url.includes("blob.vercel-storage.com") || b.url.includes("public.blob.vercel-storage.com")) {
        try {
          await del(b.url);
        } catch {
          /* ignore missing blobs */
        }
      }
    }
    await db.delete(maschinen).where(eq(maschinen.id, id));
    revalidatePath("/maschinen");
    revalidatePath("/admin/maschinen");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function uploadMaschineBild(maschineId: string, formData: FormData) {
  try {
    await requireAdmin();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { success: false as const, error: "Keine Datei" };
    }
    const position = Number(formData.get("position") ?? 0);
    const istTitelbild = formData.get("istTitelbild") === "true";

    const blob = await put(`maschinen/${maschineId}/${Date.now()}-${file.name}`, file, {
      access: "public",
      contentType: file.type || "image/webp",
    });

    if (istTitelbild) {
      await db
        .update(maschinenBilder)
        .set({ istTitelbild: false })
        .where(eq(maschinenBilder.maschineId, maschineId));
    }

    const [row] = await db
      .insert(maschinenBilder)
      .values({
        maschineId,
        url: blob.url,
        position,
        istTitelbild,
      })
      .returning();

    revalidatePath(`/admin/maschinen/${maschineId}`);
    revalidatePath("/maschinen");
    return {
      success: true as const,
      bild: {
        id: row.id,
        maschine_id: row.maschineId,
        url: row.url,
        position: row.position,
        ist_titelbild: row.istTitelbild,
        created_at: row.createdAt.toISOString(),
      },
    };
  } catch (e) {
    return { success: false as const, error: e instanceof Error ? e.message : "Upload fehlgeschlagen" };
  }
}

export async function saveMaschineBildMetadata(
  maschineId: string,
  publicUrl: string,
  istTitelbild: boolean,
  position: number
) {
  try {
    await requireAdmin();
    if (istTitelbild) {
      await db
        .update(maschinenBilder)
        .set({ istTitelbild: false })
        .where(eq(maschinenBilder.maschineId, maschineId));
    }
    await db.insert(maschinenBilder).values({
      maschineId,
      url: publicUrl,
      position,
      istTitelbild,
    });
    revalidatePath(`/admin/maschinen/${maschineId}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function setMaschineTitelbild(maschineId: string, bildId: string) {
  try {
    await requireAdmin();
    await db
      .update(maschinenBilder)
      .set({ istTitelbild: false })
      .where(eq(maschinenBilder.maschineId, maschineId));
    await db
      .update(maschinenBilder)
      .set({ istTitelbild: true })
      .where(eq(maschinenBilder.id, bildId));
    revalidatePath(`/admin/maschinen/${maschineId}`);
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Fehler" };
  }
}

export async function deleteMaschineBild(bildId: string, url: string) {
  try {
    await requireAdmin();
    if (url.includes("blob.vercel-storage.com") || url.includes("public.blob.vercel-storage.com")) {
      try {
        await del(url);
      } catch {
        /* ignore */
      }
    }
    await db.delete(maschinenBilder).where(eq(maschinenBilder.id, bildId));
    return { success: true };
  } catch {
    return { success: false };
  }
}
