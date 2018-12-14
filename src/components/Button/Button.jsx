import React from "react";
import "./Button.scss";

const Button = ({ text }) => (
  <button className="buttonContainer">{text}</button>
);

export default Button;
