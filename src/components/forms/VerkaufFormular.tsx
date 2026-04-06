"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { sendeAnfrage } from "@/app/actions/anfragen";

interface FormData {
  name: string;
  email: string;
  telefon: string;
  maschinenbezeichnung: string;
  baujahr: string;
  zustand: string;
  beschreibung: string;
  nachricht: string;
  datenschutz: boolean;
}

export function VerkaufFormular() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [zustand, setZustand] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const datenschutz = watch("datenschutz");

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const nachrichtText = [
        `Maschine: ${data.maschinenbezeichnung}`,
        data.baujahr ? `Baujahr: ${data.baujahr}` : null,
        zustand ? `Zustand: ${zustand}` : null,
        data.beschreibung ? `Beschreibung: ${data.beschreibung}` : null,
        data.nachricht ? `\nZusätzliche Informationen: ${data.nachricht}` : null,
      ].filter(Boolean).join("\n");

      const result = await sendeAnfrage({
        name: data.name,
        email: data.email,
        telefon: data.telefon,
        betreff: `Maschinenankauf: ${data.maschinenbezeichnung}`,
        nachricht: nachrichtText,
        typ: "verkauf",
      });

      if (result.success) {
        setSent(true);
        toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
      } else {
        toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-3xl mb-3">✓</div>
        <p className="font-semibold text-green-800 text-lg mb-2">Anfrage erfolgreich gesendet!</p>
        <p className="text-green-700 text-sm">
          Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen mit einer Einschätzung Ihrer Maschine.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            {...register("name", { required: "Pflichtfeld" })}
            className="mt-1"
            placeholder="Ihr Name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">E-Mail <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Pflichtfeld" })}
            className="mt-1"
            placeholder="ihre@email.de"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="telefon">Telefon</Label>
        <Input id="telefon" type="tel" {...register("telefon")} className="mt-1" placeholder="+49 …" />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-[#0F1F3D] mb-4">Angaben zur Maschine</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="maschinenbezeichnung">
              Maschinenbezeichnung / Hersteller / Typ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maschinenbezeichnung"
              {...register("maschinenbezeichnung", { required: "Pflichtfeld" })}
              className="mt-1"
              placeholder="z. B. Traub TNM 42 CNC-Drehmaschine"
            />
            {errors.maschinenbezeichnung && (
              <p className="text-red-500 text-xs mt-1">{errors.maschinenbezeichnung.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="baujahr">Baujahr</Label>
              <Input
                id="baujahr"
                type="number"
                {...register("baujahr")}
                className="mt-1"
                placeholder="z. B. 2005"
                min={1950}
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="zustand">Zustand</Label>
                <Select onValueChange={(v) => setZustand(String(v ?? ""))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Bitte auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gut">Gut</SelectItem>
                  <SelectItem value="In Ordnung">In Ordnung</SelectItem>
                  <SelectItem value="Defekt">Defekt</SelectItem>
                  <SelectItem value="Unbekannt">Unbekannt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="beschreibung">Beschreibung / Besonderheiten</Label>
            <Textarea
              id="beschreibung"
              {...register("beschreibung")}
              className="mt-1"
              rows={3}
              placeholder="Ausstattung, Mängel, Zubehör, Laufleistung, Wartungshistorie…"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="nachricht">Weitere Informationen</Label>
        <Textarea
          id="nachricht"
          {...register("nachricht")}
          className="mt-1"
          rows={3}
          placeholder="Standort der Maschine, gewünschter Abholtermin, weitere Hinweise…"
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="datenschutz"
          checked={datenschutz}
          onCheckedChange={(checked) => setValue("datenschutz", checked as boolean)}
          className="mt-0.5"
        />
        <Label htmlFor="datenschutz" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
          Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
          <a href="/datenschutz" target="_blank" className="text-[#E8621A] hover:underline">
            Datenschutzerklärung
          </a>{" "}
          zu. <span className="text-red-500">*</span>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={loading || !datenschutz}
        className="w-full bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold py-3 text-base"
      >
        {loading ? "Wird gesendet…" : "Anfrage zur Maschinenbewertung senden"}
      </Button>
    </form>
  );
}
