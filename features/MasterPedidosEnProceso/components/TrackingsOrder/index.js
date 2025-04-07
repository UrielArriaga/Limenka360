import React from "react";
import { TrackingsOrderStyled } from "./styles";
import { Close } from "@material-ui/icons";

export default function TrackingsOrder({ open = true, handletoogle }) {
  return (
    <TrackingsOrderStyled open={open} anchor="right" onClose={() => handletoogle()}>
      <div className="header">
        <div className="header__title">
          <p>Historial de seguimientos</p>
        </div>

        <div className="header__close">
          <Close />
        </div>
      </div>
      <div className="newtracking"></div>
      <div className="trackings">
        <div className="trackings__title">
          <p>Seguimientos</p>
        </div>
      </div>
    </TrackingsOrderStyled>
  );
}
