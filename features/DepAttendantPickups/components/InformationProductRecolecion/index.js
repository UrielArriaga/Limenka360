import React from "react";
import { InformationProductStyled } from "./styles";
import { Assignment } from "@material-ui/icons";

export default function InformationProductRecolecion({ pickupsSelect, dataEntrance, dataOutputs,isFetchingExit }) {
  const thereIsDatas = data => {
    if (data) {
      return <p className="description">{data}</p>;
    } else {
      return <p className="na">S/N</p>;
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
            <p className="name">Folio de orden de compra:</p>
            <p>{dataEntrance?.[0]?.purchaseorder?.folio || "Sin folio"}</p>
          </div>
          <div className="label">
            <p className="name">Chofer:</p>
            {thereIsDatas(pickupsSelect?.driver)}
          </div>
          <div className="label">
            <p className="name">Unidad:</p>
            <p>
              {pickupsSelect.model} ({pickupsSelect.tuition})
            </p>
          </div>
          <div className="label">
            <p className="name">Obsesvaciones:</p>
            {thereIsDatas(pickupsSelect?.description)}
          </div>
          <div className="label">
            <p className="name">Nacional:</p>
            <p>{dataEntrance?.[0]?.purchaseorder?.national ? "Nacional" : "Internacional"}</p>
          </div>
          <div className="label">
            <p className="name">Metodo de Entrega:</p>
            <p>{dataEntrance?.[0]?.purchaseorder?.methoddelivery || "Sin metodo"}</p>
          </div>
          <div className="label">
            <p className="name">Proveedor:</p>
            <p>{dataEntrance?.[0]?.purchaseorder?.provider?.companyname || "Sin proveedor"}</p>
          </div>
          <div className="label">
            <p className="name">Fecha de Entrega estimada:</p>
            <p>{dataEntrance?.[0]?.purchaseorder?.deliverydatestimate || "Sin fecha"}</p>
          </div>
        </div>
      </div>
      <div className="contentpreview__products">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Cantidad</th>
            </tr>
          </thead>

          <tbody className="bodyTable">
  {isFetchingExit ? (
    <tr>
      <td colSpan="3" style={{ textAlign: "center", fontWeight: "bold" }}>
        Cargando datos...
      </td>
    </tr>
  ) : (
    dataOutputs?.length > 0 ? (
      dataOutputs.map((item, index) => (
        <tr key={index}>
          <td>{item.code}</td>
          <td>{item.product}</td>
          <td>{item.quantity}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" style={{ textAlign: "center" }}>
          No hay datos disponibles
        </td>
      </tr>
    )
  )}
</tbody>

        </table>
      </div>
    </InformationProductStyled>
  );
}
