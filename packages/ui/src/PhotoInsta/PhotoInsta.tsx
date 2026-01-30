import React, { useState, useRef } from 'react';
import { Stack, XStack, YStack, Text, Image, styled } from 'tamagui';
import { primitive, typography } from '@alo/theme';
import { ImageSourcePropType, Animated, Easing } from 'react-native';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

export type PhotoInstaSize = 'Square' | 'Landscape' | 'Portrait';

export interface PhotoInstaProps {
  /** Size/aspect ratio of the photo */
  size?: PhotoInstaSize;
  /** Whether this is a sponsored post */
  sponsored?: boolean;
  /** Whether this post has a carousel of images */
  carousel?: boolean;
  /** User profile data */
  user?: {
    name: string;
    location?: string;
    avatar?: ImageSourcePropType | string;
  };
  /** Main image or array of images for carousel */
  images?: (ImageSourcePropType | string)[];
  /** Like count text */
  likedBy?: string;
  /** Post caption */
  caption?: {
    username: string;
    text: string;
    hashtags?: string[];
  };
  /** Number of comments */
  commentCount?: number;
  /** Current carousel index (for carousel posts) */
  currentImageIndex?: number;
  /** Hide the 3-dot menu button */
  hideMenu?: boolean;
  /** Hide the location under the username */
  hideLocation?: boolean;
  /** Hide the bookmark icon */
  hideBookmark?: boolean;
  /** Whether this post is currently liked (controlled) */
  isLiked?: boolean;
  /** Callbacks */
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onLearnMore?: () => void;
  onMenuPress?: () => void;
  onUserPress?: () => void;
}

