import React from 'react';
import { Stack, Text, styled, TamaguiElement } from 'tamagui';
import { primitive, typography, semantic } from '@alo/theme';

export interface TagProps {
  /** Tag label text */
  text?: string;
  /** Active/selected state */
  state?: boolean;
  /** Press handler */
  onPress?: () => void;
}

const TagContainer = styled(Stack, {
  name: 'Tag',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: primitive.spacing.xs + 6, // 14px from Figma
  paddingVertical: primitive.spacing.xs + 2, // 10px from Figma
  borderRadius: primitive.spacing.lg, // 20px from Figma
  borderStyle: 'solid',
  cursor: 'pointer',

  variants: {
    state: {
      active: {
        backgroundColor: semantic.color.bg.secondary, // #fafafa from Figma
        borderWidth: primitive.borderwidth.prominent, // 2px from Figma
        borderColor: semantic.color.text.primary, // #2c2c2c from Figma
      },
      inactive: {
        backgroundColor: primitive.color.white, // white from Figma
        borderWidth: primitive.borderwidth.regular, // 1px
        borderColor: semantic.color.border.subtle, // #eeeeee from Figma
      },
    },
  } as const,
});

const TagText = styled(Text, {
  name: 'TagText',
  fontFamily: primitive.fontfamily.heading,
  fontSize: primitive.fontsize.xs, // 14px from Figma
  fontWeight: '600', // semibold from Figma
  lineHeight: primitive.lineheight.md, // 18px from Figma
  letterSpacing: primitive.letterspacing.normal,
  color: semantic.color.text.primary, // #2c2c2c from Figma
});

/**
 * Tag Component
 *
 * Selectable tag for dates, categories, or filters.
 *
 * @example
 * ```tsx
 * <Tag text="May 14 - 19" state={true} />
 * <Tag text="May 14 - 19" state={false} />
 * ```
 */
export const Tag = React.forwardRef<TamaguiElement, TagProps>(
  (
    {
      text = 'May 14 - 19',
      state = true,
      onPress,
    },
    ref
  ) => {
    return (
      <TagContainer
        ref={ref}
        state={state ? 'active' : 'inactive'}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
      >
        <TagText>{text}</TagText>
      </TagContainer>
    );
  }
);

Tag.displayName = 'Tag';
