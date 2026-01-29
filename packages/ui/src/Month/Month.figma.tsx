import React from 'react';
import { Month } from './Month';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for Month
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=1242-9522
 */
export default function MonthFigma() {
  return (
    <Stack gap={16} padding={20} flexDirection="row" flexWrap="wrap">
      {/* Inactive state */}
      <Month month="June" year="2023" state={false} />

      {/* Active state */}
      <Month month="June" year="2023" state={true} />
    </Stack>
  );
}
