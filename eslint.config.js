import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.ts",
    ],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // React rules
      "react/no-unescaped-entities": "off",
      "react/jsx-no-undef": "error",
      "react/react-in-jsx-scope": "off", // Not needed in Next.js with new JSX transform

      // React Hooks rules (relaxed for practical use)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript rules (balanced approach)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/triple-slash-reference": "warn",
      "@typescript-eslint/no-require-imports": "warn",

      // Next.js rules
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",

      // General rules
      "prefer-const": "error",

      // JSX Accessibility rules (balanced - warn instead of error for some)
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "warn", // Allow placeholder links
      "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/autocomplete-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/control-has-associated-label": "warn", // Allow aria-label as alternative
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/lang": "error",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-distracting-elements": "warn",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/prefer-tag-over-role": "warn", // Allow role when semantic tag not appropriate
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
