/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5F6FFF",
        secondary: "#E0E0E0",
        accent: "#FF5722",
        textColor: "#333333",
      },
    },
  },
  plugins: [],
}