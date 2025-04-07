import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/global.styles";

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  rules = {
    required: "Requerido",
  },
  errors,
  handleChange,
  disabled = false,
}) => (
  <InputFieldStyled>
    <div className="inputItem__title">
      <p className="inputItem__label">
        {label} <strong>*</strong> {errors[name] && <p>Requerido</p>}
      </p>
    </div>

    {/* <input
      onChange={
        name === "address.postalCode" || name === "billing.postalCode"
          ? e => {
              handleChange(e);
              if (rules?.onChange) rules.onChange(e);
            }
          : handleChange
      }
      type={type}
      placeholder={placeholder}
      className="input_form"
      disabled={disabled}
      {...register(name, rules)}
    /> */}

    {name === "address.postalCode" && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="input_form"
        disabled={disabled}
        {...register(name, {
          ...rules,
          onChange: e => {
            handleChange(e);
          },
        })}
      />
    )}

    {name === "billing.postalCode" && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="input_form"
        disabled={disabled}
        {...register(name, {
          ...rules,
          onChange: e => {
            handleChange(e);
          },
        })}
      />
    )}

    {(name !== "address.postalCode" || name !== "billing.postalCode") && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="input_form"
        disabled={disabled}
        {...register(name, rules)}
      />
    )}

    {/* {name !== "billing.postalCode" && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="input_form"
        disabled={disabled}
        {...register(name, rules)}
      />
    )} */}
  </InputFieldStyled>

  //   <div className="itemGlobal">
  //     <div className="ContentTitleandAlert">
  //       <p>
  //         {label} <strong>*</strong>
  //       </p>
  //       {errors[name] && (
  //         <>
  //           <div className="point"></div>
  //           <Error>{errors[name]?.message}</Error>
  //         </>
  //       )}
  //     </div>
  //     <input type={type} placeholder={placeholder} className="input" {...register(name, rules)} />
  //   </div>
);

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
