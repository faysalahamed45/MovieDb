export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // enable class-based dark mode
  theme: {
    extend: {
      colors: {
        netflix: {
          background: "#141414",
          red: "#e50914",
          gray: "#b3b3b3",
        },
      },
    },
  },  
  plugins: [],
};
