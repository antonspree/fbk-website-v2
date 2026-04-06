import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Firmenberatung Kassel e.K. – Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Impressum</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white">Impressum</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-7 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Firmenberatung Kassel Inh. Alfred Otto e.K.<br />
              Walburger Straße 8<br />
              34260 Kaufungen
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Vertreten durch</h2>
            <p>Alfred Otto</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Kontakt</h2>
            <p>
              Telefon: +49 (0) 5605 – 70686<br />
              E-Mail:{" "}
              <a href="mailto:info@firmenberatung-kassel.de" className="text-[#E8621A] hover:underline">
                info@firmenberatung-kassel.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Registereintrag</h2>
            <p>
              Eingetragen im Handelsregister beim Amtsgericht Kassel<br />
              Registernummer: [einzufügen]
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
              [einzufügen]
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Alfred Otto<br />
              Walburger Straße 8<br />
              34260 Kaufungen
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8621A] hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-2">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
