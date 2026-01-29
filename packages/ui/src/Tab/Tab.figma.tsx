import React from 'react';
import { Tab } from './Tab';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for Tab
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=859-3680
 */
export default function TabFigma() {
  return (
    <Stack gap={16} padding={20}>
      {/* Active state with badge */}
      <Tab text="Label" state={true} showBadge={true} badgeText="Badge" />

      {/* Inactive state with badge */}
      <Tab text="Label" state={false} showBadge={true} badgeText="Badge" />

      {/* Active state without badge */}
      <Tab text="Label" state={true} showBadge={false} />

      {/* Inactive state without badge */}
      <Tab text="Label" state={false} showBadge={false} />
    </Stack>
  );
}
