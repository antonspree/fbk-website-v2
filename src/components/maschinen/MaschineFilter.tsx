"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Kategorie } from "@/lib/types";

interface MaschineFilterProps {
  kategorien: Kategorie[];
  hideZustandFilter?: boolean;
}

export function MaschineFilter({ kategorien, hideZustandFilter }: MaschineFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "alle") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("seite");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  function clearAll() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#E8621A]" />
          <span className="font-heading font-bold text-[#0F1F3D] text-sm uppercase tracking-wide">Filter</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Suche */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
          Suche
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Hersteller, Typ, Bezeichnung…"
            defaultValue={searchParams.get("suche") ?? ""}
            className="pl-9 text-sm"
            onChange={(e) => {
              const val = e.target.value;
              if (val.length === 0 || val.length >= 2) {
                updateParam("suche", val || null);
              }
            }}
          />
        </div>
      </div>

      {/* Kategorie */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
          Kategorie
        </label>
        <Select
          value={searchParams.get("kategorie") ?? "alle"}
          onValueChange={(v) => updateParam("kategorie", v)}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Alle Kategorien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle Kategorien</SelectItem>
            {kategorien.map((k) => (
              <SelectItem key={k.id} value={k.slug}>
                {k.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Zustand */}
      {!hideZustandFilter && (
        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
            Zustand
          </label>
          <Select
            value={searchParams.get("zustand") ?? "alle"}
            onValueChange={(v) => updateParam("zustand", v)}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle</SelectItem>
              <SelectItem value="gebraucht">Gebraucht</SelectItem>
              <SelectItem value="neu">Neu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Preis */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
          Preis (€)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Von"
            defaultValue={searchParams.get("preis_min") ?? ""}
            className="text-sm"
            onBlur={(e) => updateParam("preis_min", e.target.value || null)}
          />
          <Input
            type="number"
            placeholder="Bis"
            defaultValue={searchParams.get("preis_max") ?? ""}
            className="text-sm"
            onBlur={(e) => updateParam("preis_max", e.target.value || null)}
          />
        </div>
      </div>

      {/* Baujahr */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
          Baujahr
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Von"
            defaultValue={searchParams.get("baujahr_min") ?? ""}
            className="text-sm"
            onBlur={(e) => updateParam("baujahr_min", e.target.value || null)}
          />
          <Input
            type="number"
            placeholder="Bis"
            defaultValue={searchParams.get("baujahr_max") ?? ""}
            className="text-sm"
            onBlur={(e) => updateParam("baujahr_max", e.target.value || null)}
          />
        </div>
      </div>

      {/* Sortierung */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
          Sortierung
        </label>
        <Select
          value={searchParams.get("sortierung") ?? "newest"}
          onValueChange={(v) => updateParam("sortierung", v)}
        >
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Neueste zuerst</SelectItem>
            <SelectItem value="price_asc">Preis aufsteigend</SelectItem>
            <SelectItem value="price_desc">Preis absteigend</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
