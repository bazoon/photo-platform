import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Users from "./Users/Users";
import Admins from "./Admins/Admins";
import Languages from "./Languages/Languages";
import Lexicons from "./Lexicons/Lexicons";
import Organizers from "./Organizers/Organizers";
import AwardTypes from "./AwardTypes/AwardTypes";
import Words from "./Words/Words";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import AdminMenu from "./AdminMenu";
import Salones from "./Salones/Salones";
import Contests from "./Contests/Contests";
import { collect } from "react-recollect";
import { initStore } from "react-recollect";
initStore({sidebars: []});

function App({store}) {

  useEffect(() => {
  }, []);


  const routes = [
    {
      path: "/admin/users",
      Component: Users
    },
    {
      path: "/admin/admins",
      Component: Admins
    },
    {
      path: "/admin/languages",
      Component: Languages
    },
    {
      path: "/admin/lexicons",
      Component: Lexicons
    },
    {
      path: "/admin/awardTypes",
      Component: AwardTypes
    },
    {
      path: "/admin/words",
      Component: Words
    },
    {
      path: "/admin/organizers",
      Component: Organizers
    },
    {
      path: "/admin/salones",
      Component: Salones
    },
    {
      path: "/admin/contests",
      Component: Contests
    },
  ];


  return (
    <Router>
      <div className="container flex h-screen">
        <AdminMenu/>
        <main className="w-4/5 p-5 overflow-auto bg-yellow-50">
          <Switch>
            {
              routes.map(({path, Component}) => {
                return (
                  <Route key={path} path={path}>
                    <Component/>
                  </Route>
                );
              })
            }
          </Switch>
          bar
        </main>
      </div>
    </Router>
  );
}

export default collect(App);
