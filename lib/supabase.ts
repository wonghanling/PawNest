import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzYwNTk2NDQsImV4cCI6MTk1MTYzNTY0NH0.2i0hLF1xFVg1-DqFfr3M1cMvp6B3-jtfLVzI6-CtTuo'

// Check if environment variables are properly configured
const isConfigured =
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseUrl !== 'your-project-url' &&
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzYwNTk2NDQsImV4cCI6MTk1MTYzNTY0NH0.2i0hLF1xFVg1-DqFfr3M1cMvp6B3-jtfLVzI6-CtTuo' &&
  supabaseAnonKey !== 'your-anon-key'

if (!isConfigured && typeof window !== 'undefined') {
  console.warn('⚠️ Supabase is not configured. Please set up your environment variables.')
  console.warn('📖 See SUPABASE_SETUP.md for setup instructions.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { isConfigured as isSupabaseConfigured }