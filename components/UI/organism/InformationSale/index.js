import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { AttachMoney, PersonOutline, Visibility } from "@material-ui/icons";
import ModalShowProducts from "../ModalShowProducts";
import useModal from "../../../../hooks/useModal";
import { formatNumber } from "../../../../utils";
export default function InfoSale(props) {
  const { infoOrders, allProducts } = props;
  const [showProducts, setShowProducts] = useState(false);

  const openProducts = () => setShowProducts(true);
  const closeProducts = () => setShowProducts(false);
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
          <Box component="span" m={1}></Box>
          <div className="divider" />
        </Grid>

        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Concepto</p>
          <p className="data capitalize">{validateData(infoOrders?.oportunity?.concept)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Monto Total</p>
          <div className="containerIcon">
            <AttachMoney />
            <p className="data"> {validateData(formatNumber(infoOrders?.oportunity?.amount))}</p>
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={2}>
          <p className="title">Comisión Total</p>
          <div className="containerIcon">
            <AttachMoney />
            <p className="data"> {validateData(formatNumber(infoOrders?.oportunity?.comission))}</p>
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={2}>
          <p className="title">productos</p>
          <div className="containerIcon">
            <Visibility style={{ cursor: "pointer" }} onClick={openProducts} />
            <p className="data important">Ver Todos</p>
          </div>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={12}>
          <p className="title">Observaciones de Venta</p>
          <p className="data capitalize"> {validateData(infoOrders?.oportunity?.generalobservations)}</p>
        </Grid>
      </Grid>
      <ModalShowProducts open={showProducts} closeProducts={closeProducts} allProducts={allProducts} />
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
