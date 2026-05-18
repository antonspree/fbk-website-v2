"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createKategorie, deleteKategorie, updateKategorie } from "@/app/actions/admin";
import { generateSlug } from "@/lib/utils";
import { KategorieIcon } from "@/components/kategorien/KategorieIcon";
import type { Kategorie } from "@/lib/types";

const ROOT_VALUE = "__root__";

function KategorieIconEditor({
  kategorie,
  onSaved,
}: {
  kategorie: Kategorie;
  onSaved: (k: Kategorie) => void;
}) {
  const [icon, setIcon] = useState(kategorie.icon ?? "");
  const [iconUrl, setIconUrl] = useState(kategorie.icon_url ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const result = await updateKategorie(kategorie.id, {
      icon: icon || null,
      icon_url: iconUrl || null,
    });
    setSaving(false);
    if (result.success) {
      onSaved(result.data);
      toast.success("Icon gespeichert.");
    } else {
      toast.error(result.error);
    }
  }

  const preview: Kategorie = { ...kategorie, icon: icon || null, icon_url: iconUrl || null };

  return (
    <div className="mt-2 border-t border-gray-100 pt-2">
      <div className="flex flex-wrap items-center gap-2">
        <KategorieIcon kategorie={preview} className="!mb-0 w-8 h-8" emojiClassName="text-xl !mb-0" />
        <Input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Emoji"
          className="text-sm h-8 w-20"
          maxLength={8}
        />
        <Input
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          placeholder="Icon-Bild-URL"
          className="text-sm h-8 flex-1 min-w-[140px]"
        />
        <Button type="button" size="sm" variant="outline" disabled={saving} onClick={save} className="h-8 text-xs">
          {saving ? "…" : "Speichern"}
        </Button>
      </div>
    </div>
  );
}

function replaceItem(items: Kategorie[], updated: Kategorie) {
  return items.map((k) => (k.id === updated.id ? updated : k));
}

export function KategorienAdminClient({ kategorien }: { kategorien: Kategorie[] }) {
  const [items, setItems] = useState(
    kategorien.map((k) => ({
      ...k,
      icon: k.icon ?? null,
      icon_url: k.icon_url ?? null,
    }))
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [parentId, setParentId] = useState<string>(ROOT_VALUE);
  const [loading, setLoading] = useState(false);

  function handleNameChange(val: string) {
    setName(val);
    setSlug(generateSlug(val));
  }

  async function handleCreate() {
    if (!name.trim() || !slug.trim()) return;
    setLoading(true);
    const pid = parentId === ROOT_VALUE ? undefined : parentId;
    const result = await createKategorie({
      name: name.trim(),
      slug: slug.trim(),
      parent_id: pid ?? null,
      icon: icon.trim() || null,
      icon_url: iconUrl.trim() || null,
    });
    if (result.success) {
      setItems((prev) => [...prev, result.data]);
      setName("");
      setSlug("");
      setIcon("");
      setIconUrl("");
      setParentId(ROOT_VALUE);
      toast.success(pid ? "Unterkategorie angelegt." : "Kategorie angelegt.");
    } else {
      toast.error(`Fehler: ${result.error}`);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Kategorie wirklich löschen? Unterkategorien werden mit gelöscht.")) return;
    const result = await deleteKategorie(id);
    if (result.success) {
      setItems((prev) => prev.filter((k) => k.id !== id && k.parent_id !== id));
      toast.success("Kategorie gelöscht.");
    } else {
      toast.error(result.error ?? "Fehler beim Löschen.");
    }
  }

  const topLevel = items.filter((k) => !k.parent_id).sort((a, b) => a.name.localeCompare(b.name, "de"));
  const subLevel = (pid: string) =>
    items.filter((k) => k.parent_id === pid).sort((a, b) => a.name.localeCompare(b.name, "de"));

  function renderRow(k: Kategorie, isSub: boolean) {
    return (
      <div key={k.id} className={isSub ? "px-5 py-3 pl-10 bg-gray-50/50" : "px-5 py-3"}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {isSub && <span className="text-gray-400 text-sm">└</span>}
              <p className={`font-medium text-sm ${isSub ? "text-gray-700" : "text-[#6397cc]"}`}>{k.name}</p>
            </div>
            <p className={`text-xs text-gray-400 ${isSub ? "pl-4" : ""}`}>/{k.slug}</p>
            {!isSub && (
              <KategorieIconEditor kategorie={k} onSaved={(updated) => setItems((prev) => replaceItem(prev, updated))} />
            )}
          </div>
          <button
            type="button"
            onClick={() => handleDelete(k.id)}
            className="text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-1"
            aria-label={`${k.name} löschen`}
          >
            <Trash2 className={isSub ? "w-3.5 h-3.5" : "w-4 h-4"} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-heading font-bold text-[#6397cc] text-sm">
          Kategorien (Icons nur bei Hauptkategorien auf der Startseite)
        </div>
        <div className="divide-y divide-gray-100">
          {topLevel.map((k) => (
            <div key={k.id}>
              {renderRow(k, false)}
              {subLevel(k.id).map((sub) => renderRow(sub, true))}
            </div>
          ))}
          {items.length === 0 && (
            <p className="px-5 py-8 text-center text-gray-400 text-sm">Keine Kategorien.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="font-heading font-bold text-[#6397cc]">Neue Kategorie</h2>
        <div>
          <Label>Übergeordnete Kategorie</Label>
          <Select value={parentId} onValueChange={(v) => setParentId(v ?? ROOT_VALUE)}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Typ wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ROOT_VALUE}>— Hauptkategorie (oberste Ebene) —</SelectItem>
              {topLevel.map((k) => (
                <SelectItem key={k.id} value={k.id}>
                  Unterkategorie von: {k.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => handleNameChange(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>Slug (URL)</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 font-mono text-sm" />
        </div>
        {parentId === ROOT_VALUE && (
          <>
            <div>
              <Label>Icon (Emoji)</Label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="mt-1"
                placeholder="z. B. ⚙️"
                maxLength={8}
              />
            </div>
            <div>
              <Label>Icon-Bild-URL (optional)</Label>
              <Input
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                className="mt-1 text-sm"
                placeholder="https://…"
              />
            </div>
          </>
        )}
        <Button
          type="button"
          onClick={handleCreate}
          disabled={loading || !name.trim()}
          className="w-full bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0 font-semibold transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {loading ? "Wird angelegt…" : parentId === ROOT_VALUE ? "Kategorie anlegen" : "Unterkategorie anlegen"}
        </Button>
      </div>
    </div>
  );
}
