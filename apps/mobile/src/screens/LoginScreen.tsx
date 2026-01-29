import React, { useState } from 'react';
import { Stack, Text, ScrollView, styled } from 'tamagui';
import { semantic, typography, primitive } from '@alo/theme';
import { StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button } from '@alo/ui';
import { TextField } from '@alo/ui';
import {
  EyeIcon,
  GoogleIcon,
  AppleIcon,
  FacebookIcon,
  ImagePlaceholder
} from '../assets/icons';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

// Styled Components
const Container = styled(Stack, {
  name: 'LoginScreen',
  flex: 1,
  backgroundColor: semantic.color.bg.primary, // white
});

const StatusBarContainer = styled(Stack, {
  name: 'StatusBar',
  height: 59,
  width: '100%',
  backgroundColor: 'transparent',
});

const ImageContainer = styled(Stack, {
  name: 'ImageContainer',
  backgroundColor: semantic.color.bg.tertiary, // #eaf2ff
  paddingVertical: 40,
  paddingHorizontal: 40,
  alignItems: 'center',
  justifyContent: 'center',
  height: 312,
});

const ImageIconContainer = styled(Stack, {
  name: 'ImageIconContainer',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
});

const ContentContainer = styled(Stack, {
  name: 'LoginOptions',
  flexDirection: 'column',
  gap: 24,
  paddingHorizontal: 24,
  paddingVertical: 40,
  width: '100%',
});

const WelcomeText = styled(Text, {
  name: 'Welcome',
  fontFamily: 'Inter',
  fontWeight: '800',
  fontSize: 24,
  lineHeight: 24,
  letterSpacing: 0.24,
  color: semantic.color.text.primary, // #2c2c2c
});

