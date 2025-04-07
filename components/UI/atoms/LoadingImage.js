import { LinearProgress } from "@material-ui/core";
import React from "react";

export default function LoadingImage() {
  return (
    <div className="ctr_load">
      <div className="ctr_load__img">
        <img src="/load.png" />
      </div>
      <div className="ctr_load__load">
        <p>Cargando</p>
        <LinearProgress color="primary" />
      </div>
    </div>
  );
}
