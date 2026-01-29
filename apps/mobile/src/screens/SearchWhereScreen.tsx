import React, { useState } from 'react';
import { StatusBar, TextInput, Keyboard, Pressable } from 'react-native';
import { YStack, XStack, Stack, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primitive } from '@alo/theme';
import Svg, { Path, Circle } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchWhere'>;

/**
 * Styled Components - Clean Inbox-style look
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchWhereScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 24,
});

const SearchBarContainer = styled(XStack, {
  name: 'SearchBarContainer',
  backgroundColor: primitive.color.neutral.grey['100'],
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 14,
  alignItems: 'center',
  gap: 12,
});

const SearchInput = styled(TextInput, {
  name: 'SearchInput',
  flex: 1,
  fontSize: 16,
  fontWeight: '400',
  color: primitive.color.black,
  padding: 0,
  margin: 0,
});

// Search Icon
const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle
      cx="9"
      cy="9"
      r="7"
      stroke={primitive.color.neutral.grey['500']}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M14 14L18 18"
      stroke={primitive.color.neutral.grey['500']}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

/**
 * SearchWhereScreen Component
 */
export default function SearchWhereScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  const [searchText, setSearchText] = useState(params?.location || '');

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={handleDismissKeyboard}>
      <ScreenContainer>
        <StatusBar barStyle="dark-content" />
        <Stack height={insets.top} backgroundColor={primitive.color.white} />

        {/* Content */}
        <ContentContainer>
          <SearchBarContainer>
            <SearchIcon />
            <SearchInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search destinations"
              placeholderTextColor={primitive.color.neutral.grey['500']}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={() => {
                if (searchText.trim()) {
                  navigation.navigate('SearchWhereResults', {
                    dateRange: params?.dateRange,
                    guests: params?.guests,
                  });
                }
              }}
            />
          </SearchBarContainer>
        </ContentContainer>
      </ScreenContainer>
    </Pressable>
  );
}
