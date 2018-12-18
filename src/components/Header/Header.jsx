import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/005-search.png";

const Header = () => (
  <header className="HeaderContainer">
    <img className="HeaderLogo" src={logo} alt="logo" />
    <h1 className="HeaderHeading">B-Line</h1>
    <nav className="HeaderNav">
      <Link className="HeaderLink" to="/">
        Search
      </Link>
      <Link className="HeaderLink" to="/settings">
        Settings
      </Link>
      <Link className="HeaderLink" to="/favorites">
        Favorites
      </Link>
    </nav>
    <div className="HeaderSearch">
      <img className="HeaderSearchIcon" src={searchIcon} alt="searchIcon" />
      <input
        type="search"
        className="HeaderSearchInput"
        placeholder="Need help?"
      />
    </div>
  </header>
);

export default Header;
