import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  handelsregister,
  mobilAlfredOtto,
  mobilDanielOtto,
  telefonFestnetz,
  umsatzsteuerId,
} from "@/lib/adressen";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Firmenberatung Kassel Inh. Alfred Otto e.K. – Angaben gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
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
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">
              Angaben gemäß § 5 DDG
            </h2>
            <p>
              Firmenberatung Kassel Inh. Alfred Otto e.K.<br />
              Walburger Straße 8<br />
              34260 Kaufungen
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Lagerstandorte</h2>
            <p className="mb-2">Die Maschinen stehen wahlweise in folgenden Lager- und Kooperationsstandorten (Besuch nur nach Absprache):</p>
            <p>
              <strong>Lager 1 (bei Fa. Richter):</strong>
              <br />
              Hopfelderstr. 42
              <br />
              37235 Hess. Lichtenau
            </p>
            <p className="mt-3">
              <strong>Lager 2 (bei Fa. Tomic):</strong>
              <br />
              Ysenburgstraße 18
              <br />
              34266 Niestetal
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Vertreten durch</h2>
            <p>Alfred Otto</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Kontakt</h2>
            <p>
              Telefon: <a href={telefonFestnetz.href} className="text-[#1f4a73] hover:underline">{telefonFestnetz.anzeige}</a><br />
              Alfred Otto mobil: <a href={mobilAlfredOtto.href} className="text-[#1f4a73] hover:underline">{mobilAlfredOtto.anzeige}</a><br />
              Daniel Otto mobil: <a href={mobilDanielOtto.href} className="text-[#1f4a73] hover:underline">{mobilDanielOtto.anzeige}</a><br />
              E-Mail:{" "}
              <a href="mailto:info@firmenberatung-kassel.de" className="text-[#1f4a73] hover:underline">
                info@firmenberatung-kassel.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Registereintrag</h2>
            <p>
              Handelsregister: {handelsregister}
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
              {umsatzsteuerId}
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>
              Alfred Otto<br />
              Walburger Straße 8<br />
              34260 Kaufungen
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Streitschlichtung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
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
