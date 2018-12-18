import React from "react";

const FavoriteField = ({ name, icon, value, handleChange }) => (
  <div className="FavoriteField">
    <img src={icon} alt={name} />
    <input
      id={name}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={name + " address"}
    />
  </div>
);

export default FavoriteField;
