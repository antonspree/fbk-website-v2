"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sendeBewertung } from "@/app/actions/bewertungen";

interface FormData {
  name: string;
  text: string;
  datenschutz: boolean;
}

export function BewertungFormular() {
  const [sterne, setSterne] = useState(5);
  const [hoverSterne, setHoverSterne] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const datenschutz = watch("datenschutz");

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const result = await sendeBewertung({
        name: data.name,
        bewertung: sterne,
        text: data.text,
      });
      if (result.success) {
        setSent(true);
        toast.success("Bewertung eingereicht! Sie wird nach Freigabe veröffentlicht.");
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
        <p className="font-semibold text-green-800 text-lg mb-2">Vielen Dank für Ihre Bewertung!</p>
        <p className="text-green-700 text-sm">
          Ihre Bewertung wird nach Überprüfung veröffentlicht.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label>Ihre Bewertung <span className="text-red-500">*</span></Label>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSterne(s)}
              onMouseEnter={() => setHoverSterne(s)}
              onMouseLeave={() => setHoverSterne(0)}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  s <= (hoverSterne || sterne)
                    ? "fill-[#E8621A] text-[#E8621A]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600 font-medium">
            {["", "Sehr schlecht", "Schlecht", "Befriedigend", "Gut", "Sehr gut"][sterne]}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="bew-name">Ihr Name <span className="text-red-500">*</span></Label>
        <Input
          id="bew-name"
          {...register("name", { required: "Pflichtfeld" })}
          className="mt-1"
          placeholder="Max M."
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="bew-text">Ihre Bewertung <span className="text-red-500">*</span></Label>
        <Textarea
          id="bew-text"
          {...register("text", { required: "Pflichtfeld", minLength: { value: 20, message: "Mindestens 20 Zeichen" } })}
          className="mt-1"
          rows={4}
          placeholder="Beschreiben Sie Ihre Erfahrung mit der Firmenberatung Kassel…"
        />
        {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="bew-datenschutz"
          checked={datenschutz}
          onCheckedChange={(checked) => setValue("datenschutz", checked as boolean)}
          className="mt-0.5"
        />
        <Label htmlFor="bew-datenschutz" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
          Ich stimme der Veröffentlichung meiner Bewertung und der Verarbeitung meiner Daten gemäß der{" "}
          <a href="/datenschutz" target="_blank" className="text-[#E8621A] hover:underline">
            Datenschutzerklärung
          </a>{" "}
          zu. <span className="text-red-500">*</span>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={loading || !datenschutz}
        className="w-full bg-[#0F1F3D] hover:bg-[#E8621A] text-white border-0 font-semibold transition-colors"
      >
        {loading ? "Wird gesendet…" : "Bewertung einreichen"}
      </Button>
      <p className="text-xs text-gray-400 text-center">
        Bewertungen werden vor der Veröffentlichung geprüft.
      </p>
    </form>
  );
}
