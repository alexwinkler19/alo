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
 * Search params passed between search screens
 */
export interface SearchParams {
  location?: string;
  dateRange?: {
    start: number | null;
    end: number | null;
    month: string; // e.g., "January 2026"
  };
  guests?: number;
}

/**
 * App Stack - Authenticated users
 */
export type AppStackParamList = {
  Explore: undefined;
  Search: undefined;
  SearchWhere: SearchParams | undefined;
  SearchWhereResults: SearchParams | undefined;
  SearchWhen: SearchParams | undefined;
  SearchWhenFlexible: SearchParams | undefined;
  SearchWho: SearchParams | undefined;
  Wishlist: undefined;
  Inbox: undefined;
  Profile: undefined;
};

/**
 * Root navigation
 */
export type RootStackParamList = AuthStackParamList & AppStackParamList;
