import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { YStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar, NavigationBarState } from '@alo/ui';
import { primitive } from '@alo/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Wishlist'>;

const ScreenContainer = styled(YStack, {
  name: 'WishlistScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
});

const Title = styled(Text, {
  name: 'Title',
  fontSize: 24,
  fontWeight: '600',
  color: primitive.color.black,
  marginBottom: 8,
});

const Subtitle = styled(Text, {
  name: 'Subtitle',
  fontSize: 16,
  color: primitive.color.neutral.grey['600'],
  textAlign: 'center',
});

export function WishlistScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeNavTab] = useState<NavigationBarState>('Wishlist');

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Explore') navigation.navigate('Explore');
    else if (tab === 'Inbox') navigation.navigate('Inbox');
    else if (tab === 'Profile') navigation.navigate('Profile');
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      <ContentContainer>
        <Title>Wishlist</Title>
        <Subtitle>Your saved items will appear here</Subtitle>
      </ContentContainer>

      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}
