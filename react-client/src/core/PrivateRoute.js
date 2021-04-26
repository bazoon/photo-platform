import React from "react";
import {Route, Redirect} from "react-router-dom";
import { store, collect } from "react-recollect";
import {Link} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.user && store.user.nick_name ? (
          children
        ) : (
          <Link to="/login">Login</Link>
        )
      }
    />
  );
}

export default(collect(PrivateRoute));
