import React from "react";

import Button from "../Button/Button";

import "./Home.scss";

const Home = () => (
  <div>
    <h2 className="homeHeading">Home Page</h2>
    <div>
      <Button text="lorem" />
      <Button text="ipsum" />
    </div>
  </div>
);

export default Home;
