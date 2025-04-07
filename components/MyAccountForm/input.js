// Input.js
import React from "react";

const Input = ({ defaultValue, register, name, placeholder, errors }) => (
  <div style={{ marginBottom: "5px" }}>
    <p style={{ fontWeight: "550" }}>{placeholder}</p>
    <input
      {...register(name, { required: true })}
      placeholder={placeholder}
      style={inputStyle}
      defaultValue={defaultValue}
      disabled
    />
    {errors[name] && <span>{placeholder} es requerido</span>}
  </div>
);

const inputStyle = {
  width: "100%",
  height: "35px",
  border: "0.1px solid rgb(180 180 180)",
  borderRadius: "10px",
  color: "#000",
  fontSize: "0.8125rem",
  fontWeight: "400",
  lineHeight: "1.5",
  padding: "0.47rem 0.75rem",
  marginTop: "5px",
};

export default Input;
