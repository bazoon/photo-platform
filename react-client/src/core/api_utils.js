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
  return asyncGet("api/roles");
};

export const loadUser = () => {
  const loadUserFailed = () => {

  };

  const loadUserOk = (data, store) => {
    store.user = data;
  };

  const a = load({api: "api/roles"});
  a.fork(loadUserFailed, loadUserOk);
  return a;
};
