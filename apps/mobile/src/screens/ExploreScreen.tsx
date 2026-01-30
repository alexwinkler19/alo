import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { YStack, XStack, ScrollView, Stack, styled, Spinner } from 'tamagui';
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
import { fetchUsers, generateAvatarUrl, type UserProfile } from '../services/profiles';
import { useLikedPosts, type LikedPost } from '../contexts/LikedPostsContext';

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

const RefreshIndicatorContainer = styled(YStack, {
  name: 'RefreshIndicatorContainer',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 16,
});

/**
 * Story type definition
 */
interface StoryData {
  id: string;
  type: 'Normal' | 'Mine' | 'Live';
  userName: string;
  profileImage?: string;
}

/**
 * Fallback stories when database is not available
 * Uses DiceBear for memoji-style avatars
 */
const fallbackStories: StoryData[] = [
  { id: '1', type: 'Mine', userName: 'Your Story' },
  { id: '2', type: 'Normal', userName: 'Arthur', profileImage: generateAvatarUrl('Arthur') },
  { id: '3', type: 'Normal', userName: 'Sarah', profileImage: generateAvatarUrl('Sarah') },
  { id: '4', type: 'Normal', userName: 'Nicolas', profileImage: generateAvatarUrl('Nicolas') },
  { id: '5', type: 'Normal', userName: 'Clarissa', profileImage: generateAvatarUrl('Clarissa') },
  { id: '6', type: 'Live', userName: 'Vanessa', profileImage: generateAvatarUrl('Vanessa') },
  { id: '7', type: 'Normal', userName: 'Alex', profileImage: generateAvatarUrl('Alex') },
  { id: '8', type: 'Normal', userName: 'Emma', profileImage: generateAvatarUrl('Emma') },
  { id: '9', type: 'Normal', userName: 'Lucas', profileImage: generateAvatarUrl('Lucas') },
  { id: '10', type: 'Normal', userName: 'Sophie', profileImage: generateAvatarUrl('Sophie') },
];

/**
 * Convert UserProfile to StoryData
 */
const userToStory = (user: UserProfile, index: number): StoryData => ({
  id: user.id,
  type: index === 4 ? 'Live' : 'Normal', // Make one user "Live" for demo
  userName: user.name,
  profileImage: user.avatar_url || generateAvatarUrl(user.name),
});

