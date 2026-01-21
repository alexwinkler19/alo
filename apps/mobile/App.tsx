// /apps/mobile/App.tsx
/**
 * App Entry Point
 *
 * Sets up the app's navigation structure with conditional routing
 * based on authentication state. Unauthenticated users see the auth
 * stack (Login/SignUp), authenticated users see the main app stack.
 */
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TamaguiProvider } from './src/providers/TamaguiProvider';
import { QueryProvider } from './src/providers/QueryProvider';
import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from './src/hooks/useAuth';
import { SignUpScreen, LoginScreen } from './src/screens';
import type { AuthStackParamList } from './src/navigation/types';

// Auth stack for unauthenticated users
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Auth Navigator
 *
 * Stack navigator for unauthenticated users.
 * Contains Login and SignUp screens.
 */
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

/**
 * Loading Screen
 *
 * Displayed while checking authentication state on app launch.
 */
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

/**
 * Root Navigator
 *
 * Conditionally renders either the auth stack or the main app stack
 * based on the user's authentication state.
 */
function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // TODO: Add AppNavigator for authenticated users when main app screens are built
  // For now, authenticated users also see the auth stack (they can sign out from there)
  if (isAuthenticated) {
    // Placeholder: In production, this would show the main app stack
    // return <AppNavigator />;
    return <AuthNavigator />;
  }

  // Show auth stack for unauthenticated users
  return <AuthNavigator />;
}

/**
 * App Component
 *
 * Root component that sets up all required providers:
 * - SafeAreaProvider: Safe area insets for notches/home indicators
 * - QueryProvider: React Query for server state management
 * - AuthProvider: Authentication context with Supabase
 * - TamaguiProvider: UI theming and styled components
 * - NavigationContainer: React Navigation container
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <TamaguiProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </TamaguiProvider>
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
