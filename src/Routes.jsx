import React from "react";
import { Route, Switch } from "react-router-dom";
import Search from "./components/Search/Search";
import Settings from "./components/Settings/Settings";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Search} />
    <Route path="/settings" component={Settings} />
  </Switch>
);

export default Routes;
