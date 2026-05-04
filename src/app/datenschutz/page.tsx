import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Firmenberatung Kassel Inh. Alfred Otto e.K. gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#6397cc] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Datenschutz</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white">Datenschutzerklärung</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-7 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Firmenberatung Kassel Inh. Alfred Otto e.K.<br />
              Walburger Straße 8, 34260 Kaufungen<br />
              Telefon: +49 (0) 5605 – 70686<br />
              E-Mail: info@firmenberatung-kassel.de
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung
              unserer Dienstleistungen erforderlich ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).
            </p>
            <p className="mt-3">
              Beim Besuch unserer Website werden automatisch folgende Daten in Server-Log-Dateien
              gespeichert: IP-Adresse, Datum und Uhrzeit, aufgerufene URL, Referrer-URL sowie
              verwendeter Browser. Diese Daten werden ausschließlich zur Sicherstellung des
              Betriebs der Website verwendet und nicht mit anderen Daten zusammengeführt.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">3. Kontaktformular</h2>
            <p>
              Wenn Sie uns über das Kontaktformular oder per E-Mail Anfragen zukommen lassen, werden
              Ihre Angaben (Name, E-Mail-Adresse, ggf. Telefon und Nachricht) zur Bearbeitung Ihrer
              Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Daten geben wir
              nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">4. Cookies</h2>
            <p>
              Unsere Website verwendet ausschließlich technisch notwendige Cookies. Dies sind Cookies,
              die für den Betrieb der Website unbedingt erforderlich sind (z. B. für die Sitzungsverwaltung
              im Admin-Bereich). Wir setzen keine Tracking- oder Marketing-Cookies ohne Ihre ausdrückliche
              Einwilligung ein.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">5. Google Maps</h2>
            <p>
              Auf dieser Website nutzen wir Google Maps (Google LLC, 1600 Amphitheatre Parkway,
              Mountain View, CA 94043, USA). Durch die Nutzung von Google Maps können Daten
              (insbesondere Ihre IP-Adresse) an Google übertragen werden. Wir haben auf diese
              Datenübertragung keinen Einfluss. Weitere Informationen finden Sie in der{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1f4a73] hover:underline"
              >
                Datenschutzerklärung von Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">6. Ihre Rechte</h2>
            <p>Sie haben das Recht auf:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
              <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
              <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:info@firmenberatung-kassel.de" className="text-[#1f4a73] hover:underline">
                info@firmenberatung-kassel.de
              </a>
            </p>
            <p className="mt-3">
              Sie haben zudem das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu
              beschweren. In Hessen ist dies der Hessische Beauftragte für Datenschutz und
              Informationsfreiheit.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-[#6397cc] text-lg mb-2">
              7. Speicherdauer
            </h2>
            <p>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung
              der genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies
              verlangen. Kontaktanfragen werden nach Bearbeitung und Ablauf gesetzlicher
              Aufbewahrungsfristen gelöscht.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
