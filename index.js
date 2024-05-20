/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (/* opts = {} */) => {
  // Work with options here
  const theme = {
    "on-primary": "#FF0000",
  };
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

module.exports.postcss = true;
