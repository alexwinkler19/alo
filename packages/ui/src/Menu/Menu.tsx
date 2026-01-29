import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography } from '@alo/theme';
import Svg, { Path } from 'react-native-svg';

export interface MenuProps {
  /** Whether the menu item is active/selected */
  active?: boolean;
  /** Custom icon element to display */
  icon?: React.ReactNode | null;
  /** Show/hide the notification indicator badge */
  showIndicators?: boolean;
  /** Text label for the menu item */
  text?: string;
  /** Press handler */
  onPress?: () => void;
}

// Default search icon component
const SearchIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MenuContainer = styled(Stack, {
  name: 'Menu',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  position: 'relative',
  cursor: 'pointer',
});

const IconContainer = styled(Stack, {
  name: 'MenuIcon',
  width: 24,
  height: 24,
  overflow: 'hidden',
  flexShrink: 0,
});

const MenuText = styled(Text, {
  name: 'MenuText',
  ...typography.bodyS, // 12px font size, 16px line height
  flexShrink: 0,

  variants: {
    active: {
      true: {
        fontWeight: '500', // Medium
        color: primitive.color.brand.primary['900'], // #c13969
      },
      false: {
        fontWeight: '600', // Semibold
        color: primitive.color.neutral.grey['900'], // #2c2c2c
      },
    },
  } as const,
});

const IndicatorBadge = styled(Stack, {
  name: 'IndicatorBadge',
  position: 'absolute',
  top: -2,
  left: '50%',
  marginLeft: 16.5, // Offset to position at top-right of icon (40.5px from left - 24px icon width / 2)
  width: 8,
  height: 8,
  borderRadius: 999,
  backgroundColor: primitive.color.brand.primary['900'], // #c13969
});

/**
 * Menu Component
 *
 * Bottom navigation menu item that shows an icon and label.
 * Supports active/inactive states and optional notification indicator.
 *
 * @example
 * ```tsx
 * <Menu active text="Home" onPress={() => {}} />
 * <Menu active={false} text="Search" icon={<CustomIcon />} />
 * <Menu active text="Notifications" showIndicators onPress={() => {}} />
 * ```
 */
export const Menu = React.forwardRef<TamaguiElement, MenuProps>(
  (
    {
      active = true,
      icon = null,
      showIndicators = true,
      text = 'Label',
      onPress,
    },
    ref
  ) => {
    const iconColor = active
      ? primitive.color.brand.primary['900'] // #c13969 for active
      : primitive.color.neutral.grey['900']; // #2c2c2c for inactive

    return (
      <MenuContainer
        ref={ref}
        onPress={onPress}
        pressStyle={{ opacity: 0.7 }}
      >
        <IconContainer>
          {icon || <SearchIcon color={iconColor} />}
        </IconContainer>

        <MenuText active={active}>{text}</MenuText>

        {showIndicators && <IndicatorBadge />}
      </MenuContainer>
    );
  }
);

Menu.displayName = 'Menu';
