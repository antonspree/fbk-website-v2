-- ============================================================
-- FBK Website – Datenbankschema
-- ============================================================

-- Kategorien
CREATE TABLE kategorien (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  beschreibung  text,
  parent_id     uuid REFERENCES kategorien(id),
  created_at    timestamptz DEFAULT now()
);

-- Maschinen
CREATE TABLE maschinen (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,
  titel             text NOT NULL,
  hersteller        text NOT NULL,
  typ               text NOT NULL,
  baujahr           int,
  zustand           text CHECK (zustand IN ('neu', 'gebraucht')),
  preis             numeric,
  preis_auf_anfrage boolean DEFAULT false,
  kategorie_id      uuid REFERENCES kategorien(id),
  beschreibung      text,
  specs             jsonb,
  featured          boolean DEFAULT false,
  aktiv             boolean DEFAULT true,
  created_at        timestamptz DEFAULT now()
);

-- Maschinen-Bilder
CREATE TABLE maschinen_bilder (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  maschine_id   uuid REFERENCES maschinen(id) ON DELETE CASCADE,
  url           text NOT NULL,
  position      int DEFAULT 0,
  ist_titelbild boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- Angebote
CREATE TABLE angebote (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titel         text NOT NULL,
  beschreibung  text,
  maschine_id   uuid REFERENCES maschinen(id),
  gueltig_bis   date,
  aktiv         boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- Anfragen (Kontakt, Ankauf, Maschineninteresse)
CREATE TABLE anfragen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL,
  telefon       text,
  betreff       text,
  nachricht     text NOT NULL,
  maschine_id   uuid REFERENCES maschinen(id),
  typ           text CHECK (typ IN ('kauf', 'verkauf', 'allgemein')),
  gelesen       boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- Bewertungen
CREATE TABLE bewertungen (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  bewertung     int CHECK (bewertung BETWEEN 1 AND 5),
  text          text NOT NULL,
  freigegeben   boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- Blog-Artikel
CREATE TABLE blog_posts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,
  titel             text NOT NULL,
  teaser            text NOT NULL,
  inhalt            text NOT NULL,
  bild_url          text,
  kategorie         text,
  seo_title         text,
  seo_description   text,
  veroeffentlicht   boolean DEFAULT false,
  created_at        timestamptz DEFAULT now()
);

-- ============================================================
-- Indizes
-- ============================================================
CREATE INDEX idx_maschinen_slug ON maschinen(slug);
CREATE INDEX idx_maschinen_kategorie ON maschinen(kategorie_id);
CREATE INDEX idx_maschinen_featured ON maschinen(featured) WHERE featured = true;
CREATE INDEX idx_maschinen_aktiv ON maschinen(aktiv) WHERE aktiv = true;
CREATE INDEX idx_maschinen_zustand ON maschinen(zustand);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_veroeffentlicht ON blog_posts(veroeffentlicht) WHERE veroeffentlicht = true;
CREATE INDEX idx_anfragen_gelesen ON anfragen(gelesen);
CREATE INDEX idx_bewertungen_freigegeben ON bewertungen(freigegeben);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE kategorien ENABLE ROW LEVEL SECURITY;
ALTER TABLE maschinen ENABLE ROW LEVEL SECURITY;
ALTER TABLE maschinen_bilder ENABLE ROW LEVEL SECURITY;
ALTER TABLE angebote ENABLE ROW LEVEL SECURITY;
ALTER TABLE anfragen ENABLE ROW LEVEL SECURITY;
ALTER TABLE bewertungen ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Lesen: alle dürfen öffentliche Daten lesen
CREATE POLICY "kategorien_public_read" ON kategorien FOR SELECT USING (true);
CREATE POLICY "maschinen_public_read" ON maschinen FOR SELECT USING (aktiv = true);
CREATE POLICY "maschinen_bilder_public_read" ON maschinen_bilder FOR SELECT USING (true);
CREATE POLICY "angebote_public_read" ON angebote FOR SELECT USING (aktiv = true);
CREATE POLICY "bewertungen_public_read" ON bewertungen FOR SELECT USING (freigegeben = true);
CREATE POLICY "blog_posts_public_read" ON blog_posts FOR SELECT USING (veroeffentlicht = true);

-- Anfragen: jeder darf einfügen (Kontaktformular), aber nicht lesen
CREATE POLICY "anfragen_public_insert" ON anfragen FOR INSERT WITH CHECK (true);

-- Bewertungen: jeder darf einfügen, aber nicht lesen (bis freigegeben)
CREATE POLICY "bewertungen_public_insert" ON bewertungen FOR INSERT WITH CHECK (true);

-- Admin: authentifizierte Nutzer dürfen alles
CREATE POLICY "kategorien_admin_all" ON kategorien FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "maschinen_admin_all" ON maschinen FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "maschinen_bilder_admin_all" ON maschinen_bilder FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "angebote_admin_all" ON angebote FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "anfragen_admin_all" ON anfragen FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "bewertungen_admin_all" ON bewertungen FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "blog_posts_admin_all" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
