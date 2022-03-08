import {typeCheck} from "type-check";

window.typeCheck = typeCheck;

const useAuth = (permissions = new Set([])) => {
  console.assert(typeCheck("Set", permissions), "typeCheck failed");

  return {
    can: ps => {
      console.assert(typeCheck("[String]", ps), "typeCheck failed");
      if (permissions.has("all")) return true;
      return ps.some(p => permissions.has(p));
    },
    canNot: ps => {
      console.assert(typeCheck("[String]", ps), "typeCheck failed");
      if (permissions.has("all")) {
        return false;
      }
      return !ps.some(p => permissions.has(p));
    }
  };
};
export default useAuth;

