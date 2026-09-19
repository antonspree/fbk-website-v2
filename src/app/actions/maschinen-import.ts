"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";
import { kategorien, maschinen, maschinenBilder } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { generateSlug } from "@/lib/utils";
import type { CsvMaschinenZeile } from "@/lib/maschinenImportCsv";

export type { CsvMaschinenZeile } from "@/lib/maschinenImportCsv";

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 45_000;

function extFromContentType(ct: string | null): string {
  if (!ct) return "jpg";
  const m = ct.split(";")[0].trim().toLowerCase();
  if (m.includes("jpeg") || m.includes("jpg")) return "jpg";
  if (m.includes("png")) return "png";
  if (m.includes("webp")) return "webp";
  if (m.includes("gif")) return "gif";
  return "jpg";
}

async function fetchUndSpeichereBild(
  maschineId: string,
  url: string,
  position: number,
  istTitelbild: boolean
): Promise<{ ok: true } | { ok: false; message: string }> {
  let res: Response;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Firmenberatung-Kassel-Import/1.0",
        Accept: "image/*,*/*",
      },
    });
    clearTimeout(t);
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Download fehlgeschlagen" };
  }

  if (!res.ok) return { ok: false, message: `HTTP ${res.status}` };

  const len = res.headers.get("content-length");
  if (len && parseInt(len, 10) > MAX_IMAGE_BYTES) {
    return { ok: false, message: "Datei zu groß (>12 MB)" };
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_IMAGE_BYTES) return { ok: false, message: "Datei zu groß (>12 MB)" };

  const ct = res.headers.get("content-type");
  if (
    ct &&
    !ct.startsWith("image/") &&
    !ct.includes("octet-stream") &&
    !ct.includes("binary")
  ) {
    return { ok: false, message: `Kein Bild (Content-Type: ${ct})` };
  }

  const ext = extFromContentType(ct);
  const filename = `maschinen/${maschineId}/${Date.now()}-${position}-${Math.random().toString(36).slice(2)}.${ext}`;

  const mime =
    ct?.startsWith("image/") ? ct.split(";")[0].trim() : `image/${ext === "jpg" ? "jpeg" : ext}`;

  try {
    const blob = await put(filename, buf, {
      access: "public",
      contentType: mime,
    });

    if (istTitelbild) {
      await db
        .update(maschinenBilder)
        .set({ istTitelbild: false })
        .where(eq(maschinenBilder.maschineId, maschineId));
    }

    await db.insert(maschinenBilder).values({
      maschineId,
      url: blob.url,
      position,
      istTitelbild,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Speichern fehlgeschlagen" };
  }
}

export async function bulkImportMaschinen(zeilen: CsvMaschinenZeile[]) {
  await requireAdmin();
  const errors: { zeile: number; message: string }[] = [];
  const bildHinweise: { zeile: number; url: string; message: string }[] = [];
  let imported = 0;

  const kats = await db.select({ id: kategorien.id, slug: kategorien.slug }).from(kategorien);
  const slugToKatId = new Map(kats.map((k) => [k.slug, k.id]));

  let zeileNr = 0;
  for (const z of zeilen) {
    zeileNr++;
    const slug = generateSlug(`${z.hersteller}-${z.typ}-${z.titel}-${Date.now()}-${zeileNr}-${Math.random().toString(36).slice(2)}`);

    let kategorie_id: string | null = null;
    if (z.kategorie_slug?.trim()) {
      kategorie_id = slugToKatId.get(z.kategorie_slug.trim().toLowerCase()) ?? null;
      if (!kategorie_id) {
        errors.push({ zeile: zeileNr, message: `Unbekannte Kategorie: ${z.kategorie_slug}` });
        continue;
      }
    }

    try {
      const [maschine] = await db
        .insert(maschinen)
        .values({
          slug,
          titel: z.titel,
          hersteller: z.hersteller,
          typ: z.typ,
          baujahr: z.baujahr ?? null,
          zustand: z.zustand,
          preis: z.preis_auf_anfrage ? null : z.preis != null ? String(z.preis) : null,
          preisAufAnfrage: z.preis_auf_anfrage,
          kategorieId: kategorie_id,
          beschreibung: z.beschreibung ?? null,
          specs: z.specs ?? null,
          featured: z.featured ?? false,
          aktiv: z.aktiv ?? true,
        })
        .returning({ id: maschinen.id });

      if (!maschine) {
        errors.push({ zeile: zeileNr, message: "Insert fehlgeschlagen" });
        continue;
      }

      const id = maschine.id;
      imported++;

      for (let i = 0; i < z.bild_urls.length; i++) {
        const r = await fetchUndSpeichereBild(id, z.bild_urls[i], i, i === 0);
        if (!r.ok) {
          bildHinweise.push({ zeile: zeileNr, url: z.bild_urls[i], message: r.message });
        }
      }
    } catch (e) {
      errors.push({
        zeile: zeileNr,
        message: e instanceof Error ? e.message : "Insert fehlgeschlagen",
      });
    }
  }

  revalidatePath("/maschinen");
  revalidatePath("/admin/maschinen");

  return {
    success: imported > 0,
    imported,
    fehler: errors,
    bildHinweise,
  };
}
