import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/logo.svg";

const Header = () => (
  <header className="HeaderContainer">
    <img className="HeaderLogo" src={logo} alt="logo" />
    <h1 className="HeaderHeading">B-Line</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Search</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
