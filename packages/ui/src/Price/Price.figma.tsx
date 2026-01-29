import React from 'react';
import { Price } from './Price';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for Price
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=1250-11849
 */
export default function PriceFigma() {
  return (
    <Stack gap={16} padding={20}>
      {/* Default light mode with icon */}
      <Price price="$447" state="Default" darkMode={false} showIcon={true} />

      {/* Default dark mode with icon */}
      <Price price="$1,700" state="Default" darkMode={true} showIcon={true} />

      {/* Icon state with notification badge */}
      <Price state="Icon" />

      {/* Default light mode without icon */}
      <Price price="$447" state="Default" darkMode={false} showIcon={false} />

      {/* Default dark mode without icon */}
      <Price price="$1,700" state="Default" darkMode={true} showIcon={false} />
    </Stack>
  );
}
