import { AtRule, Declaration, PluginCreator, Root, Rule } from "postcss";
import {
  Colors,
  getTheme,
  themeOptions,
  ThemeOptions,
  ValueOf,
} from "./theme.js";

export interface PluginOptions {
  darkModeStrategy: "class" | "data" | "media";
}

const creator: PluginCreator<PluginOptions> = (
  opts = { darkModeStrategy: "class" }
) => {
  return {
    postcssPlugin: "postcss-material-colors",
    Once(root): void {
      const atRuleOpts = getOpts(root);
      if (!isThemeOptions(atRuleOpts)) return;

      const { light, dark } = getTheme(atRuleOpts);

      const darkDeclarations = themeToVariableDeclarations(dark);
      switch (opts.darkModeStrategy) {
        case "class": {
          root.prepend({ selector: ".dark" });
          (root.first as Rule).append(...darkDeclarations);
          break;
        }
        case "data": {
          root.prepend({ selector: '[data-mode="dark"]' });
          (root.first as Rule).append(...darkDeclarations);
          break;
        }
        case "media": {
          root.append({
            name: "media",
            params: "(prefers-color-scheme: dark)",
          });
          const mediaRule = root.last as AtRule;
          mediaRule.append({ selector: ":root" });
          (mediaRule.first as Rule).append(...darkDeclarations);
          break;
        }
      }

      root.prepend({ selector: ":root" });
      const lightDeclarations = themeToVariableDeclarations(light);
      (root.first as Rule).append(...lightDeclarations);
    },
  };
};

creator.postcss = true;

export default creator;

function getOpts(root: Root) {
  const atRuleOpts: Partial<ThemeOptions> = {};

  root.walkAtRules("postcss-material-colors", (rule) => {
    const opts: Record<string, string> = JSON.parse(rule.params.slice(1, -1));
    if (isEmpty(opts)) {
      throw new Error("You must provide at least primary color");
    }

    for (const opt in opts) {
      if (!isInThemeOptions(opt)) {
        throw new Error(
          "Key is not found in theme options: " +
            Object.keys(themeOptions).join(", ")
        );
      }

      const value = opts[opt];

      // I have no idea why this doesn't work without any
      atRuleOpts[opt] = value as any;
    }

    rule.remove();
  });
  return atRuleOpts;
}

function themeToVariableDeclarations(theme: ValueOf<Colors>) {
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

function isThemeOptions(obj: Record<string, any>): obj is ThemeOptions {
  return !isEmpty(obj) && typeof obj.primary === "string";
}

function isInThemeOptions(key: string): key is keyof ThemeOptions {
  return key in themeOptions;
}

function isEmpty(obj: Record<string, any>) {
  return !Object.keys(obj).length;
}
