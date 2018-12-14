import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/React-icon.png";

const Header = () => (
  <header className="HeaderContainer">
    <img className="HeaderLogo" src={logo} alt="logo" />
    <h1 className="HeaderHeading">B-Line</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
