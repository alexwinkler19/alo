import React from 'react';
import { Stack, styled, TamaguiElement } from 'tamagui';
import { semantic } from '@alo/theme';
import { Svg, Path } from 'react-native-svg';

// Checkbox size variants matching Figma
export type CheckboxSize = 'Small' | 'Medium' | 'Large';

export interface CheckboxProps {
  /** Whether the checkbox is selected */
  selected?: boolean;
  /** Size variant */
  size?: CheckboxSize;
  /** Change handler */
  onChange?: (selected: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
}

const CheckboxContainer = styled(Stack, {
  name: 'Checkbox',
  position: 'relative',
  borderRadius: 4,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      Small: {
        width: 18,
        height: 18,
      },
      Medium: {
        width: 24,
        height: 24,
      },
      Large: {
        width: 32,
        height: 32,
      },
    },
    selected: {
      true: {
        backgroundColor: semantic.color.brand.pressed, // #c13969
        borderWidth: 0,
      },
      false: {
        backgroundColor: semantic.color.bg.elevated, // white
        borderWidth: 1,
        borderColor: semantic.color.border.disabled, // #e0e0e0
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

const CheckIcon = styled(Stack, {
  name: 'CheckIcon',
  position: 'absolute',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      Small: {
        width: 10,
        height: 10,
      },
      Medium: {
        width: 12,
        height: 12,
      },
      Large: {
        width: 16,
        height: 16,
      },
    },
  } as const,
});

// Check SVG Icon Component
const CheckSvg = ({ size }: { size: CheckboxSize }) => {
  const dimensions =
    size === 'Small' ? { width: 10, height: 10 } : size === 'Medium' ? { width: 12, height: 12 } : { width: 16, height: 16 };

  return (
    <Svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill={semantic.color.interface.inverse}
      />
    </Svg>
  );
};

/**
 * Checkbox Component
 *
 * Allows the user to select items in a list of options.
 *
 * @example
 * ```tsx
 * <Checkbox size="Small" selected={false} onChange={(selected) => {}} />
 * <Checkbox size="Medium" selected={true} />
 * <Checkbox size="Large" selected={false} disabled />
 * ```
 */
export const Checkbox = React.forwardRef<TamaguiElement, CheckboxProps>(
  ({ selected = false, size = 'Small', onChange, disabled = false }, ref) => {
    const handlePress = () => {
      if (!disabled && onChange) {
        onChange(!selected);
      }
    };

    return (
      <CheckboxContainer
        ref={ref}
        size={size}
        selected={selected}
        disabled={disabled}
        onPress={handlePress}
        pressStyle={disabled ? undefined : { opacity: 0.8 }}
      >
        {selected && (
          <CheckIcon size={size}>
            <CheckSvg size={size} />
          </CheckIcon>
        )}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';
