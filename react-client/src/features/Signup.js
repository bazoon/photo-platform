
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { collect } from "react-recollect";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import { Captcha } from "primereact/captcha";

const handleChange = setfn => e => setfn(e.target.value);
const handleChangeCheckbox = setfn => e => setfn(e.target.checked);

export default function Main({store}) {
  // const [remember, setRemember] = useState(true);
  // const [iConfirmAgreement, setIConfirmAgreement] = useState(true);
  // const [iKnowAboutCookies, setIKnowAboutCookies] = useState(true);
  // const [iReadAboutPersonal, setIReadAboutPersonal] = useState(true);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);

  const history = useHistory();
  const { t } = useTranslation("namespace1");


  function handleLogin(e) {
    e.preventDefault();
    
    asyncPost("api/signup", { password, nickName, firstName, lastName, email, agreed}).fork(e => {
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

  function onCaptcha(a,b) {
    debugger;

  }
  


  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-bright font-header text-center mt-24">Регистрация</div>
    
        <form className="w-full p-10 border rounded bg-brown-dark2">
          <div className="grid grid-cols-6 grid-rows-5 gap-12">
            <label className="col-span-2 text-tiny uppercase place-self-end">Имя</label>
            <input value={firstName} onChange={handleChange(setFirstName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase place-self-end">Фамилия</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase">Логин (минимум 6 символов)</label>
            <input value={nickName} onChange={handleChange(setNickName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase">Пароль (минимум 6 символов)</label>
            <input type="password" value={password} onChange={handleChange(setPassword)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase">Email</label>
            <input value={email} onChange={handleChange(setEmail)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <input checked={agreed} onChange={handleChangeCheckbox(setAgreed)} className="col-span-2 place-self-end" type="checkbox"/>
            <label className="col-span-4 mr-8 text-tiny">Согласен на обработку личных данных</label>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Button disabled={!agreed} onClick={handleLogin} className="uppercase text-center">Регистрация</Button>
            </div>
          </div>
        </form>



      </div>
    </div>
  );

}