const FormContainer = styled(Stack, {
  name: 'Form',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

const ForgotPasswordText = styled(Text, {
  name: 'ForgotPassword',
  ...typography.bodyS,
  color: semantic.color.brand.primary, // #c13969
  textAlign: 'left',
  cursor: 'pointer',
});

const RegistrationContainer = styled(Stack, {
  name: 'RegistrationContainer',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

const RegistrationText = styled(Text, {
  name: 'RegistrationText',
  fontFamily: 'Inter',
  fontSize: 12,
  lineHeight: 16,
  textAlign: 'center',
  width: '100%',
});

const RegistrationTextNormal = styled(Text, {
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.12,
  color: semantic.color.text.secondary, // #71727a
});

const RegistrationTextLink = styled(Text, {
  fontFamily: 'Inter',
  fontWeight: '600',
  fontSize: 12,
  lineHeight: 12,
  color: semantic.color.brand.primary, // #c13969
  cursor: 'pointer',
});

const Divider = styled(Stack, {
  name: 'Divider',
  height: 1,
  backgroundColor: semantic.color.border.default, // #bdbdbd
  width: '100%',
});

const SocialLoginContainer = styled(Stack, {
  name: 'SocialLogin',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'center',
  width: '100%',
});

const SocialLoginText = styled(Text, {
  name: 'SocialLoginText',
  ...typography.bodyS,
  color: semantic.color.text.secondary, // #646464
  textAlign: 'center',
});

const SocialButtonsContainer = styled(Stack, {
  name: 'SocialButtons',
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
  justifyContent: 'center',
});

const SocialButton = styled(Stack, {
  name: 'SocialButton',
  width: 40,
  height: 40,
  borderRadius: 63,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  
  variants: {
    provider: {
      google: {
        backgroundColor: '#ed3241',
      },
      apple: {
        backgroundColor: primitive.color.neutral.grey['900'], // #1f2024
      },
      facebook: {
        backgroundColor: '#006ffd',
      },
    },
  } as const,
});

/**
 * Login Screen
 *
 * This screen allows users to sign in with email/password or social providers.
 * Based on Figma design node 2119:6290
 */
export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn({ email, password });
    setIsSubmitting(false);

    if (error) {
      // Check if user doesn't exist (Supabase returns "Invalid login credentials" for non-existent users)
      const isUserNotFound =
        error.message.toLowerCase().includes('invalid login credentials') ||
        error.message.toLowerCase().includes('user not found') ||
        error.code === 'invalid_credentials';

      if (isUserNotFound) {
        // Use Informative (neutral) style for non-existent account
        showToast({
          style: 'Informative',
          title: 'Account not found',
          description: 'There is no account linked to this email address. Please register.',
        });
      } else {
        // Generic error toast for other errors (wrong password, etc.)
        showToast({
          style: 'Error',
          title: 'Login failed',
          description: error.message,
        });
      }
    }
    // On success, the AuthContext will update isAuthenticated
    // and the navigator will handle showing the ProfileScreen
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    Alert.alert('Forgot Password', 'This feature will be implemented soon.');
  };

  const handleRegister = () => {
    navigation.navigate('SignUp');
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    // TODO: Implement social auth with Supabase
    Alert.alert('Social Login', `${provider} login will be implemented in the next step.`);
  };

  return (
    <Container data-node-id="2119:6290">
      <StatusBar barStyle="dark-content" />
      
      <StatusBarContainer data-node-id="2119:6309" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Image Placeholder Section */}
          <ImageContainer data-node-id="7:210">
          <ImageIconContainer>
            <ImagePlaceholder size={24} />
          </ImageIconContainer>
        </ImageContainer>

        {/* Content Section */}
        <ContentContainer data-node-id="2119:6291">
          {/* Welcome Header */}
          <WelcomeText data-node-id="2119:6292">Welcome!</WelcomeText>

          {/* Login Form */}
          <Stack gap={24}>
            <FormContainer data-node-id="2119:6294">
              {/* Email Field */}
              <TextField
                data-node-id="2119:6295"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
                showTitle={false}
                showPlaceholder={true}
                state="Empty"
              />

              {/* Password Field */}
              <TextField
                data-node-id="2119:6296"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                textContentType="password"
                autoComplete="password"
                showTitle={false}
                showPlaceholder={true}
                showIcon={true}
                icon={<EyeIcon size={16} />}
                onIconPress={() => setShowPassword(!showPassword)}
                state="Empty"
              />

              {/* Forgot Password Link */}
              <ForgotPasswordText 
                data-node-id="2119:6297"
                onPress={handleForgotPassword}
              >
                Forgot password?
              </ForgotPasswordText>
            </FormContainer>

            {/* Login Button & Registration Link */}
            <RegistrationContainer data-node-id="2119:6298">
              <Button
                buttonType="Primary"
                text={isSubmitting ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                showText={true}
                disabled={isSubmitting}
              />

              <RegistrationText 
                data-node-id="2119:6300"
                onPress={handleRegister}
              >
                <RegistrationTextNormal>Not a member?</RegistrationTextNormal>
                {' '}
                <RegistrationTextLink>Register now</RegistrationTextLink>
              </RegistrationText>
            </RegistrationContainer>
          </Stack>

          {/* Divider */}
          <Divider data-node-id="126:1618" />

          {/* Social Login */}
          <SocialLoginContainer data-node-id="2119:6302">
            <SocialLoginText data-node-id="2119:6303">
              Or continue with
            </SocialLoginText>

            <SocialButtonsContainer data-node-id="2119:6304">
              {/* Google */}
              <SocialButton
                provider="google"
                data-node-id="2119:6305"
                onPress={() => handleSocialLogin('google')}
                pressStyle={{ opacity: 0.8 }}
              >
                <GoogleIcon size={12} />
              </SocialButton>

              {/* Apple */}
              <SocialButton
                provider="apple"
                data-node-id="2119:6306"
                onPress={() => handleSocialLogin('apple')}
                pressStyle={{ opacity: 0.8 }}
              >
                <AppleIcon size={12} />
              </SocialButton>

              {/* Facebook */}
              <SocialButton
                provider="facebook"
                data-node-id="2119:6307"
                onPress={() => handleSocialLogin('facebook')}
                pressStyle={{ opacity: 0.8 }}
              >
                <FacebookIcon size={12} />
              </SocialButton>
            </SocialButtonsContainer>
          </SocialLoginContainer>
        </ContentContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
