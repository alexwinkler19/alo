import React from 'react';
import { TabSwitch } from './TabSwitch';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for TabSwitch
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=1224-19292
 */
export default function TabSwitchFigma() {
  return (
    <Stack gap={16} padding={20}>
      {/* Active state */}
      <TabSwitch text="Dates" state={true} />

      {/* Inactive state */}
      <TabSwitch text="Dates" state={false} />
    </Stack>
  );
}
