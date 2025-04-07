import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/global.styles";

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  rules = {},
  errors,
  handleChange,
  disabled = false,
  isRequired = true,
}) => {
  const validationRules = {
    ...rules,
    required: isRequired ? "Requerido" : false,
  };

  if (type === "date") {
    return (
      <InputFieldStyled>
        <div className="inputItem__title">
          <p className="inputItem__label">
            {label} {isRequired && <strong>*</strong>} {errors[name] && <p>Requerido</p>}
          </p>
        </div>

        <input
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          className="input_form"
          disabled={disabled}
          {...register(name, validationRules)}
          onFocus={e => e.target.showPicker && e.target.showPicker()} // Asegura que el calendario se abra
        />
      </InputFieldStyled>
    );
  }

  return (
    <InputFieldStyled>
      <div className="inputItem__title">
        <p className="inputItem__label">
          {label} {isRequired && <strong>*</strong>} {errors[name] && <p>Requerido</p>}
        </p>
      </div>

      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="input_form"
        disabled={disabled}
        {...register(name, {
          ...validationRules,
          onChange: e => handleChange && handleChange(e),
        })}
      />
    </InputFieldStyled>
  );
};
const InputFieldStyled = styled.div`
  .input_form {
    width: 100%;
    height: 35px;
    font-size: 13px;
    outline: none;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .inputItem__title {
    display: flex;
    justify-content: space-between;
  }

  .inputItem__label {
    font-size: 13px;
    color: #333;
    font-weight: 500;
    margin-bottom: 5px;

    strong {
      font-weight: bold;
      color: red;
    }
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
export default InputField;
