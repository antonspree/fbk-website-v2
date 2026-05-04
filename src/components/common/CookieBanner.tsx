"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Alert className="max-w-4xl mx-auto bg-[#6397cc] text-white border-[#1f4a73] border shadow-2xl">
        <Cookie className="w-5 h-5 text-[#1f4a73]" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ml-2">
          <div>
            <p className="font-semibold text-white text-sm mb-1">
              Diese Website verwendet Cookies
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              Wir verwenden ausschließlich technisch notwendige Cookies für den Betrieb dieser Website. Es werden keine
              Tracking- oder Analyse-Cookies ohne Ihre ausdrückliche Zustimmung eingesetzt.{" "}
              <a href="/datenschutz" className="text-[#1f4a73] hover:underline">
                Datenschutzerklärung
              </a>
            </p>
          </div>
          <Button
            onClick={accept}
            size="sm"
            className="flex-shrink-0 bg-[#1f4a73] hover:bg-[#173a58] text-white border-0 font-semibold"
          >
            Verstanden
          </Button>
        </div>
      </Alert>
    </div>
  );
}
