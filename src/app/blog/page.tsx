import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { formatDatum } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Ratgeber & Wissen rund um Werkzeugmaschinen",
  description:
    "Tipps, Ratgeber und Fachwissen rund um Werkzeugmaschinen, Maschinenkauf, Betriebsauflösungen und Industrieequipment vom erfahrenen Händler aus Kassel.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("veroeffentlicht", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Blog & Ratgeber</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Ratgeber & Wissen
          </h1>
          <p className="text-white/60 mt-3 max-w-xl text-sm leading-relaxed">
            In unserem Blog teilen wir unser Fachwissen aus über 20 Jahren Maschinenhandel.
            Lesen Sie praktische Ratgeber, Kauftipps und Brancheninformationen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#E8621A]/30 transition-all duration-300 flex flex-col"
              >
                {post.bild_url ? (
                  <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                    <Image
                      src={post.bild_url}
                      alt={post.titel}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#0F1F3D] to-[#1a2f52] flex items-center justify-center">
                    <span className="font-heading text-white/20 text-4xl font-bold">FBK</span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-3">
                    {post.kategorie && (
                      <Badge variant="outline" className="text-xs border-[#E8621A] text-[#E8621A]">
                        {post.kategorie}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDatum(post.created_at)}</span>
                    </div>
                  </div>
                  <h2 className="font-heading font-bold text-[#0F1F3D] text-lg leading-tight group-hover:text-[#E8621A] transition-colors">
                    {post.titel}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.teaser}
                  </p>
                  <div className="flex items-center gap-1 text-[#E8621A] text-sm font-semibold mt-auto">
                    Weiterlesen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">Noch keine Blog-Artikel veröffentlicht.</p>
          </div>
        )}
      </div>
    </div>
  );
}
