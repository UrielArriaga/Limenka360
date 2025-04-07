import React from "react";
import { LoaderStyle } from "./style";
import { LinearProgress } from "@material-ui/core";

export default function LoaderPreview() {
  return (
    <LoaderStyle>
      <div className="loader_preview">
        <div className="loader_preview__img">
          <img src="/load.png" />
        </div>
        <div className="loader_preview__load">
          <p>Cargando</p>
          <LinearProgress color="primary" />
        </div>
      </div>
    </LoaderStyle>
  );
}
