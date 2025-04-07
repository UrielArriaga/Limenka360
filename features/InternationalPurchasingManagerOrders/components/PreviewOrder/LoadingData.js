import { LinearProgress } from "@material-ui/core";
import React from "react";

export default function LoadingData() {
  return (
    <div className="load">
      <div className="load__img">
        <img src="/load.png" />
      </div>
      <div className="content_loadtext">
        <p>Cargando Productos</p>
        <LinearProgress color="primary" />
      </div>
    </div>
  );
}
