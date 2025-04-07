import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/global.styles";
import MessageError from "./MessageError";

const TextAreaField = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  rules,
  errors,
  handleChange,
  disabled = false,
}) => (
  <TextAreaFielStyled className="inputItem">
    <div className="inputItem__title">
      <p className="inputItem__label">
        {label} <strong>*</strong>
        <MessageError error={errors[name]} />
      </p>
    </div>

    {name === "postalCodeInvoice" && (
      <textarea
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="textarea_form"
        disabled={disabled}
        {...register(name, {
          ...rules,
          onChange: e => {
            handleChange(e);
          },
        })}
      />
    )}

    {name !== "postalCodeInvoice" && (
      <textarea
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="textarea_form"
        disabled={disabled}
        {...register(name, rules)}
      />
    )}
  </TextAreaFielStyled>
);
const TextAreaFielStyled = styled.div`
  .textarea_form {
    width: 100%;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    resize: none;
    outline: none;
    padding: 5px;
    font-size: 12px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }

  .inputItem {
    &___title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__label {
      font-size: 13px;
      margin-bottom: 5px;
      color: grey;
    }

    strong {
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
export default TextAreaField;
