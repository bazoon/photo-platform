import React from "react";
import {Route, Redirect} from "react-router-dom";
import { collect } from "react-recollect";

function PrivateRoute({ children, path, can, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        can() ? (
          children
        ) : (
          <Redirect to={`/login?from=${path}`}/>
        )
      }
    />
  );
}

export default(collect(PrivateRoute));
