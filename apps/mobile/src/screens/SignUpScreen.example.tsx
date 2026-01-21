import React from 'react';
import { SignUpScreen } from './SignUpScreen';

/**
 * Sign Up Screen Example
 * 
 * This demonstrates how to use the SignUpScreen component with a handler.
 */

export const SignUpScreenExample = () => {
  const handleSignUp = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  }) => {
    console.log('Sign Up Data:', data);

    // Validation
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      console.error('All fields are required');
      return;
    }

    if (data.password !== data.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (!data.agreedToTerms) {
      console.error('Must agree to terms and conditions');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error('Invalid email format');
      return;
    }

    // Password strength validation (example)
    if (data.password.length < 8) {
      console.error('Password must be at least 8 characters');
      return;
    }

    // Proceed with sign up
    console.log('Sign up successful!');
    // Call your API here
  };

  return <SignUpScreen onSignUp={handleSignUp} />;
};

export default SignUpScreenExample;
