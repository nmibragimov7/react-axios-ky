/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1250px',
    },
    extend: {
      colors: {
        'primary-blue': '#0992C8',
        'blue-100': "#BFE0EE",
        'light-blue': "#ECF4F8",
        'white-blue': "#f8f8f8",
        'white': '#FFF',
        'black': '#000',
        'dark': '#343434',
        'gray': '#7d7d7d',
        'gray-100': '#E0E0E0',
        'gray-200': '#D8D8D8',
        'gray-300': '#BDBDBD',
        'gray-500': '#828282',
        'light-gray': "#dadada",
        'green': '#24ae7c',
        'red': '#EB5757',
        'orange': '#EE6E33',
        'pink':'#FFF5F3',
        'purple': '#C52DFF',
        'purple-100': '#F9F4FB',
        'purple-dark': '#637BB9',
        'birch': '#4C9DA9',
        'birch-100': '#F4F6FB'
      },
      fontFamily: {
        'sans': ['Raleway', 'sans-serif']
      },
      boxShadow: {
        'gray-100': '0px 1px 10px 1px rgba(202, 202, 202, 0.25)'
      }
    },
  },
  plugins: [],
}
