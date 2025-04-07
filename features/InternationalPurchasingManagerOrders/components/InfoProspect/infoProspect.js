import React from "react";
import { InfoProspectStyles } from "./styles";

function InfoProspect({ dataProspect }) {
  return (
    <InfoProspectStyles>
      <div className="contentpreview__address--item">
        <p>Nombre:</p>
        <p className="hightligth">{dataProspect?.fullname}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Correo:</p>
        <p className="hightligth">{dataProspect?.email || "N/A"}</p>
      </div>
      <div className="contentpreview__address--item">
        <p>Telefono:</p>
        <p className="hightligth">{dataProspect?.phone || "N/A"}</p>
      </div>
    </InfoProspectStyles>
  );
}

export default InfoProspect;
