import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { BewertungCard } from "@/components/bewertungen/BewertungCard";
import { BewertungFormular } from "@/components/bewertungen/BewertungFormular";
import { createClient } from "@/lib/supabase/server";
import type { Bewertung } from "@/lib/types";

export const metadata: Metadata = {
  title: "Kundenbewertungen",
  description:
    "Lesen Sie, was unsere Kunden über die Firmenberatung Kassel sagen. Bewertungen von Käufern und Verkäufern von Werkzeugmaschinen.",
};

async function getBewertungen(): Promise<Bewertung[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bewertungen")
    .select("*")
    .eq("freigegeben", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function BewertungenPage() {
  const bewertungen = await getBewertungen();
  const avg = bewertungen.length
    ? (bewertungen.reduce((sum, b) => sum + b.bewertung, 0) / bewertungen.length).toFixed(1)
    : null;

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Kundenbewertungen</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Kundenbewertungen
          </h1>
          <p className="text-white/60 mt-2 max-w-xl text-sm leading-relaxed">
            Vertrauen ist die Basis unserer Arbeit. Lesen Sie hier, was unsere Kunden über ihre
            Erfahrungen mit der Firmenberatung Kassel berichten.
          </p>
          {avg && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[#1f4a73] font-heading font-bold text-2xl">{avg}</span>
              <span className="text-white/60 text-sm">/ 5 aus {bewertungen.length} Bewertungen</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {bewertungen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {bewertungen.map((b) => (
              <BewertungCard key={b.id} bewertung={b} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">
            Noch keine Bewertungen vorhanden.
          </p>
        )}

        {/* Bild-Trenner */}
        <div className="relative my-12 rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1711418235199-171c8ecb9d12?w=1400&auto=format&fit=crop&q=80"
            alt="Qualität und Vertrauen bei Firmenberatung Kassel"
            width={1400}
            height={320}
            className="w-full object-cover h-44 sm:h-56"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#6397cc]/70 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-[#1f4a73] font-heading font-bold text-sm uppercase tracking-widest mb-2">Seit über 20 Jahren</p>
              <p className="text-white font-heading font-bold text-2xl sm:text-3xl">
                Zufriedene Kunden – unser größter Antrieb
              </p>
            </div>
          </div>
        </div>

        {/* Formular */}
        <div className="max-w-lg mx-auto bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-2">
            Eigene Bewertung abgeben
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Haben Sie Erfahrungen mit uns gemacht? Teilen Sie Ihre Meinung.
          </p>
          <BewertungFormular />
        </div>
      </div>
    </div>
  );
}
