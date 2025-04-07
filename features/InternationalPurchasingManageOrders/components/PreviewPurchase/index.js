import React from "react";
import { ContainerStyled, Dot, LoaderWrapper } from "./styled";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { AttachFile, BubbleChart, ChatBubbleOutline, Close, Payment } from "@material-ui/icons";
import { formatDate, formatNumber } from "../../../../utils";
import BillingInfoShop from "./BilingInfoShop";
import dayjs from "dayjs";
import SaleOrder from "./SaleOrder";
import { useRouter } from "next/router";
import MenuOptions from "../MenuOptions";
import { getColorStatusSHOPPINGORDER } from "../../../../utils/DirLog";
import TrackinsHistory from "../TrackingsHistory";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";

export default function PreviewPurchase({
  handleOnClickClosePreview,
  isFetchingData,
  orderSelected,
  dataProducts,
  toggleTrackingsModal,
  handleToggleFiles,
  togglePaymentsDrawer,
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
  options,
}) {
  const { data, isFeching } = dataProducts;
  const router = useRouter();

  const sumField = (array, field) => {
    return array.reduce((accumulator, current) => {
      return accumulator + (current[field] || 0);
    }, 0);
  };

  const totalAmount = sumField(data, "importe");

  if (isFetchingData) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  return (
    <ContainerStyled>
      <div className="headerpreview">
        <h4 className="concept">{orderSelected?.folio}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item" onClick={() => togglePaymentsDrawer()}>
            <Payment className="icon" />
            <p className="text">Pagos</p>
          </div>

          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item">
            <ChatBubbleOutline className="icon" />
            <p className="text" onClick={() => toggleTrackingsModal()}>
              Ver Seguimientos
            </p>
          </div>
          <div className="headerpreview__listactions--item">
            <ModalPdfPrint pdfUrl={orderSelected?.url} />
          </div>

          <div className="headerpreview__listactions--item">
            <MenuOptions
              disabled={orderSelected?.draft}
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              options={options}
              orderSelected={orderSelected}
            />
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              className="button"
              onClick={() =>
                router.push({
                  pathname: `/gerentecompras/ordenes/editarorden`,
                  query: {
                    o: orderSelected?.id,
                  },
                })
              }
            >
              Editar
            </Button>
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
            ¿CÓMO CONTINUAR?
            {orderSelected?.draft ? (
              <span className="guidedescription">
                La orden de compra sigue en borrador, finaliza la orden de compra para enviarla a tu proveedor Click en
                EDITAR
              </span>
            ) : (
              <span className="guidedescription">
                La orden de compra ya fue enviada a tu proveedor, puedes gestionar su estatus en acciones, agregar
                pagos, archivos adjuntos y ver seguimientos.
              </span>
            )}
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
              Folio de Orden: <span>{orderSelected?.folio}</span>
            </p>
            <p>
              Telefono: <span>{orderSelected?.phone}</span>
            </p>
            <p>
              Metodo de entrega: <span>{orderSelected?.methoddelivery}</span>
            </p>
            <p>
              Condiciones de pago: <span>{orderSelected?.paymentcondition}</span>
            </p>
            <p>
              Observaciones: <span>{orderSelected?.observations}</span>
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
              background: getColorStatusSHOPPINGORDER(orderSelected?.statuspoo?.name).bgColor,
            }}
          >
            <p
              className="name"
              style={{
                color: getColorStatusSHOPPINGORDER(orderSelected?.statuspoo?.name).color,
              }}
              onClick={() => {}}
            >
              {orderSelected?.statuspoo?.name || "Borrador"}
            </p>
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <SaleOrder orderSelectedData={orderSelected} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__address--title">Información sobre los impuestos</p>
            <BillingInfoShop orderSelectedData={orderSelected} />
          </div>
        </div>

        <div className="contentpreview__products">
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Precio Unidad</th>
                <th>Importe</th>
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
              {!isFeching &&
                data?.map((productOrder, index) => (
                  <tr key={index}>
                    <td>{productOrder?.codigo}</td>
                    <td>{productOrder?.producto}</td>
                    <td>{productOrder?.cantidad}</td>
                    <td>{productOrder?.unidad}</td>
                    <td>{formatNumber(productOrder?.["precio unitario"])}</td>
                    <td>{formatNumber(productOrder?.importe)}</td>
                  </tr>
                ))}
              {data?.length === 0 && <tr>No hay datos</tr>}
            </tbody>
          </table>
        </div>
        <div className="totalAmount">
          <p>Subtotal {formatNumber(totalAmount)}</p>
        </div>
        <TrackinsHistory orderData={orderSelected} />
      </div>
    </ContainerStyled>
  );
}
