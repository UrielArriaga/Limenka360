import React from "react";
import { InformationProductStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import dayjs from "dayjs";

export default function InformationProduct({ orderSelectedData, inventory }) {
  const thereIsDatas = data => {
    if (data) {
      return <p className="description">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };

  return (
    <InformationProductStyled>
      <div className="information">
        <div className="information__title">
          <Assignment className="icon" />
          <h4>Información del producto</h4>
        </div>
        <div className="information__body">
          <div className="label">
            <p className="name">Producto:</p>
            {thereIsDatas(orderSelectedData?.name)}
          </div>
          <div className="label">
            <p className="name">Codigo:</p>
            {thereIsDatas(orderSelectedData?.code)}
          </div>
          <div className="label">
            <p className="name">Proveedor:</p>
            {thereIsDatas(orderSelectedData?.provider?.name)}
          </div>
          <div className="label">
            <p className="name">Categoria:</p>
            {thereIsDatas(orderSelectedData?.category?.name)}
          </div>
          <div className="label">
            <p className="name">Marca:</p>
            {thereIsDatas(orderSelectedData?.brand?.name)}
          </div>

          <div className="label">
            <p className="name">stock:</p>
            {orderSelectedData?.stock}
          </div>
          <div className="label">
            <p className="name">Fecha de Entrada:</p>
            {inventory?.inventoryentry ? dayjs(inventory?.inventoryentry?.createdAt).format("DD, MMMM YYYY") : "N/A"}
          </div>
          <div className="label">
            <p className="name">Fecha de Salida:</p>
            {inventory?.inventoryexit ? dayjs(inventory?.inventoryexit?.createdAt).format("DD, MMMM YYYY") : "N/A"}
          </div>
          <div className="label">
            <p className="name">Folio de Salida:</p>
            {inventory?.inventoryexit?.folio ? inventory?.inventoryexit?.folio : "N/A"}
          </div>
        </div>
      </div>
    </InformationProductStyled>
  );
}
