import tailwindThemeFromColor from "./lib/tailwindThemeFromColor.js";

/**
 * @type {import('postcss').PluginCreator}
 */
export default (/* opts = {} */) => {
  // Work with options here
  const theme = tailwindThemeFromColor({ primary: "#FF0000" }, "tonalSpot");
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
