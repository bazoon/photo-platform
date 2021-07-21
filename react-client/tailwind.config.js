module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "sm": "300px",
      "lg": "1024px",
      "xl": "1440px",
    },
    colors: {
      brown: {
        medium: "#2A2B2F"
      },
      darkgreen: "#0b160d",
      dark: "rgb(53, 53, 53)",
      gray: "rgb(234, 234, 234)",
      white: {
        80: "rgb(255, 255, 255, 0.8)"
      }
    },
    fontFamily: {
      header: ["BebasNeueRegular"],
      
    },
    fontSize: {
      "xs": "6px",
      "sm": "12px",
      "tiny": "18px",
      "base": "24px",
      "lg": "30px",
      "xl": "36px",
      "2xl": "42px",
      "3xl": "48px",
      "4xl": "54px",
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
