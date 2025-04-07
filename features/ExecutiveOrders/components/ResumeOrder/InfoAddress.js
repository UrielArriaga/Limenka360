import React from "react";
import { InfoAdd } from "../ProductsForm/styles";

export default function InfoAddress({
  formData,
}) {
  return <InfoAdd>

    <div className="sectionheader">
      <h1 className="title">Dirección de Envío</h1>
    </div>
    <div className="text">
      <p>Recibe: {formData?.receive}</p>
    </div>
    <div className="text">
      <p>Calle: {formData?.street}</p>
    </div>
    <div className="text">
      <p>Número interior: {formData?.int_number}</p>
    </div>
    <div className="text">
      <p>Número exterior: {formData?.ext_number}</p>
    </div>
    <div className="text">
      <p>Colonia: {formData?.cologneInvoice}</p>
    </div>
    <div className="text">
      <p>Codigo Postal: {formData?.postalCodeInvoice}</p>
    </div>
    <div className="text">
      <p>Tipo de Envio: {formData?.shippingtype?.name}</p>
    </div>
    <div className="text">
      <p>Estado: {formData?.entity?.name}</p>
    </div>
    <div className="text">
      <p>Municipio: {formData?.city?.name}</p>
    </div>
    <div className="text">
      <p>Telefono: {formData?.phoneInvoice}</p>
    </div>
    <div className="text">
      <p>Referencias: {formData?.references}</p>
    </div>

  </InfoAdd>;

}


