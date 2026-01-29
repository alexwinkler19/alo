import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, semantic } from '@alo/theme';
import { Svg, Path, Circle } from 'react-native-svg';

export type PriceState = 'Default' | 'Icon';

export interface PriceProps {
  /** Price amount to display */
  price?: string;
  /** Dark mode styling */
  darkMode?: boolean;
  /** Show/hide heart icon */
  showIcon?: boolean;
  /** Component state - Default shows price, Icon shows notification badge */
  state?: PriceState;
  /** Press handler */
  onPress?: () => void;
}

const PriceContainer = styled(Stack, {
  name: 'Price',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,

  variants: {
    state: {
      Default: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: primitive.spacing['3xs'], // 2px from Figma
        paddingHorizontal: primitive.spacing.xs, // 8px from Figma
        paddingVertical: primitive.spacing['2xs'], // 4px from Figma
        borderRadius: primitive.spacing.xl, // 24px from Figma
      },
      Icon: {
        alignItems: 'flex-start',
        paddingRight: primitive.spacing['3xs'], // 2px from Figma
      },
    },
    darkMode: {
      true: {
        backgroundColor: primitive.color.black,
      },
      false: {
        backgroundColor: semantic.color.bg.primary, // white
      },
    },
  } as const,
});

const PriceText = styled(Text, {
  name: 'PriceText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  fontWeight: '500', // medium from Figma
  lineHeight: primitive.lineheight.md, // 18px from Figma

  variants: {
    darkMode: {
      true: {
        color: semantic.color.bg.primary, // white text on dark
      },
      false: {
        color: semantic.color.text.primary, // dark text on light
      },
    },
  } as const,
});

const IconContainer = styled(Stack, {
  name: 'IconContainer',
  width: 14,
  height: 14,
  alignItems: 'center',
  justifyContent: 'center',
});

const NotificationContainer = styled(Stack, {
  name: 'NotificationContainer',
  backgroundColor: semantic.color.bg.primary,
  flexDirection: 'row',
  gap: primitive.spacing.xs,
  alignItems: 'flex-start',
  padding: 7,
  borderRadius: primitive.spacing.xl, // 24px
  position: 'relative',
});

const NotificationBadge = styled(Stack, {
  name: 'NotificationBadge',
  position: 'absolute',
  top: -2,
  right: -2,
  width: 10,
  height: 10,
  backgroundColor: semantic.color.interface.brand,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: primitive.color.white,
  borderStyle: 'solid',
});

// Heart Icon Component
const HeartIcon: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => (
  <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <Path
      d="M7 12.25C7 12.25 1.75 9.625 1.75 5.6875C1.75 4.89511 2.06473 4.13528 2.62521 3.57479C3.1857 3.01431 3.94554 2.69958 4.7379 2.69958C5.53027 2.69958 6.2901 3.01431 6.85059 3.57479L7 3.72421L7.14941 3.57479C7.7099 3.01431 8.46973 2.69958 9.2621 2.69958C10.0545 2.69958 10.8143 3.01431 11.3748 3.57479C11.9353 4.13528 12.25 4.89511 12.25 5.6875C12.25 9.625 7 12.25 7 12.25Z"
      fill={darkMode ? primitive.color.white : semantic.color.interface.brand}
      stroke={darkMode ? primitive.color.white : semantic.color.interface.brand}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Block/Notification Icon Component
const BlockIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M3.5 3.5L12.5 12.5"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Price Component
 *
 * Displays price with optional heart icon or notification badge.
 *
 * @example
 * ```tsx
 * <Price price="$447" state="Default" darkMode={false} showIcon={true} />
 * <Price price="$1,700" state="Default" darkMode={true} showIcon={true} />
 * <Price state="Icon" />
 * ```
 */
export const Price = React.forwardRef<TamaguiElement, PriceProps>(
  (
    {
      price = '$447',
      darkMode = false,
      showIcon = true,
      state = 'Default',
      onPress,
    },
    ref
  ) => {
    if (state === 'Icon') {
      return (
        <Stack position="relative">
          <NotificationContainer onPress={onPress} pressStyle={{ opacity: 0.8 }}>
            <BlockIcon />
            <NotificationBadge />
          </NotificationContainer>
          {/* Pointer triangle at bottom */}
          <Stack
            position="absolute"
            bottom={-3.5}
            left="50%"
            marginLeft={0.25}
            width={7.5}
            height={4}
            transform={[{ translateX: -3.75 }]}
          >
            <Svg width="7.5" height="4" viewBox="0 0 7.5 4">
              <Path
                d="M0 4L3.75 0L7.5 4Z"
                fill={primitive.color.white}
              />
            </Svg>
          </Stack>
        </Stack>
      );
    }

    return (
      <PriceContainer
        ref={ref}
        state={state}
        darkMode={darkMode}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <PriceText darkMode={darkMode}>{price}</PriceText>

        {showIcon && (
          <IconContainer>
            <HeartIcon darkMode={darkMode} />
          </IconContainer>
        )}
      </PriceContainer>
    );
  }
);

Price.displayName = 'Price';
