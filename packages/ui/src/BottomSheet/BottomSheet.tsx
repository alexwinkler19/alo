import React from 'react';
import { Stack, Text, styled, TamaguiElement, ScrollView } from 'tamagui';
import { primitive, semantic } from '@alo/theme';
import { Svg, Path, Circle } from 'react-native-svg';

export type BottomSheetState = 'Search' | 'Result';

export interface LocationItem {
  id: string;
  name: string;
}

export interface BottomSheetProps {
  /** Bottom sheet state */
  state?: BottomSheetState;
  /** Search text */
  searchText?: string;
  /** Location results (for Result state) */
  locations?: LocationItem[];
  /** Close button handler */
  onClose?: () => void;
  /** Location item press handler */
  onLocationPress?: (location: LocationItem) => void;
}

const BottomSheetContainer = styled(Stack, {
  name: 'BottomSheet',
  backgroundColor: semantic.color.bg.primary, // white
  borderWidth: primitive.borderwidth.regular,
  borderColor: semantic.color.border.subtle, // #eeeeee
  borderStyle: 'solid',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: primitive.spacing.xl, // 24px from Figma
  borderTopLeftRadius: primitive.spacing.xl, // 24px from Figma
  borderTopRightRadius: primitive.spacing.xl, // 24px from Figma
  height: 702, // from Figma

  variants: {
    state: {
      Search: {},
      Result: {
        gap: primitive.spacing['2xl'], // 32px from Figma
      },
    },
  } as const,
});

const SearchBar = styled(Stack, {
  name: 'SearchBar',
  backgroundColor: semantic.color.interface.tertiary, // #fafafa from Figma
  flexDirection: 'row',
  alignItems: 'center',
  gap: primitive.spacing.md, // 16px from Figma
  paddingHorizontal: primitive.spacing.xl, // 24px from Figma
  paddingVertical: primitive.spacing.md, // 16px from Figma
  borderRadius: primitive.spacing.sm, // 12px from Figma
  width: 327, // from Figma

  variants: {
    state: {
      Search: {},
      Result: {
        height: 50,
      },
    },
  } as const,
});

const SearchIconContainer = styled(Stack, {
  name: 'SearchIconContainer',
  width: 18,
  height: 18,
  alignItems: 'center',
  justifyContent: 'center',
});

const CursorContainer = styled(Stack, {
  name: 'CursorContainer',
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: primitive.spacing['3xs'],
  width: 135,
});

const Cursor = styled(Stack, {
  name: 'Cursor',
  width: 2,
  height: 18,
  backgroundColor: semantic.color.interface.disabled, // #e0e0e0 from Figma
  borderRadius: primitive.spacing.xl, // 24px (pill)
  marginRight: -2,
});

const SearchText = styled(Text, {
  name: 'SearchText',
  flex: 1,
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  fontWeight: '600', // semibold
  lineHeight: primitive.lineheight.md, // 18px
  color: primitive.color.black,
  marginRight: -2,
});

const CloseButton = styled(Stack, {
  name: 'CloseButton',
  backgroundColor: semantic.color.interface.disabled, // #e0e0e0
  padding: primitive.spacing['2xs'], // 4px
  borderRadius: primitive.spacing.xl, // 24px (pill)
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

const LocationsContainer = styled(Stack, {
  name: 'LocationsContainer',
  flexDirection: 'column',
  gap: primitive.spacing.xl, // 24px from Figma
  alignItems: 'flex-start',
  width: '100%',
});

const LocationItem = styled(Stack, {
  name: 'LocationItem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: primitive.spacing.md, // 16px from Figma
  width: '100%',
  cursor: 'pointer',
});

const LocationIconContainer = styled(Stack, {
  name: 'LocationIconContainer',
  backgroundColor: semantic.color.interface.tertiary, // #fafafa
  padding: primitive.spacing.md, // 16px from Figma
  borderRadius: primitive.spacing.sm, // 12px from Figma
  alignItems: 'center',
  justifyContent: 'center',
});

const LocationText = styled(Text, {
  name: 'LocationText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.sm, // 16px from Figma
  fontWeight: '600', // semibold
  lineHeight: primitive.lineheight.lg, // 22px
  color: primitive.color.black,
});

// Search Icon Component
const SearchIcon: React.FC = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M15.75 15.75L12.4875 12.4875"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Close Icon Component
const CloseIcon: React.FC = () => (
  <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <Path
      d="M7.5 2.5L2.5 7.5"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 2.5L7.5 7.5"
      stroke={primitive.color.black}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Location Icon Component
const LocationIcon: React.FC = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
      stroke={primitive.color.black}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
      stroke={primitive.color.black}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

/**
 * BottomSheet Component
 *
 * Modal bottom sheet for search with location results.
 *
 * @example
 * ```tsx
 * <BottomSheet state="Search" searchText="Search destinations" />
 * <BottomSheet
 *   state="Result"
 *   searchText="Location"
 *   locations={[
 *     { id: '1', name: 'New York' },
 *     { id: '2', name: 'Los Angeles' },
 *   ]}
 *   onClose={() => {}}
 *   onLocationPress={(location) => console.log(location)}
 * />
 * ```
 */
export const BottomSheet = React.forwardRef<TamaguiElement, BottomSheetProps>(
  (
    {
      state = 'Search',
      searchText = state === 'Search' ? 'Search destinations' : 'Location',
      locations = [
        { id: '1', name: 'Location' },
        { id: '2', name: 'Location' },
        { id: '3', name: 'Location' },
        { id: '4', name: 'Location' },
        { id: '5', name: 'Location' },
      ],
      onClose,
      onLocationPress,
    },
    ref
  ) => {
    return (
      <BottomSheetContainer ref={ref} state={state}>
        <SearchBar state={state}>
          <SearchIconContainer>
            <SearchIcon />
          </SearchIconContainer>

          {state === 'Search' ? (
            <CursorContainer>
              <Cursor />
              <SearchText>{searchText}</SearchText>
            </CursorContainer>
          ) : (
            <>
              <SearchText>{searchText}</SearchText>
              <CloseButton onPress={onClose} pressStyle={{ opacity: 0.7 }}>
                <CloseIcon />
              </CloseButton>
            </>
          )}
        </SearchBar>

        {state === 'Result' && (
          <LocationsContainer>
            {locations.map((location) => (
              <LocationItem
                key={location.id}
                onPress={() => onLocationPress?.(location)}
                pressStyle={{ opacity: 0.7 }}
              >
                <LocationIconContainer>
                  <LocationIcon />
                </LocationIconContainer>
                <LocationText>{location.name}</LocationText>
              </LocationItem>
            ))}
          </LocationsContainer>
        )}
      </BottomSheetContainer>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
