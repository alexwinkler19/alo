/**
 * Example: How to use semantic design tokens in components
 * 
 * Semantic tokens provide meaningful names and should be used instead of primitive tokens
 */

import { YStack, Text, Button, XStack } from 'tamagui';
import { semanticColors, semanticSpacing } from '@alo/theme';

export function SemanticTokenExample() {
  return (
    <YStack 
      padding="$4"                    // Primitive token: 16px
      gap="$3"                        // Primitive token: 12px
      backgroundColor="$background"   // Semantic: bgPrimary (white in light, grey900 in dark)
      borderRadius="$3"               // Primitive token: 12px
      borderWidth="$2"                // Primitive token: 1px
      borderColor="$borderColor"      // Semantic: borderDefault
    >
      {/* Text with semantic colors */}
      <Text 
        fontSize="$7"                 // 20px
        fontWeight="$7"               // 700 (bold)
        color="$color"                // Semantic: textPrimary
      >
        Primary Heading
      </Text>
      
      <Text 
        fontSize="$4"                 // 14px
        color="$colorHover"           // Semantic: textSecondary
      >
        Secondary text
      </Text>
      
      <Text 
        fontSize="$4"
        color="$placeholderColor"     // Semantic: textPlaceholder
      >
        Placeholder text
      </Text>
      
      {/* Brand buttons */}
      <XStack gap="$3">
        <Button
          backgroundColor="$primary"           // Semantic: brandPrimary
          hoverStyle={{ backgroundColor: '$primaryHover' }}
          pressStyle={{ backgroundColor: '$primaryPress' }}
          color="$brandSecondary"              // White text
          borderRadius="$3"
          paddingHorizontal="$4"
          paddingVertical="$3"
        >
          Primary Action
        </Button>
        
        <Button
          backgroundColor="$secondary"         // Semantic: brandHighlight (accent)
          color="$color"
          borderRadius="$3"
          paddingHorizontal="$4"
          paddingVertical="$3"
        >
          Secondary Action
        </Button>
      </XStack>
      
      {/* Status indicators */}
      <YStack gap="$2">
        <YStack 
          backgroundColor="$successBackground"  // Semantic: statusSuccessBg
          padding="$3"
          borderRadius="$2"
          borderWidth="$2"
          borderColor="$success"                // Semantic: statusSuccessText
        >
          <Text color="$success">Success message</Text>
        </YStack>
        
        <YStack 
          backgroundColor="$errorBackground"
          padding="$3"
          borderRadius="$2"
          borderWidth="$2"
          borderColor="$error"
        >
          <Text color="$error">Error message</Text>
        </YStack>
        
        <YStack 
          backgroundColor="$warningBackground"
          padding="$3"
          borderRadius="$2"
          borderWidth="$2"
          borderColor="$warning"
        >
          <Text color="$warning">Warning message</Text>
        </YStack>
      </YStack>
    </YStack>
  );
}

/**
 * Direct semantic token access (for advanced use cases)
 */

// Access semantic color values directly
const primaryText = semanticColors.textPrimary;        // '#2c2c2c'
const brandColor = semanticColors.brandPrimary;        // '#c13969'
const errorBg = semanticColors.statusErrorBg;          // '#ffe3e3'

// Access semantic spacing values
const mediumPadding = semanticSpacing.insideMd;        // 16
const smallGap = semanticSpacing.insideXs;             // 8

/**
 * Token Hierarchy:
 * 
 * 1. Primitive Tokens (tokens.ts)
 *    - Raw values: colors, spacing, typography
 *    - Example: tokens.color.primary900 = '#c13969'
 * 
 * 2. Semantic Tokens (semantic-tokens.ts)
 *    - Reference primitive tokens with meaningful names
 *    - Example: semanticColors.brandPrimary = tokens.color.primary900
 * 
 * 3. Theme Tokens (tamagui.config.ts)
 *    - Map semantic tokens to Tamagui's $ syntax
 *    - Example: $primary = semanticColors.brandPrimary
 * 
 * Best Practice: Use theme tokens ($primary) in components
 */
