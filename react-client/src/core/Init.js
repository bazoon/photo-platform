import React, {useEffect, useRef} from "react";
import compose from "crocks/helpers/compose";
import map from "crocks/pointfree/map";
import identity from "crocks/combinators/identity";
import ifElse from "crocks/logic/ifElse";
import Result from "crocks/Result";
import tryCatch from "crocks/Result/tryCatch";
import chain from "crocks/pointfree/chain";
import { collect, afterChange} from "react-recollect";
import { Toast } from "primereact/toast";
import useAuth from "./hooks/useAuth";
import {asyncGet} from "./api";
import Async from "crocks/Async";
import option from "crocks/pointfree/option";
import resultToMaybe from "crocks/Maybe/resultToMaybe";
import {loadRoles, loadUser} from "./api_utils";
import {useMachine} from "@xstate/react";
import UserMachine from "./UserMachine";
import {useHistory} from "react-router-dom";

const initialContext = {
  user: {},
  role: undefined
};

const safe = pred =>
  ifElse(pred, Result.Ok, Result.Err);


const loadLocalUser = (store, toast) => {
  store.user = null;
  store.role = "";
  store.toast = toast;

  return compose(
    option(undefined),
    resultToMaybe,
    chain(identity),
    map(tryCatch(e => JSON.parse(e))),
    safe(e => e),
    e => { 
      return localStorage.getItem(e);
    }
  )("user");
};


function Init({store}) {
  const history = useHistory();
  const toast = useRef();
  const {canAdmin} = useAuth();

  const guards = {
    isLoggedIn: () => !!localStorage.getItem("user"),
    hasAuth: (_, {data}) => canAdmin(data?.role)
  };
  
  const actions = {
    loadLocalUser: () => loadLocalUser(store, toast),
    visitMainPage: () => setTimeout(() => history.push("/"), 100),
    saveRole: (_, {data}) => { store.role = data?.role; }
  };

  const services = {
    loadRoles: () => asyncGet("api/roles").toPromise(),
  };

  const [_, send] = useMachine(UserMachine({context: initialContext, actions, services, guards}), {devTools: true});



  useEffect(() => {
    send("checkLogin");
  }, []);
  
  return (
    <>
      <Toast ref={toast} />
    </>

  );
}

export default collect(Init);



