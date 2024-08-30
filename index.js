import { themeColors, themeVariants } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
export default (opts = {}) => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root) {
      console.log(themeColors, themeVariants);
    },
  };
};

export const postcss = true;
