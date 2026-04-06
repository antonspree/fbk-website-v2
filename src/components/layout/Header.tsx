"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Maschinen",
    href: "/maschinen",
    children: [
      { label: "Gebrauchte Maschinen", href: "/maschinen" },
      { label: "Neue Maschinen", href: "/maschinen-neu" },
      { label: "Aktuelle Angebote", href: "/angebote" },
    ],
  },
  { label: "Maschine verkaufen", href: "/maschinen-verkaufen" },
  { label: "Service", href: "/service" },
  { label: "Blog", href: "/blog" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[#0F1F3D] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading text-white text-xl font-bold tracking-wide leading-tight">
              FIRMENBERATUNG<br />
              <span className="text-[#E8621A]">KASSEL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-5 text-white/90 hover:text-white font-medium text-sm tracking-wide transition-colors hover:bg-white/10"
                  >
                    {link.label}
                    <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {openDropdown === link.href && (
                    <div className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-b-lg overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#0F1F3D] hover:text-white transition-colors font-medium"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-5 text-white/90 hover:text-white font-medium text-sm tracking-wide transition-colors hover:bg-white/10"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Telefon */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+4956057068"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#E8621A]" />
              <span>05605 – 70686</span>
            </a>
            <Button asChild size="sm" className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
              <Link href="/kontakt">Anfrage senden</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Menü öffnen</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0F1F3D] text-white border-0 w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="font-heading text-lg font-bold">
                    FIRMENBERATUNG <span className="text-[#E8621A]">KASSEL</span>
                  </span>
                </div>
                <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-3 px-2 text-white/90 hover:text-white font-semibold text-base border-b border-white/5 hover:bg-white/5 rounded transition-colors"
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="pl-4 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 px-2 text-white/70 hover:text-white text-sm hover:bg-white/5 rounded transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-6 border-t border-white/10 space-y-3">
                  <a
                    href="tel:+4956057068"
                    className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#E8621A]" />
                    <span>05605 – 70686</span>
                  </a>
                  <Button asChild className="w-full bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
                    <Link href="/kontakt">Anfrage senden</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
