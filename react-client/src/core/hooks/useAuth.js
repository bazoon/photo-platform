import { store } from "react-recollect";


const useAuth = () => {
  return {
    canAdmin: () => store.role === "admin" || store.role === "superAdmin",
    canModer: () => store.role === "moder",
    canSuperAdmin: () => store.role === "superAdmin",
    isLogged: () => store.role === "user"
  };
};

export default useAuth;
