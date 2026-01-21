// /apps/mobile/src/hooks/useForm.ts
/**
 * Typed useForm hook wrapper
 *
 * Re-exports react-hook-form with zodResolver integration.
 * Provides type-safe form handling across the app.
 */

import { useForm as useHookForm, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

/**
 * Typed form hook with Zod resolver
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   schema: signInSchema,
 *   defaultValues: {
 *     email: '',
 *     password: '',
 *   },
 * });
 * ```
 */
export function useForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> & {
    schema: TSchema;
  }
) {
  const { schema, ...formProps } = props;

  return useHookForm<z.infer<TSchema>>({
    ...formProps,
    resolver: zodResolver(schema),
  });
}

// Re-export commonly used types
export type { Control, FieldValues, UseFormReturn } from 'react-hook-form';
