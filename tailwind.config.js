/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
