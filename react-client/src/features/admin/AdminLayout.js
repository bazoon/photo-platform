import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import AdminMenu from "./AdminMenu";
import Admins from "./Admins/Admins";
import Moders from "./Moders/Moders";
import AwardTypes from "./AwardTypes/AwardTypes";
import Config from "./Config/Config";
import Contests from "./Contests/Contests";
import Languages from "./Languages/Languages";
import Lexicons from "./Lexicons/Lexicons";
import Organizers from "./Organizers/Organizers";
import SaloneFiles from "./SaloneFiles/SaloneFiles";
import SaloneSettings from "./Settings/SaloneSettings";
import Salones from "./Salones/Salones";
import Settings from "./Settings/Settings";
import Users from "./Users/Users";
import Words from "./Words/Words";
import { collect, initStore } from "react-recollect";

const Empty = function Empty () {
  return <div></div>;
};

initStore({sidebars: []});

function AdminLayout({store}) {

  const routes = [
    {
      path: "/admin/users",
      Component: Users
    },
    {
      path: "/admin/admins",
      Component: Admins
    },
    // {
    //   path: "/moders/moders",
    //   Component: Moders
    // },
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
    {
      path: "/admin/config",
      Component: Config
    },
    {
      path: "/admin/settings",
      Component: Settings
    },
    {
      path: "/admin/saloneSettings",
      Component: SaloneSettings
    },
    {
      path: "/admin/files",
      Component: SaloneFiles
    },
    {
      path: "/admin",
      Component: Empty
    }
  ];


  return (
    <Router>
      <div className="container flex admin">
        <AdminMenu/>
        <main className="w-4/5 p-5 overflow-auto">
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
        </main>
      </div>
    </Router>
  );
}

export default withRouter(collect(AdminLayout));
