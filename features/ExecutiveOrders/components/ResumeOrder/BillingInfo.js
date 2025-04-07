import React from "react";
import { BillingInf } from "../ProductsForm/styles";

export default function BillingInfo({ formData }) {
  return (
    <BillingInf>
      <div className="sectionheader">
        <h1 className="title">Facturación</h1>
      </div>
      <div className="text">
        <p>Razón Social: {formData?.businessName}</p>
      </div>
      <div className="text">
        <p>RFC: {formData?.rfc}</p>
      </div>
      <div className="text">
        <p>Uso de CFDI: {formData?.cfdiId?.name}</p>
      </div>
      <div className="text">
        <p>Metodo de Pago: {formData?.paymentMethod?.name}</p>
      </div>
      <div className="text">
        <p>Forma de Pago: {formData?.waytoPay?.name}</p>
      </div>
      <div className="text">
        <p>Regimen Fiscal: {formData?.taxregime?.name}</p>
      </div>
      <div className="text">
        <p>Telefono: {formData?.phoneInvoice}</p>
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
        <p>Colonias: {formData?.cologneInvoice}</p>
      </div>
      <div className="text">
        <p>Código Postal: {formData?.postalCodeInvoice}</p>
      </div>
      <div className="text">
        <p>Estado: {formData?.entity?.name}</p>
      </div>
      <div className="text">
        <p>Municipio: {formData?.city?.name}</p>
      </div>
    </BillingInf>
  );
}
