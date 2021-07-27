module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  tailwindCSS: {
    headwind: {
      sortTailwindClasses: false
    }
  },
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
    container: {
      center: true,
      

    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};
