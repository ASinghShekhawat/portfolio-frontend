/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    layers: ["base", "components", "utilities"],
  },
  theme: {
    extend: {
      screens: {
        desktop: "1130px",
      },

      fontFamily: {
        display: ['"Space Grotesk"', '"Raleway"', "system-ui", "sans-serif"],
        sans: ['"Raleway"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },

      colors: {
        "primary-color": "#0DFC4B",
        "light-green": "rgba(142, 255, 139, 0.5)",
        "dark-green": "#8EFF8B",
        "light-gray": "#AEAEAE",

        // All theme-aware via CSS custom properties. Use space-separated
        // rgb() so Tailwind's <alpha-value> sugar still works.
        ink: {
          950: "rgb(var(--c-ink-950) / <alpha-value>)",
          900: "rgb(var(--c-ink-900) / <alpha-value>)",
          800: "rgb(var(--c-ink-800) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
          600: "rgb(var(--c-ink-600) / <alpha-value>)",
          500: "rgb(var(--c-ink-500) / <alpha-value>)",
          400: "rgb(var(--c-ink-400) / <alpha-value>)",
        },
        fog: {
          50: "rgb(var(--c-fog-50) / <alpha-value>)",
          100: "rgb(var(--c-fog-100) / <alpha-value>)",
          200: "rgb(var(--c-fog-200) / <alpha-value>)",
          300: "rgb(var(--c-fog-300) / <alpha-value>)",
          400: "rgb(var(--c-fog-400) / <alpha-value>)",
          500: "rgb(var(--c-fog-500) / <alpha-value>)",
        },
        accent: {
          emerald: "rgb(var(--c-accent-emerald) / <alpha-value>)",
          mint: "rgb(var(--c-accent-mint) / <alpha-value>)",
          cyan: "rgb(var(--c-accent-cyan) / <alpha-value>)",
          violet: "rgb(var(--c-accent-violet) / <alpha-value>)",
        },
        line: {
          subtle: "rgb(var(--c-line-subtle) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-line) / <alpha-value>)",
        },
      },

      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-brand-soft": "var(--gradient-brand-soft)",
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        noise: "var(--noise-bg)",
      },

      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-cyan": "var(--shadow-glow-cyan)",
        "glow-lg": "var(--shadow-glow-lg)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },

      borderRadius: {
        xl2: "1.25rem",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          to: { transform: "rotate(-360deg)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "border-rotate": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },

      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out both",
        "spin-slow": "spin-slow 12s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 18s linear infinite",
        "text-shimmer": "text-shimmer 6s linear infinite",
        "float-soft": "float-soft 4s ease-in-out infinite",
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
