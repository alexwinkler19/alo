import { z } from 'zod';
import Constants from 'expo-constants';

/**
 * Environment variable schema validation
 *
 * This ensures all required environment variables are present and valid at runtime.
 * If validation fails, the app will crash immediately with a clear error message.
 */
const envSchema = z.object({
  EXPO_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_', 'Invalid Stripe publishable key'),
});

type EnvSchema = z.infer<typeof envSchema>;

/**
 * Validate and parse environment variables
 */
function validateEnv(): EnvSchema {
  const env = {
    EXPO_PUBLIC_SUPABASE_URL: Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: Constants.expoConfig?.extra?.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errors = result.error.errors.map(err => `  - ${err.path.join('.')}: ${err.message}`).join('\n');

    throw new Error(
      `❌ Environment validation failed:\n\n${errors}\n\nPlease check your .env file and ensure all required variables are set correctly.`
    );
  }

  return result.data;
}

/**
 * Validated environment variables
 *
 * Access environment variables via this object for type safety:
 * @example
 * import { env } from '@/lib/env';
 * const url = env.EXPO_PUBLIC_SUPABASE_URL;
 */
export const env = validateEnv();
