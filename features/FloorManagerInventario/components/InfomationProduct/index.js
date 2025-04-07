import React from "react";
import { InformationProductStyled } from "./styles";
import { toUpperCaseChart } from "../../../../utils";
import { Assignment } from "@material-ui/icons";

export default function InformationProduct({ orderSelectedData }) {
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
            <p>{thereIsDatas(orderSelectedData?.name)}</p>
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
        </div>
      </div>
    </InformationProductStyled>
  );
}
