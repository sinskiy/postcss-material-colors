import { Declaration } from "postcss";
import { getTheme } from "./theme.js";

/**
 * @type {import('postcss').PluginCreator}
 */
const plugin = (opts = { darkModeStrategy: "data" }) => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root) {
      const atRuleOpts = getOpts(root);
      if (isEmpty(atRuleOpts)) return;

      const { light, dark } = getTheme(atRuleOpts);

      const darkDeclarations = themeToVariableDeclarations(dark);
      console.log(opts.darkModeStrategy);
      switch (opts.darkModeStrategy) {
        case "class": {
          root.prepend({ selector: ".dark" });
          root.first.append(...darkDeclarations);
          break;
        }
        case "data": {
          root.prepend({ selector: '[data-mode="dark"]' });
          root.first.append(...darkDeclarations);
          break;
        }
        case "media": {
          root.append({
            name: "media",
            params: "(prefers-color-scheme: dark)",
          });
          root.last.append({ selector: ":root" });
          root.last.first.append(...darkDeclarations);
          break;
        }
      }

      root.prepend({ selector: ":root" });
      const lightDeclarations = themeToVariableDeclarations(light);
      root.first.append(...lightDeclarations);
    },
  };
};
export default plugin;

export const postcss = true;

function getOpts(root) {
  const atRuleOpts = {};

  root.walkAtRules("postcss-material-colors", (rule) => {
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

  return atRuleOpts;
}

function themeToVariableDeclarations(theme) {
  const declarations = [];
  for (const colorName in theme) {
    const colorDeclaration = new Declaration({
      prop: "--" + colorName,
      value: theme[colorName],
    });
    declarations.push(colorDeclaration);
  }
  return declarations;
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}
