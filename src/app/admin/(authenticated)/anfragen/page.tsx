import { listAnfragen } from "@/lib/db/queries";
import { AnfragenClient } from "@/components/admin/AnfragenClient";

export default async function AdminAnfragenPage() {
  const anfragen = await listAnfragen();
  const ungelesen = anfragen.filter(a => !a.gelesen).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#6397cc]">Anfragen</h1>
        <p className="text-gray-500 text-sm mt-1">
          {anfragen.length} Anfragen insgesamt
          {ungelesen > 0 && <span className="ml-2 text-[#1f4a73] font-semibold">· {ungelesen} ungelesen</span>}
        </p>
      </div>
      <AnfragenClient anfragen={anfragen} />
    </div>
  );
}
