import { PostgrestError } from '@supabase/supabase-js';
import { AuthError as SupabaseAuthError } from '@supabase/supabase-js';
import {
  AppError,
  AuthError,
  NetworkError,
  ValidationError,
  ServerError,
  NotFoundError,
  PermissionError,
} from './AppError';

/**
 * Normalize errors to AppError instances
 *
 * This function converts various error types (Supabase, network, validation)
 * into structured AppError instances with user-friendly messages.
 *
 * @param error - The error to normalize
 * @returns Normalized AppError instance
 */
export function normalizeError(error: unknown): AppError {
  // Already an AppError
  if (error instanceof AppError) {
    return error;
  }

  // Supabase Auth errors
  if (isSupabaseAuthError(error)) {
    return new AuthError(
      error.message,
      error.status?.toString() || 'AUTH_ERROR',
      getAuthUserMessage(error.message)
    );
  }

  // Supabase Database errors
  if (isPostgrestError(error)) {
    if (error.code === 'PGRST116') {
      return new NotFoundError('resource', 'The requested item was not found.');
    }

    if (error.code?.startsWith('23')) {
      // PostgreSQL constraint violations
      return new ValidationError(error.message, undefined, 'Invalid data. Please check your input.');
    }

    return new ServerError(error.message, error.code || 'DB_ERROR');
  }

  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new NetworkError(
      'Network request failed',
      'FETCH_ERROR',
      'Unable to connect. Please check your internet connection.'
    );
  }

  // Generic Error instances
  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', undefined, error.message);
  }

  // Unknown error types
  return new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    undefined,
    'Something went wrong. Please try again.'
  );
}

/**
 * Log error to console (will be replaced with monitoring service later)
 *
 * @param error - The error to log
 * @param context - Additional context for debugging
 */
export function logError(error: AppError, context?: Record<string, unknown>): void {
  if (__DEV__) {
    console.error('❌ Error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      userMessage: error.getUserMessage(),
      context,
      stack: error.stack,
    });
  } else {
    // In production, send to monitoring service (Sentry, etc.)
    // TODO: Implement production error logging
    console.error('Error:', error.code, error.message);
  }
}

/**
 * Handle error and return user-facing message
 *
 * @param error - The error to handle
 * @param context - Additional context for logging
 * @returns User-friendly error message
 */
export function handleError(error: unknown, context?: Record<string, unknown>): string {
  const appError = normalizeError(error);
  logError(appError, context);
  return appError.getUserMessage();
}

// Type guards

function isSupabaseAuthError(error: unknown): error is SupabaseAuthError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AuthError'
  );
}

function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
}

// User message mappings

function getAuthUserMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }

  if (lowerMessage.includes('email already registered') || lowerMessage.includes('already exists')) {
    return 'An account with this email already exists.';
  }

  if (lowerMessage.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }

  if (lowerMessage.includes('password')) {
    return 'Password must be at least 6 characters long.';
  }

  if (lowerMessage.includes('token')) {
    return 'Your session has expired. Please sign in again.';
  }

  return 'Authentication failed. Please try again.';
}
