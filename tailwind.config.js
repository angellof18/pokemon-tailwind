/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: ["nord","night"],
  },

  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
