import React from "react";
import { Link } from "react-router-dom";
import Routes from "../Routes";

import "./App.scss";

import reactLogo from "../assets/React-icon.png";

const App = () => (
  <div className="AppContainer">
    <header className="AppHeader">
      <h1 className="AppHeaderHeading">Hello World!</h1>
      <img className="AppHeaderImage" alt="react logo" src={reactLogo} />
    </header>
    <main className="AppContent">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <hr />
      <Routes />
    </main>
  </div>
);

export default App;
