import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {asyncGet} from "../../core/api";
import i18n from "../../core/i18n";
import { store, collect } from "react-recollect";
import compose from "crocks/helpers/compose";
import map from "crocks/pointfree/map";
import identity from "crocks/combinators/identity";
import ifElse from "crocks/logic/ifElse";
import Maybe from "crocks/Maybe";
import tryCatch from "crocks/Result/tryCatch";
import { useTranslation } from "react-i18next";
import Menu from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import {Link} from "react-router-dom";
import Users from "./Users/Users";
import Admins from "./Admins/Admins";
import Languages from "./Languages/Languages";
import Lexicons from "./Lexicons/Lexicons";
import AwardTypes from "./AwardTypes/AwardTypes";
import Words from "./Words/Words";
import { TieredMenu } from "primereact/tieredmenu";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import AdminMenu from "./AdminMenu";




function App({history}) {
  const { t } = useTranslation("namespace1");
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
        </main>
      </div>
    </Router>
  );
}

export default App;
