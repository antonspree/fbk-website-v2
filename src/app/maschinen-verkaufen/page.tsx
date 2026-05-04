import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { VerkaufFormular } from "@/components/forms/VerkaufFormular";

export const metadata: Metadata = {
  title: "Maschine verkaufen – Wir kaufen Ihre Werkzeugmaschinen",
  description:
    "Sie möchten Werkzeugmaschinen verkaufen? Firmenberatung Kassel kauft gebrauchte Maschinen an. Schnelle Bewertung, faire Preise, bundesweite Abholung.",
};

const vorteile = [
  "Kostenlose Bewertung Ihrer Maschinen",
  "Faire und marktgerechte Preise",
  "Schnelle Abwicklung und Bezahlung",
  "Wir organisieren den Abtransport – bundesweit und europaweit",
  "Kein Aufwand für Sie: Wir kümmern uns um alles",
];

export default function MaschinenVerkaufenPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Maschine verkaufen</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Maschine verkaufen
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Wir kaufen Ihre Werkzeugmaschinen – schnell, fair, unkompliziert.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src="/images/5.webp"
                alt="Gebrauchte Werkzeugmaschinen ankauf – Firmenberatung Kassel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#6397cc]/70 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-white font-heading font-bold text-xl leading-tight">
                  Faire Preise für<br />Ihre Maschinen
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-4">
                Wir kaufen Ihre Maschinen an
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Sie haben Maschinen, die Sie nicht mehr benötigen? Wir kaufen gebrauchte
                Werkzeugmaschinen aller Art – Einzelmaschinen, komplette Maschinenparks oder
                ganze Betriebsauflösungen.
              </p>
              <ul className="space-y-3">
                {vorteile.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1f4a73] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#6397cc] rounded-lg p-7 space-y-3">
              <p className="text-white font-semibold">Lieber direkt anrufen?</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Füllen Sie das Formular aus oder rufen Sie uns direkt an. Wir melden uns
                innerhalb von 24 Stunden bei Ihnen.
              </p>
              <a
                href="tel:+4956057068"
                className="flex items-center gap-3 text-white hover:text-[#1f4a73] font-semibold transition-colors"
              >
                <Phone className="w-5 h-5 text-[#1f4a73]" />
                +49 (0) 5605 – 70686
              </a>
              <p className="text-white/60 text-xs">
                Alfred Otto Mobil: +49 (0) 151 – 21253264<br />
                Daniel Otto Mobil: +49 (0) 173 – 1724445
              </p>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h3 className="font-heading font-bold text-[#6397cc] text-lg mb-3">
                Was wir ankaufen
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {[
                  "Drehmaschinen (konventionell & CNC)",
                  "Fräsmaschinen & Bearbeitungszentren",
                  "Schleifmaschinen",
                  "Bandsägeautomaten",
                  "Blechbearbeitungsmaschinen",
                  "Pressen & Stanzmaschinen",
                  "Komplette Maschinenparks",
                  "Betriebsauflösungen",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f4a73] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formular */}
          <div className="bg-white rounded-lg p-7 border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-2">
              Maschine zur Bewertung anmelden
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Beschreiben Sie Ihre Maschine – wir kontaktieren Sie mit einem unverbindlichen Angebot.
            </p>
            <VerkaufFormular />
          </div>
        </div>
      </div>
    </div>
  );
}
