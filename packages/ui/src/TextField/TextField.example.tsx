import React from 'react';
import { Stack } from 'tamagui';
import { TextField } from './TextField';

/**
 * TextField Examples
 * 
 * This file demonstrates all the variants and props available for the TextField component.
 */

// Example Eye Icon component for demonstration
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5z"
      fill="#8f9098"
    />
    <circle cx="8" cy="8" r="2" fill="white" />
  </svg>
);

export const TextFieldExamples = () => {
  return (
    <Stack gap={32} padding={20}>
      {/* Empty State - Default */}
      <Stack gap={8}>
        <TextField
          title="Email"
          placeholder="Enter your email"
          state="Empty"
          showTitle
          showPlaceholder
        />
      </Stack>

      {/* Filled State */}
      <Stack gap={8}>
        <TextField
          title="Email"
          content="user@example.com"
          state="Filled"
          showTitle
        />
      </Stack>

      {/* Typing/Error State */}
      <Stack gap={8}>
        <TextField
          title="Password"
          content="password123"
          state="Typing"
          showTitle
          icon={<EyeIcon />}
          showIcon
        />
      </Stack>

      {/* Inactive/Disabled State */}
      <Stack gap={8}>
        <TextField
          title="Account ID"
          content="ACC-12345"
          state="Inactive"
          showTitle
        />
      </Stack>

      {/* With Unit Prefix */}
      <Stack gap={8}>
        <TextField
          title="Amount"
          unit="€"
          showUnit
          content="1000"
          state="Filled"
          showTitle
        />
      </Stack>

      {/* With Support Text */}
      <Stack gap={8}>
        <TextField
          title="Username"
          placeholder="Choose a username"
          state="Empty"
          showTitle
          showSupportText
          supportText="Must be at least 3 characters"
        />
      </Stack>

      {/* All Features Combined */}
      <Stack gap={8}>
        <TextField
          title="Payment Amount"
          unit="$"
          showUnit
          content="999.99"
          state="Filled"
          showTitle
          showSupportText
          supportText="Amount in USD"
          icon={<EyeIcon />}
          showIcon
        />
      </Stack>

      {/* Empty with Icon */}
      <Stack gap={8}>
        <TextField
          title="Password"
          placeholder="Enter password"
          state="Empty"
          showTitle
          showPlaceholder
          icon={<EyeIcon />}
          showIcon
        />
      </Stack>

      {/* Without Title */}
      <Stack gap={8}>
        <TextField
          placeholder="Search..."
          state="Empty"
          showTitle={false}
          showPlaceholder
        />
      </Stack>
    </Stack>
  );
};

export default TextFieldExamples;
