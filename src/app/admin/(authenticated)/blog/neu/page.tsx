import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogEditorClient } from "@/components/admin/BlogEditorClient";

export default function NeueBlogPostAdminPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Link href="/admin/blog" className="hover:text-gray-600">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Neuer Artikel</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#6397cc]">Neuer Blog-Artikel</h1>
      </div>
      <BlogEditorClient />
    </div>
  );
}
