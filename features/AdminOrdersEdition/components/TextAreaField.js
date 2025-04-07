import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/global.styles";

const TextAreaField = ({ label, name, placeholder, type = "text", register, rules, errors, handleChange }) => (
  <div className="inputItem">
    <div className="inputItem__title">
      <p className="inputItem__label">
        {label} <strong>*</strong>
      </p>
    </div>

    {name === "postalCodeInvoice" && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="inputItem__input"
        {...register(name, {
          ...rules,
          onChange: e => {
            handleChange(e);
          },
        })}
      />
    )}

    {name !== "postalCodeInvoice" && (
      <input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className="inputItem__input"
        {...register(name, rules)}
      />
    )}
  </div>

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
