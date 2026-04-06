import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BlogEditorClient } from "@/components/admin/BlogEditorClient";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  return data ?? null;
}

export default async function BearbeiteBlogPostAdminPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Link href="/admin/blog" className="hover:text-gray-600">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-xs">{post.titel}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#0F1F3D]">Artikel bearbeiten</h1>
      </div>
      <BlogEditorClient post={post} />
    </div>
  );
}
