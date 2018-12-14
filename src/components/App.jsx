import React from "react";
import Routes from "../Routes";

import Map from "./Map";
import Header from "./Header/Header";

import "./App.scss";

const App = () => (
  <div>
    <Map />
    <Header />
    <div className="AppContainer">
      <main className="AppContent">
        <Routes />
      </main>
    </div>
  </div>
);

export default App;
