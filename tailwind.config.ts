/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        // 🔹 existing colors
        sunny: "#FFD93D",
        coral: "#FF6B9D",
        "fresh-green": "#6BCB77",
        "sky-blue": "#4D96FF",
        cream: "#FFF9F0",
        "warm-gray": "#F7F5F2",

        // ✅ REQUIRED system colors (fixes error)
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        warm: "0 10px 40px -10px rgba(255, 107, 157, 0.15)",
        "warm-hover": "0 20px 40px -10px rgba(255, 107, 157, 0.25)",
      },
    },
  },
  plugins: [],
};
