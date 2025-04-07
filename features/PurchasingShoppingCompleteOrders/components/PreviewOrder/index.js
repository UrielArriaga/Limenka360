import { Button, IconButton, LinearProgress } from "@material-ui/core";
import { Add, AttachFile, ChatBubbleOutline, Close, Done, Edit } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { formatNumber } from "../../../../utils";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { getColor } from "../../../ShoppingPedidos/utils";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  productsData,
  toggleTrackingsModal,
  handleToggleFiles,
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
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          <div>
            <h4>Pedido</h4>
            <p>
              Folio: <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColorStatusOrder(orderSelectedData?.exitstatus).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColorStatusOrder(orderSelectedData?.exitstatus).color }}>
              {orderSelectedData?.exitstatus}
            </p>
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <AddressInfo orderSelectedData={orderSelectedData} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>
        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Proveedor</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Iva</th>
                  <th>Subtotal</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {productsData.isFetching ? (
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
                ) : (
                  productsData.results.map((productOportunity, index) => (
                    <tr key={index}>
                      <td>{productOportunity.product.name}</td>
                      <td>{productOportunity?.product?.provider?.companyname}</td>
                      <td>{productOportunity.quantity}</td>
                      <td>{formatNumber(productOportunity.newprice)}</td>
                      <td>{formatNumber(productOportunity.iva)}</td>
                      <td>{formatNumber(productOportunity.total)}</td>
                      <td>{productOportunity.product.stock}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="contentpreview__amounts">
            <div className="row">
              <p>Subtotal: </p>
              <p> {formatNumber(orderSelectedData?.oportunity?.subtotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
