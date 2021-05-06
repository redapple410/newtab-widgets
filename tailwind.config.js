module.exports = {
  purge: [
    "index.html",
    "./assets/js/*.js",
  ],
  darkMode: false, // or "media" or "class"
  theme: {
    fontFamily: {
      "sans": ["Ubuntu", "sans-serif"],
      "serif": ["Bitter", "serif"],
    },
    fontSize: {
      "2xs": "0.5rem",
      "xs": ".75rem",
      "sm": ".875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    minWidth: {
      "0": "0",
      "9/20": "45%",
      "11/20": "55%",
      "full": "100%",
    },
    screens: {
      // since the page is primarly intended for desktop viewing, we are taking a desktop-first approach
      "small": {"raw": "(max-width: 810px), (max-height: 480px)"},
      "short": {"raw": "(max-height: 480px)"},
      "thin": {"raw": "(max-width: 810px)"},
    },
    zIndex: {
      "0": 0,
      "10": 10,
      "-10": -10,
      "auto": "auto",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
