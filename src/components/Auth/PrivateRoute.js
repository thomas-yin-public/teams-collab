import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ userToken, children }) {
  return <Route>{!userToken ? <Redirect to="/login" /> : children}</Route>;
}

export default PrivateRoute;
