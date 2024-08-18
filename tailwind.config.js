/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: ["aqua", "synthwave"],
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
