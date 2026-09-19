/**
 * Migriert Daten von Supabase (REST) nach Vercel Postgres.
 * Voraussetzung: DATABASE_URL gesetzt, Schema via `npm run db:migrate` angelegt.
 *
 * Usage: npx tsx scripts/migrate-from-supabase.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { createClient } from "@supabase/supabase-js";

const DATABASE_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Brauche DATABASE_URL + NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function fetchAll(table: string) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(`${table}: ${error.message}`);
  return data ?? [];
}

async function main() {
  console.log("Lade Daten aus Supabase…");
  const [
    kats,
    maschinenRows,
    bilder,
    angeboteRows,
    anfragenRows,
    bewertungenRows,
    blogRows,
  ] = await Promise.all([
    fetchAll("kategorien"),
    fetchAll("maschinen"),
    fetchAll("maschinen_bilder"),
    fetchAll("angebote"),
    fetchAll("anfragen"),
    fetchAll("bewertungen"),
    fetchAll("blog_posts"),
  ]);

  console.log({
    kategorien: kats.length,
    maschinen: maschinenRows.length,
    bilder: bilder.length,
    angebote: angeboteRows.length,
    anfragen: anfragenRows.length,
    bewertungen: bewertungenRows.length,
    blog: blogRows.length,
  });

  // Reihenfolge wegen FKs: roots first
  const roots = kats.filter((k: { parent_id: string | null }) => !k.parent_id);
  const kids = kats.filter((k: { parent_id: string | null }) => k.parent_id);

  for (const k of [...roots, ...kids]) {
    await sql`
      INSERT INTO kategorien (id, name, slug, beschreibung, parent_id, icon, icon_url, created_at)
      VALUES (
        ${k.id}, ${k.name}, ${k.slug}, ${k.beschreibung}, ${k.parent_id},
        ${k.icon ?? null}, ${k.icon_url ?? null}, ${k.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        beschreibung = EXCLUDED.beschreibung,
        parent_id = EXCLUDED.parent_id,
        icon = EXCLUDED.icon,
        icon_url = EXCLUDED.icon_url
    `;
  }

  for (const m of maschinenRows) {
    await sql`
      INSERT INTO maschinen (
        id, slug, titel, hersteller, typ, baujahr, zustand, preis, preis_auf_anfrage,
        kategorie_id, beschreibung, specs, featured, aktiv, created_at
      ) VALUES (
        ${m.id}, ${m.slug}, ${m.titel}, ${m.hersteller}, ${m.typ}, ${m.baujahr}, ${m.zustand},
        ${m.preis}, ${m.preis_auf_anfrage ?? false}, ${m.kategorie_id}, ${m.beschreibung},
        ${JSON.stringify(m.specs)}::jsonb, ${m.featured ?? false}, ${m.aktiv ?? true}, ${m.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        titel = EXCLUDED.titel,
        hersteller = EXCLUDED.hersteller,
        typ = EXCLUDED.typ,
        baujahr = EXCLUDED.baujahr,
        zustand = EXCLUDED.zustand,
        preis = EXCLUDED.preis,
        preis_auf_anfrage = EXCLUDED.preis_auf_anfrage,
        kategorie_id = EXCLUDED.kategorie_id,
        beschreibung = EXCLUDED.beschreibung,
        specs = EXCLUDED.specs,
        featured = EXCLUDED.featured,
        aktiv = EXCLUDED.aktiv
    `;
  }

  for (const b of bilder) {
    await sql`
      INSERT INTO maschinen_bilder (id, maschine_id, url, position, ist_titelbild, created_at)
      VALUES (${b.id}, ${b.maschine_id}, ${b.url}, ${b.position ?? 0}, ${b.ist_titelbild ?? false}, ${b.created_at})
      ON CONFLICT (id) DO UPDATE SET
        url = EXCLUDED.url,
        position = EXCLUDED.position,
        ist_titelbild = EXCLUDED.ist_titelbild
    `;
  }

  for (const a of angeboteRows) {
    await sql`
      INSERT INTO angebote (id, titel, beschreibung, maschine_id, gueltig_bis, aktiv, created_at)
      VALUES (${a.id}, ${a.titel}, ${a.beschreibung}, ${a.maschine_id}, ${a.gueltig_bis}, ${a.aktiv ?? true}, ${a.created_at})
      ON CONFLICT (id) DO UPDATE SET
        titel = EXCLUDED.titel,
        beschreibung = EXCLUDED.beschreibung,
        maschine_id = EXCLUDED.maschine_id,
        gueltig_bis = EXCLUDED.gueltig_bis,
        aktiv = EXCLUDED.aktiv
    `;
  }

  for (const a of anfragenRows) {
    await sql`
      INSERT INTO anfragen (id, name, email, telefon, betreff, nachricht, maschine_id, typ, gelesen, created_at)
      VALUES (
        ${a.id}, ${a.name}, ${a.email}, ${a.telefon}, ${a.betreff}, ${a.nachricht},
        ${a.maschine_id}, ${a.typ}, ${a.gelesen ?? false}, ${a.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        telefon = EXCLUDED.telefon,
        betreff = EXCLUDED.betreff,
        nachricht = EXCLUDED.nachricht,
        maschine_id = EXCLUDED.maschine_id,
        typ = EXCLUDED.typ,
        gelesen = EXCLUDED.gelesen
    `;
  }

  for (const b of bewertungenRows) {
    await sql`
      INSERT INTO bewertungen (id, name, bewertung, text, freigegeben, created_at)
      VALUES (${b.id}, ${b.name}, ${b.bewertung}, ${b.text}, ${b.freigegeben ?? false}, ${b.created_at})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        bewertung = EXCLUDED.bewertung,
        text = EXCLUDED.text,
        freigegeben = EXCLUDED.freigegeben
    `;
  }

  for (const p of blogRows) {
    await sql`
      INSERT INTO blog_posts (
        id, slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht, created_at
      ) VALUES (
        ${p.id}, ${p.slug}, ${p.titel}, ${p.teaser}, ${p.inhalt}, ${p.bild_url}, ${p.kategorie},
        ${p.seo_title}, ${p.seo_description}, ${p.veroeffentlicht ?? false}, ${p.created_at}
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        titel = EXCLUDED.titel,
        teaser = EXCLUDED.teaser,
        inhalt = EXCLUDED.inhalt,
        bild_url = EXCLUDED.bild_url,
        kategorie = EXCLUDED.kategorie,
        seo_title = EXCLUDED.seo_title,
        seo_description = EXCLUDED.seo_description,
        veroeffentlicht = EXCLUDED.veroeffentlicht
    `;
  }

  console.log("Migration fertig.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
