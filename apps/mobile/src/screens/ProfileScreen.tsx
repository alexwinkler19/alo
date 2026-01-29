import React, { useState } from 'react';
import { YStack, Stack, Text, styled } from 'tamagui';
import { semantic, typography, primitive } from '@alo/theme';
import { StatusBar } from 'react-native';
import { Button, NavigationBar, NavigationBarState } from '@alo/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

/**
 * Styled Components
 */
const ScreenContainer = styled(YStack, {
  name: 'ProfileScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const Container = styled(YStack, {
  name: 'ProfileContent',
  flex: 1,
  backgroundColor: semantic.color.bg.primary,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
  gap: 32,
});

const ContentContainer = styled(Stack, {
  name: 'ContentContainer',
  alignItems: 'center',
  gap: 8,
});

const Title = styled(Text, {
  name: 'Title',
  fontFamily: 'Inter',
  fontWeight: '800',
  fontSize: 24,
  lineHeight: 32,
  color: semantic.color.text.primary,
  textAlign: 'center',
});

const Subtitle = styled(Text, {
  name: 'Subtitle',
  ...typography.bodyM,
  color: semantic.color.text.secondary,
  textAlign: 'center',
});

/**
 * Profile Screen
 *
 * Simple success screen shown after authentication.
 * Displays a success message and logout button.
 */
export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { signOut, user } = useAuth();
  const [activeNavTab] = useState<NavigationBarState>('Profile');

  const handleLogout = async () => {
    await signOut();
    // Navigation will automatically switch to auth stack
    // when isAuthenticated becomes false
  };

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Explore') navigation.navigate('Explore');
    else if (tab === 'Wishlist') navigation.navigate('Wishlist');
    else if (tab === 'Inbox') navigation.navigate('Inbox');
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      <Container>
        <ContentContainer>
          <Title>Success!</Title>
          <Subtitle>You are on your profile</Subtitle>
          {user?.email && (
            <Subtitle>Logged in as: {user.email}</Subtitle>
          )}
        </ContentContainer>

        <Stack width="100%">
          <Button
            buttonType="Secondary"
            text="Logout"
            onPress={handleLogout}
            showText={true}
          />
        </Stack>
      </Container>

      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}

export default ProfileScreen;
