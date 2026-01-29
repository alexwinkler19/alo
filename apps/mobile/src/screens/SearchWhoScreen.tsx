import React, { useState } from 'react';
import { StatusBar, Pressable } from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomBar } from '@alo/ui';
import { primitive } from '@alo/theme';
import Svg, { Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchWho'>;

/**
 * Styled Components - Clean Inbox-style look
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchWhoScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 16,
  gap: 12,
});

const InfoField = styled(XStack, {
  name: 'InfoField',
  backgroundColor: primitive.color.neutral.grey['100'],
  borderRadius: 12,
  paddingHorizontal: 24,
  paddingVertical: 16,
  justifyContent: 'space-between',
  alignItems: 'center',
});

const FieldLabel = styled(Text, {
  name: 'FieldLabel',
  fontSize: 14,
  fontWeight: '500',
  color: primitive.color.neutral.grey['500'],
});

const FieldValue = styled(Text, {
  name: 'FieldValue',
  fontSize: 14,
  fontWeight: '600',
  color: primitive.color.black,
});

const GuestsCard = styled(YStack, {
  name: 'GuestsCard',
  backgroundColor: primitive.color.neutral.grey['100'],
  borderRadius: 12,
  padding: 24,
  gap: 20,
});

const CardTitle = styled(Text, {
  name: 'CardTitle',
  fontSize: 20,
  fontWeight: '700',
  color: primitive.color.black,
});

const GuestRow = styled(XStack, {
  name: 'GuestRow',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const GuestLabel = styled(Text, {
  name: 'GuestLabel',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const CounterContainer = styled(XStack, {
  name: 'CounterContainer',
  alignItems: 'center',
  gap: 16,
});

const CounterButton = styled(Stack, {
  name: 'CounterButton',
  width: 32,
  height: 32,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: primitive.color.neutral.grey['300'],
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: primitive.color.white,
});

const CounterValue = styled(Text, {
  name: 'CounterValue',
  fontSize: 16,
  fontWeight: '500',
  color: primitive.color.black,
  minWidth: 32,
  textAlign: 'center',
});

const BottomContainer = styled(Stack, {
  name: 'BottomContainer',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

// Icons
const MinusIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M3 8H13" stroke={primitive.color.neutral.grey['400']} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const PlusSmallIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M8 3V13" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 8H13" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

/**
 * Format date range for display
 */
const formatDateRange = (dateRange?: { start: number | null; end: number | null; month: string }): string => {
  if (!dateRange || dateRange.start === null) return 'Add dates';
  if (dateRange.end === null) return `Jan ${dateRange.start}`;
  return `Jan ${dateRange.start} - Jan ${dateRange.end}`;
};

/**
 * SearchWhoScreen Component
 */
export default function SearchWhoScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  const location = params?.location || 'Add destination';
  const dateRange = params?.dateRange;

  const [guests, setGuests] = useState(params?.guests ?? 0);

  const handleSearch = () => {
    console.log('Search with:', { location, dateRange, guests });
  };

  const handleClearAll = () => {
    // Reset only the guests count on this screen
    setGuests(0);
  };

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  const decrementGuests = () => {
    if (guests > 0) setGuests(guests - 1);
  };

  const handleWherePress = () => {
    navigation.navigate('SearchWhere', {
      location,
      dateRange,
      guests,
    });
  };

  const handleWhenPress = () => {
    navigation.navigate('SearchWhen', {
      location,
      dateRange,
      guests,
    });
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      {/* Content */}
      <ContentContainer>
        <Pressable onPress={handleWherePress}>
          <InfoField>
            <FieldLabel>Where</FieldLabel>
            <FieldValue>{location}</FieldValue>
          </InfoField>
        </Pressable>

        <Pressable onPress={handleWhenPress}>
          <InfoField>
            <FieldLabel>When</FieldLabel>
            <FieldValue>{formatDateRange(dateRange)}</FieldValue>
          </InfoField>
        </Pressable>

        <GuestsCard>
          <CardTitle>Who's coming?</CardTitle>

          {/* Number of people */}
          <GuestRow>
            <GuestLabel>Number of people</GuestLabel>
            <CounterContainer>
              <Pressable onPress={decrementGuests} disabled={guests === 0}>
                <CounterButton>
                  <MinusIcon />
                </CounterButton>
              </Pressable>
              <CounterValue>{guests}</CounterValue>
              <Pressable onPress={incrementGuests}>
                <CounterButton>
                  <PlusSmallIcon />
                </CounterButton>
              </Pressable>
            </CounterContainer>
          </GuestRow>
        </GuestsCard>
      </ContentContainer>

      {/* Bottom Bar */}
      <BottomContainer style={{ paddingBottom: insets.bottom }}>
        <BottomBar
          state="Search"
          primaryButtonText="Search"
          secondaryButtonText="Clear all"
          onPrimaryPress={handleSearch}
          onSecondaryPress={handleClearAll}
        />
      </BottomContainer>
    </ScreenContainer>
  );
}
