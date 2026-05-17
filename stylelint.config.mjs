/** @type {import('stylelint').Config} */
const config = {
  extends: [
    "stylelint-config-standard",
    "@dreamsicle.io/stylelint-config-tailwindcss",
    "stylelint-config-recess-order",
  ],
  plugins: ["stylelint-order"],
  rules: {
    /* ─── Tailwind v4 compatibility ──────────────────────────────────────── */
    "no-descending-specificity": null,
    "at-rule-no-unknown": null,
    "property-no-unknown": null,
    "import-notation": null,

    /* ─── Error prevention ───────────────────────────────────────────────── */
    "declaration-block-no-duplicate-properties": [
      true,
      { ignore: ["consecutive-duplicates-with-different-values"] },
    ],
    "declaration-block-no-shorthand-property-overrides": true,
    "function-calc-no-unspaced-operator": true,
    "no-duplicate-selectors": true,
    "no-unknown-animations": true,
    "custom-property-no-missing-var-function": true,

    /* ─── Unit & value enforcement ───────────────────────────────────────── */
    "unit-allowed-list": ["%", "deg", "px", "rem", "ms", "fr"],
    "declaration-property-unit-allowed-list": { "/^border/": ["px"], "/^padding|^gap/": ["rem"] },
    "length-zero-no-unit": [true, { ignore: ["custom-properties"] }],
    "color-hex-length": "short",
    "color-function-notation": "modern",
    "alpha-value-notation": "percentage",
    "font-weight-notation": "named-where-possible",
    "shorthand-property-no-redundant-values": true,

    /* ─── Selector conventions ───────────────────────────────────────────── */
    "selector-pseudo-element-colon-notation": "double",
    "selector-not-notation": "complex",
    "selector-max-id": 0,
    "selector-max-compound-selectors": 4,
    "selector-no-vendor-prefix": true,

    /* ─── Code quality ───────────────────────────────────────────────────── */
    "declaration-no-important": [true, { severity: "warning" }],
    "media-feature-range-notation": "context",
    "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
  },
};

export default config;
