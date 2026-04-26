import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Car, Bus, ParkingSquare } from "lucide-react";
import { LagerstandorteKarten } from "@/components/common/LagerstandorteKarten";
import { lagerstandorte, firmenadresseZeilen } from "@/lib/adressen";

export const metadata: Metadata = {
  title: "Anfahrt – So finden Sie uns",
  description:
    "Zwei Lagerstandorte: Hess. Lichtenau (Fa. Richter) und Niestetal (Fa. Tomic). Firmenadresse Kaufungen. Anfahrt mit Auto und ÖPNV.",
};

export default function AnfahrtPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Anfahrt</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Anfahrt
          </h1>
          <p className="text-white/60 mt-2 text-sm max-w-2xl">
            Lager 1: Hess. Lichtenau (Fa. Richter) · Lager 2: Niestetal (Fa. Tomic) · Post: {firmenadresseZeilen[1]}, {firmenadresseZeilen[2]}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Lagerbild */}
        <div className="relative w-full aspect-[21/6] rounded-xl overflow-hidden mb-10">
          <Image
            src="https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?w=1600&auto=format&fit=crop&q=80"
            alt="Maschinenlager – Firmenberatung Kassel"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/60 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <p className="text-white font-heading font-bold text-sm sm:text-lg leading-snug max-w-3xl">
              Zwei Lager: Hess. Lichtenau (Fa. Richter) &amp; Niestetal (Fa. Tomic) – Post: Kaufungen
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="bg-white rounded-lg p-6 border border-gray-200 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center">
                  <Car className="w-5 h-5 text-[#E8621A]" />
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Mit dem Auto</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Unsere Maschinen stehen an <strong>zwei Lagerstandorten</strong> in der Region Kassel. Beide
                  Orte sind über die <strong>A7</strong> und landesweit gut angebunden. Bitte planen Sie Ihren
                  Besuch vorab mit uns – wir nennen Ihnen das passende Lager für die von Ihnen ausgewählte Maschine.
                </p>
                <ul className="text-gray-700 text-sm space-y-2 leading-relaxed list-disc pl-4">
                  <li>
                    <strong>{lagerstandorte[0].bezeichnung}</strong> (bei {lagerstandorte[0].partner}):{" "}
                    {lagerstandorte[0].plz} {lagerstandorte[0].ort} – südöstlich von Kassel, u. a. von der A7
                    aus Richtung Region erreichbar.
                  </li>
                  <li>
                    <strong>{lagerstandorte[1].bezeichnung}</strong> (bei {lagerstandorte[1].partner}):{" "}
                    {lagerstandorte[1].plz} {lagerstandorte[1].ort} – unmittelbar neben Kassel, Anbindung u. a. über
                    die A7.
                  </li>
                </ul>
                <p className="text-gray-600 text-sm mt-3">
                  Post- und Firmenadresse: {firmenadresseZeilen[1]}, {firmenadresseZeilen[2]}.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-[#E8621A]" />
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">
                  Mit öffentlichen Verkehrsmitteln
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Kassel / Niestetal</strong> ist mit Bus und Bahn angebunden. Für Anfahrt zu{" "}
                  {lagerstandorte[1].ort} prüfen Sie am besten die Verbindung zum Kasseler Bahnhof bzw. zu
                  Haltestellen in Niestetal. Nach <strong>{lagerstandorte[0].ort}</strong> gelangen Sie
                  u. a. mit Buslinien ab Kassel; genaue Fahrpläne finden Sie beim NVV. Vor Ort: Bitte
                  vereinbaren Sie den Besuch telefonisch.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center">
                  <ParkingSquare className="w-5 h-5 text-[#E8621A]" />
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Parkplätze</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  An beiden Lagerstandorten sind in der Regel Stell- und Ladeplätze vorhanden. Für
                  LKW, Tieflader und Transporter klären Sie die Zufahrt bitte vorab – wir helfen gern
                  mit der Einfahrt und Koordination.
                </p>
              </div>
            </div>

            <div className="bg-[#0F1F3D] rounded-lg p-6">
              <p className="text-white font-semibold text-sm mb-2">Besuchen Sie uns nach Absprache</p>
              <p className="text-white/70 text-sm">
                Bitte vereinbaren Sie Ihren Besuch vorab telefonisch. Wir freuen uns auf Sie!
              </p>
              <a href="tel:+4956057068" className="mt-3 inline-block text-[#E8621A] font-semibold text-sm hover:text-orange-300 transition-colors">
                +49 (0) 5605 – 70686
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#0F1F3D]">Karten: Lager 1 &amp; Lager 2</h2>
            <LagerstandorteKarten />
          </div>
        </div>
      </div>
    </div>
  );
}
