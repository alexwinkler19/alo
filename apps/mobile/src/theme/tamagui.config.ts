// /apps/mobile/src/theme/tamagui.config.ts

import { createTamagui, createTokens } from '@tamagui/core';
import { primitive, semantic } from '@alo/theme';


// 1. BASE TOKENS (PRIMITIVES → TOKENS)

const tokens = createTokens({
  // Primitive color scales (no semantic meaning yet)
  color: {
    // base
    white: primitive.color.white,
    black: primitive.color.black,

    // neutral grey
    grey100: primitive.color.neutral.grey['100'],
    grey200: primitive.color.neutral.grey['200'],
    grey300: primitive.color.neutral.grey['300'],
    grey400: primitive.color.neutral.grey['400'],
    grey500: primitive.color.neutral.grey['500'],
    grey600: primitive.color.neutral.grey['600'],
    grey700: primitive.color.neutral.grey['700'],
    grey800: primitive.color.neutral.grey['800'],
    grey900: primitive.color.neutral.grey['900'],

    // brand primary
    brandPrimary100: primitive.color.brand.primary['100'],
    brandPrimary200: primitive.color.brand.primary['200'],
    brandPrimary300: primitive.color.brand.primary['300'],
    brandPrimary400: primitive.color.brand.primary['400'],
    brandPrimary500: primitive.color.brand.primary['500'],
    brandPrimary600: primitive.color.brand.primary['600'],
    brandPrimary700: primitive.color.brand.primary['700'],
    brandPrimary800: primitive.color.brand.primary['800'],
    brandPrimary900: primitive.color.brand.primary['900'],

    // brand accent
    brandAccent100: primitive.color.brand.accent['100'],
    brandAccent200: primitive.color.brand.accent['200'],
    brandAccent300: primitive.color.brand.accent['300'],
    brandAccent400: primitive.color.brand.accent['400'],
    brandAccent500: primitive.color.brand.accent['500'],
    brandAccent600: primitive.color.brand.accent['600'],
    brandAccent700: primitive.color.brand.accent['700'],
    brandAccent800: primitive.color.brand.accent['800'],
    brandAccent900: primitive.color.brand.accent['900'],

    // functional: success
    success100: primitive.color.functional.success['100'],
    success200: primitive.color.functional.success['200'],
    success300: primitive.color.functional.success['300'],
    success400: primitive.color.functional.success['400'],
    success500: primitive.color.functional.success['500'],
    success600: primitive.color.functional.success['600'],
    success700: primitive.color.functional.success['700'],
    success800: primitive.color.functional.success['800'],
    success900: primitive.color.functional.success['900'],

    // functional: warning
    warning100: primitive.color.functional.warning['100'],
    warning200: primitive.color.functional.warning['200'],
    warning300: primitive.color.functional.warning['300'],
    warning400: primitive.color.functional.warning['400'],
    warning500: primitive.color.functional.warning['500'],
    warning600: primitive.color.functional.warning['600'],
    warning700: primitive.color.functional.warning['700'],
    warning800: primitive.color.functional.warning['800'],
    warning900: primitive.color.functional.warning['900'],

    // functional: error
    error100: primitive.color.functional.error['100'],
    error200: primitive.color.functional.error['200'],
    error300: primitive.color.functional.error['300'],
    error400: primitive.color.functional.error['400'],
    error500: primitive.color.functional.error['500'],
    error600: primitive.color.functional.error['600'],
    error700: primitive.color.functional.error['700'],
    error800: primitive.color.functional.error['800'],
    error900: primitive.color.functional.error['900'],

    // utility: blue
    blue100: primitive.color.utility.blue['100'],
    blue200: primitive.color.utility.blue['200'],
    blue300: primitive.color.utility.blue['300'],
    blue400: primitive.color.utility.blue['400'],
    blue500: primitive.color.utility.blue['500'],
    blue600: primitive.color.utility.blue['600'],
    blue700: primitive.color.utility.blue['700'],
    blue800: primitive.color.utility.blue['800'],
    blue900: primitive.color.utility.blue['900'],
  },

  // Primitive spacing scale (neutral – no semantic meaning yet)
  space: {
    none: primitive.spacing.null,
    '2xs': primitive.spacing['2xs'],
    xs: primitive.spacing.xs,
    sm: primitive.spacing.sm,
    md: primitive.spacing.md,
    lg: primitive.spacing.lg,
    xl: primitive.spacing.xl,
    '2xl': primitive.spacing['2xl'],
    '3xl': primitive.spacing['3xl'],
    '4xl': primitive.spacing['4xl'],
  },

  // Primitive radius scale
  radius: {
    '2xs': primitive.borderradius['2xs'],
    xs: primitive.borderradius.xs,
    sm: primitive.borderradius.sm,
    md: primitive.borderradius.md,
    lg: primitive.borderradius.lg,
    xl: primitive.borderradius.xl,
    pill: primitive.borderradius.pill,
    straight: primitive.borderradius.straight,
  },

  // Primitive z-index (raw scale)
  zIndex: {
    '0': primitive.zindex['0'],
    '1': primitive.zindex['1'],
    '2': primitive.zindex['2'],
    '3': primitive.zindex['3'],
    '4': primitive.zindex['4'],
    '5': primitive.zindex['5'],
  },

  // Generic size scale – reuse spacing for layout size
  // Includes numeric aliases ($1-$10) for Tamagui internal components
  size: {
    none: primitive.spacing.null,
    '2xs': primitive.spacing['2xs'],
    xs: primitive.spacing.xs,
    sm: primitive.spacing.sm,
    md: primitive.spacing.md,
    lg: primitive.spacing.lg,
    xl: primitive.spacing.xl,
    '2xl': primitive.spacing['2xl'],
    '3xl': primitive.spacing['3xl'],
    '4xl': primitive.spacing['4xl'],
    // Numeric aliases for Tamagui internal components (Slider, etc.)
    '1': primitive.spacing['2xs'],  // 4
    '2': primitive.spacing.xs,      // 8
    '3': primitive.spacing.sm,      // 12
    '4': primitive.spacing.md,      // 16
    '5': primitive.spacing.lg,      // 20
    '6': primitive.spacing.xl,      // 24
    '7': primitive.spacing['2xl'],  // 32
    '8': primitive.spacing['3xl'],  // 40
    '9': primitive.spacing['4xl'],  // 48
    '10': 56,
  },
});


