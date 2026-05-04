import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firmenadresseZeilen, lagerstandorte } from "@/lib/adressen";

export const metadata: Metadata = {
  title: "Über uns – Firmenberatung Kassel Inh. Alfred Otto e.K.",
  description:
    "Lernen Sie die Firmenberatung Kassel kennen. Über 20 Jahre Erfahrung im Handel mit Werkzeugmaschinen. Persönliche Beratung, fairer Handel, schnelle Abwicklung.",
};

export default function UeberUnsPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Über uns</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">Über uns</h1>
          <p className="text-white/60 mt-2 text-sm">
            Firmenberatung Kassel Inh. Alfred Otto e.K. – Seit über 20 Jahren Ihr Partner für
            Werkzeugmaschinen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src="/images/4.webp"
                alt="Das Lager der Firmenberatung Kassel mit Werkzeugmaschinen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6397cc]/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-white font-heading font-bold text-lg">Unsere Lager in der Region Kassel</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-4">Wer wir sind</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Die Firmenberatung Kassel Inh. Alfred Otto e.K. ist ein auf Werkzeugmaschinen
                spezialisiertes Handelsunternehmen mit Sitz in Kaufungen bei Kassel. Gegründet von
                Alfred Otto, ist das Unternehmen seit über zwei Jahrzehnten verlässlicher Partner für Industrie-
                und Handwerksbetriebe in ganz Deutschland und Europa.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Heute führen Alfred Otto und sein Sohn Daniel Otto das Unternehmen gemeinsam.
                Diese Verbindung aus Erfahrung und frischem Blick macht uns zu einem besonders
                kompetenten Ansprechpartner – sowohl für klassische Werkzeugmaschinen als auch
                für neuere CNC-Technologien.
              </p>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-4">Was wir tun</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Wir handeln mit neuen und gebrauchten Werkzeugmaschinen aller Art: Drehmaschinen,
                Fräsmaschinen, Bearbeitungszentren, Schleifmaschinen, Sägen, Pressen und vieles mehr.
                Unsere Lagerstandorte in der Region Kassel umfassen ständig über 100 Maschinen,
                die nach Vereinbarung besichtigt und getestet werden können.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Neben dem Verkauf kaufen wir auch aktiv gebrauchte Maschinen an – von Einzelmaschinen
                bis hin zu kompletten Maschinenparks bei Betriebsauflösungen.
              </p>
            </div>

            <div className="bg-[#6397cc] rounded-lg p-7">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Unsere Philosophie</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                Ehrlicher Handel, persönliche Beratung und faire Preise – das sind die Grundsätze,
                nach denen wir seit dem ersten Tag arbeiten.
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Wir verkaufen keine Maschinen, von denen wir nicht überzeugt sind. Wenn eine Maschine
                Mängel hat, sagen wir das offen. Wenn wir denken, dass ein anderes Modell besser zu
                Ihren Anforderungen passt, sagen wir das ebenfalls.
              </p>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-2xl font-bold text-[#6397cc] mb-4">Unsere Standorte</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Wir unterhalten <strong>zwei Lager</strong> mit jeweils eigenem Standort:{" "}
                <strong>Hess. Lichtenau</strong> (Kooperation Fa. Richter) und{" "}
                <strong>Niestetal</strong> (Kooperation Fa. Tomic). Die Postadresse der Firma
                bleibt {firmenadresseZeilen[2]}. Beide Lager sind über die A7 und für Kunden aus dem
                gesamten nordhessischen Raum gut erreichbar.
              </p>
              <Button asChild variant="outline" className="border-[#6397cc] text-[#6397cc] hover:bg-[#6397cc] hover:text-white">
                <Link href="/anfahrt">Anfahrtsbeschreibung</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/images/7.webp"
                alt="Werkzeugmaschinen bei Firmenberatung Kassel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-heading font-bold text-[#6397cc] text-lg mb-4">
                Kontakt aufnehmen
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1f4a73] flex-shrink-0 mt-0.5" />
                  <div className="not-italic text-gray-700 leading-relaxed text-sm">
                    <p className="font-medium text-[#6397cc]">Postanschrift</p>
                    {firmenadresseZeilen[0]}
                    <br />
                    {firmenadresseZeilen[1]}
                    <br />
                    {firmenadresseZeilen[2]}
                    <p className="font-medium text-[#6397cc] mt-3">Lager</p>
                    <ul className="mt-1 space-y-1.5">
                      {lagerstandorte.map((l) => (
                        <li key={l.id}>
                          {l.bezeichnung} ({l.partner}): {l.strasse}, {l.plz} {l.ort}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a href="tel:+4956057068" className="flex items-center gap-3 text-gray-700 hover:text-[#1f4a73] transition-colors">
                  <Phone className="w-4 h-4 text-[#1f4a73]" />
                  +49 (0) 5605 – 70686
                </a>
                <a href="mailto:info@firmenberatung-kassel.de" className="flex items-center gap-3 text-gray-700 hover:text-[#1f4a73] transition-colors">
                  <Mail className="w-4 h-4 text-[#1f4a73]" />
                  info@firmenberatung-kassel.de
                </a>
              </div>
              <Button asChild className="w-full mt-5 bg-[#1f4a73] hover:bg-[#173a58] text-white border-0 font-semibold">
                <Link href="/kontakt">Nachricht senden</Link>
              </Button>
            </div>

            <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-[#1f4a73]">20+</span>
                <p className="text-gray-600 text-sm mt-1">Jahre Erfahrung</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-[#1f4a73]">100+</span>
                <p className="text-gray-600 text-sm mt-1">Maschinen im Lager</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-[#1f4a73]">DE/EU</span>
                <p className="text-gray-600 text-sm mt-1">Lieferung möglich</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
