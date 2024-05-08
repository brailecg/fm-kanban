/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        "main-black": "#000112",
        "main-very-dark-grey": "#20212C",
        "main-dark-grey": "#2B2C37",
        "main-dark-lines": "#3E3F4E",
        "main-light-lines": "#E4EBFA",
        "main-medium-grey": "#828FA3",
        "main-light-grey": "#F4F7FD",
        "main-red": "#EA5555",
        "main-red-hover": "#FF9898",
        "main-grey-hover": "#979797",
        "column-blue": "#49C4E5",
        "column-purple": "#8471F2",
        "column-green": "#67E2AE",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Animation plugin
    require("@tailwindcss/forms"), // Forms plugin
  ],
};
