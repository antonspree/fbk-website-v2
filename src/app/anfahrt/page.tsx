import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Car, Bus, ParkingSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Anfahrt – So finden Sie uns",
  description:
    "Anfahrtsbeschreibung zur Firmenberatung Kassel, Walburger Straße 8, 34260 Kaufungen. Mit Auto und ÖPNV gut erreichbar.",
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
          <p className="text-white/60 mt-2 text-sm">
            Walburger Straße 8, 34260 Kaufungen
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                <p className="text-gray-700 text-sm leading-relaxed">
                  Kaufungen liegt östlich von Kassel und ist über die A7 gut erreichbar. Von der Autobahn
                  nehmen Sie die Ausfahrt <strong>Kassel-Ost / Kaufungen</strong> und folgen der
                  Beschilderung nach Kaufungen. Die Walburger Straße liegt zentral im Ort.
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
                  Kaufungen ist über die <strong>Straßenbahnlinie 4</strong> aus dem Kasseler Zentrum
                  erreichbar. Vom Bahnhof Kassel-Wilhelmshöhe fahren ebenfalls Busverbindungen nach
                  Kaufungen.
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
                  Direkt vor dem Gelände stehen ausreichend Parkplätze zur Verfügung. Für LKW und
                  Transporter ist die Zufahrt ebenfalls möglich.
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

          {/* Großes Maps-Embed */}
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.2!2d9.6!3d51.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba4e5f9c1fd44d%3A0x7ad1e6e7c5adf3d1!2sWalburger%20Stra%C3%9Fe%208%2C%2034260%20Kaufungen!5e0!3m2!1sde!2sde!4v1617000000000"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anfahrtskarte Firmenberatung Kassel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
