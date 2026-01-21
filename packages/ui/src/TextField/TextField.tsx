import React from 'react';
import { Stack, Text, Input, styled, TamaguiElement } from 'tamagui';
import { semantic, typography } from '@alo/theme';

// TextField state variants matching Figma
export type TextFieldState = 'Empty' | 'Filled' | 'Inactive' | 'Typing';

export interface TextFieldProps {
  /** Content text (displayed when filled or inactive) */
  content?: string;
  /** Icon element to show on the right */
  icon?: React.ReactNode;
  /** Placeholder text */
  placeholder?: string;
  /** Show/hide icon */
  showIcon?: boolean;
  /** Show/hide placeholder */
  showPlaceholder?: boolean;
  /** Show/hide support text */
  showSupportText?: boolean;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide unit prefix */
  showUnit?: boolean;
  /** Current state of the field */
  state?: TextFieldState;
  /** Support text displayed below the field */
  supportText?: string;
  /** Title text displayed above the field */
  title?: string;
  /** Unit prefix (e.g., "€") */
  unit?: string;
  /** Change handler for controlled input */
  onChangeText?: (text: string) => void;
  /** Value for controlled input */
  value?: string;
  /** Secure text entry (for passwords) */
  secureTextEntry?: boolean;
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /** Auto capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Editable state */
  editable?: boolean;
  /** Icon press handler (e.g., for password visibility toggle) */
  onIconPress?: () => void;
  /** Text content type (for iOS autofill) */
  textContentType?: 'none' | 'emailAddress' | 'password' | 'newPassword' | 'oneTimeCode' | 'username';
  /** Auto complete (for Android) */
  autoComplete?: 'off' | 'email' | 'password' | 'username' | 'name';
}

const Container = styled(Stack, {
  name: 'TextFieldContainer',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

const Title = styled(Text, {
  name: 'TextFieldTitle',
  ...typography.subsectionTitle,
  width: '100%',

  variants: {
    state: {
      Empty: {
        color: semantic.color.text.primary,
      },
      Filled: {
        color: semantic.color.text.primary,
      },
      Inactive: {
        color: semantic.color.text.disabled,
      },
      Typing: {
        color: semantic.color.text.primary,
      },
    },
  } as const,
});

const FieldContainer = styled(Stack, {
  name: 'Field',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: semantic.spacing.spaceinside.md, // 16px
  paddingVertical: semantic.spacing.spaceinside.sm, // 12px
  borderRadius: semantic.borderradius.sm, // 12px
  borderWidth: semantic.borderwidth.default, // 1px
  borderStyle: 'solid',
  width: '100%',

  variants: {
    state: {
      Empty: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.default, // #bdbdbd
        height: 48,
      },
      Filled: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.focused, // #2c2c2c
        height: 48,
      },
      Inactive: {
        backgroundColor: semantic.color.interface.tertiary, // #fafafa
        borderColor: semantic.color.border.disabled, // #e0e0e0
        height: 48,
      },
      Typing: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.status.error.border, // #e50c1e
        height: 48,
      },
    },
  } as const,
});

const ContentWrapper = styled(Stack, {
  name: 'Content',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flex: 1,
});

const Unit = styled(Text, {
  name: 'Unit',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 14,
  lineHeight: 18,
  color: '#8f9098', // grey-scale/500
});

const StyledInput = styled(Input, {
  name: 'TextFieldInput',
  ...typography.bodyM,
  flex: 1,
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  backgroundColor: 'transparent',
  minHeight: 24,
  verticalAlign: 'middle',

  variants: {
    state: {
      Empty: {
        color: semantic.color.text.primary,
      },
      Filled: {
        color: semantic.color.text.primary,
      },
      Inactive: {
        color: semantic.color.text.placeholder,
      },
      Typing: {
        color: semantic.color.text.primary,
      },
    },
  } as const,

  focusStyle: {
    outlineWidth: 0,
  },
});

const IconContainer = styled(Stack, {
  name: 'Icon',
  width: 16,
  height: 16,
  overflow: 'hidden',
});

const SupportText = styled(Text, {
  name: 'SupportText',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 10,
  lineHeight: 14,
  letterSpacing: 0.15,
  color: '#8f9098', // grey-scale/500
  width: '100%',
});

/**
 * TextField Component
 *
 * Allow the input of short text.
 *
 * @example
 * ```tsx
 * <TextField title="Email" placeholder="Enter your email" state="Empty" />
 * <TextField title="Amount" unit="€" showUnit content="1000" state="Filled" />
 * <TextField title="Password" placeholder="Enter password" state="Typing" icon={<EyeIcon />} showIcon />
 * ```
 */
export const TextField = React.forwardRef<TamaguiElement, TextFieldProps>(
  (
    {
      content = 'Text',
      icon,
      placeholder = 'Text',
      showIcon = false,
      showPlaceholder = true,
      showSupportText = false,
      showTitle = true,
      showUnit = false,
      state = 'Empty',
      supportText = 'Support text',
      title = 'Title',
      unit = '€',
      onChangeText,
      value,
      secureTextEntry = false,
      keyboardType = 'default',
      autoCapitalize = 'sentences',
      editable = true,
      onIconPress,
      textContentType,
      autoComplete,
    },
    ref
  ) => {
    const isEmpty = state === 'Empty';
    const isFilled = state === 'Filled';
    const isInactive = state === 'Inactive';
    const isTyping = state === 'Typing';
    const isEmptyOrFilledOrTyping = isEmpty || isFilled || isTyping;

    return (
      <Container ref={ref}>
        {/* Title - shown for all states except when showTitle is false */}
        {isEmptyOrFilledOrTyping && showTitle && (
          <Title state={state}>{title}</Title>
        )}

        {/* Field Container */}
        <FieldContainer state={state}>
          <ContentWrapper>
            {/* Unit Prefix */}
            {showUnit && <Unit>{unit}</Unit>}

            {/* Input Field */}
            <StyledInput
              state={state}
              placeholder={showPlaceholder ? placeholder : ''}
              placeholderTextColor={semantic.color.text.placeholder}
              value={value !== undefined ? value : content}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              editable={editable && !isInactive}
              textContentType={textContentType}
              autoComplete={autoComplete}
            />
          </ContentWrapper>

          {/* Icon */}
          {showIcon && icon && (
            <IconContainer
              onPress={onIconPress}
              cursor={onIconPress ? 'pointer' : 'default'}
            >
              {icon}
            </IconContainer>
          )}
        </FieldContainer>

        {/* Support Text */}
        {showSupportText && <SupportText>{supportText}</SupportText>}

        {/* Title for Inactive state - shown at the bottom */}
        {isInactive && showTitle && <Title state={state}>{title}</Title>}
      </Container>
    );
  }
);

TextField.displayName = 'TextField';
