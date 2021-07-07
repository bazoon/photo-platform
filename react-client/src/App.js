import React, {useEffect, Suspense, lazy} from "react";
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

import { collect } from "react-recollect";
const MainMenu = lazy(() => import("./MainMenu"));

function Main({store}) {
  function loadTranslations(lang, t) {
    i18n.addResourceBundle(lang, "namespace1", t);
    const lan = window.navigator.language.slice(0, 2);
    i18n.changeLanguage(lan);
  }


  useEffect(() => {
    let i = 0;
    asyncGet("api/translation/ru").fork(e => e, data => loadTranslations("ru", data));
    asyncGet("api/translation/en").fork(e => e, data => loadTranslations("en", data));
  }, []);


  return (
    <>
      <Router>
        <Init/>
        <Suspense fallback="loading">
          <div className="container flex flex-col h-screen">
            <header className="bg-blue-200 h-50">
              <MainMenu/>
            </header>
            <main className="flex-1 bg-yellow-50">
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
                </Route>
              </Switch>
            </main>

            <footer className="h-10 bg-red-100">
            </footer>
          </div>
        </Suspense>
      </Router>
    </>
  );
}

export default collect(Main);
