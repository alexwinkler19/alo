import React from 'react';
import { Stack, Text, styled, Image } from 'tamagui';
import { primitive } from '@alo/theme';
import Svg, { Defs, LinearGradient, Stop, Circle, Rect, Path } from 'react-native-svg';
import { ImageSourcePropType } from 'react-native';

export type UserStoryType = 'Normal' | 'Mine' | 'Live';

export interface UserStoryProps {
  /** Type of story display */
  storyType?: UserStoryType;
  /** Profile image source */
  profileImage?: ImageSourcePropType | string;
  /** User name to display */
  userName?: string;
  /** Press handler */
  onPress?: () => void;
}

// Instagram-style gradient border component
const GradientBorder = () => (
  <Svg width="57.6" height="57.6" viewBox="0 0 57.6 57.6">
    <Defs>
      <LinearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFB952" />
        <Stop offset="25%" stopColor="#FF7659" />
        <Stop offset="50%" stopColor="#C837AB" />
        <Stop offset="75%" stopColor="#8B2FA0" />
        <Stop offset="100%" stopColor="#5851DB" />
      </LinearGradient>
    </Defs>
    <Circle
      cx="28.8"
      cy="28.8"
      r="27"
      stroke="url(#instagramGradient)"
      strokeWidth="3.6"
      fill="none"
    />
  </Svg>
);

// Live badge gradient component
const LiveBadge = () => (
  <Svg width="21.6" height="12.6" viewBox="0 0 21.6 12.6">
    <Defs>
      <LinearGradient id="liveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#C7059A" />
        <Stop offset="100%" stopColor="#DD0E44" />
      </LinearGradient>
    </Defs>
    <Rect
      x="0"
      y="0"
      width="21.6"
      height="12.6"
      rx="0.9"
      fill="url(#liveGradient)"
      stroke="white"
      strokeWidth="0.9"
    />
  </Svg>
);

// Add story plus icon
const AddStoryIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Circle cx="14" cy="14" r="13" fill="#3182CE" stroke="white" strokeWidth="2" />
    <Path
      d="M14 8V20M8 14H20"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const StoryContainer = styled(Stack, {
  name: 'UserStory',
  width: 57.6,
  height: 72.9,
  position: 'relative',
  cursor: 'pointer',
});

const GradientContainer = styled(Stack, {
  name: 'GradientContainer',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 57.6,
});

const ProfilePicContainer = styled(Stack, {
  name: 'ProfilePicContainer',
  position: 'absolute',
  top: 3.6,
  left: 3.6,
  width: 50.4,
  height: 50.4,
  borderRadius: 999,
  overflow: 'hidden',
  backgroundColor: primitive.color.white,
});

const ProfileImage = styled(Image, {
  name: 'ProfileImage',
  width: '100%',
  height: '100%',
});

const UserNameText = styled(Text, {
  name: 'UserNameText',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  fontFamily: 'Inter',
  fontSize: 10,
  lineHeight: 12,
  textAlign: 'center',
  color: primitive.color.black,
  letterSpacing: -0.1485,
});

const LiveBadgeContainer = styled(Stack, {
  name: 'LiveBadgeContainer',
  position: 'absolute',
  bottom: 11.7,
  left: 18,
  width: 21.6,
  height: 12.6,
});

const LiveText = styled(Text, {
  name: 'LiveText',
  fontFamily: 'Inter',
  fontSize: 6.3,
  lineHeight: 16.2,
  fontWeight: '600',
  textAlign: 'center',
  color: primitive.color.white,
  letterSpacing: -0.1485,
  position: 'absolute',
  top: '14%',
  left: '16%',
  right: '16%',
});

const AddStoryButton = styled(Stack, {
  name: 'AddStoryButton',
  position: 'absolute',
  top: 33.2,
  right: -1.4,
  width: 28,
  height: 28,
});

/**
 * UserStory Component
 *
 * Instagram-style story display with support for normal stories, live stories, and user's own story.
 * Features gradient borders, live badges, and add story functionality.
 *
 * @example
 * ```tsx
 * // Normal story
 * <UserStory 
 *   storyType="Normal" 
 *   profileImage={require('./avatar.png')}
 *   userName="John Doe"
 *   onPress={() => console.log('View story')}
 * />
 * 
 * // Live story
 * <UserStory 
 *   storyType="Live" 
 *   profileImage={require('./avatar.png')}
 *   userName="Jane Smith"
 * />
 * 
 * // User's own story
 * <UserStory 
 *   storyType="Mine" 
 *   profileImage={require('./my-avatar.png')}
 *   userName="Your Story"
 *   onPress={() => console.log('Add story')}
 * />
 * ```
 */
export const UserStory = React.forwardRef<any, UserStoryProps>(
  (
    {
      storyType = 'Normal',
      profileImage,
      userName = 'Your Story',
      onPress,
    },
    ref
  ) => {
    const showGradient = storyType === 'Normal' || storyType === 'Live';
    const showLiveBadge = storyType === 'Live';
    const showAddButton = storyType === 'Mine';

    return (
      <StoryContainer
        ref={ref}
        onPress={onPress}
        pressStyle={{ opacity: 0.8, scale: 0.97 }}
      >
        {/* Gradient border */}
        {showGradient && (
          <GradientContainer>
            <GradientBorder />
          </GradientContainer>
        )}

        {/* Profile picture */}
        <ProfilePicContainer>
          {profileImage && (
            <ProfileImage
              source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
              resizeMode="cover"
            />
          )}
        </ProfilePicContainer>

        {/* User name */}
        <UserNameText numberOfLines={1}>{userName}</UserNameText>

        {/* Live badge */}
        {showLiveBadge && (
          <LiveBadgeContainer>
            <LiveBadge />
            <LiveText>LIVE</LiveText>
          </LiveBadgeContainer>
        )}

        {/* Add story button */}
        {showAddButton && (
          <AddStoryButton>
            <AddStoryIcon />
          </AddStoryButton>
        )}
      </StoryContainer>
    );
  }
);

UserStory.displayName = 'UserStory';
