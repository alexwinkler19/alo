import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, semantic } from '@alo/theme';
import { Svg, Path, Circle } from 'react-native-svg';

export type BottomBarState = 'Search' | 'Reserve' | 'Step' | 'Step v2';

export interface BottomBarProps {
  /** Bottom bar state */
  state?: BottomBarState;
  /** Price per night (for Reserve state) */
  price?: string;
  /** Date range text (for Reserve state) */
  dateRange?: string;
  /** Primary button text */
  primaryButtonText?: string;
  /** Secondary button text */
  secondaryButtonText?: string;
  /** Primary button handler */
  onPrimaryPress?: () => void;
  /** Secondary button handler */
  onSecondaryPress?: () => void;
}

const BottomBarContainer = styled(Stack, {
  name: 'BottomBar',

  variants: {
    state: {
      Search: {
        backgroundColor: semantic.color.bg.primary, // white
        borderTopWidth: primitive.borderwidth.regular,
        borderTopColor: '#d8dce0', // from Figma
        borderStyle: 'solid',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      Reserve: {
        backgroundColor: primitive.color.white,
        borderTopWidth: primitive.borderwidth.regular,
        borderTopColor: '#d8dce0', // from Figma
        borderStyle: 'solid',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      Step: {
        backgroundColor: semantic.color.bg.primary, // white
        borderTopWidth: primitive.borderwidth.regular,
        borderTopColor: semantic.color.border.subtle, // #eeeeee
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: primitive.spacing.xl, // 24px
        paddingVertical: primitive.spacing.md, // 16px
        width: 327,
      },
      'Step v2': {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  } as const,
});

const ContentContainer = styled(Stack, {
  name: 'ContentContainer',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: primitive.spacing.xl, // 24px from Figma
  width: 375,

  variants: {
    state: {
      Search: {},
      Reserve: {
        backgroundColor: primitive.color.white,
      },
      Step: {},
      'Step v2': {
        backgroundColor: semantic.color.bg.primary,
        borderTopWidth: primitive.borderwidth.regular,
        borderTopColor: semantic.color.border.subtle,
        borderStyle: 'solid',
        width: '100%' as any,
      },
    },
  } as const,
});

const PriceContainer = styled(Stack, {
  name: 'PriceContainer',
  flexDirection: 'column',
  gap: 6,
  alignItems: 'flex-start',
});

const PriceRow = styled(Stack, {
  name: 'PriceRow',
  flexDirection: 'row',
  gap: primitive.spacing['3xs'], // 2px
  alignItems: 'center',
});

const PriceAmount = styled(Text, {
  name: 'PriceAmount',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.md, // 18px from Figma
  fontWeight: '500', // medium
  lineHeight: primitive.lineheight.xl, // 24px
  color: primitive.color.black,
});

const PriceUnit = styled(Text, {
  name: 'PriceUnit',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  fontWeight: '600', // semibold
  lineHeight: primitive.lineheight.md, // 18px
  color: primitive.color.black,
});

const UnderlineButton = styled(Stack, {
  name: 'UnderlineButton',
  borderBottomWidth: primitive.borderwidth.regular,
  borderBottomColor: '#0a0a0a',
  borderStyle: 'solid',
  cursor: 'pointer',
});

const UnderlineButtonText = styled(Text, {
  name: 'UnderlineButtonText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma (for dates)
  fontWeight: '500', // medium
  lineHeight: primitive.lineheight.md, // 18px
  color: primitive.color.black,

  variants: {
    large: {
      true: {
        fontSize: primitive.fontsize.sm, // 16px
        lineHeight: primitive.lineheight.lg, // 20-22px
      },
    },
  } as const,
});

const PrimaryButton = styled(Stack, {
  name: 'PrimaryButton',
  backgroundColor: semantic.color.interface.brand, // #c13969
  flexDirection: 'row',
  gap: primitive.spacing.xs,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: primitive.spacing.xl, // 24px
  paddingVertical: primitive.spacing.sm, // 12px
  borderRadius: primitive.borderradius['2xs'], // 6px
  cursor: 'pointer',
});

const PrimaryButtonText = styled(Text, {
  name: 'PrimaryButtonText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.sm, // 16px from Figma
  fontWeight: '500', // medium
  lineHeight: primitive.lineheight.lg, // 22px
  color: semantic.color.bg.primary, // white
});

const DarkButton = styled(Stack, {
  name: 'DarkButton',
  backgroundColor: '#0a0a0a',
  flexDirection: 'row',
  gap: primitive.spacing.xs,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: primitive.spacing['4xl'], // 48px
  paddingVertical: primitive.spacing.sm + 2, // 14px
  borderRadius: primitive.borderradius.xs, // 8px
  cursor: 'pointer',

  variants: {
    fullWidth: {
      true: {
        flex: 1,
        minWidth: 0,
      },
    },
  } as const,
});

const DarkButtonText = styled(Text, {
  name: 'DarkButtonText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.sm, // 16px
  fontWeight: '500', // medium
  lineHeight: primitive.lineheight.lg, // 22px
  color: semantic.color.bg.primary, // white
});

const HomeIndicator = styled(Stack, {
  name: 'HomeIndicator',
  backgroundColor: semantic.color.bg.primary, // white
  height: 21,
  width: 375,
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: 8,
});

const HomeIndicatorBar = styled(Stack, {
  name: 'HomeIndicatorBar',
  backgroundColor: primitive.color.black,
  height: 5,
  width: 139,
  borderRadius: 100,
});

// Search Icon Component
const SearchIcon: React.FC = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke={primitive.color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M14 14L11.1 11.1"
      stroke={primitive.color.white}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * BottomBar Component
 *
 * Bottom navigation bar with multiple states for search, reserve, and steps.
 *
 * @example
 * ```tsx
 * <BottomBar state="Search" primaryButtonText="Search" secondaryButtonText="Clear all" />
 * <BottomBar state="Reserve" price="$32" dateRange="Feb 13 - 14" primaryButtonText="Reserve" />
 * <BottomBar state="Step" primaryButtonText="Next" secondaryButtonText="Skip" />
 * <BottomBar state="Step v2" primaryButtonText="Next" />
 * ```
 */
export const BottomBar = React.forwardRef<TamaguiElement, BottomBarProps>(
  (
    {
      state = 'Search',
      price = '$32',
      dateRange = 'Feb 13 - 14',
      primaryButtonText = state === 'Reserve' ? 'Reserve' : state === 'Search' ? 'Search' : 'Next',
      secondaryButtonText = state === 'Search' ? 'Clear all' : 'Skip',
      onPrimaryPress,
      onSecondaryPress,
    },
    ref
  ) => {
    if (state === 'Step') {
      return (
        <BottomBarContainer ref={ref} state={state}>
          <UnderlineButton onPress={onSecondaryPress} pressStyle={{ opacity: 0.7 }}>
            <UnderlineButtonText large>{secondaryButtonText}</UnderlineButtonText>
          </UnderlineButton>

          <DarkButton onPress={onPrimaryPress} pressStyle={{ opacity: 0.9 }}>
            <DarkButtonText>{primaryButtonText}</DarkButtonText>
          </DarkButton>
        </BottomBarContainer>
      );
    }

    return (
      <BottomBarContainer ref={ref} state={state}>
        <ContentContainer state={state}>
          {state === 'Reserve' && (
            <PriceContainer>
              <PriceRow>
                <PriceAmount>{price}</PriceAmount>
                <PriceUnit>night</PriceUnit>
              </PriceRow>

              <UnderlineButton pressStyle={{ opacity: 0.7 }}>
                <UnderlineButtonText>{dateRange}</UnderlineButtonText>
              </UnderlineButton>
            </PriceContainer>
          )}

          {state === 'Search' && (
            <UnderlineButton onPress={onSecondaryPress} pressStyle={{ opacity: 0.7 }}>
              <UnderlineButtonText large>{secondaryButtonText}</UnderlineButtonText>
            </UnderlineButton>
          )}

          {state === 'Search' ? (
            <PrimaryButton onPress={onPrimaryPress} pressStyle={{ opacity: 0.9 }}>
              <SearchIcon />
              <PrimaryButtonText>{primaryButtonText}</PrimaryButtonText>
            </PrimaryButton>
          ) : state === 'Reserve' ? (
            <PrimaryButton onPress={onPrimaryPress} pressStyle={{ opacity: 0.9 }}>
              <PrimaryButtonText>{primaryButtonText}</PrimaryButtonText>
            </PrimaryButton>
          ) : (
            <DarkButton fullWidth onPress={onPrimaryPress} pressStyle={{ opacity: 0.9 }}>
              <DarkButtonText>{primaryButtonText}</DarkButtonText>
            </DarkButton>
          )}
        </ContentContainer>

        <HomeIndicator>
          <HomeIndicatorBar />
        </HomeIndicator>
      </BottomBarContainer>
    );
  }
);

BottomBar.displayName = 'BottomBar';
