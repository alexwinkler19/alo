import React from 'react';
import { Stack } from 'tamagui';
import { TextArea } from './TextArea';

/**
 * TextArea Examples
 * 
 * This file demonstrates all the variants and props available for the TextArea component.
 */

export const TextAreaExamples = () => {
  return (
    <Stack gap={32} padding={20}>
      {/* Empty State - Default */}
      <Stack gap={8}>
        <TextArea
          title="Description"
          placeholder="Enter your description"
          state="Empty"
          showTitle
          showPlaceholder
        />
      </Stack>

      {/* Filled State */}
      <Stack gap={8}>
        <TextArea
          title="Comments"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          state="Filled"
          showTitle
        />
      </Stack>

      {/* Typing/Error State */}
      <Stack gap={8}>
        <TextArea
          title="Feedback"
          content="This is some feedback text that needs attention"
          state="Typing"
          showTitle
        />
      </Stack>

      {/* Inactive/Disabled State */}
      <Stack gap={8}>
        <TextArea
          title="System Message"
          content="This field is read-only and cannot be edited"
          state="Inactive"
          showTitle
        />
      </Stack>

      {/* With Support Text */}
      <Stack gap={8}>
        <TextArea
          title="Notes"
          placeholder="Add your notes here"
          state="Empty"
          showTitle
          showSupportText
          supportText="Maximum 500 characters"
        />
      </Stack>

      {/* With Unit Prefix */}
      <Stack gap={8}>
        <TextArea
          title="Price Description"
          unit="€"
          showUnit
          content="1000 per month for the premium subscription"
          state="Filled"
          showTitle
        />
      </Stack>

      {/* Filled with Support Text */}
      <Stack gap={8}>
        <TextArea
          title="Biography"
          content="I am a software developer with over 10 years of experience in building web applications."
          state="Filled"
          showTitle
          showSupportText
          supportText="Tell us about yourself (max 200 characters)"
        />
      </Stack>

      {/* Typing State with Support Text */}
      <Stack gap={8}>
        <TextArea
          title="Address"
          content="123 Main St"
          state="Typing"
          showTitle
          showSupportText
          supportText="Please enter a valid address"
        />
      </Stack>

      {/* Without Title */}
      <Stack gap={8}>
        <TextArea
          placeholder="Write something..."
          state="Empty"
          showTitle={false}
          showPlaceholder
        />
      </Stack>

      {/* Empty with Unit */}
      <Stack gap={8}>
        <TextArea
          title="Amount Details"
          unit="$"
          showUnit
          placeholder="Enter amount details"
          state="Empty"
          showTitle
          showPlaceholder
        />
      </Stack>
    </Stack>
  );
};

export default TextAreaExamples;
