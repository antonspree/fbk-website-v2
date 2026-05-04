import { createClient } from "@supabase/supabase-js";

/**
 * Anon Supabase ohne cookies() – für öffentliche Lesezugriffe (RLS).
 * Vermeidet DYNAMIC_SERVER_USAGE bei statischer Vorab-Generierung (z. B. mit generateStaticParams).
 */
export function createPublicSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
