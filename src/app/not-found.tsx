import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 bg-[#F5F5F5]">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="font-heading text-[120px] font-bold text-[#0F1F3D] leading-none opacity-10 select-none">
          404
        </div>
        <div className="-mt-8 relative z-10">
          <h1 className="font-heading text-3xl font-bold text-[#0F1F3D] mb-3">
            Seite nicht gefunden
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht finden Sie,
            was Sie suchen, in unserem Maschinenbestand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#0F1F3D] hover:bg-[#E8621A] text-white border-0 font-semibold transition-colors">
              <Link href="/maschinen">
                <Search className="w-4 h-4 mr-2" />
                Maschinen durchsuchen
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#0F1F3D] text-[#0F1F3D]">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zur Startseite
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
