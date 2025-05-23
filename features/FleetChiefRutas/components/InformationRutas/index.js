import React from "react";
import { InformationRouteStyled } from "./styles";
import { toUpperCaseChart } from "../../../../utils";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";

export default function InformationRutas({ routeSelected }) {
  const { data } = routeSelected;

  const thereIsDatas = data => (data ? <p className="description">{data}</p> : <p className="na">N/A</p>);

  return (
    <InformationRouteStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información del Chofer</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Nombre:</p>
            <p>{thereIsDatas(data?.driver?.name)}</p>
          </div>
          <div className="label">
            <p className="name">Licencia:</p>
            {thereIsDatas(data?.driver?.license)}
          </div>
          <div className="label">
            <p className="name">RFC:</p>
            {thereIsDatas(data?.driver?.RFC)}
          </div>
          <div className="label">
            <p className="name">Fecha de expiracion:</p>
            {thereIsDatas(dayjs(data?.driver?.expiration_date).format("YYYY/MM/DD"))}
          </div>
        </div>
      </div>
      {console.log("data", data)}
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información de la Unidad</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Marca:</p>
            <p>{thereIsDatas(data?.transportunit?.brand)}</p>
          </div>
          <div className="label">
            <p className="name">Modelo:</p>
            {thereIsDatas(data?.transportunit?.model)}
          </div>
          <div className="label">
            <p className="name">Tarjeta de circulacion:</p>
            {thereIsDatas(data?.transportunit?.circulation_card)}
          </div>
          <div className="label">
            <p className="name">Número de motor:</p>
            {thereIsDatas(data?.transportunit?.engine_number)}
          </div>
          <div className="label">
            <p className="name">Póliza:</p>
            {thereIsDatas(data?.transportunit?.insurance_policy)}
          </div>
          <div className="label">
            <p className="name">Serie de vehículo:</p>
            {thereIsDatas(data?.transportunit?.vehicle_series)}
          </div>
          <div className="label">
            <p className="name">kilometraje:</p>
            {thereIsDatas(data?.transportunit?.mileage)}
          </div>
          <div className="label">
            <p className="name">Matricula:</p>
            {thereIsDatas(data?.transportunit?.tuition)}
          </div>
        </div>
      </div>
    </InformationRouteStyled>
  );
}
