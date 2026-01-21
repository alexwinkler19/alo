import React, { useState } from 'react';
import { Stack, Text } from 'tamagui';
import { Checkbox } from './Checkbox';

/**
 * Checkbox Examples
 * 
 * This file demonstrates all the variants and props available for the Checkbox component.
 */

export const CheckboxExamples = () => {
  const [smallChecked, setSmallChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [largeChecked, setLargeChecked] = useState(false);

  return (
    <Stack gap={32} padding={20}>
      {/* Small Size - Unselected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Small" selected={false} />
        <Text>Small - Unselected</Text>
      </Stack>

      {/* Small Size - Selected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Small" selected={true} />
        <Text>Small - Selected</Text>
      </Stack>

      {/* Medium Size - Unselected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Medium" selected={false} />
        <Text>Medium - Unselected</Text>
      </Stack>

      {/* Medium Size - Selected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Medium" selected={true} />
        <Text>Medium - Selected</Text>
      </Stack>

      {/* Large Size - Unselected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Large" selected={false} />
        <Text>Large - Unselected</Text>
      </Stack>

      {/* Large Size - Selected */}
      <Stack gap={8} flexDirection="row" alignItems="center">
        <Checkbox size="Large" selected={true} />
        <Text>Large - Selected</Text>
      </Stack>

      {/* Interactive Examples */}
      <Stack gap={16} marginTop={20}>
        <Text fontWeight="bold">Interactive Examples:</Text>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox
            size="Small"
            selected={smallChecked}
            onChange={setSmallChecked}
          />
          <Text>Toggle Small Checkbox</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox
            size="Medium"
            selected={mediumChecked}
            onChange={setMediumChecked}
          />
          <Text>Toggle Medium Checkbox</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox
            size="Large"
            selected={largeChecked}
            onChange={setLargeChecked}
          />
          <Text>Toggle Large Checkbox</Text>
        </Stack>
      </Stack>

      {/* Disabled States */}
      <Stack gap={16} marginTop={20}>
        <Text fontWeight="bold">Disabled States:</Text>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Small" selected={false} disabled />
          <Text>Small - Disabled Unselected</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Small" selected={true} disabled />
          <Text>Small - Disabled Selected</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Medium" selected={false} disabled />
          <Text>Medium - Disabled Unselected</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Medium" selected={true} disabled />
          <Text>Medium - Disabled Selected</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Large" selected={false} disabled />
          <Text>Large - Disabled Unselected</Text>
        </Stack>

        <Stack gap={8} flexDirection="row" alignItems="center">
          <Checkbox size="Large" selected={true} disabled />
          <Text>Large - Disabled Selected</Text>
        </Stack>
      </Stack>

      {/* List Example */}
      <Stack gap={16} marginTop={20}>
        <Text fontWeight="bold">List Example:</Text>
        <Stack gap={12}>
          {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
            <Stack key={index} gap={8} flexDirection="row" alignItems="center">
              <Checkbox
                size="Medium"
                selected={index === 0}
                onChange={() => {}}
              />
              <Text>{option}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckboxExamples;
