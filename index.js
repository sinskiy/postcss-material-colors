import { getTheme } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
const plugin = () => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root, { Declaration }) {
      let optsTouched = false;
      const atRuleOpts = {};

      root.walkAtRules("postcss-material-colors", (rule) => {
        optsTouched = true;

        const opts = rule.params.slice(1, -1).split(",");
        if (!opts.length) {
          throw new Error("You must provide at least primary color");
        }

        for (const opt of opts) {
          const [key, value] = opt.split(":").map((value) => value.trim());
          if (!key || !value) {
            throw new Error("You must provide key and value separated by :");
          }
          atRuleOpts[key] = value;
        }
      });

      if (!optsTouched) return;

      const { light, dark } = getTheme(atRuleOpts);

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
