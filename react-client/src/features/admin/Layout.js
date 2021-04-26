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

function App() {
  const { t } = useTranslation("namespace1");
  useEffect(() => {
  }, []);

  return (
    <Router>
      <div className="container flex h-screen">
        <div className="w-1/5 h-full">
          <Menu mode="inline" className="h-full" defaultOpenKeys={["users"]}>
            <SubMenu key="users" title={t("users")} defaultOpenKeys={["1"]}>
              <Menu.Item key="1"><Link to="/admin/users">{t("users")}</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/admin/admins">{t("admins")}</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="settings" title={t("settings")} >
              <Menu.Item key="1"><Link to="/admin/users">{t("users")}</Link></Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <main className="w-4/5 p-5 overflow-auto bg-yellow-50">
          <Switch>
            <Route path="/admin/users">
              <Users/>
            </Route>
            <Route path="/admin/admins">
              <Admins/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
