import { createClient } from "@/lib/supabase/server";
import { KategorienAdminClient } from "@/components/admin/KategorienAdminClient";
import type { Kategorie } from "@/lib/types";

async function getKategorien(): Promise<Kategorie[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("kategorien")
    .select("*")
    .order("name");
  return data ?? [];
}

export default async function AdminKategorienPage() {
  const kategorien = await getKategorien();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Kategorien</h1>
        <p className="text-gray-500 text-sm mt-1">{kategorien.length} Kategorien</p>
      </div>
      <KategorienAdminClient kategorien={kategorien} />
    </div>
  );
}
