import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import { collect } from "react-recollect";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import useAsync from "../core/hooks/useAsync";

const handleChange = setfn => e => setfn(e.target.value);
const handleChangeCheckbox = setfn => e => setfn(e.target.checked);

function Main({store}) {
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [remember, setRemember] = useState(true);
  const [agreed, setAgreed] = useState(true);
  const [iConfirmAgreement, setIConfirmAgreement] = useState(true);
  const [iKnowAboutCookies, setIKnowAboutCookies] = useState(true);
  const [iReadAboutPersonal, setIReadAboutPersonal] = useState(true);
  const history = useHistory();
  const { t } = useTranslation("namespace1");

  const [data, isLoading, {post}, error] = useAsync(); 

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
    store.user = data;
    if (data)
      history.push("/");
  }, [data]);

  useEffect(() => {
    if (error)
      store.toast.current.show({severity: "error", summary: error && error.error});
  }, [error]);


  function handleLogin(e) {
    e.preventDefault();
    post("api/login", { password, nickName, remember, iConfirmAgreement, iKnowAboutCookies, iReadAboutPersonal});
    asyncGet("api/roles").fork(() => {}, ({role}) => {
      store.role = role;
    });
  }

  
  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-bright font-header text-center mt-24">Авторизация</div>
        <form className="w-full p-10 border rounded bg-brown-dark2">
          <div className="grid grid-cols-6 grid-rows-5 gap-12">
            <label className="col-span-2 text-tiny uppercase place-self-end">Имя</label>
            <input value={nickName} onChange={handleChange(setNickName)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase">Пароль</label>
            <input type="password" value={password} onChange={handleChange(setPassword)} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <input checked={agreed} onChange={handleChangeCheckbox(setAgreed)} className="col-span-2 place-self-end" type="checkbox"/>
            <label className="col-span-4 mr-8 text-tiny">Согласен на обработку личных данных</label>
            <div className="col-span-2"> </div>
            <div className="col-span-4">
              <Button loading={isLoading} disabled={!agreed} onClick={handleLogin} className="uppercase text-center">Войти</Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );

}

export default(collect(Main));
