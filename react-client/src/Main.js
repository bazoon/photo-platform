import React, {useEffect, Suspense} from "react";
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
import MainMenu from "./MainMenu";
import {asyncGet} from "./core/api";
import i18n from "./core/i18n";
import Thesis from "./features/Thesis";
import ifElse from "crocks/logic/ifElse";
import Result from "crocks/Result";
import Admin from "./features/admin/Layout";
import PrivateRoute from "./core/PrivateRoute";
import { collect } from "react-recollect";

function Main() {

  function loadTranslations(lang, t) {
    i18n.addResourceBundle(lang, "namespace1", t);
  }

  useEffect(() => {
    asyncGet("api/translation/ru").fork(e => e, data => loadTranslations("ru", data));
    asyncGet("api/translation/en").fork(e => e, data => loadTranslations("en", data));
  }, []);


  return (
    <>
      <Router>
        <Suspense fallback="loading">
          <div className="container flex flex-col">
            <header className="bg-blue-200 h-50">
              <MainMenu/>
            </header>
            <main className="flex-1 h-full bg-yellow-50">
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
