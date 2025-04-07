import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import {
  CheckCircle,
  Close
} from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { formatNumber } from "../../../../utils";
import { PreviewOrderStyled } from "./styles";

export default function PreviewPayment({ selectedPay, handleOnClickClosePreview, toggleModal, dataOportunity }) {

  const dataProducts = dataOportunity?.data[0]?.productsoportunities; 
  
  return (
    <PreviewOrderStyled ispaid={selectedPay?.pagado}>
      <div className="headerpreview">
        <p className="concept">
          Estatus: <span className="statuspay">{selectedPay?.pagado}</span>
        </p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <CheckCircle className="icon" />
            <Tooltip title={selectedPay?.pagado}>
              <p
                className="text"
                onClick={() => {
                  if (selectedPay?.pagado == "Pagado") return;
                  toggleModal();
                }}
              >
                {selectedPay?.pagado == "Pagado" ? selectedPay?.pagado : "Marcar como Pagado"}
              </p>
            </Tooltip>
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          <div className="infoPay">
            <h4>Detalles del Pago</h4>
            <p>
              Fecha Limite de Pago: <span>{selectedPay?.datelimit}</span>
            </p>

            <p>
              Folio: <span> {selectedPay?.data?.oportunity?.concept} </span>
            </p>

            <p>
              Comision: <span> {selectedPay?.comission} </span>
            </p>

            <p>
              Cliente: <span> {selectedPay?.name} </span>
            </p>
            <p>
              Adeudo Por Pagar: <span> {formatNumber(selectedPay?.data?.oportunity?.amount)} </span>
            </p>
            <p>
              Observaciones de la Venta: <span> {selectedPay?.data?.obsercations || "Sin observaciones"} </span>
            </p>
          </div>
        </div>


        <div className="contentpreview__containerTable">
          <h3 className="titleTable">Tabla de Productos de la Venta</h3>
          <div className="contentpreview__products">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Codigo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Iva</th>
                  <th>Subtotal</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {dataOportunity?.isfetching ? (
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
                  dataProducts?.map((productOportunity, index) => (
                    <tr key={index}>
                      <td>{productOportunity.product.name}</td>
                      <td>{productOportunity?.product?.code}</td>
                      <td>{productOportunity.quantity}</td>
                      <td>{formatNumber(productOportunity.newprice)}</td>
                      <td>{formatNumber(productOportunity.iva)}</td>
                      <td>{formatNumber(productOportunity.total)}</td>
                      <td>{productOportunity.product.stock}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* <div className="contentpreview__amounts">
            <div className="row">
              <p>Subtotal: </p>
              <p> {formatNumber(orderSelectedData?.oportunity?.subtotal)}</p>
            </div>
          </div> */}
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
