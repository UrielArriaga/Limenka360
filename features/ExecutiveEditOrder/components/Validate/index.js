import React from "react";
import styled from "styled-components";

export default function Validate({ message }) {
  return <ErrorStyle>*{message && message}</ErrorStyle>;
}

const ErrorStyle = styled.span`
  color: red;
  font-size: 12px;
  font-weight: bold;
`;
