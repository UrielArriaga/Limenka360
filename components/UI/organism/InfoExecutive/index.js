import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { AttachMoney, EmailOutlined, PersonOutline, Phone } from "@material-ui/icons";
export default function InfoEjecutive(props) {
  const { infoOrders } = props;

  const validateData = (info, typeData) => {
    if (info) {
      switch (typeData) {
        case "date":
          return dayjs(info).format("MMMM DD, YYYY");
        default:
          return info;
      }
    } else {
      return "N/A";
    }
  };

  return (
    <InfoStyled>
      <Grid container={true} spacing={2} className="info_prospect">
        <Grid item={true} md={12} sm={12} xs={12} className="titleHead">
          <PersonOutline />
          <p>Datos de Ejecutivo</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Nombre de ejecutivo</p>
          <p className="data capitalize">{validateData(infoOrders?.oportunity?.soldby?.fullname)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Correo</p>
          <div className="containerIcon">
            <EmailOutlined />
            <p className="data"> {validateData(infoOrders?.oportunity?.soldby?.email)}</p>
          </div>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Telefono</p>
          <div className="containerIcon">
            <Phone />
            <p className="data"> {validateData(infoOrders?.oportunity?.soldby?.phone)}</p>
          </div>
        </Grid>
      </Grid>
    </InfoStyled>
  );
}
const InfoStyled = styled.div`
  overflow-x: hidden;
  .info_prospect {
    margin-bottom: 0px;
    .divider {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid #f3f3f3;
    }
    .titleHead {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      display: flex;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .containerIcon {
      display: flex;

      align-items: center;
      font-size: 14px;
      font-weight: bold;
      svg {
        font-size: 25px;
        color: #66b271;
      }
      p {
        color: #0c203b;
      }
    }
    .title {
      color: #4f4f4f;
      font-size: 13px;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 2px;
      height: 32px;
    }
    .data {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    .important {
      color: ${colors.bgDirector};
    }

    .labels_container {
      margin-top: 4px;
      display: flex;
    }
  }
  .seemore {
    width: fit-content;
    color: ${colors.bgDirector};
    border-bottom: 1px solid transparent;
    transition: 0.2s;
    &:hover {
      border-bottom: 1px solid ${colors.bgDirector};
      cursor: pointer;
    }
  }
`;
