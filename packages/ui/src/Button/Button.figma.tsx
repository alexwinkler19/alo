/**
 * Figma Code Connect mapping for Button component
 * This file maps the Figma component to the React implementation
 */

import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Button component with all variants (Primary, Secondary, Tertiary)
 * Node: https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=2133-7531
 */
figma.connect(
  Button,
  'https://www.figma.com/design/P8FzHkfoJXzK3Emh25Xjhj/Version-2.0?node-id=2133-7531',
  {
    props: {
      buttonType: figma.enum('Property 1', {
        Primary: 'Primary',
        Secondary: 'Secondary',
        Tertiary: 'Tertiary',
      }),
    },
    example: ({ buttonType }) => <Button buttonType={buttonType} text="Button" />,
  }
);
