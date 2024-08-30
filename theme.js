import {
  DynamicColor,
  MaterialDynamicColors,
} from "@material/material-color-utilities";

const themeColors = Object.getOwnPropertyNames(MaterialDynamicColors)
  .filter((prop) => MaterialDynamicColors[prop] instanceof DynamicColor)
  .filter((prop) => !prop.includes("PaletteKeyColor"));

export default themeColors;
