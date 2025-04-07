import React from "react";
import styled from "styled-components";
export default function InfoAddress({ orderData }) {
  let fields = [
    { label: "Recive:", value: orderData?.receive },
    { label: "Teléfono:", value: orderData?.phone },
    { label: "Calle:", value: orderData?.address?.street },
    { label: "Número Interior:", value: orderData?.address?.int_number },
    { label: "Número Exterio:", value: orderData?.address?.ext_number },
    { label: "Colonia:", value: orderData?.address?.settlement },
    { label: "Cp:", value: "Uriel" },
    { label: "Delegación/ Municipio:", value: orderData?.address?.city?.name },
    { label: "Estado:", value: orderData?.address?.entity?.name },
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

      {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
      {/* <p className="info__title">DIRECCIÓN DE ENVIO</p>
      <div className="info__item">
        <p className="info__item-label">Nombre:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Teléfono:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Calle:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Número Interior:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Número Exterio:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Colonia:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Cp:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Delegación/ Municipio:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Estado:</p>
        <p className="info__item--value">Uriel</p>
      </div>
      <div className="info__item">
        <p className="info__item-label">Referencias:</p>
        <p className="info__item--value">Uriel</p>
      </div> */}
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
