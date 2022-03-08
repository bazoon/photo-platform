import React, {useEffect, useRef, useState} from "react";
import compose from "crocks/helpers/compose";
import map from "crocks/pointfree/map";
import identity from "crocks/combinators/identity";
import ifElse from "crocks/logic/ifElse";
import Result from "crocks/Result";
import tryCatch from "crocks/Result/tryCatch";
import chain from "crocks/pointfree/chain";
import { collect} from "react-recollect";
import { Toast } from "primereact/toast";
import useAuth from "./hooks/useAuth";
import {asyncGet} from "./api";
import Async from "crocks/Async";
import option from "crocks/pointfree/option";
import resultToMaybe from "crocks/Maybe/resultToMaybe";
import {useMachine} from "@xstate/react";
import UserMachine from "./UserMachine";
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {loadLanguage} from "./utils";
import i18n from "../core/i18n";
import {locale} from "primereact/api";
import {Helmet} from "react-helmet";

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


const getTitle = (pathname, saloneName, name) => {
  if (pathname === "/") {
    return saloneName;
  } else {
    return name;
  }
};

function Init({store}) {
  window.store = store;
  const history = useHistory();
  const toast = useRef();
  const {canAdmin} = useAuth();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const onChangleLocation = ({pathname}) => {
      setTitle(getTitle(pathname, store?.info?.saloneName, store?.info?.name));
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
    saveRole: (_, {data}) => { 
      store.role = data?.role;
      store.permissions = new Set(data?.permissions);
    },
    storeLoggedIn: (_, {data}) => { store.isLoggedIn = !!data.id;}
  };

  const services = {
    loadRoles: () => asyncGet("api/roles").toPromise(),
    checkLogin: () => asyncGet("api/isLoggedIn").toPromise(),
  };

  const [current, send] = useMachine(UserMachine({context: initialContext, actions, services, guards}), {devTools: true});
  const { i18n } = useTranslation("namespace1");
  const loadFailed = () => {

  };

  const loadOk = info => {
    store.info = info;
    const t = getTitle(location.pathname, store.info.saloneName, store.info.name);
    setTitle(t);
  };

  const loadTranslationFailed = () => {

  };

  useEffect(() => {
    Async.of(a => b => [a, b]).ap(asyncGet("api/translation/ru")).ap(asyncGet("api/translation/en")).fork(loadTranslationFailed, ([a, b]) => {
      const temps = {
        currentContest: "Текущий конкурс",
        status: "Статус",
        dateReg: "Дата регистрации",
        uploadPhoto: "Загрузить"
      };

      let aa = {...a, ...temps};
      let bb = {...b, ...temps};

      loadTranslations("ru", aa);
      loadTranslations("en", bb);
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="https://prirodacup.ru/" />
      </Helmet>
    </>

  );
}

export default withRouter(collect(Init));



