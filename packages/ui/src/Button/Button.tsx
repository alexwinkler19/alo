import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography } from '@alo/theme';

// Button variants matching Figma
export type ButtonType = 'Primary' | 'Secondary' | 'Tertiary';

export interface ButtonProps {
  /** Button type/tone variant */
  buttonType?: ButtonType;
  /** Content text */
  text?: string;
  /** Show/hide text */
  showText?: boolean;
  /** Icon element to show on the left */
  leftIcon?: React.ReactNode;
  /** Show/hide left icon */
  showLeftIcon?: boolean;
  /** Icon element to show on the right */
  rightIcon?: React.ReactNode;
  /** Show/hide right icon */
  showRightIcon?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

const ButtonContainer = styled(Stack, {
  name: 'Button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  borderRadius: primitive.borderradius.xs, // 8px from Figma
  paddingHorizontal: primitive.spacing.md, // 16px from Figma
  paddingVertical: primitive.spacing.sm, // 12px from Figma
  cursor: 'pointer',
  // TODO: missing token - shadow (Shadow 1 from Figma) for Secondary variant

  variants: {
    buttonType: {
      Primary: {
        backgroundColor: primitive.color.brand.primary['900'], // #c13969 from Figma
        borderWidth: 0,
      },
      Secondary: {
        backgroundColor: primitive.color.white, // #ffffff from Figma
        borderWidth: 0,
      },
      Tertiary: {
        backgroundColor: primitive.color.white, // #ffffff from Figma
        borderWidth: primitive.borderwidth.subtle, // 0.5px from Figma
        borderColor: primitive.color.brand.primary['900'], // #c13969 from Figma
        borderStyle: 'solid',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
});

const ButtonText = styled(Text, {
  name: 'ButtonText',
  ...typography.actionL, // Font family, size, weight, line height from semantic tokens

  variants: {
    buttonType: {
      Primary: {
        color: primitive.color.white, // #ffffff from Figma
      },
      Secondary: {
        color: primitive.color.brand.primary['900'], // #c13969 from Figma
      },
      Tertiary: {
        color: primitive.color.brand.primary['900'], // #c13969 from Figma
      },
    },
  } as const,
});

const IconContainer = styled(Stack, {
  name: 'IconContainer',
  width: 12,
  height: 12,
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Button Component
 *
 * Allows users to perform actions.
 *
 * @example
 * ```tsx
 * <Button buttonType="Primary" text="Submit" onPress={() => {}} />
 * <Button buttonType="Secondary" text="Cancel" leftIcon={<Icon />} showLeftIcon />
 * <Button buttonType="Tertiary" text="Learn More" rightIcon={<Icon />} showRightIcon />
 * ```
 */
export const Button = React.forwardRef<TamaguiElement, ButtonProps>(
  (
    {
      buttonType = 'Primary',
      text = 'Button',
      showText = true,
      leftIcon,
      showLeftIcon = false,
      rightIcon,
      showRightIcon = false,
      onPress,
      disabled = false,
    },
    ref
  ) => {
    return (
      <ButtonContainer
        ref={ref}
        buttonType={buttonType}
        disabled={disabled}
        onPress={disabled ? undefined : onPress}
        pressStyle={disabled ? undefined : { opacity: 0.8 }}
      >
        {showLeftIcon && leftIcon && <IconContainer>{leftIcon}</IconContainer>}

        {showText && (
          <ButtonText buttonType={buttonType}>{text}</ButtonText>
        )}

        {showRightIcon && rightIcon && (
          <IconContainer>{rightIcon}</IconContainer>
        )}
      </ButtonContainer>
    );
  }
);

Button.displayName = 'Button';
