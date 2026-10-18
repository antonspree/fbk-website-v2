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
  // Header/Footer/Admin liegen auf Markenblau – Logo als Weiß-Version.
  const heightClass =
    variant === "header" ? "h-11 sm:h-12 max-h-[3rem]" : variant === "footer" ? "h-10" : "h-8";

  return (
    <Image
      src={SRC}
      alt="Firmenberatung Kassel Inh. Alfred Otto e.K. – seit 1987"
      width={1024}
      height={269}
      className={`${heightClass} w-auto brightness-0 invert`}
      priority={priority ?? variant === "header"}
    />
  );
}
