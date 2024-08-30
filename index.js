import { getTheme } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
export default (...args) => {
  const { light, dark } = getTheme(...args);
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root, { Declaration }) {
      root.prepend({ selector: ":root" });

      for (const colorName in light) {
        const colorDeclaration = new Declaration({
          prop: colorName,
          value: light[colorName],
        });
        root.first.append(colorDeclaration);
      }
    },
  };
};

export const postcss = true;
