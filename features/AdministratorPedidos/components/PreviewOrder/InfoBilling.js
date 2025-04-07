import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export default function InfoBilling({ orderData }) {
  let fields = [
    {
      label: "Razón Social:",
      value: orderData?.bill?.business_name,
    },
    {
      label: "RFC:",
      value: orderData?.bill?.rfc,
    },
    {
      label: "Teléfono:",
      value: orderData?.bill?.phone,
    },
    {
      label: "Calle y N°:",
      value: `${orderData?.bill?.street}, N°.Int: ${orderData?.bill?.int_number}, N°.Ext: ${orderData?.bill?.ext_number}`,
    },
    {
      label: "Colonia:",
      value: orderData?.bill?.settlement,
    },
    {
      label: "C.P:",
      value: orderData?.bill?.zip_code,
    },
    {
      label: "Delegación/ Municipio:",
      value: orderData?.bill?.city?.name,
    },
    {
      label: "Estado:",
      value: orderData?.bill?.entity?.name,
    },
    {
      label: "Uso de CFDI:",
      value: orderData?.bill?.cfdi?.name,
    },
    {
      label: "Metodo de Pago:",
      value: orderData?.bill?.payment_method?.name,
    },
    {
      label: "Forma de Pago:",
      value: orderData?.bill?.payment_way?.name,
    },
    {
      label: "Regimen Fiscal:",
      value: orderData?.bill?.fiscal_regime?.name,
    },
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

// Razón Social:
// RFC:
// Teléfono:
// Calle y N°: , N°.Int: , N°.Ext:
// Colonia:
// C.P:
// Delegación/ Municipio:
// Estado:
// Uso de CFDI:
// Metodo de Pago:
// Forma de Pago:
// Regimen Fiscal:

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
