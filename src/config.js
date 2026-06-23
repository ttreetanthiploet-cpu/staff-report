// ─── Supabase Configuration ───────────────────────────────────────────────────
// Replace these values with your real Supabase project credentials.
// For Vercel deployment, set these as Environment Variables in the Vercel dashboard
// and inject them at build time, or keep them here for a purely static deploy.
//
// IMPORTANT: Use the `anon` key (safe for browser) — NOT the service_role key.
// Enable Row Level Security (RLS) on the table and create a SELECT policy
// if you want to restrict access by authenticated user.

export const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
export const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Set to true to use mock data instead of hitting Supabase
// Automatically true when credentials are not yet set
export const USE_MOCK = SUPABASE_URL.includes('YOUR_PROJECT_ID');
