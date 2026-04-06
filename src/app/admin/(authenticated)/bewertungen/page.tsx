import { createClient } from "@/lib/supabase/server";
import { BewertungenAdminClient } from "@/components/admin/BewertungenAdminClient";
import type { Bewertung } from "@/lib/types";

async function getBewertungen(): Promise<Bewertung[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bewertungen")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminBewertungenPage() {
  const bewertungen = await getBewertungen();
  const ausstehend = bewertungen.filter(b => !b.freigegeben).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Bewertungen</h1>
        <p className="text-gray-500 text-sm mt-1">
          {bewertungen.length} Bewertungen insgesamt
          {ausstehend > 0 && <span className="ml-2 text-[#E8621A] font-semibold">· {ausstehend} ausstehend</span>}
        </p>
      </div>
      <BewertungenAdminClient bewertungen={bewertungen} />
    </div>
  );
}
