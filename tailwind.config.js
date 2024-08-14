/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: ["synthwave", "aqua", "night", "emerald", "forest"],
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
