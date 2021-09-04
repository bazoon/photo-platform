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

const safe = pred =>
  ifElse(pred, Result.Ok, Result.Err);

function Init({store}) {
  const toast = useRef();

  const loadLocalUser = () => {
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

  useEffect(() => {
    const user = loadLocalUser();
    store.user = user;
  }, []);
  
  return (
    <>
      <Toast ref={toast} />
    </>

  );
}

export default collect(Init);



