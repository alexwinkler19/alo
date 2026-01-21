// /packages/theme/src/typography.ts
import { semantic } from './semantic-tokens';
import type { TextStyle } from 'react-native';

type FontWeightString = TextStyle['fontWeight'];

function fontWeightToString(weight: number): FontWeightString {
  return String(weight) as FontWeightString;
}

function textCaseToTransform(textcase: string): TextStyle['textTransform'] {
  // Figma tokens encode "null" for none.
  if (textcase === 'uppercase') return 'uppercase';
  if (textcase === 'lowercase') return 'lowercase';
  if (textcase === 'capitalize') return 'capitalize';
  return undefined;
}

/**
 * Typography composite styles derived from semantic tokens.
 * These map directly to the design system's typography specifications.
 */
export const typography = {
  // Heading variants
  displayHeading: {
    fontFamily: semantic.typography.heading.display.fontfamily,
    fontSize: semantic.typography.heading.display.fontsize,
    fontWeight: fontWeightToString(semantic.typography.heading.display.fontweight),
    lineHeight: semantic.typography.heading.display.lineheight,
    letterSpacing: semantic.typography.heading.display.letterspacing,
  },

  screenTitle: {
    fontFamily: semantic.typography.heading.screentitle.fontfamily,
    fontSize: semantic.typography.heading.screentitle.fontsize,
    fontWeight: fontWeightToString(semantic.typography.heading.screentitle.fontweight),
    lineHeight: semantic.typography.heading.screentitle.lineheight,
    letterSpacing: semantic.typography.heading.screentitle.letterspacing,
  },

  sectionTitle: {
    fontFamily: semantic.typography.heading.sectiontitle.fontfamily,
    fontSize: semantic.typography.heading.sectiontitle.fontsize,
    fontWeight: fontWeightToString(semantic.typography.heading.sectiontitle.fontweight),
    lineHeight: semantic.typography.heading.sectiontitle.lineheight,
    letterSpacing: semantic.typography.heading.sectiontitle.letterspacing,
  },

  subsectionTitle: {
    fontFamily: semantic.typography.heading.subsectiontitle.fontfamily,
    fontSize: semantic.typography.heading.subsectiontitle.fontsize,
    fontWeight: fontWeightToString(semantic.typography.heading.subsectiontitle.fontweight),
    lineHeight: semantic.typography.heading.subsectiontitle.lineheight,
    letterSpacing: semantic.typography.heading.subsectiontitle.letterspacing,
  },

  // Body variants
  bodyXL: {
    fontFamily: semantic.typography.body.bodyXL.fontfamily,
    fontSize: semantic.typography.body.bodyXL.fontsize,
    fontWeight: fontWeightToString(semantic.typography.body.bodyXL.fontweight),
    lineHeight: semantic.typography.body.bodyXL.lineheight,
    letterSpacing: semantic.typography.body.bodyXL.letterspacing,
  },

  bodyL: {
    fontFamily: semantic.typography.body.bodyL.fontfamily,
    fontSize: semantic.typography.body.bodyL.fontsize,
    fontWeight: fontWeightToString(semantic.typography.body.bodyL.fontweight),
    lineHeight: semantic.typography.body.bodyL.lineheight,
    letterSpacing: semantic.typography.body.bodyL.letterspacing,
  },

  bodyM: {
    fontFamily: semantic.typography.body.bodyM.fontfamily,
    fontSize: semantic.typography.body.bodyM.fontsize,
    fontWeight: fontWeightToString(semantic.typography.body.bodyM.fontweight),
    lineHeight: semantic.typography.body.bodyM.lineheight,
    letterSpacing: semantic.typography.body.bodyM.letterspacing,
  },

  bodyS: {
    fontFamily: semantic.typography.body.bodys.fontfamily,
    fontSize: semantic.typography.body.bodys.fontsize,
    fontWeight: fontWeightToString(semantic.typography.body.bodys.fontweight),
    lineHeight: semantic.typography.body.bodys.lineheight,
    letterSpacing: semantic.typography.body.bodys.letterspacing,
  },

  bodyXS: {
    fontFamily: semantic.typography.body.bodyXS.fontfamily,
    fontSize: semantic.typography.body.bodyXS.fontsize,
    fontWeight: fontWeightToString(semantic.typography.body.bodyXS.fontweight),
    lineHeight: semantic.typography.body.bodyXS.lineheight,
    letterSpacing: semantic.typography.body.bodyXS.letterspacing,
  },

  // Action variants
  actionL: {
    fontFamily: semantic.typography.action.actionL.fontfamily,
    fontSize: semantic.typography.action.actionL.fontsize,
    fontWeight: fontWeightToString(semantic.typography.action.actionL.fontweight),
    lineHeight: semantic.typography.action.actionL.lineheight,
    letterSpacing: semantic.typography.action.actionL.letterspacing,
  },

  actionM: {
    fontFamily: semantic.typography.action.actionM.fontfamily,
    fontSize: semantic.typography.action.actionM.fontsize,
    fontWeight: fontWeightToString(semantic.typography.action.actionM.fontweight),
    lineHeight: semantic.typography.action.actionM.lineheight,
    letterSpacing: semantic.typography.action.actionM.letterspacing,
    textTransform: textCaseToTransform(semantic.typography.action.actionM.textcase),
  },

  actionS: {
    fontFamily: semantic.typography.action.actionS.fontfamily,
    fontSize: semantic.typography.action.actionS.fontsize,
    fontWeight: fontWeightToString(semantic.typography.action.actionS.fontweight),
    lineHeight: semantic.typography.action.actionS.lineheight,
    letterSpacing: semantic.typography.action.actionS.letterspacing,
    textTransform: textCaseToTransform(semantic.typography.action.actionS.textcase),
  },

  // Caption
  caption: {
    fontFamily: semantic.typography.caption.caption.fontfamily,
    fontSize: semantic.typography.caption.caption.fontsize,
    fontWeight: fontWeightToString(semantic.typography.caption.caption.fontweight),
    lineHeight: semantic.typography.caption.caption.lineheight,
    letterSpacing: semantic.typography.caption.caption.letterspacing,
  },
} as const;
