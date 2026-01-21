import { supabase } from '@/lib/supabase';
import { normalizeError, AuthError } from '@/lib/errors';
import type {
  SignUpParams,
  SignInParams,
  ResetPasswordParams,
  UpdatePasswordParams,
  VerifyEmailParams,
  AuthResult,
  SessionResult,
  User,
  Session,
} from './types';

/**
 * Authentication Service
 *
 * Handles all authentication operations with Supabase.
 * All methods return normalized errors for consistent error handling.
 */

/**
 * Sign up a new user
 *
 * Creates a new user account and sends verification email.
 *
 * @param params - Sign up parameters (email, password, name)
 * @returns User data or error
 */
export async function signUp({ email, password, name }: SignUpParams): Promise<SessionResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: undefined, // Will be set when deep linking is implemented
      },
    });

    if (error) {
      throw normalizeError(error);
    }

    if (!data.user || !data.session) {
      throw new AuthError(
        'Sign up succeeded but no user/session returned',
        'NO_USER_SESSION',
        'Account created but unable to sign in. Please try logging in.'
      );
    }

    // Create user profile in public.users table
    // This will be done via a database trigger once schema is set up (Phase 8)
    // For now, we'll handle it manually in the auth context

    return { data: { user: data.user, session: data.session }, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Sign in an existing user
 *
 * @param params - Sign in parameters (email, password)
 * @returns User and session data or error
 */
export async function signIn({ email, password }: SignInParams): Promise<SessionResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw normalizeError(error);
    }

    if (!data.user || !data.session) {
      throw new AuthError(
        'Sign in succeeded but no user/session returned',
        'NO_USER_SESSION',
        'Sign in succeeded but unable to establish session.'
      );
    }

    return { data: { user: data.user, session: data.session }, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Sign out the current user
 *
 * Clears session from local storage and Supabase.
 *
 * @returns Success or error
 */
export async function signOut(): Promise<AuthResult<void>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw normalizeError(error);
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Send password reset email
 *
 * @param params - Reset password parameters (email)
 * @returns Success or error
 */
export async function resetPassword({ email }: ResetPasswordParams): Promise<AuthResult<void>> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: undefined, // Will be set when deep linking is implemented
    });

    if (error) {
      throw normalizeError(error);
    }

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Update user password
 *
 * User must be authenticated to update password.
 *
 * @param params - Update password parameters (newPassword)
 * @returns User data or error
 */
export async function updatePassword({
  newPassword,
}: UpdatePasswordParams): Promise<AuthResult<User>> {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw normalizeError(error);
    }

    if (!data.user) {
      throw new AuthError(
        'Password update succeeded but no user returned',
        'NO_USER',
        'Password updated but unable to fetch user data.'
      );
    }

    return { data: data.user, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Verify email with token
 *
 * @param params - Verify email parameters (token, type)
 * @returns Session data or error
 */
export async function verifyEmail({ token, type }: VerifyEmailParams): Promise<SessionResult> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type,
    });

    if (error) {
      throw normalizeError(error);
    }

    if (!data.user || !data.session) {
      throw new AuthError(
        'Email verification succeeded but no session returned',
        'NO_SESSION',
        'Email verified but unable to sign in.'
      );
    }

    return { data: { user: data.user, session: data.session }, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Get current authenticated user
 *
 * @returns User data or null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthResult<User>> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw normalizeError(error);
    }

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Get current session
 *
 * @returns Session data or null if no active session
 */
export async function getCurrentSession(): Promise<AuthResult<Session>> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw normalizeError(error);
    }

    return { data: session, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}

/**
 * Refresh the current session
 *
 * @returns New session data or error
 */
export async function refreshSession(): Promise<SessionResult> {
  try {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      throw normalizeError(error);
    }

    if (!data.session || !data.user) {
      throw new AuthError(
        'Session refresh succeeded but no session/user returned',
        'NO_SESSION',
        'Unable to refresh session. Please sign in again.'
      );
    }

    return { data: { user: data.user, session: data.session }, error: null };
  } catch (error) {
    return { data: null, error: normalizeError(error) };
  }
}
