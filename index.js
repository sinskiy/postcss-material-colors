import tailwindThemeFromColor from "./lib/tailwindThemeFromColor.js";

/**
 * @type {import('postcss').PluginCreator}
 * @param {Record<string, string>} colorsMap
 * @param {"content" | "experssive" | "fidelity" | "monochrome" | "neutral" | "tonalSpot" | "vibrant"} [scheme="content"]
 * @param {number} [contrast=0]
 */
export default (colorsMap, scheme = "content", contrast = 0) => {
  const theme = tailwindThemeFromColor(colorsMap, scheme, contrast);
  const themeAsVariables = Object.entries(theme).map(
    ([name, DynamicColor]) => `--${name}: ${DynamicColor}`,
  );
  const themeAsCSS = themeAsVariables.join(";");
  const themeAtCSSRoot = `:root { ${themeAsCSS} }`;

  return {
    postcssPlugin: "postcss-material-colors",
    Root(root) {
      root.append(themeAtCSSRoot);
    },
  };
};

export const postcss = true;
