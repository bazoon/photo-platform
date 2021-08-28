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
  withRouter,
  Link,
} from "react-router-dom";
import Login from "./features/Login";
import {asyncGet} from "./core/api";
import i18n from "./core/i18n";
import Thesis from "./features/Thesis";
import Admin from "./features/admin/Layout";
import Init from "./core/Init";
import MainPage from "./MainPage";
import Vk from "./icons/Vk";
import Signup from "./features/Signup";
import { collect } from "react-recollect";
import JuryGallery from "./components/JuryGallery";
import ConfirmEmail from "./features/ConfirmEmail";
import Profile from "./features/Profile";
import useAuth from "./core/hooks/useAuth";
import {locale, addLocale} from "primereact/api";
import Applications from "./features/Applications/Applications";

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
  const {canAdmin} = useAuth();

  function loadTranslations(lang, t) {
    i18n.addResourceBundle(lang, "namespace1", t);
    const lan = window.navigator.language.slice(0, 2);
    i18n.changeLanguage(lan);
  }

  const sidebars = () => {
    return store.sidebars.map(sidebar => {
      const {Component} = sidebar;
      return <Component key={sidebar.key} {...sidebar.props}/>;
    });
  };


  const checkRole = role => {
    const isAdminArea = location.href.includes("/admin");
    if (isAdminArea && !canAdmin(role)) {
      location.href = "/login";
    }
  };

  const loadRoles = () => {
    asyncGet("api/roles").fork(() => {}, ({role}) => {
      store.role = role;
      checkRole(role);
    });
  };

  const setDefaultLocale = lang => {
    i18n.changeLanguage(lang);
    locale(lang);
  };

  useEffect(() => {
    asyncGet("api/translation/ru").fork(e => e, data => loadTranslations("ru", data));
    asyncGet("api/translation/en").fork(e => e, data => loadTranslations("en", data));
    store.loadRoles = loadRoles;
    loadRoles();
    setDefaultLocale("ru");
  }, []);

  const handleHome = () => {
    location.replace("/");
  };

  return (
    <>
      <Router>
        <Init/>
        <Suspense fallback="loading">
          <header className="flex justify-center h-24 bg-brown-medium">
            <div className="container flex justify-center items-center cursor-pointer">
              <div className="relative">
                <div><Link className="uppercase font-bold text-lg text-brown-light no-underline" to="/">Photo</Link></div>
                <div><Link to="/" className="absolute top-8 right-0 font-text text-sm no-underline text-brown-light">конкурсы</Link></div>
              </div>
              <MainMenu />
            </div>
          </header>

          <main style={{minHeight: "calc(100vh - 21rem)"}}>
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
                <MainPage/>
              </Route>
            </Switch>
          </main>

          <footer className="flex justify-center bg-brown-medium h-60">
            <div className="container flex justify-center bg-brown-medium">
              <div className="pt-20 pb-36 wrap">
                <div className="justify-between grid grid-cols-4">
                  <div className="w-32 h-16">
                    <img className="mb-4" src="https://via.placeholder.com/93"/>
                  </div>

                  <div className="grid gap-2 grid-cols-2 grid-rows-3">
                    <a className="text-gray2" href="#">About</a>
                    <a className="text-gray2" href="#">Partners</a>
                    <a className="text-gray2" href="#">Gallery</a>
                    <a className="text-gray2" href="#">Jury</a>
                    <a className="text-gray2" href="#">Rules</a>
                    <a className="text-gray2" href="#">Politics</a>
                  </div>
                  
                  <div className="max-w-max gap-8 grid grid-cols-2 grid-rows-2">
                    <Vk/>
                    <Vk/>
                    <Vk/>
                    <Vk/>
                  </div>


                  <div className="grid grid-rows-2 text-gray2">
                    <div>
                    8 (800) 255-42-12
                    </div>
                    <div>
                    photoproject@gmail.com
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
