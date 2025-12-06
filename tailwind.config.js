/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1090px",
      },
      fontFamily: {
        fancy: "var(--font-family-fancy)",
      },
      colors: {
        white: "#fff",
        black: "#000",
        brand: "#e54a1f",
        "brand-dark": "#d35400",
        "light-grey": "#f7f7f7",
        dark: "#0e1010",
        grey: "#787878",
        "light-grey-alt": "#f5f5f5",
        "lighter-grey": "#f3f3f3",
        "dark-grey": "#111",
        "grey-alt": "#6b7280",
        "light-grey-alt2": "#e2e8f0",
        "dark-grey-alt": "#1a202c",
        "very-light-grey": "#f8fafc",
        "grey-close": "#777",
        // shadcn colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [],
};
