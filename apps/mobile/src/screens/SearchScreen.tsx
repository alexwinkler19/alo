import React, { useState } from 'react';
import {
  StatusBar,
  Pressable,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { YStack, XStack, Stack, Text, styled } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primitive } from '@alo/theme';
import Svg, { Path, Circle } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<AppStackParamList, 'Search'>;

type ExpandedCard = 'where' | 'when' | 'who' | null;

interface DateRange {
  start: { day: number; month: number } | null;
  end: { day: number; month: number } | null;
}

interface LocationSuggestion {
  id: string;
  name: string;
  subtitle: string;
}

interface CalendarMonth {
  month: number; // 0-11
  year: number;
  name: string;
  days: (number | null)[][];
}

// Today's date for comparison
const TODAY = new Date();
const TODAY_DAY = TODAY.getDate();
const TODAY_MONTH = TODAY.getMonth();
const TODAY_YEAR = TODAY.getFullYear();

/**
 * Styled Components
 */
const ScreenContainer = styled(YStack, {
  name: 'SearchScreen',
  flex: 1,
  backgroundColor: '#f0f0f0',
});

const HeaderRow = styled(XStack, {
  name: 'HeaderRow',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 16,
  paddingHorizontal: 20,
  backgroundColor: '#f0f0f0',
});

const CloseButton = styled(Stack, {
  name: 'CloseButton',
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
});

const HeaderSpacer = styled(Stack, {
  name: 'HeaderSpacer',
  width: 32,
  height: 32,
});

const CardsContainer = styled(YStack, {
  name: 'CardsContainer',
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 8,
  paddingBottom: 10,
  gap: 10,
});

