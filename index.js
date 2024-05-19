/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "postcss-material-colors",
    Root(root, postcss) {
      // Transform CSS AST here
      console.log(root);
    },
  };
};

module.exports.postcss = true;
