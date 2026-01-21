// /apps/mobile/src/lib/validation/schemas/auth.ts
/**
 * Authentication form validation schemas
 *
 * Zod schemas for validating auth-related forms.
 * Per constitution: TypeScript strict mode, user-friendly error messages
 */

import { z } from 'zod';

/**
 * Email validation
 * - Must be valid email format
 * - Lowercase only
 */
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase();

/**
 * Password validation
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Name validation
 * - Minimum 2 characters
 * - Maximum 50 characters
 * - Only letters, spaces, hyphens, apostrophes
 */
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

/**
 * Sign Up Schema
 * Used in CreateAccountScreen
 */
export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * Sign In Schema
 * Used in LoginScreen
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/**
 * Reset Password Schema
 * Used in ForgotPasswordScreen
 */
export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Name Entry Schema
 * Used in SignUpNameScreen
 */
export const nameEntrySchema = z.object({
  name: nameSchema,
});

export type NameEntryFormData = z.infer<typeof nameEntrySchema>;

/**
 * Verification Code Schema
 * Used in ConfirmationCodeScreen
 */
export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Verification code must only contain numbers'),
});

export type VerificationCodeFormData = z.infer<typeof verificationCodeSchema>;
