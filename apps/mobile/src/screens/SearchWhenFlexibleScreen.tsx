import React, { useState } from 'react';
import { StatusBar, Pressable } from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primitive } from '@alo/theme';
import { Svg, Path, Rect } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchWhenFlexible'>;

type StayDuration = 'Weekend' | 'Week' | 'Month';

interface MonthOption {
  id: string;
  month: string;
  year: string;
}

/**
 * Styled Components - Clean Inbox-style look
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchWhenFlexibleScreen',
  flex: 1,
  backgroundColor: primitive.color.white,
});

const ContentContainer = styled(YStack, {
  name: 'ContentContainer',
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 16,
});

const WhereField = styled(XStack, {
  name: 'WhereField',
  backgroundColor: primitive.color.neutral.grey['100'],
  borderRadius: 12,
  paddingHorizontal: 24,
  paddingVertical: 16,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
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

const WhenCard = styled(YStack, {
  name: 'WhenCard',
  backgroundColor: primitive.color.neutral.grey['100'],
  borderRadius: 12,
  padding: 20,
  gap: 16,
});

const WhenTitle = styled(Text, {
  name: 'WhenTitle',
  fontSize: 18,
  fontWeight: '600',
  color: primitive.color.black,
});

const WhenTabsContainer = styled(XStack, {
  name: 'WhenTabsContainer',
  backgroundColor: primitive.color.white,
  borderRadius: 20,
  padding: 4,
});

const WhenTab = styled(Stack, {
  name: 'WhenTab',
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
});

const WhenTabText = styled(Text, {
  name: 'WhenTabText',
  fontSize: 14,
  fontWeight: '500',
});

const Section = styled(YStack, {
  name: 'Section',
  gap: 12,
});

const SectionTitle = styled(Text, {
  name: 'SectionTitle',
  fontSize: 15,
  fontWeight: '600',
  color: primitive.color.black,
});

const DurationRow = styled(XStack, {
  name: 'DurationRow',
  gap: 8,
});

const DurationChip = styled(Stack, {
  name: 'DurationChip',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
});

const DurationText = styled(Text, {
  name: 'DurationText',
  fontSize: 14,
  fontWeight: '500',
});

const MonthsGrid = styled(XStack, {
  name: 'MonthsGrid',
  gap: 8,
  flexWrap: 'wrap',
});

const MonthCard = styled(Stack, {
  name: 'MonthCard',
  backgroundColor: primitive.color.white,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: primitive.color.neutral.grey['200'],
  padding: 12,
  alignItems: 'center',
  gap: 4,
  width: 100,
});

const MonthIconContainer = styled(Stack, {
  name: 'MonthIconContainer',
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
});

const MonthText = styled(Text, {
  name: 'MonthText',
  fontSize: 14,
  fontWeight: '600',
  color: primitive.color.black,
});

const YearText = styled(Text, {
  name: 'YearText',
  fontSize: 12,
  fontWeight: '400',
  color: primitive.color.neutral.grey['500'],
});

const ActionsRow = styled(XStack, {
  name: 'ActionsRow',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
  marginTop: 'auto',
});

const SkipText = styled(Text, {
  name: 'SkipText',
  fontSize: 16,
  fontWeight: '500',
  color: primitive.color.black,
  textDecorationLine: 'underline',
});

const NextButton = styled(Stack, {
  name: 'NextButton',
  backgroundColor: primitive.color.black,
  paddingHorizontal: 48,
  paddingVertical: 14,
  borderRadius: 8,
});

const NextText = styled(Text, {
  name: 'NextText',
  fontSize: 16,
  fontWeight: '500',
  color: primitive.color.white,
});

// Calendar Icon Component
const CalendarIcon: React.FC = () => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Rect
      x="4"
      y="6"
      width="24"
      height="22"
      rx="2"
      stroke={primitive.color.neutral.grey['400']}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M4 12H28"
      stroke={primitive.color.neutral.grey['400']}
      strokeWidth="2"
    />
    <Path
      d="M10 4V8"
      stroke={primitive.color.neutral.grey['400']}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M22 4V8"
      stroke={primitive.color.neutral.grey['400']}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const monthOptions: MonthOption[] = [
  { id: '1', month: 'January', year: '2026' },
  { id: '2', month: 'February', year: '2026' },
  { id: '3', month: 'March', year: '2026' },
  { id: '4', month: 'April', year: '2026' },
  { id: '5', month: 'May', year: '2026' },
  { id: '6', month: 'June', year: '2026' },
];

/**
 * SearchWhenFlexibleScreen Component
 */
