const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.css",
  ],
  darkMode: false, // or 'media' or 'class'
  tailwindCSS: {
    headwind: {
      sortTailwindClasses: false
    }
  },
  important: true,
  theme: {
    screens: {
      "sm": "300px",
      "lg": "1024px",
      "xl": "1440px",
    },
    colors: {
      ...colors,
      transparent: "transparent",
      brown: {
        medium: "#2A2B2F",
        dark: "#202125",
        light3: "#48494D",
        light: "rgb(239, 188, 130)",
        light2: "#CB893E",
        dark2: "rgb(30, 31, 37)",
        light4: "#EFBC82"
      },
      darkgreen: "#0b160d",
      dark: "rgb(53, 53, 53)",
      gray: "rgb(234, 234, 234)",
      gray2: "rgb(182, 182, 182)",
      white: {
        80: "#D0D4D0"
      },
      "semi-bright": "#D0D4D0",
      bright: "#fff",
      black: "#000",
      orange: "rgba(239, 188, 130, 1)"
    },
    fontFamily: {
      "futura-light": ["Futura-Light"],
      "futura-normal": ["Futura-Normal"],
      "futura-demi-bold": ["Futura-DemiBold"],
      "bebas-bold": ["BebasNeueBold"]
    },
    container: {
      center: true,
    },
    extend: {
      gridTemplateRows: {
        "g": "repeat(8, 5vw)",
      },
      gridTemplateColumns: {
        "square": "repeat(auto-fit, minmax(22rem, 1fr))",
      },
      minHeight: {
        "400": "400px"
      },
      minWidth: {
        "300": "200px"
      },
      height: {
        "10vh": "10vh",
        "15vh": "15vh",
        "20vh": "20vh",
        "25vh": "25vh",
        "30vh": "30vh",
        "40vh": "40vh"
      }
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
    borderColor: true
  }
};
