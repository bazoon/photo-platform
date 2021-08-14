import React, {useEffect, useState} from "react";
import {asyncGet} from "./core/api";
import { useTranslation } from "react-i18next";
import { collect } from "react-recollect";
import { Menubar } from "primereact/menubar";
import { withRouter } from "react-router";
import useAuth from "./core/hooks/useAuth";
import useLogout from "./core/hooks/useLogout";

const setTemplateForItems = (items = [], history, t) => {
  items.forEach(item => {
    item.command = item.command || (() => history.push(item.to));
    item.label = t(item.name) || item.name;
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
 
  useEffect(() => {

    const l = [
      { 
        className: "flex-1",
        template: <div></div>
      },
      canAdmin(store.role) ? {
        label: "admin",
        command: () => history.push("/admin"),
      }: {},
      {
        label: i18n.language,
        items: [
          {
            name: "ru",
            label: "ru",
            command: () => i18n.changeLanguage("ru")
          },
          {
            label: "en",
            name: "en",
            command: () => i18n.changeLanguage("en")
          }

        ]
      },
      !store.user && {
        label: "login",
        command: () => history.push("/login")
      } || {},
      !store.user && {
        label: "signup",
        command: () => history.push("/signup")
      } || {},
      store.user && {
        label: "logout",
        command: () => {
          logout();
          history.push("/");
        } 
      } || {}
    ];
    console.log(canAdmin(store.role), store.role, l);
    setLinks(l);
  }, [store.role, store.user]);

  function menuLoaded(menu) {
    setItems(setTemplateForItems(menu, history, t));
  }

  useEffect(() => {
    asyncGet("api/staticMenu").fork(() => {}, menuLoaded);
  }, []);


  useEffect(() => {
    setItems(setTemplateForItems(items, history, t));
  }, [i18n.language]);

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

