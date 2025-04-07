import { Button, IconButton } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close, NoteAdd } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import AddressInfo from "../../../DirLogPedidos/components/PreviewOrder/AddressInfo";
import BillingInfo from "../../../DirLogPedidos/components/PreviewOrder/BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  productsData,
  handleOnClickArticle,
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

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          {/* <div className="headerpreview__listactions--item">
            <Button
              className={allHaveGuarante ? "button" : "buttondisabled"}
              disabled={productsData?.results.some(product => product.guaranteeorder === null)}
              onClick={() => handleOnClickNewExit(products)}
            >
              Generar Salida
            </Button>
          </div> */}

          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
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
            <AddressInfo orderSelectedData={orderSelectedData} />
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
                  <p>Numero de serie</p>
                </div>
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>

                <div className="tablehead">
                  <p>Comentarios</p>
                </div>

                
              </div>

              <div className="tablebody">
                {productsData?.results.map((productOportunity, index) => (
                  <div key={index}>
                    <div className="tablerow" onClick={() => handleOnClickArticle(productOportunity)}>
                      <div className="tablecell code">{productOportunity?.serialnumber}</div>
                      <div className="tablecell code">{productOportunity?.product?.code}</div>
                      <div className="tablecell tableheadproductrow">
                        <div className="content">{productOportunity?.product?.name}</div>
                      </div>

                      <div className="tablecell">{productOportunity?.comments || "N/A"}</div>
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
