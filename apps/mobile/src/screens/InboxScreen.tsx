import React, { useState } from 'react';
import { StatusBar, Pressable, ScrollView, Image } from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar, NavigationBarState } from '@alo/ui';
import { primitive } from '@alo/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = NativeStackScreenProps<AppStackParamList, 'Inbox'>;
type InboxTab = 'Messages' | 'Notifications';

interface Message {
  id: string;
  type: 'system' | 'user';
  name: string;
  location?: string;
  avatar?: string;
  message: string;
  subtitle?: string;
  status?: string;
}

const ScreenContainer = styled(YStack, {
  name: 'InboxScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const Header = styled(YStack, {
  name: 'Header',
  paddingHorizontal: 24,
  paddingTop: 16,
  paddingBottom: 0,
});

const HeaderTitle = styled(Text, {
  name: 'HeaderTitle',
  fontSize: 28,
  fontWeight: '700',
  color: primitive.color.black,
  marginBottom: 16,
});

const TabsContainer = styled(XStack, {
  name: 'TabsContainer',
  gap: 16,
});

const TabButton = styled(XStack, {
  name: 'TabButton',
  paddingBottom: 12,
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  alignItems: 'center',
  gap: 6,
  variants: {
    active: {
      true: {
        borderBottomColor: primitive.color.black,
      },
    },
  } as const,
});

const TabText = styled(Text, {
  name: 'TabText',
  fontSize: 15,
  fontWeight: '500',
  color: primitive.color.neutral.grey['500'],
  variants: {
    active: {
      true: {
        color: primitive.color.black,
        fontWeight: '600',
      },
    },
  } as const,
});

const Badge = styled(Stack, {
  name: 'Badge',
  backgroundColor: primitive.color.brand.primary['900'],
  borderRadius: 10,
  paddingHorizontal: 6,
  paddingVertical: 2,
  minWidth: 20,
  alignItems: 'center',
  justifyContent: 'center',
});

const BadgeText = styled(Text, {
  name: 'BadgeText',
  fontSize: 12,
  fontWeight: '600',
  color: primitive.color.white,
});

const MessagesContainer = styled(ScrollView, {
  name: 'MessagesContainer',
  flex: 1,
});

const MessageItem = styled(XStack, {
  name: 'MessageItem',
  paddingHorizontal: 24,
  paddingVertical: 16,
  gap: 12,
  borderBottomWidth: 1,
  borderBottomColor: primitive.color.neutral.grey['200'],
});

const AvatarContainer = styled(Stack, {
  name: 'AvatarContainer',
  width: 56,
  height: 56,
  borderRadius: 28,
  overflow: 'hidden',
  backgroundColor: primitive.color.neutral.grey['100'],
  alignItems: 'center',
  justifyContent: 'center',
});

const MessageContent = styled(YStack, {
  name: 'MessageContent',
  flex: 1,
  gap: 2,
});

const MessageHeader = styled(Text, {
  name: 'MessageHeader',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const MessageText = styled(Text, {
  name: 'MessageText',
  fontSize: 15,
  fontWeight: '400',
  color: primitive.color.black,
});

const MessageStatus = styled(Text, {
  name: 'MessageStatus',
  fontSize: 14,
  color: primitive.color.neutral.grey['500'],
});

const EmptyContainer = styled(YStack, {
  name: 'EmptyContainer',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
});

const EmptyText = styled(Text, {
  name: 'EmptyText',
  fontSize: 16,
  color: primitive.color.neutral.grey['600'],
  textAlign: 'center',
});

// App logo icon for system messages
const AppLogoIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      fill={primitive.color.brand.primary['900']}
    />
    <Circle cx="12" cy="12" r="3" fill={primitive.color.brand.primary['900']} />
  </Svg>
);

// Sample messages data
const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'system',
    name: 'Craig',
    message: "Alright got it we'll make do thanks a lot",
  },
  {
    id: '2',
    type: 'user',
    name: 'Craig',
    location: 'Yonkers',
    avatar: 'https://i.pravatar.cc/150?img=12',
    message: 'Airbnb update: Reservation canceled',
    status: 'Canceled · Feb 13 - 14, 2023',
  },
  {
    id: '3',
    type: 'user',
    name: 'Erin',
    location: 'New York',
    avatar: 'https://i.pravatar.cc/150?img=25',
    message: 'New date and time request',
    status: 'Request pending',
  },
];

export function InboxScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeNavTab] = useState<NavigationBarState>('Inbox');
  const [activeInboxTab, setActiveInboxTab] = useState<InboxTab>('Messages');

  const unreadCount = 1;

  const handleNavChange = (tab: NavigationBarState) => {
    if (tab === 'Explore') navigation.navigate('Explore');
    else if (tab === 'Liked') navigation.navigate('Liked');
    else if (tab === 'Profile') navigation.navigate('Profile');
  };

  const renderMessage = (message: Message) => (
    <Pressable key={message.id}>
      <MessageItem>
        <AvatarContainer>
          {message.type === 'system' ? (
            <AppLogoIcon />
          ) : (
            <Image
              source={{ uri: message.avatar }}
              style={{ width: 56, height: 56 }}
            />
          )}
        </AvatarContainer>
        <MessageContent>
          <MessageHeader>
            {message.name}
            {message.location && (
              <Text color={primitive.color.neutral.grey['500']} fontWeight="400">
                {' '}
                · {message.location}
              </Text>
            )}
          </MessageHeader>
          <MessageText numberOfLines={1}>{message.message}</MessageText>
          {message.status && (
            <MessageStatus>{message.status}</MessageStatus>
          )}
        </MessageContent>
      </MessageItem>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      <Header>
        <HeaderTitle>Inbox</HeaderTitle>
        <TabsContainer>
          <Pressable onPress={() => setActiveInboxTab('Messages')}>
            <TabButton active={activeInboxTab === 'Messages'}>
              <TabText active={activeInboxTab === 'Messages'}>Messages</TabText>
              {unreadCount > 0 && (
                <Badge>
                  <BadgeText>{unreadCount}</BadgeText>
                </Badge>
              )}
            </TabButton>
          </Pressable>
          <Pressable onPress={() => setActiveInboxTab('Notifications')}>
            <TabButton active={activeInboxTab === 'Notifications'}>
              <TabText active={activeInboxTab === 'Notifications'}>Notifications</TabText>
            </TabButton>
          </Pressable>
        </TabsContainer>
      </Header>

      {activeInboxTab === 'Messages' ? (
        <MessagesContainer
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {sampleMessages.map(renderMessage)}
        </MessagesContainer>
      ) : (
        <EmptyContainer>
          <EmptyText>No notifications yet</EmptyText>
        </EmptyContainer>
      )}

      <NavigationBar state={activeNavTab} onStateChange={handleNavChange} />
    </ScreenContainer>
  );
}
