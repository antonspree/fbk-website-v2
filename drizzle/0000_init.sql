-- FBK Website – Schema für Vercel Postgres / Neon
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS kategorien (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  beschreibung  text,
  parent_id     uuid REFERENCES kategorien(id),
  icon          text,
  icon_url      text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS maschinen (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,
  titel             text NOT NULL,
  hersteller        text NOT NULL,
  typ               text NOT NULL,
  baujahr           int,
  zustand           text CHECK (zustand IS NULL OR zustand IN ('neu', 'gebraucht')),
  preis             numeric,
  preis_auf_anfrage boolean NOT NULL DEFAULT false,
  kategorie_id      uuid REFERENCES kategorien(id),
  beschreibung      text,
  specs             jsonb,
  featured          boolean NOT NULL DEFAULT false,
  aktiv             boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS maschinen_bilder (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  maschine_id   uuid NOT NULL REFERENCES maschinen(id) ON DELETE CASCADE,
  url           text NOT NULL,
  position      int NOT NULL DEFAULT 0,
  ist_titelbild boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS angebote (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titel         text NOT NULL,
  beschreibung  text,
  maschine_id   uuid REFERENCES maschinen(id),
  gueltig_bis   date,
  aktiv         boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS anfragen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL,
  telefon       text,
  betreff       text,
  nachricht     text NOT NULL,
  maschine_id   uuid REFERENCES maschinen(id),
  typ           text CHECK (typ IS NULL OR typ IN ('kauf', 'verkauf', 'allgemein')),
  gelesen       boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bewertungen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  bewertung     int NOT NULL CHECK (bewertung BETWEEN 1 AND 5),
  text          text NOT NULL,
  freigegeben   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,
  titel             text NOT NULL,
  teaser            text NOT NULL,
  inhalt            text NOT NULL,
  bild_url          text,
  kategorie         text,
  seo_title         text,
  seo_description   text,
  veroeffentlicht   boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_maschinen_slug ON maschinen(slug);
CREATE INDEX IF NOT EXISTS idx_maschinen_kategorie ON maschinen(kategorie_id);
CREATE INDEX IF NOT EXISTS idx_maschinen_featured ON maschinen(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_maschinen_aktiv ON maschinen(aktiv) WHERE aktiv = true;
CREATE INDEX IF NOT EXISTS idx_maschinen_zustand ON maschinen(zustand);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_veroeffentlicht ON blog_posts(veroeffentlicht) WHERE veroeffentlicht = true;
CREATE INDEX IF NOT EXISTS idx_anfragen_gelesen ON anfragen(gelesen);
CREATE INDEX IF NOT EXISTS idx_bewertungen_freigegeben ON bewertungen(freigegeben);
