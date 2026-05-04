import { SterneBewertung } from "@/components/common/SterneBewertung";
import { formatDatum } from "@/lib/utils";
import type { Bewertung } from "@/lib/types";

interface BewertungCardProps {
  bewertung: Bewertung;
}

export function BewertungCard({ bewertung }: BewertungCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col gap-3">
      <SterneBewertung bewertung={bewertung.bewertung} />
      <p className="text-gray-700 text-sm leading-relaxed italic flex-1">
        &ldquo;{bewertung.text}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="font-semibold text-[#6397cc] text-sm">{bewertung.name}</span>
        <span className="text-gray-400 text-xs">{formatDatum(bewertung.created_at)}</span>
      </div>
    </div>
  );
}
