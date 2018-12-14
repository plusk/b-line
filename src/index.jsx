/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

import "./global.scss";

const root = document.getElementById("root");

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <React.Fragment>
          <Component />
        </React.Fragment>
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(App);
  });
}
