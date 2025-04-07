import React, { useEffect } from "react";
import { ProviderDataStyled } from "./styles";
import { Assignment } from "@material-ui/icons";

function ProviderData({ dataProvider }) {
  useEffect(() => {}, [dataProvider]);
  return <ProviderDataStyled>
    <h4 className="title"><Assignment className="icon"/> <span>Detalles del Proveedor</span></h4>
    <div className="dataProvider">
        <p className="dataProvider__item"><b>Compañia:</b> {dataProvider?.companyname || dataProvider?.name}</p>
        <p className="dataProvider__item"><b>Contacto:</b> {dataProvider?.fullname}</p>
        <p className="dataProvider__item"><b>Identificador:</b> {dataProvider?.identifier}</p>
        <p className="dataProvider__item"><b>RFC:</b> {dataProvider?.rfc}</p>
        <p className="dataProvider__item"><b>NIFCIF:</b> {dataProvider?.nifcif}</p>
        <p className="dataProvider__item"><b>Correo:</b> {dataProvider?.email}</p>
        <p className="dataProvider__item"><b>Telefono:</b> {dataProvider?.phone}</p>
        <p></p>
    </div>
  </ProviderDataStyled>;
}

export default ProviderData;
