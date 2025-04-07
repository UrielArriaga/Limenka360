import React from "react";
import { PreviewOrderStyled } from "./styles";
import InfoAddress from "./InfoAddress";
import InfoBilling from "./InfoBilling";
import { Grid, Switch } from "@material-ui/core";
import TableProducts from "./TableProducts";

export default function PreviewOrder({ open, onClose, orderData, productsData, showPdf, handleOnChangeShowPdf }) {
  return (
    <PreviewOrderStyled anchor={"right"} open={open} onClose={onClose} width={600}>
      <div className="headerpreview">
        <h3>Detalles de pedido</h3>
      </div>

      <div className="swithview">
        <p>Mostrar vista de PDF</p>
        <Switch checked={showPdf} onChange={e => handleOnChangeShowPdf(e)} />
      </div>

      {showPdf && (
        <div className="pdfview">
          <div className="pdf">
            <iframe src={orderData?.url} width="100%" height="100%" />
          </div>
        </div>
      )}

      {!showPdf && (
        <div className="viewdata">
          <div className="rowinfo">
            <InfoAddress orderData={orderData} />
            <InfoBilling orderData={orderData} />
          </div>

          <TableProducts productsData={productsData} />
          <div className="observations">
            <p className="title">Obvervaciones</p>
            <p>Observaciones</p>
          </div>
        </div>
      )}

      {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
    </PreviewOrderStyled>
  );
}
