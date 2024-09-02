import {
  argbFromHex,
  ColorGroup,
  customColor,
  DynamicColor,
  DynamicScheme,
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
  Theme,
} from "@material/material-color-utilities";

export type ValueOf<T> = T[keyof T];

export interface Colors {
  light: {
    [key: string]: string;
  };
  dark: {
    [key: string]: string;
  };
}

export interface ThemeOptions {
  primary: string;
  variant?: keyof typeof themeVariants;
  contrast?: number;
  extraColors: Record<string, string>;
}

// adds ability to check if a key is in themeOptions
export const themeOptions = {
  primary: "",
  variant: "",
  contrast: 0,
  extraColors: {},
} as const;

const themeColorNames = Object.getOwnPropertyNames(MaterialDynamicColors)
  // @ts-ignore I don't know how to fix this
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
} as const;

const colors: Colors = {
  light: {},
  dark: {},
};

export function getTheme({
  primary,
  variant = "tonalSpot",
  contrast = 0.0,
  extraColors,
}: ThemeOptions) {
  const source = hctFromHex(primary);
  const Scheme = themeVariants[variant];

  const [lightScheme, darkScheme] = getSchemes(source, Scheme, contrast);

  populateColorsByPrimary(lightScheme, darkScheme);
  if (extraColors) {
    populateExtraColors(argbFromHex(primary), extraColors);
  }

  return colors;
}

function getSchemes(
  source: Hct,
  Scheme: ValueOf<typeof themeVariants>,
  contrast: ThemeOptions["contrast"]
) {
  const lightScheme = new Scheme(source, false, contrast ?? 0.0);
  const darkScheme = new Scheme(source, true, contrast ?? 0.0);
  return [lightScheme, darkScheme];
}

function populateColorsByPrimary(
  lightScheme: DynamicScheme,
  darkScheme: DynamicScheme
) {
  for (const color of themeColorNames) {
    // @ts-ignore I don't know how to fix this
    const Color = MaterialDynamicColors[color];

    const light = getHex(lightScheme, Color);
    const dark = getHex(darkScheme, Color);

    const colorName = kebabize(color);
    colors.light[colorName] = light;
    colors.dark[colorName] = dark;
  }
}

function populateExtraColors(
  primaryArgb: number,
  extraColors: Record<string, string>
) {
  for (const colorName in extraColors) {
    const color = extraColors[colorName];
    const { light, dark } = customColor(primaryArgb, {
      name: colorName,
      value: argbFromHex(color),
      blend: true,
    });
    const schemeName = kebabize(colorName);
    populateExtraColorTheme("light", light, schemeName);
    populateExtraColorTheme("dark", dark, schemeName);
  }
}

function populateExtraColorTheme(
  theme: "light" | "dark",
  scheme: ColorGroup,
  schemeName: string
) {
  colors[theme][schemeName] = hexFromArgb(scheme.color);
  colors[theme][`on-${schemeName}`] = hexFromArgb(scheme.onColor);
  colors[theme][`${schemeName}-container`] = hexFromArgb(scheme.colorContainer);
  colors[theme][`on-${schemeName}-container`] = hexFromArgb(
    scheme.onColorContainer
  );
}

function getHex(scheme: DynamicScheme, Color: DynamicColor) {
  const argb = Color.getArgb(scheme);
  const hex = hexFromArgb(argb);
  return hex;
}

function hctFromHex(hex: string): Hct {
  const argb = argbFromHex(hex);
  const hct = Hct.fromInt(argb);
  return hct;
}

function kebabize(string: string): string {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
