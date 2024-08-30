import materialColors from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
export default (opts = {}) => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root) {
      console.log(materialColors);
    },
  };
};

export const postcss = true;
