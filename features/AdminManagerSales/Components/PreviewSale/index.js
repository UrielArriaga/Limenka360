import React, { useState } from "react";
import { Button, CircularProgress, IconButton, Tab, Tabs } from "@material-ui/core";
import { Assignment, ChatBubbleOutline, Close, Description, GetApp } from "@material-ui/icons";
import TableProducts from "../TableProducts";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import TablePayments from "../TablePayments";

export default function PreviewSale({
  orderSelectedData,
  handleOnClickClosePreview,
  isFetchingOrder,
  orderSelected,
  dataPayments,
  handleDownloadFile,
  tabIndex,
  handleTabChange,
  handleOpenPreview,
  loadingPdf,
  toggleTrackingsModal,
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

          <div className="headerpreview__listactions--item" onClick={() => handleOpenPreview()}>
            <Assignment className="icon" />
            <p className="text">Ver Cotización</p>
          </div>
          {orderSelectedData?.quoteurl && (
            <div className="headerpreview__listactions--item" onClick={() => handleDownloadFile(orderSelectedData)}>
              {loadingPdf ? (
                <CircularProgress className="loader" style={{ height: 20, width: 20 }} />
              ) : (
                <GetApp className="icon" />
              )}
              <p className="text">Descargar Cotizacion</p>
            </div>
          )}
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
                <h3>Detalles de venta</h3>
              </div>
              <div className="datos">
                <div>
                  <p>Concepto</p>

                  {orderSelected?.concepto ? <p className={`value`}>{orderSelected.concepto}</p> : <span>N/A</span>}
                </div>
                <div>
                  <p>Monto Total</p>
                  {orderSelected?.["monto total"] ? (
                    <p className={`value`}>{orderSelected?.["monto total"]}</p>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div>
                  <p>Comisión Total</p>
                  {orderSelected?.["comisión total"] ? (
                    <p className={`value`}>{orderSelected?.["comisión total"]}</p>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs">
          <Button className={`bt_tab ${tabIndex === 0 && "active"}`} onClick={() => handleTabChange(0)}>
            Productos
          </Button>
          <Button className={`bt_tab ${tabIndex === 1 && "active"}`} onClick={() => handleTabChange(1)}>
            Pagos
          </Button>
        </div>

        <div className="contentpreview__containerTable">
          {tabIndex === 0 && (
            <div className="contentpreview__products">
              <TableProducts products={orderSelectedData?.productsoportunities} />
            </div>
          )}

          {tabIndex === 1 && (
            <div className="contentpreview__products">
              <TablePayments payments={dataPayments?.results} />
            </div>
          )}
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
