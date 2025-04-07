import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export default function InfoBilling({ orderData }) {
  let fields = [
    {
      label: "Razón Social:",
      value: orderData?.bill?.businessname || "N/A",
    },
    {
      label: "RFC:",
      value: orderData?.bill?.rfc || "N/A",
    },
    {
      label: "Teléfono:",
      value: orderData?.bill?.phone || "N/A",
    },
    {
      label: "Calle y N°:",
      value: `${orderData?.bill?.address?.street || "N/A"}, N°.Int: ${
        orderData?.bill?.address?.int_number || "N/A"
      }, N°.Ext: ${orderData?.bill?.address?.ext_number || "N/A"}`,
    },
    {
      label: "Colonia:",
      value: orderData?.bill?.address?.settlement || "N/A",
    },
    {
      label: "C.P:",
      value: orderData?.bill?.address?.postal?.postal_code || "N/A",
    },
    {
      label: "Delegación/ Municipio:",
      value: orderData?.bill?.address?.city?.name || "N/A",
    },
    {
      label: "Estado:",
      value: orderData?.bill?.address?.entity?.name || "N/A",
    },
    {
      label: "Uso de CFDI:",
      value: orderData?.bill?.cfdi?.name || "N/A",
    },
    {
      label: "Metodo de Pago:",
      value: orderData?.bill?.paymentmethod?.name || "N/A",
    },
    {
      label: "Forma de Pago:",
      value: orderData?.bill?.paymentway?.name || "N/A",
    },
    {
      label: "Regimen Fiscal:",
      value: orderData?.bill?.taxregime?.name || "N/A",
    },
  ];

  return (
    <InfoAddressStyled className="info">
      <p className="info__title">DIRECCIÓN DE FACTURACIÓN</p>
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
