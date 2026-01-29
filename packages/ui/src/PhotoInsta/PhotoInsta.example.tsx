import React, { useState } from 'react';
import { YStack, XStack, Text, Stack, ScrollView } from 'tamagui';
import { PhotoInsta, PhotoInstaSize } from './PhotoInsta';

// Sample data
const sampleUser = {
  name: 'Arneo Paris',
  location: 'Arneo',
};

const sampleCaption = {
  username: 'ArthurHazan',
  text: "Quel plaisir de retrouver mes étudiants de Web 2 ! Ils ont tellement progressés depuis l'année dernière !",
  hashtags: ['#Proud'],
};

/**
 * PhotoInsta Component Examples
 *
 * Demonstrates all props and variants of the PhotoInsta component
 */
export default function PhotoInstaExamples() {
  const [size, setSize] = useState<PhotoInstaSize>('Square');
  const [sponsored, setSponsored] = useState(false);
  const [carousel, setCarousel] = useState(false);

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$6">
        <Stack>
          <Text fontSize="$6" fontWeight="bold">
            PhotoInsta Component Examples
          </Text>
          <Text fontSize="$3" color="$gray10" marginTop="$2">
            Instagram-style photo card with multiple variants
          </Text>
        </Stack>

        {/* Interactive Controls */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Interactive Demo
          </Text>
          <YStack gap="$2" backgroundColor="white" padding="$4" borderRadius="$3">
            <Text fontSize="$3" fontWeight="600">Size:</Text>
            <XStack gap="$2">
              {(['Square', 'Landscape', 'Portrait'] as PhotoInstaSize[]).map((s) => (
                <Stack
                  key={s}
                  padding="$2"
                  paddingHorizontal="$3"
                  backgroundColor={size === s ? '$blue9' : '$gray3'}
                  borderRadius="$2"
                  onPress={() => setSize(s)}
                  cursor="pointer"
                >
                  <Text color={size === s ? 'white' : 'black'} fontSize="$2">{s}</Text>
                </Stack>
              ))}
            </XStack>

            <Text fontSize="$3" fontWeight="600" marginTop="$2">Options:</Text>
            <XStack gap="$3">
              <XStack gap="$2" alignItems="center">
                <Stack
                  width={20}
                  height={20}
                  borderWidth={2}
                  borderColor={sponsored ? '$blue9' : '$gray6'}
                  backgroundColor={sponsored ? '$blue9' : 'transparent'}
                  borderRadius="$1"
                  onPress={() => setSponsored(!sponsored)}
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                >
                  {sponsored && <Text color="white" fontSize="$1">✓</Text>}
                </Stack>
                <Text fontSize="$3">Sponsored</Text>
              </XStack>

              <XStack gap="$2" alignItems="center">
                <Stack
                  width={20}
                  height={20}
                  borderWidth={2}
                  borderColor={carousel ? '$blue9' : '$gray6'}
                  backgroundColor={carousel ? '$blue9' : 'transparent'}
                  borderRadius="$1"
                  onPress={() => setCarousel(!carousel)}
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                >
                  {carousel && <Text color="white" fontSize="$1">✓</Text>}
                </Stack>
                <Text fontSize="$3">Carousel</Text>
              </XStack>
            </XStack>
          </YStack>

          <Stack backgroundColor="white" padding="$4" borderRadius="$3" alignItems="center">
            <PhotoInsta
              size={size}
              sponsored={sponsored}
              carousel={carousel}
              user={sampleUser}
              images={carousel ? [undefined, undefined, undefined] : [undefined]}
              likedBy="Gabdu et d'autres personnes"
              caption={sampleCaption}
              commentCount={10}
              onLike={() => console.log('Like')}
              onComment={() => console.log('Comment')}
              onShare={() => console.log('Share')}
              onBookmark={() => console.log('Bookmark')}
              onLearnMore={() => console.log('Learn more')}
              onMenuPress={() => console.log('Menu')}
            />
          </Stack>
        </YStack>

        {/* All Size Variants */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            All Size Variants
          </Text>
          <XStack gap="$4" flexWrap="wrap">
            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">Square</Text>
              <PhotoInsta
                size="Square"
                user={sampleUser}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
              />
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">Landscape</Text>
              <PhotoInsta
                size="Landscape"
                user={sampleUser}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
              />
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">Portrait</Text>
              <PhotoInsta
                size="Portrait"
                user={sampleUser}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Sponsored Posts */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Sponsored Posts
          </Text>
          <XStack gap="$4" flexWrap="wrap">
            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">Without Carousel</Text>
              <PhotoInsta
                size="Square"
                sponsored
                user={sampleUser}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
                onLearnMore={() => alert('Learn more clicked')}
              />
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">With Carousel</Text>
              <PhotoInsta
                size="Square"
                sponsored
                carousel
                user={sampleUser}
                images={[undefined, undefined, undefined]}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
                currentImageIndex={1}
                onLearnMore={() => alert('Learn more clicked')}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Carousel Posts */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Carousel Posts
          </Text>
          <XStack gap="$4" flexWrap="wrap">
            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">2 Images</Text>
              <PhotoInsta
                size="Square"
                carousel
                user={sampleUser}
                images={[undefined, undefined]}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
                currentImageIndex={0}
              />
            </YStack>

            <YStack gap="$2" alignItems="center">
              <Text fontSize="$2" color="$gray10">4 Images</Text>
              <PhotoInsta
                size="Square"
                carousel
                user={sampleUser}
                images={[undefined, undefined, undefined, undefined]}
                caption={sampleCaption}
                likedBy="Gabdu et d'autres personnes"
                currentImageIndex={2}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Props Documentation */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Props & Variants
          </Text>
          <Stack backgroundColor="white" padding="$4" borderRadius="$3" gap="$2">
            <Text fontWeight="bold" fontSize="$4" marginBottom="$2">Size Variants:</Text>
            <Text fontSize="$3">• Square (320x320)</Text>
            <Text fontSize="$3">• Landscape (320x240)</Text>
            <Text fontSize="$3">• Portrait (320x400)</Text>

            <Text fontWeight="bold" fontSize="$4" marginTop="$3" marginBottom="$2">
              Props:
            </Text>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>size:</Text>
              <Text flex={1} color="$gray10">'Square' | 'Landscape' | 'Portrait'</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>sponsored:</Text>
              <Text flex={1} color="$gray10">boolean</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>carousel:</Text>
              <Text flex={1} color="$gray10">boolean</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>user:</Text>
              <Text flex={1} color="$gray10">{'{ name, location?, avatar? }'}</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>images:</Text>
              <Text flex={1} color="$gray10">Array of image sources</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>caption:</Text>
              <Text flex={1} color="$gray10">{'{ username, text, hashtags? }'}</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>likedBy:</Text>
              <Text flex={1} color="$gray10">string</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>commentCount:</Text>
              <Text flex={1} color="$gray10">number</Text>
            </XStack>
            <XStack gap="$2">
              <Text fontWeight="bold" width={150}>callbacks:</Text>
              <Text flex={1} color="$gray10">
                onLike, onComment, onShare, onBookmark, etc.
              </Text>
            </XStack>
          </Stack>
        </YStack>

        {/* Features */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Features
          </Text>
          <Stack backgroundColor="white" padding="$4" borderRadius="$3" gap="$3">
            <YStack gap="$1">
              <Text fontWeight="bold">📸 Multiple Sizes</Text>
              <Text fontSize="$3" color="$gray10">
                Square, Landscape, and Portrait aspect ratios
              </Text>
            </YStack>
            <YStack gap="$1">
              <Text fontWeight="bold">💼 Sponsored Posts</Text>
              <Text fontSize="$3" color="$gray10">
                "En savoir plus" (Learn more) banner for sponsored content
              </Text>
            </YStack>
            <YStack gap="$1">
              <Text fontWeight="bold">🎠 Carousel Support</Text>
              <Text fontSize="$3" color="$gray10">
                Multiple images with indicator dots
              </Text>
            </YStack>
            <YStack gap="$1">
              <Text fontWeight="bold">👤 User Profile</Text>
              <Text fontSize="$3" color="$gray10">
                Avatar, name, and location
              </Text>
            </YStack>
            <YStack gap="$1">
              <Text fontWeight="bold">⚡ Interactive</Text>
              <Text fontSize="$3" color="$gray10">
                Like, comment, share, bookmark, and menu actions
              </Text>
            </YStack>
            <YStack gap="$1">
              <Text fontWeight="bold">💬 Rich Captions</Text>
              <Text fontSize="$3" color="$gray10">
                Username, text, and hashtag support
              </Text>
            </YStack>
          </Stack>
        </YStack>

        {/* Usage Code */}
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600">
            Usage Example
          </Text>
          <Stack backgroundColor="$gray2" padding="$3" borderRadius="$3">
            <Text fontFamily="$mono" fontSize="$2">
{`<PhotoInsta
  size="Square"
  sponsored
  carousel
  user={{
    name: 'Arneo Paris',
    location: 'Arneo',
    avatar: avatarUrl
  }}
  images={[img1, img2, img3]}
  likedBy="Gabdu et d'autres personnes"
  caption={{
    username: 'ArthurHazan',
    text: 'Great photo!',
    hashtags: ['#Proud']
  }}
  commentCount={10}
  currentImageIndex={0}
  onLike={() => console.log('Liked')}
  onLearnMore={() => console.log('Learn more')}
/>`}
            </Text>
          </Stack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
