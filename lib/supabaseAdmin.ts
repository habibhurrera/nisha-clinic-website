/**
 * Server-only Supabase client (service role — bypasses RLS).
 * Never import this from a component; only from pages/api/*.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface ReviewRow {
  id: string;
  created_at: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  approved: boolean;
}

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
