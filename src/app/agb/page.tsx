import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description: "AGB der Firmenberatung Kassel e.K. für den Handel mit Werkzeugmaschinen.",
};

const paragraphen = [
  {
    nr: "§ 1",
    titel: "Geltungsbereich",
    text: [
      "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Kaufverträge, die zwischen der Firmenberatung Kassel Inh. Alfred Otto e.K. (nachfolgend Verkäufer) und dem Käufer (nachfolgend Käufer) über neue und gebrauchte Werkzeugmaschinen und sonstige Industriegüter geschlossen werden.",
      "Abweichende, entgegenstehende oder ergänzende AGB des Käufers werden nicht Vertragsbestandteil, es sei denn, der Verkäufer hat ihrer Geltung ausdrücklich schriftlich zugestimmt.",
    ],
  },
  {
    nr: "§ 2",
    titel: "Vertragsschluss",
    text: [
      "Angebote des Verkäufers sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung des Verkäufers oder durch Lieferung der Ware zustande.",
      "Der Käufer ist an seinen Auftrag für die Dauer von 14 Tagen gebunden.",
    ],
  },
  {
    nr: "§ 3",
    titel: "Preise und Zahlung",
    text: [
      "Alle Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht ausdrücklich anders angegeben. Transportkosten werden separat berechnet.",
      "Rechnungen sind sofort nach Erhalt ohne Abzug fällig, sofern keine abweichende Zahlungsvereinbarung getroffen wurde. Bei Zahlungsverzug sind Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz fällig.",
    ],
  },
  {
    nr: "§ 4",
    titel: "Lieferung und Transport",
    text: [
      "Liefertermine sind, sofern nicht ausdrücklich als verbindlich vereinbart, unverbindliche Richtwerte. Teillieferungen sind zulässig.",
      "Die Gefahr geht auf den Käufer über, sobald die Ware an das Transportunternehmen übergeben wird oder der Käufer in Annahmeverzug gerät. Transport und Versicherung erfolgen, sofern nicht anders vereinbart, auf Kosten des Käufers.",
    ],
  },
  {
    nr: "§ 5",
    titel: "Gewährleistung",
    text: [
      "Bei neuen Maschinen gilt die gesetzliche Gewährleistungsfrist von 24 Monaten ab Gefahrübergang.",
      "Bei gebrauchten Maschinen wird die Gewährleistung auf 12 Monate verkürzt, soweit dies gegenüber Unternehmern rechtlich zulässig ist. Im Verkehr mit Verbrauchern gelten die gesetzlichen Gewährleistungsrechte.",
      "Offensichtliche Mängel müssen innerhalb von 7 Werktagen nach Erhalt der Ware schriftlich angezeigt werden. Versteckte Mängel sind unverzüglich nach Entdeckung zu melden.",
      "Der Verkäufer ist zur Nacherfüllung (Nachbesserung oder Ersatzlieferung) berechtigt. Schlägt die Nacherfüllung zweimal fehl, kann der Käufer nach seiner Wahl Minderung oder Rücktritt verlangen.",
    ],
  },
  {
    nr: "§ 6",
    titel: "Haftung",
    text: [
      "Der Verkäufer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei der Verletzung von Leben, Körper und Gesundheit.",
      "Bei leichter Fahrlässigkeit haftet der Verkäufer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesem Fall auf den vorhersehbaren, vertragstypischen Schaden begrenzt.",
      "Eine weitergehende Haftung ist ausgeschlossen.",
    ],
  },
  {
    nr: "§ 7",
    titel: "Eigentumsvorbehalt",
    text: [
      "Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises Eigentum des Verkäufers. Bei Zahlungsverzug ist der Verkäufer berechtigt, die Ware zurückzufordern.",
      "Der Käufer ist verpflichtet, die Vorbehaltsware pfleglich zu behandeln und auf Verlangen des Verkäufers alle erforderlichen Maßnahmen zum Schutz des Eigentums des Verkäufers zu ergreifen.",
    ],
  },
  {
    nr: "§ 8",
    titel: "Gerichtsstand und anwendbares Recht",
    text: [
      "Für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag gilt deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG).",
      "Gerichtsstand für alle Streitigkeiten mit Kaufleuten, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen ist Kassel.",
    ],
  },
];

export default function AGBPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">AGB</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Firmenberatung Kassel Inh. Alfred Otto e.K.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-8 text-sm text-gray-700 leading-relaxed">
          {paragraphen.map((p) => (
            <section key={p.nr}>
              <h2 className="font-heading font-bold text-[#0F1F3D] text-lg mb-3">
                {p.nr} {p.titel}
              </h2>
              {p.text.map((absatz, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>{absatz}</p>
              ))}
            </section>
          ))}

          <p className="text-gray-400 text-xs pt-4 border-t border-gray-100">
            Stand: {new Date().getFullYear()} – Firmenberatung Kassel e.K.
          </p>
        </div>
      </div>
    </div>
  );
}
