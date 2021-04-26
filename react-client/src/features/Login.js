import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { collect } from "react-recollect";
import {useHistory} from "react-router-dom";

const handleChange = setfn => e => setfn(e.target.value);

function Main({store}) {
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [remember, setRemember] = useState(true);
  const [iConfirmAgreement, setIConfirmAgreement] = useState(true);
  const [iKnowAboutCookies, setIKnowAboutCookies] = useState(true);
  const [iReadAboutPersonal, setIReadAboutPersonal] = useState(true);
  const history = useHistory();
  const { t } = useTranslation("namespace1");

  function handleLogin(e) {
    e.preventDefault();
    
    asyncPost("api/login", { password, nickName, remember, iConfirmAgreement, iKnowAboutCookies, iReadAboutPersonal}).fork(e => {
      history.push("/login");
    }, data => {
      localStorage.setItem("user", JSON.stringify(data));
      asyncGet("api/roles").fork(() => {}, ({role}) => {
        store.role = role;
      });
      store.user = data;
      history.push("/");
    });
  }

  
  return (
    <div className="flex items-center w-3/5 h-screen mx-auto">
      <form className="w-full p-10 border rounded bg-blue-50">
        <div className="flex flex-col mb-5">
          <label htmlFor="nick" className="mb-3">{t("nickname")}</label>
          <input type="text" className="p-5 rounded" onChange={({target}) => setNickName(target.value) }/>
        </div>
        <div className="flex flex-col mb-10">
          <label htmlFor="nick" className="mb-3">password</label>
          <input type="password" className="p-5 rounded" onChange={({target}) => setPassword(target.value)}/>
        </div>
        <div>
          <Checkbox checked={remember} onChange={handleChange(setRemember)}>Запомнить меня</Checkbox>
        </div>
        <div>
          <Checkbox checked={iConfirmAgreement} onChange={handleChange(setIConfirmAgreement)}>Я прочитал и принимаю соглашение об обработке персональных данных на этом сайте.</Checkbox>
        </div>
        <div>
          <Checkbox checked={iReadAboutPersonal} onChange={handleChange(setIReadAboutPersonal)}>Я принимаю пользовательское соглашение.</Checkbox>
        </div>
        <div>
          <Checkbox checked={iKnowAboutCookies} onChange={handleChange(setIKnowAboutCookies)}>Я предупрежден, что на сайте используются cookie-файлы.</Checkbox>
        </div>


        <button onClick={handleLogin} className="w-full p-5 bg-blue-100 rounded">Войти</button>
      </form>
    </div>
  );

}

export default(collect(Main));
