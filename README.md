# Firmenberatung Kassel – Website

Neue Website für Firmenberatung Kassel
Inh. Alfred Otto e.K. – Werkzeugmaschinenhandel.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** TailwindCSS v4, shadcn/ui
- **Backend:** Supabase (PostgreSQL, RLS, Storage)
- **Deployment:** Vercel

## Setup

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Umgebungsvariablen konfigurieren

`.env.local` anpassen:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://www.firmenberatung-kassel.de
```

### 3. Supabase Datenbank einrichten

1. Neues Supabase-Projekt anlegen
2. SQL aus `supabase/migrations/001_init.sql` im SQL-Editor ausführen
3. SQL aus `supabase/storage.sql` für Storage-Buckets ausführen
4. Seed-Daten aus `supabase/seed.sql` einspielen
5. In Supabase Auth einen Admin-User anlegen

### 4. Entwicklungsserver starten

```bash
npm run dev
```

## Struktur

```
src/
├── app/               # Next.js App Router Pages
│   ├── admin/         # Admin-Bereich (geschützt)
│   ├── maschinen/     # Maschinenübersicht & Details
│   ├── blog/          # Blog
│   └── ...            # Weitere öffentliche Seiten
├── components/        # React-Komponenten
│   ├── admin/         # Admin-UI-Komponenten
│   ├── forms/         # Formulare
│   ├── layout/        # Header, Footer, AdminSidebar
│   ├── maschinen/     # Maschinenkomponenten
│   └── ui/            # shadcn/ui-Komponenten
└── lib/
    ├── supabase/      # Supabase-Clients (client, server, admin)
    ├── types.ts       # TypeScript-Interfaces
    └── utils.ts       # Hilfsfunktionen
```

## Admin-Bereich

Erreichbar unter `/admin`. Anmeldung mit Supabase Auth (E-Mail + Passwort).

- **Dashboard:** Übersicht über Maschinen, Anfragen, Bewertungen
- **Maschinen:** CRUD, Bildupload zu Supabase Storage
- **Kategorien:** Verwaltung der Maschinenkategorien
- **Anfragen:** Eingehende Kunden- und Verkaufsanfragen
- **Bewertungen:** Freigabe von Kundenbewertungen
- **Blog:** Markdown-Editor für Blog-Artikel

## Deployment (Vercel)

1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel-Projekteinstellungen hinzufügen
3. Deploy – fertig!
