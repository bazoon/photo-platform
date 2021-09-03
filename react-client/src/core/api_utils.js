import {store} from "react-recollect";
import identity from "crocks/combinators/identity";

const {asyncGet} = require("./api");

const load = ({api, params = {}}) => {
  const failed = () => {

  };

  const a = asyncGet(api, params);
  a.fork(failed, identity);
  return a;
};

export const loadRoles = () => {

  const loadRolesFailed = () => {};

  const loadRolesOk = ({role}) => {
    store.role = role;
  };

  const a = load({api: "api/roles"});
  a.fork(loadRolesFailed, loadRolesOk);
  return a;
};

export const loadUser = () => {
  const loadUserFailed = () => {

  };

  const loadUserOk = data => {
    store.user = data;
  };

  const a = load({api: "api/roles"});
  a.fork(loadUserFailed, loadUserOk);
  return a;
};
