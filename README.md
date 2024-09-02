# postcss-material-colors. Inspired by [tailwind-material-colors](https://github.com/JavierM42/tailwind-material-colors)

A PostCSS plugin to use the Material Design 3 Color System with PostCSS.

## usage

1.

```bash
npm install --save-dev postcss-material-colors
```

2. in postcss config:

```js
import theme from "postcss-material-colors"

...
  plugins: [
    theme({ darkModeStragety: "class" /* "class" (default) | "data" | "media" */ }),
    ...
  ],
...
```

3. in css (usually your root file):

```css
/* defaults for variant and contrast are shown */
@postcss-material-colors (primary: #ff0000, variant: tonalSpot, contrast: 0.0, green: #00ff00); /* add any extra colors you want */
```

<details>
<summary>types for args</summary>

```ts
export interface ThemeOptions {
  primary: string; // hex
  variant?:
    | "content"
    | "expressive"
    | "fidelity"
    | "fruitSalad"
    | "monochrome"
    | "neutral"
    | "ranbow"
    | "tonalSpot"
    | "vibrant";
  contrast?: number; // between -1.0 and 1.0
  [key: string]: string; // hex (extra colors)
}
```

</details>

> [!WARNING]
> actual types look different

[More about args](https://github.com/material-foundation/material-color-utilities/blob/main/dev_guide/creating_color_scheme.md)