const samplePosts = [
  {
    id: '1',
    user: { name: 'Vanessa', avatar: generateAvatarUrl('Vanessa') },
    images: ['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop'],
    likedBy: 'Sarah & 3 others',
    caption: {
      username: 'Vanessa',
      text: 'Looking for 1 more player for padel this Saturday morning - who\'s in?',
      hashtags: ['#padel'],
    },
    commentCount: 12,
  },
  {
    id: '2',
    user: { name: 'Alex', avatar: generateAvatarUrl('Alex') },
    images: ['https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop'],
    likedBy: 'Emma & 2 others',
    caption: {
      username: 'Alex',
      text: 'Epic ski touring day in the backcountry! Need 2 more for next weekend',
      hashtags: ['#skitouring'],
    },
    commentCount: 8,
  },
  {
    id: '3',
    user: { name: 'Sarah', avatar: generateAvatarUrl('Sarah') },
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
    likedBy: 'Nicolas & 4 others',
    caption: {
      username: 'Sarah',
      text: 'Sunrise hike tomorrow at 6am - looking for hiking buddies!',
      hashtags: ['#hiking', '#mountains'],
    },
    commentCount: 34,
  },
  {
    id: '4',
    user: { name: 'Emma', avatar: generateAvatarUrl('Emma') },
    images: ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop'],
    likedBy: 'Sophie & 1 other',
    caption: {
      username: 'Emma',
      text: 'Coffee & coworking session this afternoon - come join!',
      hashtags: ['#coffee', '#networking'],
    },
    commentCount: 15,
  },
  {
    id: '5',
    user: { name: 'Lucas', avatar: generateAvatarUrl('Lucas') },
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&fit=crop'],
    likedBy: 'Arthur & 2 others',
    caption: {
      username: 'Lucas',
      text: 'Tennis doubles match on Sunday - need one more player!',
      hashtags: ['#tennis'],
    },
    commentCount: 22,
  },
  {
    id: '6',
    user: { name: 'Nicolas', avatar: generateAvatarUrl('Nicolas') },
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop'],
    likedBy: 'Vanessa & 5 others',
    caption: {
      username: 'Nicolas',
      text: 'Planning a trail running session this weekend - anyone interested?',
      hashtags: ['#trailrunning'],
    },
    commentCount: 19,
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
  const { toggleLike, isLiked } = useLikedPosts();
  const [activeTab, setActiveTab] = useState<TopBarTab>('Stays');
  const [activeNavTab] = useState<NavigationBarState>('Explore');
  const [stories, setStories] = useState<StoryData[]>(fallbackStories);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState(samplePosts);

  // Load users helper function
  const loadUsers = useCallback(async () => {
    const { data: users, error } = await fetchUsers();

    if (users && users.length > 0) {
      const userStories: StoryData[] = [
        { id: 'mine', type: 'Mine', userName: 'Your Story' },
        ...users.map(userToStory),
      ];
      setStories(userStories);
    } else {
      if (error) {
        console.log('Using fallback stories:', error.message);
      }
      setStories(fallbackStories);
    }
  }, []);

  // Fetch users for stories on mount
  useEffect(() => {
    const initialLoad = async () => {
      setIsLoadingStories(true);
      await loadUsers();
      setIsLoadingStories(false);
    };

    initialLoad();
  }, [loadUsers]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);

    // Reload stories
    await loadUsers();

    // Simulate loading new posts (in real app, fetch from API)
    // For now, shuffle the posts to simulate new content
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(prevPosts => [...prevPosts].sort(() => Math.random() - 0.5));

    setIsRefreshing(false);
  }, [loadUsers]);

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Liked') navigation.navigate('Liked');
    else if (tab === 'Inbox') navigation.navigate('Inbox');
    else if (tab === 'Profile') navigation.navigate('Profile');
  };

  const handleStoryPress = (userName: string) => {
    console.log('Story pressed:', userName);
  };

  const handleLikePost = useCallback((item: typeof samplePosts[0]) => {
    const likedPost: LikedPost = {
      id: item.id,
      user: item.user,
      images: item.images,
      likedBy: item.likedBy,
      caption: item.caption,
      commentCount: item.commentCount,
    };
    toggleLike(likedPost);
  }, [toggleLike]);

  const renderPost = ({ item }: { item: (typeof samplePosts)[0] }) => (
    <PhotoInsta
      size="Landscape"
      user={item.user}
      images={item.images}
      likedBy={item.likedBy}
      caption={item.caption}
      commentCount={item.commentCount}
      hideMenu
      hideLocation
      isLiked={isLiked(item.id)}
      onLike={() => handleLikePost(item)}
      onComment={() => console.log('Comment:', item.id)}
      onShare={() => console.log('Share:', item.id)}
      onBookmark={() => console.log('Ask to join:', item.id)}
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
              {stories.map((story) => (
                <UserStory
                  key={story.id}
                  storyType={story.type}
                  userName={story.userName}
                  profileImage={story.profileImage}
                  onPress={() => handleStoryPress(story.userName)}
                />
              ))}
            </XStack>
          </StoriesScroll>
        </StoriesSection>

        {/* Photo Feed */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 100,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="transparent"
              colors={['transparent']}
              progressViewOffset={0}
            />
          }
          ListHeaderComponent={
            isRefreshing ? (
              <RefreshIndicatorContainer>
                <ActivityIndicator
                  size="small"
                  color={primitive.color.neutral.grey['400']}
                />
              </RefreshIndicatorContainer>
            ) : null
          }
        />
      </ContentContainer>

      {/* Bottom Navigation */}
      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}
