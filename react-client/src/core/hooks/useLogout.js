import {asyncPost} from "../api";
import {loadRoles} from "../api_utils";

export default function(store) {
  
  const logoutFailed = () => {
    store.toast.current.show({severity: "error", summary: "logout_error"});
  };

  const logoutOk = () => {
    store.toast.current.show({severity: "info", summary: "logout_ok"});
    store.user = null;
    store.isLoggedIn = false;
    loadRoles();
    localStorage.clear();
  };


  function logout() {
    asyncPost("api/logout").fork(logoutFailed, logoutOk);
  }
  
  return logout;
}
