import {
  argbFromHex,
  DynamicColor,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from "@material/material-color-utilities";

const themeColors = Object.getOwnPropertyNames(MaterialDynamicColors)
  .filter((prop) => MaterialDynamicColors[prop] instanceof DynamicColor)
  .filter((prop) => !prop.includes("PaletteKeyColor"));

const themeVariants = {
  content: SchemeContent,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  fruitSalad: SchemeFruitSalad,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  rainbow: SchemeRainbow,
  tonalSpot: SchemeTonalSpot,
  vibrant: SchemeVibrant,
};

export function getTheme(primary, variant = "tonalSpot", contrast = 0.0) {
  const source = hctFromHex(primary);
  const Scheme = themeVariants[variant];
  const [lightScheme, darkScheme] = getSchemes(source, Scheme, contrast);
}

function getSchemes(source, Scheme, contrast) {
  const lightScheme = new Scheme(source, false, contrast);
  const darkScheme = new Scheme(source, true, contrast);
  return [lightScheme, darkScheme];
}

function hctFromHex(hex) {
  const argb = argbFromHex(hex);
  const hct = Hct.fromInt(argb);
  return hct;
}
