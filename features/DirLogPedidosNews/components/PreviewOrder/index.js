import { Button, IconButton } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ORDERSTATUS_ALMACEN } from "../../../../constants";
import { getColor, MoreDaysHavePassed, getLargestNumber } from "../../utils";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import useModal from "../../../../hooks/useModal";
import ModalWereHoseCount from "./ModalWereHoseCount";
import ClientInfo from "./ClientInfo";
import { formatNumberNoSymbol } from "../../../../utils";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  productsData,
  handleClickFillOrder,
  refetchPedido,
  getAvailableWereHousesByProduct,
  werehouseProductsData,
  actionsPedido,
  statesPedido,
  handleToggleWereHouses,
  handleOnClickSaveOrder,
  handleOnClickViewProduct,
}) {
  const { productOportunitySelected, wereHouseSelected, allProductsHaveWereHouse } = statesPedido;
  const { handleOnClickwerehouse, setProductOportunitySelected, setWereHouseSelected } = actionsPedido;

  const { open, toggleModal } = useModal();

  const isMarked = productsData?.results?.some(product => product.totalToExit > 0);

  const isNew = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

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
        <p className="concept" onClick={() => router.push(`./pedidos/${orderSelectedData?.id}`)}>
          {orderSelectedData?.folio}
        </p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              // className="button"

              // onClick={() => console.log("e")}
              disabled={!isMarked}
              className={` button ${!isMarked && "buttondisabled"}`}
              onClick={() => {
                handleOnClickSaveOrder();
              }}
            >
              Guardar Pedido
            </Button>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
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
          <div className="contentpreview__clientinfo">
            <p className="contentpreview__clientinfo--title">Datos del cliente</p>
            <ClientInfo orderSelectedData={orderSelectedData} />
          </div>

          <div className="contentpreview_orderinfo">
            <h4>Datos del pedido</h4>
            <p>
              Folio de Orden: <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
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
                  <p>Codigo</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead center">
                  <p>Tiempo de entrega</p>
                </div>
                <div className="tablehead center">
                  <p>Precio total de lista</p>
                </div>
                <div className="tablehead center">
                  <p>Precio total de venta</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad Surtida</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad Solicitada</p>
                </div>

                <div className="tablehead center">
                  <p>Cantidad para Salida</p>
                </div>
                <div className="tablehead center">
                  <p>Stock</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData.results.map((productOportunity, index) => {
                  const isSelected = productOportunity.id === productOportunitySelected?.id;
                  const isOrderComplete = productOportunity?.totalorder === productOportunity?.quantity;
                  const isOrderIncomplete =
                    productOportunity?.totalorder > 0 && productOportunity.totalorder < productOportunity.quantity;
                  const hasNoOrder = productOportunity?.totalorder == 0 && productOportunity.quantity > 0;
                  const fecha = getLargestNumber(productOportunity.deliverytime?.deliverytimes || "0");
                  const resultDay = MoreDaysHavePassed(orderSelectedData?.createdAt, fecha);
                  return (
                    <div key={index}>
                      <div className={`tablerow ${isSelected && "selected"}`} onClick={() => {}}>
                        <div className="tablecell code">{productOportunity.product.code}</div>
                        <div className="tablecell tableheadproductrow">
                          <div className="content">{productOportunity.product.name}</div>
                        </div>
                        <div className="tablecell center">
                          <div
                            className={`
    ${orderSelectedData?.exitstatus === "surtido" ? "clase-surtido" : ""}
    ${orderSelectedData?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
    ${orderSelectedData?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
  `}
                          >
                            {productOportunity.deliverytime?.deliverytimes || "Sin Fecha"}
                          </div>
                        </div>
                        <div className="tablecell center">
                          <div className="content">
                            $
                            {formatNumberNoSymbol(
                              productOportunity.product?.callamount * productOportunity.quantity + productOportunity.iva
                            )}
                          </div>
                        </div>
                        <div className="tablecell center">
                          <div className="content">${formatNumberNoSymbol(productOportunity.total)}</div>
                        </div>
                        <div className="tablecell center">{productOportunity.totalorder}</div>
                        <div className="tablecell center">{productOportunity.quantity}</div>
                        <div className="tablecell center">
                          <div className="totalToExit">{productOportunity.totalToExit || 0}</div>
                        </div>
                        <div className="tablecell center">{productOportunity.product.stock}</div>
                        <div className="tablecell actions">
                          <div>
                            {isOrderComplete && (
                              <button onClick={() => handleOnClickViewProduct(productOportunity)}>Ver</button>
                            )}

                            {hasNoOrder && (
                              <button onClick={() => handleToggleWereHouses()}>
                                {productOportunity?.isComplete
                                  ? "Listo"
                                  : productOportunity?.isMajor
                                  ? "Mayor"
                                  : "Asignxxxar"}
                              </button>
                            )}

                            {isOrderIncomplete && (
                              <div>
                                <button onClick={() => handleOnClickViewProduct(productOportunity)}>Ver</button>
                                <button onClick={() => handleToggleWereHouses()}>
                                  {productOportunity?.isComplete
                                    ? "Listo"
                                    : productOportunity?.isMajor
                                    ? "Mayor"
                                    : "Asignxxar"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && productOportunitySelected.id === productOportunity.id && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="stocksavailables">
                              <div className="sectionstock">
                                <h4>
                                  Producto {productOportunitySelected?.product?.code} disponible en los siguientes
                                  almacenes:
                                </h4>
                              </div>
                              <div className="content">
                                {werehouseProductsData?.results?.map((item, index) => {
                                  const isAssigned = productOportunity?.x?.some(
                                    x => x.werehouseId === item.warehouseId
                                  );

                                  return (
                                    <div
                                      className="itemwerehouse"
                                      onClick={() => {
                                        handleOnClickwerehouse(productOportunitySelected, item);
                                        toggleModal();
                                      }}
                                    >
                                      {isAssigned && <p>Ya asignado</p>}
                                      <p>{item?.warehouseName}</p>
                                      <p>
                                        <span className="unit">({item?.stock} Unidades)</span>
                                      </p>
                                      <p>
                                        Piezas
                                        {
                                          productOportunity?.x?.filter(y => y.werehouseId === item.warehouseId)[0]
                                            ?.quantity
                                        }
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="observations">
          <div>
            <h4>Observaciones Generales</h4>
            <p className="text_observations">{orderSelectedData?.observations || "Sin observaciones"}</p>
          </div>
        </div>
      </div>

      <ModalWereHoseCount
        open={open}
        handletoogle={toggleModal}
        productOportunitySelected={productOportunitySelected}
        wereHouseSelected={wereHouseSelected}
        actionsPedido={actionsPedido}
      />
    </PreviewOrderStyled>
  );
}
