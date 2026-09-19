import { and, asc, desc, eq, ilike, inArray, or, sql, count } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  anfragen,
  bewertungen,
  blogPosts,
  kategorien,
  maschinen,
  maschinenBilder,
  angebote,
} from "@/lib/db/schema";
import {
  mapAnfrage,
  mapAngebot,
  mapBewertung,
  mapBlogPost,
  mapKategorie,
  mapMaschine,
  mapMaschineBild,
} from "@/lib/db/mappers";
import type { MaschineWithKategorie, AngebotWithMaschine } from "@/lib/types";

export async function listKategorien(opts?: { rootsOnly?: boolean }) {
  const rows = opts?.rootsOnly
    ? await db.select().from(kategorien).where(sql`${kategorien.parentId} is null`).orderBy(asc(kategorien.name))
    : await db.select().from(kategorien).orderBy(asc(kategorien.name));
  return rows.map(mapKategorie);
}

export async function resolveKategorieIdsForSlug(slug: string): Promise<string[] | null> {
  const [kat] = await db.select().from(kategorien).where(eq(kategorien.slug, slug)).limit(1);
  if (!kat) return null;
  const children = await db
    .select({ id: kategorien.id })
    .from(kategorien)
    .where(eq(kategorien.parentId, kat.id));
  if (children.length > 0) {
    return [kat.id, ...children.map((c) => c.id)];
  }
  return [kat.id];
}

async function attachMaschineRelations(
  rows: (typeof maschinen.$inferSelect)[]
): Promise<MaschineWithKategorie[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const katIds = [...new Set(rows.map((r) => r.kategorieId).filter(Boolean))] as string[];

  const [bilder, kats] = await Promise.all([
    db.select().from(maschinenBilder).where(inArray(maschinenBilder.maschineId, ids)),
    katIds.length
      ? db.select().from(kategorien).where(inArray(kategorien.id, katIds))
      : Promise.resolve([]),
  ]);

  const katMap = new Map(kats.map((k) => [k.id, mapKategorie(k)]));
  const bilderByM = new Map<string, ReturnType<typeof mapMaschineBild>[]>();
  for (const b of bilder) {
    const list = bilderByM.get(b.maschineId) ?? [];
    list.push(mapMaschineBild(b));
    bilderByM.set(b.maschineId, list);
  }
  for (const list of bilderByM.values()) {
    list.sort((a, b) => a.position - b.position);
  }

  return rows.map((r) => ({
    ...mapMaschine(r),
    kategorien: r.kategorieId ? katMap.get(r.kategorieId) ?? null : null,
    maschinen_bilder: bilderByM.get(r.id) ?? [],
  }));
}

export async function getMaschineBySlug(slug: string, onlyAktiv = true) {
  const conditions = [eq(maschinen.slug, slug)];
  if (onlyAktiv) conditions.push(eq(maschinen.aktiv, true));
  const [row] = await db
    .select()
    .from(maschinen)
    .where(and(...conditions))
    .limit(1);
  if (!row) return null;
  const [m] = await attachMaschineRelations([row]);
  return m;
}

export async function getMaschineById(id: string) {
  const [row] = await db.select().from(maschinen).where(eq(maschinen.id, id)).limit(1);
  if (!row) return null;
  const [m] = await attachMaschineRelations([row]);
  return m;
}

export async function listFeaturedMaschinen(limit = 6) {
  const rows = await db
    .select()
    .from(maschinen)
    .where(and(eq(maschinen.featured, true), eq(maschinen.aktiv, true)))
    .orderBy(desc(maschinen.createdAt))
    .limit(limit);
  return attachMaschineRelations(rows);
}

export async function listMaschinen(params: {
  page?: number;
  pageSize?: number;
  zustand?: "neu" | "gebraucht";
  kategorieSlug?: string;
  preisMin?: number;
  preisMax?: number;
  baujahrMin?: number;
  baujahrMax?: number;
  suche?: string;
  sortierung?: string;
  onlyAktiv?: boolean;
}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 12;
  const conditions = [];

  if (params.onlyAktiv !== false) conditions.push(eq(maschinen.aktiv, true));
  if (params.zustand) conditions.push(eq(maschinen.zustand, params.zustand));
  if (params.kategorieSlug && params.kategorieSlug !== "alle") {
    const ids = await resolveKategorieIdsForSlug(params.kategorieSlug);
    if (ids?.length) conditions.push(inArray(maschinen.kategorieId, ids));
  }
  if (params.preisMin != null) conditions.push(sql`${maschinen.preis}::numeric >= ${params.preisMin}`);
  if (params.preisMax != null) conditions.push(sql`${maschinen.preis}::numeric <= ${params.preisMax}`);
  if (params.baujahrMin != null) conditions.push(sql`${maschinen.baujahr} >= ${params.baujahrMin}`);
  if (params.baujahrMax != null) conditions.push(sql`${maschinen.baujahr} <= ${params.baujahrMax}`);
  if (params.suche) {
    const term = `%${params.suche}%`;
    conditions.push(
      or(
        ilike(maschinen.titel, term),
        ilike(maschinen.hersteller, term),
        ilike(maschinen.typ, term)
      )!
    );
  }

  const where = conditions.length ? and(...conditions) : undefined;
  const order =
    params.sortierung === "price_asc"
      ? asc(maschinen.preis)
      : params.sortierung === "price_desc"
        ? desc(maschinen.preis)
        : desc(maschinen.createdAt);

  const [{ total }] = await db.select({ total: count() }).from(maschinen).where(where);
  const rows = await db
    .select()
    .from(maschinen)
    .where(where)
    .orderBy(order)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    maschinen: await attachMaschineRelations(rows),
    total: Number(total),
    page,
    totalPages: Math.ceil(Number(total) / pageSize) || 1,
  };
}

