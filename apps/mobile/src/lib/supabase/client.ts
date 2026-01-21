import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from '../env';
import type { Database } from './types';

/**
 * Supabase client singleton
 *
 * This client is configured with:
 * - AsyncStorage for session persistence (auth state survives app restarts)
 * - Type-safe database schema (generated from Supabase)
 * - Validated environment variables
 *
 * @example
 * import { supabase } from '@/lib/supabase';
 * const { data, error } = await supabase.from('users').select('*');
 */
export const supabase = createClient<Database>(
  env.EXPO_PUBLIC_SUPABASE_URL,
  env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
