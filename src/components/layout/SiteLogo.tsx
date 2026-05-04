"use client";

import Image from "next/image";

const SRC = "/images/logo.png";

type SiteLogoProps = {
  /** Header: etwas höher für Sticky-Bar; Footer/Admin entsprechend gedrosselt */
  variant?: "header" | "footer" | "admin";
  /** LCP: nur im Haupt-Header true */
  priority?: boolean;
};

export function SiteLogo({ variant = "header", priority }: SiteLogoProps) {
  const heightClass =
    variant === "header" ? "h-10 max-h-[2.75rem]" : variant === "footer" ? "h-9" : "h-8";

  return (
    <Image
      src={SRC}
      alt="Firmenberatung Kassel"
      width={558}
      height={150}
      className={`${heightClass} w-auto`}
      priority={priority ?? variant === "header"}
    />
  );
}
