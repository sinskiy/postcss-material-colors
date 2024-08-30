# postcss-material-colors. Inspired by [tailwind-material-colors](https://github.com/JavierM42/tailwind-material-colors)

A PostCSS plugin to use the Material Design 3 Color System with PostCSS.

## usage

```bash
npm install --save-dev postcss-material-colors
```

in postcss config:

```js
import theme from "postcss-material-colors"

...
  plugins: [
    theme({
      "#ff0000", // primary color
      "tonalSpot", // variant, optional (default shown)
       0.0, // contrast, optional (default shown)
    }),
    ...
  ],
...
```

[More about args](https://github.com/material-foundation/material-color-utilities/blob/main/dev_guide/creating_color_scheme.md)

## soon

- custom colors
- dark mode support for .dark
