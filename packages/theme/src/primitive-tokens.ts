// primitive-tokens.ts
// Auto-generated from Figma / Token Studio primitives
// Do not use directly in components – use semantic tokens instead.

// /packages/theme/src/primitives.ts

export const primitive = {
  color: {
    white: '#ffffff',
    black: '#000000',

    functional: {
      success: {
        '100': '#f7fcf5',
        '200': '#e5f5e0',
        '300': '#c7e9c0',
        '400': '#a1d99b',
        '500': '#74c476',
        '600': '#41ab5d',
        '700': '#238b45',
        '800': '#006d2c',
        '900': '#00441b',
      },
      warning: {
        '100': '#fff0e6',
        '200': '#ffe4cc',
        '300': '#ffd1b3',
        '400': '#ffc599',
        '500': '#ffbc80',
        '600': '#ffb066',
        '700': '#ff9c4d',
        '800': '#ff9230',
        '900': '#ff8200',
      },
      error: {
        '100': '#ffe3e3',
        '200': '#ffd4d8',
        '300': '#fdc1c7',
        '400': '#ff95a0',
        '500': '#ff6161',
        '600': '#ff4242',
        '700': '#ff3232',
        '800': '#ff1d1d',
        '900': '#e50c1e',
      },
    },

    brand: {
      primary: {
        '100': '#f7ebef',
        '200': '#f7e6ec',
        '300': '#efcdd9',
        '400': '#e7b4c6',
        '500': '#e09cb4',
        '600': '#d883a1',
        '700': '#d06a8e',
        '800': '#c8517b',
        '900': '#c13969',
      },
      accent: {
        '100': '#fff5e6',
        '200': '#ffedd2',
        '300': '#ffe4be',
        '400': '#ffdcaa',
        '500': '#ffd496',
        '600': '#ffcc83',
        '700': '#ffc46f',
        '800': '#ffbb5b',
        '900': '#ffb347',
      },
      // if you later add brand.neutral etc, it plugs in here
    },

    neutral: {
      grey: {
        '100': '#fafafa',
        '200': '#f5f5f5',
        '300': '#eeeeee',
        '400': '#e0e0e0',
        '500': '#bdbdbd',
        '600': '#9e9e9e',
        '700': '#646464',
        '800': '#4a4a4a',
        '900': '#2c2c2c',
      },
    },

    utility: {
      blue: {
        '100': '#eaf2ff',
        '200': '#bee3f8',
        '300': '#90cdf4',
        '400': '#63b3ed',
        '500': '#4299e1',
        '600': '#3182ce',
        '700': '#2b6cb0',
        '800': '#2c5282',
        '900': '#2a4365',
      },
    },
  },

  fontfamily: {
    heading: 'Inter',
    body: 'Inter',
    action: 'Inter',
    caption: 'Inter',
  },

  textdecoration: {
    none: 'none',
    underline: 'underline',
    lineThrough: 'line-through',
  },

  textcase: {
    null: 'null',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  },

  fontweight: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineheight: {
    '4xs': 8,
    '3xs': 10,
    '2xs': 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  fontsize: {
    '4xs': 8,
    '3xs': 10,
    '2xs': 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  borderradius: {
    '2xs': 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    pill: 999,
    straight: 0,
  },

  borderwidth: {
    none: 0,
    subtle: 0.5,
    regular: 1,
    increased: 1.5,
    prominent: 2,
    thick: 3,
  },

  spacing: {
    null: 0,
    '3xs': 2,
    '2xs': 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  letterspacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },

  paragraphspacing: {
    null: 0,
  },

  paragraphindent: {
    null: 0,
  },

  zindex: {
    '0': 0,
    '1': 10,
    '2': 50,
    '3': 100,
    '4': 1000,
    '5': 9999,
  },
} as const;

export type Primitive = typeof primitive;
