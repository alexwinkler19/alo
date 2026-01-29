import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography, semantic } from '@alo/theme';

export interface TabProps {
  /** Tab label text */
  text?: string;
  /** Active/selected state */
  state?: boolean;
  /** Show/hide badge */
  showBadge?: boolean;
  /** Badge text content */
  badgeText?: string;
  /** Press handler */
  onPress?: () => void;
}

const TabContainer = styled(Stack, {
  name: 'Tab',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: primitive.spacing['2xs'], // 4px from Figma
  paddingVertical: primitive.spacing.sm, // 12px from Figma
  borderStyle: 'solid',
  cursor: 'pointer',

  variants: {
    state: {
      active: {
        borderBottomWidth: primitive.borderwidth.prominent, // 2px from Figma
        borderBottomColor: semantic.color.text.primary, // #2c2c2c from Figma
      },
      inactive: {
        borderBottomWidth: primitive.borderwidth.regular, // 1px
        borderBottomColor: semantic.color.border.focused, // #2c2c2c from Figma
      },
    },
  } as const,
});

const TabText = styled(Text, {
  name: 'TabText',
  ...typography.bodyS, // 12px, regular, line-height 16px from Figma
  color: semantic.color.text.primary, // #2c2c2c from Figma
});

const Badge = styled(Stack, {
  name: 'Badge',
  backgroundColor: semantic.color.interface.brand, // #c13969 from Figma
  paddingHorizontal: primitive.spacing.xs, // 8px from Figma
  paddingVertical: primitive.spacing['2xs'], // 4px from Figma
  borderRadius: primitive.borderradius.pill, // 18px rounded pill from Figma
  alignItems: 'center',
  justifyContent: 'center',
});

const BadgeText = styled(Text, {
  name: 'BadgeText',
  ...typography.bodyS, // 12px, regular, line-height 16px from Figma
  color: semantic.color.text.inverse, // #fafafa from Figma
});

/**
 * Tab Component
 *
 * Navigation tab with optional badge indicator.
 *
 * @example
 * ```tsx
 * <Tab text="Label" state={true} showBadge={true} badgeText="3" />
 * <Tab text="Label" state={false} showBadge={false} />
 * ```
 */
export const Tab = React.forwardRef<TamaguiElement, TabProps>(
  (
    {
      text = 'Label',
      state = true,
      showBadge = true,
      badgeText = 'Badge',
      onPress,
    },
    ref
  ) => {
    return (
      <TabContainer
        ref={ref}
        state={state ? 'active' : 'inactive'}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <TabText>{text}</TabText>

        {showBadge && (
          <Badge>
            <BadgeText>{badgeText}</BadgeText>
          </Badge>
        )}
      </TabContainer>
    );
  }
);

Tab.displayName = 'Tab';
