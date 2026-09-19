/**
 * Legt die 8 Standard-Maschinenkategorien inkl. Icons an / aktualisiert sie.
 * Usage: npx tsx scripts/seed-kategorien.ts
 */
import "dotenv/config";
import postgres from "postgres";

const STANDARD = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Drehmaschinen",
    slug: "drehmaschinen",
    beschreibung: "Konventionelle und CNC-Drehmaschinen aller Baugrößen",
    icon: "⚙️",
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Fräsmaschinen",
    slug: "fraesmaschinen",
    beschreibung: "Universal-, Konsolen- und Bettfräsmaschinen",
    icon: "🔧",
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Bearbeitungszentren",
    slug: "bearbeitungszentren",
    beschreibung: "CNC-Bearbeitungszentren, horizontal und vertikal",
    icon: "🏭",
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "Flachschleifmaschinen",
    slug: "flachschleifmaschinen",
    beschreibung: "Flach- und Profilschleifmaschinen",
    icon: "⚡",
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "Bandsägeautomaten",
    slug: "bandsaegautomaten",
    beschreibung: "Metallbandsägen, manuell und automatisch",
    icon: "🔩",
  },
  {
    id: "a1000000-0000-0000-0000-000000000006",
    name: "Blechbearbeitung",
    slug: "blechbearbeitung",
    beschreibung: "Abkantpressen, Scheren, Walzen für Blech",
    icon: "🛠️",
  },
  {
    id: "a1000000-0000-0000-0000-000000000007",
    name: "Pressen",
    slug: "pressen",
    beschreibung: "Exzenter-, Hydraulik- und Kniehebelpressen",
    icon: "🔨",
  },
  {
    id: "a1000000-0000-0000-0000-000000000008",
    name: "Sonstiges",
    slug: "sonstiges",
    beschreibung: "Weitere Werkzeugmaschinen und Industrieequipment",
    icon: "📦",
  },
] as const;

async function main() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL fehlt");

  const sql = postgres(url, { max: 1 });
  try {
    for (const k of STANDARD) {
      await sql`
        INSERT INTO kategorien (id, name, slug, beschreibung, icon, parent_id)
        VALUES (${k.id}, ${k.name}, ${k.slug}, ${k.beschreibung}, ${k.icon}, NULL)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          beschreibung = EXCLUDED.beschreibung,
          icon = EXCLUDED.icon,
          parent_id = NULL
      `;
    }

    const rows = await sql`
      SELECT name, slug, icon
      FROM kategorien
      WHERE parent_id IS NULL
      ORDER BY name
    `;
    console.log(`Hauptkategorien: ${rows.length}`);
    for (const r of rows) {
      console.log(`  ${r.icon ?? "—"}  ${r.name} (${r.slug})`);
    }
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
