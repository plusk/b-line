import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Favorites from "./components/Favorites/Favorites"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/settings" component={Settings} />
    <Route path="/favorites" component={Favorites} />
  </Switch>
);

export default Routes;
