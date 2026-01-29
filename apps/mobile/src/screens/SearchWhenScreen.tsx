import React, { useState } from 'react';
import { StatusBar, Pressable } from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primitive } from '@alo/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'SearchWhen'>;

type DateFlexibility = 'exact' | 'plusMinus1' | 'plusMinus2';

interface DateRange {
  start: number | null;
  end: number | null;
}

/**
 * Styled Components - Clean Inbox-style look
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchWhenScreen',
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

const CalendarContainer = styled(YStack, {
  name: 'CalendarContainer',
  gap: 8,
});

const MonthYearText = styled(Text, {
  name: 'MonthYearText',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
  marginBottom: 8,
});

const WeekdaysRow = styled(XStack, {
  name: 'WeekdaysRow',
  justifyContent: 'space-around',
});

const WeekdayText = styled(Text, {
  name: 'WeekdayText',
  fontSize: 12,
  fontWeight: '600',
  color: primitive.color.neutral.grey['500'],
  width: 36,
  textAlign: 'center',
});

const DatesGrid = styled(YStack, {
  name: 'DatesGrid',
  gap: 2,
});

const DateRow = styled(XStack, {
  name: 'DateRow',
  justifyContent: 'space-around',
});

const DateCellContainer = styled(Stack, {
  name: 'DateCellContainer',
  width: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
});

const DateCircle = styled(Stack, {
  name: 'DateCircle',
  width: 36,
  height: 36,
  borderRadius: 18,
  alignItems: 'center',
  justifyContent: 'center',
});

const DateText = styled(Text, {
  name: 'DateText',
  fontSize: 14,
  fontWeight: '500',
});

const FlexibilityRow = styled(XStack, {
  name: 'FlexibilityRow',
  gap: 8,
  marginTop: 8,
});

const FlexibilityChip = styled(Stack, {
  name: 'FlexibilityChip',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
});

const FlexibilityText = styled(Text, {
  name: 'FlexibilityText',
  fontSize: 14,
  fontWeight: '500',
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

const BRAND_COLOR = '#0a0a0a';
const RANGE_BG_COLOR = 'rgba(0, 0, 0, 0.08)';

const generateCalendarDates = () => {
  const dates: (number | null)[][] = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];
  return dates;
};

const CURRENT_MONTH = 'January 2026';

/**
 * Format date range for display
 */
const formatDateRange = (start: number | null, end: number | null): string => {
  if (start === null) return 'Add dates';
  if (end === null) return `Jan ${start}`;
  return `Jan ${start} - Jan ${end}`;
};

/**
 * SearchWhenScreen Component
 */
