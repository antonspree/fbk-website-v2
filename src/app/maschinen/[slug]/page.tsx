import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Phone, Mail, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MaschineGalerie } from "@/components/maschinen/MaschineGalerie";
import { SpecsTabelle } from "@/components/maschinen/SpecsTabelle";
import { AnfrageFormular } from "@/components/forms/AnfrageFormular";
import { PreisAnzeige } from "@/components/common/PreisAnzeige";
import { createClient } from "@/lib/supabase/server";
import type { MaschineWithKategorie } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getMaschine(slug: string): Promise<MaschineWithKategorie | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("maschinen")
    .select("*, kategorien(*), maschinen_bilder(*)")
    .eq("slug", slug)
    .eq("aktiv", true)
    .single();
  return (data as unknown as MaschineWithKategorie) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const maschine = await getMaschine(slug);
  if (!maschine) return { title: "Maschine nicht gefunden" };

  const title = `${maschine.hersteller} ${maschine.typ} kaufen`;
  const description = `${maschine.zustand === "gebraucht" ? "Gebrauchte" : "Neue"} ${maschine.hersteller} ${maschine.typ} ${maschine.baujahr ? `(Bj. ${maschine.baujahr})` : ""} beim Händler kaufen. Firmenberatung Kassel – Werkzeugmaschinenhandel aus Kaufungen.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} – Firmenberatung Kassel`,
      description,
    },
  };
}

export async function generateStaticParams() {
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data } = await supabase.from("maschinen").select("slug").eq("aktiv", true);
    return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

export default async function MaschineDetailPage({ params }: Props) {
  const { slug } = await params;
  const maschine = await getMaschine(slug);

  if (!maschine) notFound();

  const bilder = maschine.maschinen_bilder ?? [];
  const specs = maschine.specs as Record<string, string | number> | null;

  // Schema.org Product JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: maschine.titel,
    description: maschine.beschreibung ?? undefined,
    brand: {
      "@type": "Brand",
      name: maschine.hersteller,
    },
    manufacturer: {
      "@type": "Organization",
      name: maschine.hersteller,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: maschine.preis_auf_anfrage ? undefined : maschine.preis,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Firmenberatung Kassel e.K.",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#F5F5F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-[#0F1F3D] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/maschinen" className="hover:text-white transition-colors">Maschinen</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white truncate max-w-xs">{maschine.titel}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Galerie */}
            <div>
              <MaschineGalerie bilder={bilder} titel={maschine.titel} />
            </div>

            {/* Infos */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {maschine.zustand && (
                    <Badge
                      className={
                        maschine.zustand === "neu"
                          ? "bg-green-600 text-white border-0"
                          : "bg-[#0F1F3D] text-white border-0"
                      }
                    >
                      {maschine.zustand === "neu" ? "Neu" : "Gebraucht"}
                    </Badge>
                  )}
                  {maschine.kategorien && (
                    <Badge variant="outline" className="text-xs">
                      {maschine.kategorien.name}
                    </Badge>
                  )}
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F1F3D] leading-tight">
                  {maschine.titel}
                </h1>
              </div>

              {/* Kerndaten */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#E8621A] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Hersteller</p>
                    <p className="font-semibold text-[#0F1F3D] text-sm">{maschine.hersteller}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E8621A] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Typ</p>
                    <p className="font-semibold text-[#0F1F3D] text-sm">{maschine.typ}</p>
                  </div>
                </div>
                {maschine.baujahr && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#E8621A] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Baujahr</p>
                      <p className="font-semibold text-[#0F1F3D] text-sm">{maschine.baujahr}</p>
                    </div>
                  </div>
                )}
                {maschine.zustand && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E8621A] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Zustand</p>
                      <p className="font-semibold text-[#0F1F3D] text-sm capitalize">{maschine.zustand}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Preis */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Preis</p>
                <PreisAnzeige
                  preis={maschine.preis}
                  preis_auf_anfrage={maschine.preis_auf_anfrage}
                  size="lg"
                />
                {!maschine.preis_auf_anfrage && maschine.preis && (
                  <p className="text-xs text-gray-400 mt-1">zzgl. MwSt. und Transport</p>
                )}
              </div>

              {/* Kontakt */}
              <div className="bg-[#0F1F3D] rounded-lg p-5 space-y-3">
                <p className="text-white font-semibold text-sm">Haben Sie Interesse?</p>
                <a
                  href="tel:+4956057068"
                  className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E8621A]" />
                  <span>+49 (0) 5605 – 70686</span>
                </a>
                <a
                  href="mailto:info@firmenberatung-kassel.de"
                  className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E8621A]" />
                  <span>info@firmenberatung-kassel.de</span>
                </a>
              </div>
            </div>
          </div>

          {/* Beschreibung + Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {maschine.beschreibung && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-4">Beschreibung</h2>
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {maschine.beschreibung}
                  </div>
                </div>
              )}

              {specs && Object.keys(specs).length > 0 && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-4">
                    Technische Spezifikationen
                  </h2>
                  <SpecsTabelle specs={specs} />
                </div>
              )}
            </div>

            {/* Anfrage-Formular */}
            <div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-1">
                  Interesse an dieser Maschine?
                </h2>
                <p className="text-gray-500 text-sm mb-5">
                  Senden Sie uns eine Anfrage – wir antworten innerhalb von 24 Stunden.
                </p>
                <AnfrageFormular
                  maschineId={maschine.id}
                  maschineTitel={maschine.titel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
