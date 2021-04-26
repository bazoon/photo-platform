import React, {useEffect, useState} from "react";
import {asyncGet} from "./core/api";
import {Link} from "react-router-dom";
import "antd/dist/antd.css"; 
import Menu from "antd/lib/menu";
import { useTranslation } from "react-i18next";
import SubMenu from "antd/lib/menu/SubMenu";
import { collect } from "react-recollect";

function Main({store}) {
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation("namespace1");
  
  function menuLoaded(menu) {
    setItems(menu);
  }

  function renderItem(item) {
    return (
      item.children ?
        <Menu.SubMenu key={item.title} title={t(item.title)}>
          {item.children.map(renderItem)}
        </Menu.SubMenu>
        :
        <Menu.Item key={item.title}>
          <Link to={item.url}>{t(item.title)}</Link>
        </Menu.Item>

    );
  }

  function renderMenu(menu) {
    return (
      <Menu mode="horizontal">
        {menu.map(renderItem)}
      </Menu>
    );
  }

  useEffect(() => {
    asyncGet("api/staticMenu").fork(() => {}, menuLoaded);
  }, []);

  return (
    <div className="flex">
      {renderMenu(items)}
      <Menu mode="horizontal">
        <SubMenu title={i18n.language}>
          <Menu.Item onClick={() => i18n.changeLanguage("ru")}>ru</Menu.Item>
          <Menu.Item onClick={() => i18n.changeLanguage("en")}>en</Menu.Item>
        </SubMenu>
        <Menu.Item><Link to="/admin">admin</Link></Menu.Item>
        <Menu.Item>{store.user.nick_name}</Menu.Item>
      </Menu>
    </div>
  );
}

export default(collect(Main));
