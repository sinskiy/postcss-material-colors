/**
 * @type {import('postcss').PluginCreator}
 */
export default (opts = {}) => {
  return {
    postcssPlugin: "postcss-material-colors",
  };
};

export const postcss = true;
