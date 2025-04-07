import { BubbleChart, Close, Payment, VerifiedUser } from "@material-ui/icons";
import { IconButton, LinearProgress, Tooltip } from "@mui/material";
import React from "react";
import { ContainerStyledSerial, LoaderWrapper, StyledSelect, Dot } from "./styles";
import dayjs from "dayjs";
import TrackinsHistory from "../TrackingsHistory";

export default function PreviewArticlesSerialNumber({
  orderSelected,
  handleOnClickClosePreview,
  isFeching = false,
  toggleModalGaranties,
}) {
  const { purchaseorder } = orderSelected?.data;

  if (isFeching) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  return (
    <ContainerStyledSerial>
      <div className="headerpreview">
        <h4 className="concept">{orderSelected?.data.purchaseorder?.folio}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <div className="headerpreview__listactions--item" onClick={toggleModalGaranties}>
              <VerifiedUser className="icon" />
              <p className="text">Garantia</p>
            </div>
            <Tooltip title="Cerrar Vista Previa">
              <IconButton onClick={handleOnClickClosePreview}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="contentpreview">
        <div className="headerinstructions">
          <BubbleChart className="icon" />
          <p className="guide">
            Articulos por numero de serie
            <span className="guidedescription">
              Los articulos ingresador por recoleccion contiene una orden correspondientes
            </span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h4>Orden de Compra</h4>
            <p>
              Folio de Orden: <span>{orderSelected?.data?.purchaseorder?.folio}</span>
            </p>
            <p>
              Telefono: <span>{orderSelected?.data?.purchaseorder?.phone}</span>
            </p>
            <p>
              Metodo de entrega: <span>{orderSelected?.data?.purchaseorder?.methoddelivery}</span>
            </p>
            <p>
              Condiciones de pago: <span>{orderSelected?.data?.purchaseorder?.paymentcondition}</span>
            </p>
            <p>
              Observaciones: <span>{orderSelected?.data?.purchaseorder?.observations || "Sin Datos"}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelected?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            className="TableName"
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: 15,
            }}
          >
            <p className="name" onClick={() => console.log("si funciona")}>
              {orderSelected?.data.purchaseorder?.statuspoo?.name || "Borrador"}
            </p>
          </div>
        </div>

        <div className="contentpreview__products">
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Serial</th>
                <th>Nombre</th>
                <th>Unidad</th>
                <th>Estatus</th>
                <th>Garantia</th>
              </tr>
            </thead>

            <tbody className="bodyTable">
              {isFeching && (
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
              {orderSelected.data?.product ? (
                <tr>
                  <td>{orderSelected?.data.product.code}</td>
                  <td>{orderSelected?.serial}</td>
                  <td>{orderSelected?.name}</td>
                  <td>{orderSelected?.data.purchaseorder.quantity}</td>
                  <td>{orderSelected?.data.purchaseorder?.statuspoo?.name || "Borrador"}</td>
                  <td>{orderSelected?.garant || "Sin garantia"}</td>
                </tr>
              ) : (
                <tr>No hay datos</tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="contentpreview">
          <div className="contentpreview__tabs">
            <div className="contentpreview__tabs__content">
              <div className={`contentpreview__tabs__content--tab active`}>
                <p>Comentarios</p>
              </div>
            </div>
          </div>
          <div className="contentpreview__render">
            <TrackinsHistory orderData={purchaseorder} />
          </div>
        </div>
      </div>
    </ContainerStyledSerial>
  );
}
