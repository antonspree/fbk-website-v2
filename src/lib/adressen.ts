/** Zentrale Adressdaten – bei Änderungen nur hier anpassen. */

export const firmenadresseZeilen = [
  "Firmenberatung Kassel Inh. Alfred Otto e.K.",
  "Walburger Straße 8",
  "34260 Kaufungen",
] as const;

export interface Lagerstandort {
  id: number;
  bezeichnung: string;
  partner: string;
  strasse: string;
  plz: string;
  ort: string;
}

export const lagerstandorte: readonly Lagerstandort[] = [
  {
    id: 1,
    bezeichnung: "Lager 1",
    partner: "Fa. Richter",
    strasse: "Hopfelderstr. 42",
    plz: "37235",
    ort: "Hess. Lichtenau",
  },
  {
    id: 2,
    bezeichnung: "Lager 2",
    partner: "Fa. Tomic",
    strasse: "Ysenburgstraße 18",
    plz: "34266",
    ort: "Niestetal",
  },
] as const;

export function lagerMapEmbedUrl(s: Lagerstandort): string {
  const q = `${s.strasse}, ${s.plz} ${s.ort}, Deutschland`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

export function lagerAlsString(s: Lagerstandort): string {
  return `${s.bezeichnung} (bei ${s.partner}) · ${s.strasse} · ${s.plz} ${s.ort}`;
}

export interface Telefonnummer {
  /** Anzeige-Format, z. B. "+49 (0) 5605 – 70686" */
  anzeige: string;
  /** Kurzform für knappe Stellen (Header) */
  kurz: string;
  /** Wert für href, z. B. "tel:+49560570686" */
  href: string;
}

export const telefonFestnetz: Telefonnummer = {
  anzeige: "+49 (0) 5605 – 70686",
  kurz: "05605 – 70686",
  href: "tel:+49560570686",
};

export const mobilAlfredOtto: Telefonnummer = {
  anzeige: "+49 (0) 151 – 21253264",
  kurz: "0151 – 21253264",
  href: "tel:+4915121253264",
};

export const mobilDanielOtto: Telefonnummer = {
  anzeige: "+49 (0) 173 – 1724445",
  kurz: "0173 – 1724445",
  href: "tel:+491731724445",
};

export const handelsregister = "Amtsgericht Kassel, HRA 17755";
export const umsatzsteuerId = "DE 194391001";
