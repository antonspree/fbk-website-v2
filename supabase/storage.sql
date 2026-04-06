-- Storage Bucket für Maschinenbilder
-- Dieses SQL in der Supabase Console ausführen

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'maschinen-bilder',
  'maschinen-bilder',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage-Policies
CREATE POLICY "maschinen_bilder_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'maschinen-bilder');

CREATE POLICY "maschinen_bilder_admin_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'maschinen-bilder' AND auth.role() = 'authenticated');

CREATE POLICY "maschinen_bilder_admin_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'maschinen-bilder' AND auth.role() = 'authenticated');

-- Bucket für Blog-Bilder
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-bilder',
  'blog-bilder',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

CREATE POLICY "blog_bilder_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-bilder');

CREATE POLICY "blog_bilder_admin_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-bilder' AND auth.role() = 'authenticated');

CREATE POLICY "blog_bilder_admin_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-bilder' AND auth.role() = 'authenticated');
