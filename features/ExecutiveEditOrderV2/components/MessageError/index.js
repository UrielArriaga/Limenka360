import React from "react";
import styled from "styled-components";

export default function MessageError({ error }) {
  if (!error) return null;

  return <ErrorStyle>*{(error && error.message) || "Requerido"}</ErrorStyle>;
}

const ErrorStyle = styled.span`
  color: red;
  font-size: 12px;
  font-weight: bold;
`;
