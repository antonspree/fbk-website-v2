import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wrench, Package, Users, Truck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaschineCard } from "@/components/maschinen/MaschineCard";
import { SterneBewertung } from "@/components/common/SterneBewertung";
import { createClient } from "@/lib/supabase/server";
import type { MaschineWithKategorie, Bewertung } from "@/lib/types";
import { formatDatum } from "@/lib/utils";

const kategorien = [
  { name: "Drehmaschinen", slug: "drehmaschinen", icon: "⚙️" },
  { name: "Fräsmaschinen", slug: "fraesmaschinen", icon: "🔧" },
  { name: "Bearbeitungszentren", slug: "bearbeitungszentren", icon: "🏭" },
  { name: "Flachschleifmaschinen", slug: "flachschleifmaschinen", icon: "⚡" },
  { name: "Bandsägeautomaten", slug: "bandsaegautomaten", icon: "🔩" },
  { name: "Blechbearbeitung", slug: "blechbearbeitung", icon: "🛠️" },
  { name: "Pressen", slug: "pressen", icon: "🔨" },
  { name: "Sonstiges", slug: "sonstiges", icon: "📦" },
];

const usps = [
  {
    icon: Wrench,
    title: "Über 20 Jahre Erfahrung",
    text: "Unser Team kennt den Maschinenmarkt seit Jahrzehnten. Wir handeln nicht nur – wir beraten.",
  },
  {
    icon: Package,
    title: "Großes Lager",
    text: "Über 100 Maschinen ständig verfügbar. Neue und gebrauchte Maschinen auf einem Platz.",
  },
  {
    icon: Users,
    title: "Persönlicher Kontakt",
    text: "Sie erreichen uns direkt. Keine Callcenter, keine langen Wartezeiten.",
  },
  {
    icon: Truck,
    title: "Transport & Lieferung",
    text: "Auf Wunsch organisieren wir den Transport Ihrer Maschine – bundesweit und europaweit.",
  },
];

