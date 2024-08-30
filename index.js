import { getTheme } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
export default (opts = {}) => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root) {
      console.log(getTheme("#ff0000"));
    },
  };
};

export const postcss = true;
