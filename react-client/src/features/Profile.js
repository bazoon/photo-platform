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
      store.user = data;
      history.push("/");
    });
  }


  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-bright font-header text-center mt-24">Профиль</div>
    
        <form className="w-full p-10 border rounded bg-brown-dark2">
          <div className="grid grid-cols-6 grid-rows-10 gap-12">
            <div className="col-span-2 text-tiny place-self-end w-48 h-48 bg-brown-dark">
    
            </div>   
            <div className="col-span-4 text-bright text-sm-2 flex flex-col justify-between">
              <span>FIO</span>  
              <span>6 заявок</span>
              <Button disabled={!agreed} onClick={handleLogin} className="uppercase text-sm text-center w-72 uppercase">Загрузить фото</Button>
            </div>

            <label className="col-span-2 text-tiny place-self-end">Имя</label>
            <input value={firstName} onChange={handleChange(setFirstName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 text-tiny place-self-end">Имя</label>
            <input value={firstName} onChange={handleChange(setFirstName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Фамилия</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Отчество</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Город</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Страна</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny ">Email</label>
            <input value={email} onChange={handleChange(setEmail)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
          </div>
        </form>
        

        <form className="w-full p-10 border rounded bg-brown-dark2">
          <div className="uppercase text-lg text-bright font-header text-center mt-24">Смена пароля</div>
          <div className="grid grid-cols-6 grid-rows-8 gap-12">
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Текущий пароль</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny  place-self-end">Новый пароль</label>
            <input value={lastName} onChange={handleChange(setLastName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny ">Повторить новый пароль</label>
            <input value={email} onChange={handleChange(setEmail)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Button disabled={!agreed} onClick={handleLogin} className="uppercase text-center">Сохранить</Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );

}
