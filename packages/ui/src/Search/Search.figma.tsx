import React from 'react';
import { Search } from './Search';
import { Stack } from 'tamagui';

/**
 * Figma component showcase for Search
 * Figma URL: https://www.figma.com/design/tjALt2jtgKzpZOrJVj5MkI/alo?node-id=1207-20968
 */
export default function SearchFigma() {
  return (
    <Stack gap={16} padding={20}>
      {/* Default state */}
      <Search text="Search destinations" searchBar="Default" />

      {/* Searching state */}
      <Search text="Search destinations" searchBar="Searching" />

      {/* Result state */}
      <Search text="Italy" searchBar="Result" onClose={() => console.log('Close pressed')} />
    </Stack>
  );
}
