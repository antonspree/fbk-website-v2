import Link from "next/link";
import { MessageSquare, Wrench, Star, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDatum } from "@/lib/utils";
import type { Anfrage, Maschine } from "@/lib/types";

async function getDashboardStats() {
  const supabase = await createClient();
  const [
    { count: maschinen },
    { count: anfragen },
    { count: bewertungen },
    { data: letzteAnfragen },
    { data: letzteMaschinen },
  ] = await Promise.all([
    supabase.from("maschinen").select("*", { count: "exact", head: true }).eq("aktiv", true),
    supabase.from("anfragen").select("*", { count: "exact", head: true }).eq("gelesen", false),
    supabase.from("bewertungen").select("*", { count: "exact", head: true }).eq("freigegeben", false),
    supabase.from("anfragen").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("maschinen").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  return {
    maschinen: maschinen ?? 0,
    anfragen: anfragen ?? 0,
    bewertungen: bewertungen ?? 0,
    letzteAnfragen: (letzteAnfragen as Anfrage[]) ?? [],
    letzteMaschinen: (letzteMaschinen as Maschine[]) ?? [],
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const karten = [
    {
      label: "Aktive Maschinen",
      wert: stats.maschinen,
      icon: Wrench,
      href: "/admin/maschinen",
      farbe: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      label: "Offene Anfragen",
      wert: stats.anfragen,
      icon: MessageSquare,
      href: "/admin/anfragen",
      farbe: stats.anfragen > 0 ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200",
    },
    {
      label: "Ausstehende Bewertungen",
      wert: stats.bewertungen,
      icon: Star,
      href: "/admin/bewertungen",
      farbe: stats.bewertungen > 0 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Übersicht – Firmenberatung Kassel</p>
      </div>

      {/* Statistik-Karten */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {karten.map((k) => {
          const Icon = k.icon;
          return (
            <Link key={k.href} href={k.href} className={`rounded-lg border p-5 ${k.farbe} hover:opacity-80 transition-opacity`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{k.label}</span>
                <Icon className="w-5 h-5 opacity-60" />
              </div>
              <span className="font-heading text-4xl font-bold">{k.wert}</span>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Letzte Anfragen */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-[#0F1F3D]">Letzte Anfragen</h2>
            <Link href="/admin/anfragen" className="text-[#E8621A] text-xs hover:underline">Alle ansehen</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.letzteAnfragen.length > 0 ? (
              stats.letzteAnfragen.map((a) => (
                <div key={a.id} className={`px-5 py-3 flex items-start justify-between ${!a.gelesen ? "bg-orange-50/50" : ""}`}>
                  <div>
                    <p className="font-medium text-sm text-[#0F1F3D]">{a.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{a.betreff ?? "Allgemeine Anfrage"}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!a.gelesen && <span className="w-2 h-2 rounded-full bg-[#E8621A]" />}
                    <span className="text-xs text-gray-400">{formatDatum(a.created_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">Keine Anfragen vorhanden.</p>
            )}
          </div>
        </div>

        {/* Letzte Maschinen */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-[#0F1F3D]">Zuletzt hinzugefügt</h2>
            <Link href="/admin/maschinen" className="text-[#E8621A] text-xs hover:underline">Alle ansehen</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.letzteMaschinen.length > 0 ? (
              stats.letzteMaschinen.map((m) => (
                <div key={m.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-[#0F1F3D] truncate max-w-xs">{m.titel}</p>
                    <p className="text-xs text-gray-500">{m.hersteller} · {m.typ}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/admin/maschinen/${m.id}`}
                      className="text-gray-400 hover:text-[#E8621A] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <span className="text-xs text-gray-400">{formatDatum(m.created_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">Keine Maschinen vorhanden.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
