import { Button, IconButton, Input } from "@material-ui/core";
import { AttachFile, BubbleChart, ChatBubbleOutline, Close, NotificationsNone } from "@material-ui/icons";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ORDERSTATUS_ALMACEN } from "../../../../constants";
import { getColor, MoreDaysHavePassed, getLargestNumber } from "../../utils";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled, StyledMenu } from "./styles";
import useModal from "../../../../hooks/useModal";
import ModalWereHoseCount from "./ModalWereHoseCount";
import ClientInfo from "./ClientInfo";
import { formatNumberNoSymbol } from "../../../../utils";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import MenuOptions from "../MenuOptions";
import ModalRejectedOrder from "../ModalRejectedOrder";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";
import { set } from "date-fns";
import { Checkbox } from "@mui/material";
import MenuOptionsTable from "../MenuOptionsTable";
import IconMenu from "../IconMenu";
import ModalViewSerialProducts from "./ModalViewSerialProducts";
import { ORDERSSTATUSDB } from "../../../../BD/databd";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  productsData,
  ShippingsData,
  handleClickFillOrder,
  refetchPedido,
  getAvailableWereHousesByProduct,
  werehouseProductsData,
  actionsPedido,
  statesPedido,
  handleToggleWereHouses,
  handleOnClickSaveOrder,
  handleOnClickViewProduct,
  markedDeliveryProduct,
  handleRejectOrder,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  openRejected,
  closeModalReject,
  handleReject,
  toggleModalRejected,
  setRejectedOptionSelected,
  openModal,
  handleAddAllPurchaseOrders,
  activedModalNotification,
  setActivedModalNotification,
  selectedProducts,
  setSelectedProducts,
  handleToggleProduct,
  anchorElTable,
  handleMenuOpenTable,
  handleMenuCloseTable,
  handleOnClickProduct,
  handleOnClickApprovedOrder,
  getProductsSerial,
  serialProducts,
}) {
  const { productOportunitySelected, wereHouseSelected, allProductsHaveWereHouse } = statesPedido;
  const { handleOnClickwerehouse, setProductOportunitySelected, setWereHouseSelected, handleOnSendNotification } =
    actionsPedido;

  const { open, toggleModal } = useModal();

  const { open: openSerial, toggleModal: toggleModalSerial } = useModal();

  const isMarked = productsData?.results?.some(product => product.totalToExit > 0);

  const isNew = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;
  const statusApproved = orderSelectedData?.additionalinformation?.approvedlogistics;

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const anchorActions = Boolean(openActionsRow);

  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  const getMenuOptionsTable = (isOrderComplete, hasNoOrder, isOrderIncomplete, productOportunity) => {
    const options = [];

    if (isOrderComplete) {
      options.push({
        label: "Ver",
        action: () => handleOnClickViewProduct(productOportunity),
      });
    }

    if (hasNoOrder) {
      options.push({
        label: productOportunity?.isComplete ? "Listo" : productOportunity?.isMajor ? "Mayor" : "Asignar",
        action: () => handleToggleWereHouses(),
      });
    }

    if (isOrderIncomplete) {
      options.push(
        {
          label: "Ver",
          action: () => handleOnClickViewProduct(productOportunity),
        },
        {
          label: productOportunity?.isComplete ? "Listo" : productOportunity?.isMajor ? "Mayor" : "Asignar",
          action: () => handleToggleWereHouses(),
        }
      );
    }

    if (productOportunity?.quantity > productOportunity?.product?.stock) {
      options.push({
        label: "Notificar",
        action: () => {
          handleOnClickProduct(productOportunity);
        },
      });
    }

    return options;
  };

  const getMenuOptions = () => {
    return [
      { label: "Enviar a completados", action: markedDeliveryProduct },
      { label: "Rechazar Pedido", action: handleRejectOrder },
    ];
  };

  const statusOpenModalSerial =
    orderSelectedData?.exitstatus == "por surtir" || orderSelectedData?.exitstatus == "pedido nuevo"|| orderSelectedData?.exitstatus == "Proceso de compra";

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              disabled={statusOpenModalSerial}
              className={`button ${statusOpenModalSerial && "buttondisabled"}`}
              onClick={() => {
                getProductsSerial(orderSelectedData?.id);
                toggleModalSerial();
              }}
            >
              Ver serial
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              disabled={statusApproved}
              className={`button ${statusApproved && "buttondisabled"}`}
              onClick={() => {
                handleOnClickApprovedOrder();
              }}
            >
              Visible a Compras
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              disabled={!isMarked}
              className={` button ${!isMarked && "buttondisabled"}`}
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
            <MenuOptions
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              options={getMenuOptions()}
            />
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="headerinstructions">
          <BubbleChart className="icon" />
          <p className="guide">
            ¿CÓMO CONTINUAR?
            <span className="guidedescription">
              Dependiendo la cantidad solicitada, selecciona en asignar, para asignar la cantidad a los almacenes
              correspondientes. Para finalizar el pedido, selecciona en guardar pedido. Si ya fueron asignadas da click
              en ver
            </span>
          </p>
        </div>

        <div className="rowprevalig">
          <div className="contentpreview__clientinfo">
            <p className="contentpreview__clientinfo--title">Datos del cliente</p>
            <ClientInfo orderSelectedData={orderSelectedData} />
          </div>

          <div className="contentpreview_orderinfo">
            <h4>Datos del pedido</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: 6 }}>Estatus del Pedido</p>
              <div
                className="TableName"
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: 15,
                  background: getColorStatusOrder(orderSelectedData?.exitstatus).bgColor,
                }}
              >
                <p
                  className="name"
                  style={{
                    color: getColorStatusOrder(orderSelectedData?.exitstatus).color,
                    fontSize: 11,
                  }}
                  onClick={() => {}}
                >
                  {orderSelectedData?.exitstatus}
                </p>
              </div>
            </div>
            <p>
              Tipo de venta: <span>{orderSelectedData?.oportunity?.typesale?.name}</span>
            </p>
            <p>
              Folio de Orden: <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
            <p>
              Ejecutivo: <span>{orderSelectedData?.createdbyid?.fullname}</span>
            </p>
            <p>
              Grupo: <span>{orderSelectedData?.createdbyid?.group?.name}</span>{" "}
            </p>
            <p>
              Aprobador por: <span>{orderSelectedData?.approvedby?.fullname}</span>
            </p>

            <p
              style={{
                color: getColorStatusOrder(ORDERSSTATUSDB[orderSelectedData?.orderstatusId]?.name).bgColor,
              }}
            >
              Estado : {ORDERSSTATUSDB[orderSelectedData?.orderstatusId]?.name || "N/A"}
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
              {selectedProducts.length > 0 ? (
                <div className="content_actions">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Button className="button_options_table" onClick={() => setActivedModalNotification(true)}>
                      <NotificationsNone className="icon_tables" /> Notificar a compras
                    </Button>
                    <Button className="button_options_table" onClick={() => setSelectedProducts([])}>
                      <Close className="icon_tables" /> Cancelar
                    </Button>
                  </motion.div>
                </div>
              ) : (
                ""
              )}

              <div className="tableheader">
                <div className="tablehead">
                  <Checkbox
                    checked={selectedProducts.length > 0 && selectedProducts.length === productsData.results.length}
                    disabled={productsData.results?.every(product => product.product.stock >= 1)}
                    type="checkbox"
                    onChange={e => handleAddAllPurchaseOrders(e.target.checked, productsData)}
                  />
                </div>
                <div className="tablehead">
                  <p>Código</p>
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
                  <p>Cantidad en proceso</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad Solicitada</p>
                </div>

                <div className="tablehead center">
                  <p>Cantidad seleccionada</p>
                </div>
                <div className="tablehead center">
                  <p>Stock</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData?.results?.map((productOportunity, index) => {
                  const isSelected = productOportunity.id === productOportunitySelected?.id;
                  const isOrderComplete = productOportunity?.totalorder === productOportunity?.quantity;
                  const isOrderIncomplete =
                    productOportunity?.totalorder > 0 && productOportunity?.totalorder < productOportunity?.quantity;
                  const hasNoOrder = productOportunity?.totalorder == 0 && productOportunity?.quantity > 0;
                  const fecha = getLargestNumber(productOportunity?.deliverytime?.deliverytimes || "0");
                  const resultDay = MoreDaysHavePassed(orderSelectedData?.createdAt, fecha);
                  const op = getMenuOptionsTable(isOrderComplete, hasNoOrder, isOrderIncomplete, productOportunity);
                  return (
                    <div key={`${productOportunity.id}-${index}`}>
                      <div
                        className={`tablerow ${isSelected && "selected"} ${
                          productOportunity?.product.ispackage && "inPackage"
                        }`}
                      >
                        <div className="tablecell code">
                          {!productOportunity.product?.ispackage && (
                            <Checkbox
                              disabled={productOportunity.product.stock >= productOportunity.quantity ? true : false}
                              type="checkbox"
                              checked={selectedProducts.includes(productOportunity)}
                              onChange={() => handleToggleProduct(productOportunity)}
                            />
                          )}
                        </div>
                        <div className="tablecell code">{productOportunity?.product?.code}</div>
                        <div className="tablecell tableheadproductrow">
                          <div className="content">{productOportunity?.product?.name}</div>
                        </div>
                        <div className="tablecell center">
                          <div
                            className={`
    ${orderSelectedData?.exitstatus === "surtido" ? "clase-surtido" : ""}
    ${orderSelectedData?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
    ${orderSelectedData?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
  `}
                          >
                            {productOportunity?.deliverytime?.deliverytimes || "Sin Fecha"}
                          </div>
                        </div>
                        <div className="tablecell center">
                          <div className="content">
                            $
                            {formatNumberNoSymbol(
                              productOportunity?.product?.callamount * productOportunity?.quantity +
                                productOportunity?.iva
                            )}
                          </div>
                        </div>
                        <div className="tablecell center">
                          <div className="content">${formatNumberNoSymbol(productOportunity?.total)}</div>
                        </div>
                        <div className="tablecell center">{productOportunity?.totalorder}</div>
                        <div className="tablecell center">{productOportunity?.quantity}</div>
                        <div className="tablecell center">
                          <div className="totalToExit">{productOportunity?.totalToExit || 0}</div>
                        </div>
                        <div className="tablecell center">{productOportunity?.product?.stock}</div>
                        <div className="tablecell">
                          {productOportunity.product.ispackage !== true && <IconMenu options={op} />}

                          {/* <MenuOptionsTable
                            handleMenuOpenTable={handleMenuOpenTable}
                            anchorElTable={anchorElTable}
                            handleMenuCloseTable={handleMenuCloseTable}
                            options={op}
                            disabled={productOportunity.product.ispackage === true}
                          /> */}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && productOportunitySelected?.id === productOportunity?.id && (
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
                                      key={index}
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

        <NewTrackinsOrder orderData={orderSelectedData} />
      </div>

      <ModalWereHoseCount
        open={open}
        handletoogle={toggleModal}
        productOportunitySelected={productOportunitySelected}
        wereHouseSelected={wereHouseSelected}
        actionsPedido={actionsPedido}
      />

      <ModalViewSerialProducts open={openSerial} handletoogle={toggleModalSerial} serialProducts={serialProducts} />

      <ModalRejectedOrder
        open={openRejected}
        close={closeModalReject}
        handleReject={handleReject}
        toggleModalRejected={toggleModalRejected}
        setRejectedOptionSelected={setRejectedOptionSelected}
      />
    </PreviewOrderStyled>
  );
}
