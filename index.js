import tailwindThemeFromColor from "./lib/tailwindThemeFromColor.js";

/**
 * @type {import('postcss').PluginCreator}
 * @param {Record<string, string>} colorsMap primary is required; secondary, tertiary and other named colors are optional
 * @param {"content" | "experssive" | "fidelity" | "monochrome" | "neutral" | "tonalSpot" | "vibrant"} [scheme="content"] methods of creating a color pallete
 * @param {number} [contrast=0]
 */
export default (colorsMap, scheme = "content", contrast = 0) => {
  const theme = tailwindThemeFromColor(colorsMap, scheme, contrast);

  const themeAsVariables = themeObjectAsVariables(theme);
  const themeAsCSS = themeObjectToCSS(themeAsVariables);
  const themeAtCSSRoot = themeCSSAtRoot(themeAsCSS);

  const lightThemeAsCSS = colorSchemeToCSS(theme, "light");
  const defaultColorScheme = themeCSSAtRoot(lightThemeAsCSS);

  const darkThemeAsCSS = colorSchemeToCSS(theme, "dark");
  const darkColorScheme = themeCSSAtRoot(darkThemeAsCSS);
  const prefersDark = `@media (prefers-color-scheme: dark) { ${darkColorScheme} }`;

  return {
    postcssPlugin: "postcss-material-colors",
    Root(root) {
      root.append(`${themeAtCSSRoot}${defaultColorScheme}${prefersDark}`);
    },
  };
};
export const postcss = true;

function themeObjectAsVariables(theme) {
  return Object.entries(theme).map(
    ([name, DynamicColor]) => `--${name}: ${DynamicColor}`,
  );
}

function colorSchemeToCSS(themeObject, colorScheme) {
  const themeWithNeededColorSchemeOnly = Object.entries(themeObject).filter(
    ([name]) => name.includes(`-${colorScheme}`),
  );
  const themeWithoutColorSchemeSpecified = themeWithNeededColorSchemeOnly.map(
    ([name, DynamicColor]) =>
      `--${name.replace(`-${colorScheme}`, "")}: ${DynamicColor}`,
  );
  return themeObjectToCSS(themeWithoutColorSchemeSpecified);
}

function themeObjectToCSS(theme) {
  return theme.join(";");
}

function themeCSSAtRoot(theme) {
  return `:root { ${theme} }`;
}
