import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { MaschineFormClient } from "@/components/admin/MaschineFormClient";
import { createClient } from "@/lib/supabase/server";
import type { Kategorie, MaschineWithKategorie } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getMaschine(id: string): Promise<MaschineWithKategorie | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("maschinen")
    .select("*, kategorien(*), maschinen_bilder(*)")
    .eq("id", id)
    .single();
  return (data as unknown as MaschineWithKategorie) ?? null;
}

async function getKategorien(): Promise<Kategorie[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("kategorien").select("*").order("name");
  return data ?? [];
}

export default async function BearbeiteMaschineAdminPage({ params }: Props) {
  const { id } = await params;
  const [maschine, kategorien] = await Promise.all([getMaschine(id), getKategorien()]);

  if (!maschine) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Link href="/admin/maschinen" className="hover:text-gray-600">Maschinen</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-xs">{maschine.titel}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Maschine bearbeiten</h1>
      </div>

      <MaschineFormClient maschine={maschine} kategorien={kategorien} />
    </div>
  );
}
