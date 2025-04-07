import React from "react";
import { RequiredStyle } from "./styles";

export default function Required({ message }) {
  return <RequiredStyle>*{message ? message : ""}</RequiredStyle>;
}
