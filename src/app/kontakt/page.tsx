import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { KontaktFormular } from "@/components/forms/KontaktFormular";
import { LagerstandorteKarten } from "@/components/common/LagerstandorteKarten";
import { firmenadresseZeilen, lagerstandorte } from "@/lib/adressen";

export const metadata: Metadata = {
  title: "Kontakt – Firmenberatung Kassel",
  description:
    "Kontaktieren Sie die Firmenberatung Kassel. Zwei Lagerstandorte: Hess. Lichtenau (Fa. Richter) und Niestetal (Fa. Tomic) sowie Firmenadresse in Kaufungen.",
};

export default function KontaktPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Kontakt</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">Kontakt</h1>
          <p className="text-white/60 mt-2 text-sm">Wir freuen uns auf Ihre Anfrage.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Kontaktdaten + Map */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src="/images/8.webp"
                alt="Firmenberatung Kassel – Werkzeugmaschinen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6397cc]/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-white font-heading font-bold text-sm sm:text-base leading-tight max-w-md">
                  Lager: Hess. Lichtenau &amp; Niestetal – siehe unten
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-xl font-bold text-[#6397cc] mb-5">Unsere Kontaktdaten</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f4a73]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1f4a73]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6397cc] text-sm mb-1">Firmenadresse (Postanschrift)</p>
                    <address className="not-italic text-gray-700 text-sm leading-relaxed">
                      {firmenadresseZeilen.map((z, i) => (
                        <span key={i}>
                          {i > 0 && <br />}
                          {z}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f4a73]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1f4a73]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6397cc] text-sm mb-2">Lagerstandorte (Besuch nach Vereinbarung)</p>
                    <ul className="text-gray-700 text-sm leading-relaxed space-y-3">
                      {lagerstandorte.map((l) => (
                        <li key={l.id}>
                          <span className="font-semibold text-[#6397cc]">{l.bezeichnung}</span>{" "}
                          <span className="text-gray-500">(bei {l.partner})</span>
                          <br />
                          {l.strasse}
                          <br />
                          {l.plz} {l.ort}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f4a73]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#1f4a73]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6397cc] text-sm mb-1">Telefon</p>
                    <a href="tel:+4956057068" className="text-gray-700 hover:text-[#1f4a73] text-sm transition-colors block">
                      +49 (0) 5605 – 70686
                    </a>
                    <p className="text-gray-500 text-xs mt-1">
                      Alfred Otto Mobil: <a href="tel:+4915121253264" className="hover:text-[#1f4a73]">+49 (0) 151 – 21253264</a><br />
                      Daniel Otto Mobil: <a href="tel:+4917317244455" className="hover:text-[#1f4a73]">+49 (0) 173 – 1724445</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f4a73]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#1f4a73]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6397cc] text-sm mb-1">E-Mail</p>
                    <a
                      href="mailto:info@firmenberatung-kassel.de"
                      className="text-gray-700 hover:text-[#1f4a73] text-sm transition-colors"
                    >
                      info@firmenberatung-kassel.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f4a73]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1f4a73]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6397cc] text-sm mb-1">Öffnungszeiten</p>
                    <p className="text-gray-700 text-sm">Mo – Fr: nach Vereinbarung</p>
                    <p className="text-gray-500 text-xs mt-1">Besichtigungen gerne nach telefonischer Absprache</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-[#6397cc] text-sm mb-3">Karten Lager 1 &amp; Lager 2</h3>
              <LagerstandorteKarten />
            </div>
          </div>

          {/* Formular */}
          <div className="bg-white rounded-lg p-7 border border-gray-200">
            <h2 className="font-heading text-xl font-bold text-[#6397cc] mb-2">Nachricht senden</h2>
            <p className="text-gray-500 text-sm mb-6">
              Füllen Sie das Formular aus – wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
            <KontaktFormular />
          </div>
        </div>
      </div>
    </div>
  );
}
