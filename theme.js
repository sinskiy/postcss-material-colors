import {
  argbFromHex,
  DynamicColor,
  Hct,
  hexFromArgb,
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

const themeColorNames = Object.getOwnPropertyNames(MaterialDynamicColors)
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

  const colors = {};
  for (const color of themeColorNames) {
    const Color = MaterialDynamicColors[color];

    const light = getHex(lightScheme, Color);
    const dark = getHex(darkScheme, Color);

    const colorName = kebabize(color);
    colors[`${colorName}-light`] = light;
    colors[`${colorName}-dark`] = dark;
  }

  return colors;
}

function getSchemes(source, Scheme, contrast) {
  const lightScheme = new Scheme(source, false, contrast);
  const darkScheme = new Scheme(source, true, contrast);
  return [lightScheme, darkScheme];
}

function getHex(scheme, Color) {
  const argb = Color.getArgb(scheme);
  const hex = hexFromArgb(argb);
  return hex;
}

function hctFromHex(hex) {
  const argb = argbFromHex(hex);
  const hct = Hct.fromInt(argb);
  return hct;
}

function kebabize(string) {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
