import React, {useEffect, Suspense, lazy} from "react";
import "./fonts/fonts.css";
import "./App.css";
import "./tails.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from "./features/Login";
import {asyncGet} from "./core/api";
import i18n from "./core/i18n";
import Thesis from "./features/Thesis";
import Rules from "./features/Rules";
import Jury from "./features/Jury";
import Contacts from "./features/Contacts";
import Admin from "./features/admin/Layout";
import Init from "./core/Init";
import MainPage from "./MainPage";
import Vk from "./icons/Vk";
import Fb from "./icons/Fb";
import Insta from "./icons/Insta";
import Twitter from "./icons/Twitter";
import Signup from "./features/Signup";
import { collect } from "react-recollect";
import JuryGallery from "./components/JuryGallery";
import ConfirmEmail from "./features/ConfirmEmail";
import Profile from "./features/Profile";
import {locale, addLocale} from "primereact/api";
import Applications from "./features/Applications/Applications";
import {loadLanguage} from "./core/utils";

const MainMenu = lazy(() => import("./MainMenu"));

addLocale("ru", {
  firstDayOfWeek: 1,
  dayNames: ["Восресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesMin: ["В", "П", "В", "С", "Ч", "П", "С"],
  monthNames: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
  monthNamesShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  today: "Сегодня",
  clear: "Очистить",
  dateFormat: "dd.mm.yy"
});

function Main({store}) {

  function loadTranslations(lang, t) {
    i18n.addResourceBundle(lang, "namespace1", t);
  }

  const sidebars = () => {
    return store.sidebars.map(sidebar => {
      const {Component} = sidebar;
      return <Component key={sidebar.key} {...sidebar.props}/>;
    });
  };



  const setDefaultLocale = lang => {
    i18n.changeLanguage(lang);
    locale(lang);
  };

  useEffect(() => {
    asyncGet("api/translation/ru").fork(e => e, data => loadTranslations("ru", data));
    asyncGet("api/translation/en").fork(e => e, data => loadTranslations("en", data));
    setDefaultLocale(loadLanguage());
  }, []);


  return (
    <>
      <Router>
        <Suspense fallback="loading">
          <Init/>
          <header className="flex justify-center h-24 bg-brown-medium">
            <div className="container flex justify-center items-center cursor-pointer">

              <div className="flex wrap-0 items-center justify-between">
                <div className="relative">
                  <div><Link className="uppercase font-bold text-lg text-brown-light no-underline" to="/">Photo</Link></div>
                  <div><Link to="/" className="absolute top-8 right-0 font-text text-sm no-underline text-brown-light">конкурсы</Link></div>
                </div>
                <MainMenu />
              </div>
            </div>
          </header>

          <main className="main-container bg-brown-medium">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/confirm-email">
                <ConfirmEmail />
              </Route>
              <Route path="/thesis">
                <Thesis/>
              </Route>

              <Route path="/rules">
                <Rules/>
              </Route>

              <Route path="/jury">
                <Jury/>
              </Route>
              <Route path="/contacts">
                <Contacts/>
              </Route>
              <Route path="/jgallery">
                <JuryGallery/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/applications">
                <Applications/>
              </Route>
              <Route path="/admin">
                <Suspense fallback="loading">
                  <Admin/>
                </Suspense>
              </Route>
              <Route path="/">
                <div className="main-bg w-full">
                  <MainPage/>
                </div>
              </Route>
            </Switch>
          </main>

          <footer className="flex justify-center bg-brown-medium h-60">
            <div className="container flex justify-center bg-brown-medium">
              <div className="pt-20 pb-36 wrap">
                <div className="justify-between grid grid-cols-4">
                  <div className="w-60 h-16">
                    
                    <div className="relative">
                      <Link className="uppercase absolute font-bold text-3xl text-brown-light no-underline" to="/">Photo</Link>
                      <Link style={{right: "86px", top: "32px"}} to="/" className="absolute font-text text-tiny no-underline text-brown-light">конкурсы</Link>
                      <div style={{top: "64px"}} className="uppercase absolute text-sm text-gray2 text-right">@ 2021 Photoконкурсы</div> 
                    </div>
                  </div>

                  <div className="grid gap-2 grid-cols-2 grid-rows-3">
                    <Link className="text-gray2 no-underline hover:underline" to="thesis">About</Link>
                    <Link className="text-gray2 no-underline hover:underline" to="#">Partners</Link>
                    <Link className="text-gray2 no-underline hover:underline" to="#">Gallery</Link>
                    <Link className="text-gray2 no-underline hover:underline" to="jury">Jury</Link>
                    <Link className="text-gray2 no-underline hover:underline" to="rules">Rules</Link>
                    <Link className="text-gray2 no-underline hover:underline" to="#">Politics</Link>
                  </div>
                  
                  <div className="max-w-max gap-8 grid grid-cols-2 grid-rows-2">
                    <Vk/>
                    <Twitter/>
                    <Fb/>
                    <Insta/>
                  </div>


                  <div className="grid grid-rows-2 text-gray2">
                    <div>
                      {store?.info?.phoneTech}
                    </div>
                    <div>
                      {store?.info?.emailPub}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </footer>


        </Suspense>
      </Router>

      {sidebars()}
    </>
  );
}

export default collect(Main);
