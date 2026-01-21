import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * useAuth hook
 *
 * Access authentication state and methods from anywhere in the app.
 *
 * @throws Error if used outside AuthProvider
 *
 * @example
 * function MyComponent() {
 *   const { user, isAuthenticated, signIn, signOut } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginScreen />;
 *   }
 *
 *   return <Text>Hello, {user.email}</Text>;
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
