import type { User, Session } from '@supabase/supabase-js';
import type { AppError } from '@/lib/errors';

/**
 * Authentication service types
 */

export type { User, Session };

export interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface UpdatePasswordParams {
  newPassword: string;
}

export interface VerifyEmailParams {
  token: string;
  type: 'signup' | 'email';
}

export interface AuthResult<T = User> {
  data: T | null;
  error: AppError | null;
}

export interface SessionResult {
  data: {
    user: User;
    session: Session;
  } | null;
  error: AppError | null;
}
