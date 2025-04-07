import { LinearProgress } from "@material-ui/core";
import React from "react";
import { StylesContainer } from "./styled";

export default function LoaderData() {
  return (
    <StylesContainer>
      <div className="ctr_load">
        <div className="ctr_load__img">
          <img src="/load.png" />
        </div>
        <div className="ctr_load__load">
          <p>Cargando</p>
          <LinearProgress color="primary" />
        </div>
      </div>
    </StylesContainer>
  );
}
