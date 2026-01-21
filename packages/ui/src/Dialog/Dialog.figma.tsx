/**
 * Figma Code Connect mapping for Dialog component
 * This file maps the Figma component to the React implementation
 */

import figma from '@figma/code-connect';
import { Dialog } from './Dialog';

/**
 * Dialog component (2-Button Dialog)
 * Node: https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1665
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=109-1665',
  {
    props: {
      title: figma.string('title'),
      description: figma.string('description'),
      showTitle: figma.boolean('showTitle'),
      showDescription: figma.boolean('showDescription'),
      showPrimaryButton: figma.boolean('button2'),
      showSecondaryButton: figma.boolean('button1'),
    },
    example: ({ title, description, showTitle, showDescription, showPrimaryButton, showSecondaryButton }) => (
      <Dialog
        title={title}
        description={description}
        showTitle={showTitle}
        showDescription={showDescription}
        showPrimaryButton={showPrimaryButton}
        showSecondaryButton={showSecondaryButton}
        primaryButtonLabel="Button"
        secondaryButtonLabel="Button"
      />
    ),
  }
);
