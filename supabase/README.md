# Supabase CLI – Migrationen

Projekt-Ref (Remote): `dgzjnkwuymhnvpzkgjoi`  
(aus `NEXT_PUBLIC_SUPABASE_URL`)

## Einmalig einrichten

1. Mit dem **Supabase-Account einloggen, dem das FBK-Projekt gehört**:

```bash
npm run db:login
```

2. Projekt verknüpfen (DB-Passwort aus Dashboard → Project Settings → Database):

```bash
npm run db:link
```

3. Wenn `001_init.sql` früher schon manuell im SQL-Editor lief, Baseline setzen (nur einmal):

```bash
npm run db:repair-baseline
```

4. Offene Migrationen anwenden:

```bash
npm run db:push
```

Damit wird u. a. `002_kategorien_icon.sql` (`icon` / `icon_url`) auf die Live-DB gebracht.

## Alltag

| Befehl | Wirkung |
|--------|---------|
| `npm run db:push` | Neue Dateien aus `migrations/` auf Remote pushen |
| `npm run db:status` | Lokal vs. Remote Migrationsstatus |
| `npm run db:pull` | Schema-Diff von Remote holen (neue Migration) |

Neue Migration anlegen:

```bash
npx supabase migration new beschreibung_der_aenderung
```
