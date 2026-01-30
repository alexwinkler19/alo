import React from 'react';
import { Stack, styled, XStack, YStack } from 'tamagui';
import { primitive } from '@alo/theme';
import { Menu } from '../Menu';
import Svg, { Path, Circle } from 'react-native-svg';

export type NavigationBarState = 'Explore' | 'Liked' | 'Trips' | 'Inbox' | 'Profile';

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

const GlobeIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M2 12H22"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
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
            active={state === 'Liked'}
            text="Liked"
            icon={<HeartIcon color={getIconColor('Liked')} />}
            showIndicators
            onPress={() => onStateChange?.('Liked')}
          />

          <Menu
            active={state === 'Trips'}
            text="Trips"
            icon={<GlobeIcon color={getIconColor('Trips')} />}
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
