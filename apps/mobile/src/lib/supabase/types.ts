/**
 * Database type definitions
 *
 * These types are generated from the Supabase database schema.
 * Run `pnpm run gen:types` to regenerate after schema changes.
 *
 * TODO: Generate from actual schema once database is set up (Phase 8)
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          username: string | null;
          bio: string | null;
          avatar_url: string | null;
          phone: string | null;
          date_of_birth: string | null;
          gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | null;
          location: unknown | null; // PostGIS geography type
          is_verified: boolean;
          trust_score: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          username?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | null;
          location?: unknown | null;
          is_verified?: boolean;
          trust_score?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          username?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | null;
          location?: unknown | null;
          is_verified?: boolean;
          trust_score?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      user_profiles: {
        Row: {
          user_id: string;
          interests: string[] | null;
          languages: string[] | null;
          occupation: string | null;
          education: string | null;
          hometown: string | null;
          instagram_handle: string | null;
          spotify_profile: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          interests?: string[] | null;
          languages?: string[] | null;
          occupation?: string | null;
          education?: string | null;
          hometown?: string | null;
          instagram_handle?: string | null;
          spotify_profile?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          interests?: string[] | null;
          languages?: string[] | null;
          occupation?: string | null;
          education?: string | null;
          hometown?: string | null;
          instagram_handle?: string | null;
          spotify_profile?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Additional tables will be added as schema is implemented
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