// Collapsed Card
const CollapsedCard = styled(XStack, {
  name: 'CollapsedCard',
  backgroundColor: primitive.color.white,
  borderRadius: 16,
  paddingHorizontal: 24,
  paddingVertical: 18,
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CollapsedLabel = styled(Text, {
  name: 'CollapsedLabel',
  fontSize: 14,
  fontWeight: '400',
  color: primitive.color.neutral.grey['600'],
});

const CollapsedValue = styled(Text, {
  name: 'CollapsedValue',
  fontSize: 14,
  fontWeight: '600',
  color: primitive.color.black,
});

// Expanded Card - uses flex: 1 to fill available space
const ExpandedCard = styled(YStack, {
  name: 'ExpandedCard',
  flex: 1,
  backgroundColor: primitive.color.white,
  borderRadius: 16,
  padding: 24,
  gap: 20,
});

// Expanded Card that hugs content (for Who card)
const ExpandedCardHug = styled(YStack, {
  name: 'ExpandedCardHug',
  backgroundColor: primitive.color.white,
  borderRadius: 16,
  padding: 24,
  gap: 20,
});

const CardTitle = styled(Text, {
  name: 'CardTitle',
  fontSize: 22,
  fontWeight: '700',
  color: primitive.color.black,
});

// Search Input
const SearchInputContainer = styled(XStack, {
  name: 'SearchInputContainer',
  backgroundColor: primitive.color.white,
  borderWidth: 1,
  borderColor: primitive.color.neutral.grey['300'],
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 14,
  alignItems: 'center',
  gap: 12,
});

const StyledTextInput = styled(TextInput, {
  name: 'StyledTextInput',
  flex: 1,
  fontSize: 16,
  color: primitive.color.black,
  padding: 0,
});

// Location Suggestions
const SuggestionsContainer = styled(YStack, {
  name: 'SuggestionsContainer',
  flex: 1,
  gap: 4,
});

const SuggestionsTitle = styled(Text, {
  name: 'SuggestionsTitle',
  fontSize: 12,
  fontWeight: '600',
  color: primitive.color.neutral.grey['600'],
  marginBottom: 8,
});

const SuggestionItem = styled(XStack, {
  name: 'SuggestionItem',
  alignItems: 'center',
  gap: 16,
  paddingVertical: 12,
});

const SuggestionIcon = styled(Stack, {
  name: 'SuggestionIcon',
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: primitive.color.neutral.grey['100'],
  alignItems: 'center',
  justifyContent: 'center',
});

const SuggestionText = styled(YStack, {
  name: 'SuggestionText',
  flex: 1,
  gap: 2,
});

const SuggestionName = styled(Text, {
  name: 'SuggestionName',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const SuggestionSubtitle = styled(Text, {
  name: 'SuggestionSubtitle',
  fontSize: 13,
  fontWeight: '400',
  color: primitive.color.neutral.grey['600'],
});

// Calendar Styles
const CalendarScrollContainer = styled(YStack, {
  name: 'CalendarScrollContainer',
  flex: 1,
});

// Flexible Styles
const FlexibleContainer = styled(YStack, {
  name: 'FlexibleContainer',
  flex: 1,
  gap: 16,
});

const FlexibleSection = styled(YStack, {
  name: 'FlexibleSection',
  gap: 12,
});

const FlexibleSectionTitle = styled(Text, {
  name: 'FlexibleSectionTitle',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const DurationChip = styled(Stack, {
  name: 'DurationChip',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 24,
  borderWidth: 1,
  marginRight: 8,
});

const DurationChipText = styled(Text, {
  name: 'DurationChipText',
  fontSize: 14,
  fontWeight: '500',
});

const MonthCard = styled(YStack, {
  name: 'MonthCard',
  width: 110,
  height: 130,
  borderRadius: 16,
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  marginRight: 12,
});

const MonthCardIcon = styled(Stack, {
  name: 'MonthCardIcon',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
});

const MonthCardName = styled(Text, {
  name: 'MonthCardName',
  fontSize: 15,
  fontWeight: '600',
  color: primitive.color.black,
});

const MonthCardYear = styled(Text, {
  name: 'MonthCardYear',
  fontSize: 13,
  fontWeight: '400',
  color: primitive.color.neutral.grey['600'],
});

const Divider = styled(Stack, {
  name: 'Divider',
  height: 1,
  backgroundColor: primitive.color.neutral.grey['200'],
  marginVertical: 4,
});

const WhenTabsContainer = styled(XStack, {
  name: 'WhenTabsContainer',
  backgroundColor: primitive.color.neutral.grey['200'],
  borderRadius: 20,
  padding: 4,
  height: 40,
  flexShrink: 0,
});

const WhenTab = styled(Stack, {
  name: 'WhenTab',
  flex: 1,
  height: 32,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
});

const WhenTabText = styled(Text, {
  name: 'WhenTabText',
  fontSize: 14,
  fontWeight: '500',
  color: primitive.color.neutral.grey['600'],
});

const MonthYearText = styled(Text, {
  name: 'MonthYearText',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
  marginTop: 16,
  marginBottom: 8,
});

const WeekdaysRow = styled(XStack, {
  name: 'WeekdaysRow',
  justifyContent: 'space-around',
  marginBottom: 8,
});

const WeekdayText = styled(Text, {
  name: 'WeekdayText',
  fontSize: 12,
  fontWeight: '600',
  color: primitive.color.neutral.grey['500'],
  width: 40,
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

const FlexibilityRow = styled(XStack, {
  name: 'FlexibilityRow',
  gap: 8,
  marginTop: 16,
});

const FlexibilityChip = styled(Stack, {
  name: 'FlexibilityChip',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 24,
  borderWidth: 1,
});

const FlexibilityText = styled(Text, {
  name: 'FlexibilityText',
  fontSize: 14,
  fontWeight: '500',
});

// Guest Counter Styles
const GuestRow = styled(XStack, {
  name: 'GuestRow',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
});

const GuestLabelContainer = styled(YStack, {
  name: 'GuestLabelContainer',
  gap: 2,
});

const GuestLabel = styled(Text, {
  name: 'GuestLabel',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.black,
});

const GuestSubtext = styled(Text, {
  name: 'GuestSubtext',
  fontSize: 13,
  fontWeight: '400',
  color: primitive.color.neutral.grey['500'],
});

const CounterContainer = styled(XStack, {
  name: 'CounterContainer',
  alignItems: 'center',
  gap: 16,
});

const CounterButton = styled(Stack, {
  name: 'CounterButton',
  width: 36,
  height: 36,
  borderRadius: 18,
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: primitive.color.white,
});

const CounterValue = styled(Text, {
  name: 'CounterValue',
  fontSize: 18,
  fontWeight: '500',
  color: primitive.color.black,
  minWidth: 32,
  textAlign: 'center',
});

const BottomContainer = styled(Stack, {
  name: 'BottomContainer',
  backgroundColor: primitive.color.white,
  borderTopWidth: 1,
  borderTopColor: primitive.color.neutral.grey['200'],
});

const BottomBarContent = styled(XStack, {
  name: 'BottomBarContent',
  paddingHorizontal: 24,
  paddingVertical: 16,
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ClearAllText = styled(Text, {
  name: 'ClearAllText',
  fontSize: 16,
  fontWeight: '500',
  color: primitive.color.black,
  textDecorationLine: 'underline',
});

const FinishButton = styled(XStack, {
  name: 'FinishButton',
  backgroundColor: primitive.color.brand.primary['900'],
  paddingHorizontal: 24,
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  gap: 8,
});

const FinishButtonText = styled(Text, {
  name: 'FinishButtonText',
  fontSize: 16,
  fontWeight: '600',
  color: primitive.color.white,
});

// Icons
const CloseIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke={primitive.color.black}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle cx="9" cy="9" r="6" stroke={primitive.color.neutral.grey['500']} strokeWidth="2" fill="none" />
    <Path d="M14 14L18 18" stroke={primitive.color.neutral.grey['500']} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke={primitive.color.neutral.grey['600']}
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="12" cy="9" r="2.5" stroke={primitive.color.neutral.grey['600']} strokeWidth="2" fill="none" />
  </Svg>
);

const MinusIcon = ({ disabled }: { disabled?: boolean }) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M3 8H13"
      stroke={disabled ? primitive.color.neutral.grey['300'] : primitive.color.neutral.grey['600']}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const PlusIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M8 3V13" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 8H13" stroke={primitive.color.black} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const ArrowRightIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M4 10H16" stroke={primitive.color.white} strokeWidth="2" strokeLinecap="round" />
    <Path d="M11 5L16 10L11 15" stroke={primitive.color.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ selected }: { selected?: boolean }) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Path
      d="M6 12H26M10 6V8M22 6V8M8 28H24C25.1046 28 26 27.1046 26 26V10C26 8.89543 25.1046 8 24 8H8C6.89543 8 6 8.89543 6 10V26C6 27.1046 6.89543 28 8 28Z"
      stroke={selected ? primitive.color.black : primitive.color.neutral.grey['500']}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Sample data
const locationSuggestions: LocationSuggestion[] = [
  { id: '1', name: 'Nearby', subtitle: 'Discover options nearby' },
  { id: '2', name: 'Chamonix', subtitle: 'For nature lovers' },
  { id: '3', name: 'Annecy', subtitle: 'Popular destination near a lake' },
  { id: '4', name: 'Paris', subtitle: 'City of lights' },
];

// Duration options for flexible dates
type DurationType = 'weekend' | 'week' | 'month';

interface DurationOption {
  id: DurationType;
  label: string;
}

const durationOptions: DurationOption[] = [
  { id: 'weekend', label: 'A weekend' },
  { id: 'week', label: 'A week' },
  { id: 'month', label: 'A month' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate flexible months (next 12 months)
interface FlexibleMonth {
  id: string;
  month: number;
  year: number;
  name: string;
}

const generateFlexibleMonths = (): FlexibleMonth[] => {
  const months: FlexibleMonth[] = [];
  for (let i = 1; i <= 12; i++) {
    const date = new Date(TODAY_YEAR, TODAY_MONTH + i, 1);
    const month = date.getMonth();
    const year = date.getFullYear();
    months.push({
      id: `${year}-${month}`,
      month,
      year,
      name: MONTH_NAMES[month],
    });
  }
  return months;
};

const flexibleMonths = generateFlexibleMonths();

// Generate calendar months (6 months from now)
const generateCalendarMonths = (): CalendarMonth[] => {
  const months: CalendarMonth[] = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(TODAY_YEAR, TODAY_MONTH + i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];

    // Fill in empty days at start
    for (let j = 0; j < adjustedFirstDay; j++) {
      currentWeek.push(null);
    }

    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill in remaining empty days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    months.push({
      month,
      year,
      name: `${MONTH_NAMES[month]} ${year}`,
      days: weeks,
    });
  }

  return months;
};

const BRAND_COLOR = '#0a0a0a';
const RANGE_BG_COLOR = '#e8e8e8';

/**
 * Date Cell Component with proper range styling
 */
interface DateCellProps {
  date: number | null;
  month: number;
  year: number;
  dateRange: DateRange;
  onSelect: (day: number, month: number, year: number) => void;
}

const DateCell: React.FC<DateCellProps> = ({ date, month, year, dateRange, onSelect }) => {
  if (date === null) {
    return <Stack width={40} height={40} />;
  }

  const isPast =
    year < TODAY_YEAR ||
    (year === TODAY_YEAR && month < TODAY_MONTH) ||
    (year === TODAY_YEAR && month === TODAY_MONTH && date < TODAY_DAY);

  const isStart = dateRange.start &&
    dateRange.start.day === date &&
    dateRange.start.month === month;

  const isEnd = dateRange.end &&
    dateRange.end.day === date &&
    dateRange.end.month === month;

  const isInRange = (() => {
    if (!dateRange.start || !dateRange.end) return false;

    const currentDate = new Date(year, month, date);
    const startDate = new Date(
      dateRange.start.month < 6 ? TODAY_YEAR : TODAY_YEAR,
      dateRange.start.month,
      dateRange.start.day
    );
    const endDate = new Date(
      dateRange.end.month < 6 ? TODAY_YEAR : TODAY_YEAR,
      dateRange.end.month,
      dateRange.end.day
    );

    return currentDate > startDate && currentDate < endDate;
  })();

  // Determine background styling for range
  let backgroundStyle: object = {};
  if (isStart && dateRange.end) {
    backgroundStyle = {
      backgroundColor: RANGE_BG_COLOR,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  } else if (isEnd && dateRange.start) {
    backgroundStyle = {
      backgroundColor: RANGE_BG_COLOR,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
  } else if (isInRange) {
    backgroundStyle = {
      backgroundColor: RANGE_BG_COLOR,
      borderRadius: 0,
    };
  }

  return (
    <Pressable
      onPress={() => !isPast && onSelect(date, month, year)}
      disabled={isPast}
    >
      <Stack
        width={40}
        height={40}
        alignItems="center"
        justifyContent="center"
        style={backgroundStyle}
      >
        <Stack
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor={isStart || isEnd ? BRAND_COLOR : 'transparent'}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={15}
            fontWeight={isStart || isEnd ? '600' : '500'}
            color={
              isStart || isEnd
                ? primitive.color.white
                : isPast
                ? primitive.color.neutral.grey['400']
                : primitive.color.black
            }
            style={isPast ? { textDecorationLine: 'line-through' } : undefined}
          >
            {date}
          </Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

/**
 * SearchScreen Component - Accordion Style
 */
export default function SearchScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // Expanded state
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>('where');

  // Where state
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // When state
  const [whenTab, setWhenTab] = useState<'Dates' | 'Flexible'>('Dates');
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [flexibility, setFlexibility] = useState<'exact' | 'plusMinus1' | 'plusMinus2'>('exact');

  // Flexible state
  const [selectedDuration, setSelectedDuration] = useState<DurationType>('weekend');
  const [selectedFlexMonth, setSelectedFlexMonth] = useState<string | null>(null);

  // Who state
  const [guests, setGuests] = useState(0);

  const calendarMonths = generateCalendarMonths();

  const toggleCard = (card: ExpandedCard) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCard(expandedCard === card ? null : card);
  };

  const handleLocationSelect = (location: LocationSuggestion) => {
    setSelectedLocation(location.name);
    setSearchText(location.name);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCard('when');
  };

  const handleDateSelect = (day: number, month: number, year: number) => {
    const newDate = { day, month };

    if (dateRange.start === null) {
      setDateRange({ start: newDate, end: null });
    } else if (dateRange.end === null) {
      const startDate = new Date(TODAY_YEAR, dateRange.start.month, dateRange.start.day);
      const selectedDate = new Date(year, month, day);

      if (selectedDate < startDate) {
        setDateRange({ start: newDate, end: dateRange.start });
      } else if (selectedDate.getTime() === startDate.getTime()) {
        setDateRange({ start: null, end: null });
      } else {
        setDateRange({ start: dateRange.start, end: newDate });
      }
    } else {
      setDateRange({ start: newDate, end: null });
    }
  };

  const handleFinish = () => {
    console.log('Finish with:', { location: selectedLocation, dateRange, guests });
    navigation.goBack();
  };

  const handleClearAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchText('');
    setSelectedLocation(null);
    setDateRange({ start: null, end: null });
    setGuests(0);
    setWhenTab('Dates');
    setSelectedDuration('weekend');
    setSelectedFlexMonth(null);
    setExpandedCard('where');
  };

  // Format display values
  const getWhereValue = () => {
    if (selectedLocation) return selectedLocation;
    return "I'm flexible";
  };

  const getWhenValue = () => {
    if (whenTab === 'Flexible') {
      if (selectedFlexMonth) {
        const month = flexibleMonths.find(m => m.id === selectedFlexMonth);
        const durationLabel = durationOptions.find(d => d.id === selectedDuration)?.label || '';
        return month ? `${durationLabel} in ${month.name}` : 'Flexible';
      }
      return 'Flexible';
    }
    if (dateRange.start === null) return 'Add dates';
    const startStr = `${MONTH_NAMES[dateRange.start.month].slice(0, 3)} ${dateRange.start.day}`;
    if (dateRange.end === null) return startStr;
    const endStr = `${MONTH_NAMES[dateRange.end.month].slice(0, 3)} ${dateRange.end.day}`;
    return `${startStr} - ${endStr}`;
  };

  const getWhoValue = () => {
    if (guests === 0) return 'Add people';
    return `${guests} ${guests > 1 ? 'people' : 'person'}`;
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />
      <Stack height={insets.top} backgroundColor="#f0f0f0" />

      {/* Header - fixed at top */}
      <HeaderRow>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </Pressable>
        <Image
          source={require('../../assets/alo-logo.png')}
          style={{ width: 128, height: 64 }}
          resizeMode="contain"
        />
        <HeaderSpacer />
      </HeaderRow>

      <CardsContainer>
        {/* WHERE CARD */}
        {expandedCard === 'where' ? (
          <ExpandedCard>
            <CardTitle>Where?</CardTitle>

            <SearchInputContainer>
              <SearchIcon />
              <StyledTextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search destinations"
                placeholderTextColor={primitive.color.neutral.grey['500']}
              />
            </SearchInputContainer>

            <SuggestionsContainer>
              <SuggestionsTitle>Destination suggestions</SuggestionsTitle>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {locationSuggestions.map((location) => (
                  <Pressable key={location.id} onPress={() => handleLocationSelect(location)}>
                    <SuggestionItem>
                      <SuggestionIcon>
                        <LocationIcon />
                      </SuggestionIcon>
                      <SuggestionText>
                        <SuggestionName>{location.name}</SuggestionName>
                        <SuggestionSubtitle>{location.subtitle}</SuggestionSubtitle>
                      </SuggestionText>
                    </SuggestionItem>
                  </Pressable>
                ))}
              </ScrollView>
            </SuggestionsContainer>
          </ExpandedCard>
        ) : (
            <Pressable onPress={() => toggleCard('where')}>
              <CollapsedCard>
                <CollapsedLabel>Where</CollapsedLabel>
                <CollapsedValue>{getWhereValue()}</CollapsedValue>
              </CollapsedCard>
            </Pressable>
          )}

          {/* WHEN CARD */}
          {expandedCard === 'when' ? (
            <ExpandedCard>
              <CardTitle>When?</CardTitle>

              <WhenTabsContainer>
                <Pressable style={{ flex: 1 }} onPress={() => setWhenTab('Dates')}>
                  <WhenTab backgroundColor={whenTab === 'Dates' ? primitive.color.white : 'transparent'}>
                    <WhenTabText color={whenTab === 'Dates' ? primitive.color.black : primitive.color.neutral.grey['600']}>
                      Dates
                    </WhenTabText>
                  </WhenTab>
                </Pressable>
                <Pressable style={{ flex: 1 }} onPress={() => setWhenTab('Flexible')}>
                  <WhenTab backgroundColor={whenTab === 'Flexible' ? primitive.color.white : 'transparent'}>
                    <WhenTabText color={whenTab === 'Flexible' ? primitive.color.black : primitive.color.neutral.grey['600']}>
                      Flexible
                    </WhenTabText>
                  </WhenTab>
                </Pressable>
              </WhenTabsContainer>

              {whenTab === 'Dates' ? (
                <>
                  <WeekdaysRow>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <WeekdayText key={`weekday-${index}`}>{day}</WeekdayText>
                    ))}
                  </WeekdaysRow>

                  <CalendarScrollContainer>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled={true}
                    >
                      {calendarMonths.map((calMonth, monthIndex) => (
                        <YStack key={`month-${monthIndex}`}>
                          <MonthYearText>{calMonth.name}</MonthYearText>
                          <DatesGrid>
                            {calMonth.days.map((week, weekIndex) => (
                              <DateRow key={`week-${monthIndex}-${weekIndex}`}>
                                {week.map((date, dateIndex) => (
                                  <DateCell
                                    key={`date-${monthIndex}-${weekIndex}-${dateIndex}`}
                                    date={date}
                                    month={calMonth.month}
                                    year={calMonth.year}
                                    dateRange={dateRange}
                                    onSelect={handleDateSelect}
                                  />
                                ))}
                              </DateRow>
                            ))}
                          </DatesGrid>
                        </YStack>
                      ))}
                    </ScrollView>
                  </CalendarScrollContainer>

                  <FlexibilityRow>
                <Pressable onPress={() => setFlexibility('exact')}>
                  <FlexibilityChip
                    borderColor={flexibility === 'exact' ? primitive.color.black : primitive.color.neutral.grey['300']}
                    backgroundColor={flexibility === 'exact' ? primitive.color.neutral.grey['100'] : 'transparent'}
                  >
                    <FlexibilityText color={flexibility === 'exact' ? primitive.color.black : primitive.color.neutral.grey['600']}>
                      Exact dates
                    </FlexibilityText>
                  </FlexibilityChip>
                </Pressable>
                <Pressable onPress={() => setFlexibility('plusMinus1')}>
                  <FlexibilityChip
                    borderColor={flexibility === 'plusMinus1' ? primitive.color.black : primitive.color.neutral.grey['300']}
                    backgroundColor={flexibility === 'plusMinus1' ? primitive.color.neutral.grey['100'] : 'transparent'}
                  >
                    <FlexibilityText color={flexibility === 'plusMinus1' ? primitive.color.black : primitive.color.neutral.grey['600']}>
                      ± 1 day
                    </FlexibilityText>
                  </FlexibilityChip>
                </Pressable>
                <Pressable onPress={() => setFlexibility('plusMinus2')}>
                  <FlexibilityChip
                    borderColor={flexibility === 'plusMinus2' ? primitive.color.black : primitive.color.neutral.grey['300']}
                    backgroundColor={flexibility === 'plusMinus2' ? primitive.color.neutral.grey['100'] : 'transparent'}
                  >
                    <FlexibilityText color={flexibility === 'plusMinus2' ? primitive.color.black : primitive.color.neutral.grey['600']}>
                      ± 2 days
                    </FlexibilityText>
                  </FlexibilityChip>
                </Pressable>
              </FlexibilityRow>
                </>
              ) : (
                <FlexibleContainer>
                  {/* Duration Selection */}
                  <FlexibleSection>
                    <FlexibleSectionTitle>How long would you like to stay?</FlexibleSectionTitle>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 16 }}
                    >
                      {durationOptions.map((option) => (
                        <Pressable key={option.id} onPress={() => setSelectedDuration(option.id)}>
                          <DurationChip
                            borderColor={selectedDuration === option.id ? primitive.color.black : primitive.color.neutral.grey['300']}
                            backgroundColor={selectedDuration === option.id ? primitive.color.neutral.grey['100'] : 'transparent'}
                          >
                            <DurationChipText
                              color={selectedDuration === option.id ? primitive.color.black : primitive.color.neutral.grey['600']}
                            >
                              {option.label}
                            </DurationChipText>
                          </DurationChip>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </FlexibleSection>

                  <Divider />

                  {/* Month Selection */}
                  <FlexibleSection>
                    <FlexibleSectionTitle>When do you want to go?</FlexibleSectionTitle>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 16 }}
                    >
                      {flexibleMonths.map((month) => (
                        <Pressable key={month.id} onPress={() => setSelectedFlexMonth(month.id)}>
                          <MonthCard
                            borderColor={selectedFlexMonth === month.id ? primitive.color.black : primitive.color.neutral.grey['300']}
                            borderWidth={selectedFlexMonth === month.id ? 2 : 1}
                          >
                            <MonthCardIcon>
                              <CalendarIcon selected={selectedFlexMonth === month.id} />
                            </MonthCardIcon>
                            <MonthCardName>{month.name}</MonthCardName>
                            <MonthCardYear>{month.year}</MonthCardYear>
                          </MonthCard>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </FlexibleSection>
                </FlexibleContainer>
              )}
            </ExpandedCard>
          ) : (
            <Pressable onPress={() => toggleCard('when')}>
              <CollapsedCard>
                <CollapsedLabel>When</CollapsedLabel>
                <CollapsedValue>{getWhenValue()}</CollapsedValue>
              </CollapsedCard>
            </Pressable>
          )}

          {/* WHO CARD */}
          {expandedCard === 'who' ? (
            <ExpandedCardHug>
              <CardTitle>Spots available?</CardTitle>

              <GuestRow>
                <GuestLabelContainer>
                  <GuestLabel>People</GuestLabel>
                  <GuestSubtext>excluding yourself</GuestSubtext>
                </GuestLabelContainer>
                <CounterContainer>
                  <Pressable onPress={() => guests > 0 && setGuests(guests - 1)} disabled={guests === 0}>
                    <CounterButton borderColor={guests === 0 ? primitive.color.neutral.grey['200'] : primitive.color.neutral.grey['300']}>
                      <MinusIcon disabled={guests === 0} />
                    </CounterButton>
                  </Pressable>
                  <CounterValue>{guests}</CounterValue>
                  <Pressable onPress={() => setGuests(guests + 1)}>
                    <CounterButton borderColor={primitive.color.neutral.grey['300']}>
                      <PlusIcon />
                    </CounterButton>
                  </Pressable>
                </CounterContainer>
              </GuestRow>
            </ExpandedCardHug>
          ) : (
            <Pressable onPress={() => toggleCard('who')}>
              <CollapsedCard>
                <CollapsedLabel>People</CollapsedLabel>
                <CollapsedValue>{getWhoValue()}</CollapsedValue>
              </CollapsedCard>
            </Pressable>
          )}
        </CardsContainer>

      {/* Bottom Bar */}
      <BottomContainer style={{ paddingBottom: insets.bottom }}>
        <BottomBarContent>
          <Pressable onPress={handleClearAll}>
            <ClearAllText>Clear all</ClearAllText>
          </Pressable>
          <Pressable onPress={handleFinish}>
            <FinishButton>
              <FinishButtonText>Finish</FinishButtonText>
              <ArrowRightIcon />
            </FinishButton>
          </Pressable>
        </BottomBarContent>
      </BottomContainer>
    </ScreenContainer>
  );
}
