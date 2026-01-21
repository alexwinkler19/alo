/**
 * Figma Code Connect mapping for ContentSwitcherSection component
 * This file maps the Figma component to the React implementation
 */

import figma from '@figma/code-connect';
import { ContentSwitcherSection } from './ContentSwitcherSection';

/**
 * Content Switcher Section component with selected state
 * Node: https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1006
 */
figma.connect(
  ContentSwitcherSection,
  'https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1006',
  {
    props: {
      selected: figma.boolean('selected'),
      title: figma.string('title'),
    },
    example: ({ selected, title }) => (
      <ContentSwitcherSection selected={selected} title={title} />
    ),
  }
);
