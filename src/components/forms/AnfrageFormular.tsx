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

interface AnfrageFormularProps {
  maschineId: string;
  maschineTitel: string;
}

interface FormData {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
}

export function AnfrageFormular({ maschineId, maschineTitel }: AnfrageFormularProps) {
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
        betreff: `Anfrage zu: ${maschineTitel}`,
        nachricht: data.nachricht,
        maschine_id: maschineId,
        typ: "kauf",
      });
      if (result.success) {
        setSent(true);
        toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
      } else {
        toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
      }
    } catch {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-2">✓</div>
        <p className="font-semibold text-green-800 mb-1">Anfrage gesendet!</p>
        <p className="text-green-700 text-sm">
          Wir melden uns so schnell wie möglich bei Ihnen. In der Regel antworten wir innerhalb von 24 Stunden.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register("name", { required: "Name ist erforderlich" })}
          className="mt-1"
          placeholder="Ihr vollständiger Name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">
          E-Mail <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "E-Mail ist erforderlich",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ungültige E-Mail-Adresse" },
          })}
          className="mt-1"
          placeholder="ihre@email.de"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="telefon">Telefon</Label>
        <Input
          id="telefon"
          type="tel"
          {...register("telefon")}
          className="mt-1"
          placeholder="+49 …"
        />
      </div>

      <div>
        <Label htmlFor="nachricht">
          Nachricht <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="nachricht"
          {...register("nachricht", { required: "Nachricht ist erforderlich" })}
          className="mt-1"
          rows={4}
          placeholder={`Ich interessiere mich für: ${maschineTitel}. Bitte kontaktieren Sie mich…`}
        />
        {errors.nachricht && <p className="text-red-500 text-xs mt-1">{errors.nachricht.message}</p>}
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
          <a href="/datenschutz" target="_blank" className="text-[#1f4a73] hover:underline">
            Datenschutzerklärung
          </a>{" "}
          zu. <span className="text-red-500">*</span>
        </Label>
      </div>
      {!datenschutz && <div />}

      <Button
        type="submit"
        disabled={loading || !datenschutz}
        className="w-full bg-[#1f4a73] hover:bg-[#173a58] text-white border-0 font-semibold"
      >
        {loading ? "Wird gesendet…" : "Anfrage senden"}
      </Button>
    </form>
  );
}
