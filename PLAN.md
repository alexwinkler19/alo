# Signup Flow Implementation Plan

**Overall Progress:** `100%`

## TLDR
Wire up the LoginScreen and SignUpScreen with navigation and authentication. Users can navigate between screens and sign up/login using email/password via the existing AuthContext and Supabase integration. Social auth (Google, Apple, Facebook) will be implemented in the next step.

## Critical Decisions
- **Navigation approach:** Use React Navigation's native stack with typed props from `AuthStackParamList` - maintains type safety and follows existing patterns
- **Auth integration:** Use existing `useAuth()` hook which wraps Supabase auth - no new infrastructure needed
- **Validation approach:** Simple inline validation with Alert dialogs for MVP - can add form-level validation with react-hook-form later
- **Social auth:** Deferred to next step - placeholder handlers with alerts inform users

## Tasks:

- [x] 🟩 **Step 1: Update LoginScreen navigation and auth**
  - [x] 🟩 Add navigation prop types from `AuthStackParamList`
  - [x] 🟩 Wire `handleRegister` to navigate to SignUp screen
  - [x] 🟩 Wire `handleLogin` to call `signIn` from `useAuth()`
  - [x] 🟩 Add loading state (`isSubmitting`) and disable button during submission
  - [x] 🟩 Add KeyboardAvoidingView wrapper for proper keyboard handling
  - [x] 🟩 Add placeholder alerts for forgot password and social login

- [x] 🟩 **Step 2: Update SignUpScreen navigation and auth**
  - [x] 🟩 Add navigation prop types from `AuthStackParamList`
  - [x] 🟩 Wire `handleSignUp` to call `signUp` from `useAuth()`
  - [x] 🟩 Add client-side validation (required fields, password match, terms agreement)
  - [x] 🟩 Add loading state (`isSubmitting`) and disable button during submission
  - [x] 🟩 Add Sign Up button (was missing from original implementation)
  - [x] 🟩 Add "Already have an account? Login" link with navigation

- [x] 🟩 **Step 3: Update App.tsx navigation configuration**
  - [x] 🟩 Remove temporary HomeScreen (dev testing screen)
  - [x] 🟩 Set LoginScreen as initial route for auth stack
  - [x] 🟩 Add conditional navigation based on `isAuthenticated` state (show auth stack vs app stack)

- [x] 🟩 **Step 4: Test the complete flow**
  - [x] 🟩 Verify navigation from Login → SignUp works
  - [x] 🟩 Verify navigation from SignUp → Login works
  - [x] 🟩 Test signup with valid credentials
  - [x] 🟩 Test login with valid credentials
  - [x] 🟩 Verify error handling displays correctly
  - [x] 🟩 Verify keyboard behavior on both iOS and Android

## Implementation Complete

The signup flow is now fully implemented with:
- **LoginScreen**: Email/password login with navigation to SignUp, social auth placeholders
- **SignUpScreen**: Full registration form with name, email, password, confirm password, terms checkbox
- **Navigation**: Bidirectional navigation between Login ↔ SignUp
- **Auth Integration**: Connected to Supabase via useAuth() hook
- **Error Handling**: Alert dialogs for validation and auth errors
- **Loading States**: Button text changes during submission, disabled while processing
- **Keyboard Handling**: KeyboardAvoidingView + ScrollView pattern on both screens

### Next Steps (Out of Scope)
- Implement social auth (Google, Apple, Facebook) with Supabase
- Add forgot password flow
- Build authenticated app screens (main app stack)
- Add form-level validation with react-hook-form integration
