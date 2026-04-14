export interface CsvMaschinenZeile {
  titel: string;
  hersteller: string;
  typ: string;
  zustand: "neu" | "gebraucht";
  baujahr?: number | null;
  preis?: number | null;
  preis_auf_anfrage: boolean;
  kategorie_slug?: string | null;
  beschreibung?: string | null;
  featured?: boolean;
  aktiv?: boolean;
  specs?: Record<string, string> | null;
  bild_urls: string[];
}

function parseBool(v: string | undefined, defaultVal: boolean): boolean {
  if (v === undefined || v === "") return defaultVal;
  const s = v.toLowerCase().trim();
  if (["1", "ja", "yes", "true", "wahr", "x"].includes(s)) return true;
  if (["0", "nein", "no", "false", "falsch"].includes(s)) return false;
  return defaultVal;
}

/** Mappt eine CSV-Zeile (kleingeschriebene Spaltennamen) auf die Importstruktur. */
export function csvRowToImport(
  row: Record<string, string>
): { ok: true; data: CsvMaschinenZeile } | { ok: false; error: string } {
  const titel = (row.titel ?? "").trim();
  const hersteller = (row.hersteller ?? "").trim();
  const typ = (row.typ ?? "").trim();
  if (!titel || !hersteller || !typ) {
    return { ok: false, error: "Pflichtfelder titel, hersteller, typ fehlen oder sind leer." };
  }

  const zRaw = (row.zustand ?? "gebraucht").toLowerCase().trim();
  const zustand = zRaw === "neu" ? "neu" : "gebraucht";

  let baujahr: number | null = null;
  if (row.baujahr?.trim()) {
    const y = parseInt(row.baujahr.trim(), 10);
    if (!Number.isNaN(y) && y >= 1900 && y <= 2100) baujahr = y;
  }

  let preis: number | null = null;
  const paa = parseBool(row.preis_auf_anfrage, false);
  if (!paa && row.preis?.trim()) {
    const p = parseFloat(row.preis.trim().replace(",", "."));
    if (!Number.isNaN(p)) preis = p;
  }

  let specs: Record<string, string> | null = null;
  if (row.specs_json?.trim()) {
    try {
      const j = JSON.parse(row.specs_json.trim()) as unknown;
      if (j && typeof j === "object" && !Array.isArray(j)) {
        specs = {};
        for (const [k, v] of Object.entries(j as Record<string, unknown>)) {
          specs[k] = String(v ?? "");
        }
      }
    } catch {
      return { ok: false, error: "specs_json ist kein gültiges JSON-Objekt." };
    }
  }

  const sortedUrls: string[] = [];
  const keys = Object.keys(row)
    .filter((k) => /^bild_url_\d+$/i.test(k))
    .sort((a, b) => {
      const na = parseInt(a.replace(/^bild_url_/i, ""), 10);
      const nb = parseInt(b.replace(/^bild_url_/i, ""), 10);
      return na - nb;
    });
  for (const k of keys) {
    const u = row[k]?.trim();
    if (u && /^https?:\/\//i.test(u)) sortedUrls.push(u);
  }

  return {
    ok: true,
    data: {
      titel,
      hersteller,
      typ,
      zustand,
      baujahr,
      preis: paa ? null : preis,
      preis_auf_anfrage: paa,
      kategorie_slug: row.kategorie_slug?.trim() || null,
      beschreibung: row.beschreibung?.trim() || null,
      featured: parseBool(row.featured, false),
      aktiv: parseBool(row.aktiv, true),
      specs,
      bild_urls: sortedUrls,
    },
  };
}
