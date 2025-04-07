import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { Assignment, AttachMoney, EmailOutlined, Phone, PhoneAndroid } from "@material-ui/icons";
export default function InfomationShippings(props) {
  const { infoOrders } = props;
  const [showAll, setShowAll] = useState(false);
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
        <Grid item xs={12} md={12}>
          <div className="divider" />
        </Grid>
        
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Recibe</p>
          <p className="data capitalize">{validateData(infoOrders?.receive)}</p>
        </Grid>

        <Grid item={true} md={4} sm={12} xs={12}>
          <p className="title">Telefono</p>
          <div className="containerIcon">
            <PhoneAndroid />
            <p className="data capitalize">{validateData(infoOrders?.phone)}</p>
          </div>
        </Grid>
        <Grid item={true} md={2} sm={12} xs={12}>
          <p className="title">Calle</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.street)}</p>
        </Grid>
        <Grid item={true} md={2} sm={12} xs={12}>
          <p className="title">Numero Interior</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.int_number)}</p>
        </Grid>
        <Grid item={true} md={4} sm={12} xs={12}>
          <p className="title">Numero Exterior</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.ext_number)}</p>
        </Grid>
        <Grid item={true} md={4} sm={12} xs={12}>
          <p className="title">Codigo Postal</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.postal?.postal_code)}</p>
        </Grid>
        <Grid item={true} md={2} sm={12} xs={12}>
          <p className="title">Estado</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.entity?.name)}</p>
        </Grid>
        <Grid item={true} md={2} sm={12} xs={12}>
          <p className="title">Municipio</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.city?.name)}</p>
        </Grid>

        <Grid item={true} md={4} sm={12} xs={12}>
          <p className="title">Colonia</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.settlement)}</p>
        </Grid>

        <Grid item={true} md={6} sm={12} xs={12}>
          <p className="title">Referencias</p>
          <p className="data capitalize">{validateData(infoOrders?.address?.references)}</p>
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
      margin-top: 2px;
      margin-bottom: 2px;
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
    .capitalize {
      text-transform: capitalize;
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
const LabelContainer = styled.p`
  margin-right: 5px;
  border-radius: 5px;
  padding: 2px;
  font-size: 13px;
  border: 2px solid ${({ color }) => color};
  text-transform: capitalize;
  color: grey;
`;
const LindeDivider = styled.hr`
  width: 100%;
  border-top: 1px solid rgb(48, 63, 159);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 5px;
`;
