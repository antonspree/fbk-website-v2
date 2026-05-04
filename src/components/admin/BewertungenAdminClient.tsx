"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Trash2, Star } from "lucide-react";
import { freigabeBewertung, deleteBewertung } from "@/app/actions/admin";
import { formatDatum } from "@/lib/utils";
import type { Bewertung } from "@/lib/types";

interface Props {
  bewertungen: Bewertung[];
}

export function BewertungenAdminClient({ bewertungen }: Props) {
  const [items, setItems] = useState(bewertungen);

  async function handleFreigabe(id: string, freigegeben: boolean) {
    await freigabeBewertung(id, freigegeben);
    setItems(prev => prev.map(b => b.id === id ? { ...b, freigegeben } : b));
    toast.success(freigegeben ? "Bewertung freigegeben." : "Freigabe zurückgezogen.");
  }

  async function handleDelete(id: string) {
    if (!confirm("Bewertung wirklich löschen?")) return;
    await deleteBewertung(id);
    setItems(prev => prev.filter(b => b.id !== id));
    toast.success("Bewertung gelöscht.");
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-400">
          Keine Bewertungen vorhanden.
        </div>
      )}
      {items.map(b => (
        <div
          key={b.id}
          className={`bg-white rounded-lg border p-5 flex flex-col sm:flex-row sm:items-start gap-4 ${!b.freigegeben ? "border-yellow-200 bg-yellow-50/30" : "border-gray-200"}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= b.bewertung ? "fill-[#1f4a73] text-[#1f4a73]" : "fill-gray-200 text-gray-200"}`} />
                ))}
              </div>
              <span className="font-semibold text-[#6397cc] text-sm">{b.name}</span>
              <span className="text-xs text-gray-400">{formatDatum(b.created_at)}</span>
              {!b.freigegeben && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                  Ausstehend
                </span>
              )}
              {b.freigegeben && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Freigegeben
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              &ldquo;{b.text}&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!b.freigegeben ? (
              <button
                onClick={() => handleFreigabe(b.id, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Freigeben
              </button>
            ) : (
              <button
                onClick={() => handleFreigabe(b.id, false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Zurückziehen
              </button>
            )}
            <button
              onClick={() => handleDelete(b.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
