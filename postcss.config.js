export default {
  plugins: {
    "tailwindcss": {},
    "postcss-nesting": {},
    "@csstools/postcss-oklab-function": {
      preserve: false,   // ❗ important : remplace oklab() → rgb()
    },
    "autoprefixer": {},
  },
};
