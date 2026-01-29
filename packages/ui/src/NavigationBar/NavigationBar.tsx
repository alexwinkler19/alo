import React from 'react';
import { Stack, styled, XStack, YStack } from 'tamagui';
import { primitive } from '@alo/theme';
import { Menu } from '../Menu';
import Svg, { Path, Circle } from 'react-native-svg';

export type NavigationBarState = 'Explore' | 'Wishlist' | 'Trips' | 'Inbox' | 'Profile';

export interface NavigationBarProps {
  /** Current active tab state */
  state?: NavigationBarState;
  /** Callback when a tab is pressed */
  onStateChange?: (state: NavigationBarState) => void;
}

// Icon components for each menu item
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

const HeartIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.09944 19.7228 3.69789 19.0554 3.42823C18.3879 3.15858 17.6725 3.02563 16.95 3.02563C16.2275 3.02563 15.5121 3.15858 14.8446 3.42823C14.1772 3.69789 13.5708 4.09944 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3506 11.8792 21.7521 11.2728 22.0218 10.6054C22.2914 9.93789 22.4244 9.22249 22.4244 8.5C22.4244 7.77751 22.2914 7.0621 22.0218 6.39464C21.7521 5.72718 21.3506 5.12075 20.84 4.61Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CarIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13L3 13C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14L2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18L5 18M19 13L21 13C21.2652 13 21.5196 13.1054 21.7071 13.2929C21.8946 13.4804 22 13.7348 22 14L22 17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18L19 18M5 18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20C7.53043 20 8.03914 19.7893 8.41421 19.4142C8.78929 19.0391 9 18.5304 9 18M5 18C5 17.4696 5.21071 16.9609 5.58579 16.5858C5.96086 16.2107 6.46957 16 7 16C7.53043 16 8.03914 16.2107 8.41421 16.5858C8.78929 16.9609 9 17.4696 9 18M19 18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20C16.4696 20 15.9609 19.7893 15.5858 19.4142C15.2107 19.0391 15 18.5304 15 18M19 18C19 17.4696 18.7893 16.9609 18.4142 16.5858C18.0391 16.2107 17.5304 16 17 16C16.4696 16 15.9609 16.2107 15.5858 16.5858C15.2107 16.9609 15 17.4696 15 18M9 18L15 18M5 13L5 6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5L18 5C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6L19 13M5 13L19 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MessageIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.60557 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47091C20.0052 6.94703 20.885 8.91568 21 11V11.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UserIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const NavContainer = styled(YStack, {
  name: 'NavigationBar',
  backgroundColor: primitive.color.white,
  borderTopWidth: primitive.borderwidth.subtle,
  borderTopColor: primitive.color.neutral.grey['300'], // #eee
  borderStyle: 'solid',
});

const MenuRow = styled(XStack, {
  name: 'MenuRow',
  backgroundColor: primitive.color.white,
  justifyContent: 'space-between',
  paddingHorizontal: primitive.spacing.xl, // 24px
  paddingVertical: primitive.spacing.sm, // 12px
  width: 375,
});

const HomeIndicatorContainer = styled(Stack, {
  name: 'HomeIndicatorContainer',
  backgroundColor: primitive.color.white,
  height: 21,
  width: 375,
  position: 'relative',
});

const HomeIndicatorBar = styled(Stack, {
  name: 'HomeIndicatorBar',
  backgroundColor: primitive.color.black,
  height: 5,
  width: 139,
  borderRadius: 100,
  position: 'absolute',
  bottom: 8,
  left: '50%',
  transform: [{ translateX: -69.5 }], // Half of 139
});

/**
 * NavigationBar Component
 *
 * Bottom navigation bar with 5 tabs: Explore, Wishlist, Trips, Inbox, and Profile.
 * Includes notification indicators and home indicator for iOS-style interfaces.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState<NavigationBarState>('Explore');
 * <NavigationBar state={activeTab} onStateChange={setActiveTab} />
 * ```
 */
export const NavigationBar = React.forwardRef<any, NavigationBarProps>(
  (
    {
      state = 'Explore',
      onStateChange,
    },
    ref
  ) => {
    const getIconColor = (tabState: NavigationBarState) => {
      return state === tabState
        ? primitive.color.brand.primary['900'] // Active: #c13969
        : primitive.color.neutral.grey['900']; // Inactive: #2c2c2c
    };

    return (
      <NavContainer ref={ref}>
        <MenuRow>
          <Menu
            active={state === 'Explore'}
            text="Explore"
            icon={<SearchIcon color={getIconColor('Explore')} />}
            showIndicators
            onPress={() => onStateChange?.('Explore')}
          />

          <Menu
            active={state === 'Wishlist'}
            text="Wishlist"
            icon={<HeartIcon color={getIconColor('Wishlist')} />}
            showIndicators
            onPress={() => onStateChange?.('Wishlist')}
          />

          <Menu
            active={state === 'Trips'}
            text="Trips"
            icon={<CarIcon color={getIconColor('Trips')} />}
            showIndicators
            onPress={() => onStateChange?.('Trips')}
          />

          <Menu
            active={state === 'Inbox'}
            text="Inbox"
            icon={<MessageIcon color={getIconColor('Inbox')} />}
            showIndicators
            onPress={() => onStateChange?.('Inbox')}
          />

          <Menu
            active={state === 'Profile'}
            text="Profile"
            icon={<UserIcon color={getIconColor('Profile')} />}
            showIndicators
            onPress={() => onStateChange?.('Profile')}
          />
        </MenuRow>

        <HomeIndicatorContainer>
          <HomeIndicatorBar />
        </HomeIndicatorContainer>
      </NavContainer>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';
