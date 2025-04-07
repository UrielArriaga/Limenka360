import React from "react";
import { PreviewOutStyled, LoaderWrapper, Dot } from "./styles";
import { IconButton, LinearProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import {  toUpperCaseChart } from "../../../../utils";
import TrackinsHistory from "../TrackingsHistory";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
import NewTrackinsInventory from "../../../../componentx/common/NewTrackinsInventory";
export default function PreviewOutput({
  exitSelectedData,
  handleOnClickClosePreview,
  isFetchingOrder,
  dataproducts,
  isFechingProduct,
  totalProductsExits,
  dataComments
}) {
  const renderValue = value => {
    if (value == null || value === undefined || value === "") {
      return "N/A";
    }
    return value;
  };
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
            <p className="title">Fecha de Entrada</p>
            <p>{dayjs(exitSelectedData?.createdAt).format("DD-MMMM-YYYY")}</p>
          </div>
          <div className="crated">
            <p className="title">Creado por</p>
            <p>
              {toUpperCaseChart(
                 exitSelectedData?.createdby?.fullname ? exitSelectedData?.createdby?.fullname : "Sistema"
              )}
            </p>
          </div>
        </div>
        <div className="data_order">
          <p className="title">Datos de Entrada</p>
          <div className="info">
          <div className="info_addrees">
              <p>Folio: {exitSelectedData?.folio ? exitSelectedData?.folio : "Sin Folio"}</p>
            </div>
          </div>
        </div>
        <div className="table_products">
          <p className="title">Productos</p>
          <div className="products">
            <table>
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Observaciones</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {isFechingProduct && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      <div className="load">
                        <div className="load__img">
                          <img src="/load.png" />
                        </div>
                        <div className="content_loadtext">
                          <p>Cargando Productos</p>
                          <LinearProgress color="primary" />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {!isFechingProduct &&
                  dataproducts?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.serialnumber}</td>
                      <td>{item?.productcode}</td>
                      <td>{item?.product}</td>
                      <td>{item?.item.comments}</td>
                    </tr>
                  ))}
                {dataproducts?.length === 0 && <tr>No hay datos</tr>}
              </tbody>
            </table>
          </div>

          <div className="total">Total de productos {totalProductsExits}</div>
        </div>
        <div className="divider"></div>
        <div className="observations">
          <div>
            <h4>Observaciones Generales</h4>
            <p className="text_observations">{exitSelectedData?.observations || "Sin observaciones"}</p>
          </div>
        </div>

        <NewTrackinsInventory orderData={exitSelectedData} inventoryType="entradas" />
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
