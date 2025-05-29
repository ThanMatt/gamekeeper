import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // TypeScript specific
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // React specific
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Using TypeScript for prop validation
      "react/display-name": "off",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",

      // General code quality
      "no-console": "warn",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Astro files
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    rules: {
      // Astro specific overrides
      "astro/no-set-html-directive": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },

  // JavaScript files
  {
    files: ["**/*.{js,mjs}"],
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  // Configuration files
  {
    files: ["*.config.{js,mjs,ts}", "**/*.config.{js,mjs,ts}"],
    rules: {
      "no-console": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "public/**",
      "*.min.js",
      "coverage/**",
    ],
  },

  // Prettier integration (must be last)
  prettier,
];
