import React from 'react';
import { Stack, Text, ScrollView, styled } from 'tamagui';
import { semantic, typography } from '@alo/theme';
import { StatusBar } from 'react-native';
import { Svg, Path } from 'react-native-svg';

// Eye Icon Component
const EyeIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
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
});

const ContentContainer = styled(Stack, {
  name: 'LoginOptions',
  flexDirection: 'column',
  gap: 24,
  padding: 24,
  width: 375,
  height: 460,
});

const HeaderText = styled(Stack, {
  name: 'HeaderText',
  flexDirection: 'column',
  gap: 8,
});

const Title = styled(Text, {
  name: 'Title',
  fontFamily: 'Inter',
  fontWeight: '800',
  fontSize: 16,
  letterSpacing: 0.08,
  color: '#1f2024',
  width: 327,
});

const Subtitle = styled(Text, {
  name: 'Subtitle',
  ...typography.bodyS,
  color: '#71727a',
  width: 327,
});

const Form = styled(Stack, {
  name: 'Form',
  flexDirection: 'column',
  gap: 16,
});

const TextFieldContainer = styled(Stack, {
  flexDirection: 'column',
  gap: 8,
  width: 327,
});

const FieldLabel = styled(Text, {
  ...typography.subsectionTitle,
  color: semantic.color.text.primary,
  width: '100%',
});

const Field = styled(Stack, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  height: 48,
  paddingHorizontal: semantic.spacing.spaceinside.md,
  paddingVertical: semantic.spacing.spaceinside.sm,
  borderRadius: semantic.borderradius.sm,
  borderWidth: semantic.borderwidth.default,
  borderStyle: 'solid',
  overflow: 'hidden',
  width: '100%',
});

const FieldContent = styled(Stack, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flex: 1,
});

const FieldText = styled(Text, {
  ...typography.bodyM,
  flex: 1,
});

const IconContainer = styled(Stack, {
  width: 16,
  height: 16,
  overflow: 'hidden',
});

const TermsContainer = styled(Stack, {
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
  width: '100%',
});

const CheckboxContainer = styled(Stack, {
  width: 24,
  height: 24,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: semantic.color.border.disabled,
  borderStyle: 'solid',
  backgroundColor: semantic.color.bg.elevated,
});

const TermsText = styled(Text, {
  flex: 1,
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.12,
  color: '#71727a',
});

const TermsLink = styled(Text, {
  fontFamily: 'Inter',
  fontWeight: '600',
  fontSize: 12,
  color: semantic.color.brand.primary,
});

/**
 * Sign Up Screen (Figma Variant)
 *
 * This variant is auto-generated from Figma and matches the exact design specifications.
 */
export default function SignUpScreen() {
  return (
    <Container data-node-id="2119:6310">
      <StatusBar barStyle="dark-content" />
      
      <StatusBarContainer data-node-id="2119:6324" />

      <ScrollView>
        <ContentContainer data-node-id="2119:6311">
          {/* Header */}
          <HeaderText data-node-id="2119:6312">
            <Title data-node-id="2119:6313">Sign up</Title>
            <Subtitle data-node-id="2119:6314">
              Create an account to get started
            </Subtitle>
          </HeaderText>

          {/* Form */}
          <Form data-node-id="2119:6315">
            {/* Name Field - Filled */}
            <TextFieldContainer data-node-id="2119:6316">
              <FieldLabel>Name</FieldLabel>
              <Field
                borderColor={semantic.color.border.focused}
                data-node-id="I2119:6316;143:1431"
              >
                <FieldContent>
                  <FieldText color={semantic.color.text.primary}>Luc</FieldText>
                </FieldContent>
              </Field>
            </TextFieldContainer>

            {/* Email Field - Empty */}
            <TextFieldContainer data-node-id="2119:6317">
              <FieldLabel>Email Address</FieldLabel>
              <Field
                borderColor={semantic.color.border.default}
                data-node-id="I2119:6317;137:13303"
              >
                <FieldContent>
                  <FieldText color={semantic.color.text.placeholder}>
                    name@email.com
                  </FieldText>
                </FieldContent>
              </Field>
            </TextFieldContainer>

            {/* Password Field - Empty */}
            <TextFieldContainer data-node-id="2119:6318">
              <FieldLabel>Password</FieldLabel>
              <Field
                borderColor={semantic.color.border.default}
                data-node-id="I2119:6318;137:13303"
              >
                <FieldContent>
                  <FieldText color={semantic.color.text.placeholder}>
                    Create a password
                  </FieldText>
                </FieldContent>
                <IconContainer>
                  <EyeIcon />
                </IconContainer>
              </Field>
            </TextFieldContainer>

            {/* Confirm Password Field - Empty */}
            <TextFieldContainer data-node-id="2119:6319">
              <Field
                borderColor={semantic.color.border.default}
                data-node-id="I2119:6319;137:13303"
              >
                <FieldContent>
                  <FieldText color={semantic.color.text.placeholder}>
                    Confirm password
                  </FieldText>
                </FieldContent>
                <IconContainer>
                  <EyeIcon />
                </IconContainer>
              </Field>
            </TextFieldContainer>
          </Form>

          {/* Terms and Conditions */}
          <TermsContainer data-node-id="2119:6320">
            <CheckboxContainer />
            <TermsText data-node-id="2119:6322">
              I've read and agree with the{' '}
              <TermsLink>Terms and Conditions</TermsLink> and the{' '}
              <TermsLink>Privacy Policy</TermsLink>.
            </TermsText>
          </TermsContainer>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
}
