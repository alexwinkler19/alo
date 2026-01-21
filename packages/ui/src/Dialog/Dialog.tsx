import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { semantic, typography } from '@alo/theme';
import { Button } from '../Button';

/*
 * TODO: Missing design tokens for Dialog component
 * These values are hardcoded from Figma and need tokens:
 * - component/dialog/borderRadius: 16px
 * - component/dialog/padding/horizontal: 16px
 * - component/dialog/padding/vertical: 16px
 * - component/dialog/gap/content-actions: 10px
 * - component/dialog/gap/title-description: 8px
 * - component/dialog/gap/buttons: 8px
 * - component/dialog/content/padding: 8px
 * - component/dialog/shadow: Shadow 1
 */

export interface DialogProps {
  /** Dialog title */
  title?: string;
  /** Dialog description/content */
  description?: string;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide description */
  showDescription?: boolean;
  /** Primary button label */
  primaryButtonLabel?: string;
  /** Secondary button label */
  secondaryButtonLabel?: string;
  /** Show/hide primary button */
  showPrimaryButton?: boolean;
  /** Show/hide secondary button */
  showSecondaryButton?: boolean;
  /** Primary button press handler */
  onPrimaryPress?: () => void;
  /** Secondary button press handler */
  onSecondaryPress?: () => void;
}

// Hardcoded values from Figma (missing tokens)
const DIALOG_SPACING = {
  borderRadius: 16,
  padding: 16,
  contentActionsGap: 10,
  titleDescriptionGap: 8,
  buttonsGap: 8,
  contentPadding: 8,
} as const;

const DialogContainer = styled(Stack, {
  name: 'Dialog',
  flexDirection: 'column',
  backgroundColor: semantic.color.bg.primary,
  borderRadius: DIALOG_SPACING.borderRadius,
  paddingHorizontal: DIALOG_SPACING.padding,
  paddingVertical: DIALOG_SPACING.padding,
  gap: DIALOG_SPACING.contentActionsGap,
});

const ContentContainer = styled(Stack, {
  name: 'DialogContent',
  flexDirection: 'column',
  gap: DIALOG_SPACING.titleDescriptionGap,
  padding: DIALOG_SPACING.contentPadding,
});

const TitleText = styled(Text, {
  name: 'DialogTitle',
  ...typography.screenTitle,
  color: semantic.color.text.primary,
});

const DescriptionText = styled(Text, {
  name: 'DialogDescription',
  ...typography.bodyM,
  color: semantic.color.text.secondary,
});

const ActionsContainer = styled(Stack, {
  name: 'DialogActions',
  flexDirection: 'row',
  gap: DIALOG_SPACING.buttonsGap,
});

const ButtonWrapper = styled(Stack, {
  name: 'DialogButtonWrapper',
  flex: 1,
  minWidth: 0,
});

/**
 * Dialog Component (2-Button Dialog)
 *
 * Interrupts the journey with important info and actions.
 * Displays a modal dialog with title, description, and up to two action buttons.
 *
 * @example
 * ```tsx
 * <Dialog
 *   title="Delete Item?"
 *   description="This action cannot be undone."
 *   primaryButtonLabel="Delete"
 *   secondaryButtonLabel="Cancel"
 *   onPrimaryPress={() => handleDelete()}
 *   onSecondaryPress={() => handleCancel()}
 * />
 * ```
 */
export const Dialog = React.forwardRef<TamaguiElement, DialogProps>(
  (
    {
      title = 'Title',
      description = 'Description. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      showTitle = true,
      showDescription = true,
      primaryButtonLabel = 'Button',
      secondaryButtonLabel = 'Button',
      showPrimaryButton = true,
      showSecondaryButton = true,
      onPrimaryPress,
      onSecondaryPress,
    },
    ref
  ) => {
    return (
      <DialogContainer ref={ref}>
        {/* Content Section */}
        <ContentContainer>
          {showTitle && <TitleText>{title}</TitleText>}
          {showDescription && <DescriptionText>{description}</DescriptionText>}
        </ContentContainer>

        {/* Actions Section */}
        <ActionsContainer>
          {showSecondaryButton && (
            <ButtonWrapper>
              <Button
                buttonType="Secondary"
                text={secondaryButtonLabel}
                onPress={onSecondaryPress}
              />
            </ButtonWrapper>
          )}
          {showPrimaryButton && (
            <ButtonWrapper>
              <Button
                buttonType="Primary"
                text={primaryButtonLabel}
                onPress={onPrimaryPress}
              />
            </ButtonWrapper>
          )}
        </ActionsContainer>
      </DialogContainer>
    );
  }
);

Dialog.displayName = 'Dialog';
