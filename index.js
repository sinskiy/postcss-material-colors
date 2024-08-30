import { getTheme } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
const plugin = (...args) => {
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

      root.append({ name: "media", params: "(prefers-color-scheme: dark)" });
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
export default plugin;

export const postcss = true;
