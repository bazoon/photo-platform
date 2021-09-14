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


const isActiveMenuItem = item => {
  return location.href.includes(item.to) || (item.items && item.items.some(isActiveMenuItem));
};

const setTemplateForItems = (items = [], history, t) => {
  items.forEach(item => {
    item.command = item.command || (() => history.push(item.to));
    item.label = t(item.name);
    item.className = isActiveMenuItem(item) ? "p-menuitem--active" : "";
    if (item.items) {
      setTemplateForItems(item.items, history, t);
    }
  });
  console.log("setTemplateForItems");
  console.log(items);
  console.log(t);

  return [...items];
};

function Main({store, history}) {
  const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const { t, i18n } = useTranslation("namespace1");
  const {canAdmin} = useAuth();
  const logout = useLogout(store);

  const changeLanguage = lang => {
    console.log("changeLanguage");
    i18n.changeLanguage(lang);
    saveLanguage(lang);
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

    console.log("setLinks", i18n.language);
    
    setLinks(links);
  }, [store.role, store.user, location.href, i18n.language]);

  function menuLoaded(menu) {
    setItems(setTemplateForItems(menu, history, t));
    console.log("menuLoaded", i18n.language);
  }

  useEffect(() => {
    asyncGet("api/staticMenu").fork(() => {}, menuLoaded);
  }, []);


  useEffect(() => {
    setItems(items => setTemplateForItems(items, history, t));
  }, [i18n.language, location.href]);

  return (
    <Menubar
      className=""
      model={items.concat(links)}
    />
  );
}

export default(withRouter(collect(Main)));

