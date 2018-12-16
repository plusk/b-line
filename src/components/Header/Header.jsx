import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/005-search.png";

const Header = () => (
  <header className="HeaderContainer">
    <img className="HeaderLogo" src={logo} alt="logo" />
    <h1 className="HeaderHeading">B-Line</h1>
    <nav className="LinkContainer">
      <ul>
        <li>
          <Link className="HeaderLink" to="/">Search</Link>
        </li>
        <li>
          <Link className="HeaderLink" to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
    <div className="Search">
      <img className="fa fa-icon" src={searchIcon} alt="searchIcon" />
      <input type="text" name="search" placeholder="What can we help you with?" />
    </div> 
  </header>
);

export default Header;
