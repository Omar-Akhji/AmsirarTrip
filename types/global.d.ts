// Type declarations for importing CSS files in TypeScript
// This file allows side-effect imports such as `import "../globals.css"` to work
// without causing TypeScript errors.

declare module "*.css" {
  const content: Record<string, string> | string;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string> | string;
  export default content;
}

declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Image and media imports
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.avif" {
  const content: string;
  export default content;
}
