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
} from "react-router-dom";
import Login from "./features/Login";
import {asyncGet} from "./core/api";
import i18n from "./core/i18n";
import Thesis from "./features/Thesis";
import Admin from "./features/admin/Layout";
import PrivateRoute from "./core/PrivateRoute";
import Init from "./core/Init";
import MainPage from "./MainPage";

import { collect } from "react-recollect";
const MainMenu = lazy(() => import("./MainMenu"));

function Main({store}) {
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

  useEffect(() => {
    asyncGet("api/translation/ru").fork(e => e, data => loadTranslations("ru", data));
    asyncGet("api/translation/en").fork(e => e, data => loadTranslations("en", data));
  }, []);

  //TODO: подумать как сделать ширину чтобы было 2 ширины 1440px общая и 
  return (
    <>
      <Router>
        <Init/>
        <Suspense fallback="loading">
          <div className="container flex flex-col h-screen">
            <header className="bg-brown-medium h-66">
              <MainMenu/>
            </header>
            <main className="flex-1 bg-darkgreen">
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/thesis">
                  <Thesis/>
                </Route>

                <PrivateRoute path="/admin">
                  <Suspense fallback="loading">
                    <Admin/>
                  </Suspense>
                </PrivateRoute>
                <Route path="/">
                  <MainPage/>
                </Route>
              </Switch>

            </main>

            <footer className="h-10 bg-red-100">
            </footer>
          </div>
        </Suspense>
      </Router>

      {sidebars()}
    </>
  );
}

export default collect(Main);
