import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { Button, IconButton } from "@material-ui/core";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";
import { AttachFile, BubbleChart, ChatBubbleOutline, Close } from "@material-ui/icons";
import MenuOptions from "../../../DirLogPedidos/components/MenuOptions";
import ClientInfo from "./ClientInfo";
import { getColorStatusOrder } from "../../utils";
import dayjs from "dayjs";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";
import OrderInfo from "./OrderInfo";

export default function PreviewOrder({
  orderSelectedData = {
    folio: "UAZ-123",
  },
  handleOnClickClosePreview,
  isFetchingOrder,
  productsData = {
    results: [],
  },
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
        <p className="concept" onClick={() => router.push(`./directorlogistica/pedidos/${orderSelectedData?.id}`)}>
          {orderSelectedData?.folio}
        </p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              // disabled={!isMarked}
              // className={` button ${!isMarked && "buttondisabled"}`}
              className="button"
              onClick={() => {
                handleOnClickSaveOrder();
              }}
            >
              Guardar Pedido
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <ModalPdfPrint pdfUrl={orderSelectedData?.url} />
          </div>

          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>
          <div className="headerpreview__listactions--item">
            {/* <MenuOptions
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              handleRejectOrder={handleRejectOrder}
              options={getMenuOptions()}
            /> */}
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          {/* <div className="contentpreview__clientinfo">
            <p className="contentpreview__clientinfo--title">DIRECCIÓN DE ENVIO</p>
            <ClientInfo orderSelectedData={orderSelectedData} />
          </div> */}

          <div className="contentpreview_orderinfo">
            <h3>Detalles de pedido</h3>
            <OrderInfo orderSelectedData={orderSelectedData} />
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

        <div className="rowprev">
          <div className="contentpreview__observations">
            <p className="contentpreview__observations--title">Observaciones</p>
            <div className="contentpreview__observations--content">
              <p>{orderSelectedData?.observations}</p>
            </div>
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead ">
                  <p>Cantidad</p>
                </div>
                <div className="tablehead center">
                  <p>Marca</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead center">
                  <p>Precio</p>
                </div>
                <div className="tablehead center">
                  <p>Iva</p>
                </div>
                <div className="tablehead center">
                  <p>SubTotal</p>
                </div>

                <div className="tablehead center">
                  <p>Nota</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData?.results?.map((productoportunity, index) => (
                  <div className="tablerow" key={index}>
                    <div className="tablecell">
                      <p>{productoportunity?.product?.code}</p>
                    </div>
                    <div className="tablecell">
                      <p>{productoportunity?.quantity}</p>
                    </div>
                    <div className="tablecell">
                      <p>{productoportunity?.product?.brand?.name}</p>
                    </div>
                    <div className="tablecell tablecellproductname">
                      <p>{productoportunity?.product?.name}</p>
                    </div>
                    <div className="tablecell center">
                      <p>{productoportunity?.newprice}</p>
                    </div>
                    <div className="tablecell center">
                      <p>{productoportunity?.iva}</p>
                    </div>
                    <div className="tablecell center">
                      <p>{productoportunity?.subtotal}</p>
                    </div>

                    <div className="tablecell center">
                      <p>{productoportunity?.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
