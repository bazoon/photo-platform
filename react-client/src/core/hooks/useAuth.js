const useAuth = () => {
  return {
    canAdmin: role => role?.name === "admin" || role?.name === "superAdmin",
    canModer: role => role?.name === "moder",
    canSuperAdmin: role => role?.name === "superAdmin",
    isLogged: role => role?.name === "user"
  };
};
export default useAuth;
