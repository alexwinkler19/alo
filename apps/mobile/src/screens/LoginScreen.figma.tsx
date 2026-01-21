import React from 'react';
import { Stack, Text, ScrollView, styled } from 'tamagui';
import { semantic, typography, primitive } from '@alo/theme';
import { StatusBar } from 'react-native';
import { 
  EyeIcon, 
  GoogleIcon, 
  AppleIcon, 
  FacebookIcon, 
  ImagePlaceholder 
} from '../assets/icons';

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

const TextFieldContainer = styled(Stack, {
  name: 'TextField',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

const Field = styled(Stack, {
  name: 'Field',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  height: 48,
  paddingHorizontal: semantic.spacing.spaceinside.md, // 16px
  paddingVertical: semantic.spacing.spaceinside.sm, // 12px
  borderRadius: semantic.borderradius.sm, // 12px
  borderWidth: semantic.borderwidth.default, // 1px
  borderColor: semantic.color.border.default, // #bdbdbd
  borderStyle: 'solid',
  backgroundColor: semantic.color.interface.inverse, // white
  width: '100%',
});

const FieldContent = styled(Stack, {
  name: 'Content',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flex: 1,
});

const FieldText = styled(Text, {
  name: 'FieldText',
  ...typography.bodyM,
  color: semantic.color.text.placeholder, // #bdbdbd
  flex: 1,
});

const IconContainer = styled(Stack, {
  name: 'Icon',
  width: 16,
  height: 16,
  overflow: 'hidden',
});

const ForgotPasswordText = styled(Text, {
  name: 'ForgotPassword',
  ...typography.actionM,
  color: semantic.color.brand.primary, // #c13969
  textAlign: 'left',
});

const RegistrationContainer = styled(Stack, {
  name: 'RegistrationContainer',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

const ButtonPrimary = styled(Stack, {
  name: 'Button',
  backgroundColor: semantic.color.brand.primary, // #c13969
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: primitive.borderradius.xs, // 8px
  width: '100%',
});

const ButtonText = styled(Text, {
  name: 'ButtonText',
  ...typography.actionL,
  color: primitive.color.white,
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
 * Login Screen (Figma Variant)
 *
 * This variant is auto-generated from Figma and matches the exact design specifications.
 * Based on Figma design node 2119:6290
 */
export default function LoginScreenFigma() {
  return (
    <Container data-node-id="2119:6290">
      <StatusBar barStyle="dark-content" />
      
      <StatusBarContainer data-node-id="2119:6309" />

      <ScrollView>
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
              <TextFieldContainer data-node-id="2119:6295">
                <Field>
                  <FieldContent>
                    <FieldText>Email Address</FieldText>
                  </FieldContent>
                </Field>
              </TextFieldContainer>

              {/* Password Field */}
              <TextFieldContainer data-node-id="2119:6296">
                <Field>
                  <FieldContent>
                    <FieldText>Password</FieldText>
                  </FieldContent>
                  <IconContainer>
                    <EyeIcon size={16} />
                  </IconContainer>
                </Field>
              </TextFieldContainer>

              {/* Forgot Password Link */}
              <ForgotPasswordText data-node-id="2119:6297">
                Forgot password?
              </ForgotPasswordText>
            </FormContainer>

            {/* Login Button & Registration Link */}
            <RegistrationContainer data-node-id="2119:6298">
              <ButtonPrimary>
                <ButtonText>Button</ButtonText>
              </ButtonPrimary>

              <RegistrationText data-node-id="2119:6300">
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
              >
                <GoogleIcon size={12} />
              </SocialButton>

              {/* Apple */}
              <SocialButton
                provider="apple"
                data-node-id="2119:6306"
              >
                <AppleIcon size={12} />
              </SocialButton>

              {/* Facebook */}
              <SocialButton
                provider="facebook"
                data-node-id="2119:6307"
              >
                <FacebookIcon size={12} />
              </SocialButton>
            </SocialButtonsContainer>
          </SocialLoginContainer>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
}
