import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, semantic } from '@alo/theme';
import { Svg, Path, Line, Circle } from 'react-native-svg';

export type SearchBarState = 'Default' | 'Searching' | 'Result';

export interface SearchProps {
  /** Placeholder or search text */
  text?: string;
  /** Search bar state */
  searchBar?: SearchBarState;
  /** Press handler */
  onPress?: () => void;
  /** Close button handler (for Result state) */
  onClose?: () => void;
}

const SearchContainer = styled(Stack, {
  name: 'Search',
  flexDirection: 'row',
  alignItems: 'center',
  gap: primitive.spacing.md, // 16px from Figma
  paddingHorizontal: primitive.spacing.xl, // 24px from Figma
  paddingVertical: primitive.spacing.md, // 16px from Figma
  borderRadius: primitive.spacing.sm, // 12px from Figma
  width: 279, // from Figma

  variants: {
    searchBar: {
      Default: {
        backgroundColor: semantic.color.bg.primary, // white from Figma
        borderWidth: primitive.borderwidth.regular, // 1px
        borderColor: semantic.color.border.default, // #bdbdbd from Figma
        borderStyle: 'solid',
      },
      Searching: {
        backgroundColor: semantic.color.bg.secondary, // #fafafa from Figma
      },
      Result: {
        backgroundColor: semantic.color.bg.secondary, // #fafafa from Figma
        height: 50,
      },
    },
  } as const,
});

const IconContainer = styled(Stack, {
  name: 'IconContainer',
  width: 18,
  height: 18,
  alignItems: 'center',
  justifyContent: 'center',
});

const SearchText = styled(Text, {
  name: 'SearchText',
  flex: 1,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  lineHeight: primitive.lineheight.md, // 18px from Figma
  fontFamily: primitive.fontfamily.heading,

  variants: {
    searchBar: {
      Default: {
        fontWeight: '500', // medium from Figma
        color: semantic.color.text.tertiary, // #9e9e9e from Figma (placeholder)
      },
      Searching: {
        fontWeight: '600', // semibold from Figma
        color: semantic.color.text.primary, // #2c2c2c from Figma
      },
      Result: {
        fontWeight: '600', // semibold from Figma
        color: semantic.color.text.primary, // #2c2c2c from Figma
      },
    },
  } as const,
});

const CursorContainer = styled(Stack, {
  name: 'CursorContainer',
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: primitive.spacing['3xs'],
});

const Cursor = styled(Stack, {
  name: 'Cursor',
  width: 2,
  height: 18,
  backgroundColor: semantic.color.interface.disabled, // #e0e0e0 from Figma
  borderRadius: primitive.spacing.xl, // 24px (pill) from Figma
  marginRight: -2,
});

const CloseButton = styled(Stack, {
  name: 'CloseButton',
  backgroundColor: semantic.color.interface.disabled, // #e0e0e0 from Figma
  padding: primitive.spacing['2xs'], // 4px from Figma
  borderRadius: primitive.spacing.xl, // 24px (pill) from Figma
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
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

/**
 * Search Component
 *
 * Search input with multiple states: default, searching, and result.
 *
 * @example
 * ```tsx
 * <Search text="Search destinations" searchBar="Default" />
 * <Search text="Search destinations" searchBar="Searching" />
 * <Search text="Italy" searchBar="Result" onClose={() => {}} />
 * ```
 */
export const Search = React.forwardRef<TamaguiElement, SearchProps>(
  (
    {
      text = 'Search destinations',
      searchBar = 'Default',
      onPress,
      onClose,
    },
    ref
  ) => {
    return (
      <SearchContainer
        ref={ref}
        searchBar={searchBar}
        onPress={onPress}
        pressStyle={{ opacity: 0.9 }}
      >
        <IconContainer>
          <SearchIcon />
        </IconContainer>

        {searchBar === 'Searching' ? (
          <CursorContainer>
            <Cursor />
            <SearchText searchBar={searchBar} marginRight={-2}>
              {text}
            </SearchText>
          </CursorContainer>
        ) : (
          <SearchText searchBar={searchBar}>{text}</SearchText>
        )}

        {searchBar === 'Result' && (
          <CloseButton onPress={onClose} pressStyle={{ opacity: 0.7 }}>
            <CloseIcon />
          </CloseButton>
        )}
      </SearchContainer>
    );
  }
);

Search.displayName = 'Search';
