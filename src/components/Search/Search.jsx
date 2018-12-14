import React from "react";

import "./Search.scss";

const Search = () => (
  <div className="SearchContainer">
    <input
      className="SearchInput"
      type="search"
      name="source"
      placeholder="Where from?"
    />
    <input
      className="SearchInput"
      type="search"
      name="destination"
      placeholder="Where to?"
    />
  </div>
);

export default Search;
