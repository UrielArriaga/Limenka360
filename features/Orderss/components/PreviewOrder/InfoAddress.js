import React from "react";
import styled from "styled-components";
export default function InfoAddress({ orderData }) {
  console.log("order", orderData);
  let fields = [
    { label: "Recibe:", value: orderData?.receive },
    { label: "Teléfono:", value: orderData?.phone },
    { label: "Calle:", value: orderData?.address?.street },
    { label: "Número Interior:", value: orderData?.address?.int_number },
    { label: "Número Exterior:", value: orderData?.address?.ext_number },
    { label: "Colonia:", value: orderData?.address?.settlement },
    { label: "Cp:", value: orderData?.address?.postal?.postal_code },
    { label: "Delegación/ Municipio:", value: orderData?.address?.city?.name },
    { label: "Estado:", value: orderData?.address?.entity?.name },
    { label: "Observaciones:", value: orderData?.observations },

    // { label: "Referencias:", value: "Uriel" },
  ];
  return (
    <InfoAddressStyled className="info">
      <p className="info__title">DIRECCIÓN DE ENVIO</p>
      {fields.map((field, index) => (
        <div key={index} className="info__item">
          <p className="info__item-label">{field.label}</p>
          <p className="info__item--value">{field.value}</p>
        </div>
      ))}
    </InfoAddressStyled>
  );
}

const InfoAddressStyled = styled.div`
  .info__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .info__item {
    display: flex;
    color: #757575;
    margin-bottom: 4px;
    font-size: 13px;
  }

  .info__item-label {
    margin-right: 10px;
    width: 140px;
  }

  .info__item-value {
    margin-left: 10px;
  }
`;
