import React from 'react';
import { StatusBar, FlatList, Pressable } from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primitive } from '@alo/theme';
import Svg, { Path, Circle } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchWhereResults'>;

interface LocationResult {
  id: string;
  name: string;
}

/**
 * Styled Components - Clean Inbox-style look
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchWhereResultsScreen',
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
  marginBottom: 24,
});

const SearchText = styled(Text, {
  name: 'SearchText',
  flex: 1,
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const ResultItem = styled(XStack, {
  name: 'ResultItem',
  alignItems: 'center',
  gap: 16,
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: primitive.color.neutral.grey['200'],
});

const LocationText = styled(Text, {
  name: 'LocationText',
  fontSize: 16,
  fontWeight: '400',
  color: primitive.color.black,
});

// Icons
const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle cx="9" cy="9" r="7" stroke={primitive.color.neutral.grey['500']} strokeWidth="2" fill="none" />
    <Path d="M14 14L18 18" stroke={primitive.color.neutral.grey['500']} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CloseIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 6L18 18" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
      stroke={primitive.color.neutral.grey['500']}
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="12" cy="10" r="3" stroke={primitive.color.neutral.grey['500']} strokeWidth="2" fill="none" />
  </Svg>
);

const sampleResults: LocationResult[] = [
  { id: '1', name: 'France' },
  { id: '2', name: 'Annecy, France' },
  { id: '3', name: 'Chamonix, France' },
  { id: '4', name: 'Paris, France' },
  { id: '5', name: 'Grenoble, France' },
];

/**
 * SearchWhereResultsScreen Component
 */
export default function SearchWhereResultsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  const searchQuery = 'France';

  const handleClose = () => {
    navigation.goBack();
  };

  const handleLocationSelect = (location: LocationResult) => {
    navigation.navigate('SearchWhen', {
      location: location.name,
      dateRange: params?.dateRange,
      guests: params?.guests,
    });
  };

  const renderLocationItem = ({ item }: { item: LocationResult }) => (
    <Pressable onPress={() => handleLocationSelect(item)}>
      <ResultItem>
        <LocationIcon />
        <LocationText>{item.name}</LocationText>
      </ResultItem>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      {/* Content */}
      <ContentContainer>
        <SearchBarContainer>
          <SearchIcon />
          <SearchText>{searchQuery}</SearchText>
          <Pressable onPress={handleClose}>
            <CloseIcon />
          </Pressable>
        </SearchBarContainer>

        <FlatList
          data={sampleResults}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        />
      </ContentContainer>
    </ScreenContainer>
  );
}
