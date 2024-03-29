import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "ru",
    fallbackLng: "ru", // use en if detected lng is not available
    keySeparator: ".", // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

