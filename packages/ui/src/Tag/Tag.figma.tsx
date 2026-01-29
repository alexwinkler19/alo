import React from 'react';
import { Tag } from './Tag';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for Tag
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=917-5985
 */
export default function TagFigma() {
  return (
    <Stack gap={16} padding={20} flexDirection="row" flexWrap="wrap">
      {/* Active state */}
      <Tag text="May 14 - 19" state={true} />

      {/* Inactive state */}
      <Tag text="May 14 - 19" state={false} />
    </Stack>
  );
}