// 2. THEMES (SEMANTICS → THEME VALUES)

/**
 * The light theme maps semantic tokens directly.
 * Important: we use semantic values here, so any change in `semantic`
 * automatically flows through, without re-encoding mappings.
 *
 * Components should use these via `$textPrimary`, `$bgPrimary`, etc.
 */

const lightTheme = {
  // generic defaults Tamagui uses (`bg` & `color`)
  bg: semantic.color.bg.primary,
  color: semantic.color.text.primary,

  // Text semantics
  textPrimary: semantic.color.text.primary,
  textSecondary: semantic.color.text.secondary,
  textTertiary: semantic.color.text.tertiary,
  textPlaceholder: semantic.color.text.placeholder,
  textInverse: semantic.color.text.inverse,
  textOnSecondary: semantic.color.text.onsecondary,
  textOnTertiary: semantic.color.text.ontertiary,
  textDisabled: semantic.color.text.disabled,

  // Background semantics
  bgPrimary: semantic.color.bg.primary,
  bgBackdrop: semantic.color.bg.backdrop,
  bgSecondary: semantic.color.bg.secondary,
  bgTertiary: semantic.color.bg.tertiary,
  bgElevated: semantic.color.bg.elevated,

  // Brand semantics
  brandPrimary: semantic.color.brand.primary,
  brandSecondary: semantic.color.brand.secondary,
  brandHover: semantic.color.brand.hover,
  brandPressed: semantic.color.brand.pressed,
  brandHighlight: semantic.color.brand.highlight,
  brandSubtle: semantic.color.brand.subtle,
  brandTertiary: semantic.color.brand.tertiary,

  // Status: error
  statusErrorText: semantic.color.status.error.text,
  statusErrorBorder: semantic.color.status.error.border,
  statusErrorBg: semantic.color.status.error.bg,
  statusErrorIcon: semantic.color.status.error.icon,

  // Status: warning
  statusWarningText: semantic.color.status.warning.text,
  statusWarningBg: semantic.color.status.warning.bg,
  statusWarningIcon: semantic.color.status.warning.icon,
  statusWarningBorder: semantic.color.status.warning.border,

  // Status: success
  statusSuccessText: semantic.color.status.success.text,
  statusSuccessBg: semantic.color.status.success.bg,
  statusSuccessIcon: semantic.color.status.success.icon,
  statusSuccessBorder: semantic.color.status.success.border,

  // Status: neutral
  statusNeutralBg: semantic.color.status.neutral.bg,
  statusNeutralText: semantic.color.status.neutral.text,
  statusNeutralIcon: semantic.color.status.neutral.icon,

  // Border semantics
  borderFocused: semantic.color.border.focused,
  borderDefault: semantic.color.border.default,
  borderInverse: semantic.color.border.inverse,
  borderSubtle: semantic.color.border.subtle,
  borderDisabled: semantic.color.border.disabled,

  // Interface semantics
  interfaceBrand: semantic.color.interface.brand,
  interfacePrimary: semantic.color.interface.primary,
  interfaceSecondary: semantic.color.interface.secondary,
  interfaceDisabled: semantic.color.interface.disabled,
  interfaceTertiary: semantic.color.interface.tertiary,
  interfaceMask: semantic.color.interface.mask,
  interfaceGlyph: semantic.color.interface.glyph,
  interfaceInverse: semantic.color.interface.inverse,
  interfaceTrack: semantic.color.interface.track,

  // Spacing semantics (optional but useful for the coding agent)
  spaceInsideXs: semantic.spacing.spaceinside.xs,
  spaceInsideSm: semantic.spacing.spaceinside.sm,
  spaceInsideMd: semantic.spacing.spaceinside.md,
  spaceInsideLg: semantic.spacing.spaceinside.lg,
  spaceInsideXl: semantic.spacing.spaceinside.xl,
  spaceInside2xl: semantic.spacing.spaceinside['2xl'],
  spaceInside2xs: semantic.spacing.spaceinside['2xs'],
  spaceInside3xs: semantic.spacing.spaceinside['3xs'],
  spaceInside3xl: semantic.spacing.spaceinside['3xl'],
  spaceInsideNone: semantic.spacing.spaceinside.none,

  insetVerticalXs: semantic.spacing.spaceinset.vertical.xs,
  insetVerticalSm: semantic.spacing.spaceinset.vertical.sm,
  insetVerticalMd: semantic.spacing.spaceinset.vertical.md,
  insetVerticalLg: semantic.spacing.spaceinset.vertical.lg,
  insetVertical2xs: semantic.spacing.spaceinset.vertical['2xs'],
  insetVertical3xs: semantic.spacing.spaceinset.vertical['3xs'],
  insetVerticalNone: semantic.spacing.spaceinset.vertical.none,

  insetHorizontalXs: semantic.spacing.spaceinset.horizontal.xs,
  insetHorizontalSm: semantic.spacing.spaceinset.horizontal.sm,
  insetHorizontalMd: semantic.spacing.spaceinset.horizontal.md,
  insetHorizontalLg: semantic.spacing.spaceinset.horizontal.lg,
  insetHorizontalXl: semantic.spacing.spaceinset.horizontal.xl,
  insetHorizontal2xs: semantic.spacing.spaceinset.horizontal['2xs'],
  insetHorizontal3xs: semantic.spacing.spaceinset.horizontal['3xs'],
  insetHorizontalNone: semantic.spacing.spaceinset.horizontal.none,

  // Z-index semantics
  zIndexBase: semantic.zindex.base,
  zIndexRaised: semantic.zindex.raised,
  zIndexFloating: semantic.zindex.floating,
  zIndexOverlay: semantic.zindex.overlay,
  zIndexModal: semantic.zindex.modal,
  zIndexSystem: semantic.zindex.system,
};

// 3. TAMAGUI CONFIG


export const config = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
  },
  shorthands: {
    p: 'padding',
    m: 'margin',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    bg: 'backgroundColor',
  } as const,
  defaultTheme: 'light',
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
