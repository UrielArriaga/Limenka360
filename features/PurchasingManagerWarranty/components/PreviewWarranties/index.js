import { useState } from "react";
import { ContainerStyled, Dot, LoaderWrapper, StyledSelect } from "./styled";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { AttachFile, BubbleChart, ChatBubbleOutline, Close, Payment, PictureAsPdf } from "@material-ui/icons";
import dayjs from "dayjs";

export default function PreviewWarranties({setIsOpenPreview, warrantySelected}) {

  // if (isFetchingData) {
  //   return (
  //     <LoaderWrapper>
  //       <Dot />
  //       <Dot />
  //       <Dot />
  //     </LoaderWrapper>
  //   );
  // }
  return (
    <ContainerStyled>
      <div className="headerpreview">
        <h4 className="concept">{"folio"}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Payment className="icon" />
            <p className="text">Opciones</p>
          </div>

          <div className="headerpreview__listactions--item">
            <Button className="button">Accion</Button>
            <Tooltip title="Cerrar Vista Previa">
              <IconButton onClick={()=> setIsOpenPreview(false)}>
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
            <span className="guidedescription">
              La orden de compra ya fue enviada a tu proveedor, puedes gestionar su estatus en acciones, agregar pagos,
              archivos adjuntos y ver seguimientos.
            </span>
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
            <h4>Datos de la Garantia</h4>
            <p>
              Folio de Orden: <span>{"D344R3"}</span>
            </p>
            <p>
              Telefono: <span>{4455667787}</span>
            </p>
            <p>
              Metodo de entrega: <span>{"RECOLECCION"}</span>
            </p>
            <p>
              Condiciones de pago: <span>{"EFECTIVO"}</span>
            </p>
            <p>
              Observaciones: <span>{"SIN DETALLES"}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(new Date()).format("DD/MM/YYYY")}</span>
            </p>
          </div>
        </div>

        <div className="contentpreview__products">
          <table>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Fecha</th>
                <th>Pago</th>
                <th>Condicion de Pago</th>
                <th>Metodo de Entrega</th>
                <th>Pagado</th>
                <th>Cantidad</th>
                <th>Estatus</th>
                <th>Internacional</th>
              </tr>
            </thead>

            <tbody className="bodyTable">
              {/* {paymentsPurchase?.isFetching && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    <div className="load">
                      <div className="load__img">
                        <img src="/load.png" />
                      </div>
                      <div className="content_loadtext">
                        <p>Cargando Pagos</p>
                        <LinearProgress color="primary" />
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              {!paymentsPurchase?.isFetching &&
                paymentsPurchase?.data?.map((productOrder, index) => (
                  <tr key={index}>
                    <td>{productOrder?.purchaseorder?.folio}</td>
                    <td>{dayjs(productOrder?.purchaseorder?.date).format("YYYY/MM/DD")}</td>
                    <td>{formatNumber(productOrder?.payment)}</td>
                    <td>{productOrder?.purchaseorder?.paymentcondition}</td>
                    <td>{productOrder?.purchaseorder?.methoddelivery}</td>
                    <td>{productOrder?.ispaid ? "Pagado" : "Sin Pago"}</td>
                    <td>{productOrder?.purchaseorder?.quantity}</td>
                    <td>{productOrder?.purchaseorder?.statuspoo?.name}</td>
                    <td>{productOrder?.purchaseorder?.national ? "No" : "Si"}</td>
                  </tr>
                ))}
              {paymentsPurchase?.total === 0 && <tr>No hay datos</tr>} */}

              <tr>No hay datos</tr>
            </tbody>
          </table>
        </div>
      </div>
    </ContainerStyled>
  );
}
