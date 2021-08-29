import React, {useEffect} from "react";
import {asyncPost, asyncGet} from "../core/api";
import useAsync from "../core/hooks/useAsync";
import {collect} from "react-recollect";
import {withRouter} from "react-router-dom";

const ConfirmEmail = ({history, store}) => {
  const [data, isLoading, {post}] = useAsync(); 



  useEffect(() => {
    const token = location.href.split("/")[4];
    post("api/confirm-email", {token});
  }, []);


  useEffect(() => {
    if (data && data.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      asyncGet("api/roles").fork(() => {}, ({role}) => {
        store.role = role;
      });
      store.user = data;
      history.push("/");
    }
  }, [data]);

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg text-bright font-header text-center mt-24">
          {
            isLoading && "Идет проверка...."
          }
          {
            data && "redirecting..."
          }
        </div>
      </div>
    </div>
  );
};

export default withRouter(collect(ConfirmEmail));
