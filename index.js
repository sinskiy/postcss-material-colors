import tailwindThemeFromColor from "./lib/tailwindThemeFromColor.js";

/**
 * @type {import('postcss').PluginCreator}
 * @param {Object} opts
 * @param {Record<string, string>} opts.colorsMap
 * @param {"content" | "experssive" | "fidelity" | "monochrome" | "neutral" | "tonalSpot" | "vibrant"} opts.scheme
 * @param {number} opts.contrast
 */
export default (opts = {}) => {
  // Work with options here
  const theme = tailwindThemeFromColor(opts);
  const themeAsVariables = Object.entries(theme).map(
    ([name, DynamicColor]) => `--${name}: ${DynamicColor}`,
  );
  const themeAsCSS = themeAsVariables.join(";");
  const themeAtCSSRoot = `:root { ${themeAsCSS} }`;

  return {
    postcssPlugin: "postcss-material-colors",
    Root(root) {
      // Transform CSS AST here
      root.append(themeAtCSSRoot);
    },
  };
};

export const postcss = true;
