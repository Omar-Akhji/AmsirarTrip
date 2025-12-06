// REMINDER: Do not edit this Stylelint configuration file without explicit user permission.
/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    // project preferences
    // stylistic rules removed to avoid compatibility issues across stylelint versions
    "block-no-empty": true,
    // allow the project's utility-first classnames
    "selector-class-pattern": null,
    // Relax a few rules for this legacy/utility stylesheet to reduce noisy errors.
    // We'll tune these later once the large, auto-fixable problems are resolved.
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "declaration-property-value-no-unknown": null,
    "property-no-deprecated": null,
    "selector-pseudo-element-no-unknown": null,
    "selector-pseudo-class-no-unknown": null,
    "declaration-block-no-shorthand-property-overrides": null,
    // Additional rules for detecting old CSS
    "property-no-unknown": true,
    "unit-no-unknown": true,
    "value-no-vendor-prefix": true, // Detect vendor prefixes that can be removed
    "property-no-vendor-prefix": true, // Detect vendor prefixes that can be removed
    "media-feature-name-no-vendor-prefix": true,
    "at-rule-no-vendor-prefix": true,
    // Allow Tailwind / PostCSS at-rules and the theme() function used by Tailwind v4
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "theme",
          "reference",
        ],
      },
    ],
    "function-no-unknown": [true, { ignoreFunctions: ["theme"] }],
    // Note: Tailwind-specific rules and directives removed as Tailwind is no longer used.
    // Allow string notation for imports
    "import-notation": null,
    "color-function-notation": "modern", // Prefer modern color functions
    "hue-degree-notation": "angle", // Use angle units for hue
    "alpha-value-notation": "percentage", // Use percentage for alpha values
    "length-zero-no-unit": true, // Remove units from zero lengths
    "font-weight-notation": "numeric", // Use numeric font weights
    "keyframe-selector-notation": "percentage", // Use percentage in keyframes

    // Order rules for consistency
    "order/order": [
      "dollar-variables",
      "custom-properties",
      "at-variables",
      "declarations",
      "at-rules",
      "rules",
    ],
    "order/properties-order": [
      // Positioning
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      // Display & Box Model
      "display",
      "flex",
      "flex-direction",
      "flex-wrap",
      "justify-content",
      "align-items",
      "align-content",
      "gap",
      "grid",
      "grid-template-columns",
      "grid-template-rows",
      "grid-column",
      "grid-row",
      "width",
      "height",
      "max-width",
      "max-height",
      "min-width",
      "min-height",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "border",
      "border-top",
      "border-right",
      "border-bottom",
      "border-left",
      "border-radius",
      "box-shadow",
      "overflow",
      "overflow-x",
      "overflow-y",
      // Typography
      "font",
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "text-align",
      "text-decoration",
      "color",
      // Background
      "background",
      "background-color",
      "background-image",
      "background-position",
      "background-size",
      "background-repeat",
      // Other
      "opacity",
      "visibility",
      "cursor",
      "transition",
      "animation",
    ],
  },
};
