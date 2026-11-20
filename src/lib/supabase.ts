import { createClient } from '@supabase/supabase-js';

// Reads environment variables with safe fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if valid credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-supabase-url')
);

// Export singleton Supabase client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Diagnostics helper
export function getSupabaseStatus(): { configured: boolean; url: string; hasKey: boolean } {
  return {
    configured: isSupabaseConfigured,
    url: supabaseUrl ? supabaseUrl.replace(/^(https?:\/\/[^/]+).*/, '$1') : 'Not Configured',
    hasKey: Boolean(supabaseAnonKey && !supabaseAnonKey.includes('placeholder')),
  };
}
