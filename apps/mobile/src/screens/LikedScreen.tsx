import React, { useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { YStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar, NavigationBarState, PhotoInsta } from '@alo/ui';
import { primitive } from '@alo/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import { useLikedPosts, type LikedPost } from '../contexts/LikedPostsContext';

type Props = NativeStackScreenProps<AppStackParamList, 'Liked'>;

const ScreenContainer = styled(YStack, {
  name: 'LikedScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const Header = styled(YStack, {
  name: 'Header',
  paddingHorizontal: 24,
  paddingTop: 16,
  paddingBottom: 16,
  borderBottomWidth: 0.5,
  borderBottomColor: '#EEEEEE',
});

const HeaderTitle = styled(Text, {
  name: 'HeaderTitle',
  fontSize: 28,
  fontWeight: '700',
  color: primitive.color.black,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
});

const EmptyContainer = styled(YStack, {
  name: 'EmptyContainer',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
});

const EmptyTitle = styled(Text, {
  name: 'EmptyTitle',
  fontSize: 20,
  fontWeight: '600',
  color: primitive.color.black,
  marginBottom: 8,
});

const EmptySubtitle = styled(Text, {
  name: 'EmptySubtitle',
  fontSize: 16,
  color: primitive.color.neutral.grey['600'],
  textAlign: 'center',
});

export function LikedScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeNavTab] = useState<NavigationBarState>('Liked');
  const { likedPosts, toggleLike } = useLikedPosts();

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Explore') navigation.navigate('Explore');
    else if (tab === 'Inbox') navigation.navigate('Inbox');
    else if (tab === 'Profile') navigation.navigate('Profile');
  };

  const renderPost = ({ item }: { item: LikedPost }) => (
    <PhotoInsta
      size="Landscape"
      user={item.user}
      images={item.images}
      likedBy={item.likedBy}
      caption={item.caption}
      commentCount={item.commentCount}
      hideMenu
      hideLocation
      isLiked={true}
      onLike={() => toggleLike(item)}
      onComment={() => console.log('Comment:', item.id)}
      onShare={() => console.log('Share:', item.id)}
      onBookmark={() => console.log('Ask to join:', item.id)}
    />
  );

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      <Header>
        <HeaderTitle>Liked</HeaderTitle>
      </Header>

      <ContentContainer>
        {likedPosts.length > 0 ? (
          <FlatList
            data={likedPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 100,
            }}
          />
        ) : (
          <EmptyContainer>
            <EmptyTitle>No liked posts yet</EmptyTitle>
            <EmptySubtitle>
              Posts you like will appear here. Tap the heart icon on posts to save them.
            </EmptySubtitle>
          </EmptyContainer>
        )}
      </ContentContainer>

      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}
