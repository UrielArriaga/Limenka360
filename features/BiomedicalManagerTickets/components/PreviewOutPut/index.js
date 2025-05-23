import React from "react";
import { PreviewOutStyled, LoaderWrapper, Dot } from "./styles";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { formatNumber, toUpperCaseChart } from "../../../../utils";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
import NewTrackinsInventory from "../../../../componentx/common/NewTrackinsInventory";

export default function PreviewOutput({
  exitSelectedData,
  handleOnClickClosePreview,
  isFetchingOrder,
  dataproducts,
  isFechingProduct,
  totalProductsExits,
  handleOnClickReview,
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
              <p>Folio pedido: {renderValue(exitSelectedData?.folio)}</p>
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
                  <th>Producto</th>
                  <th>Status</th>
                  <th>Acciones</th>
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
                  dataproducts?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.serialnumber}</td>
                        <td>{item?.product}</td>
                        <td>{item?.reviewed}</td>
                        <td>
                          <Tooltip title={`${item?.reviewed === "Revisado" ? "Producto ya revisado" : "Producto no revisado"}`}>
                          <Button
                            disabled={item?.reviewed === "Revisado" ? true : false}
                            onClick={()=> handleOnClickReview(item)}
                            className="button"
                          >
                            Marcar como Revisado
                          </Button>  
                          </Tooltip>
                          
                        </td>
                      </tr>
                    );
                  })}
                {dataproducts?.length === 0 && <tr>No hay datos</tr>}
              </tbody>
            </table>
          </div>

          <div className="total">Total de productos {totalProductsExits}</div>
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
