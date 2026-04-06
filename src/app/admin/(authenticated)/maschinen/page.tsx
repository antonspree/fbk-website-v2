import Link from "next/link";
import { Plus, Pencil, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { formatPreis } from "@/lib/utils";
import type { Maschine } from "@/lib/types";

async function getMaschinen(suche?: string): Promise<Maschine[]> {
  const supabase = await createClient();
  let query = supabase
    .from("maschinen")
    .select("*")
    .order("created_at", { ascending: false });

  if (suche) {
    query = query.or(`titel.ilike.%${suche}%,hersteller.ilike.%${suche}%,typ.ilike.%${suche}%`);
  }

  const { data } = await query;
  return data ?? [];
}

interface Props {
  searchParams: Promise<{ suche?: string }>;
}

export default async function AdminMaschinenPage({ searchParams }: Props) {
  const { suche } = await searchParams;
  const maschinen = await getMaschinen(suche);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Maschinen</h1>
          <p className="text-gray-500 text-sm mt-1">{maschinen.length} Maschinen insgesamt</p>
        </div>
        <Button asChild className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
          <Link href="/admin/maschinen/neu">
            <Plus className="w-4 h-4 mr-2" />
            Neue Maschine
          </Link>
        </Button>
      </div>

      {/* Suche */}
      <form className="mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            name="suche"
            defaultValue={suche ?? ""}
            placeholder="Suche nach Titel, Hersteller, Typ…"
            className="pl-9"
          />
        </div>
      </form>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Maschine</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Zustand</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Preis</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {maschinen.length > 0 ? (
              maschinen.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#0F1F3D]">{m.titel}</p>
                    <p className="text-gray-500 text-xs">{m.hersteller} · {m.typ}{m.baujahr ? ` · Bj. ${m.baujahr}` : ""}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {m.zustand && (
                      <Badge className={m.zustand === "neu" ? "bg-green-100 text-green-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>
                        {m.zustand === "neu" ? "Neu" : "Gebraucht"}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell font-medium text-[#E8621A]">
                    {formatPreis(m.preis, m.preis_auf_anfrage)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${m.aktiv ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-xs text-gray-600">{m.aktiv ? "Aktiv" : "Inaktiv"}</span>
                      {m.featured && <Badge className="bg-[#E8621A]/10 text-[#E8621A] border-0 text-xs ml-1">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/maschinen/${m.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-[#0F1F3D] transition-colors"
                        title="Ansehen"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/maschinen/${m.id}`}
                        className="text-gray-400 hover:text-[#E8621A] transition-colors"
                        title="Bearbeiten"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  Keine Maschinen gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
