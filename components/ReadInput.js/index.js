import React from "react";

export default function ReadInput({ label, value, isDisable }) {
  return (
    <div className="input">
      <div className="input__text">
        <p>{label}</p>
      </div>
      <input type="text" defaultValue={value} className="input__input" readOnly disabled={isDisable} />
    </div>
  );
}
