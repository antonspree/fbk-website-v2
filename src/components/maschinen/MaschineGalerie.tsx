"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { MaschineBild } from "@/lib/types";

interface MaschineGalerieProps {
  bilder: MaschineBild[];
  titel: string;
}

export function MaschineGalerie({ bilder, titel }: MaschineGalerieProps) {
  const sorted = [...bilder].sort((a, b) => {
    if (a.ist_titelbild) return -1;
    if (b.ist_titelbild) return 1;
    return a.position - b.position;
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (sorted.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Kein Bild verfügbar</p>
        </div>
      </div>
    );
  }

  const prev = () => setActiveIdx((i) => (i - 1 + sorted.length) % sorted.length);
  const next = () => setActiveIdx((i) => (i + 1) % sorted.length);

  return (
    <div className="space-y-3">
      {/* Hauptbild */}
      <div
        className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={sorted[activeIdx].url}
          alt={`${titel} – Bild ${activeIdx + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIdx === 0}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {sorted.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {activeIdx + 1} / {sorted.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((bild, idx) => (
            <button
              key={bild.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                idx === activeIdx ? "border-[#E8621A]" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={bild.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-sm flex items-center gap-1"
            onClick={() => setLightboxOpen(false)}
          >
            <span>Schließen</span>
            <span className="text-xl leading-none">×</span>
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={sorted[activeIdx].url}
              alt={`${titel} – Bild ${activeIdx + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
            {sorted.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
