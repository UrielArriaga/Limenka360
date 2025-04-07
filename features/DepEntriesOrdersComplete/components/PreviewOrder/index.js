import { Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import {
  Add,
  AttachFile,
  ChatBubbleOutline,
  Close,
  KeyboardReturnOutlined,
  MoreVert,
  Refresh,
  Visibility,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ORDERSTATUS_ALMACEN } from "../../../../constants";
import { getColor } from "../../utils";
import AddressInfo from "./AddressInfo";
import BillingInfo from "./BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import useModal from "../../../../hooks/useModal";
import ModalWereHoseCount from "./ModalWereHoseCount";
import ClientInfo from "./ClientInfo";
import TrackinsHistory from "../TrackingsHistory";
import ModalPdfPrint from "../../../../components/ModalPdfPrint";
import ModalReturnProduct from "./ModalReturnProduct";

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
  setRefetch,
  refetch,
}) {
  const { productOportunitySelected, wereHouseSelected, allProductsHaveWereHouse } = statesPedido;
  const { handleOnClickwerehouse, setProductOportunitySelected, setWereHouseSelected } = actionsPedido;
  const { open, toggleModal } = useModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [productToOrderSelected, setProductToOrderSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [purcharseOrdersToPickups, setPurcharseOrdersToPickups] = useState([]);
  const { open: openModal, toggleModal: toggleModalProducts } = useModal();
  const isPickupDisabled = purcharseOrdersToPickups?.length > 0;
  const isMarked = productsData?.results?.some(product => product.isComplete);
  const isNew = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;

  const handleAddPurcharseOrder = (isChecked, product) => {
    if (isChecked) {
      setPurcharseOrdersToPickups(prev => {
        if (!prev.some(item => item?.id === product?.id)) {
          return [...prev, product];
        }
        return prev;
      });
    } else {
      setPurcharseOrdersToPickups(prev => prev.filter(item => item?.id !== product?.id));
    }
  };

  const handleSelectAll = checked => {
    setSelectAll(checked);
    if (checked) {
      const allProducts = productsData?.results.filter(product => !product?.returnsId);
      setPurcharseOrdersToPickups(allProducts);
    } else {
      setPurcharseOrdersToPickups([]);
    }
  };

  const handleAddToOrder = products => {
    setProductToOrderSelected(products);
    toggleModalProducts();
  };

  const handleClickProduct = product => {
    setProductToOrderSelected([product]);
    toggleModalProducts();
  };

  const handleCancelAll = () => {
    setSelectAll(false);
    setPurcharseOrdersToPickups([]);
  };

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
            <ModalPdfPrint pdfUrl={orderSelectedData?.url} />
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              disabled={!isMarked}
              className={`button ${!isMarked && "buttondisabled"}`}
              onClick={handleOnClickSaveOrder}
            >
              Guardar Pedido
            </Button>
          </div>
          <div className="headerpreview__listactions--item" onClick={handleToggleFiles}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={toggleTrackingsModal}>
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
              Folio de Orden: <span>{orderSelectedData?.folio || "N/A"}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
            <p>
              Observacion del Pedido:{" "}
              <span>
                <b>{orderSelectedData?.observations || "N/A"}</b>
              </span>
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColor(orderSelectedData?.warehousesstatus?.name).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColor(orderSelectedData?.warehousesstatus?.name).color }}>
              {orderSelectedData?.warehousesstatus?.name}
            </p>
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <AddressInfo orderSelectedData={orderSelectedData} />
          </div>
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos del Cliente</p>
            <ClientInfo orderSelectedData={orderSelectedData} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>
        <div className="headers">
          <p className="subtitle">Total: {productsData?.results.length}</p>
          <Refresh onClick={() => setRefetch(!refetch)} className="iconRefresh" />
        </div>
        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            {purcharseOrdersToPickups?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="OrderAdd"
              >
                <Button
                  className="ButtonAdd"
                  startIcon={<Add />}
                  onClick={() => handleAddToOrder(purcharseOrdersToPickups)}
                >
                  Devolver Productos
                </Button>
                <Button className="cancel" onClick={handleCancelAll}>
                  Cancelar
                </Button>
                <p className="totalSelected">Productos seleccionados ({purcharseOrdersToPickups.length})</p>
              </motion.div>
            )}
            <div className="table">
              <div className="tableheader">
                <div className="tablehead checkboxhead">
                  <input type="checkbox" checked={selectAll} onChange={e => handleSelectAll(e.target.checked)} />
                </div>
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead">
                  <p>Numero de Serie</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead">
                  <p>Almacen</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              {productsData?.isFetching ? (
                <div className="tablebody">
                  <div className="loader">
                    <CircularProgress />
                    <p className="title">Cargando</p>
                  </div>
                </div>
              ) : productsData?.results?.length > 0 ? (
                <div className="tablebody">
                  {productsData?.results.map((productOportunity, index) => (
                    <div key={index}>
                      <div
                        className={`tablerow  ${productOportunity.id === productOportunitySelected?.id && "selected"}`}
                      >
                        <div className="tablecell code">
                          <input
                            type="checkbox"
                            checked={purcharseOrdersToPickups.some(item => item.id === productOportunity.id)}
                            onChange={e => handleAddPurcharseOrder(e.target.checked, productOportunity)}
                            disabled={productOportunity?.returnsId}
                          />
                        </div>
                        <div className="tablecell code">{productOportunity?.product?.code}</div>
                        <div className="tablecell code">{productOportunity?.serialnumber}</div>

                        <div className="tablecell tableheadproductrow">
                          <div className="content">{productOportunity?.product?.name}</div>
                        </div>
                        <div className="tablecell code">
                          <div className="content">{productOportunity?.warehouse?.name}</div>
                        </div>

                        <div className="tablecell actions">
                          {!productOportunity?.returnsId ? (
                            <Tooltip title={"Devolver Producto"} placement="top-start">
                              <IconButton
                                disabled={isPickupDisabled}
                                className={isPickupDisabled ? "icnButtonDisabled" : "icnButton"}
                                onClick={() => handleClickProduct(productOportunity)}
                              >
                                <KeyboardReturnOutlined className="icon" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Acción no disponible Producto en devolución" placement="top-start">
                              <IconButton className={isPickupDisabled ? "icnButtonDisabled" : "icnRed"}>
                                <KeyboardReturnOutlined className="icon" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {/* <div>
                            {orderSelectedData?.exitstatus !== "completado" && (
                              <Tooltip title="Ver">
                                <IconButton
                                  className={"icnButton"}
                                  onClick={() => handleOnClickViewProduct(productOportunity)}
                                >
                                  <Visibility className="icon" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div> */}
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
                                  almacenes :
                                </h4>
                              </div>
                              <div className="content">
                                {werehouseProductsData?.results?.map((item, index) => {
                                  return (
                                    <div
                                      className={"itemwerehouse"}
                                      onClick={() => {
                                        handleOnClickwerehouse(productOportunitySelected, item);
                                        toggleModal();
                                      }}
                                    >
                                      {productOportunity?.x?.some(x => x.werehouseId === item.warehouseId) && (
                                        <p>Ya asignado</p>
                                      )}
                                      <p>{item?.warehouseName}</p>
                                      <p>
                                        <span className="unit">({item?.stock} Unidades)</span>
                                      </p>

                                      <p>
                                        Piezas{" "}
                                        {
                                          productOportunity?.x?.filter((y, i) => {
                                            return y.werehouseId === item.warehouseId;
                                          })[0]?.quantity
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
                  ))}
                </div>
              ) : (
                <p>No hay resultados.</p>
              )}
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

      <TrackinsHistory orderData={orderSelectedData} />
      <ModalWereHoseCount
        open={open}
        handletoogle={toggleModal}
        productOportunitySelected={productOportunitySelected}
        wereHouseSelected={wereHouseSelected}
        actionsPedido={actionsPedido}
      />
      <ModalReturnProduct
        openWarningModal={openModal}
        handleCloseWarningModal={toggleModalProducts}
        purcharseOrdersToPickups={purcharseOrdersToPickups}
        productToOrderSelected={productToOrderSelected}
        setRefetch={setRefetch}
        refetch={refetch}
        handleCancelAll={handleCancelAll}
      />
    </PreviewOrderStyled>
  );
}