async function getFeaturedMaschinen(): Promise<MaschineWithKategorie[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("maschinen")
    .select("*, kategorien(*), maschinen_bilder(*)")
    .eq("featured", true)
    .eq("aktiv", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return (data as MaschineWithKategorie[]) ?? [];
}

async function getBewertungen(): Promise<Bewertung[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bewertungen")
    .select("*")
    .eq("freigegeben", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function Startseite() {
  const [featuredMaschinen, bewertungen] = await Promise.all([
    getFeaturedMaschinen(),
    getBewertungen(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#6397cc] min-h-[580px] flex items-center overflow-hidden">
        <Image
          src="/images/1.webp"
          alt="Werkzeugmaschinen im Lager der Firmenberatung Kassel"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6397cc] via-[#6397cc]/90 to-[#6397cc]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest mb-4">
              Werkzeugmaschinenhandel aus Kaufungen bei Kassel
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6">
              WERKZEUG&shy;MASCHINEN –<br />
              <span className="text-[#1f4a73]">HANDEL &amp; INDUSTRIE</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              Neue und gebrauchte Maschinen für Industrie und Handwerk. Persönliche Beratung,
              faire Preise, schnelle Abwicklung – seit über 20 Jahren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#1f4a73] hover:bg-[#173a58] text-white border-0 font-bold font-heading text-base px-8"
              >
                <Link href="/maschinen">
                  Maschinen entdecken
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8 bg-transparent"
              >
                <Link href="/kontakt">Jetzt kontaktieren</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#1f4a73] font-bold text-xl font-heading">100+</span>
                <span>Maschinen im Lager</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#1f4a73] font-bold text-xl font-heading">20+</span>
                <span>Jahre Erfahrung</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#1f4a73] font-bold text-xl font-heading">DE/EU</span>
                <span>Lieferung möglich</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategorien */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest">
                Sortiment
              </span>
              <h2 className="font-heading text-4xl font-bold text-[#6397cc] mt-1">
                Unsere Maschinenkategorien
              </h2>
            </div>
            <Link
              href="/maschinen"
              className="hidden sm:flex items-center gap-1 text-[#1f4a73] font-semibold text-sm hover:gap-2 transition-all"
            >
              Alle ansehen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {kategorien.map((kat) => (
              <Link
                key={kat.slug}
                href={`/maschinen?kategorie=${kat.slug}`}
                className="group bg-white rounded-lg p-5 border border-gray-200 hover:border-[#1f4a73] hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
              >
                <span className="text-3xl mb-3">{kat.icon}</span>
                <span className="font-heading font-bold text-[#6397cc] text-sm leading-tight group-hover:text-[#1f4a73] transition-colors">
                  {kat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aktuelle Maschinen */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest">
                Empfehlungen
              </span>
              <h2 className="font-heading text-4xl font-bold text-[#6397cc] mt-1">
                Aktuelle Maschinen
              </h2>
            </div>
            <Link
              href="/maschinen"
              className="hidden sm:flex items-center gap-1 text-[#1f4a73] font-semibold text-sm hover:gap-2 transition-all"
            >
              Alle Maschinen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredMaschinen.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMaschinen.map((maschine) => (
                <MaschineCard key={maschine.id} maschine={maschine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-4">Derzeit keine hervorgehobenen Maschinen vorhanden.</p>
              <Button asChild className="bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0">
                <Link href="/maschinen">Alle Maschinen anzeigen</Link>
              </Button>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className="border-[#6397cc] text-[#6397cc]">
              <Link href="/maschinen">Alle Maschinen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lager-Einblick */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest">
                Einblick
              </span>
              <h2 className="font-heading text-4xl font-bold text-[#6397cc] mt-1 mb-4">
                Unsere Lager in der Region Kassel
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Über 100 Maschinen stehen ständig zur Verfügung – zum Ansehen, Testen und
                sofortigen Mitnehmen. Unsere Bestände stehen in <strong>zwei Lagerstandorten</strong>{" "}
                (Hess. Lichtenau bei Fa. Richter und Niestetal bei Fa. Tomic) – beide an die A7
                angebunden, gut erreichbar aus ganz Nordhessen und darüber hinaus.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ob Einzelmaschine oder kompletter Maschinenpark – vereinbaren Sie einen Termin, wir
                nennen Ihnen den passenden Standort, und überzeugen Sie sich vor Ort.
              </p>
              <Button asChild className="bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0 font-semibold transition-colors">
                <Link href="/anfahrt">Anfahrt &amp; Öffnungszeiten</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/2.webp"
                  alt="Maschinenpark im Lager der Firmenberatung Kassel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mt-6">
                <Image
                  src="/images/3.webp"
                  alt="Gebrauchte Werkzeugmaschinen zum Verkauf"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="py-16 bg-[#6397cc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest">
              Ihre Vorteile
            </span>
            <h2 className="font-heading text-4xl font-bold text-white mt-1">
              Warum Firmenberatung Kassel?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp) => {
              const Icon = usp.icon;
              return (
                <div key={usp.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1f4a73]/15 mb-5">
                    <Icon className="w-7 h-7 text-[#1f4a73]" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{usp.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{usp.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bewertungen */}
      {bewertungen.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest">
                Kundenstimmen
              </span>
              <h2 className="font-heading text-4xl font-bold text-[#6397cc] mt-1">
                Das sagen unsere Kunden
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bewertungen.map((b) => (
                <div key={b.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <SterneBewertung bewertung={b.bewertung} className="mb-3" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{b.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#6397cc] text-sm">{b.name}</span>
                    <span className="text-gray-400 text-xs">{formatDatum(b.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/bewertungen"
                className="inline-flex items-center gap-1 text-[#1f4a73] font-semibold text-sm hover:gap-2 transition-all"
              >
                Alle Bewertungen lesen <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-14 bg-[#1f4a73]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
              Sie möchten eine Maschine verkaufen?
            </h2>
            <p className="text-white/85 text-base leading-relaxed max-w-xl">
              Wir kaufen gebrauchte Werkzeugmaschinen an. Schnelle Bewertung, faire Preise,
              unkomplizierte Abwicklung.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="flex-shrink-0 bg-white text-[#1f4a73] hover:bg-gray-100 border-0 font-bold font-heading text-base px-8 shadow-lg"
          >
            <Link href="/maschinen-verkaufen">
              Maschine verkaufen
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
