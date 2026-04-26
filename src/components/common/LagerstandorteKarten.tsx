import { lagerMapEmbedUrl, lagerstandorte } from "@/lib/adressen";

export function LagerstandorteKarten() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lagerstandorte.map((l) => (
        <div key={l.id} className="space-y-3">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-heading font-bold text-lg text-[#0F1F3D]">{l.bezeichnung}</h3>
            <p className="text-sm text-gray-600">bei {l.partner}</p>
            <address className="not-italic text-sm text-gray-800 mt-3 leading-relaxed">
              {l.strasse}
              <br />
              {l.plz} {l.ort}
            </address>
          </div>
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-100 h-[220px] sm:h-[240px]">
            <iframe
              src={lagerMapEmbedUrl(l)}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 220 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Karte ${l.bezeichnung} – ${l.partner}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
