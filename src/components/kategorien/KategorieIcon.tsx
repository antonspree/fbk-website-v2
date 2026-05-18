import Image from "next/image";
import { FolderOpen } from "lucide-react";
import type { Kategorie } from "@/lib/types";
import { cn } from "@/lib/utils";

type KategorieIconProps = {
  kategorie: Pick<Kategorie, "icon" | "icon_url" | "name">;
  className?: string;
  emojiClassName?: string;
};

export function KategorieIcon({ kategorie, className, emojiClassName }: KategorieIconProps) {
  if (kategorie.icon_url) {
    return (
      <span className={cn("relative block w-10 h-10 mx-auto mb-3", className)}>
        <Image
          src={kategorie.icon_url}
          alt=""
          fill
          className="object-contain"
          sizes="40px"
          unoptimized={kategorie.icon_url.startsWith("http")}
        />
      </span>
    );
  }

  if (kategorie.icon) {
    return (
      <span className={cn("text-3xl mb-3 block leading-none", emojiClassName)} aria-hidden>
        {kategorie.icon}
      </span>
    );
  }

  return (
    <span className={cn("flex justify-center mb-3", className)} aria-hidden>
      <FolderOpen className="w-8 h-8 text-[#6397cc]" />
    </span>
  );
}
