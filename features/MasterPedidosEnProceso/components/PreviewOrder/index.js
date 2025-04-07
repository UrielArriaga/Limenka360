import { Button, IconButton } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close, NoteAdd } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import AddressInfo from "../../../DirLogPedidos/components/PreviewOrder/AddressInfo";
import BillingInfo from "../../../DirLogPedidos/components/PreviewOrder/BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  productsData,
  handleOnClickNewExit,
  products,
  ShippingsData,
  generatePDF,
  wareHouseSelected,
  handleOnClickArticle,
  handleToggleFiles,
  handleOnClickGenerateData,
  dataComments,
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

  const allHaveGuarante = productsData?.results.every(product => product.guaranteeorder !== null);

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <ModalPdfPrint pdfUrl={orderSelectedData?.url} />
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              className={
                allHaveGuarante &&
                !["completado", "parcialmente surtido", "entregado", "en ruta"].includes(orderSelectedData?.exitstatus)
                  ? "button"
                  : "buttondisabled"
              }
              disabled={
                productsData?.results.some(product => product.guaranteeorder === null) ||
                ["completado", "parcialmente surtido", "entregado", "en ruta"].includes(orderSelectedData?.exitstatus)
              }
              onClick={() => {
                handleOnClickNewExit(products);
                // generatePDF(productsData);
              }}
            >
              Generar Salida
            </Button>
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
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
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
            <AddressInfo orderSelectedData={orderSelectedData} ShippingsData={ShippingsData.results} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>

                <div className="tablehead">
                  <p>Garantia</p>
                </div>

                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData?.results?.map((productOportunity, index) => (
                  <div key={index}>
                    <div className="tablerow">
                      <div className="tablecell code">{productOportunity?.serialnumber}</div>
                      <div className="tablecell tableheadproductrow">
                        <div className="content">{productOportunity?.product.name}</div>
                      </div>
                      <div className="tablecell center">{productOportunity?.total}</div>

                      <div className="tablecell">
                        {productOportunity?.guaranteeorder ? (
                          <p onClick={() => window.open(productOportunity?.guaranteeorder)}>Ver</p>
                        ) : (
                          <p>Sin Garantia</p>
                        )}
                      </div>

                      <div className="tablecell actions">
                        <IconButton onClick={() => handleOnClickArticle(productOportunity)}>
                          <AttachFile />
                        </IconButton>

                        <IconButton onClick={() => handleOnClickGenerateData(productOportunity)}>
                          <NoteAdd />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="observations">
          <div>
            <h4>Observaciones Generales</h4>
            <p className="text_observations">{orderSelectedData?.observations || "Sin observaciones"}</p>
          </div>
        </div>

        <NewTrackinsOrder orderData={orderSelectedData} />
      </div>
    </PreviewOrderStyled>
  );
}
