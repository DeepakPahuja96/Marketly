type RequiredEnv = {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
};

function requireEnv(name: keyof RequiredEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Add it to .env.local at the project root and restart the dev server.`
    );
  }
  return value;
}

// Server/runtime access: validated at runtime
export const env = {
  NEXT_PUBLIC_SUPABASE_URL: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

// Client-safe accessor: values are statically inlined by Next.js
export function getPublicEnv() {
  if (typeof window !== 'undefined') {
    const maybeWindow = window as unknown as { __PUBLIC_ENV__?: { NEXT_PUBLIC_SUPABASE_URL?: string; NEXT_PUBLIC_SUPABASE_ANON_KEY?: string } }
    const injected = maybeWindow.__PUBLIC_ENV__
    if (injected && injected.NEXT_PUBLIC_SUPABASE_URL && injected.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { url: injected.NEXT_PUBLIC_SUPABASE_URL, key: injected.NEXT_PUBLIC_SUPABASE_ANON_KEY }
    }
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Public env missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Provide via .env.local or config/env.public.txt.'
    )
  }
  return { url, key }
}



