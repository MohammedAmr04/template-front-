import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 1 }],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      eqeqeq: ["error", "always"],
      "no-unused-vars": "off",
      "no-console": "warn",
      "import/order": [
        "error",
        { groups: ["builtin", "external", "internal"] },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      // "@typescript-eslint/no-unused-vars": "warn"
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Test on vercel ignore all
      /* "no-multiple-empty-lines": ["off", { max: 1, maxEOF: 1 }],
      semi: ["off", "always"],
      quotes: ["off", "double"],
      eqeqeq: ["off", "always"],

      "no-unused-vars": "off",
      "no-console": "off",
      "import/order": ["off", { groups: ["builtin", "external", "internal"] }],
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "warn"
      "@typescript-eslint/no-unused-vars": [
        "off", // or "error"
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ], */
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
