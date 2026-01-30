import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';
import { Stack, Text, XStack, styled } from 'tamagui';
import { primitive } from '@alo/theme';
import Svg, { Line, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

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
  /** Disable the intro animation */
  disableAnimation?: boolean;
}

// Plus icon component
const PlusIcon = ({ color = 'black' }: { color?: string }) => (
  <Svg width="24" height="24" viewBox="0 0 20 20" fill="none">
    <Line
      x1="10"
      y1="3.33333"
      x2="10"
      y2="16.6667"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="3.33333"
      y1="10"
      x2="16.6667"
      y2="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Gradient background component using SVG - vibrant pink to orange
const GradientBackground = () => (
  <Svg width={BADGE_WIDTH} height={BADGE_HEIGHT} style={StyleSheet.absoluteFill}>
    <Defs>
      <LinearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E91E63" />
        <Stop offset="50%" stopColor="#F44336" />
        <Stop offset="100%" stopColor="#FF9800" />
      </LinearGradient>
    </Defs>
    <Rect
      x="0"
      y="0"
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      rx={BADGE_HEIGHT / 2}
      ry={BADGE_HEIGHT / 2}
      fill="url(#brandGradient)"
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

// Animation constants
const ICON_SIZE = 28;
const BADGE_WIDTH = 86;
const BADGE_HEIGHT = 28; // Leaner badge
const SPIN_DURATION = 400; // Duration for full spin
const EXPAND_DURATION = 300; // Duration for badge expansion
const DISPLAY_DURATION = 2000;
const INITIAL_DELAY = 800;

/**
 * AnimatedCreateButton Component
 *
 * Animated button that expands from a plus icon into a "create" badge,
 * stays visible for 2 seconds, then collapses back to the plus icon.
 * Features spinning plus icon and gradient background.
 */
const AnimatedCreateButton = ({
  onPress,
  disableAnimation = false
}: {
  onPress?: () => void;
  disableAnimation?: boolean;
}) => {
  const isMounted = useRef(true);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animatedWidth = useRef(new Animated.Value(ICON_SIZE)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    isMounted.current = true;

    if (disableAnimation) return;

    const initialTimer = setTimeout(() => {
      if (isMounted.current) {
        expandAnimation();
      }
    }, INITIAL_DELAY);

    return () => {
      isMounted.current = false;
      clearTimeout(initialTimer);
      if (collapseTimer.current) {
        clearTimeout(collapseTimer.current);
      }
    };
  }, [disableAnimation]);

  const expandAnimation = () => {
    // Spin and expansion happen together - badge opens while icon spins
    Animated.parallel([
      // Full 360° spin
      Animated.timing(iconRotation, {
        toValue: 1,
        duration: SPIN_DURATION,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      // Badge expansion starts partway through spin (creates "opening" effect)
      Animated.sequence([
        Animated.delay(SPIN_DURATION * 0.6), // Start at 60% of spin - let plus spin visibly first
        Animated.parallel([
          // Fade in gradient background
          Animated.timing(backgroundOpacity, {
            toValue: 1,
            duration: EXPAND_DURATION * 0.4,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          // Expand width with slight overshoot
          Animated.timing(animatedWidth, {
            toValue: BADGE_WIDTH,
            duration: EXPAND_DURATION,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: false,
          }),
          // Scale down and fade icon as badge expands
          Animated.timing(iconScale, {
            toValue: 0.5,
            duration: EXPAND_DURATION * 0.5,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(iconOpacity, {
            toValue: 0,
            duration: EXPAND_DURATION * 0.5,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          // Fade in text (slightly delayed)
          Animated.sequence([
            Animated.delay(EXPAND_DURATION * 0.4),
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: EXPAND_DURATION * 0.4,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            }),
          ]),
        ]),
      ]),
    ]).start(() => {
      if (isMounted.current) {
        collapseTimer.current = setTimeout(() => {
          if (isMounted.current) {
            collapseAnimation();
          }
        }, DISPLAY_DURATION);
      }
    });
  };

  const collapseAnimation = () => {
    const COLLAPSE_DURATION = EXPAND_DURATION;
    Animated.parallel([
      // Collapse width
      Animated.timing(animatedWidth, {
        toValue: ICON_SIZE,
        duration: COLLAPSE_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      // Fade out text
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: COLLAPSE_DURATION / 3,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }),
      // Fade out gradient background (delayed)
      Animated.sequence([
        Animated.delay(COLLAPSE_DURATION / 2),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: COLLAPSE_DURATION / 2,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
      // Spin icon counter-clockwise (back to 0) while scaling up and fading in
      Animated.sequence([
        Animated.delay(COLLAPSE_DURATION / 3),
        Animated.parallel([
          Animated.timing(iconRotation, {
            toValue: 0,
            duration: COLLAPSE_DURATION,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(iconScale, {
            toValue: 1,
            duration: COLLAPSE_DURATION / 2,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: false,
          }),
          Animated.timing(iconOpacity, {
            toValue: 1,
            duration: COLLAPSE_DURATION / 2,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
        ]),
      ]),
    ]).start();
  };

  // Interpolate rotation: 0 -> 360 degrees clockwise on expand (full rotation)
  const rotationInterpolate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Animated.View
        style={[
          styles.container,
          { width: animatedWidth },
        ]}
      >
        {/* Gradient Background */}
        <Animated.View
          style={[
            styles.gradientContainer,
            { opacity: backgroundOpacity },
          ]}
        >
          <GradientBackground />
        </Animated.View>

        {/* Plus Icon with rotation and scale */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: iconOpacity,
              transform: [
                { rotate: rotationInterpolate },
                { scale: iconScale },
              ],
            },
          ]}
        >
          <PlusIcon color="black" />
        </Animated.View>

        {/* Create Text */}
        <Animated.View
          style={[
            styles.textContainer,
            { opacity: textOpacity },
          ]}
        >
          <Animated.Text style={styles.createText}>create</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginTop: -3,
  },
  container: {
    height: BADGE_HEIGHT,
    borderRadius: BADGE_HEIGHT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

/**
 * TopBar Component
 *
 * Navigation bar with tabs for switching between Stays and Experiences.
 * Includes an optional plus button that animates into a "create" badge
 * with spinning icon and gradient background.
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
      disableAnimation = false,
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
          <AnimatedCreateButton
            onPress={onPlusPress}
            disableAnimation={disableAnimation}
          />
        )}
      </TopBarContainer>
    );
  }
);

TopBar.displayName = 'TopBar';
