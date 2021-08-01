module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  tailwindCSS: {
    headwind: {
      sortTailwindClasses: false
    }
  },
  mode: "jit",
  theme: {
    screens: {
      "sm": "300px",
      "lg": "1024px",
      "xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      brown: {
        medium: "#2A2B2F",
        dark: "#202125",
        light: "rgb(239, 188, 130)",
        dark2: "rgb(30, 31, 37)"
      },
      darkgreen: "#0b160d",
      dark: "rgb(53, 53, 53)",
      gray: "rgb(234, 234, 234)",
      gray2: "rgb(182, 182, 182)",
      white: {
        80: "rgb(255, 255, 255, 0.8)"
      },
      bright: "#fff"
    },
    fontFamily: {
      header: ["BebasNeueRegular"],
      text: ["FuturaPTBook"]
    },
    fontSize: {
      "xs": "6px",
      "sm": "12px",
      "sm-2": "14px",
      "tiny": "18px !important",
      "base": "24px !important",
      "lg": "30px",
      "xl": "36px",
      "2xl": "42px !important",
      "3xl": "48px",
      "4xl": "54px !important",
      "5xl": "60px",
      "6xl": "66px",
      "7xl": "72px",
      "8xl": "78px",
      "9xl": "84px",
      "10xl": "90px",
      "11xl": "96px",
    },
    borderRadius: {
      round: "50%"
    },
    container: {
      center: true,
      

    },
    extend: {
      gridTemplateRows: {
        "g": "repeat(8, 5vw)"
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
  }
};
