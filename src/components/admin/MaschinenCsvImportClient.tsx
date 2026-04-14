"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseCsv } from "@/lib/csvParse";
import { csvRowToImport } from "@/lib/maschinenImportCsv";
import { bulkImportMaschinen } from "@/app/actions/maschinen-import";
import type { CsvMaschinenZeile } from "@/lib/maschinenImportCsv";

export function MaschinenCsvImportClient() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [vorschau, setVorschau] = useState<{
    gueltig: CsvMaschinenZeile[];
    zeilenFehler: { zeile: number; message: string }[];
  } | null>(null);

  function analyse() {
    const { rows } = parseCsv(text);
    if (rows.length === 0) {
      toast.error("Keine Datenzeilen gefunden. Erste Zeile = Spaltennamen.");
      setVorschau(null);
      return;
    }

    const gueltig: CsvMaschinenZeile[] = [];
    const zeilenFehler: { zeile: number; message: string }[] = [];

    rows.forEach((row, idx) => {
      const zeile = idx + 2;
      const r = csvRowToImport(row);
      if (!r.ok) zeilenFehler.push({ zeile, message: r.error });
      else gueltig.push(r.data);
    });

    setVorschau({ gueltig, zeilenFehler });
    if (zeilenFehler.length > 0 && gueltig.length === 0) {
      toast.error("Alle Zeilen haben Fehler – bitte CSV prüfen.");
    } else if (zeilenFehler.length > 0) {
      toast.warning(`${gueltig.length} gültige Zeilen, ${zeilenFehler.length} mit Fehlern (werden übersprungen).`);
    } else {
      toast.success(`${gueltig.length} Zeilen bereit zum Import.`);
    }
  }

  async function importieren() {
    if (!vorschau?.gueltig.length) {
      toast.error("Zuerst „Vorschau prüfen“ ausführen.");
      return;
    }
    setLoading(true);
    try {
      const res = await bulkImportMaschinen(vorschau.gueltig);
      if (res.imported > 0) {
        toast.success(`${res.imported} Maschine(n) importiert.`);
      }
      if (res.fehler.length > 0) {
        res.fehler.forEach((e) => toast.error(`Zeile ${e.zeile}: ${e.message}`));
      }
      if (res.bildHinweise.length > 0) {
        toast.warning(
          `${res.bildHinweise.length} Bild(er) konnten nicht geladen werden (Maschinen sind trotzdem angelegt).`,
          { duration: 8000 }
        );
      }
      if (res.imported > 0) {
        setText("");
        setVorschau(null);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(typeof reader.result === "string" ? reader.result : "");
      setVorschau(null);
    };
    reader.readAsText(f, "UTF-8");
    e.target.value = "";
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-heading font-bold text-[#0F1F3D] text-lg">So funktionieren die Bilder</h2>
        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5 leading-relaxed">
          <li>
            Pro Maschine Spalten <code className="text-xs bg-gray-100 px-1 rounded">bild_url_1</code>,{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">bild_url_2</code>, … mit öffentlichen{" "}
            <strong>https://</strong>-Links (z. B. Unsplash, Ihr Webspace, geteilte Cloud-Links mit direktem Download).
          </li>
          <li>
            Beim Import lädt der Server die Dateien herunter und legt sie in Ihrem Supabase-Bucket ab – wie beim manuellen
            Hochladen. Reihenfolge: <code className="text-xs bg-gray-100 px-1 rounded">bild_url_1</code> = Titelbild.
          </li>
          <li>Max. ca. 12 MB pro Bild. Unterstützt: JPEG, PNG, WebP (je nach Quelle).</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" accept=".csv,.txt" className="hidden" onChange={onFile} />
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F1F3D] text-white text-sm font-semibold rounded-lg hover:bg-[#E8621A] transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
              CSV-Datei wählen
            </span>
          </label>
          <a
            href="/templates/maschinen-import-vorlage.csv"
            download
            className="text-sm text-[#E8621A] font-medium hover:underline"
          >
            Vorlage herunterladen
          </a>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">CSV-Inhalt (oder Datei oben laden)</label>
          <Textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setVorschau(null);
            }}
            placeholder={`titel,hersteller,typ,zustand,preis_auf_anfrage,bild_url_1\nMeine Maschine,DMG,Mori,gebraucht,ja,https://…`}
            rows={12}
            className="mt-2 font-mono text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={analyse} disabled={!text.trim()}>
            Vorschau prüfen
          </Button>
          <Button
            type="button"
            onClick={importieren}
            disabled={loading || !vorschau?.gueltig.length}
            className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold"
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Import läuft…" : "Import starten"}
          </Button>
        </div>
      </div>

      {vorschau && (
        <div className="space-y-4">
          {vorschau.gueltig.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm">{vorschau.gueltig.length} Zeilen importierbar</p>
                <p className="text-green-700 text-xs mt-1">
                  Gesamt {vorschau.gueltig.reduce((n, z) => n + z.bild_urls.length, 0)} Bild-URL(s) in den gültigen Zeilen.
                </p>
              </div>
            </div>
          )}

          {vorschau.zeilenFehler.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">{vorschau.zeilenFehler.length} Zeile(n) mit Fehlern</p>
                  <ul className="text-xs text-amber-800 mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {vorschau.zeilenFehler.map((e) => (
                      <li key={e.zeile}>
                        Zeile {e.zeile}: {e.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Spalten: <strong>titel, hersteller, typ</strong> (Pflicht), optional{" "}
        <strong>zustand, baujahr, preis, preis_auf_anfrage, kategorie_slug, beschreibung, featured, aktiv, specs_json</strong>,{" "}
        sowie <strong>bild_url_1 … bild_url_10</strong>.
      </p>

      <Link href="/admin/maschinen" className="inline-block text-sm text-[#E8621A] font-medium hover:underline">
        ← Zurück zur Maschinenliste
      </Link>
    </div>
  );
}
