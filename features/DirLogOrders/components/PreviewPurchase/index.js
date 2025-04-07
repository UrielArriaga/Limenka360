import React from "react";
import { ContainerStyled, Dot, LoaderWrapper } from "./styled";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close } from "@material-ui/icons";
import { formatNumber } from "../../../../utils";
import BillingInfoShop from "./BilingInfoShop";
import dayjs from "dayjs";
import SaleOrder from "./SaleOrder";
import { useRouter } from "next/router";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";

export default function PreviewPurchase({
  handleOnClickClosePreview,
  isFetchingData,
  orderSelected,
  dataProducts,
  toggleTrackingsModal,
  handleToggleFiles,
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
        <h4 className="concept">{orderSelected?.provider?.companyname}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <ModalPdfPrint pdfUrl={orderSelected?.url} />
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
            <Tooltip title="Cerrar Vista Previa">
              <IconButton onClick={handleOnClickClosePreview}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="contentpreview">
        <div>
          <h4>Orden de Compra</h4>
          <p>
            Folio de Orden: <span>{orderSelected?.folio}</span>
          </p>
          <p>
            Telefono: <span>{orderSelected?.phone}</span>
          </p>
          <p>
            Metodo de entrega:{" "}
            <span>
              <b>{orderSelected?.methoddelivery}</b>
            </span>
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
        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Direccion del Proveedor</p>
            <SaleOrder orderSelectedData={orderSelected} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__address--title">Razón Social</p>
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
                  </tr>
                ))}
              {data?.length === 0 && <tr>No hay datos</tr>}
            </tbody>
          </table>
        </div>
      </div>
    </ContainerStyled>
  );
}
