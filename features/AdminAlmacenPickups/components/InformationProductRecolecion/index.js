import React from "react";
import { InformationProductStyled } from "./styles";
import { toUpperCaseChart } from "../../../../utils";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";
import { ContainerStyled } from "../../../DepAttendantOrders/components/PreviewPurchase/styled";

export default function InformationProductRecolecion({ pickupsSelect,dataOutputs, dataEntrance}) {

  const thereIsDatas = data => {
    if (data) {
      return <p className="description">{data}</p>;
    } else {
      return <p className="na">S/N</p>;
    }
  };
  console.log("Data_____", pickupsSelect);


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
          <p>{pickupsSelect?.folio || "Sin folio"}</p>
        </div>
        <div className="label">
          <p className="name">Chofer:</p>
          {thereIsDatas(pickupsSelect?.driver)}
           </div>
           <div className="label">
          <p className="name">Unidad:</p>
          <p>{pickupsSelect.model} ({pickupsSelect.tuition})</p>
           </div>
        <div className="label">
          <p className="name">Observaciones:</p>
          <p>{pickupsSelect?.description}</p>
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
          <p className="name">Fecha de Entrega: </p>
          <p>{pickupsSelect?.estimateddeliverydate || "Sin fecha"}</p>
        </div> 

      </div> 
    </div>
       <ContainerStyled>
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
        {dataOutputs?.length > 0 ? (
          dataOutputs.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
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
</ContainerStyled>

    </InformationProductStyled>
  );
}