export async function listBewertungen(opts?: { freigegeben?: boolean; limit?: number }) {
  const conditions = [];
  if (opts?.freigegeben != null) conditions.push(eq(bewertungen.freigegeben, opts.freigegeben));
  const q = db
    .select()
    .from(bewertungen)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(bewertungen.createdAt));
  const rows = opts?.limit ? await q.limit(opts.limit) : await q;
  return rows.map(mapBewertung);
}

export async function listBlogPosts(opts?: { veroeffentlicht?: boolean; limit?: number }) {
  const conditions = [];
  if (opts?.veroeffentlicht != null) {
    conditions.push(eq(blogPosts.veroeffentlicht, opts.veroeffentlicht));
  }
  const q = db
    .select()
    .from(blogPosts)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(blogPosts.createdAt));
  const rows = opts?.limit ? await q.limit(opts.limit) : await q;
  return rows.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string, onlyPublished = true) {
  const conditions = [eq(blogPosts.slug, slug)];
  if (onlyPublished) conditions.push(eq(blogPosts.veroeffentlicht, true));
  const [row] = await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .limit(1);
  return row ? mapBlogPost(row) : null;
}

export async function getBlogPostById(id: string) {
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return row ? mapBlogPost(row) : null;
}

export async function listRelatedBlogPosts(currentSlug: string, kategorie: string | null, limit = 3) {
  const conditions = [
    eq(blogPosts.veroeffentlicht, true),
    sql`${blogPosts.slug} <> ${currentSlug}`,
  ];
  if (kategorie) conditions.push(eq(blogPosts.kategorie, kategorie));
  const rows = await db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.createdAt))
    .limit(limit);
  return rows.map(mapBlogPost);
}

export async function listAngebote() {
  const rows = await db
    .select()
    .from(angebote)
    .where(eq(angebote.aktiv, true))
    .orderBy(desc(angebote.createdAt));
  const result: AngebotWithMaschine[] = [];
  for (const a of rows) {
    const mapped = mapAngebot(a);
    let m: MaschineWithKategorie | null = null;
    if (a.maschineId) m = await getMaschineById(a.maschineId);
    result.push({ ...mapped, maschinen: m });
  }
  return result;
}

export async function listAnfragen() {
  const rows = await db.select().from(anfragen).orderBy(desc(anfragen.createdAt));
  return rows.map(mapAnfrage);
}

export async function adminDashboardStats() {
  const [[{ maschinenCount }], [{ anfragenUngelesen }], [{ bewertungenPending }], letzteAnfragen, letzteMaschinen] =
    await Promise.all([
      db.select({ maschinenCount: count() }).from(maschinen).where(eq(maschinen.aktiv, true)),
      db.select({ anfragenUngelesen: count() }).from(anfragen).where(eq(anfragen.gelesen, false)),
      db
        .select({ bewertungenPending: count() })
        .from(bewertungen)
        .where(eq(bewertungen.freigegeben, false)),
      db.select().from(anfragen).orderBy(desc(anfragen.createdAt)).limit(5),
      db.select().from(maschinen).orderBy(desc(maschinen.createdAt)).limit(5),
    ]);

  return {
    maschinenCount: Number(maschinenCount),
    anfragenUngelesen: Number(anfragenUngelesen),
    bewertungenPending: Number(bewertungenPending),
    letzteAnfragen: letzteAnfragen.map(mapAnfrage),
    letzteMaschinen: letzteMaschinen.map(mapMaschine),
  };
}

export async function listMaschinenAdmin(suche?: string) {
  const rows = suche
    ? await db
        .select()
        .from(maschinen)
        .where(
          or(
            ilike(maschinen.titel, `%${suche}%`),
            ilike(maschinen.hersteller, `%${suche}%`),
            ilike(maschinen.typ, `%${suche}%`)
          )
        )
        .orderBy(desc(maschinen.createdAt))
    : await db.select().from(maschinen).orderBy(desc(maschinen.createdAt));
  return attachMaschineRelations(rows);
}

export async function listAllMaschineSlugs() {
  return db.select({ slug: maschinen.slug }).from(maschinen).where(eq(maschinen.aktiv, true));
}

export async function listAllBlogSlugs() {
  return db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.veroeffentlicht, true));
}

export async function sitemapEntries() {
  const [m, b] = await Promise.all([
    db
      .select({ slug: maschinen.slug, createdAt: maschinen.createdAt })
      .from(maschinen)
      .where(eq(maschinen.aktiv, true)),
    db
      .select({ slug: blogPosts.slug, createdAt: blogPosts.createdAt })
      .from(blogPosts)
      .where(eq(blogPosts.veroeffentlicht, true)),
  ]);
  return { maschinen: m, blog: b };
}
