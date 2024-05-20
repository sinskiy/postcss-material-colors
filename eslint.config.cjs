const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: "commonjs",
      globals: {
        node: true,
        es6: true,
      },
    },
  },
];
