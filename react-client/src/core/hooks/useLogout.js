import {asyncPost} from "../api";

export default function(store) {
  
  const logoutFailed = () => {
    store.toast.current.show({severity: "error", summary: "logout_error"});
  };

  const logoutOk = () => {
    store.toast.current.show({severity: "info", summary: "logout_ok"});
    store.user = null;
    localStorage.clear();
  };


  function logout() {
    asyncPost("api/logout").fork(logoutFailed, logoutOk);
  }
  
  return logout;
}
