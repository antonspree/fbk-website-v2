import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SterneBewertungProps {
  bewertung: number;
  maxSterne?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SterneBewertung({
  bewertung,
  maxSterne = 5,
  size = "md",
  className,
}: SterneBewertungProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxSterne }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i < bewertung
              ? "fill-[#1f4a73] text-[#1f4a73]"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}
