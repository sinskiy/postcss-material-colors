/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "postcss-material-colors",
    Root(root, postcss) {
      // Transform CSS AST here
      root.append(":root { --primary: rgb(255 0 255 / 1) }");
    },
  };
};

module.exports.postcss = true;
