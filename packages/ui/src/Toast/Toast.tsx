import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import { primitive, semantic, typography } from '@alo/theme';

/*
 * TODO: Missing design tokens for Toast component
 * These values are hardcoded from Figma and need tokens:
 * - component/toast/padding/horizontal: 16px
 * - component/toast/padding/vertical: 16px
 * - component/toast/borderRadius: 16px
 * - component/toast/shadow: Shadow 1
 * - component/toast/neutral/color/bg: #eaf2ff
 * - component/toast/success/color/bg: #f7fcf5
 * - component/toast/warning/color/bg: #fff0e6
 * - component/toast/error/color/bg: #ffe3e3
 * - component/toast/[variant]/color/title: #2c2c2c (same for all variants)
 * - component/toast/[variant]/color/content: #646464 (same for all variants)
 */

// Toast style/tone variants matching Figma
export type ToastStyle = 'Informative' | 'Success' | 'Warning' | 'Error';

export interface ToastProps {
  /** Toast style/tone variant */
  style?: ToastStyle;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide description */
  showDescription?: boolean;
  /** Icon element (optional custom icon) */
  icon?: React.ReactNode;
  /** Close button handler */
  onClose?: () => void;
}

// Hardcoded colors from Figma (missing tokens)
const TOAST_COLORS = {
  bg: {
    Informative: '#eaf2ff',
    Success: '#f7fcf5',
    Warning: '#fff0e6',
    Error: '#ffe3e3',
  },
  title: '#2c2c2c',
  content: '#646464',
} as const;

const ToastContainer = styled(Stack, {
  name: 'Toast',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 16,
  borderRadius: 16,
  width: 284,

  variants: {
    toastStyle: {
      Informative: {
        backgroundColor: TOAST_COLORS.bg.Informative,
        justifyContent: 'space-between',
      },
      Success: {
        backgroundColor: TOAST_COLORS.bg.Success,
        gap: semantic.spacing.spaceinside.sm,
      },
      Warning: {
        backgroundColor: TOAST_COLORS.bg.Warning,
        gap: semantic.spacing.spaceinside.sm,
      },
      Error: {
        backgroundColor: TOAST_COLORS.bg.Error,
        gap: semantic.spacing.spaceinside.sm,
      },
    },
  } as const,
});

const ContentContainer = styled(Stack, {
  name: 'ToastContent',
  flexDirection: 'column',
  gap: semantic.spacing.spaceinside['3xs'],
  flex: 1,
  minWidth: 0,
});

const TitleText = styled(Text, {
  name: 'ToastTitle',
  ...typography.caption,
  fontWeight: String(primitive.fontweight.bold),
  fontSize: primitive.fontsize['2xs'],
  lineHeight: primitive.lineheight['2xs'],
  color: TOAST_COLORS.title,
});

const DescriptionText = styled(Text, {
  name: 'ToastDescription',
  ...typography.bodyS,
  color: TOAST_COLORS.content,
});

const IconContainer = styled(Stack, {
  name: 'ToastIcon',
  width: 24,
  height: 24,
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
});

const CloseButton = styled(Stack, {
  name: 'ToastCloseButton',
  width: 16,
  height: 16,
  flexShrink: 0,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  pressStyle: {
    opacity: 0.7,
  },
});

/**
 * Toast Component
 *
 * Displays notification messages with different styles (Informative, Success, Warning, Error).
 *
 * @example
 * ```tsx
 * <Toast style="Success" title="Success!" description="Your action was completed." onClose={() => {}} />
 * <Toast style="Error" title="Error" description="Something went wrong." />
 * <Toast style="Informative" title="Info" description="Here's some information." />
 * ```
 */
export const Toast = React.forwardRef<TamaguiElement, ToastProps>(
  (
    {
      style = 'Informative',
      title = 'Title',
      description = 'Description. Lorem ipsum dolor sit amet.',
      showTitle = true,
      showDescription = true,
      icon,
      onClose,
    },
    ref
  ) => {
    const isInformative = style === 'Informative';

    const renderContent = () => (
      <ContentContainer>
        {showTitle && <TitleText>{title}</TitleText>}
        {showDescription && <DescriptionText>{description}</DescriptionText>}
      </ContentContainer>
    );

    const renderCloseButton = () =>
      onClose && (
        <CloseButton onPress={onClose}>
          <X size={12} color={TOAST_COLORS.content} />
        </CloseButton>
      );

    return (
      <ToastContainer ref={ref} toastStyle={style}>
        {isInformative ? (
          // Informative layout: icon + content grouped, close on right
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={semantic.spacing.spaceinside.sm}
            flex={1}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={semantic.spacing.spaceinside.sm}
              flex={1}
            >
              {icon && <IconContainer>{icon}</IconContainer>}
              {renderContent()}
            </Stack>
            {renderCloseButton()}
          </Stack>
        ) : (
          // Success/Warning/Error layout: icon, content, close in sequence
          <>
            {icon && <IconContainer>{icon}</IconContainer>}
            {renderContent()}
            {renderCloseButton()}
          </>
        )}
      </ToastContainer>
    );
  }
);

Toast.displayName = 'Toast';
