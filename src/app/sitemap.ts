import type { MetadataRoute } from "next";
import { createPublicSupabaseClient } from "@/lib/supabase/public";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.firmenberatung-kassel.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/maschinen`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/maschinen-neu`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/angebote`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/maschinen-verkaufen`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/service`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/bewertungen`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/ueber-uns`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/anfahrt`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/impressum`, lastModified: new Date(), priority: 0.2 },
    { url: `${baseUrl}/datenschutz`, lastModified: new Date(), priority: 0.2 },
    { url: `${baseUrl}/agb`, lastModified: new Date(), priority: 0.2 },
  ];

  try {
    const supabase = createPublicSupabaseClient();

    const [{ data: maschinen }, { data: blogPosts }] = await Promise.all([
      supabase.from("maschinen").select("slug, created_at").eq("aktiv", true),
      supabase.from("blog_posts").select("slug, created_at").eq("veroeffentlicht", true),
    ]);

    const maschinenPages: MetadataRoute.Sitemap = (maschinen ?? []).map(({ slug, created_at }) => ({
      url: `${baseUrl}/maschinen/${slug}`,
      lastModified: new Date(created_at),
      priority: 0.8,
    }));

    const blogPages: MetadataRoute.Sitemap = (blogPosts ?? []).map(({ slug, created_at }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(created_at),
      priority: 0.6,
    }));

    return [...staticPages, ...maschinenPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
