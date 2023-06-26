import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
