import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { ArrowRightAlt, AttachFile, ChatBubbleOutline, Check, Close, Edit, PlayArrow } from "@material-ui/icons";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { getColor } from "../../utils";
import dayjs from "dayjs";
import { formatNumber } from "../../../../utils";
import AddressInfo from "./addressInfo";
import BillingInfo from "./BillingInfo";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  productsData,
  handleClickProduct,
  handleOnClickNewExit,
  products,
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

      <div className="actions">
        {/* <div className="actions__item">
          <Edit className="actions__item--icon" />
          <p className="actions__item--text">Editar</p>
        </div>

        <div className="actions__item">
          <Edit className="actions__item--icon" />
          <p className="actions__item--text">Editar</p>
        </div> */}
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          <div>
            <h4>Orden de Venta</h4>
            <p>
              Folio de Order <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColor(orderSelectedData?.exitstatus).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColor(orderSelectedData?.exitstatus).color }}>
              {orderSelectedData?.exitstatus}
            </p>
          </div>
        </div>

        <div className="contentpreview__products">
          <h3 className="title">Productos de Orden</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad solicitada</th>
                <th>Stock Disponible</th>
                {/* <th>Acciones</th> */}
              </tr>
            </thead>

            <tbody>
              {productsData.results.map((productOportunity, index) => {
                return (
                  <tr>
                    <td>{productOportunity?.product.name}</td>
                    <td>{productOportunity?.quantity}</td>
                    <td>{productOportunity?.product?.stock}</td>
                    {/* <td>
                      <div>
                        <IconButton className="buttonexit" onClick={() => handleClickProduct(productOportunity)}>
                          <ArrowRightAlt className="icon" />
                        </IconButton>                       
                      </div>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="contentpreview__actionstoexit">
          <Button
            onClick={() => {
              handleClickProduct();
            }}
            className="buttonexit"
          >
            Seleccionar Productos
          </Button>
        </div>

        <div className="divider"></div>

        <div className="contentpreview__productstoexit">
          <h3 className="title">Productos a seleccionado para salida</h3>
          <table>
            <thead>
              <tr>
                <th>No. Serie</th>
                <th>Producto</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                return (
                  <tr>
                    <td>{product?.serialnumber}</td>
                    <td>{product?.name}</td>
                    {/* <td>
                      <div>
                        <IconButton className="buttonexit" onClick={() => handleClickProduct(product)}>
                          <ArrowRightAlt className="icon" />
                        </IconButton>
                      </div>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="contentpreview__actionstoexit">
          <Button
            onClick={() => {
              handleOnClickNewExit(products);
            }}
            className="buttonexit"
          >
            Crear Salida
          </Button>
        </div>

        {/* <Button>Ver Inventario</Button> */}
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
