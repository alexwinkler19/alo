import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, semantic } from '@alo/theme';
import { Svg, Path, Rect } from 'react-native-svg';

export interface MonthProps {
  /** Month name */
  month?: string;
  /** Year */
  year?: string;
  /** Active/selected state */
  state?: boolean;
  /** Press handler */
  onPress?: () => void;
}

const MonthContainer = styled(Stack, {
  name: 'Month',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 15, // 15px from Figma
  paddingHorizontal: primitive.spacing['3xl'], // 40px from Figma
  paddingVertical: primitive.spacing.xl + 4, // 28px from Figma
  borderRadius: primitive.spacing.md, // 16px from Figma
  borderStyle: 'solid',
  cursor: 'pointer',

  variants: {
    state: {
      active: {
        backgroundColor: '#f7f7f7', // from Figma
        borderWidth: primitive.borderwidth.prominent, // 2px from Figma
        borderColor: '#0a0a0a', // from Figma
      },
      inactive: {
        backgroundColor: primitive.color.white, // white from Figma
        borderWidth: primitive.borderwidth.regular, // 1px
        borderColor: '#d8dce0', // from Figma
      },
    },
  } as const,
});

const IconContainer = styled(Stack, {
  name: 'IconContainer',
  width: 28,
  height: 28,
  alignItems: 'center',
  justifyContent: 'center',
});

const TextContainer = styled(Stack, {
  name: 'TextContainer',
  flexDirection: 'column',
  gap: primitive.spacing['3xs'], // 2px from Figma
  alignItems: 'center',
});

const MonthText = styled(Text, {
  name: 'MonthText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  fontWeight: '500', // medium from Figma
  lineHeight: primitive.lineheight.md, // 18px from Figma
  color: '#0a0a0a', // from Figma
});

const YearText = styled(Text, {
  name: 'YearText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize['2xs'], // 12px from Figma
  fontWeight: '600', // semibold from Figma
  lineHeight: primitive.lineheight.sm, // 16px from Figma
  color: '#717375', // from Figma
});

// Calendar Icon Component
const CalendarIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.33333 3.5C9.33333 2.94772 8.88562 2.5 8.33333 2.5C7.78105 2.5 7.33333 2.94772 7.33333 3.5V4.66667H6.16667C4.78596 4.66667 3.66667 5.78596 3.66667 7.16667V9.33333V11.5V21C3.66667 22.3807 4.78596 23.5 6.16667 23.5H21.8333C23.214 23.5 24.3333 22.3807 24.3333 21V11.5V9.33333V7.16667C24.3333 5.78596 23.214 4.66667 21.8333 4.66667H20.6667V3.5C20.6667 2.94772 20.219 2.5 19.6667 2.5C19.1144 2.5 18.6667 2.94772 18.6667 3.5V4.66667H9.33333V3.5ZM22.3333 11.5V9.33333H5.66667V11.5H22.3333ZM5.66667 13.5V21C5.66667 21.2761 5.89052 21.5 6.16667 21.5H21.8333C22.1095 21.5 22.3333 21.2761 22.3333 21V13.5H5.66667Z"
      fill={active ? '#0a0a0a' : '#717375'}
    />
  </Svg>
);

/**
 * Month Component
 *
 * Month and year selector card with calendar icon.
 *
 * @example
 * ```tsx
 * <Month month="June" year="2023" state={true} />
 * <Month month="June" year="2023" state={false} />
 * ```
 */
export const Month = React.forwardRef<TamaguiElement, MonthProps>(
  (
    {
      month = 'June',
      year = '2023',
      state = false,
      onPress,
    },
    ref
  ) => {
    return (
      <MonthContainer
        ref={ref}
        state={state ? 'active' : 'inactive'}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <IconContainer>
          <CalendarIcon active={state} />
        </IconContainer>

        <TextContainer>
          <MonthText>{month}</MonthText>
          <YearText>{year}</YearText>
        </TextContainer>
      </MonthContainer>
    );
  }
);

Month.displayName = 'Month';
