// /apps/mobile/src/providers/TamaguiProvider.tsx
import { TamaguiProvider as BaseTamaguiProvider } from '@tamagui/core';
import config from '../theme/tamagui.config';
import React from 'react';

interface TamaguiProviderProps {
  children: React.ReactNode;
}

/**
 * App-level Tamagui provider that wraps the application
 * with the design token configuration
 */
export function TamaguiProvider({ children }: TamaguiProviderProps) {
  return (
    <BaseTamaguiProvider config={config} defaultTheme="light">
      {children}
    </BaseTamaguiProvider>
  );
}
