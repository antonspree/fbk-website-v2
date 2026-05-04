"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  MessageSquare,
  Star,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SiteLogo } from "@/components/layout/SiteLogo";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/maschinen", label: "Maschinen", icon: Wrench },
  { href: "/admin/kategorien", label: "Kategorien", icon: FolderOpen },
  { href: "/admin/anfragen", label: "Anfragen", icon: MessageSquare },
  { href: "/admin/bewertungen", label: "Bewertungen", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-[#6397cc] min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="block">
          <SiteLogo variant="admin" priority={false} />
          <span className="text-white/40 text-xs mt-2 block">Admin-Bereich</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                isActive
                  ? "bg-[#1f4a73] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-white/50 hover:text-white text-xs transition-colors mb-1"
          target="_blank"
        >
          <span>Website ansehen</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-white/50 hover:text-red-400 text-sm transition-colors rounded-lg hover:bg-white/5"
        >
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
