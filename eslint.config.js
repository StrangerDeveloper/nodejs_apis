const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      //indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
     // quotes: ["error", "double"],
      //semi: ["error", "always"],
    },
  }
];
