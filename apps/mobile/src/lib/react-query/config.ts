import { QueryClient } from '@tanstack/react-query';
import { handleError } from '../errors';

/**
 * React Query configuration
 *
 * Global settings for React Query client:
 * - Stale time: Data considered fresh for 5 minutes
 * - Cache time: Inactive data cached for 10 minutes
 * - Retry logic: 3 retries with exponential backoff
 * - Error handling: Global error handler integration
 */

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // How long data is considered fresh (no refetch)
      staleTime: 1000 * 60 * 5, // 5 minutes

      // How long inactive data stays in cache
      gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)

      // Retry failed requests
      retry: (failureCount: number, error: unknown) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'statusCode' in error) {
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (statusCode && statusCode >= 400 && statusCode < 500) {
            return false;
          }
        }

        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Exponential backoff for retries
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus (web) / app foreground (mobile)
      refetchOnWindowFocus: true,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry mutations once (for network errors)
      retry: 1,

      // Error handling for mutations
      onError: (error: unknown) => {
        handleError(error, { type: 'mutation' });
      },
    },
  },
};

/**
 * Create React Query client
 *
 * @returns Configured QueryClient instance
 */
export function createQueryClient(): QueryClient {
  return new QueryClient(queryClientConfig);
}
