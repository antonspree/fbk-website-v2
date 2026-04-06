import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageSquare, ShoppingBag, Truck, BarChart3, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Unser Service rund um Werkzeugmaschinen",
  description:
    "Beratung, Ankauf, Verkauf und Lieferung von Werkzeugmaschinen. Firmenberatung Kassel bietet umfassenden Service für Industrie und Handwerk.",
};

const services = [
  {
    icon: MessageSquare,
    title: "Beratung & Vermittlung",
    text: "Seit über 20 Jahren beraten wir Unternehmen aus Industrie und Handwerk beim Kauf und Verkauf von Werkzeugmaschinen. Wir kennen den Markt, die Hersteller und die Anforderungen unserer Kunden. Ob Sie eine einzelne Maschine suchen oder einen gesamten Maschinenpark aufbauen möchten – wir finden die passende Lösung.",
  },
  {
    icon: ShoppingBag,
    title: "Ankauf von Maschinen",
    text: "Sie möchten Maschinen aus Ihrem Betrieb veräußern? Wir kaufen gebrauchte Werkzeugmaschinen aller Fabrikate und Baujahre an. Auch komplette Betriebsauflösungen übernehmen wir professionell und unkompliziert.",
  },
  {
    icon: Truck,
    title: "Transport & Lieferung",
    text: "Auf Wunsch organisieren wir den Transport Ihrer Maschinen – ob Abholung oder Lieferung, bundesweit oder europaweit. Wir arbeiten mit erfahrenen Speditionen zusammen, die auf schwere Maschinen und Sondertransporte spezialisiert sind.",
  },
  {
    icon: BarChart3,
    title: "Maschinenbewertung",
    text: "Sie sind unsicher, was Ihre Maschine wert ist? Wir geben Ihnen eine ehrliche und marktgerechte Einschätzung – kostenlos und unverbindlich. Profitieren Sie von unserer langjährigen Markterfahrung.",
  },
];

export default function ServicePage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Service</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Unser Service
          </h1>
          <p className="text-white/60 mt-2 max-w-xl text-sm">
            Von der ersten Beratung bis zur Lieferung – wir sind an Ihrer Seite.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <p className="text-gray-700 text-lg leading-relaxed">
              Die Firmenberatung Kassel ist mehr als ein Maschinenhandel. Wir bieten Ihnen einen
              umfassenden Service, der von der ersten Beratung bis zur Lieferung reicht.
            </p>
          </div>

          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-white rounded-lg p-7 border border-gray-200 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#E8621A]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#E8621A]" />
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0F1F3D] mb-3">{service.title}</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{service.text}</p>
                </div>
              </div>
            );
          })}

          <div className="bg-[#0F1F3D] rounded-lg p-7 text-center space-y-4">
            <Phone className="w-10 h-10 text-[#E8621A] mx-auto" />
            <h2 className="font-heading text-2xl font-bold text-white">Fragen? Rufen Sie uns an.</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Unser Team ist persönlich erreichbar und beantwortet alle Ihre Fragen direkt.
              Keine Warteschleife, kein Callcenter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+4956057068"
                className="text-[#E8621A] font-heading font-bold text-xl hover:text-orange-300 transition-colors"
              >
                +49 (0) 5605 – 70686
              </a>
              <Button asChild className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
                <Link href="/kontakt">Nachricht senden</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
