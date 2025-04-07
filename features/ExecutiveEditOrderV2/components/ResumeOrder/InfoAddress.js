import React from "react";
import styled from "styled-components";

export default function InfoAddress({ formData }) {
  return (
    <div>
      <div className="sectionheader">
        <h1 className="title">Dirección de Envío</h1>
      </div>
      <div className="text">
        <p>Recibe: {formData?.address?.receive}</p>
      </div>
      <div className="text">
        <p>Calle: {formData?.address?.street}</p>
      </div>
      <div className="text">
        <p>Número interior: {formData?.address?.int_number}</p>
      </div>
      <div className="text">
        <p>Número exterior: {formData?.address?.ext_number}</p>
      </div>
      <div className="text">
        <p>Colonia: {formData?.address?.settlement}</p>
      </div>
      <div className="text">
        <p>Codigo Postal: {formData?.address?.postalCode}</p>
      </div>
      <div className="text">
        <p>Tipo de Envio: {formData?.address?.shippingtype?.name}</p>
      </div>
      <div className="text">
        <p>Estado: {formData?.address?.entity?.name}</p>
      </div>
      <div className="text">
        <p>Municipio: {formData?.address?.city?.name}</p>
      </div>
      <div className="text">
        <p>Telefono: {formData?.phone}</p>
      </div>
      <div className="text">
        <p>Referencias: {formData?.address?.references}</p>
      </div>
    </div>
  );
}

const InfoAddressStyled = styled.div``;
