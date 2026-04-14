import type { Metadata } from "next";
import { MaschinenCsvImportClient } from "@/components/admin/MaschinenCsvImportClient";

export const metadata: Metadata = {
  title: "CSV-Import Maschinen",
  description: "Mehrere Maschinen per CSV importieren inkl. Bilder über URLs.",
};

export default function MaschinenCsvImportPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">CSV-Import</h1>
        <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Mehrere Maschinen auf einmal anlegen. Bilder über Spalten{" "}
          <span className="font-mono text-xs bg-gray-100 px-1 rounded">bild_url_1</span>,{" "}
          <span className="font-mono text-xs bg-gray-100 px-1 rounded">bild_url_2</span>, … – der Server lädt sie in Ihr
          Speicher-Bucket.
        </p>
      </div>
      <MaschinenCsvImportClient />
    </div>
  );
}
