import React from 'react';
import { Stack, Text, styled } from 'tamagui';
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
}

const Container = styled(Stack, {
  name: 'TextAreaContainer',
  flexDirection: 'column',
  width: 295,
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

const TextWrapper = styled(Stack, {
  name: 'Text',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  minHeight: 1,
});

const PlaceholderText = styled(Text, {
  name: 'PlaceholderText',
  ...typography.bodyM,
  color: semantic.color.text.placeholder, // #bdbdbd
  flex: 1,
});

const ContentText = styled(Text, {
  name: 'ContentText',
  ...typography.bodyM,
  flex: 1,

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
 * TextArea Component (Figma Variant)
 *
 * Allow the input of long text.
 * This variant is auto-generated from Figma and matches the exact design specifications.
 */
export default function TextArea({
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
}: TextAreaProps) {
  const isEmpty = state === 'Empty';
  const isFilled = state === 'Filled';
  const isInactive = state === 'Inactive';
  const isTyping = state === 'Typing';
  const isFilledOrInactiveOrTyping = isFilled || isInactive || isTyping;

  return (
    <Container
      data-node-id={
        isTyping
          ? '252:7275'
          : isInactive
            ? '252:7305'
            : isFilled
              ? '252:7285'
              : '252:7265'
      }
    >
      {/* Title - shown at top for Empty state only */}
      {isEmpty && showTitle && (
        <Title state={state} data-node-id="252:7266">
          {title}
        </Title>
      )}

      {/* Field Container */}
      <FieldContainer
        state={state}
        data-node-id={
          isTyping
            ? '252:7277'
            : isInactive
              ? '252:7307'
              : isFilled
                ? '252:7287'
                : '252:7267'
        }
      >
        <ContentWrapper
          data-node-id={
            isTyping
              ? '252:7278'
              : isInactive
                ? '252:7308'
                : isFilled
                  ? '252:7288'
                  : '252:7268'
          }
        >
          {/* Unit Prefix */}
          {showUnit && <Unit data-node-id="252:7269">{unit}</Unit>}

          {/* Text Content */}
          <TextWrapper
            data-node-id={
              isTyping
                ? '252:7280'
                : isInactive
                  ? '252:7310'
                  : isFilled
                    ? '252:7290'
                    : '252:7270'
            }
          >
            {/* Placeholder - only shown in Empty state */}
            {isEmpty && showPlaceholder && (
              <PlaceholderText data-node-id="252:7271">
                {placeholder}
              </PlaceholderText>
            )}

            {/* Content - shown in all other states */}
            {isFilled && (
              <ContentText state={state} data-node-id="252:7291">
                {content}
              </ContentText>
            )}

            {isInactive && (
              <ContentText state={state} data-node-id="252:7311">
                {content}
              </ContentText>
            )}

            {isTyping && (
              <ContentText state={state} data-node-id="252:7281">
                {content}
              </ContentText>
            )}
          </TextWrapper>
        </ContentWrapper>

        {/* Inner Shadow Overlay */}
        <InnerShadow />
      </FieldContainer>

      {/* Support Text */}
      {showSupportText && (
        <SupportText data-node-id="252:7274">{supportText}</SupportText>
      )}

      {/* Title - shown at bottom for Filled, Inactive, and Typing states */}
      {isFilledOrInactiveOrTyping && showTitle && (
        <Title
          state={state}
          data-node-id={
            isTyping ? '252:7276' : isInactive ? '252:7306' : '252:7286'
          }
        >
          {title}
        </Title>
      )}
    </Container>
  );
}
