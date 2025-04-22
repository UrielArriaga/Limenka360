import React from "react";
import { WelcomeDatePickerStyled } from "./styled";
import { Assignment } from "@material-ui/icons";

export default function WelcomeDatePicker() {
  return (
    <WelcomeDatePickerStyled>
      <div className="greeting">
        <h1>Bienvenido a LIMENKA360</h1>
        <Assignment className="greting-icon" />
      </div>

      <div className="daterange"></div>
    </WelcomeDatePickerStyled>
  );
}
