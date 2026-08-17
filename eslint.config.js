// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
  // matches all files ending with .js

  // matches all files ending with .js except those in __tests
  {
    files: ["**/*.js"],
    ignores: ["__tests/**"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
]);
