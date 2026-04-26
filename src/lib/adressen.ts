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
