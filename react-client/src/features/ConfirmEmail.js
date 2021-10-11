import React, {useEffect} from "react";
import {asyncPost, asyncGet} from "../core/api";
import {collect} from "react-recollect";
import {withRouter} from "react-router-dom";
import {useMachine} from "@xstate/react";
import UserMachine from "../core/UserMachine";
import useAuth from "../core/hooks/useAuth";

const initialContext = {
  user: {},
  role: "",
  success: undefined
};

const {canAdmin} = useAuth();

const guards = {
  hasAuth: (_, {data}) => canAdmin(data?.role)
};

const ConfirmEmail = ({history, store}) => {
  const actions = {
    visitMainPage: () => setTimeout(() => history.push("/"), 100),
    saveUser: (_, {data}) => { 
      localStorage.setItem("user", JSON.stringify(data)); 
      store.user = data;
    },
    saveRole: (_, {data}) => { store.role = data?.role; }
  };

  const services = {
    confirmEmail: () => {
      const token = location.href.split("/")[4];
      return asyncPost("api/confirm-email", {token}).toPromise();
    },
    loadRoles: () => asyncGet("api/roles").toPromise(),
  };

  const [_, send] = useMachine(UserMachine({context: initialContext, services, actions, guards}), {devTools: true});

  useEffect(() => {
    send("confirmEmail");
  }, []);

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-semi-bright font-header text-center mt-24">
        </div>
      </div>
    </div>
  );
};

export default withRouter(collect(ConfirmEmail));
