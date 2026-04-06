import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MaschineFormClient } from "@/components/admin/MaschineFormClient";
import { createClient } from "@/lib/supabase/server";
import type { Kategorie } from "@/lib/types";

async function getKategorien(): Promise<Kategorie[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("kategorien").select("*").order("name");
  return data ?? [];
}

export default async function NeueMaschineAdminPage() {
  const kategorien = await getKategorien();

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Link href="/admin/maschinen" className="hover:text-gray-600">Maschinen</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Neue Maschine</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Neue Maschine anlegen</h1>
      </div>

      <MaschineFormClient kategorien={kategorien} />
    </div>
  );
}
