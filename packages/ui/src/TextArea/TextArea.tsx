import React from 'react';
import { Stack, Text, TextArea as TamaguiTextArea, styled, TamaguiElement } from 'tamagui';
import { semantic, typography, primitive } from '@alo/theme';

// TextArea state variants matching Figma
export type TextAreaState = 'Empty' | 'Filled' | 'Inactive' | 'Typing';

export interface TextAreaProps {
  /** Content text (displayed when filled, inactive, or typing) */
  content?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Show/hide placeholder */
  showPlaceholder?: boolean;
  /** Show/hide support text */
  showSupportText?: boolean;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide unit prefix */
  showUnit?: boolean;
  /** Current state of the field */
  state?: TextAreaState;
  /** Support text displayed below the field */
  supportText?: string;
  /** Title text */
  title?: string;
  /** Unit prefix (e.g., "€") */
  unit?: string;
  /** Change handler for controlled input */
  onChangeText?: (text: string) => void;
  /** Value for controlled input */
  value?: string;
  /** Number of lines to display */
  numberOfLines?: number;
  /** Auto capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Editable state */
  editable?: boolean;
}

const Container = styled(Stack, {
  name: 'TextAreaContainer',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

const Title = styled(Text, {
  name: 'TextAreaTitle',
  fontFamily: primitive.fontfamily.heading,
  fontWeight: String(primitive.fontweight.bold),
  fontSize: primitive.fontsize['2xs'], // 12px
  lineHeight: primitive.lineheight['2xs'], // 12px
  letterSpacing: primitive.letterspacing.normal,
  width: '100%',

  variants: {
    state: {
      Empty: {
        color: semantic.color.text.primary, // #2c2c2c
      },
      Filled: {
        color: semantic.color.text.primary, // #2c2c2c
      },
      Inactive: {
        color: semantic.color.text.secondary, // #646464
      },
      Typing: {
        color: semantic.color.text.primary, // #2c2c2c
      },
    },
  } as const,
});

const FieldContainer = styled(Stack, {
  name: 'Field',
  position: 'relative',
  alignItems: 'flex-start',
  overflow: 'hidden',
  borderWidth: semantic.borderwidth.default, // 1px
  borderStyle: 'solid',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  width: '100%',

  variants: {
    state: {
      Empty: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.default, // #bdbdbd
        height: 100,
      },
      Filled: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.focused, // #2c2c2c
        flex: 1,
        minHeight: 1,
      },
      Inactive: {
        backgroundColor: semantic.color.interface.tertiary, // #fafafa
        borderColor: semantic.color.border.disabled, // #e0e0e0
        flex: 1,
        minHeight: 1,
      },
      Typing: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.status.error.border, // #e50c1e
        flex: 1,
        minHeight: 1,
      },
    },
  } as const,
});

const InnerShadow = styled(Stack, {
  name: 'InnerShadow',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  // Inner shadow effect: inset 1px 2px 2px 0px rgba(0,0,0,0.06)
  // Note: Tamagui doesn't support inset box-shadow natively, 
  // so we'll use a workaround with border overlay or rely on platform-specific styling
  shadowColor: 'rgba(0,0,0,0.06)',
  shadowOffset: { width: 1, height: 2 },
  shadowRadius: 2,
});

const ContentWrapper = styled(Stack, {
  name: 'Content',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flex: 1,
  minHeight: 1,
});

const Unit = styled(Text, {
  name: 'Unit',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 14,
  lineHeight: 18,
  color: '#8f9098', // grey-scale/500
});

const StyledTextArea = styled(TamaguiTextArea, {
  name: 'TextAreaInput',
  ...typography.bodyM,
  flex: 1,
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  backgroundColor: 'transparent',
  minHeight: 60,
  verticalAlign: 'top',
  textAlignVertical: 'top',

  variants: {
    state: {
      Empty: {
        color: semantic.color.text.primary,
      },
      Filled: {
        color: semantic.color.text.primary,
      },
      Inactive: {
        color: semantic.color.text.placeholder,
      },
      Typing: {
        color: semantic.color.text.primary,
      },
    },
  } as const,

  focusStyle: {
    outlineWidth: 0,
  },
});

const SupportText = styled(Text, {
  name: 'SupportText',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 10,
  lineHeight: 14,
  letterSpacing: 0.15,
  color: '#8f9098', // grey-scale/500
  width: '100%',
});

/**
 * TextArea Component
 *
 * Allow the input of long text.
 *
 * @example
 * ```tsx
 * <TextArea title="Description" placeholder="Enter description" state="Empty" />
 * <TextArea title="Comments" content="Lorem ipsum dolor sit amet" state="Filled" />
 * <TextArea title="Notes" state="Typing" showSupportText supportText="Maximum 500 characters" />
 * ```
 */
export const TextArea = React.forwardRef<TamaguiElement, TextAreaProps>(
  (
    {
      content = 'Text',
      placeholder = 'Placeholder',
      showPlaceholder = true,
      showSupportText = false,
      showTitle = true,
      showUnit = false,
      state = 'Empty',
      supportText = 'Support text',
      title = 'Title',
      unit = '€',
      onChangeText,
      value,
      numberOfLines = 4,
      autoCapitalize = 'sentences',
      editable = true,
    },
    ref
  ) => {
    const isEmpty = state === 'Empty';
    const isFilled = state === 'Filled';
    const isInactive = state === 'Inactive';
    const isTyping = state === 'Typing';
    const isFilledOrInactiveOrTyping = isFilled || isInactive || isTyping;

    return (
      <Container ref={ref}>
        {/* Title - shown at top for Empty state only */}
        {isEmpty && showTitle && <Title state={state}>{title}</Title>}

        {/* Field Container */}
        <FieldContainer state={state}>
          <ContentWrapper>
            {/* Unit Prefix */}
            {showUnit && <Unit>{unit}</Unit>}

            {/* TextArea Input */}
            <StyledTextArea
              state={state}
              placeholder={showPlaceholder ? placeholder : ''}
              placeholderTextColor={semantic.color.text.placeholder}
              value={value !== undefined ? value : content}
              onChangeText={onChangeText}
              numberOfLines={numberOfLines}
              multiline
              autoCapitalize={autoCapitalize}
              editable={editable && !isInactive}
            />
          </ContentWrapper>

          {/* Inner Shadow Overlay */}
          <InnerShadow />
        </FieldContainer>

        {/* Support Text */}
        {showSupportText && <SupportText>{supportText}</SupportText>}

        {/* Title - shown at bottom for Filled, Inactive, and Typing states */}
        {isFilledOrInactiveOrTyping && showTitle && (
          <Title state={state}>{title}</Title>
        )}
      </Container>
    );
  }
);

TextArea.displayName = 'TextArea';
