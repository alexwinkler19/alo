import React from 'react';
import { Stack, Text, XStack, styled } from 'tamagui';
import { primitive } from '@alo/theme';
import Svg, { Line } from 'react-native-svg';

export type TopBarTab = 'Stays' | 'Experiences';

export interface TopBarProps {
  /** Currently active tab */
  activeTab?: TopBarTab;
  /** Callback when a tab is selected */
  onTabChange?: (tab: TopBarTab) => void;
  /** Callback when plus button is pressed */
  onPlusPress?: () => void;
  /** Show or hide the plus button */
  showPlusButton?: boolean;
}

// Plus icon component
const PlusIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Line
      x1="10"
      y1="3.33333"
      x2="10"
      y2="16.6667"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="3.33333"
      y1="10"
      x2="16.6667"
      y2="10"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TopBarContainer = styled(XStack, {
  name: 'TopBar',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingHorizontal: 24,
  paddingTop: 16,
  width: '100%',
});

const TabsContainer = styled(XStack, {
  name: 'TabsContainer',
  gap: 16,
});

const Tab = styled(XStack, {
  name: 'Tab',
  alignItems: 'center',
  paddingBottom: 12,
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  cursor: 'pointer',

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

const PlusButton = styled(Stack, {
  name: 'PlusButton',
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginTop: 2,
});

/**
 * TopBar Component
 *
 * Navigation bar with tabs for switching between Stays and Experiences.
 * Includes an optional plus button for adding new items.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState<TopBarTab>('Stays');
 * <TopBar 
 *   activeTab={activeTab} 
 *   onTabChange={setActiveTab}
 *   onPlusPress={() => console.log('Plus pressed')}
 *   showPlusButton
 * />
 * ```
 */
export const TopBar = React.forwardRef<any, TopBarProps>(
  (
    {
      activeTab = 'Stays',
      onTabChange,
      onPlusPress,
      showPlusButton = true,
    },
    ref
  ) => {
    return (
      <TopBarContainer ref={ref}>
        <TabsContainer>
          <Tab
            active={activeTab === 'Stays'}
            onPress={() => onTabChange?.('Stays')}
            pressStyle={{ opacity: 0.7 }}
          >
            <TabText active={activeTab === 'Stays'}>Stays</TabText>
          </Tab>

          <Tab
            active={activeTab === 'Experiences'}
            onPress={() => onTabChange?.('Experiences')}
            pressStyle={{ opacity: 0.7 }}
          >
            <TabText active={activeTab === 'Experiences'}>Experiences</TabText>
          </Tab>
        </TabsContainer>

        {showPlusButton && (
          <PlusButton
            onPress={onPlusPress}
            pressStyle={{ opacity: 0.7, scale: 0.95 }}
          >
            <PlusIcon />
          </PlusButton>
        )}
      </TopBarContainer>
    );
  }
);

TopBar.displayName = 'TopBar';
