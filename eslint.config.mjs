/**
 * Configuración mejorada de ESLint para CommunityOS
 * Incluye reglas estrictas, mejores prácticas y configuración de seguridad
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ============================================================================
// CONFIGURACIÓN PRINCIPAL
// ============================================================================

const eslintConfig = [
  // Configuraciones base
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ),

  // ============================================================================
  // CONFIGURACIÓN GLOBAL
  // ============================================================================
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
    globals: {
      React: "readonly",
      JSX: "readonly",
    },
  },

  // ============================================================================
  // REGLAS DE TYPESCRIPT
  // ============================================================================
  {
    rules: {
      // Reglas estrictas de TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unbound-method": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-enum-comparison": "error",
      "@typescript-eslint/no-unsafe-unary-negation": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "error",
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-string-expressions": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/type-annotation-spacing": "error",
      "@typescript-eslint/unified-signatures": "error",
    },
  },

  // ============================================================================
  // REGLAS DE SEGURIDAD
  // ============================================================================
  {
    rules: {
      // Prevenir inyección de código
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      
      // Prevenir acceso a propiedades peligrosas
      "no-proto": "error",
      "no-iterator": "error",
      "no-extend-native": "error",
      
      // Prevenir código confuso
      "no-sequences": "error",
      "no-unused-expressions": "error",
      "no-void": "error",
      
      // Prevenir variables globales
      "no-undef": "error",
      "no-global-assign": "error",
      
      // Prevenir redeclaraciones
      "no-redeclare": "error",
      "no-shadow": "error",
      "no-shadow-restricted-names": "error",
      
      // Prevenir código innecesario
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-useless-constructor": "error",
      
      // Prevenir código problemático
      "no-constant-condition": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-new-symbol": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-setter-return": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-undef": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-useless-backreference": "error",
      "no-valid-jsdoc": "error",
      "no-valid-typeof": "error",
    },
  },

  // ============================================================================
  // REGLAS DE REACT
  // ============================================================================
  {
    rules: {
      // Reglas específicas de React
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-array-index-key": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/no-unsafe": "error",
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",
      "react/sort-comp": "error",
      "react/sort-prop-types": "error",
      "react/void-dom-elements-no-children": "error",
    },
  },

  // ============================================================================
  // REGLAS DE NEXT.JS
  // ============================================================================
  {
    rules: {
      // Reglas específicas de Next.js
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/no-css-tags": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-typos": "error",
      "@next/next/no-duplicate-head": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-head-import-in-page": "error",
      "@next/next/no-script-component-in-head": "error",
      "@next/next/no-styled-jsx-in-document": "error",
      "@next/next/no-unwanted-polyfillio": "error",
    },
  },

  // ============================================================================
  // REGLAS DE IMPORTACIÓN
  // ============================================================================
  {
    rules: {
      // Reglas de importación
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // ============================================================================
  // CONFIGURACIÓN POR ARCHIVO
  // ============================================================================
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      // Reglas específicas para tests
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  {
    files: ["**/*.config.js", "**/*.config.mjs", "**/*.config.ts"],
    rules: {
      // Reglas específicas para archivos de configuración
      "@typescript-eslint/no-var-requires": "off",
      "import/no-commonjs": "off",
    },
  },

  {
    files: ["**/middleware.ts"],
    rules: {
      // Reglas específicas para middleware
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },

  // ============================================================================
  // CONFIGURACIÓN DE IGNORAR
  // ============================================================================
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "public/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
