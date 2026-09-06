import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  // 1. Next.js & TypeScript Base Rules
  ...nextVitals,
  ...nextTs,

  // 2. Unicorn Recommended Configuration
  eslintPluginUnicorn.configs["flat/recommended"],

  // 3. React Compiler Rule Settings
  {
    plugins: { "react-compiler": reactCompiler },
    rules: { "react-compiler/react-compiler": "error" },
  },

  // 4. Framework Settings & Core Overrides
  {
    languageOptions: { ecmaVersion: 2026, sourceType: "module" },
    settings: { react: { version: "19.2.6" } },
    rules: {
      // General React Overrides
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",

      // Customized eslint-plugin-unicorn Rules
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/consistent-function-scoping": "warn",

      "unicorn/filename-case": [
        "error",
        {
          cases: { camelCase: true, pascalCase: true, kebabCase: true },
          ignore: [
            String.raw`^\[.+\]\.tsx$`, // Matches Next.js [locale].tsx or [id].tsx
            String.raw`^\[.+\]\.ts$`, // Matches Next.js API [id].ts
          ],
        },
      ],
    },
  },

  // 5. Prettier Formatting Integration (MUST BE LAST to override stylistic conflicts)
  eslintPluginPrettierRecommended,

  // 6. Global Ignored Directories
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
