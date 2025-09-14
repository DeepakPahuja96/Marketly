import fs from 'node:fs'
import path from 'node:path'

type PublicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  NEXT_PUBLIC_SITE_URL: string
}

const CONFIG_DIR = path.join(process.cwd(), 'config')
const PUBLIC_ENV_TXT = path.join(CONFIG_DIR, 'env.public.txt')

function parseKeyValueText(text: string): Record<string, string> {
  const result: Record<string, string> = {}
  text
    .split(/\r?\n/) 
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .forEach((line) => {
      const eqIndex = line.indexOf('=')
      if (eqIndex === -1) return
      const key = line.slice(0, eqIndex).trim()
      const value = line.slice(eqIndex + 1).trim()
      if (key) result[key] = value
    })
  return result
}

function readPublicEnvFromFile(): Partial<PublicEnv> {
  try {
    if (fs.existsSync(PUBLIC_ENV_TXT)) {
      const raw = fs.readFileSync(PUBLIC_ENV_TXT, 'utf8')
      const kv = parseKeyValueText(raw)
      return {
        NEXT_PUBLIC_SUPABASE_URL: kv.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: kv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SITE_URL: kv.NEXT_PUBLIC_SITE_URL,
      }
    }
  } catch {}
  return {}
}

export function getServerPublicEnv(): PublicEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const site = process.env.NEXT_PUBLIC_SITE_URL

  if (url && key && site) {
    return {
      NEXT_PUBLIC_SUPABASE_URL: url,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: key,
      NEXT_PUBLIC_SITE_URL: site,
    }
  }

  const fileEnv = readPublicEnvFromFile()
  const resolved: PublicEnv = {
    NEXT_PUBLIC_SUPABASE_URL: url || fileEnv.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: key || fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    NEXT_PUBLIC_SITE_URL: site || fileEnv.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  }

  if (!resolved.NEXT_PUBLIC_SUPABASE_URL || !resolved.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      'Public env missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local or config/env.public.txt'
    )
  }

  return resolved
}

export function buildInlinePublicEnvScript(): string {
  const env = getServerPublicEnv()
  const payload = {
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
  }
  return `window.__PUBLIC_ENV__=${JSON.stringify(payload)};Object.freeze(window.__PUBLIC_ENV__);`
}


