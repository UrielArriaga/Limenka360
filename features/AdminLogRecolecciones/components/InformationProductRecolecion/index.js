import React from "react";
import { InformationProductStyled } from "./styles";
import { toUpperCaseChart } from "../../../../utils";
import { Assignment } from "@material-ui/icons";

export default function InformationProductRecolecion({ pickupsSelect }) {
  const thereIsDatas = data => {
    if (data) {
      return <span className="description">{data}</span>;
    } else {
      return <span className="na">S/N</span>;
    }
  };

  return (
    <InformationProductStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información de la recolección</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Folio:</p>
            <p>{thereIsDatas(pickupsSelect?.folio)}</p>
          </div>
          <div className="label">
            <p className="name">Télefono:</p>
            {thereIsDatas(pickupsSelect?.phone)}
          </div>
          <div className="label">
            <p className="name">Obsesvaciones:</p>
            {thereIsDatas(pickupsSelect?.observations)}
          </div>
          <div className="label">
            <p className="name">Nacional:</p>
            {thereIsDatas(pickupsSelect?.national)}
          </div>
          <div className="label">
            <p className="name">Metodo de Entrega:</p>
            {thereIsDatas(pickupsSelect?.methoddelivery)}
          </div>
          <div className="label">
            <p className="name">Proveedor:</p>
            {thereIsDatas(pickupsSelect?.providerId)}
          </div>
          <div className="label">
          <div className="label">
          <p className="name">Direccion de recoleción:</p>
          <span>{thereIsDatas(pickupsSelect?.street)}</span>
          <span>{thereIsDatas(pickupsSelect?.ext_number)},</span>
          <span>{thereIsDatas(pickupsSelect?.settlement)}</span>
          <span>{thereIsDatas(pickupsSelect?.city)},</span>
          <span>{thereIsDatas(pickupsSelect?.entity)}</span>
        </div>
          </div>
          <div className="label">
            <p className="name">Fecha de Entrega estimada:</p>
            {thereIsDatas(pickupsSelect?.estimateddeliverydate)}
          </div>
        </div>
      </div>
    </InformationProductStyled>
  );
}
