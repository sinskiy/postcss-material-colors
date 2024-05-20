import tailwindThemeFromColor from "./lib/tailwindThemeFromColor.js";

/**
 * @type {import('postcss').PluginCreator}
 * @param {Object} opts
 * @param {Record<string, string>} opts.colorsMap
 * @param {"content" | "experssive" | "fidelity" | "monochrome" | "neutral" | "tonalSpot" | "vibrant"} [opts.scheme="content"]
 * @param {number} [opts.contrast=0]
 */
export default ({ colorsMap, scheme, contrast }) => {
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
