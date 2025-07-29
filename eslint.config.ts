import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ...js.configs.recommended,
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,

      // '@typescript-eslint/no-unused-vars': 'warn',
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      // '@typescript-eslint/consistent-type-imports': 'error'
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "**/*.js",
      "eslint.config.ts",
      "vite.config.ts",
      "server.cjs",
    ],
  },
];
