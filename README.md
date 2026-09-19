# Firmenberatung Kassel – Website

Next.js auf **Vercel**, Datenbank **Vercel Postgres (Neon)**, Dateien **Vercel Blob**, Admin-Login **Auth.js**.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** TailwindCSS v4, shadcn/ui
- **DB:** Vercel Postgres / Neon + Drizzle ORM
- **Storage:** Vercel Blob
- **Auth:** Auth.js (Credentials) für `/admin`
- **Deployment:** Vercel

## Setup

### 1. Abhängigkeiten

```bash
npm install
```

### 2. Umgebungsvariablen

Lokal (`.env.local` / `vercel env pull`):

```
DATABASE_URL=postgres://…          # Vercel Postgres / Neon
BLOB_READ_WRITE_TOKEN=vercel_blob_…
AUTH_SECRET=…                      # openssl rand -base64 32
ADMIN_EMAIL=info@firmenberatung-kassel.de
ADMIN_PASSWORD=…
NEXT_PUBLIC_SITE_URL=https://www.firmenberatung-kassel.de
```

Optional zum Daten-Umzug von Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=…
SUPABASE_SERVICE_ROLE_KEY=…
```

### 3. Datenbank

```bash
# Schema anlegen
npm run db:migrate

# Optional: Daten von Supabase übernehmen
npm run db:migrate-data
```

### 4. Entwicklung

```bash
npm run dev
```

Admin: `/admin` mit `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Vercel

Projekt: `crash2-cash/fbk-website-v2`  
Blob-Store: `fbk-maschinen-blob` (verbunden)

Postgres (Neon) einmalig über Marketplace anlegen (Terms akzeptieren), dann:

```bash
vercel integration add neon --name fbk-postgres
npm run db:migrate
npm run db:migrate-data   # falls Alt-Daten
vercel --prod
```
