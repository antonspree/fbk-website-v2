import { listKategorien } from "@/lib/db/queries";
import { KategorienAdminClient } from "@/components/admin/KategorienAdminClient";

export default async function AdminKategorienPage() {
  const kategorien = await listKategorien();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#6397cc]">Kategorien</h1>
        <p className="text-gray-500 text-sm mt-1">{kategorien.length} Kategorien</p>
      </div>
      <KategorienAdminClient kategorien={kategorien} />
    </div>
  );
}
