import React, { useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { YStack, XStack, ScrollView, Stack, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TopBar,
  TopBarTab,
  UserStory,
  PhotoInsta,
  NavigationBar,
  NavigationBarState
} from '@alo/ui';
import { primitive } from '@alo/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Explore'>;

/**
 * Styled Components
 */
const ScreenContainer = styled(YStack, {
  name: 'ExploreScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
});

const StoriesSection = styled(YStack, {
  name: 'StoriesSection',
  backgroundColor: primitive.color.white,
  paddingVertical: 16,
  borderBottomWidth: 0.5,
  borderBottomColor: '#EEEEEE',
  marginTop: 8,
});

const StoriesScroll = styled(ScrollView, {
  name: 'StoriesScroll',
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  paddingHorizontal: 8,
});

/**
 * Sample Data
 *
 * In production, this would come from an API/service.
 */
const sampleStories = [
  { id: '1', type: 'Mine' as const, userName: 'Your Story' },
  { id: '2', type: 'Normal' as const, userName: 'Arthur' },
  { id: '3', type: 'Normal' as const, userName: 'Sarah' },
  { id: '4', type: 'Normal' as const, userName: 'Nicolas' },
  { id: '5', type: 'Normal' as const, userName: 'Clarissa' },
  { id: '6', type: 'Live' as const, userName: 'Vanessa' },
  { id: '7', type: 'Normal' as const, userName: 'Alex' },
  { id: '8', type: 'Normal' as const, userName: 'Emma' },
  { id: '9', type: 'Normal' as const, userName: 'Lucas' },
  { id: '10', type: 'Normal' as const, userName: 'Sophie' },
];

const samplePosts = [
  {
    id: '1',
    size: 'Landscape' as const,
    user: { name: 'Vanessa', location: 'Annecy' },
    images: ['https://picsum.photos/seed/ski1/800/600'],
    likedBy: 'Sarah & 32 others',
    caption: {
      username: 'Vanessa',
      text: 'Looking for 3 people to join me for a skitour - check the details in the app',
      hashtags: ['#skiing'],
    },
    commentCount: 12,
  },
  {
    id: '2',
    size: 'Portrait' as const,
    sponsored: true,
    carousel: true,
    user: { name: 'Mountain Resort', location: 'Alps' },
    images: [
      'https://picsum.photos/seed/resort1/800/1000',
      'https://picsum.photos/seed/resort2/800/1000',
      'https://picsum.photos/seed/resort3/800/1000',
    ],
    likedBy: 'John & 45 others',
    caption: {
      username: 'Mountain Resort',
      text: 'Experience the best skiing this winter!',
      hashtags: ['#ski', '#winter'],
    },
    commentCount: 23,
    currentImageIndex: 1,
  },
  {
    id: '3',
    size: 'Square' as const,
    user: { name: 'Alex', location: 'Chamonix' },
    images: ['https://picsum.photos/seed/powder1/800/800'],
    likedBy: 'Emma & 18 others',
    caption: {
      username: 'Alex',
      text: 'Perfect powder day!',
      hashtags: ['#powder'],
    },
    commentCount: 8,
  },
  {
    id: '4',
    size: 'Portrait' as const,
    carousel: true,
    user: { name: 'Sarah', location: "Val d'Isère" },
    images: [
      'https://picsum.photos/seed/summit1/800/1000',
      'https://picsum.photos/seed/summit2/800/1000',
      'https://picsum.photos/seed/summit3/800/1000',
      'https://picsum.photos/seed/summit4/800/1000',
    ],
    likedBy: 'Nicolas & 56 others',
    caption: {
      username: 'Sarah',
      text: 'Amazing views from the summit',
      hashtags: ['#summit', '#views'],
    },
    commentCount: 34,
    currentImageIndex: 2,
  },
  {
    id: '5',
    size: 'Landscape' as const,
    sponsored: true,
    user: { name: 'Ski Academy', location: 'Megève' },
    images: ['https://picsum.photos/seed/lessons1/800/600'],
    likedBy: 'Lucas & 67 others',
    caption: {
      username: 'Ski Academy',
      text: 'Join our ski lessons this season',
      hashtags: ['#lessons'],
    },
    commentCount: 19,
  },
  {
    id: '6',
    size: 'Square' as const,
    user: { name: 'Emma', location: 'Courchevel' },
    images: ['https://picsum.photos/seed/sunset1/800/800'],
    likedBy: 'Sophie & 29 others',
    caption: {
      username: 'Emma',
      text: 'Sunset skiing is the best',
      hashtags: ['#sunset'],
    },
    commentCount: 15,
  },
];

/**
 * ExploreScreen Component
 *
 * Main explore/feed screen showing:
 * - Top navigation with tabs (Stays, Experience, Groups)
 * - Horizontal scrollable user stories
 * - Vertical feed of photo posts
 * - Bottom navigation bar
 */
export default function ExploreScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TopBarTab>('Stays');
  const [activeNavTab] = useState<NavigationBarState>('Explore');

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Wishlist') navigation.navigate('Wishlist');
    else if (tab === 'Inbox') navigation.navigate('Inbox');
    else if (tab === 'Profile') navigation.navigate('Profile');
  };

  const handleStoryPress = (userName: string) => {
    console.log('Story pressed:', userName);
  };

  const renderPost = ({ item }: { item: (typeof samplePosts)[0] }) => (
    <PhotoInsta
      size={item.size}
      sponsored={item.sponsored}
      carousel={item.carousel}
      user={item.user}
      images={item.images}
      likedBy={item.likedBy}
      caption={item.caption}
      commentCount={item.commentCount}
      currentImageIndex={item.currentImageIndex}
      onLike={() => console.log('Like:', item.id)}
      onComment={() => console.log('Comment:', item.id)}
      onShare={() => console.log('Share:', item.id)}
      onBookmark={() => console.log('Bookmark:', item.id)}
      onLearnMore={() => console.log('Learn more:', item.id)}
    />
  );

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />

      {/* Safe area top padding */}
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      {/* Top Bar with Tabs */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPlusPress={() => navigation.navigate('Search')}
        showPlusButton
      />

      {/* Content with Stories and Feed */}
      <ContentContainer>
        {/* Stories Section */}
        <StoriesSection>
          <StoriesScroll>
            <XStack gap={16}>
              {sampleStories.map((story) => (
                <UserStory
                  key={story.id}
                  storyType={story.type}
                  userName={story.userName}
                  onPress={() => handleStoryPress(story.userName)}
                />
              ))}
            </XStack>
          </StoriesScroll>
        </StoriesSection>

        {/* Photo Feed */}
        <FlatList
          data={samplePosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 100,
          }}
        />
      </ContentContainer>

      {/* Bottom Navigation */}
      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}
