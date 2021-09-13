import React, {useEffect, useRef, useState} from "react";
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
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {loadLanguage} from "./utils";
import i18n from "../core/i18n";
import {locale} from "primereact/api";

const initialContext = {
  user: {},
  role: undefined
};

const safe = pred =>
  ifElse(pred, Result.Ok, Result.Err);


const loadLocalUser = (store) => {
  store.user = compose(
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

function loadTranslations(lang, t) {
  i18n.addResourceBundle(lang, "namespace1", t);
}

const setDefaultLocale = lang => {
  i18n.changeLanguage(lang);
  locale(lang);
};

const setTitle = (pathname, saloneName, name) => {
  if (pathname === "/") {
    document.title = saloneName;
  } else {
    document.title = name;
  }
};


function Init({store}) {
  const history = useHistory();
  const toast = useRef();
  const {canAdmin} = useAuth();

  useEffect(() => {
    const onChangleLocation = ({pathname}) => {
      setTitle(pathname, store.info.saloneName, store.info.name);
    };
    return history.listen(onChangleLocation);
  }, []);


  const guards = {
    isLoggedIn: (_, {data}) => data.id,
    hasAuth: (_, {data}) => canAdmin(data?.role)
  };
  
  const actions = {
    loadLocalUser: () => loadLocalUser(store),
    visitMainPage: () => location.href.endsWith("/login") && setTimeout(() => history.push("/"), 100),
    saveRole: (_, {data}) => { store.role = data?.role; }
  };

  const services = {
    loadRoles: () => asyncGet("api/roles").toPromise(),
    checkLogin: () => asyncGet("api/isLoggedIn").toPromise()
  };

  const [_, send] = useMachine(UserMachine({context: initialContext, actions, services, guards}), {devTools: true});
  const { i18n } = useTranslation("namespace1");
  const loadFailed = () => {

  };

  const loadOk = info => {
    store.info = info;
    setTitle(location.pathname, info.saloneName, info.name);
  };

  const loadTranslationFailed = () => {

  };

  useEffect(() => {
    Async.of(a => b => [a, b]).ap( asyncGet("api/translation/ru")).ap(asyncGet("api/translation/en")).fork(loadTranslationFailed, ([a, b]) => {
      loadTranslations("ru", a);
      loadTranslations("en", b);
      setDefaultLocale(loadLanguage());
    });
  }, []);


  useEffect(() => {
    asyncGet(`api/mainPage/${i18n.language}`).fork(loadFailed, loadOk);
  }, []);




  useEffect(() => {
    send("checkLogin");
    store.toast = toast;
  }, []);
  
  return (
    <>
      <Toast ref={toast} />
    </>

  );
}

export default withRouter(collect(Init));



