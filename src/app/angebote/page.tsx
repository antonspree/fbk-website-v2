import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PreisAnzeige } from "@/components/common/PreisAnzeige";
import { createClient } from "@/lib/supabase/server";
import type { AngebotWithMaschine } from "@/lib/types";
import { formatDatum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aktuelle Angebote & Schnäppchen",
  description:
    "Aktuelle Sonderangebote bei Firmenberatung Kassel – gebrauchte Maschinen in Top-Zustand zu besonders günstigen Preisen. Zeitlich begrenzt!",
};

async function getAngebote(): Promise<AngebotWithMaschine[]> {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("angebote")
    .select("*, maschinen(*, kategorien(*), maschinen_bilder(*))")
    .eq("aktiv", true)
    .or(`gueltig_bis.is.null,gueltig_bis.gte.${today}`)
    .order("created_at", { ascending: false });
  return (data as AngebotWithMaschine[]) ?? [];
}

export default async function AngebotePage() {
  const angebote = await getAngebote();

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Aktuelle Angebote</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Aktuelle Angebote &amp; Schnäppchen
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl text-sm leading-relaxed">
            Hier finden Sie unsere aktuellen Sonderangebote. Gebrauchte Maschinen in Top-Zustand
            zu besonders günstigen Preisen. Die Angebote sind zeitlich begrenzt – sprechen Sie uns
            bei Interesse schnell an.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {angebote.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {angebote.map((angebot) => {
              const maschine = angebot.maschinen;
              const titelbild = maschine?.maschinen_bilder?.find((b) => b.ist_titelbild)
                ?? maschine?.maschinen_bilder?.[0];

              return (
                <div key={angebot.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {titelbild ? (
                      <Image
                        src={titelbild.url}
                        alt={maschine?.titel ?? angebot.titel}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[#E8621A] text-white border-0 text-xs font-bold">
                        SONDERANGEBOT
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-bold text-[#0F1F3D] text-xl mb-1">{angebot.titel}</h2>
                    {angebot.beschreibung && (
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{angebot.beschreibung}</p>
                    )}
                    {maschine && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                        <PreisAnzeige preis={maschine.preis} preis_auf_anfrage={maschine.preis_auf_anfrage} />
                        {angebot.gueltig_bis && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-[#E8621A]" />
                            <span>Gültig bis: {formatDatum(angebot.gueltig_bis)}</span>
                          </div>
                        )}
                        <Button asChild size="sm" className="w-full bg-[#0F1F3D] hover:bg-[#E8621A] text-white border-0 mt-3 transition-colors">
                          <Link href={`/maschinen/${maschine.slug}`}>
                            Details ansehen <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">Aktuell keine Sonderangebote verfügbar.</p>
            <p className="text-gray-400 text-sm mb-6">
              Schauen Sie sich unser gesamtes Maschinenbestand an oder kontaktieren Sie uns direkt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/maschinen">Alle Maschinen</Link>
              </Button>
              <Button asChild className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0">
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
