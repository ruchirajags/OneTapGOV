import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid throwing during module import so the app can show a friendly UI
  // and provide actionable instructions. Using a stub that throws when used.
  console.error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  const stub = new Proxy({}, {
    get() { return () => { throw new Error('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local') } }
  })
  supabase = stub
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
