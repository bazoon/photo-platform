import React, {useState} from "react";
import {asyncPost} from "../core/api";
import {Button} from "primereact/button";
import UserMachine from "../core/UserMachine";
import {useMachine} from "@xstate/react";
import {assign} from "xstate";


const handleChange = setfn => e => setfn(e.target.value);
const handleChangeCheckbox = setfn => e => setfn(e.target.checked);

const initialContext = {
  user: {},
  role: "",
  success: undefined
};

export default function Main() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);



  const actions = {
    successSignup: assign({
      success: true  
    }),
    failedSignup: assign({
      success: false
    })
  };

  const services = {
    signup: (_, data) => asyncPost("api/signup", data).toPromise(),
  };

  const [current, send] = useMachine(UserMachine({context: initialContext, services, actions}), {devTools: true});
  const {context} = current;
  const {success} = context;

  // const [remember, setRemember] = useState(true);
  // const [iConfirmAgreement, setIConfirmAgreement] = useState(true);
  // const [iKnowAboutCookies, setIKnowAboutCookies] = useState(true);
  // const [iReadAboutPersonal, setIReadAboutPersonal] = useState(true);
  


  function handleLogin(e) {
    e.preventDefault();
    send("signup", {password, nickName, firstName, lastName, email, agreed});
  }

  const signupForm = () => {
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
  };

  const successMessage = () => {
    return (
      <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
        <div className="relative flex justify-center w-4/5 wrap">
          <div className="uppercase text-lg text-bright font-header text-center mt-24">Регистрация прошла успешно</div>
          <div className="text-center text-orange text-base">На почту {email} отправлено письмо с ссылкой для подтверждения регистрации.</div>
        </div>
      </div>
    );
  };




  return success ? successMessage() : signupForm();
}
