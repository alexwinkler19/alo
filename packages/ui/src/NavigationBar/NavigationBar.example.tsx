import React, { useState } from 'react';
import { YStack, Text, Stack } from 'tamagui';
import { NavigationBar, NavigationBarState } from './NavigationBar';

/**
 * NavigationBar Component Examples
 *
 * Demonstrates all props and variants of the NavigationBar component
 */
export default function NavigationBarExamples() {
  const [activeTab, setActiveTab] = useState<NavigationBarState>('Explore');

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header showing current state */}
      <Stack padding="$4" backgroundColor="white" borderBottomWidth={1} borderBottomColor="$borderColor">
        <Text fontSize="$6" fontWeight="bold">
          Navigation Bar Examples
        </Text>
        <Text fontSize="$4" color="$gray10" marginTop="$2">
          Current active tab: <Text fontWeight="bold" color="$brand">{activeTab}</Text>
        </Text>
      </Stack>

      {/* Content area */}
      <YStack flex={1} padding="$4" gap="$6">
        <Text fontSize="$5" fontWeight="600">
          Interactive Example
        </Text>
        <Text fontSize="$3" color="$gray10">
          Tap any tab in the navigation bar below to change the active state.
        </Text>

        {/* Content that changes based on active tab */}
        <Stack
          padding="$6"
          backgroundColor="white"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
        >
          {activeTab === 'Explore' && (
            <YStack gap="$2">
              <Text fontSize="$7" fontWeight="bold">🔍 Explore</Text>
              <Text color="$gray10">Discover new places and experiences</Text>
            </YStack>
          )}
          {activeTab === 'Wishlist' && (
            <YStack gap="$2">
              <Text fontSize="$7" fontWeight="bold">❤️ Wishlist</Text>
              <Text color="$gray10">Your saved favorites</Text>
            </YStack>
          )}
          {activeTab === 'Trips' && (
            <YStack gap="$2">
              <Text fontSize="$7" fontWeight="bold">🚗 Trips</Text>
              <Text color="$gray10">Your upcoming and past trips</Text>
            </YStack>
          )}
          {activeTab === 'Inbox' && (
            <YStack gap="$2">
              <Text fontSize="$7" fontWeight="bold">💬 Inbox</Text>
              <Text color="$gray10">Messages and notifications</Text>
            </YStack>
          )}
          {activeTab === 'Profile' && (
            <YStack gap="$2">
              <Text fontSize="$7" fontWeight="bold">👤 Profile</Text>
              <Text color="$gray10">Your account settings</Text>
            </YStack>
          )}
        </Stack>

        {/* All States Display */}
        <YStack gap="$4" marginTop="$4">
          <Text fontSize="$5" fontWeight="600">
            All States
          </Text>
          <Text fontSize="$3" color="$gray10">
            All 5 possible states of the navigation bar
          </Text>

          <YStack gap="$4">
            <YStack gap="$2">
              <Text fontSize="$2" color="$gray10">State: Explore</Text>
              <NavigationBar state="Explore" />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$2" color="$gray10">State: Wishlist</Text>
              <NavigationBar state="Wishlist" />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$2" color="$gray10">State: Trips</Text>
              <NavigationBar state="Trips" />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$2" color="$gray10">State: Inbox</Text>
              <NavigationBar state="Inbox" />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$2" color="$gray10">State: Profile</Text>
              <NavigationBar state="Profile" />
            </YStack>
          </YStack>
        </YStack>
      </YStack>

      {/* Interactive Navigation Bar at bottom */}
      <NavigationBar state={activeTab} onStateChange={setActiveTab} />
    </YStack>
  );
}
