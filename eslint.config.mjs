import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "camelcase": ["error", { "properties": "always", "ignoreDestructuring": false, "ignoreImports": false, "ignoreGlobals": false }],
      "new-cap": ["error", { "newIsCap": true, "capIsNew": false }],
      "no-var": "error"
    }
  }
];