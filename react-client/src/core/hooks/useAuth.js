const useAuth = () => {
  return {
    canAdmin: role => role === "admin" || role === "superAdmin",
    canModer: role => role === "moder",
    canSuperAdmin: role => role === "superAdmin",
    isLogged: role => role === "user"
  };
};

export default useAuth;
