import React, {Suspense, lazy} from "react";
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
import i18n from "./core/i18n";
import Organizers from "./features/Organizers";
import Partners from "./features/Partners";
import Thesis from "./features/Thesis";
import Hello from "./features/Hello";
import Politics from "./features/Politics";
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
import {make as JuryGallery} from "./components/JuryGallery.bs";
import ConfirmEmail from "./features/ConfirmEmail";
import Profile from "./features/Profile";
import {addLocale} from "primereact/api";
import Applications from "./features/Applications/Applications";
import FooterLinks from "./FooterLinks";
import {make as JuryAnalytics} from "./features/JuryAnalytics.bs";
import {make as ShortList} from "./features/ShortList.bs";


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

function MainApp({store}) {


  const sidebars = () => {
    return store.sidebars.map(sidebar => {
      const {Component} = sidebar;
      return <Component key={sidebar.key} {...sidebar.props}/>;
    });
  };



  return (
    <>
      <Router>
        <Suspense fallback="loading">
          <Init/>
          <header className="flex justify-center h-24 bg-brown-medium">
            <div className="container flex justify-center items-center cursor-pointer">

              <div className="flex wrap-0 items-center justify-between">
                <div className="relative">
                  <Link to="/"> <img src="/logo.png" className="w-32 h-32 object-contain relative -left-12"/></Link>
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


              <Route path="/politics">
                <Politics/>
              </Route>

              <Route path="/hello">
                <Hello/>
              </Route>
              <Route path="/rules">
                <Rules/>
              </Route>

              <Route path="/jury">
                <Jury/>
              </Route>
              <Route path="/short-list">
                <ShortList/>
              </Route>
              <Route path="/contacts">
                <Contacts/>
              </Route>
              <Route path="/partners">
                <Partners/>
              </Route>
              <Route path="/organizers">
                <Organizers/>
              </Route>
              <Route path="/jgallery">
                <JuryGallery/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/jury-analytics">
                <JuryAnalytics/>
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

          <footer className="flex justify-center bg-brown-medium h-40">
            <div className="container flex justify-center bg-brown-medium">
              <div className="pt-10 wrap">
                <div className="justify-between grid grid-cols-4">
                  <div className="w-60 h-16">
                    <div className="relative">
                      <Link className="uppercase absolute font-bold text-3xl text-brown-light no-underline" to="/">Photo</Link>
                      <Link style={{right: "111px", top: "32px"}} to="/" className="absolute font-text text-tiny no-underline text-brown-light">конкурсы</Link>
                      <div style={{top: "64px"}} className="uppercase absolute text-sm text-gray2 text-right">@ 2021 Photoконкурсы</div> 
                    </div>
                  </div>

                  <FooterLinks/>                 
                  {SocialLinks()}

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

export default collect(MainApp);

function SocialLinks() {
  return <div className="max-w-max gap-8 grid grid-cols-2 grid-rows-2">
    <a href="https://vk.com/public207178308" rel="noreferrer" target="_blank"><Vk /></a>
    <a href="https://twitter.com/fotoshifter" rel="noreferrer" target="_blank"><Twitter /></a>
    <a href="https://www.facebook.com/groups/1112529292192329" target="_blank" rel="noreferrer"><Fb /></a>
    <a href="https://www.instagram.com/prirodacup2021/" target="_blank" rel="noreferrer"><Insta /></a>
  </div>;
}
