import {
  DynamicColor,
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

export const themeColors = Object.getOwnPropertyNames(MaterialDynamicColors)
  .filter((prop) => MaterialDynamicColors[prop] instanceof DynamicColor)
  .filter((prop) => !prop.includes("PaletteKeyColor"));

export const themeVariants = {
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
