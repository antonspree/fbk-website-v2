"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, X, Trash2, ImagePlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createMaschine, updateMaschine, deleteMaschine, saveMaschineBildMetadata, deleteMaschineBild } from "@/app/actions/maschinen";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/imageCompression";
import type { Kategorie, MaschineWithKategorie, MaschineBild } from "@/lib/types";
import { partitionKategorienHierarchie } from "@/lib/kategorienTree";
import Image from "next/image";

interface FormData {
  titel: string;
  hersteller: string;
  typ: string;
  baujahr: string;
  zustand: "neu" | "gebraucht";
  preis: string;
  beschreibung: string;
}

interface MaschineFormClientProps {
  maschine?: MaschineWithKategorie;
  kategorien: Kategorie[];
}

interface SpecEntry {
  key: string;
  value: string;
}

export function MaschineFormClient({ maschine, kategorien }: MaschineFormClientProps) {
  const router = useRouter();
  const isEdit = !!maschine;
  const { roots, childrenByParent } = partitionKategorienHierarchie(kategorien);

  const [kategorieId, setKategorieId] = useState(maschine?.kategorie_id ?? "");
  const [zustand, setZustand] = useState<"neu" | "gebraucht">(maschine?.zustand ?? "gebraucht");
  const [preisAufAnfrage, setPreisAufAnfrage] = useState(maschine?.preis_auf_anfrage ?? false);
  const [featured, setFeatured] = useState(maschine?.featured ?? false);
  const [aktiv, setAktiv] = useState(maschine?.aktiv ?? true);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [bilder, setBilder] = useState<MaschineBild[]>(
    [...(maschine?.maschinen_bilder ?? [])].sort((a, b) => a.position - b.position)
  );
  const [specs, setSpecs] = useState<SpecEntry[]>(
    maschine?.specs
      ? Object.entries(maschine.specs as Record<string, string>).map(([key, value]) => ({ key, value: String(value) }))
      : [{ key: "", value: "" }]
  );

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      titel: maschine?.titel ?? "",
      hersteller: maschine?.hersteller ?? "",
      typ: maschine?.typ ?? "",
      baujahr: maschine?.baujahr?.toString() ?? "",
      zustand: maschine?.zustand ?? "gebraucht",
      preis: maschine?.preis?.toString() ?? "",
      beschreibung: maschine?.beschreibung ?? "",
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    const specsObj = specs.reduce<Record<string, string>>((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {});

    const payload = {
      titel: data.titel,
      hersteller: data.hersteller,
      typ: data.typ,
      baujahr: data.baujahr ? parseInt(data.baujahr) : null,
      zustand,
      preis: preisAufAnfrage ? null : (data.preis ? parseFloat(data.preis) : null),
      preis_auf_anfrage: preisAufAnfrage,
      kategorie_id: kategorieId || null,
      beschreibung: data.beschreibung || null,
      specs: Object.keys(specsObj).length > 0 ? specsObj : null,
      featured,
      aktiv,
    };

    try {
      if (isEdit) {
        const result = await updateMaschine(maschine.id, payload);
        if (result.success) {
          toast.success("Maschine aktualisiert!");
          router.refresh();
        } else {
          toast.error(`Fehler: ${result.error}`);
        }
      } else {
        const result = await createMaschine(payload);
        if (result.success) {
          toast.success("Maschine angelegt!");
          router.push(`/admin/maschinen/${result.id}`);
        } else {
          toast.error(`Fehler: ${result.error}`);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!maschine || !e.target.files?.length) return;
    setUploadingImage(true);

    const supabase = createClient();
    const files = Array.from(e.target.files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setUploadProgress(`Bild ${i + 1}/${files.length}: Komprimiere…`);
        const { file: compressed, originalSizeKB, compressedSizeKB } = await compressImage(file, {
          maxWidth: 1920,
          maxHeight: 1920,
          quality: 0.85,
        });

        setUploadProgress(`Bild ${i + 1}/${files.length}: Lade hoch… (${compressedSizeKB} KB, von ${originalSizeKB} KB)`);
        const filename = `${maschine.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
        const { data: upload, error } = await supabase.storage
          .from("maschinen-bilder")
          .upload(filename, compressed, { contentType: "image/webp" });

        if (error) {
          toast.error(`Upload-Fehler: ${error.message}`);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("maschinen-bilder")
          .getPublicUrl(upload.path);

        const istTitelbild = bilder.length === 0 && i === 0;
        const result = await saveMaschineBildMetadata(maschine.id, publicUrl, istTitelbild, bilder.length + i);

        if (result.success) {
          setBilder(prev => [...prev, {
            id: `${Date.now()}-${i}`,
            maschine_id: maschine.id,
            url: publicUrl,
            position: bilder.length + i,
            ist_titelbild: istTitelbild,
            created_at: new Date().toISOString(),
          }]);
        } else {
          toast.error(`Datenbankfehler: ${result.error}`);
        }
      } catch (err) {
        toast.error(`Fehler bei ${file.name}: ${err instanceof Error ? err.message : "Unbekannter Fehler"}`);
      }
    }

    toast.success(`${files.length} Bild${files.length > 1 ? "er" : ""} erfolgreich hochgeladen.`);
    setUploadingImage(false);
    setUploadProgress("");
    e.target.value = "";
  }

  async function handleSetTitelbild(bildId: string) {
    setBilder(prev => prev.map(b => ({ ...b, ist_titelbild: b.id === bildId })));
    if (maschine) {
      const supabase = createClient();
      await supabase.from("maschinen_bilder").update({ ist_titelbild: false }).eq("maschine_id", maschine.id);
      await supabase.from("maschinen_bilder").update({ ist_titelbild: true }).eq("id", bildId);
    }
    toast.success("Titelbild gesetzt!");
  }

  async function handleDeleteBild(bild: MaschineBild) {
    const result = await deleteMaschineBild(bild.id, bild.url);
    if (result.success) {
      setBilder(prev => prev.filter(b => b.id !== bild.id));
      toast.success("Bild gelöscht.");
    }
  }

  async function handleDeleteMaschine() {
    if (!maschine || !confirm("Maschine wirklich löschen?")) return;
    const result = await deleteMaschine(maschine.id);
    if (result.success) {
      toast.success("Maschine gelöscht.");
      router.push("/admin/maschinen");
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Hauptformular */}
      <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-2 space-y-5">
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="font-heading font-bold text-[#6397cc]">Grunddaten</h2>
          <div>
            <Label htmlFor="titel">Titel <span className="text-red-500">*</span></Label>
            <Input id="titel" {...register("titel", { required: true })} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hersteller">Hersteller <span className="text-red-500">*</span></Label>
              <Input id="hersteller" {...register("hersteller", { required: true })} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="typ">Typ / Modell <span className="text-red-500">*</span></Label>
              <Input id="typ" {...register("typ", { required: true })} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="baujahr">Baujahr</Label>
              <Input id="baujahr" type="number" {...register("baujahr")} className="mt-1" min={1950} max={2030} />
            </div>
            <div>
              <Label>Zustand</Label>
              <Select value={zustand} onValueChange={(v) => setZustand(v as "neu" | "gebraucht")}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gebraucht">Gebraucht</SelectItem>
                  <SelectItem value="neu">Neu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Kategorie</Label>
            <Select
              value={kategorieId || "__none__"}
              onValueChange={(v) => setKategorieId(v === "__none__" || v == null ? "" : v)}
            >
              <SelectTrigger className="mt-1"><SelectValue placeholder="Keine Kategorie" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">Keine Kategorie</SelectItem>
                {roots.map((parent) => {
                  const subs = childrenByParent.get(parent.id) ?? [];
                  return (
                    <SelectGroup key={parent.id}>
                      <SelectLabel>{parent.name}</SelectLabel>
                      <SelectItem value={parent.id}>{subs.length ? `${parent.name} (allgemein)` : parent.name}</SelectItem>
                      {subs.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="font-heading font-bold text-[#6397cc]">Preis</h2>
          <div className="flex items-center gap-3">
            <Switch checked={preisAufAnfrage} onCheckedChange={setPreisAufAnfrage} id="paa" />
            <Label htmlFor="paa" className="cursor-pointer">Preis auf Anfrage</Label>
          </div>
          {!preisAufAnfrage && (
            <div>
              <Label htmlFor="preis">Preis (€ netto)</Label>
              <Input id="preis" type="number" {...register("preis")} className="mt-1" step="0.01" />
            </div>
          )}
        </div>

        {/* Beschreibung */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="font-heading font-bold text-[#6397cc]">Beschreibung</h2>
          <Textarea {...register("beschreibung")} rows={6} placeholder="Ausführliche Beschreibung der Maschine…" />
        </div>

        {/* Specs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-[#6397cc]">Technische Daten</h2>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setSpecs(prev => [...prev, { key: "", value: "" }])}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />Zeile
            </Button>
          </div>
          <div className="space-y-2">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  placeholder="Bezeichnung (z. B. Spitzenweite)"
                  value={spec.key}
                  onChange={e => setSpecs(prev => prev.map((s, i) => i === idx ? { ...s, key: e.target.value } : s))}
                  className="flex-1 text-sm"
                />
                <Input
                  placeholder="Wert (z. B. 1000 mm)"
                  value={spec.value}
                  onChange={e => setSpecs(prev => prev.map((s, i) => i === idx ? { ...s, value: e.target.value } : s))}
                  className="flex-1 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setSpecs(prev => prev.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0 font-semibold transition-colors">
            {loading ? "Wird gespeichert…" : isEdit ? "Änderungen speichern" : "Maschine anlegen"}
          </Button>
          {isEdit && (
            <Button type="button" variant="outline" onClick={handleDeleteMaschine} className="border-red-300 text-red-500 hover:bg-red-50 ml-auto">
              <Trash2 className="w-4 h-4 mr-2" />Löschen
            </Button>
          )}
        </div>
      </form>

      {/* Sidebar: Bilder + Optionen */}
      <div className="space-y-5">
        {/* Optionen */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="font-heading font-bold text-[#6397cc]">Optionen</h2>
          <div className="flex items-center justify-between">
            <Label>Aktiv (sichtbar)</Label>
            <Switch checked={aktiv} onCheckedChange={setAktiv} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Featured (Startseite)</Label>
            <Switch checked={featured} onCheckedChange={setFeatured} />
          </div>
        </div>

        {/* Bilder */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h2 className="font-heading font-bold text-[#6397cc]">Bilder</h2>
          {!isEdit && (
            <p className="text-xs text-gray-400">Bilder können nach dem Anlegen der Maschine hochgeladen werden.</p>
          )}
          {isEdit && (
            <>
              <div className="grid grid-cols-2 gap-2">
                {bilder.map(bild => (
                  <div key={bild.id} className="relative group aspect-square rounded overflow-hidden border border-gray-200">
                    <Image src={bild.url} alt="Maschinenbild" fill className="object-cover" sizes="150px" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleSetTitelbild(bild.id)}
                        className="p-1.5 bg-white rounded-full"
                        title="Als Titelbild setzen"
                      >
                        <Star className={`w-3.5 h-3.5 ${bild.ist_titelbild ? "fill-[#1f4a73] text-[#1f4a73]" : "text-gray-600"}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBild(bild)}
                        className="p-1.5 bg-white rounded-full"
                        title="Bild löschen"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                    {bild.ist_titelbild && (
                      <div className="absolute top-1 left-1 bg-[#1f4a73] text-white text-[10px] px-1 rounded">
                        Titelbild
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-5 transition-colors ${uploadingImage ? "border-[#1f4a73] bg-sky-50/70 cursor-wait" : "border-gray-200 cursor-pointer hover:border-[#1f4a73] hover:bg-sky-50/70"}`}>
                <ImagePlus className={`w-6 h-6 ${uploadingImage ? "text-[#1f4a73] animate-pulse" : "text-gray-400"}`} />
                <span className="text-xs text-gray-500 text-center leading-relaxed">
                  {uploadingImage
                    ? uploadProgress || "Wird verarbeitet…"
                    : <>Bilder hochladen<br /><span className="text-gray-400">JPG, PNG, WebP · wird automatisch komprimiert</span></>
                  }
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
