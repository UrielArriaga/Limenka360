import React from "react";
import { PreviewOutStyled, LoaderWrapper, Dot } from "./styles";
import { IconButton, LinearProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { formatNumber, toUpperCaseChart } from "../../../../utils";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import NewTrackinsInventory from "../../../../componentx/common/NewTrackinsInventory";

export default function PreviewOutput({
  exitSelectedData,
  handleOnClickClosePreview,
  isFetchingOrder,
  dataproducts,
  isFechingProduct,
  totalProductsExits,
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
                exitSelectedData?.ejecutive?.fullname ? exitSelectedData?.ejecutive?.fullname : "Sistema"
              )}
            </p>
          </div>
        </div>
        <div className="data_order">
          <p className="title">Datos de Entrada</p>
          <div className="info">
            <div className="info_addrees">
              <p>Folio pedido:{renderValue(exitSelectedData?.order?.folio)}</p>
            </div>
            <div className="info_addrees">
              <p>Nombre Recibe: {renderValue(toUpperCaseChart(exitSelectedData?.order?.receive))}</p>
            </div>
            <div className="info_addrees">
              <p>Teléfono: {renderValue(exitSelectedData?.order?.phone)}</p>
            </div>
            <div className="info_addrees">
              <p>Calle: {renderValue(toUpperCaseChart(exitSelectedData?.order?.address?.street))}</p>
            </div>
            <div className="info_addrees">
              <p>Número Interior: {renderValue(exitSelectedData?.order?.address?.int_number)}</p>
            </div>
            <div className="info_addrees">
              <p>Numero Exterior: {renderValue(exitSelectedData?.order?.address?.ext_number)}</p>
            </div>
            <div className="info_addrees">
              <p>Colonia: {renderValue(exitSelectedData?.order?.address?.settlement)}</p>
            </div>
            <div className="info_addrees">
              <p>Cp: {renderValue(exitSelectedData?.order?.address?.postal?.postal_code)}</p>
            </div>
            <div className="info_addrees">
              <p>Delegación/ Municipio: {renderValue(exitSelectedData?.order?.address?.city?.name)}</p>
            </div>
            <div className="info_addrees">
              <p>Estado: {renderValue(exitSelectedData?.order?.address?.entity?.name)}</p>
            </div>
            <div className="info_addrees">
              <p>Referencias: {renderValue(exitSelectedData?.order?.address?.references)}</p>
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
                      <td>{item?.product}</td>
                    </tr>
                  ))}
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
