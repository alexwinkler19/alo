/**
 * Figma Code Connect mapping for ContentSwitcher component
 * This file maps the Figma component to the React implementation
 */

import figma from '@figma/code-connect';
import { ContentSwitcher } from './ContentSwitcher';

/**
 * Content Switcher component with variable number of items
 * Node: https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1352
 */
figma.connect(
  ContentSwitcher,
  'https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1352',
  {
    props: {
      noOfItems: figma.enum('No. of items', {
        '2': '2',
        '3': '3',
        '4': '4',
      }),
    },
    example: ({ noOfItems }) => {
      // Create items array based on number
      const count = parseInt(noOfItems || '2', 10);
      const items = Array.from({ length: count }, (_, i) => ({
        id: String(i + 1),
        title: `Section ${i + 1}`,
      }));
      
      return (
        <ContentSwitcher
          items={items}
          selectedId="1"
          onSelectionChange={() => {}}
        />
      );
    },
  }
);
