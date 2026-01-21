/**
 * Figma Code Connect mapping for Toast component
 * This file maps the Figma component to the React implementation
 */

import figma from '@figma/code-connect';
import { Toast } from './Toast';

/**
 * Toast component with all style variants (Informative, Success, Warning, Error)
 * Node: https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=2138-7532
 */
figma.connect(
  Toast,
  'https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=2138-7532',
  {
    props: {
      style: figma.enum('Property 1', {
        Informative: 'Informative',
        Success: 'Success',
        Warning: 'Warning',
        Error: 'Error',
      }),
    },
    example: ({ style }) => (
      <Toast
        style={style}
        title="Title"
        description="Description. Lorem ipsum dolor sit amet."
      />
    ),
  }
);
