import React, { useState } from 'react';
import { YStack, Text, Stack, XStack } from 'tamagui';
import { TopBar, TopBarTab } from './TopBar';

/**
 * TopBar Component Examples
 *
 * Demonstrates all props and variants of the TopBar component
 */
export default function TopBarExamples() {
  const [activeTab, setActiveTab] = useState<TopBarTab>('Stays');
  const [tabWithoutButton, setTabWithoutButton] = useState<TopBarTab>('Experiences');

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" gap="$6">
      <Stack>
        <Text fontSize="$6" fontWeight="bold">
          TopBar Component Examples
        </Text>
        <Text fontSize="$3" color="$gray10" marginTop="$2">
          Navigation bar with tabs for switching between Stays and Experiences
        </Text>
      </Stack>

      {/* Example 1: Interactive with Plus Button */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Interactive with Plus Button
        </Text>
        <Text fontSize="$3" color="$gray10">
          Current tab: <Text fontWeight="bold">{activeTab}</Text>
        </Text>
        <Stack backgroundColor="white" padding="$4" borderRadius="$3">
          <TopBar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              console.log('Tab changed to:', tab);
            }}
            onPlusPress={() => console.log('Plus button pressed')}
            showPlusButton
          />
        </Stack>
      </YStack>

      {/* Example 2: Without Plus Button */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Without Plus Button
        </Text>
        <Text fontSize="$3" color="$gray10">
          Current tab: <Text fontWeight="bold">{tabWithoutButton}</Text>
        </Text>
        <Stack backgroundColor="white" padding="$4" borderRadius="$3">
          <TopBar
            activeTab={tabWithoutButton}
            onTabChange={setTabWithoutButton}
            showPlusButton={false}
          />
        </Stack>
      </YStack>

      {/* Example 3: All States */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          All States
        </Text>
        <YStack gap="$4">
          <YStack gap="$2">
            <Text fontSize="$2" color="$gray10">Active Tab: Stays</Text>
            <Stack backgroundColor="white" padding="$4" borderRadius="$3">
              <TopBar activeTab="Stays" showPlusButton />
            </Stack>
          </YStack>

          <YStack gap="$2">
            <Text fontSize="$2" color="$gray10">Active Tab: Experiences</Text>
            <Stack backgroundColor="white" padding="$4" borderRadius="$3">
              <TopBar activeTab="Experiences" showPlusButton />
            </Stack>
          </YStack>

          <YStack gap="$2">
            <Text fontSize="$2" color="$gray10">Without Plus Button</Text>
            <Stack backgroundColor="white" padding="$4" borderRadius="$3">
              <TopBar activeTab="Stays" showPlusButton={false} />
            </Stack>
          </YStack>
        </YStack>
      </YStack>

      {/* Example 4: Props Documentation */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Props & Variants
        </Text>
        <Stack backgroundColor="white" padding="$4" borderRadius="$3" gap="$2">
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>activeTab:</Text>
            <Text flex={1} color="$gray10">'Stays' | 'Experiences'</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>onTabChange:</Text>
            <Text flex={1} color="$gray10">(tab: TopBarTab) =&gt; void</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>onPlusPress:</Text>
            <Text flex={1} color="$gray10">() =&gt; void</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>showPlusButton:</Text>
            <Text flex={1} color="$gray10">boolean (default: true)</Text>
          </XStack>
        </Stack>
      </YStack>

      {/* Example 5: Usage Example */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Usage Example
        </Text>
        <Stack backgroundColor="$gray2" padding="$3" borderRadius="$3">
          <Text fontFamily="$mono" fontSize="$2">
{`const [activeTab, setActiveTab] = useState<TopBarTab>('Stays');

<TopBar 
  activeTab={activeTab} 
  onTabChange={setActiveTab}
  onPlusPress={() => console.log('Add new')}
  showPlusButton
/>`}
          </Text>
        </Stack>
      </YStack>
    </YStack>
  );
}
