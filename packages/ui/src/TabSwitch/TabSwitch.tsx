import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography, semantic } from '@alo/theme';

export interface TabSwitchProps {
  /** Tab label text */
  text?: string;
  /** Active/selected state */
  state?: boolean;
  /** Press handler */
  onPress?: () => void;
}

const TabSwitchContainer = styled(Stack, {
  name: 'TabSwitch',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: primitive.spacing.xl, // 24px from Figma
  paddingVertical: primitive.spacing.xs, // 8px from Figma
  borderRadius: primitive.spacing.xl, // 24px from Figma
  cursor: 'pointer',

  variants: {
    state: {
      active: {
        backgroundColor: semantic.color.bg.primary, // white from Figma
        borderWidth: primitive.borderwidth.regular, // 1px
        borderColor: semantic.color.border.subtle, // #eeeeee from Figma
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2, // For Android
      },
      inactive: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    },
  } as const,
});

const TabSwitchText = styled(Text, {
  name: 'TabSwitchText',
  ...typography.bodyS, // 12px, regular, line-height 16px from Figma
  color: semantic.color.text.primary, // #2c2c2c from Figma
});

/**
 * TabSwitch Component
 *
 * A tab-like switch button with active/inactive states.
 *
 * @example
 * ```tsx
 * <TabSwitch text="Dates" state={true} />
 * <TabSwitch text="Dates" state={false} />
 * ```
 */
export const TabSwitch = React.forwardRef<TamaguiElement, TabSwitchProps>(
  (
    {
      text = 'Dates',
      state = true,
      onPress,
    },
    ref
  ) => {
    return (
      <TabSwitchContainer
        ref={ref}
        state={state ? 'active' : 'inactive'}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <TabSwitchText>{text}</TabSwitchText>
      </TabSwitchContainer>
    );
  }
);

TabSwitch.displayName = 'TabSwitch';
