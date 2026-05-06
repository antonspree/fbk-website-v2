import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaschineCard } from "@/components/maschinen/MaschineCard";
import { MaschineFilter } from "@/components/maschinen/MaschineFilter";
import { createClient } from "@/lib/supabase/server";
import type { MaschineWithKategorie, Kategorie } from "@/lib/types";

export const metadata: Metadata = {
  title: "Neue Werkzeugmaschinen",
  description:
    "Neue Werkzeugmaschinen namhafter Hersteller – direkt vom Händler. Profitieren Sie von unserer Erfahrung bei der Auswahl der richtigen Maschine für Ihren Betrieb.",
};

const PAGE_SIZE = 12;

interface SearchParams {
  kategorie?: string;
  preis_min?: string;
  preis_max?: string;
  baujahr_min?: string;
  baujahr_max?: string;
  sortierung?: string;
  seite?: string;
  suche?: string;
}

async function getNeueMaschinen(searchParams: SearchParams) {
  const supabase = await createClient();
  const page = parseInt(searchParams.seite ?? "1");
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("maschinen")
    .select("*, kategorien(*), maschinen_bilder(*)", { count: "exact" })
    .eq("aktiv", true)
    .eq("zustand", "neu");

  if (searchParams.kategorie && searchParams.kategorie !== "alle") {
    const { data: kat } = await supabase
      .from("kategorien")
      .select("id")
      .eq("slug", searchParams.kategorie)
      .single();
    if (kat) query = query.eq("kategorie_id", (kat as { id: string }).id);
  }
  if (searchParams.preis_min) query = query.gte("preis", parseInt(searchParams.preis_min));
  if (searchParams.preis_max) query = query.lte("preis", parseInt(searchParams.preis_max));
  if (searchParams.suche) {
    const term = searchParams.suche;
    query = query.or(`titel.ilike.%${term}%,hersteller.ilike.%${term}%,typ.ilike.%${term}%`);
  }

  const sortierung = searchParams.sortierung ?? "newest";
  if (sortierung === "price_asc") query = query.order("preis", { ascending: true });
  else if (sortierung === "price_desc") query = query.order("preis", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  query = query.range(from, to);
  const { data, count } = await query;
  return {
    maschinen: (data as MaschineWithKategorie[]) ?? [],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}

async function getKategorien(): Promise<Kategorie[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("kategorien").select("*").order("name");
  return data ?? [];
}

interface NeueMaschinenPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function NeueMaschinenPage({ searchParams }: NeueMaschinenPageProps) {
  const params = await searchParams;
  const [result, kategorien] = await Promise.all([getNeueMaschinen(params), getKategorien()]);
  const { maschinen, total, page, totalPages } = result;

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
    );
    sp.set("seite", p.toString());
    return `/maschinen-neu?${sp.toString()}`;
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="relative bg-[#6397cc] py-14 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1600&auto=format&fit=crop&q=80"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6397cc] via-[#6397cc]/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Neue Maschinen</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">Neue Werkzeugmaschinen</h1>
          <p className="text-white/60 mt-2 max-w-2xl text-sm leading-relaxed">
            Neben unserem umfangreichen Sortiment an gebrauchten Maschinen bieten wir Ihnen ausgewählte
            Neumaschinen namhafter Hersteller an. Profitieren Sie von unserer Erfahrung bei der Auswahl
            der richtigen Maschine für Ihren Betrieb.
          </p>
          <p className="text-white/40 mt-2 text-xs">{total} Maschinen gefunden</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-white rounded-lg animate-pulse" />}>
              <MaschineFilter kategorien={kategorien} hideZustandFilter />
            </Suspense>
          </aside>
          <div className="flex-1">
            {maschinen.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {maschinen.map((m) => <MaschineCard key={m.id} maschine={m} />)}
                </div>
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={buildPageUrl(page - 1)}>
                          <ChevronLeft className="w-4 h-4 mr-1" />Zurück
                        </Link>
                      </Button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={buildPageUrl(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${p === page ? "bg-[#6397cc] text-white" : "text-gray-600 hover:bg-gray-200"}`}
                      >{p}</Link>
                    ))}
                    {page < totalPages && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={buildPageUrl(page + 1)}>Weiter<ChevronRight className="w-4 h-4 ml-1" /></Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <p className="text-gray-500 text-lg mb-4">Derzeit keine neuen Maschinen verfügbar.</p>
                <Button asChild className="bg-[#1f4a73] hover:bg-[#173a58] text-white border-0">
                  <Link href="/kontakt">Anfrage stellen</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
