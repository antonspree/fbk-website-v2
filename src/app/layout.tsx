import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/common/CookieBanner";
import { Toaster } from "@/components/ui/sonner";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Firmenberatung Kassel – Werkzeugmaschinen Handel",
    template: "%s – Firmenberatung Kassel",
  },
  description:
    "Firmenberatung Kassel Inh. Alfred Otto e.K. – Ihr Händler für neue und gebrauchte Werkzeugmaschinen. Drehmaschinen, Fräsmaschinen, Bearbeitungszentren und mehr. Persönliche Beratung aus Kaufungen bei Kassel.",
  keywords: [
    "Werkzeugmaschinen",
    "gebrauchte Werkzeugmaschinen",
    "Drehmaschinen kaufen",
    "Fräsmaschinen kaufen",
    "Bearbeitungszentren",
    "Maschinenhandel Kassel",
    "Firmenberatung Kassel",
    "Kaufungen",
  ],
  openGraph: {
    siteName: "Firmenberatung Kassel Inh. Alfred Otto e.K.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${barlowCondensed.variable} ${sourceSans3.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
