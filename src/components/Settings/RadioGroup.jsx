import React from "react";

const RadioGroup = ({ title, values, selected, handleChange }) => {
  const radios = values.map((value, key) => (
    <label key={key}>
      <input
        type="radio"
        checked={selected === value}
        onChange={handleChange}
        value={value}
      />{" "}
      {value}
    </label>
  ));
  return (
    <div className="RadioGroup">
      <h3>{title}</h3>
      <div className="RadioGroupRadios">{radios}</div>
    </div>
  );
};

export default RadioGroup;
