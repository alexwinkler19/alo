import React, { type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/react-query/config';

// Create singleton query client
const queryClient = createQueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * React Query Provider
 *
 * Wraps the app with QueryClientProvider to enable React Query hooks.
 *
 * @example
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
