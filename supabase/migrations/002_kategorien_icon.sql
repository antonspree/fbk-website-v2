-- Icons für Kategorien (Emoji-Text oder Bild-URL)
ALTER TABLE kategorien ADD COLUMN IF NOT EXISTS icon text;
ALTER TABLE kategorien ADD COLUMN IF NOT EXISTS icon_url text;

UPDATE kategorien SET icon = '⚙️' WHERE slug = 'drehmaschinen' AND icon IS NULL;
UPDATE kategorien SET icon = '🔧' WHERE slug = 'fraesmaschinen' AND icon IS NULL;
UPDATE kategorien SET icon = '🏭' WHERE slug = 'bearbeitungszentren' AND icon IS NULL;
UPDATE kategorien SET icon = '⚡' WHERE slug = 'flachschleifmaschinen' AND icon IS NULL;
UPDATE kategorien SET icon = '🔩' WHERE slug = 'bandsaegautomaten' AND icon IS NULL;
UPDATE kategorien SET icon = '🛠️' WHERE slug = 'blechbearbeitung' AND icon IS NULL;
UPDATE kategorien SET icon = '🔨' WHERE slug = 'pressen' AND icon IS NULL;
UPDATE kategorien SET icon = '📦' WHERE slug = 'sonstiges' AND icon IS NULL;
