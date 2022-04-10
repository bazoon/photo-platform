import React, {useEffect, useState} from "react";
import {asyncGet} from "./core/api";
import { useTranslation } from "react-i18next";
import { collect } from "react-recollect";
import { Menubar } from "primereact/menubar";
import { withRouter } from "react-router";
import useAuth from "./core/hooks/useAuth";
import useLogout from "./core/hooks/useLogout";
import { locale, PrimeIcons } from "primereact/api";
import {saveLanguage} from "./core/utils";
import cn from "classnames";


const isActiveMenuItem = item => {
  return location.href.includes(item.to) || (item.items && item.items.some(isActiveMenuItem));
};

const setTemplateForItems = (items = [], history, t, i) => {
  items.forEach(item => {
    item.command = item.command || (() => history.push(item.to || item.slug));
    item.label = t(item.name);
    item.className = isActiveMenuItem(item) ? "p-menuitem--active" : "";
    if (item.items?.length > 0) {
      setTemplateForItems(item.items, history, t);
    } else {
      delete item.items;
    }
  });
  return [...items];
};

function MainMenu({store, history}) {
  const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const { t, i18n } = useTranslation("namespace1");
  const {canNot} = useAuth(store.permissions);
  const logout = useLogout(store);

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    saveLanguage(lang);
    locale(lang);
  };


  const adminItemCls = cn("admin-menu", {
    "p-menuitem--active": isActiveMenuItem({to: "/admin"}),
    "p-menuitem--disabled": canNot(["adminMenu.view", "domain.adminMenu.view"]),
    "p-menuitem--enabled": !canNot(["adminMenu.view", "domain.adminMenu.view"])
  });

  useEffect(() => {
    const links = [
      { 
        className: "flex-1",
        template: <div></div>
      },
      {
        label: "admin",
        className: adminItemCls,
        command: () => history.push("/admin"),
        disabled: canNot(["adminMenu.view", "domain.adminMenu.view"])
      },
      {
        name: "ru",
        label: "ru",
        className: i18n.language === "ru" ? "p-menuitem--active" : "",
        command: () => changeLanguage("ru")
      },
      {
        className: "p-menuitem__slash",
        label: "/"
      },
      {
        name: "en",
        label: "en",
        className: i18n.language === "en" ? "p-menuitem--active" : "",
        command: () => changeLanguage("en")
      },
      !store.user && {
        label: t("login"),
        className: "login-link",
        command: () => history.push("/login")
      } || {},
      !store.user && {
        label: "/",
        className: "p-menuitem__slash",
      },
      !store.user && {
        label: t("signup"),
        command: () => history.push("/signup")
      } || {},
      store.user && {
        label: (
          <div className="flex items-center">
            <img className="rounded-full block w-16 h-16" src={store.user.avatar}/>
            <div className="ml-5"> {store.user.firstName}</div>
          </div>
        ),
        to: "profile",
        command: () => history.push("/profile")
      } || {},
      store.user && {
        icon: PrimeIcons.SIGN_OUT,
        className: "hover:",
        command: () => {
          logout();
          history.push("/");
        } 
      } || {},
    ];

    setLinks(links);
  }, [store.permissions, store.user, location.href, i18n.language]);

  function menuLoaded(menu) {
    setItems(setTemplateForItems(menu, history, t, i18n));
  }

  useEffect(() => {
    asyncGet("api/staticMenu").fork(() => {}, menuLoaded);
  }, []);


  useEffect(() => {
    setItems(items => setTemplateForItems(items, history, t));
  }, [i18n.language, location.href, t]);

  return (
    <Menubar
      className=""
      model={items.concat(links)}
    />
  );
}

export default(withRouter(collect(MainMenu)));

