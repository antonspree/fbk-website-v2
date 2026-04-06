"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sendeAnfrage } from "@/app/actions/anfragen";

interface FormData {
  name: string;
  email: string;
  telefon: string;
  betreff: string;
  nachricht: string;
  datenschutz: boolean;
}

export function KontaktFormular() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: { datenschutz: false },
  });
  const datenschutz = watch("datenschutz");

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const result = await sendeAnfrage({
        name: data.name,
        email: data.email,
        telefon: data.telefon,
        betreff: data.betreff,
        nachricht: data.nachricht,
        typ: "allgemein",
      });
      if (result.success) {
        setSent(true);
        toast.success("Nachricht wurde erfolgreich gesendet!");
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
        <div className="text-green-600 text-3xl mb-2">✓</div>
        <p className="font-semibold text-green-800 text-lg mb-2">Nachricht gesendet!</p>
        <p className="text-green-700 text-sm">
          Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="k-name">Name <span className="text-red-500">*</span></Label>
          <Input
            id="k-name"
            {...register("name", { required: "Pflichtfeld" })}
            className="mt-1"
            placeholder="Ihr Name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="k-email">E-Mail <span className="text-red-500">*</span></Label>
          <Input
            id="k-email"
            type="email"
            {...register("email", { required: "Pflichtfeld" })}
            className="mt-1"
            placeholder="ihre@email.de"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="k-telefon">Telefon</Label>
        <Input id="k-telefon" type="tel" {...register("telefon")} className="mt-1" placeholder="+49 …" />
      </div>
      <div>
        <Label htmlFor="k-betreff">Betreff <span className="text-red-500">*</span></Label>
        <Input
          id="k-betreff"
          {...register("betreff", { required: "Pflichtfeld" })}
          className="mt-1"
          placeholder="Ihr Betreff"
        />
        {errors.betreff && <p className="text-red-500 text-xs mt-1">{errors.betreff.message}</p>}
      </div>
      <div>
        <Label htmlFor="k-nachricht">Nachricht <span className="text-red-500">*</span></Label>
        <Textarea
          id="k-nachricht"
          {...register("nachricht", { required: "Pflichtfeld" })}
          className="mt-1"
          rows={5}
          placeholder="Ihre Nachricht…"
        />
        {errors.nachricht && <p className="text-red-500 text-xs mt-1">{errors.nachricht.message}</p>}
      </div>
      <div className="flex items-start gap-3">
        <Checkbox
          id="k-datenschutz"
          checked={datenschutz}
          onCheckedChange={(checked) => setValue("datenschutz", checked as boolean)}
          className="mt-0.5"
        />
        <Label htmlFor="k-datenschutz" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
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
        className="w-full bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold"
      >
        {loading ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
  );
}
