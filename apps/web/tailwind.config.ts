import type { Config } from "tailwindcss";

/**
 * AuraState Tailwind v4 Theme Configuration
 * Design Language: Obsidian Core · Solar Accent · Aura Glow
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ── Core Palette ──────────────────────────────────────
      colors: {
        // Obsidian Backgrounds
        void:    "#050507",
        abyss:   "#0A0A0F",
        cavern:  "#111118",
        surface: "#1A1A24",
        elevated:"#22222F",
        border:  "#2A2A3A",

        // Solar Accent (Brand)
        solar: {
          50:  "#FFF9E6",
          100: "#FFF0B3",
          200: "#FFE066",
          300: "#FFD11A",
          400: "#FFC200",   // Primary brand
          500: "#E6AE00",
          600: "#CC9900",
          700: "#A67C00",
        },

        // Aura States
        aura: {
          blue:   "#4F8EF7",
          purple: "#8B5CF6",
          green:  "#10B981",
          amber:  "#F59E0B",
          red:    "#EF4444",
        },

        // Text Hierarchy
        ink: {
          primary:   "#F0F0F8",
          secondary: "#9090A8",
          muted:     "#55556A",
          disabled:  "#333344",
        },
      },

      // ── Typography ────────────────────────────────────────
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
        numeric: ["'Barlow Condensed'", "sans-serif"],
      },

      // ── Aura Glow Effects ─────────────────────────────────
      boxShadow: {
        "aura-solar":  "0 0 20px rgba(255,194,0,0.25), 0 0 60px rgba(255,194,0,0.1)",
        "aura-blue":   "0 0 20px rgba(79,142,247,0.25), 0 0 60px rgba(79,142,247,0.1)",
        "aura-purple": "0 0 20px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.1)",
        "aura-green":  "0 0 20px rgba(16,185,129,0.25), 0 0 60px rgba(16,185,129,0.1)",
        "panel":       "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },

      // ── Animation ─────────────────────────────────────────
      keyframes: {
        "aura-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
        "xp-surge": {
          "0%":   { transform: "scaleX(var(--from))" },
          "100%": { transform: "scaleX(var(--to))" },
        },
        "sticker-pop": {
          "0%":   { transform: "scale(0) rotate(-15deg)", opacity: "0" },
          "70%":  { transform: "scale(1.2) rotate(5deg)",  opacity: "1" },
          "100%": { transform: "scale(1)  rotate(0deg)",   opacity: "1" },
        },
        "meltdown-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%":      { transform: "translateX(-4px)" },
          "75%":      { transform: "translateX(4px)" },
        },
      },
      animation: {
        "aura-pulse":      "aura-pulse 3s ease-in-out infinite",
        "xp-surge":        "xp-surge 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "sticker-pop":     "sticker-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "meltdown-shake":  "meltdown-shake 0.2s ease-in-out infinite",
      },
    },
  },
};

export default config;