export default function SearchWhenFlexibleScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;
  const location = params?.location || 'Add destination';

  const [whenTab, setWhenTab] = useState<'Dates' | 'Flexible'>('Flexible');
  const [duration, setDuration] = useState<StayDuration>('Week');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleNext = () => {
    navigation.navigate('SearchWho', {
      location,
      guests: params?.guests,
      // For flexible dates, we pass a description instead of specific dates
    });
  };

  const handleSkip = () => {
    navigation.navigate('SearchWho', {
      location,
      guests: params?.guests,
    });
  };

  const handleDatesPress = () => {
    setWhenTab('Dates');
    navigation.goBack();
  };

  const handleWherePress = () => {
    navigation.navigate('SearchWhere', {
      location,
      guests: params?.guests,
    });
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor={primitive.color.white} />

      {/* Content */}
      <ContentContainer>
        <Pressable onPress={handleWherePress}>
          <WhereField>
            <FieldLabel>Where</FieldLabel>
            <FieldValue>{location}</FieldValue>
          </WhereField>
        </Pressable>

        <WhenCard>
          <WhenTitle>When's your trip?</WhenTitle>

          <WhenTabsContainer>
            <Pressable onPress={handleDatesPress}>
              <WhenTab backgroundColor={whenTab === 'Dates' ? primitive.color.neutral.grey['100'] : 'transparent'}>
                <WhenTabText color={whenTab === 'Dates' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                  Dates
                </WhenTabText>
              </WhenTab>
            </Pressable>
            <Pressable onPress={() => setWhenTab('Flexible')}>
              <WhenTab backgroundColor={whenTab === 'Flexible' ? primitive.color.neutral.grey['100'] : 'transparent'}>
                <WhenTabText color={whenTab === 'Flexible' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                  Flexible
                </WhenTabText>
              </WhenTab>
            </Pressable>
          </WhenTabsContainer>

          {/* Stay Duration Section */}
          <Section>
            <SectionTitle>Stay for a</SectionTitle>

            <DurationRow>
              <Pressable onPress={() => setDuration('Weekend')}>
                <DurationChip
                  borderColor={duration === 'Weekend' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <DurationText color={duration === 'Weekend' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    Weekend
                  </DurationText>
                </DurationChip>
              </Pressable>
              <Pressable onPress={() => setDuration('Week')}>
                <DurationChip
                  borderColor={duration === 'Week' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <DurationText color={duration === 'Week' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    Week
                  </DurationText>
                </DurationChip>
              </Pressable>
              <Pressable onPress={() => setDuration('Month')}>
                <DurationChip
                  borderColor={duration === 'Month' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <DurationText color={duration === 'Month' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    Month
                  </DurationText>
                </DurationChip>
              </Pressable>
            </DurationRow>
          </Section>

          {/* Go Anytime Section */}
          <Section>
            <SectionTitle>Go anytime</SectionTitle>

            <MonthsGrid>
              {monthOptions.map((month) => (
                <Pressable key={month.id} onPress={() => setSelectedMonth(month.id)}>
                  <MonthCard
                    borderColor={selectedMonth === month.id ? primitive.color.black : primitive.color.neutral.grey['200']}
                    borderWidth={selectedMonth === month.id ? 2 : 1}
                  >
                    <MonthIconContainer>
                      <CalendarIcon />
                    </MonthIconContainer>
                    <MonthText>{month.month}</MonthText>
                    <YearText>{month.year}</YearText>
                  </MonthCard>
                </Pressable>
              ))}
            </MonthsGrid>
          </Section>
        </WhenCard>

        <ActionsRow>
          <Pressable onPress={handleSkip}>
            <SkipText>Skip</SkipText>
          </Pressable>
          <Pressable onPress={handleNext}>
            <NextButton>
              <NextText>Next</NextText>
            </NextButton>
          </Pressable>
        </ActionsRow>

        <Stack height={insets.bottom} />
      </ContentContainer>
    </ScreenContainer>
  );
}
