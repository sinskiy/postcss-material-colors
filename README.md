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
    theme({ darkModeStragety: "class" /* "class" | "data" | "media" */ }),
    ...
  ],
...
```

3. in css (usually your root file):

```css
@postcss-material-colors (primary: "#ff0000", variant: "tonalSpot", contrast: 0.0);
```

[More about args](https://github.com/material-foundation/material-color-utilities/blob/main/dev_guide/creating_color_scheme.md)

## soon

- extra colors
- typescript
