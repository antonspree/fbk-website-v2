import type { Kategorie, Maschine, MaschineBild, Angebot, Anfrage, Bewertung, BlogPost } from "@/lib/types";

export function iso(d: Date | string | null | undefined): string {
  if (!d) return new Date().toISOString();
  return d instanceof Date ? d.toISOString() : String(d);
}

export function mapKategorie(r: {
  id: string;
  name: string;
  slug: string;
  beschreibung: string | null;
  parentId: string | null;
  icon: string | null;
  iconUrl: string | null;
  createdAt: Date;
}): Kategorie {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    beschreibung: r.beschreibung,
    parent_id: r.parentId,
    icon: r.icon,
    icon_url: r.iconUrl,
    created_at: iso(r.createdAt),
  };
}

export function mapMaschine(r: {
  id: string;
  slug: string;
  titel: string;
  hersteller: string;
  typ: string;
  baujahr: number | null;
  zustand: string | null;
  preis: string | null;
  preisAufAnfrage: boolean;
  kategorieId: string | null;
  beschreibung: string | null;
  specs: Record<string, string | number> | null;
  featured: boolean;
  aktiv: boolean;
  createdAt: Date;
}): Maschine {
  return {
    id: r.id,
    slug: r.slug,
    titel: r.titel,
    hersteller: r.hersteller,
    typ: r.typ,
    baujahr: r.baujahr,
    zustand: (r.zustand as Maschine["zustand"]) ?? null,
    preis: r.preis != null ? Number(r.preis) : null,
    preis_auf_anfrage: r.preisAufAnfrage,
    kategorie_id: r.kategorieId,
    beschreibung: r.beschreibung,
    specs: r.specs,
    featured: r.featured,
    aktiv: r.aktiv,
    created_at: iso(r.createdAt),
  };
}

export function mapMaschineBild(r: {
  id: string;
  maschineId: string;
  url: string;
  position: number;
  istTitelbild: boolean;
  createdAt: Date;
}): MaschineBild {
  return {
    id: r.id,
    maschine_id: r.maschineId,
    url: r.url,
    position: r.position,
    ist_titelbild: r.istTitelbild,
    created_at: iso(r.createdAt),
  };
}

export function mapAngebot(r: {
  id: string;
  titel: string;
  beschreibung: string | null;
  maschineId: string | null;
  gueltigBis: string | null;
  aktiv: boolean;
  createdAt: Date;
}): Angebot {
  return {
    id: r.id,
    titel: r.titel,
    beschreibung: r.beschreibung,
    maschine_id: r.maschineId,
    gueltig_bis: r.gueltigBis,
    aktiv: r.aktiv,
    created_at: iso(r.createdAt),
  };
}

export function mapAnfrage(r: {
  id: string;
  name: string;
  email: string;
  telefon: string | null;
  betreff: string | null;
  nachricht: string;
  maschineId: string | null;
  typ: string | null;
  gelesen: boolean;
  createdAt: Date;
}): Anfrage {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    telefon: r.telefon,
    betreff: r.betreff,
    nachricht: r.nachricht,
    maschine_id: r.maschineId,
    typ: (r.typ as Anfrage["typ"]) ?? null,
    gelesen: r.gelesen,
    created_at: iso(r.createdAt),
  };
}

export function mapBewertung(r: {
  id: string;
  name: string;
  bewertung: number;
  text: string;
  freigegeben: boolean;
  createdAt: Date;
}): Bewertung {
  return {
    id: r.id,
    name: r.name,
    bewertung: r.bewertung,
    text: r.text,
    freigegeben: r.freigegeben,
    created_at: iso(r.createdAt),
  };
}

export function mapBlogPost(r: {
  id: string;
  slug: string;
  titel: string;
  teaser: string;
  inhalt: string;
  bildUrl: string | null;
  kategorie: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  veroeffentlicht: boolean;
  createdAt: Date;
}): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    titel: r.titel,
    teaser: r.teaser,
    inhalt: r.inhalt,
    bild_url: r.bildUrl,
    kategorie: r.kategorie,
    seo_title: r.seoTitle,
    seo_description: r.seoDescription,
    veroeffentlicht: r.veroeffentlicht,
    created_at: iso(r.createdAt),
  };
}
