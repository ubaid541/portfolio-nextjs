/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--page-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        mute: "var(--mute)",
        line: "var(--line)",
        field: "rgb(var(--field-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        disc: "rgb(var(--disc-rgb) / <alpha-value>)",
        sun: "rgb(var(--sun-rgb) / <alpha-value>)",
        /* Legacy fallback tokens for unused shadcn files */
        background: "rgb(var(--page-rgb) / <alpha-value>)",
        foreground: "rgb(var(--ink-rgb) / <alpha-value>)",
        border: "var(--line)",
        input: "var(--line)",
        card: {
          DEFAULT: "rgb(var(--surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--ink-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--page-rgb) / <alpha-value>)",
          foreground: "rgb(var(--ink-rgb) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--disc-rgb) / <alpha-value>)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "rgb(var(--surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--ink-rgb) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--surface-rgb) / <alpha-value>)",
          foreground: "var(--mute)",
        },
        accent: {
          DEFAULT: "rgb(var(--disc-rgb) / <alpha-value>)",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#e8412c",
          foreground: "#ffffff",
        },
        ring: "rgb(var(--disc-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        wide: ["var(--font-wide)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        lede: ["clamp(14px, 1.05vw, 16px)", { lineHeight: "1.55", letterSpacing: "-0.006em" }],
        ui: ["12px", { lineHeight: "1", letterSpacing: "0.06em" }],
        micro: ["11px", { lineHeight: "1.25", letterSpacing: "0.08em" }],
        wordmark: ["clamp(15px, 1.35vw, 20px)", { lineHeight: "1" }],
      },
      opacity: {
        88: "0.88",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
