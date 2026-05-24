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

        ink: {
          950: "#07090C",
          900: "#0B1014",
          800: "#0F1419",
          700: "#141A21",
          600: "#1A222C",
          500: "#222B37",
          400: "#2C3645",
        },
        fog: {
          50: "#F5F7FA",
          100: "#E6EAF0",
          200: "#C7CFDB",
          300: "#9CA8B8",
          400: "#6B7785",
          500: "#4A5260",
        },
        accent: {
          emerald: "#0DFC4B",
          mint: "#8EFF8B",
          cyan: "#06D6F4",
          violet: "#A78BFA",
        },
      },

      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #0DFC4B 0%, #06D6F4 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(13,252,75,0.18) 0%, rgba(6,214,244,0.18) 100%)",
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },

      boxShadow: {
        glow: "0 0 32px -4px rgba(13, 252, 75, 0.35)",
        "glow-cyan": "0 0 32px -4px rgba(6, 214, 244, 0.35)",
        "glow-lg": "0 0 80px -10px rgba(13, 252, 75, 0.45)",
        card:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px -12px rgba(0,0,0,0.6)",
        "card-hover":
          "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 24px 48px -16px rgba(13,252,75,0.18), 0 8px 32px -12px rgba(0,0,0,0.7)",
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
