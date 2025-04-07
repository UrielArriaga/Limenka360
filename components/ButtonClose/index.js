import React from "react";
import { ButtonStyle } from "./style";
import { ArrowForwardIos } from "@material-ui/icons";
export default function ButtonClose({ close }) {
  return (
    <ButtonStyle>
      <div className="hiddeButton" onClick={() => close()}>
        <ArrowForwardIos />
      </div>
    </ButtonStyle>
  );
}
