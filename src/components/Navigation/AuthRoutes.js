import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Pages/Auth/";
import { OverallAdmin } from "../Paths";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
