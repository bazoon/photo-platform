import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { store } from "react-recollect";
import {useHistory} from "react-router-dom";
import { SlideMenu } from "primereact/slidemenu";
import useLogout from "../core/hooks/useLogout";

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

export function ProfileMenu() {
  const [links, setLinks] = useState([]);
  const { t, i18n } = useTranslation("namespace1");
  const history = useHistory();
  const logout = useLogout(store);

  useEffect(() => {
    const links = [
     store?.role?.isJury && {
        name: t("jury"),
        to: "jury",
        label: t("jury"),
        command: () => history.push("/jury-analytics")
      } || {},
     store?.role?.isJury && {
        name: t("short-list"),
        to: "short-list",
        label: t("short-list"),
        command: () => history.push("/short-list")
      } || {},
      {
        name: t("profile"),
        to: "profile",
        label: t("profile"),
        command: () => history.push("/profile")
      },
      {
        label: t("applications"),
        to: "applications",
        name: t("applications"),
        command: () => history.push("/applications")
      },
      {
        label: t("messages"),
        to: "messages",
        name: t("messages"),
        command: () => history.push("/messages")
      },
      {
        name: t("logout"),
        command: () => {
          logout();
          history.push("/");
        } 
      },
    ];
      
    setLinks(setTemplateForItems(links, history, t));
  }, [store.role, store.user, location.href, i18n.language]);


  return (
    <SlideMenu model={links} className="bg-brown-medium border-0"/>
  );

}

export default ProfileMenu;
