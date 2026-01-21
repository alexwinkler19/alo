import React from 'react';
import { Stack, styled, TamaguiElement } from 'tamagui';
import { ContentSwitcherSection } from '../ContentSwitcherSection';

/*
 * TODO: Missing design tokens for ContentSwitcher component
 * These values are hardcoded from Figma and need tokens:
 * - component/contentSwitcher/container/color/bg: #fafafa
 * - component/contentSwitcher/mask/borderRadius: 16px
 * - component/contentSwitcher/container/padding: 4px (with 2px right adjustment)
 * - component/contentSwitcher/divider/color/border: #bdbdbd
 * - component/contentSwitcher/shadow: Shadow 1
 */

export interface ContentSwitcherItem {
  /** Unique identifier for the section */
  id: string;
  /** Section title/label */
  title: string;
}

export interface ContentSwitcherProps {
  /** Array of sections to display */
  items: ContentSwitcherItem[];
  /** Currently selected section ID */
  selectedId?: string;
  /** Selection change handler */
  onSelectionChange?: (id: string) => void;
  /** Optional width override (defaults to 100%) */
  width?: number | string;
}

// Hardcoded values from Figma (missing tokens)
const SWITCHER_STYLES = {
  containerBg: '#fafafa',
  borderRadius: 16,
  paddingLeft: 4,
  paddingRight: 2,
  paddingVertical: 4,
  dividerColor: '#bdbdbd',
  dividerWidth: 0.5,
  dividerHeight: 10,
} as const;

const SwitcherContainer = styled(Stack, {
  name: 'ContentSwitcher',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: SWITCHER_STYLES.containerBg,
  borderRadius: SWITCHER_STYLES.borderRadius,
  paddingLeft: SWITCHER_STYLES.paddingLeft,
  paddingRight: SWITCHER_STYLES.paddingRight,
  paddingTop: SWITCHER_STYLES.paddingVertical,
  paddingBottom: SWITCHER_STYLES.paddingVertical,
});

const Divider = styled(Stack, {
  name: 'ContentSwitcherDivider',
  width: SWITCHER_STYLES.dividerWidth,
  height: SWITCHER_STYLES.dividerHeight,
  backgroundColor: SWITCHER_STYLES.dividerColor,
  flexShrink: 0,
});

const SectionWrapper = styled(Stack, {
  name: 'ContentSwitcherSectionWrapper',
  flex: 1,
  minWidth: 0,
});

/**
 * Content Switcher Component (Segmented Control)
 *
 * Allows users to switch between sections.
 * A complete segmented control with multiple sections.
 *
 * @example
 * ```tsx
 * const [selectedId, setSelectedId] = useState('1');
 *
 * <ContentSwitcher
 *   items={[
 *     { id: '1', title: 'Section 1' },
 *     { id: '2', title: 'Section 2' },
 *     { id: '3', title: 'Section 3' },
 *   ]}
 *   selectedId={selectedId}
 *   onSelectionChange={setSelectedId}
 * />
 * ```
 */
export const ContentSwitcher = React.forwardRef<TamaguiElement, ContentSwitcherProps>(
  ({ items, selectedId, onSelectionChange, width = '100%' }, ref) => {
    return (
      <SwitcherContainer ref={ref} width={width}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Divider before each section except the first */}
            {index > 0 && <Divider />}

            {/* Section */}
            <SectionWrapper>
              <ContentSwitcherSection
                title={item.title}
                selected={item.id === selectedId}
                onPress={() => onSelectionChange?.(item.id)}
              />
            </SectionWrapper>
          </React.Fragment>
        ))}
      </SwitcherContainer>
    );
  }
);

ContentSwitcher.displayName = 'ContentSwitcher';
