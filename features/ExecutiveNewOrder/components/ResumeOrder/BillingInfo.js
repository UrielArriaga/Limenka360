import React from "react";
// import { BillingInf } from "../ProductsForm/styles";

export default function BillingInfo({ formData }) {
  console.log(formData);
  const { billing = {} } = formData;
  return (
    <div>
      <div className="sectionheader">
        <h1 className="title">Facturación</h1>
      </div>
      <div className="text">
        <p>Razón Social: {billing?.businessName}</p>
      </div>
      <div className="text">
        <p>RFC: {billing?.rfc}</p>
      </div>
      <div className="text">
        <p>Uso de CFDI: {billing?.cfdiId?.name}</p>
      </div>
      <div className="text">
        <p>Metodo de Pago: {billing?.paymentMethod?.name}</p>
      </div>
      <div className="text">
        <p>Forma de Pago: {billing?.waytoPay?.name}</p>
      </div>
      <div className="text">
        <p>Regimen Fiscal: {billing?.taxregime?.name}</p>
      </div>
      <div className="text">
        <p>Telefono: {billing?.phone}</p>
      </div>
      <div className="text">
        <p>Calle: {billing?.address?.street}</p>
      </div>
      <div className="text">
        <p>Número interior: {billing?.address?.int_number}</p>
      </div>
      <div className="text">
        <p>Número exterior: {billing?.address?.ext_number}</p>
      </div>
      <div className="text">
        <p>Colonias: {billing?.address?.settlement}</p>
      </div>
      <div className="text">
        <p>Código Postal: {billing?.address?.postalCode}</p>
      </div>
      <div className="text">
        <p>Estado: {billing?.address?.entity?.name}</p>
      </div>
      <div className="text">
        <p>Municipio: {billing?.address?.city?.name}</p>
      </div>
    </div>
  );
}
