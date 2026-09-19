import { listBewertungen } from "@/lib/db/queries";
import { BewertungenAdminClient } from "@/components/admin/BewertungenAdminClient";

export default async function AdminBewertungenPage() {
  const bewertungen = await listBewertungen();
  const ausstehend = bewertungen.filter(b => !b.freigegeben).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#6397cc]">Bewertungen</h1>
        <p className="text-gray-500 text-sm mt-1">
          {bewertungen.length} Bewertungen insgesamt
          {ausstehend > 0 && <span className="ml-2 text-[#1f4a73] font-semibold">· {ausstehend} ausstehend</span>}
        </p>
      </div>
      <BewertungenAdminClient bewertungen={bewertungen} />
    </div>
  );
}
