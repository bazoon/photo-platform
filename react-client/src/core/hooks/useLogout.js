import {asyncPost} from "../api";
import {loadRoles} from "../api_utils";

export default function(store) {
  
  const logoutFailed = () => {
    store.toast.current.show({severity: "error", summary: "logout_error"});
  };

  const logoutOk = () => {
    store.user = null;
    store.isLoggedIn = false;
    store.permissions = new Set([]);
    loadRoles().fork(logoutFailed, ({roles}) => store.roles = roles);
    localStorage.clear();
  };


  function logout() {
    asyncPost("api/logout").fork(logoutFailed, logoutOk);
  }
  
  return logout;
}
