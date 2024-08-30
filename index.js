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
          prop: "--" + colorName,
          value: light[colorName],
        });
        root.first.append(colorDeclaration);
      }

      root.append({ name: "media", params: "(color-scheme: dark)" });
      root.last.append({ selector: ":root" });
      for (const colorName in dark) {
        const colorDeclaration = new Declaration({
          prop: "--" + colorName,
          value: dark[colorName],
        });
        root.last.first.append(colorDeclaration);
      }
    },
  };
};

export const postcss = true;
