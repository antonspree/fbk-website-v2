import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { formatDatum } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("veroeffentlicht", true)
    .single();
  return data ?? null;
}

async function getRelatedPosts(currentSlug: string, kategorie: string | null): Promise<BlogPost[]> {
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("veroeffentlicht", true)
    .neq("slug", currentSlug)
    .limit(3);

  if (kategorie) {
    query = query.eq("kategorie", kategorie);
  }

  const { data } = await query.order("created_at", { ascending: false });
  return data ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  return {
    title: post.seo_title ?? post.titel,
    description: post.seo_description ?? post.teaser,
    openGraph: {
      title: post.seo_title ?? post.titel,
      description: post.seo_description ?? post.teaser,
      images: post.bild_url ? [post.bild_url] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data } = await supabase.from("blog_posts").select("slug").eq("veroeffentlicht", true);
    return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.kategorie);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F1F3D] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white truncate max-w-xs">{post.titel}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            {post.kategorie && (
              <Badge className="bg-[#E8621A] text-white border-0 text-xs">{post.kategorie}</Badge>
            )}
            <div className="flex items-center gap-1 text-white/50 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{formatDatum(post.created_at)}</span>
            </div>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
            {post.titel}
          </h1>
          <p className="text-white/60 mt-3 text-sm leading-relaxed">{post.teaser}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {post.bild_url && (
          <div className="relative aspect-[16/7] rounded-lg overflow-hidden mb-8 shadow-md">
            <Image
              src={post.bild_url}
              alt={post.titel}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Artikel-Inhalt */}
        <div className="bg-white rounded-lg p-7 sm:p-10 border border-gray-200 shadow-sm">
          <div className="prose prose-gray max-w-none
            prose-headings:font-heading prose-headings:text-[#0F1F3D]
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-a:text-[#E8621A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0F1F3D]
            prose-li:text-gray-700
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-hr:border-gray-200
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.inhalt}
            </ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0F1F3D] rounded-lg p-7 mt-8 text-center">
          <p className="text-white font-semibold text-lg mb-2">
            Haben Sie Fragen oder suchen Sie eine bestimmte Maschine?
          </p>
          <p className="text-white/60 text-sm mb-5">
            Wir beraten Sie gerne persönlich und unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="bg-[#E8621A] hover:bg-[#d05518] text-white border-0 font-semibold">
              <Link href="/maschinen">Maschinen ansehen</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Zurück zum Blog
            </Link>
          </Button>
        </div>

        {/* Verwandte Artikel */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-[#0F1F3D] mb-6">
              Weitere Artikel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-[#E8621A]/30 hover:shadow-md transition-all"
                >
                  <p className="font-heading font-bold text-[#0F1F3D] text-base leading-tight group-hover:text-[#E8621A] transition-colors mb-2">
                    {p.titel}
                  </p>
                  <p className="text-gray-500 text-xs line-clamp-2">{p.teaser}</p>
                  <div className="flex items-center gap-1 text-[#E8621A] text-xs font-semibold mt-3">
                    Lesen <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
