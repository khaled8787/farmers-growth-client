/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ এটা must
  content: ["./index.html", "./src/**/*.{js,jsx}"], // ✅ সব React files include করতে হবে
  theme: {
    extend: {},
  },
  plugins: [],
};