export default function SearchWhenScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;
  const location = params?.location || 'Add destination';

  const [whenTab, setWhenTab] = useState<'Dates' | 'Flexible'>('Dates');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: params?.dateRange?.start ?? null,
    end: params?.dateRange?.end ?? null
  });
  const [flexibility, setFlexibility] = useState<DateFlexibility>('exact');

  const calendarDates = generateCalendarDates();

  const handleDateSelect = (date: number | null) => {
    if (!date) return;

    if (dateRange.start === null) {
      setDateRange({ start: date, end: null });
    } else if (dateRange.end === null) {
      if (date < dateRange.start) {
        setDateRange({ start: date, end: dateRange.start });
      } else if (date === dateRange.start) {
        setDateRange({ start: null, end: null });
      } else {
        setDateRange({ start: dateRange.start, end: date });
      }
    } else {
      setDateRange({ start: date, end: null });
    }
  };

  const isStartDate = (date: number | null) => date !== null && date === dateRange.start;
  const isEndDate = (date: number | null) => date !== null && date === dateRange.end;
  const isInRange = (date: number | null) => {
    if (date === null || dateRange.start === null || dateRange.end === null) return false;
    return date > dateRange.start && date < dateRange.end;
  };

  const handleWherePress = () => {
    navigation.navigate('SearchWhere', {
      location,
      dateRange: { start: dateRange.start, end: dateRange.end, month: CURRENT_MONTH },
      guests: params?.guests,
    });
  };

  const handleNext = () => {
    navigation.navigate('SearchWho', {
      location,
      dateRange: { start: dateRange.start, end: dateRange.end, month: CURRENT_MONTH },
      guests: params?.guests,
    });
  };

  const handleSkip = () => {
    navigation.navigate('SearchWho', {
      location,
      dateRange: { start: null, end: null, month: CURRENT_MONTH },
      guests: params?.guests,
    });
  };

  const handleFlexiblePress = () => {
    setWhenTab('Flexible');
    navigation.navigate('SearchWhenFlexible', {
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
            <Pressable onPress={() => setWhenTab('Dates')}>
              <WhenTab backgroundColor={whenTab === 'Dates' ? primitive.color.neutral.grey['100'] : 'transparent'}>
                <WhenTabText color={whenTab === 'Dates' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                  Dates
                </WhenTabText>
              </WhenTab>
            </Pressable>
            <Pressable onPress={handleFlexiblePress}>
              <WhenTab backgroundColor={whenTab === 'Flexible' ? primitive.color.neutral.grey['100'] : 'transparent'}>
                <WhenTabText color={whenTab === 'Flexible' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                  Flexible
                </WhenTabText>
              </WhenTab>
            </Pressable>
          </WhenTabsContainer>

          <CalendarContainer>
            <MonthYearText>January 2026</MonthYearText>

            <WeekdaysRow>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <WeekdayText key={`weekday-${index}`}>{day}</WeekdayText>
              ))}
            </WeekdaysRow>

            <DatesGrid>
              {calendarDates.map((week, weekIndex) => (
                <DateRow key={`week-${weekIndex}`}>
                  {week.map((date, dateIndex) => {
                    const isStart = isStartDate(date);
                    const isEnd = isEndDate(date);
                    const inRange = isInRange(date);

                    return (
                      <Pressable
                        key={`date-${weekIndex}-${dateIndex}`}
                        onPress={() => handleDateSelect(date)}
                        disabled={!date}
                      >
                        <DateCellContainer backgroundColor={inRange ? RANGE_BG_COLOR : 'transparent'}>
                          <DateCircle backgroundColor={isStart || isEnd ? BRAND_COLOR : 'transparent'}>
                            {date && (
                              <DateText
                                color={isStart || isEnd ? primitive.color.white : primitive.color.black}
                                fontWeight={isStart || isEnd ? '600' : '500'}
                              >
                                {date}
                              </DateText>
                            )}
                          </DateCircle>
                        </DateCellContainer>
                      </Pressable>
                    );
                  })}
                </DateRow>
              ))}
            </DatesGrid>

            <FlexibilityRow>
              <Pressable onPress={() => setFlexibility('exact')}>
                <FlexibilityChip
                  borderColor={flexibility === 'exact' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <FlexibilityText color={flexibility === 'exact' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    Exact dates
                  </FlexibilityText>
                </FlexibilityChip>
              </Pressable>
              <Pressable onPress={() => setFlexibility('plusMinus1')}>
                <FlexibilityChip
                  borderColor={flexibility === 'plusMinus1' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <FlexibilityText color={flexibility === 'plusMinus1' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    ± 1 day
                  </FlexibilityText>
                </FlexibilityChip>
              </Pressable>
              <Pressable onPress={() => setFlexibility('plusMinus2')}>
                <FlexibilityChip
                  borderColor={flexibility === 'plusMinus2' ? primitive.color.black : primitive.color.neutral.grey['300']}
                >
                  <FlexibilityText color={flexibility === 'plusMinus2' ? primitive.color.black : primitive.color.neutral.grey['500']}>
                    ± 2 days
                  </FlexibilityText>
                </FlexibilityChip>
              </Pressable>
            </FlexibilityRow>
          </CalendarContainer>
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
