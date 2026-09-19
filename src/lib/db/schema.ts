import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  date,
} from "drizzle-orm/pg-core";

export const kategorien = pgTable("kategorien", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  beschreibung: text("beschreibung"),
  parentId: uuid("parent_id"),
  icon: text("icon"),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const maschinen = pgTable("maschinen", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  titel: text("titel").notNull(),
  hersteller: text("hersteller").notNull(),
  typ: text("typ").notNull(),
  baujahr: integer("baujahr"),
  zustand: text("zustand"),
  preis: numeric("preis"),
  preisAufAnfrage: boolean("preis_auf_anfrage").default(false).notNull(),
  kategorieId: uuid("kategorie_id").references(() => kategorien.id),
  beschreibung: text("beschreibung"),
  specs: jsonb("specs").$type<Record<string, string | number> | null>(),
  featured: boolean("featured").default(false).notNull(),
  aktiv: boolean("aktiv").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const maschinenBilder = pgTable("maschinen_bilder", {
  id: uuid("id").primaryKey().defaultRandom(),
  maschineId: uuid("maschine_id")
    .notNull()
    .references(() => maschinen.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  position: integer("position").default(0).notNull(),
  istTitelbild: boolean("ist_titelbild").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const angebote = pgTable("angebote", {
  id: uuid("id").primaryKey().defaultRandom(),
  titel: text("titel").notNull(),
  beschreibung: text("beschreibung"),
  maschineId: uuid("maschine_id").references(() => maschinen.id),
  gueltigBis: date("gueltig_bis"),
  aktiv: boolean("aktiv").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const anfragen = pgTable("anfragen", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  telefon: text("telefon"),
  betreff: text("betreff"),
  nachricht: text("nachricht").notNull(),
  maschineId: uuid("maschine_id").references(() => maschinen.id),
  typ: text("typ"),
  gelesen: boolean("gelesen").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bewertungen = pgTable("bewertungen", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  bewertung: integer("bewertung").notNull(),
  text: text("text").notNull(),
  freigegeben: boolean("freigegeben").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  titel: text("titel").notNull(),
  teaser: text("teaser").notNull(),
  inhalt: text("inhalt").notNull(),
  bildUrl: text("bild_url"),
  kategorie: text("kategorie"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  veroeffentlicht: boolean("veroeffentlicht").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
