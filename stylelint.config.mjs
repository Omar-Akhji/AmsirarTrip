/** @type {import("stylelint").Config} */
const stylelintConfig = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss", // Must come after standard for Tailwind v4 support
  ],
  plugins: ["stylelint-order"],
  rules: {
    // === Tailwind v4 CSS-first configuration ===
    // Tailwind v4 uses @theme, @source, @plugin, @variant, @utility, @custom-variant
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
          "reference",
          // Legacy/common directives (still supported in v4)
          "tailwind",
          "apply",
          "layer",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: [
          "theme", // Tailwind theme() function
          "alpha", // Color alpha function
          "color-mix", // Modern CSS color mixing
        ],
      },
    ],

    // === Project preferences ===
    "selector-class-pattern": null, // Allow utility-first classnames (e.g., text-xl, bg-orange-500)
    "no-descending-specificity": null, // Relaxed for utility CSS
    "import-notation": null, // Allow string notation for @import

    // === Modern CSS conventions (Stylelint 17) ===
    "color-function-notation": "modern", // rgb() instead of rgba()
    "alpha-value-notation": "percentage", // 50% instead of 0.5
    "hue-degree-notation": "angle", // 180deg instead of 180
    "length-zero-no-unit": true, // 0 instead of 0px
    "font-weight-notation": "numeric", // 400 instead of normal
    "keyframe-selector-notation": "percentage", // 100% instead of to

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

export default stylelintConfig;
