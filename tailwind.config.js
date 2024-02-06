/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "tealDark": "#388087",
        "tealMed": "#6FB3B8",
        "lightBlue": "#BADFE7",
        "softGreen": "#C2EDCE",
        "mutedBeige": "#F6F6F2",
        "orangey": "#DD9A53",
        "pinky": "#C26492",
        "darkestTeal": "#001E21",
      },
      screens: {
        xs: "300px"
      },
      fontFamily: {
        "delicious": "'Delicious Handrawn', cursive"
      }
    },
  },
  plugins: [],
}

