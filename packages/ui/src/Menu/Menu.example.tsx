import React from 'react';
import { Stack, YStack, XStack, Text } from 'tamagui';
import { Menu } from './Menu';
import Svg, { Path, Circle } from 'react-native-svg';
import { primitive } from '@alo/theme';

// Example custom icons
const HomeIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12H15V22"
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

const BellIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({ color }: { color: string }) => (
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

/**
 * Menu Component Examples
 *
 * Demonstrates all props and variants of the Menu component
 */
export default function MenuExamples() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <YStack padding="$4" gap="$6" backgroundColor="$background">
      {/* Example 1: Basic States */}
      <YStack gap="$3">
        <Text fontWeight="bold" fontSize="$6">
          Basic States
        </Text>
        <XStack gap="$4" justifyContent="space-around" padding="$4" backgroundColor="white">
          <Menu active text="Active" />
          <Menu active={false} text="Inactive" />
        </XStack>
      </YStack>

      {/* Example 2: With Custom Icons */}
      <YStack gap="$3">
        <Text fontWeight="bold" fontSize="$6">
          With Custom Icons
        </Text>
        <XStack gap="$4" justifyContent="space-around" padding="$4" backgroundColor="white">
          <Menu
            active
            text="Home"
            icon={<HomeIcon color={primitive.color.brand.primary['900']} />}
          />
          <Menu
            active={false}
            text="Favorites"
            icon={<HeartIcon color={primitive.color.neutral.grey['900']} />}
          />
          <Menu
            active={false}
            text="Notifications"
            icon={<BellIcon color={primitive.color.neutral.grey['900']} />}
          />
          <Menu
            active={false}
            text="Profile"
            icon={<ProfileIcon color={primitive.color.neutral.grey['900']} />}
          />
        </XStack>
      </YStack>

      {/* Example 3: With and Without Indicators */}
      <YStack gap="$3">
        <Text fontWeight="bold" fontSize="$6">
          Indicators
        </Text>
        <XStack gap="$4" justifyContent="space-around" padding="$4" backgroundColor="white">
          <Menu active text="With Badge" showIndicators />
          <Menu active text="No Badge" showIndicators={false} />
        </XStack>
      </YStack>

      {/* Example 4: Interactive Bottom Navigation */}
      <YStack gap="$3">
        <Text fontWeight="bold" fontSize="$6">
          Interactive Bottom Navigation
        </Text>
        <XStack
          gap="$4"
          justifyContent="space-around"
          padding="$4"
          backgroundColor="white"
          borderTopWidth={1}
          borderTopColor="$borderColor"
        >
          <Menu
            active={activeTab === 0}
            text="Home"
            icon={
              <HomeIcon
                color={
                  activeTab === 0
                    ? primitive.color.brand.primary['900']
                    : primitive.color.neutral.grey['900']
                }
              />
            }
            showIndicators={false}
            onPress={() => setActiveTab(0)}
          />
          <Menu
            active={activeTab === 1}
            text="Favorites"
            icon={
              <HeartIcon
                color={
                  activeTab === 1
                    ? primitive.color.brand.primary['900']
                    : primitive.color.neutral.grey['900']
                }
              />
            }
            showIndicators={false}
            onPress={() => setActiveTab(1)}
          />
          <Menu
            active={activeTab === 2}
            text="Notifications"
            icon={
              <BellIcon
                color={
                  activeTab === 2
                    ? primitive.color.brand.primary['900']
                    : primitive.color.neutral.grey['900']
                }
              />
            }
            showIndicators
            onPress={() => setActiveTab(2)}
          />
          <Menu
            active={activeTab === 3}
            text="Profile"
            icon={
              <ProfileIcon
                color={
                  activeTab === 3
                    ? primitive.color.brand.primary['900']
                    : primitive.color.neutral.grey['900']
                }
              />
            }
            showIndicators={false}
            onPress={() => setActiveTab(3)}
          />
        </XStack>
      </YStack>

      {/* Example 5: All Variants Grid */}
      <YStack gap="$3">
        <Text fontWeight="bold" fontSize="$6">
          All Prop Combinations
        </Text>
        <YStack gap="$2" padding="$4" backgroundColor="white">
          <Text fontSize="$3" color="$gray10">Active + Default Icon + Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu active text="Search" showIndicators />
          </XStack>

          <Text fontSize="$3" color="$gray10">Active + Default Icon + No Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu active text="Search" showIndicators={false} />
          </XStack>

          <Text fontSize="$3" color="$gray10">Inactive + Default Icon + Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu active={false} text="Search" showIndicators />
          </XStack>

          <Text fontSize="$3" color="$gray10">Inactive + Default Icon + No Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu active={false} text="Search" showIndicators={false} />
          </XStack>

          <Text fontSize="$3" color="$gray10">Active + Custom Icon + Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu
              active
              text="Home"
              icon={<HomeIcon color={primitive.color.brand.primary['900']} />}
              showIndicators
            />
          </XStack>

          <Text fontSize="$3" color="$gray10">Inactive + Custom Icon + No Indicators</Text>
          <XStack justifyContent="center" paddingVertical="$2">
            <Menu
              active={false}
              text="Home"
              icon={<HomeIcon color={primitive.color.neutral.grey['900']} />}
              showIndicators={false}
            />
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
