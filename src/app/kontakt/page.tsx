import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { KontaktFormular } from "@/components/forms/KontaktFormular";

export const metadata: Metadata = {
  title: "Kontakt – Firmenberatung Kassel",
  description:
    "Kontaktieren Sie die Firmenberatung Kassel. Telefon, E-Mail oder Kontaktformular. Werkzeugmaschinenhandel in Kaufungen bei Kassel.",
};

export default function KontaktPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
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
                alt="Firmenberatung Kassel – Werkzeugmaschinenhandel in Kaufungen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-white font-heading font-bold">Walburger Straße 8, 34260 Kaufungen</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-7 border border-gray-200">
              <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-5">Unsere Kontaktdaten</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#E8621A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F1F3D] text-sm mb-1">Adresse</p>
                    <address className="not-italic text-gray-700 text-sm leading-relaxed">
                      Firmenberatung Kassel Inh. Alfred Otto e.K.<br />
                      Walburger Straße 8<br />
                      34260 Kaufungen
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#E8621A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F1F3D] text-sm mb-1">Telefon</p>
                    <a href="tel:+4956057068" className="text-gray-700 hover:text-[#E8621A] text-sm transition-colors block">
                      +49 (0) 5605 – 70686
                    </a>
                    <p className="text-gray-500 text-xs mt-1">
                      Alfred Otto Mobil: <a href="tel:+4915121253264" className="hover:text-[#E8621A]">+49 (0) 151 – 21253264</a><br />
                      Daniel Otto Mobil: <a href="tel:+4917317244455" className="hover:text-[#E8621A]">+49 (0) 173 – 1724445</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#E8621A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F1F3D] text-sm mb-1">E-Mail</p>
                    <a
                      href="mailto:info@firmenberatung-kassel.de"
                      className="text-gray-700 hover:text-[#E8621A] text-sm transition-colors"
                    >
                      info@firmenberatung-kassel.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8621A]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#E8621A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F1F3D] text-sm mb-1">Öffnungszeiten</p>
                    <p className="text-gray-700 text-sm">Mo – Fr: nach Vereinbarung</p>
                    <p className="text-gray-500 text-xs mt-1">Besichtigungen gerne nach telefonischer Absprache</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.2!2d9.6!3d51.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba4e5f9c1fd44d%3A0x7ad1e6e7c5adf3d1!2sWalburger%20Stra%C3%9Fe%208%2C%2034260%20Kaufungen!5e0!3m2!1sde!2sde!4v1617000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Firmenberatung Kassel"
              />
            </div>
          </div>

          {/* Formular */}
          <div className="bg-white rounded-lg p-7 border border-gray-200">
            <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-2">Nachricht senden</h2>
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
