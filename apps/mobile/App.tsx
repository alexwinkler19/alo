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
import { ToastProvider } from './src/contexts/ToastContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from './src/hooks/useAuth';
import { 
  SignUpScreen, 
  LoginScreen, 
  ProfileScreen, 
  ExploreScreen, 
  SearchScreen, 
  SearchWhereScreen,
  SearchWhereResultsScreen,
  SearchWhenScreen,
  SearchWhenFlexibleScreen,
  SearchWhoScreen,
  WishlistScreen, 
  InboxScreen 
} from './src/screens';
import type { AuthStackParamList, AppStackParamList } from './src/navigation/types';

// Auth stack for unauthenticated users
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// App stack for authenticated users
const AppStack = createNativeStackNavigator<AppStackParamList>();

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
 * App Navigator
 *
 * Stack navigator for authenticated users.
 * Contains the main app screens.
 */
function AppNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <AppStack.Screen name="Explore" component={ExploreScreen} />
      <AppStack.Screen name="Search" component={SearchScreen} />
      <AppStack.Screen name="SearchWhere" component={SearchWhereScreen} />
      <AppStack.Screen name="SearchWhereResults" component={SearchWhereResultsScreen} />
      <AppStack.Screen name="SearchWhen" component={SearchWhenScreen} />
      <AppStack.Screen name="SearchWhenFlexible" component={SearchWhenFlexibleScreen} />
      <AppStack.Screen name="SearchWho" component={SearchWhoScreen} />
      <AppStack.Screen name="Wishlist" component={WishlistScreen} />
      <AppStack.Screen name="Inbox" component={InboxScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
    </AppStack.Navigator>
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

  // Show app stack for authenticated users
  if (isAuthenticated) {
    return <AppNavigator />;
  }

  // Show auth stack for unauthenticated users
  return <AuthNavigator />;
}

/**
 * App Component
 *
 * Root component that sets up all required providers:
 * - ErrorBoundary: Catches JavaScript errors
 * - SafeAreaProvider: Safe area insets for notches/home indicators
 * - QueryProvider: React Query for server state management
 * - AuthProvider: Authentication context with Supabase
 * - TamaguiProvider: UI theming and styled components
 * - ToastProvider: Toast notification context
 * - NavigationContainer: React Navigation container
 */
export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryProvider>
          <AuthProvider>
            <TamaguiProvider>
              <ToastProvider>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </ToastProvider>
            </TamaguiProvider>
          </AuthProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
