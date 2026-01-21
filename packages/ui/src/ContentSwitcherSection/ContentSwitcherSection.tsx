import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography } from '@alo/theme';

/*
 * TODO: Missing design tokens for ContentSwitcherSection component
 * These values are hardcoded from Figma and need tokens:
 * - component/contentSwitcher/selectable/padding/horizontal: 12px
 * - component/contentSwitcher/selectable/padding/vertical: 8px
 * - component/contentSwitcher/selectable/borderRadius: 12px
 * - component/contentSwitcher/mask/color/bg: #ffffff
 * - component/contentSwitcher/selectable/active/color/text: #2c2c2c
 * - component/contentSwitcher/selectable/inactive/color/text: #9e9e9e
 * - component/contentSwitcher/selectable/shadow: Shadow 1 (when selected)
 */

export interface ContentSwitcherSectionProps {
  /** Whether this section is selected/active */
  selected?: boolean;
  /** Section title/label */
  title?: string;
  /** Press handler */
  onPress?: () => void;
}

// Hardcoded values from Figma (missing tokens)
const SECTION_STYLES = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 12,
  selectedBg: '#ffffff',
  activeTextColor: '#2c2c2c',
  inactiveTextColor: '#9e9e9e',
} as const;

const SectionContainer = styled(Stack, {
  name: 'ContentSwitcherSection',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: SECTION_STYLES.paddingHorizontal,
  paddingVertical: SECTION_STYLES.paddingVertical,
  borderRadius: SECTION_STYLES.borderRadius,
  cursor: 'pointer',

  variants: {
    selected: {
      true: {
        backgroundColor: SECTION_STYLES.selectedBg,
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  } as const,
});

const SectionText = styled(Text, {
  name: 'ContentSwitcherSectionText',
  ...typography.caption,
  fontWeight: String(primitive.fontweight.bold),
  fontSize: primitive.fontsize['2xs'],
  lineHeight: primitive.lineheight['2xs'],
  textAlign: 'center',

  variants: {
    selected: {
      true: {
        color: SECTION_STYLES.activeTextColor,
      },
      false: {
        color: SECTION_STYLES.inactiveTextColor,
      },
    },
  } as const,
});

/**
 * Content Switcher Section Component
 *
 * Individual tab/segment in a content switcher (segmented control).
 * Use multiple sections together to create a full segmented control.
 *
 * @example
 * ```tsx
 * <Stack flexDirection="row" borderWidth={1} borderColor="#bdbdbd" borderRadius={12}>
 *   <ContentSwitcherSection
 *     title="Tab 1"
 *     selected={activeTab === 0}
 *     onPress={() => setActiveTab(0)}
 *   />
 *   <ContentSwitcherSection
 *     title="Tab 2"
 *     selected={activeTab === 1}
 *     onPress={() => setActiveTab(1)}
 *   />
 * </Stack>
 * ```
 */
export const ContentSwitcherSection = React.forwardRef<TamaguiElement, ContentSwitcherSectionProps>(
  ({ selected = false, title = 'Section', onPress }, ref) => {
    return (
      <SectionContainer
        ref={ref}
        selected={selected}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <SectionText selected={selected}>{title}</SectionText>
      </SectionContainer>
    );
  }
);

ContentSwitcherSection.displayName = 'ContentSwitcherSection';
