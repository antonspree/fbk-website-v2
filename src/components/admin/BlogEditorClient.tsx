"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { saveBlogPost, deleteBlogPost } from "@/app/actions/admin";
import { generateSlug } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface FormData {
  titel: string;
  slug: string;
  teaser: string;
  kategorie: string;
  seo_title: string;
  seo_description: string;
}

interface BlogEditorClientProps {
  post?: BlogPost;
}

export function BlogEditorClient({ post }: BlogEditorClientProps) {
  const router = useRouter();
  const isEdit = !!post;
  const [inhalt, setInhalt] = useState(post?.inhalt ?? "");
  const [veroeffentlicht, setVeroeffentlicht] = useState(post?.veroeffentlicht ?? false);
  const [loading, setLoading] = useState(false);
  const [slugManual, setSlugManual] = useState(isEdit);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      titel: post?.titel ?? "",
      slug: post?.slug ?? "",
      teaser: post?.teaser ?? "",
      kategorie: post?.kategorie ?? "",
      seo_title: post?.seo_title ?? "",
      seo_description: post?.seo_description ?? "",
    },
  });

  const titel = watch("titel");

  useEffect(() => {
    if (!slugManual && titel) {
      setValue("slug", generateSlug(titel));
    }
  }, [titel, slugManual, setValue]);

  async function onSubmit(data: FormData) {
    if (!inhalt.trim()) {
      toast.error("Inhalt darf nicht leer sein.");
      return;
    }
    setLoading(true);
    const result = await saveBlogPost(post?.id ?? null, {
      titel: data.titel,
      slug: data.slug,
      teaser: data.teaser,
      inhalt,
      kategorie: data.kategorie || undefined,
      seo_title: data.seo_title || undefined,
      seo_description: data.seo_description || undefined,
      veroeffentlicht,
    });

    if (result.success) {
      toast.success(isEdit ? "Artikel gespeichert!" : "Artikel angelegt!");
      if (!isEdit) router.push("/admin/blog");
      else router.refresh();
    } else {
      toast.error(`Fehler: ${result.error}`);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!post || !confirm("Artikel wirklich löschen?")) return;
    const result = await deleteBlogPost(post.id);
    if (result.success) {
      toast.success("Artikel gelöscht.");
      router.push("/admin/blog");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Hauptinhalt */}
      <div className="xl:col-span-2 space-y-5">
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div>
            <Label htmlFor="titel">Titel <span className="text-red-500">*</span></Label>
            <Input id="titel" {...register("titel", { required: true })} className="mt-1 text-base font-semibold" placeholder="Artikeltitel" />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="slug"
                {...register("slug", { required: true })}
                className="font-mono text-sm"
                onChange={e => { setSlugManual(true); setValue("slug", e.target.value); }}
                placeholder="artikel-url"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">/blog/{watch("slug")}</p>
          </div>
          <div>
            <Label htmlFor="teaser">Teaser <span className="text-red-500">*</span></Label>
            <Textarea id="teaser" {...register("teaser", { required: true })} rows={3} className="mt-1" placeholder="Kurze Zusammenfassung…" />
          </div>
        </div>

        {/* Markdown Editor */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Label className="mb-3 block">Inhalt (Markdown) <span className="text-red-500">*</span></Label>
          <div data-color-mode="light">
            <MDEditor
              value={inhalt}
              onChange={(val) => setInhalt(val ?? "")}
              height={500}
              preview="live"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label>Veröffentlicht</Label>
            <Switch checked={veroeffentlicht} onCheckedChange={setVeroeffentlicht} />
          </div>
          <div>
            <Label htmlFor="kategorie">Kategorie</Label>
            <Input id="kategorie" {...register("kategorie")} className="mt-1" placeholder="z. B. Ratgeber" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-heading font-bold text-[#0F1F3D] text-sm">SEO</h3>
          <div>
            <Label htmlFor="seo_title">SEO-Titel</Label>
            <Input id="seo_title" {...register("seo_title")} className="mt-1 text-sm" placeholder="Seitentitel für Suchmaschinen" />
          </div>
          <div>
            <Label htmlFor="seo_description">SEO-Beschreibung</Label>
            <Textarea
              id="seo_description"
              {...register("seo_description")}
              rows={3}
              className="mt-1 text-sm"
              placeholder="Meta-Description (max. 160 Zeichen)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F1F3D] hover:bg-[#E8621A] text-white border-0 font-semibold transition-colors"
          >
            {loading ? "Wird gespeichert…" : isEdit ? "Änderungen speichern" : "Artikel anlegen"}
          </Button>
          {isEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="w-full border-red-300 text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Artikel löschen
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
