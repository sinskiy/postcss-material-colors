/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "postcss-material-colors",
    Declaration(decl, postcss) {
      // The faster way to find Declaration node
      decl.value = "red";
    },
  };
};

module.exports.postcss = true;