// Icon components
const HEART_COLOR = '#ed2c23';
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? HEART_COLOR : 'none'}>
    <Path
      d="M20.84 4.61C20.3292 4.09944 19.7228 3.69789 19.0554 3.42823C18.3879 3.15858 17.6725 3.02563 16.95 3.02563C16.2275 3.02563 15.5121 3.15858 14.8446 3.42823C14.1772 3.69789 13.5708 4.09944 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3506 11.8792 21.7521 11.2728 22.0218 10.6054C22.2914 9.93789 22.4244 9.22249 22.4244 8.5C22.4244 7.77751 22.2914 7.0621 22.0218 6.39464C21.7521 5.72718 21.3506 5.12075 20.84 4.61Z"
      stroke={filled ? HEART_COLOR : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CommentIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.60557 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47091C20.0052 6.94703 20.885 8.91568 21 11V11.5Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShareIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookmarkIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ThreeDotsIcon = () => (
  <Svg width="13" height="3" viewBox="0 0 13 3" fill="none">
    <Circle cx="1.5" cy="1.5" r="1.5" fill="black" />
    <Circle cx="6.5" cy="1.5" r="1.5" fill="black" />
    <Circle cx="11.5" cy="1.5" r="1.5" fill="black" />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 12L10 8L6 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Carousel indicator dots
const CarouselIndicator = ({ active }: { active: boolean }) => (
  <Svg width="6" height="6" viewBox="0 0 6 6">
    <Circle cx="3" cy="3" r="3" fill={active ? '#3EA9E5' : 'rgba(255,255,255,0.5)'} />
  </Svg>
);

const PostContainer = styled(YStack, {
  name: 'PhotoInsta',
  width: '100%',
  backgroundColor: primitive.color.white,
  marginBottom: 16,
});

const TopProfile = styled(XStack, {
  name: 'TopProfile',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 8,
  paddingVertical: 8,
  width: '100%',
});

const UserInfo = styled(XStack, {
  name: 'UserInfo',
  alignItems: 'center',
  gap: 7,
  overflow: 'hidden',
});

const Avatar = styled(Stack, {
  name: 'Avatar',
  width: 36,
  height: 36,
  borderRadius: 100,
  overflow: 'hidden',
  backgroundColor: '#FE5E55', // Main/Corail from design
});

const AvatarImage = styled(Image, {
  name: 'AvatarImage',
  width: '87.5%',
  height: '87.5%',
  position: 'absolute',
  top: '6.25%',
  left: '6.25%',
  borderRadius: 100,
});

const UserText = styled(YStack, {
  name: 'UserText',
  gap: 1,
});

const UserName = styled(Text, {
  name: 'UserName',
  ...typography.bodyS,
  fontWeight: '500',
  fontSize: 13,
  lineHeight: 13,
  color: primitive.color.black,
  letterSpacing: -0.165,
});

const UserLocation = styled(Text, {
  name: 'UserLocation',
  ...typography.bodyXS,
  fontSize: 11,
  lineHeight: 12,
  color: primitive.color.black,
  letterSpacing: -0.165,
});

const ImageContainer = styled(Stack, {
  name: 'ImageContainer',
  width: '100%',
  position: 'relative',
});

const PostImage = styled(Image, {
  name: 'PostImage',
  width: '100%',
  height: '100%',
});

const SponsoredBanner = styled(XStack, {
  name: 'SponsoredBanner',
  backgroundColor: '#20435B', // TODO: missing token - dark blue from Figma
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingVertical: 17,
  width: '100%',
});

const LearnMoreText = styled(Text, {
  name: 'LearnMoreText',
  fontFamily: 'Inter',
  fontSize: 14,
  lineHeight: 15,
  fontWeight: '500',
  color: primitive.color.white,
  letterSpacing: -0.165,
});

const BottomInfo = styled(YStack, {
  name: 'BottomInfo',
  gap: 6,
  paddingTop: 8,
  paddingHorizontal: 8,
  width: '100%',
});

const ActionsRow = styled(XStack, {
  name: 'ActionsRow',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 4,
  width: '100%',
});

const LeftActions = styled(XStack, {
  name: 'LeftActions',
  gap: 12,
});

const CarouselIndicators = styled(XStack, {
  name: 'CarouselIndicators',
  gap: 4,
  alignItems: 'center',
});

const LikeText = styled(Text, {
  name: 'LikeText',
  fontFamily: 'Inter',
  fontSize: 13,
  color: primitive.color.black,
  letterSpacing: -0.165,
});

const CaptionText = styled(Text, {
  name: 'CaptionText',
  fontFamily: 'Inter',
  fontSize: 13,
  color: primitive.color.black,
  letterSpacing: -0.165,
});

const ViewCommentsText = styled(Text, {
  name: 'ViewCommentsText',
  fontFamily: 'Inter',
  fontSize: 12,
  lineHeight: 15,
  color: 'rgba(0,0,0,0.4)',
  letterSpacing: -0.165,
});

const AskToJoinButton = styled(XStack, {
  name: 'AskToJoinButton',
  alignItems: 'center',
  gap: 4,
  paddingVertical: 6,
  paddingHorizontal: 10,
  backgroundColor: primitive.color.black,
  borderRadius: 16,
});

const AskToJoinText = styled(Text, {
  name: 'AskToJoinText',
  fontFamily: 'Inter',
  fontSize: 12,
  fontWeight: '500',
  color: primitive.color.white,
});

const SmallShareIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * PhotoInsta Component
 *
 * Instagram-style photo card component with support for different sizes,
 * sponsored posts, and carousel functionality.
 *
 * @example
 * ```tsx
 * <PhotoInsta
 *   size="Square"
 *   user={{ name: 'Arneo Paris', location: 'Arneo', avatar: avatarUrl }}
 *   images={[imageUrl1, imageUrl2]}
 *   carousel
 *   sponsored
 *   likedBy="Gabdu et d'autres personnes"
 *   caption={{
 *     username: 'ArthurHazan',
 *     text: 'Quel plaisir!',
 *     hashtags: ['#Proud']
 *   }}
 *   commentCount={10}
 * />
 * ```
 */
export const PhotoInsta = React.forwardRef<any, PhotoInstaProps>(
  (
    {
      size = 'Square',
      sponsored = false,
      carousel = false,
      user = { name: 'User Name', location: 'Location' },
      images = [],
      likedBy = "Sarah & others",
      caption,
      commentCount = 10,
      currentImageIndex = 0,
      hideMenu = false,
      hideLocation = false,
      hideBookmark = false,
      isLiked: isLikedProp,
      onLike,
      onComment,
      onShare,
      onBookmark,
      onLearnMore,
      onMenuPress,
      onUserPress,
    },
    ref
  ) => {
    // Local state for like (toggles on each press)
    const [localLiked, setLocalLiked] = useState(false);
    const liked = isLikedProp !== undefined ? isLikedProp : localLiked;

    // Animation for heart scale
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleLikePress = () => {
      // Toggle state and call callback FIRST so color changes immediately
      if (isLikedProp === undefined) {
        setLocalLiked(!localLiked);
      }
      onLike?.();

      // Quick feedback animation (50ms total)
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 25,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 25,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Calculate aspect ratio based on size
    const getAspectRatio = () => {
      switch (size) {
        case 'Square':
          return 1; // 1:1
        case 'Landscape':
          return 4 / 3; // 4:3 (wider than tall)
        case 'Portrait':
          return 4 / 5; // 4:5 (taller than wide)
        default:
          return 1;
      }
    };

    const mainImage = images[0] || images[currentImageIndex];

    return (
      <PostContainer ref={ref}>
        {/* Top Profile Section */}
        <TopProfile>
          <UserInfo onPress={onUserPress}>
            <Avatar>
              {user.avatar && (
                <AvatarImage
                  source={typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar}
                  resizeMode="cover"
                />
              )}
            </Avatar>
            <UserText>
              <UserName>{user.name}</UserName>
              {!hideLocation && user.location && <UserLocation>{user.location}</UserLocation>}
            </UserText>
          </UserInfo>
          {!hideMenu && (
            <Stack width={13} height={3} onPress={onMenuPress} cursor="pointer">
              <ThreeDotsIcon />
            </Stack>
          )}
        </TopProfile>

        {/* Image Section */}
        <ImageContainer style={{ aspectRatio: getAspectRatio() }}>
          {mainImage && (
            <PostImage
              source={typeof mainImage === 'string' ? { uri: mainImage } : mainImage}
              resizeMode="cover"
            />
          )}
        </ImageContainer>

        {/* Sponsored Learn More Banner */}
        {sponsored && (
          <SponsoredBanner onPress={onLearnMore} cursor="pointer">
            <LearnMoreText>Learn more</LearnMoreText>
            <Stack width={16} height={16}>
              <ChevronRightIcon />
            </Stack>
          </SponsoredBanner>
        )}

        {/* Bottom Info Section */}
        <BottomInfo>
          {/* Action Icons */}
          <ActionsRow>
            <LeftActions>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Stack width={24} height={24} onPress={handleLikePress} cursor="pointer">
                  <HeartIcon filled={liked} />
                </Stack>
              </Animated.View>
              <Stack width={24} height={24} onPress={onComment} cursor="pointer">
                <CommentIcon />
              </Stack>
            </LeftActions>

            {/* Carousel Indicators */}
            {carousel && images.length > 1 && (
              <CarouselIndicators>
                {images.map((_, index) => (
                  <CarouselIndicator key={index} active={index === currentImageIndex} />
                ))}
              </CarouselIndicators>
            )}

            {!hideBookmark && (
              <AskToJoinButton onPress={onBookmark} cursor="pointer">
                <AskToJoinText>Ask to join</AskToJoinText>
                <SmallShareIcon />
              </AskToJoinButton>
            )}
          </ActionsRow>

          {/* Joined by */}
          <LikeText>
            <Text fontFamily="Inter" fontSize={13} fontWeight="400">Joined by </Text>
            <Text fontFamily="Inter" fontSize={13} fontWeight="500">{likedBy}</Text>
          </LikeText>

          {/* Caption */}
          {caption && (
            <YStack gap={6}>
              <CaptionText>
                <Text fontFamily="Inter" fontSize={13} fontWeight="500">{caption.username} </Text>
                <Text fontFamily="Inter" fontSize={13} fontWeight="400">{caption.text} </Text>
                {caption.hashtags?.map((tag, index) => (
                  <Text key={index} fontFamily="Inter" fontSize={13} fontWeight="500" color="#3EA9E5">
                    {tag}
                  </Text>
                ))}
              </CaptionText>
              <ViewCommentsText>View all {commentCount} comments</ViewCommentsText>
            </YStack>
          )}
        </BottomInfo>
      </PostContainer>
    );
  }
);

PhotoInsta.displayName = 'PhotoInsta';
