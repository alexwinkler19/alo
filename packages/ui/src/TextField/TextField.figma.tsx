import React from 'react';
import { Stack, Text, styled } from 'tamagui';
import { semantic, typography } from '@alo/theme';

// TextField state variants matching Figma
export type TextFieldState = 'Empty' | 'Filled' | 'Inactive' | 'Typing';

export interface TextFieldProps {
  /** Content text (displayed when filled or inactive) */
  content?: string;
  /** Icon element to show on the right */
  icon?: React.ReactNode | null;
  /** Placeholder text */
  placeholder?: string;
  /** Show/hide icon */
  showIcon?: boolean;
  /** Show/hide placeholder */
  showPlaceholder?: boolean;
  /** Show/hide support text */
  showSupportText?: boolean;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide unit prefix */
  showUnit?: boolean;
  /** Current state of the field */
  state?: TextFieldState;
  /** Support text displayed below the field */
  supportText?: string;
  /** Title text displayed above the field */
  title?: string;
  /** Unit prefix (e.g., "€") */
  unit?: string;
}

const Container = styled(Stack, {
  name: 'TextFieldContainer',
  flexDirection: 'column',
  gap: 8,
  width: 295,
});

const Title = styled(Text, {
  name: 'TextFieldTitle',
  ...typography.subsectionTitle,
  width: '100%',

  variants: {
    state: {
      Empty: {
        color: semantic.color.text.primary,
      },
      Filled: {
        color: semantic.color.text.primary,
      },
      Inactive: {
        color: semantic.color.text.disabled,
      },
      Typing: {
        color: semantic.color.text.primary,
      },
    },
  } as const,
});

const FieldContainer = styled(Stack, {
  name: 'Field',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: semantic.spacing.spaceinside.md, // 16px
  paddingVertical: semantic.spacing.spaceinside.sm, // 12px
  borderRadius: semantic.borderradius.sm, // 12px
  borderWidth: semantic.borderwidth.default, // 1px
  borderStyle: 'solid',
  width: '100%',

  variants: {
    state: {
      Empty: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.default, // #bdbdbd
        height: 48,
      },
      Filled: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.border.focused, // #2c2c2c
        height: 48,
      },
      Inactive: {
        backgroundColor: semantic.color.interface.tertiary, // #fafafa
        borderColor: semantic.color.border.disabled, // #e0e0e0
        height: 48,
      },
      Typing: {
        backgroundColor: semantic.color.interface.inverse, // white
        borderColor: semantic.color.status.error.border, // #e50c1e
        height: 48,
      },
    },
  } as const,
});

const ContentWrapper = styled(Stack, {
  name: 'Content',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  flex: 1,
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

const IconContainer = styled(Stack, {
  name: 'Icon',
  width: 16,
  height: 16,
  overflow: 'hidden',
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
 * TextField Component (Figma Variant)
 *
 * Allow the input of short text.
 * This variant is auto-generated from Figma and matches the exact design specifications.
 */
export default function TextField({
  content = 'Text',
  icon = null,
  placeholder = 'Text',
  showIcon = false,
  showPlaceholder = true,
  showSupportText = false,
  showTitle = true,
  showUnit = false,
  state = 'Empty',
  supportText = 'Support text',
  title = 'Title',
  unit = '€',
}: TextFieldProps) {
  const isEmpty = state === 'Empty';
  const isFilled = state === 'Filled';
  const isInactive = state === 'Inactive';
  const isTyping = state === 'Typing';
  const isFilledOrTyping = isFilled || isTyping;
  const isEmptyOrFilledOrTyping = isEmpty || isFilled || isTyping;

  return (
    <Container
      data-node-id={
        isTyping
          ? '143:1372'
          : isInactive
            ? '143:1484'
            : isFilled
              ? '143:1428'
              : '137:13301'
      }
    >
      {/* Title - shown for all states except Empty when showTitle is false */}
      {isEmptyOrFilledOrTyping && showTitle && (
        <Title state={state} data-node-id="143:1355">
          {title}
        </Title>
      )}

      {/* Field Container */}
      <FieldContainer
        state={state}
        data-node-id={
          isTyping
            ? '143:1375'
            : isInactive
              ? '143:1487'
              : isFilled
                ? '143:1431'
                : '137:13303'
        }
      >
        <ContentWrapper
          data-node-id={
            isTyping
              ? '143:1376'
              : isInactive
                ? '143:1488'
                : isFilled
                  ? '143:1432'
                  : '143:1321'
          }
        >
          {/* Unit Prefix */}
          {showUnit && <Unit data-node-id="143:1334">{unit}</Unit>}

          {/* Text Content */}
          <TextWrapper
            data-node-id={
              isTyping
                ? '143:1378'
                : isInactive
                  ? '143:1490'
                  : isFilled
                    ? '143:1434'
                    : '143:1330'
            }
          >
            {/* Placeholder - only shown in Empty state */}
            {isEmpty && showPlaceholder && (
              <PlaceholderText data-node-id="143:1331">
                {placeholder}
              </PlaceholderText>
            )}

            {/* Content - shown in Filled and Typing states */}
            {isFilledOrTyping && (
              <ContentText state={state} data-node-id="143:1435">
                {content}
              </ContentText>
            )}

            {/* Inactive Content */}
            {isInactive && (
              <ContentText state={state} data-node-id="143:1491">
                {content}
              </ContentText>
            )}
          </TextWrapper>
        </ContentWrapper>

        {/* Icon */}
        {showIcon && icon && (
          <IconContainer data-node-id="143:1324">{icon}</IconContainer>
        )}
      </FieldContainer>

      {/* Support Text */}
      {showSupportText && (
        <SupportText data-node-id="143:1357">{supportText}</SupportText>
      )}

      {/* Title for Inactive state - shown at the bottom */}
      {isInactive && showTitle && (
        <Title state={state} data-node-id="143:1486">
          {title}
        </Title>
      )}
    </Container>
  );
}
