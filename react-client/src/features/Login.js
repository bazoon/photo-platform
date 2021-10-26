import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import { collect } from "react-recollect";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import UserMachine from "../core/UserMachine";
import { useMachine } from "@xstate/react";
import useAuth from "../core/hooks/useAuth";


import { inspect } from "@xstate/inspect";
if (location.href.includes("foto.ru")) {
  inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
  });
}

const handleChange = setfn => e => setfn(e.target.value);
const handleChangeCheckbox = setfn => e => setfn(e.target.checked);

const services = {
  login: (_, {data}) => asyncPost("api/login", data).toPromise(),
  loadRoles: () => asyncGet("api/roles").toPromise(),
  signup: params => asyncPost("api/login", params).toPromise(),
  checkLogin: () => asyncGet("api/isLoggedIn").toPromise(),
};

const {canAdmin} = useAuth();

const guards = {
  hasAuth: (_, {data}) => canAdmin(data?.role),
};

const initialContext = {
  user: {},
  role: ""
};

function Main({store}) {
  const history = useHistory();
  const actions = {
    visitMainPage: () => setTimeout(() => history.push("/"), 100),
    saveUser: (_, {data}) => { 
      console.log(111, data);
      localStorage.setItem("user", JSON.stringify(data)); 
      store.user = data;
      store.isLoggedIn = !!data.id;
    },
    saveRole: (_, {data}) => { store.role = data?.role; },
  };

  const [, send] = useMachine(UserMachine({context: initialContext, actions, services, guards}), {devTools: true});
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [remember] = useState(true);
  const [agreed, setAgreed] = useState(true);
  const [iConfirmAgreement] = useState(true);
  const [iKnowAboutCookies] = useState(true);
  const [iReadAboutPersonal] = useState(true);


  // const loginFailed = error => {
  //   store.toast.current.show({severity: "error", summary: error && error.error});
  // };


  function handleLogin(e) {
    e.preventDefault();
    const data = {password, nickName, remember, iConfirmAgreement, iKnowAboutCookies, iReadAboutPersonal};
    send("login", {data});
  }

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-semi-bright font-header text-center mt-24">Авторизация</div>
        <form className="w-full p-10 border rounded bg-brown-dark2">
          <div className="grid grid-cols-6 grid-rows-5 gap-12">
            <label className="col-span-2 text-tiny uppercase place-self-end">Имя</label>
            <input autoFocus value={nickName} onChange={handleChange(setNickName)} className="col-span-4 text-semi-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <label className="col-span-2 place-self-end text-tiny uppercase">Пароль</label>
            <input type="password" value={password} onChange={handleChange(setPassword)} className="col-span-4 text-semi-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
            <input checked={agreed} onChange={handleChangeCheckbox(setAgreed)} className="col-span-2 place-self-end" type="checkbox"/>
            <label className="col-span-4 mr-8 text-tiny">Согласен на обработку личных данных</label>
            <div className="col-span-2"> </div>
            <div className="col-span-4">
              <Button disabled={!agreed} onClick={handleLogin} className="uppercase text-center">Войти</Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );

}

export default(collect(Main));
