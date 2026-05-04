import Link from "next/link";
import Image from "next/image";
import { Calendar, Building2, Tag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PreisAnzeige } from "@/components/common/PreisAnzeige";
import type { MaschineWithKategorie } from "@/lib/types";

interface MaschineCardProps {
  maschine: MaschineWithKategorie;
}

export function MaschineCard({ maschine }: MaschineCardProps) {
  const titelbild = maschine.maschinen_bilder?.find((b) => b.ist_titelbild)
    ?? maschine.maschinen_bilder?.[0];

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#1f4a73]/30 transition-all duration-300 flex flex-col">
      {/* Bild */}
      <Link href={`/maschinen/${maschine.slug}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {titelbild ? (
          <Image
            src={titelbild.url}
            alt={maschine.titel}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Tag className="w-12 h-12 text-gray-300" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          {maschine.zustand && (
            <Badge
              className={
                maschine.zustand === "neu"
                  ? "bg-green-600 text-white border-0 text-xs"
                  : "bg-[#6397cc] text-white border-0 text-xs"
              }
            >
              {maschine.zustand === "neu" ? "Neu" : "Gebraucht"}
            </Badge>
          )}
        </div>
      </Link>

      {/* Inhalt */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Building2 className="w-3 h-3" />
            <span className="font-medium">{maschine.hersteller}</span>
            {maschine.baujahr && (
              <>
                <span>·</span>
                <Calendar className="w-3 h-3" />
                <span>{maschine.baujahr}</span>
              </>
            )}
          </div>
          <Link href={`/maschinen/${maschine.slug}`}>
            <h3 className="font-heading font-bold text-[#6397cc] text-lg leading-tight hover:text-[#1f4a73] transition-colors line-clamp-2">
              {maschine.titel}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">{maschine.typ}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <PreisAnzeige
            preis={maschine.preis}
            preis_auf_anfrage={maschine.preis_auf_anfrage}
          />
          <Button
            asChild
            size="sm"
            className="bg-[#6397cc] hover:bg-[#1f4a73] text-white border-0 text-xs group/btn transition-colors"
          >
            <Link href={`/maschinen/${maschine.slug}`}>
              Details
              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
