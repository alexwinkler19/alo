// /packages/theme/src/semantics.ts
import { primitive } from './primitive-tokens';

export const semantic = {
  color: {
    text: {
      primary: primitive.color.neutral.grey['900'],
      secondary: primitive.color.neutral.grey['700'],
      tertiary: primitive.color.neutral.grey['600'],
      placeholder: primitive.color.neutral.grey['500'],
      inverse: primitive.color.neutral.grey['100'],
      onsecondary: primitive.color.brand.primary['900'],
      disabled: primitive.color.neutral.grey['600'],
      ontertiary: primitive.color.brand.primary['900'],
    },

    bg: {
      primary: primitive.color.white,
      backdrop: '#bdbdbd80',
      secondary: primitive.color.neutral.grey['100'],
      tertiary: primitive.color.utility.blue['100'],
      elevated: primitive.color.white,
    },

    brand: {
      secondary: primitive.color.white,
      primary: primitive.color.brand.primary['900'],
      hover: primitive.color.brand.primary['700'],
      pressed: primitive.color.brand.primary['900'],
      highlight: primitive.color.brand.accent['900'],
      subtle: primitive.color.brand.primary['500'],
      tertiary: primitive.color.white,
    },

    status: {
      error: {
        text: primitive.color.functional.error['900'],
        border: primitive.color.functional.error['900'],
        bg: primitive.color.functional.error['100'],
        icon: primitive.color.functional.error['800'],
      },
      warning: {
        text: primitive.color.functional.warning['900'],
        bg: primitive.color.functional.warning['100'],
        icon: primitive.color.functional.warning['800'],
        border: primitive.color.functional.warning['900'],
      },
      success: {
        text: primitive.color.functional.success['900'],
        bg: primitive.color.functional.success['100'],
        icon: primitive.color.functional.success['800'],
        border: primitive.color.functional.success['900'],
      },
      neutral: {
        bg: primitive.color.utility.blue['100'],
        text: primitive.color.neutral.grey['700'],
        icon: primitive.color.brand.primary['900'],
      },
    },

    border: {
      focused: primitive.color.neutral.grey['900'],
      default: primitive.color.neutral.grey['500'],
      inverse: primitive.color.neutral.grey['100'],
      subtle: primitive.color.neutral.grey['300'],
      disabled: primitive.color.neutral.grey['400'],
    },

    interface: {
      brand: primitive.color.brand.primary['900'],
      primary: primitive.color.neutral.grey['900'],
      secondary: primitive.color.neutral.grey['700'],
      disabled: primitive.color.neutral.grey['400'],
      tertiary: primitive.color.neutral.grey['100'],
      mask: primitive.color.utility.blue['100'],
      glyph: primitive.color.utility.blue['300'],
      inverse: primitive.color.white,
      track: primitive.color.neutral.grey['200'],
    },
  },

  borderradius: {
    xl: primitive.borderradius.xl,
    '2xs': primitive.borderradius['2xs'],
    xs: primitive.borderradius.xs,
    sm: primitive.borderradius.sm,
    md: primitive.borderradius.md,
    straight: primitive.borderradius.straight,
    pill: primitive.borderradius.pill,
    lg: primitive.borderradius.lg,
  },

  borderwidth: {
    none: primitive.borderwidth.regular,
    medium: primitive.borderwidth.increased,
    subtle: primitive.borderwidth.subtle,
    default: primitive.borderwidth.regular,
    heavy: primitive.borderwidth.prominent,
    superheavy: primitive.borderwidth.thick,
  },

  spacing: {
    spaceinset: {
      vertical: {
        xs: primitive.spacing.xs,
        sm: primitive.spacing.sm,
        md: primitive.spacing.md,
        '3xs': primitive.spacing['3xs'],
        lg: primitive.spacing.lg,
        '2xs': primitive.spacing['2xs'],
        none: primitive.spacing.null,
      },
      horizontal: {
        xs: primitive.spacing.xs,
        sm: primitive.spacing.sm,
        md: primitive.spacing.md,
        lg: primitive.spacing.lg,
        '3xs': primitive.spacing['3xs'],
        xl: primitive.spacing.xl,
        '2xs': primitive.spacing['2xs'],
        none: primitive.spacing.null,
      },
    },

    spaceinside: {
      xs: primitive.spacing.xs,
      sm: primitive.spacing.sm,
      md: primitive.spacing.md,
      xl: primitive.spacing.xl,
      '2xl': primitive.spacing['2xl'],
      none: primitive.spacing.null,
      '2xs': primitive.spacing['2xs'],
      '3xs': primitive.spacing['3xs'],
      '3xl': primitive.spacing['3xl'],
      lg: primitive.spacing.lg,
    },
  },

  zindex: {
    base: primitive.zindex['0'],
    raised: primitive.zindex['1'],
    floating: primitive.zindex['2'],
    overlay: primitive.zindex['3'],
    modal: primitive.zindex['4'],
    system: primitive.zindex['5'],
  },

  typography: {
    heading: {
      display: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.semibold,
        lineheight: primitive.lineheight.xl,
        fontsize: primitive.fontsize.xl, // 24
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      screentitle: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.bold,
        lineheight: primitive.lineheight.xl,
        fontsize: primitive.fontsize.lg, // 20
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      sectiontitle: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.bold,
        lineheight: primitive.lineheight.xl,
        fontsize: primitive.fontsize.md, // 18
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      subsectiontitle: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.bold,
        lineheight: primitive.lineheight.sm,
        fontsize: primitive.fontsize.sm, // 16
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      label: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.bold,
        lineheight: primitive.lineheight['2xs'],
        fontsize: primitive.fontsize['2xs'], // 12
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
    },

    body: {
      bodyXL: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.medium, // inter-2
        lineheight: primitive.lineheight.xl,
        fontsize: primitive.fontsize.md, // 18
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      bodyL: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.regular, // inter-3
        lineheight: primitive.lineheight.lg,
        fontsize: primitive.fontsize.sm, // 16
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      bodyM: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.regular,
        lineheight: primitive.lineheight.lg,
        fontsize: primitive.fontsize.xs, // 14
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      bodys: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.regular,
        lineheight: primitive.lineheight.sm,
        fontsize: primitive.fontsize['2xs'], // 12
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      bodyXS: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.regular,
        lineheight: primitive.lineheight.xs,
        fontsize: primitive.fontsize['3xs'], // 10
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
    },

    action: {
      actionL: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.semibold,
        lineheight: primitive.lineheight.xs,
        fontsize: primitive.fontsize.xs, // 14
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
      actionM: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.semibold,
        lineheight: primitive.lineheight['2xs'],
        fontsize: primitive.fontsize['2xs'], // 12
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.uppercase,
        textdecoration: primitive.textdecoration.none,
      },
      actionS: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.semibold,
        lineheight: primitive.lineheight['3xs'],
        fontsize: primitive.fontsize['3xs'], // 10
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.uppercase,
        textdecoration: primitive.textdecoration.none,
      },
    },

    caption: {
      caption: {
        fontfamily: primitive.fontfamily.heading,
        fontweight: primitive.fontweight.semibold,
        lineheight: primitive.lineheight['3xs'],
        fontsize: primitive.fontsize['3xs'], // 10
        letterspacing: primitive.letterspacing.normal,
        paragraphspacing: primitive.paragraphspacing.null,
        paragraphindent: primitive.paragraphindent.null,
        textcase: primitive.textcase.null,
        textdecoration: primitive.textdecoration.none,
      },
    },
  },
} as const;

export type Semantic = typeof semantic;
