import React from "react";

import { toUpperCaseChart } from "../../../../utils";
import { Assignment } from "@material-ui/icons";
import { InformationOrderStyled } from "./styles";

export default function InformationOrder({ pickupsSelect }) {
  const thereIsDatas = data => {
    if (data) {
      return <span className="description">{data}</span>;
    } else {
      return <span className="na">S/N</span>;
    }
  };
  {
    console.log("pickupsSelect", pickupsSelect);
  }

  return (
    <InformationOrderStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información de Orden</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Folio de Orden:</p>
            <p>{thereIsDatas(pickupsSelect?.order?.folio)}</p>
          </div>
          <div className="label">
            <p className="name">Télefono:</p>
            {thereIsDatas(pickupsSelect?.order?.phone)}
          </div>
          <div className="label">
            <p className="name">Metodo de entrega:</p>
            {thereIsDatas(pickupsSelect?.observations)}
          </div>
          <div className="label">
            <p className="name">Condiciones de pago:</p>
            {thereIsDatas(pickupsSelect?.national)}
          </div>
          <div className="label">
            <p className="name">Metodo de Entrega:</p>
            {thereIsDatas(pickupsSelect?.methoddelivery)}
          </div>
          <div className="label">
            <p className="name">Observaciones:</p>
            {thereIsDatas(pickupsSelect?.providerId)}
          </div>
        </div>
      </div>
    </InformationOrderStyled>
  );
}
