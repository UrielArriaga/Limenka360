import React from "react";
import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
const ErrorMessage = ({ message }) => {
  return (
    <>
      <div className="point"></div>
      <Error className="error-message">{message}</Error>
    </>
  );
};

export default ErrorMessage;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    min-width: 100px;
    /* width: 40%; */
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
