import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { firmenadresseZeilen, lagerstandorte } from "@/lib/adressen";
import { SiteLogo } from "@/components/layout/SiteLogo";

const footerLinks = {
  maschinen: [
    { label: "Gebrauchte Maschinen", href: "/maschinen" },
    { label: "Neue Maschinen", href: "/maschinen-neu" },
    { label: "Aktuelle Angebote", href: "/angebote" },
    { label: "Maschine verkaufen", href: "/maschinen-verkaufen" },
  ],
  unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Service", href: "/service" },
    { label: "Blog & Ratgeber", href: "/blog" },
    { label: "Kundenbewertungen", href: "/bewertungen" },
    { label: "Anfahrt", href: "/anfahrt" },
  ],
  rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
    { label: "Kontakt", href: "/kontakt" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#6397cc] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Firmendaten */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <SiteLogo variant="footer" priority={false} />
            </Link>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Ihr zuverlässiger Partner für neue und gebrauchte Werkzeugmaschinen –
              seit über 20 Jahren.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1f4a73] flex-shrink-0 mt-0.5" />
                <div className="not-italic text-white/70 text-sm leading-relaxed">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5">Firmenadresse</p>
                  <address className="not-italic">
                    {firmenadresseZeilen.map((z, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {z}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-3 pl-0">
                <MapPin className="w-4 h-4 text-[#1f4a73] flex-shrink-0 mt-0.5" />
                <div className="not-italic text-white/70 text-sm leading-relaxed">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-2">Lager</p>
                  <ul className="space-y-3">
                    {lagerstandorte.map((l) => (
                      <li key={l.id}>
                        <span className="text-white/90 font-medium">{l.bezeichnung}</span>
                        <span className="text-white/50"> (bei {l.partner})</span>
                        <br />
                        {l.strasse}
                        <br />
                        {l.plz} {l.ort}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href="tel:+4956057068"
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#1f4a73] flex-shrink-0" />
                <span>+49 (0) 5605 – 70686</span>
              </a>
              <a
                href="mailto:info@firmenberatung-kassel.de"
                className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#1f4a73] flex-shrink-0" />
                <span>info@firmenberatung-kassel.de</span>
              </a>
            </div>
          </div>

          {/* Maschinen */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              Maschinen
            </h3>
            <ul className="space-y-2">
              {footerLinks.maschinen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              Unternehmen
            </h3>
            <ul className="space-y-2">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © {currentYear} Firmenberatung Kassel Inh. Alfred Otto e.K. Alle Rechte vorbehalten.
          </p>
          <p className="text-white/40 text-xs">
            Werkzeugmaschinenhandel seit über 20 Jahren
          </p>
        </div>
      </div>
    </footer>
  );
}
