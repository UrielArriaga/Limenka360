import React from "react";
import { ContainerExitStyled, Dot, LoaderWrapper } from "./styled";
import { Button, IconButton, LinearProgress } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close, NoteAdd } from "@material-ui/icons";
import SaleOrder from "./SaleOrder";
import BillingInfoShop from "./BilingInfoShop";
import { useRouter } from "next/router";
import NewTrackins from "./NewTrackins";

export default function PreviewPurchaseExit({
  handleOnClickClosePreview,
  orderSelected: inventoryExitSelected,
  infOrder,
  isFetchingOrder,
  selectOrder,
  handleOnClickArticle,
  handleOnClickGenerateData,
}) {
  const router = useRouter();
  let isFeching = false;
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
    <ContainerExitStyled>
      <div className="headerpreview">
        <h4 className="concept">Nombre de la orden {inventoryExitSelected?.folio}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              className={` button ${inventoryExitSelected?.deliveryrouteId != null ? "buttondisabled" : ""}`}
              disabled={inventoryExitSelected?.deliveryrouteId != null}
              onClick={() =>
                router.push({
                  pathname: "rutas/nuevo",
                  query: {
                    orderId: inventoryExitSelected?.orderId,
                    warehouseorderId: inventoryExitSelected?.warehouseorderId,
                    inv: inventoryExitSelected.id,
                  },
                })
              }
            >
              Generar ruta
            </Button>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => console.log("otraaccion")}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>
      <div className="contentpreview">
        <div>
          <h4>Orden de Venta</h4>
          <p>
            Folio de Salida: <span>{inventoryExitSelected?.folio}</span>
          </p>
          <p>
            Folio de Pedido: <span>{inventoryExitSelected?.orderFolio}</span>
          </p>
          <p>
            Telefono: <span>{inventoryExitSelected?.phone}</span>
          </p>
          <p>
            Fecha del Pedido:{" "}
            <span>
              {/* {dayjs(inventoryExitSelected?.createdAt).format("DD/MM/YYYY")} */}
              {inventoryExitSelected?.createdAt}
            </span>
          </p>
        </div>
        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <SaleOrder orderSelectedData={infOrder} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__address--title">Dirección de Facturación</p>
            <BillingInfoShop orderSelectedData={infOrder} />
          </div>
        </div>

        <div className="contentpreview__products">
          <table>
            <thead>
              <tr>
                <th className="code">Numero de serie</th>
                <th className="">Codigo</th>
                <th className="pro">Producto</th>
                <th className="acc">Acciones</th>
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
                selectOrder?.map((productOrderExit, index) => (
                  <tr key={index}>
                    <td>{productOrderExit?.serialnumber}</td>
                    <td>{productOrderExit?.product?.code}</td>
                    <td>{productOrderExit?.product?.name}</td>
                    <td>
                      <div className="content__actions">
                        <IconButton onClick={() => handleOnClickArticle(productOrderExit)}>
                          <AttachFile className="icon" />
                        </IconButton>
                        <IconButton onClick={() => handleOnClickGenerateData(productOrderExit)}>
                          <NoteAdd className="icon" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              {selectOrder?.length === 0 && (
                <tr>
                  <td>No hay datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <NewTrackins orderData={infOrder} inventoryType="salidas" />
      </div>
    </ContainerExitStyled>
  );
}
