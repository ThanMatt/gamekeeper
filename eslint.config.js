import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import astro from "eslint-plugin-astro";

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
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        // Node.js globals (for build scripts)
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        // Astro globals
        Astro: "readonly",
        // DOM types for TypeScript
        HTMLElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLQuoteElement: "readonly",
        HTMLUListElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        // React types
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TypeScript specific
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General code quality
      "no-console": "warn", // Allow console but warn
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      // Override no-unused-vars for TypeScript files (let @typescript-eslint handle it)
      "no-unused-vars": "off",
      // Don't check for undefined globals in TypeScript files (TypeScript handles this)
      "no-undef": "off",

      // React specific (basic rules)
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },

  // Astro files
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        // Astro-specific globals
        Astro: "readonly",
        console: "readonly",
        fetch: "readonly",
      },
    },
    rules: {
      // Astro specific overrides
      "astro/no-set-html-directive": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "no-console": "warn", // Allow console in Astro files
    },
  },

  // JavaScript files
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },

  // Configuration files - more lenient
  {
    files: ["*.config.{js,mjs,ts}", "**/*.config.{js,mjs,ts}"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "no-console": "off", // Allow console in config files
      "@typescript-eslint/no-explicit-any": "off", // Allow any in config files
    },
  },

  // API and build files - allow console and fetch
  {
    files: ["src/api.ts", "src/api/**/*.ts", "scripts/**/*.ts"],
    rules: {
      "no-console": "off", // Allow console in API files for logging
      "@typescript-eslint/no-explicit-any": "warn", // Keep any warnings but don't error
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
];
