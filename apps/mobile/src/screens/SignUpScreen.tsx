import React, { useState } from 'react';
import { Stack, Text, ScrollView, styled } from 'tamagui';
import { TextField, Checkbox, Button } from '@alo/ui';
import { semantic, typography } from '@alo/theme';
import { StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

// Eye Icon Component - Visible (open eye)
const EyeVisibleIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
      fill="#8f9098"
    />
  </Svg>
);

// Eye Icon Component - Hidden (eye with slash)
const EyeHiddenIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
      fill="#8f9098"
    />
  </Svg>
);

const Container = styled(Stack, {
  name: 'SignUpScreen',
  flex: 1,
  backgroundColor: semantic.color.bg.primary, // white
});

const StatusBarContainer = styled(Stack, {
  name: 'StatusBar',
  height: 59,
  width: '100%',
  backgroundColor: 'transparent',
  // Note: backdrop blur not fully supported in RN, would need additional library
});

const ContentContainer = styled(Stack, {
  name: 'LoginOptions',
  flexDirection: 'column',
  gap: 24,
  padding: 24,
  width: '100%',
});

const HeaderText = styled(Stack, {
  name: 'HeaderText',
  flexDirection: 'column',
  gap: 8,
});

const Title = styled(Text, {
  name: 'Title',
  fontFamily: 'Inter',
  fontWeight: '800', // Extra Bold
  fontSize: 16,
  lineHeight: 16,
  letterSpacing: 0.5,
  color: '#1f2024', // Neutral/Dark/Darkest
});

const Subtitle = styled(Text, {
  name: 'Subtitle',
  ...typography.bodyS,
  color: '#71727a', // Neutral/Dark/Light
});

const Form = styled(Stack, {
  name: 'Form',
  flexDirection: 'column',
  gap: 16,
});

const TermsContainer = styled(Stack, {
  name: 'TermsContainer',
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
  width: '100%',
});

const TermsText = styled(Text, {
  name: 'TermsText',
  flex: 1,
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.12,
  color: '#71727a', // Neutral/Dark/Light
});

const TermsLink = styled(Text, {
  name: 'TermsLink',
  fontFamily: 'Inter',
  fontWeight: '600', // Semi Bold
  fontSize: 12,
  color: semantic.color.brand.primary, // #c13969
});

const LoginLinkContainer = styled(Stack, {
  name: 'LoginLinkContainer',
  alignItems: 'center',
  width: '100%',
});

const LoginLinkText = styled(Text, {
  name: 'LoginLinkText',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.12,
  color: semantic.color.text.secondary, // #71727a
});

const LoginLink = styled(Text, {
  name: 'LoginLink',
  fontFamily: 'Inter',
  fontWeight: '600',
  fontSize: 12,
  color: semantic.color.brand.primary, // #c13969
  cursor: 'pointer',
});

/**
 * Sign Up Screen
 *
 * Complete sign up screen with form fields for name, email, password,
 * password confirmation, and terms acceptance.
 */
export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signUp } = useAuth();
  const { showToast } = useToast();

  const handleSignUp = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp({ email, password, name });
    setIsSubmitting(false);

    if (error) {
      // Check if email already exists (Supabase returns this error)
      const isEmailExists =
        error.message.toLowerCase().includes('already registered') ||
        error.message.toLowerCase().includes('already exists') ||
        error.code === 'user_already_exists';

      if (isEmailExists) {
        showToast({
          style: 'Error',
          title: 'Account exists',
          description: 'An account with this email address already exists.',
        });
      } else {
        // Generic error toast for other errors
        showToast({
          style: 'Error',
          title: 'Sign up failed',
          description: error.message,
        });
      }
    }
    // On success, the AuthContext will update isAuthenticated
    // and the navigator will handle showing the ProfileScreen
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      
      <StatusBarContainer />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ContentContainer>
            {/* Header */}
            <HeaderText>
              <Title>Sign up</Title>
              <Subtitle>Create an account to get started</Subtitle>
            </HeaderText>

            {/* Form */}
            <Form>
              {/* Name Field */}
              <TextField
                title="Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                state={name ? 'Filled' : 'Empty'}
                showTitle
                autoCapitalize="words"
              />

              {/* Email Field */}
              <TextField
                title="Email Address"
                placeholder="name@email.com"
                value={email}
                onChangeText={setEmail}
                state={email ? 'Filled' : 'Empty'}
                showTitle
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password Field */}
              <TextField
                title="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                state={password ? 'Filled' : 'Empty'}
                showTitle
                showIcon
                icon={showPassword ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
                onIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="newPassword"
                autoComplete="password"
              />

              {/* Confirm Password Field */}
              <Stack width="100%">
                <TextField
                  title=""
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  state={confirmPassword ? 'Filled' : 'Empty'}
                  showTitle={false}
                  showIcon
                  icon={showConfirmPassword ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
                  onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  textContentType="newPassword"
                  autoComplete="password"
                />
              </Stack>
            </Form>

            {/* Terms and Conditions */}
            <TermsContainer>
              <Checkbox
                size="Medium"
                selected={agreedToTerms}
                onChange={setAgreedToTerms}
              />
              <TermsText>
                I've read and agree with the{' '}
                <TermsLink>Terms and Conditions</TermsLink> and the{' '}
                <TermsLink>Privacy Policy</TermsLink>.
              </TermsText>
            </TermsContainer>

            {/* Sign Up Button */}
            <Button
              buttonType="Primary"
              text={isSubmitting ? 'Creating account...' : 'Sign Up'}
              onPress={handleSignUp}
              showText={true}
              disabled={isSubmitting}
            />

            {/* Login Link */}
            <LoginLinkContainer>
              <LoginLinkText>
                Already have an account?{' '}
                <LoginLink onPress={handleLogin}>Login</LoginLink>
              </LoginLinkText>
            </LoginLinkContainer>
          </ContentContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUpScreen;
