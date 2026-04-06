import Link from "next/link";
import { Plus, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { formatDatum } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} Artikel</p>
        </div>
        <Button asChild className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
          <Link href="/admin/blog/neu">
            <Plus className="w-4 h-4 mr-2" />
            Neuer Artikel
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Titel</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Kategorie</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Datum</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length > 0 ? (
              posts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#0F1F3D] line-clamp-1">{p.titel}</p>
                    <p className="text-gray-400 text-xs font-mono">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {p.kategorie && (
                      <Badge variant="outline" className="text-xs">{p.kategorie}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={p.veroeffentlicht ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-600 border-0"}>
                      {p.veroeffentlicht ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
                    {formatDatum(p.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {p.veroeffentlicht && (
                        <Link href={`/blog/${p.slug}`} target="_blank" className="text-gray-400 hover:text-[#0F1F3D] transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link href={`/admin/blog/${p.id}`} className="text-gray-400 hover:text-[#E8621A] transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  Keine Blog-Artikel vorhanden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
