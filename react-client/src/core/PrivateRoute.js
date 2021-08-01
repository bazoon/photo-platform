import React from "react";
import {Route, Redirect} from "react-router-dom";
import { store, collect } from "react-recollect";
import {Link} from "react-router-dom";


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
