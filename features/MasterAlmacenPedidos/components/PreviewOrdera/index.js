import { Button, IconButton, LinearProgress } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { ORDERSTATUS_ALMACEN } from "../../../../constants";
import { formatNumber } from "../../../../utils";
import { getColor } from "../../utils";
import BillingInfo from "./BillingInfo";
import AddressInfo from "./AddressInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";

export default function PreviewOrderaaa({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  productsData,
  handleClickFillOrder,
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

  const isMarked = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.porsurtir;

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              disabled={isMarked}
              className={` button ${isMarked && "buttondisabled"}`}
              onClick={() => handleClickFillOrder()}
            >
              Surtir Pedido
            </Button>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>
      {/* 
      <div className="actions">
        <div className="actions__item">
          <Edit className="actions__item--icon" />
          <p className="actions__item--text">Editar</p>
        </div>

        <div className="actions__item">
          <Edit className="actions__item--icon" />
          <p className="actions__item--text">Editar</p>
        </div>
      </div> */}

      <div className="contentpreview">
        <div className="rowprevalig">
          <div>
            <h4>Orden de Venta</h4>
            <p>
              Folio de Orden: <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColor(orderSelectedData?.warehousesstatus?.name).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColor(orderSelectedData?.warehousesstatus?.name).color }}>
              {orderSelectedData?.warehousesstatus?.name}
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
            {/* {true && <p className="hightligth">Sin Factura</p>} */}
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>
        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Iva</th>
                  <th>Subtotal</th>
                  <th>Stock</th>
                  {/* <th>Acciones</th> */}
                </tr>
              </thead>
              {console.log("pr", productsData)}

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
                      <td>{productOportunity.quantity}</td>
                      <td>{formatNumber(productOportunity.newprice)}</td>
                      <td>{formatNumber(productOportunity.iva)}</td>
                      <td>{formatNumber(productOportunity.total)}</td>
                      <td>{productOportunity.product.stock}</td>
                      {/* <td>
                  <div>
                    <Tooltip title="Validar Stock">
                      <IconButton>
                        <Check />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td> */}
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

      {/* PreviewOrder
      <button
        onClick={() => {
          handleOnClickClosePreview();
        }}
      >
        close
      </button> */}

      {/* <pre>{JSON.stringify(orderSelectedData?.address, null, 2)}</pre> */}
    </PreviewOrderStyled>
  );
}
