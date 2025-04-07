import React from "react";
import { InformationProductStyled } from "./styles";
import { Assignment } from "@material-ui/icons";

export default function InformationProductRecolecion({
  pickupsSelect,
  pickuppurchaseorderData,
  suppliesData,
  suppliesWarehouseProducts,
}) {
  const thereIsDatas = data => {
    if (data) {
      return <p className="description">{data}</p>;
    } else {
      return <p className="na">S/N</p>;
    }
  };


  console.log(suppliesWarehouseProducts, " suplie3ssssss");
  
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
            {thereIsDatas(pickupsSelect?.folioOrder)}
          </div>
          <div className="label">
            <p className="name">Télefono:</p>
            {thereIsDatas(pickuppurchaseorderData?.phone)}
          </div>
          <div className="label">
            <p className="name">Observaciones:</p>
            {thereIsDatas(pickuppurchaseorderData?.observations)}
          </div>
          <div className="label">
            <p className="name">Nacional:</p>
            {thereIsDatas(pickuppurchaseorderData?.national)}
          </div>
          <div className="label">
            <p className="name">Método de Entrega:</p>
            {thereIsDatas(pickuppurchaseorderData?.methoddelivery)}
          </div>
          <div className="label">
            <p className="name">Proveedor:</p>
            {thereIsDatas(pickuppurchaseorderData?.provider)}
          </div>
          <div className="label">
            <p className="name">Fecha de Entrega Estimada:</p>
            {thereIsDatas(pickuppurchaseorderData?.estimateddeliverydate)}
          </div>
          <div className="label">
            <p className="name">Fecha de Recolección Estimada:</p>
            {thereIsDatas(pickuppurchaseorderData?.deliveryDate)}
          </div>
        </div>
      </div>
      <div className="table">
        <p className="title">Productos</p>
        <div className="products">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {(suppliesData || []).length > 0 ? (
                suppliesData.map((supply, index) => (
                  <tr key={index}>
                    <td>{supply.code}</td>
                    <td>{supply.product}</td>
                    <td>{supply.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="table">
        <p className="title">Articulos</p>
        <div className="products">
          <table>
            <thead>
              <tr>
                <th>Serial</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {(suppliesWarehouseProducts?.data || []).length > 0 ? (
                suppliesWarehouseProducts?.data?.map((supply, index) => (
                  <tr key={index}>
                    <td>{supply?.serialnumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </InformationProductStyled>
  );
}
