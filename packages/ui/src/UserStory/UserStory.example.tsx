import React from 'react';
import { YStack, XStack, Text, Stack } from 'tamagui';
import { UserStory, UserStoryType } from './UserStory';

/**
 * UserStory Component Examples
 *
 * Demonstrates all props and variants of the UserStory component
 */
export default function UserStoryExamples() {
  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" gap="$6">
      <Stack>
        <Text fontSize="$6" fontWeight="bold">
          UserStory Component Examples
        </Text>
        <Text fontSize="$3" color="$gray10" marginTop="$2">
          Instagram-style story component with gradient borders and live badges
        </Text>
      </Stack>

      {/* Example 1: All Story Types */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          All Story Types
        </Text>
        <XStack gap="$4" padding="$4" backgroundColor="white" borderRadius="$3">
          <YStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$gray10">Normal</Text>
            <UserStory
              storyType="Normal"
              userName="John Doe"
              onPress={() => console.log('View story')}
            />
          </YStack>

          <YStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$gray10">Live</Text>
            <UserStory
              storyType="Live"
              userName="Jane Smith"
              onPress={() => console.log('View live')}
            />
          </YStack>

          <YStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$gray10">Mine</Text>
            <UserStory
              storyType="Mine"
              userName="Your Story"
              onPress={() => console.log('Add story')}
            />
          </YStack>
        </XStack>
      </YStack>

      {/* Example 2: Interactive Stories Row */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Interactive Stories Row
        </Text>
        <Text fontSize="$3" color="$gray10">
          Tap any story to interact
        </Text>
        <XStack
          gap="$3"
          padding="$4"
          backgroundColor="white"
          borderRadius="$3"
          overflow="scroll"
        >
          <UserStory
            storyType="Mine"
            userName="Your Story"
            onPress={() => alert('Add your story')}
          />
          <UserStory
            storyType="Live"
            userName="Alice"
            onPress={() => alert('Watching Alice live')}
          />
          <UserStory
            storyType="Normal"
            userName="Bob"
            onPress={() => alert('Viewing Bob story')}
          />
          <UserStory
            storyType="Normal"
            userName="Charlie"
            onPress={() => alert('Viewing Charlie story')}
          />
          <UserStory
            storyType="Normal"
            userName="Diana"
            onPress={() => alert('Viewing Diana story')}
          />
        </XStack>
      </YStack>

      {/* Example 3: With Custom Names */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          With Custom User Names
        </Text>
        <XStack gap="$4" padding="$4" backgroundColor="white" borderRadius="$3" flexWrap="wrap">
          <UserStory
            storyType="Normal"
            userName="Adventure"
          />
          <UserStory
            storyType="Normal"
            userName="Travel"
          />
          <UserStory
            storyType="Live"
            userName="Concert"
          />
          <UserStory
            storyType="Normal"
            userName="Food"
          />
        </XStack>
      </YStack>

      {/* Example 4: Props Documentation */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Props & Variants
        </Text>
        <Stack backgroundColor="white" padding="$4" borderRadius="$3" gap="$2">
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>storyType:</Text>
            <Text flex={1} color="$gray10">'Normal' | 'Mine' | 'Live'</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>profileImage:</Text>
            <Text flex={1} color="$gray10">ImageSourcePropType | string</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>userName:</Text>
            <Text flex={1} color="$gray10">string (default: 'Your Story')</Text>
          </XStack>
          <XStack gap="$2">
            <Text fontWeight="bold" width={150}>onPress:</Text>
            <Text flex={1} color="$gray10">() =&gt; void</Text>
          </XStack>
        </Stack>
      </YStack>

      {/* Example 5: Features */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Features
        </Text>
        <Stack backgroundColor="white" padding="$4" borderRadius="$3" gap="$3">
          <YStack gap="$1">
            <Text fontWeight="bold">✨ Normal Story</Text>
            <Text fontSize="$3" color="$gray10">
              Gradient border ring with profile picture and user name
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontWeight="bold">🔴 Live Story</Text>
            <Text fontSize="$3" color="$gray10">
              Gradient border ring with "LIVE" badge at the bottom
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontWeight="bold">➕ Your Story</Text>
            <Text fontSize="$3" color="$gray10">
              Blue plus button for adding a new story
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontWeight="bold">📐 Dimensions</Text>
            <Text fontSize="$3" color="$gray10">
              Width: 57.6px, Height: 72.9px (includes text)
            </Text>
          </YStack>
          <YStack gap="$1">
            <Text fontWeight="bold">🎨 Gradient</Text>
            <Text fontSize="$3" color="$gray10">
              Instagram-style multi-color gradient border
            </Text>
          </YStack>
        </Stack>
      </YStack>

      {/* Example 6: Usage Code */}
      <YStack gap="$3">
        <Text fontSize="$5" fontWeight="600">
          Usage Example
        </Text>
        <Stack backgroundColor="$gray2" padding="$3" borderRadius="$3">
          <Text fontFamily="$mono" fontSize="$2">
{`// Normal story
<UserStory 
  storyType="Normal" 
  profileImage={require('./avatar.png')}
  userName="John Doe"
  onPress={() => console.log('View story')}
/>

// Live story
<UserStory 
  storyType="Live" 
  userName="Jane Smith"
/>

// Add your story
<UserStory 
  storyType="Mine" 
  userName="Your Story"
  onPress={() => console.log('Add story')}
/>`}
          </Text>
        </Stack>
      </YStack>
    </YStack>
  );
}
