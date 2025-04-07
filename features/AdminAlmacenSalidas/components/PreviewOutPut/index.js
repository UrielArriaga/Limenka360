import React from "react";
// import { PreviewOutStyled, LoaderWrapper, Dot } from "./styles";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { toUpperCaseChart } from "../../../../utils";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";

import styled, { keyframes } from "styled-components";
import NewTrackinsInventory from "../../../../componentx/common/NewTrackinsInventory";

export default function PreviewOutPut({
  exitSelectedData,
  handleOnClickClosePreview,
  isFetchingOrder,
  dataproducts,
  isFechingProduct,
  totalProductsExits,
}) {
  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  return (
    <PreviewOutStyled>
      <div className="headerprview">
        <div className="concep">
          <p className="text">{exitSelectedData?.folio ? exitSelectedData?.folio : "Sin Folio"}</p>
        </div>

        <IconButton onClick={handleOnClickClosePreview}>
          <Close />
        </IconButton>
      </div>
      <div className="content-exit">
        <div className="headerday">
          <div className="day">
            <p className="title">Fecha de Salida</p>
            <p>{dayjs(exitSelectedData?.createdAt).format("DD-MMMM-YYYY")}</p>
          </div>
          <div className="crated">
            <p className="title">Creado por</p>
            <p>
              {toUpperCaseChart(
                exitSelectedData?.ejecutive?.fullname ? exitSelectedData?.ejecutive?.fullname : "Sistema"
              )}
            </p>
          </div>
        </div>
        <div className="data_order">
          <p className="title">Datos de Salida</p>
          <div className="info">
            <div className="info_addrees">
              <p>Folio pedido: {exitSelectedData?.order?.folio}</p>
            </div>
            <div className="info_addrees">
              <p>Nombre Recibe: {toUpperCaseChart(exitSelectedData?.order?.receive)}</p>
            </div>
            <div className="info_addrees">
              <p>Teléfono: {exitSelectedData?.order?.phone}</p>
            </div>
            <div className="info_addrees">
              <p>Calle: {toUpperCaseChart(exitSelectedData?.order?.address?.street)}</p>
            </div>
            <div className="info_addrees">
              <p>Número Interior: {exitSelectedData?.order?.address?.int_number}</p>
            </div>
            <div className="info_addrees">
              <p>Numero Exterior: {exitSelectedData?.order?.address?.ext_number}</p>
            </div>
            <div className="info_addrees">
              <p>Colonia: {exitSelectedData?.order?.address?.settlement}</p>
            </div>
            <div className="info_addrees">
              <p>Cp: {exitSelectedData?.order?.address?.postal?.postal_code}</p>
            </div>
            <div className="info_addrees">
              <p>Delegación/ Municipio: {exitSelectedData?.order?.address?.city?.name}</p>
            </div>
            <div className="info_addrees">
              <p>Estado: {exitSelectedData?.order?.address?.entity?.name}</p>
            </div>
            <div className="info_addrees">
              <p>Referencias: {exitSelectedData?.order?.address?.references}</p>
            </div>
          </div>
        </div>
        <div className="table_products">
          <TableLimenkaGeneral heads={heads} typeTable="border" data={dataproducts} isLoading={isFechingProduct} />
          <div className="total">Total de productos {totalProductsExits}</div>
        </div>

        <NewTrackinsInventory orderData={exitSelectedData} inventoryType="salidas" />
      </div>
    </PreviewOutStyled>
  );
}

let heads = [
  {
    headText: "Serial",
    headNormalize: "serialnumber",
    orderby: null,
  },
  {
    headText: "Producto",
    headNormalize: "product",
    orderby: null,
  },
];

export const PreviewOutStyled = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  overflow-y: hidden;
  padding: 16px;
  background: #f5f7fa;

  .headerprview {
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
  }
  .content-exit {
    border-radius: 9px;
    height: 100vh;
    padding: 50px;
    min-height: 500px;
    background: white;
  }
  .concep {
    display: flex;
    flex-direction: column;

    .text {
      font-weight: bold;
      margin-bottom: 6px;
    }
  }
  .actions {
    display: flex;
    height: 50px;
    background-color: #eeeeee;
  }
  .headerday {
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
  .title {
    font-weight: bold;
    margin-top: 7px;
  }
  .tablecontainer {
    margin-top: 20px;
    padding: 10px;
  }
  .data_order {
    padding: 10px;
    margin-top: 25px;
    background: #f5f7fa;
    border-radius: 10px;
  }
  .info_addrees {
    margin-top: 2px;
    display: flex;
    color: #757575;
    margin-bottom: 4px;
    font-size: 13px;
  }
  .table_products {
    margin-top: 20px;
  }
  .total {
    display: flex;
    justify-content: end;
    font-size: 13px;
    font-weight: bold;
    color: #034d6f;
  }
`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
