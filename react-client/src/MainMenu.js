import React, {useEffect, useState} from "react";
import {asyncGet} from "./core/api";
import { useTranslation } from "react-i18next";
import { collect } from "react-recollect";
import { Menubar } from "primereact/menubar";
import { withRouter } from "react-router";
import useAuth from "./core/hooks/useAuth";
import useLogout from "./core/hooks/useLogout";
import { locale } from "primereact/api";


const isActiveMenuItem = item => {
  return location.href.includes(item.to) || (item.items && item.items.some(isActiveMenuItem));
};

const setTemplateForItems = (items = [], history, t) => {
  items.forEach(item => {
    item.command = item.command || (() => history.push(item.to));
    item.label = t(item.name) || item.name;
    item.className = isActiveMenuItem(item) ? "p-menuitem--active" : "";
    if (item.items) {
      setTemplateForItems(item.items, history, t);
    }
  });
  return [...items];
};

function Main({store, history}) {
  const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const { t, i18n } = useTranslation("namespace1");
  const {canAdmin} = useAuth();
  const logout = useLogout(store);
 
  

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    locale(lang);
  };

  useEffect(() => {
    const links = [
      { 
        className: "flex-1",
        template: <div></div>
      },
      canAdmin(store.role) ? {
        label: "admin",
        className: isActiveMenuItem({to: "/admin"}) ? "p-menuitem--active" : "",
        command: () => history.push("/admin"),
      }: {},
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
        label: "logout",
        command: () => {
          logout();
          history.push("/");
        } 
      } || {},
      store.user && {
        label: store.user.firstName,
        items: [
          {
            name: "profile",
            label: t("profile"),
            command: () => history.push("/profile")
          },
          {
            label: "applications",
            name: t("appplications"),
            command: () => history.push("/applications")
          }
        ]
      } || {},
    ];
    
    setLinks(links);
  }, [store.role, store.user, location.href, i18n.language]);

  function menuLoaded(menu) {
    setItems(setTemplateForItems(menu, history, t));
  }

  useEffect(() => {
    asyncGet("api/staticMenu").fork(() => {}, menuLoaded);
  }, []);


  useEffect(() => {
    setItems(setTemplateForItems(items, history, t));
  }, [i18n.language, location.href]);

  return (
    <div className="flex wrap">
      <Menubar
        className="w-full h-"
        model={items.concat(links)}
      />
    </div>
  );
}

export default(withRouter(collect(Main)));

