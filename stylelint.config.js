/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss", // Must come after standard for Tailwind v4 support
  ],
  plugins: ["stylelint-order"],
  rules: {
    // === Tailwind v4 CSS-first configuration ===
    // stylelint-config-tailwindcss v1.0.0 handles most Tailwind directives
    // Add any additional at-rules or functions not covered
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          // Tailwind v4 directives
          "theme",
          "source",
          "plugin",
          "config",
          "variant",
          "utility",
          "custom-variant",
          // Legacy/common directives
          "tailwind",
          "apply",
          "layer",
          "reference",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "alpha"],
      },
    ],

    // === Project preferences ===
    "selector-class-pattern": null, // Allow utility-first classnames
    "no-descending-specificity": null, // Relaxed for utility CSS
    "import-notation": null, // Allow string notation for imports

    // === Modern CSS conventions ===
    "color-function-notation": "modern",
    "alpha-value-notation": "percentage",
    "hue-degree-notation": "angle",
    "length-zero-no-unit": true,
    "font-weight-notation": "numeric",
    "keyframe-selector-notation": "percentage",

    // === Vendor prefix detection ===
    "value-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "at-rule-no-vendor-prefix": true,

    // === Property ordering ===
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
