import React from 'react';
import { BottomBar } from './BottomBar';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for BottomBar
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=834-4080
 */
export default function BottomBarFigma() {
  return (
    <Stack gap={32} padding={20}>
      {/* Search state */}
      <BottomBar
        state="Search"
        primaryButtonText="Search"
        secondaryButtonText="Clear all"
        onPrimaryPress={() => console.log('Search pressed')}
        onSecondaryPress={() => console.log('Clear all pressed')}
      />

      {/* Reserve state */}
      <BottomBar
        state="Reserve"
        price="$32"
        dateRange="Feb 13 - 14"
        primaryButtonText="Reserve"
        onPrimaryPress={() => console.log('Reserve pressed')}
      />

      {/* Step state */}
      <BottomBar
        state="Step"
        primaryButtonText="Next"
        secondaryButtonText="Skip"
        onPrimaryPress={() => console.log('Next pressed')}
        onSecondaryPress={() => console.log('Skip pressed')}
      />

      {/* Step v2 state */}
      <BottomBar
        state="Step v2"
        primaryButtonText="Next"
        onPrimaryPress={() => console.log('Next pressed')}
      />
    </Stack>
  );
}
