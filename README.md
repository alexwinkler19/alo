# Alo - Weekend Activity App

A production-grade cross-platform mobile app for finding and joining weekend
activities and trips.

## Tech Stack

- **Framework**: React Native with Expo SDK 54+
- **Language**: TypeScript (strict mode)
- **UI**: Tamagui
- **Navigation**: React Navigation
- **State Management**: React Query + Zustand
- **Backend**: Supabase
- **Monorepo**: Turborepo + pnpm

## Project Structure

```
alo-antigravity/
├── apps/
│   └── mobile/          # React Native mobile app
├── packages/
│   ├── theme/           # Tamagui design tokens
│   └── ui/              # Shared UI components
```

## Figma Integration

To connect Antigravity to Figma:

1. Open Figma Desktop > Plugins > Development > MCP Server.
2. Add the server to your agent manually:
   - URL: `http://127.0.0.1:3845/mcp`
   - Type: `SSE`

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Development

```bash
# Start the mobile app
cd apps/mobile
pnpm start
```

## License

Private
