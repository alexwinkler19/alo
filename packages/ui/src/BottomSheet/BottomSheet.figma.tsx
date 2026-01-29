import React from 'react';
import { BottomSheet } from './BottomSheet';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for BottomSheet
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=1251-13526
 */
export default function BottomSheetFigma() {
  return (
    <Stack gap={32} padding={20}>
      {/* Search state */}
      <BottomSheet state="Search" searchText="Search destinations" />

      {/* Result state */}
      <BottomSheet
        state="Result"
        searchText="Location"
        locations={[
          { id: '1', name: 'New York, USA' },
          { id: '2', name: 'Los Angeles, USA' },
          { id: '3', name: 'Chicago, USA' },
          { id: '4', name: 'Miami, USA' },
          { id: '5', name: 'Seattle, USA' },
        ]}
        onClose={() => console.log('Close pressed')}
        onLocationPress={(location) => console.log('Location pressed:', location)}
      />
    </Stack>
  );
}
