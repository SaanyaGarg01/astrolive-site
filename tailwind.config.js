/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#070913",
        celestial: {
          gold: "#f5c242",
          purple: "#a855f7",
          cyan: "#38bdf8"
        }
      }
    },
  },
  plugins: [],
}
