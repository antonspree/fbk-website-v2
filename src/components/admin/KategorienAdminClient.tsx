"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createKategorie, deleteKategorie } from "@/app/actions/admin";
import { generateSlug } from "@/lib/utils";
import type { Kategorie } from "@/lib/types";

export function KategorienAdminClient({ kategorien }: { kategorien: Kategorie[] }) {
  const [items, setItems] = useState(kategorien);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  function handleNameChange(val: string) {
    setName(val);
    setSlug(generateSlug(val));
  }

  async function handleCreate() {
    if (!name.trim() || !slug.trim()) return;
    setLoading(true);
    const result = await createKategorie({ name: name.trim(), slug: slug.trim() });
    if (result.success) {
      setItems(prev => [...prev, {
        id: Date.now().toString(),
        name: name.trim(),
        slug: slug.trim(),
        beschreibung: null,
        parent_id: null,
        created_at: new Date().toISOString(),
      }]);
      setName("");
      setSlug("");
      toast.success("Kategorie angelegt.");
    } else {
      toast.error(`Fehler: ${result.error}`);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Kategorie wirklich löschen?")) return;
    const result = await deleteKategorie(id);
    if (result.success) {
      setItems(prev => prev.filter(k => k.id !== id));
      toast.success("Kategorie gelöscht.");
    } else {
      toast.error("Fehler beim Löschen.");
    }
  }

  const topLevel = items.filter(k => !k.parent_id);
  const subLevel = (parentId: string) => items.filter(k => k.parent_id === parentId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Liste */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-heading font-bold text-[#6397cc] text-sm">
          Kategorien
        </div>
        <div className="divide-y divide-gray-100">
          {topLevel.map(k => (
            <div key={k.id}>
              <div className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#6397cc] text-sm">{k.name}</p>
                  <p className="text-xs text-gray-400">/{k.slug}</p>
                </div>
                <button
                  onClick={() => handleDelete(k.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {subLevel(k.id).map(sub => (
                <div key={sub.id} className="px-5 py-2 pl-10 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <p className="text-sm text-gray-700">{sub.name}</p>
                    <p className="text-xs text-gray-400">/{sub.slug}</p>
                  </div>
                  <button onClick={() => handleDelete(sub.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ))}
          {items.length === 0 && (
            <p className="px-5 py-8 text-center text-gray-400 text-sm">Keine Kategorien.</p>
          )}
        </div>
      </div>

      {/* Neu anlegen */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-heading font-bold text-[#6397cc]">Neue Kategorie</h2>
        <div>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            className="mt-1"
            placeholder="z. B. Drehmaschinen"
          />
        </div>
        <div>
          <Label>Slug (URL)</Label>
          <Input
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="mt-1 font-mono text-sm"
            placeholder="drehmaschinen"
          />
        </div>
        <Button
          onClick={handleCreate}
          disabled={loading || !name.trim()}
          className="w-full bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0 font-semibold transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {loading ? "Wird angelegt…" : "Kategorie anlegen"}
        </Button>
      </div>
    </div>
  );
}
