export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Supabase Database Type
export interface Database {
  public: {
    Tables: {
      kategorien: {
        Row: Kategorie;
        Insert: Omit<Kategorie, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Kategorie, "id" | "created_at">>;
        Relationships: [];
      };
      maschinen: {
        Row: Maschine;
        Insert: Omit<Maschine, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Maschine, "id" | "created_at">>;
        Relationships: [];
      };
      maschinen_bilder: {
        Row: MaschineBild;
        Insert: Omit<MaschineBild, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<MaschineBild, "id" | "created_at">>;
        Relationships: [];
      };
      angebote: {
        Row: Angebot;
        Insert: Omit<Angebot, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Angebot, "id" | "created_at">>;
        Relationships: [];
      };
      anfragen: {
        Row: Anfrage;
        Insert: Omit<Anfrage, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Anfrage, "id" | "created_at">>;
        Relationships: [];
      };
      bewertungen: {
        Row: Bewertung;
        Insert: Omit<Bewertung, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Bewertung, "id" | "created_at">>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<BlogPost, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export interface Kategorie {
  id: string;
  name: string;
  slug: string;
  beschreibung: string | null;
  parent_id: string | null;
  created_at: string;
}

export interface Maschine {
  id: string;
  slug: string;
  titel: string;
  hersteller: string;
  typ: string;
  baujahr: number | null;
  zustand: "neu" | "gebraucht" | null;
  preis: number | null;
  preis_auf_anfrage: boolean;
  kategorie_id: string | null;
  beschreibung: string | null;
  specs: Record<string, string | number> | null;
  featured: boolean;
  aktiv: boolean;
  created_at: string;
}

export interface MaschineWithKategorie extends Maschine {
  kategorien: Kategorie | null;
  maschinen_bilder: MaschineBild[];
}

export interface MaschineBild {
  id: string;
  maschine_id: string;
  url: string;
  position: number;
  ist_titelbild: boolean;
  created_at: string;
}

export interface Angebot {
  id: string;
  titel: string;
  beschreibung: string | null;
  maschine_id: string | null;
  gueltig_bis: string | null;
  aktiv: boolean;
  created_at: string;
}

export interface AngebotWithMaschine extends Angebot {
  maschinen: MaschineWithKategorie | null;
}

export interface Anfrage {
  id: string;
  name: string;
  email: string;
  telefon: string | null;
  betreff: string | null;
  nachricht: string;
  maschine_id: string | null;
  typ: "kauf" | "verkauf" | "allgemein" | null;
  gelesen: boolean;
  created_at: string;
}

export interface Bewertung {
  id: string;
  name: string;
  bewertung: number;
  text: string;
  freigegeben: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titel: string;
  teaser: string;
  inhalt: string;
  bild_url: string | null;
  kategorie: string | null;
  seo_title: string | null;
  seo_description: string | null;
  veroeffentlicht: boolean;
  created_at: string;
}

export interface MaschinenFilter {
  kategorie?: string;
  preis_min?: number;
  preis_max?: number;
  baujahr_min?: number;
  baujahr_max?: number;
  zustand?: "neu" | "gebraucht";
  sortierung?: "newest" | "price_asc" | "price_desc";
  seite?: number;
  suche?: string;
}
