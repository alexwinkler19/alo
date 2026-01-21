// /apps/mobile/src/navigation/types.ts
/**
 * Navigation type definitions
 *
 * Defines the navigation structure for the app.
 * Per constitution: TypeScript strict mode, no 'any'
 */

/**
 * Auth Stack - Unauthenticated users
 */
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

/**
 * App Stack - Authenticated users (placeholder)
 */
export type AppStackParamList = Record<string, undefined>;

/**
 * Root navigation
 */
export type RootStackParamList = AuthStackParamList & AppStackParamList;
