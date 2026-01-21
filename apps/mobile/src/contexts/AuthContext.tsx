import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { logError, normalizeError, type AppError } from '@/lib/errors';
import * as authService from '@/services/auth';
import type { User, Session, SignUpParams, SignInParams } from '@/services/auth';

/**
 * Authentication context state
 */
interface AuthContextState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (params: SignUpParams) => Promise<{ error: AppError | null }>;
  signIn: (params: SignInParams) => Promise<{ error: AppError | null }>;
  signOut: () => Promise<{ error: AppError | null }>;
  refreshSession: () => Promise<{ error: AppError | null }>;
}

/**
 * Authentication context
 */
export const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider
 *
 * Manages authentication state and provides auth methods to the app.
 *
 * Features:
 * - Restores session on app start (from AsyncStorage)
 * - Listens to auth state changes (sign in, sign out, token refresh)
 * - Provides auth methods (signUp, signIn, signOut)
 * - Exposes auth state (user, session, isLoading, isAuthenticated)
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        setSession(null);
        setUser(null);
      }

      // Handle specific events
      if (event === 'SIGNED_OUT') {
        // Clear any cached data here
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Initialize authentication state
   *
   * Attempts to restore session from AsyncStorage.
   */
  async function initializeAuth() {
    try {
      const { data, error } = await authService.getCurrentSession();

      if (error) {
        logError(normalizeError(error), { context: 'initializeAuth' });
        return;
      }

      if (data) {
        setSession(data);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign up a new user
   */
  async function signUp(params: SignUpParams) {
    setIsLoading(true);
    try {
      const { data, error } = await authService.signUp(params);

      if (error) {
        return { error };
      }

      if (data) {
        // User and session are set via onAuthStateChange listener
        // No need to manually set state here
      }

      return { error: null };
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign in an existing user
   */
  async function signIn(params: SignInParams) {
    setIsLoading(true);
    try {
      const { data, error } = await authService.signIn(params);

      if (error) {
        return { error };
      }

      if (data) {
        // User and session are set via onAuthStateChange listener
        // No need to manually set state here
      }

      return { error: null };
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign out the current user
   */
  async function signOut() {
    setIsLoading(true);
    try {
      const { error } = await authService.signOut();

      if (error) {
        return { error };
      }

      // User and session are cleared via onAuthStateChange listener
      return { error: null };
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Refresh the current session
   */
  async function refreshSession() {
    try {
      const { data, error } = await authService.refreshSession();

      if (error) {
        return { error };
      }

      if (data) {
        // Session is updated via onAuthStateChange listener
      }

      return { error: null };
    } catch (error) {
      return { error: normalizeError(error) };
    }
  }

  const value: AuthContextState = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
