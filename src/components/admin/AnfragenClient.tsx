"use client";

import { useState } from "react";
import { Mail, Phone, CheckCircle2, Circle, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";
import { markAnfrageGelesen, deleteAnfrage } from "@/app/actions/admin";
import { formatDatum } from "@/lib/utils";
import type { Anfrage } from "@/lib/types";

interface Props {
  anfragen: Anfrage[];
}

export function AnfragenClient({ anfragen }: Props) {
  const [items, setItems] = useState(anfragen);
  const [selected, setSelected] = useState<Anfrage | null>(null);

  async function handleGelesen(id: string, gelesen: boolean) {
    await markAnfrageGelesen(id, gelesen);
    setItems(prev => prev.map(a => a.id === id ? { ...a, gelesen } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, gelesen } : null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Anfrage wirklich löschen?")) return;
    await deleteAnfrage(id);
    setItems(prev => prev.filter(a => a.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Anfrage gelöscht.");
  }

  const typLabels: Record<string, string> = {
    kauf: "Kaufanfrage",
    verkauf: "Verkaufsanfrage",
    allgemein: "Allgemein",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Liste */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
          {items.length === 0 && (
            <p className="p-8 text-center text-gray-400 text-sm">Keine Anfragen vorhanden.</p>
          )}
          {items.map(a => (
            <div
              key={a.id}
              onClick={() => { setSelected(a); if (!a.gelesen) handleGelesen(a.id, true); }}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === a.id ? "bg-blue-50/50 border-l-2 border-[#E8621A]" : ""} ${!a.gelesen ? "bg-orange-50/30" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {!a.gelesen && <span className="w-2 h-2 rounded-full bg-[#E8621A] flex-shrink-0" />}
                    <p className="font-medium text-[#0F1F3D] text-sm truncate">{a.name}</p>
                    {a.typ && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                        {typLabels[a.typ] ?? a.typ}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{a.betreff ?? a.email}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{formatDatum(a.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-heading font-bold text-[#0F1F3D] text-lg">{selected.name}</h2>
              <p className="text-gray-500 text-xs">{formatDatum(selected.created_at)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleGelesen(selected.id, !selected.gelesen)}
                className={`p-1.5 rounded transition-colors ${selected.gelesen ? "text-green-500 hover:text-gray-400" : "text-gray-400 hover:text-green-500"}`}
                title={selected.gelesen ? "Als ungelesen markieren" : "Als gelesen markieren"}
              >
                {selected.gelesen ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
                className="p-1.5 rounded text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-[#E8621A]" />
              <a href={`mailto:${selected.email}`} className="text-[#E8621A] hover:underline">{selected.email}</a>
            </div>
            {selected.telefon && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#E8621A]" />
                <a href={`tel:${selected.telefon}`} className="text-[#E8621A] hover:underline">{selected.telefon}</a>
              </div>
            )}
            {selected.typ && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{typLabels[selected.typ] ?? selected.typ}</span>
              </div>
            )}
          </div>

          {selected.betreff && (
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400 mb-1">Betreff</p>
              <p className="font-medium text-[#0F1F3D] text-sm">{selected.betreff}</p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400 mb-2">Nachricht</p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selected.nachricht}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.betreff ?? "Ihre Anfrage"}`}
              className="flex-1 text-center py-2 bg-[#0F1F3D] text-white text-sm font-semibold rounded-lg hover:bg-[#E8621A] transition-colors"
            >
              Antworten
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm min-h-64">
          Anfrage auswählen
        </div>
      )}
    </div>
  );
}
