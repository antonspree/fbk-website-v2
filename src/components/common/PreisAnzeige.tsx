import { formatPreis } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PreisAnzeigeProps {
  preis: number | null;
  preis_auf_anfrage: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PreisAnzeige({
  preis,
  preis_auf_anfrage,
  className,
  size = "md",
}: PreisAnzeigeProps) {
  const text = formatPreis(preis, preis_auf_anfrage);
  const isAnfrage = preis_auf_anfrage || preis === null;

  return (
    <span
      className={cn(
        "font-heading font-bold",
        size === "sm" && "text-base",
        size === "md" && "text-xl",
        size === "lg" && "text-3xl",
        isAnfrage
          ? "text-gray-500 font-semibold text-base"
          : "text-[#1f4a73]",
        className
      )}
    >
      {text}
    </span>
  );
}
