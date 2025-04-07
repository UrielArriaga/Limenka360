import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { Button, IconButton } from "@material-ui/core";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";
import { AttachFile, BubbleChart, ChatBubbleOutline, Close, Edit, KeyboardArrowDown } from "@material-ui/icons";

import ClientInfo from "./ClientInfo";
import { getColorStatusOrder } from "../../utils";
import dayjs from "dayjs";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";
import OrderInfo from "./OrderInfo";
import TableProducts from "./TableProducts";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
import MenuOptions from "../MenuOptions";

export default function orderSelectedDataPreviewOrder({
  orderSelectedData = {
    folio: "UAZ-123",
  },
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  isFetchingOrder,
  productsData = {
    results: [],
  },
  actionsEditOrder,
  actionsMenu,
  actionsMenuPDF,
  modalAccount
}) {
  const { handleToggleEditShipping, handleToggleEditBill, handleToggleEditOrderData } = actionsEditOrder;

  const { options, anchorEl, handleMenuOpen, handleMenuClose } = actionsMenu;

  const {
    options: optionsPDF,
    anchorEl: anchorElPDF,
    handleMenuOpen: handleMenuOpenPDF,
    handleMenuClose: handleMenuClosePDF,
  } = actionsMenuPDF;

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
          <div className="headerpreview__listactions--item">
            <ModalPdfPrint pdfUrl={orderSelectedData?.url} />
          </div>

          <div className="headerpreview__listactions--item">
            <MenuOptions
              // disabled={orderSelected?.draft}
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              options={options}
              orderSelected={orderSelectedData}
              rightIcon={<KeyboardArrowDown style={{ marginTop: 4 }} />}
            />

            <MenuOptions
              title="Descargar"
              // disabled={orderSelected?.draft}
              handleMenuOpen={handleMenuOpenPDF}
              anchorEl={anchorElPDF}
              handleMenuClose={handleMenuClosePDF}
              options={optionsPDF}
              orderSelected={orderSelectedData}
              rightIcon={<KeyboardArrowDown style={{ marginTop: 4 }} />}
            />
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
          <div className="contentpreview_orderinfo">
            <div>
              <div className="row">
                <h3>Detalles de pedido</h3>
                {/* <div className="rowedit" onClick={() => handleToggleEditOrderData()} >
                // ?Wait to admin if this is necessary
                  <Edit className="icon" />
                  <p>Editar</p>
                </div> */}
              </div>
              <OrderInfo orderSelectedData={orderSelectedData} modalAccount={modalAccount}/>
            </div>

            <div>
              <div
                className="TableName"
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: 4,
                  textAlign: "center",
                  width: 220,

                  background: getColorStatusOrder(orderSelectedData?.orderstatus?.name).bgColor,
                }}
              >
                <p
                  className="name"
                  style={{
                    color: getColorStatusOrder(orderSelectedData?.orderSelectedData?.name).color,
                    padding: 1,
                  }}
                  onClick={() => {}}
                >
                  {orderSelectedData?.orderstatus?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>

            <div className="contentpreview__address--action" onClick={() => handleToggleEditShipping()}>
              <p>Editar</p>
              <Edit className="icon" />
            </div>
            <AddressInfo orderSelectedData={orderSelectedData} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>

            <div className="contentpreview__customer--action" onClick={() => handleToggleEditBill()}>
              <p>Editar</p>
              <Edit className="icon" />
            </div>

            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <TableProducts products={productsData.results} />
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__observations">
            <p className="contentpreview__observations--title">Observaciones Generales</p>
            <div className="contentpreview__observations--content">
              <p>{orderSelectedData?.observations || "Sin observaciones"} </p>
            </div>
          </div>
        </div>

        <NewTrackinsOrder orderData={orderSelectedData} />
      </div>
    </PreviewOrderStyled>
  );
}
