/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
      },
      animation: {
        fadeIn: "fadeIn 0.1s"
      },
      background: {
        finnish: "linear-gradient(0deg, rgba(0, 37, 238, 1) 9%, rgba(251, 251, 251, 1) 93%)",

      },
      transform: {
        rotateY: "rotateY(180deg)"
      }, fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lobster': ['Lobster', 'sans-serif']
      },
      backgroundColor: {
        "peru": "#CE7C25 ",
        "darkerperu": "#B97125"
      }
    },
  },
  plugins: [],
}
