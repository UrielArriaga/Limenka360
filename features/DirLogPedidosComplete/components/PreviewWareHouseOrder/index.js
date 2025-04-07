import { Button, IconButton } from "@material-ui/core";
import { ArrowBackIos, AttachFile, ChatBubbleOutline, Close } from "@material-ui/icons";
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

export default function PreviewWareHouseOrder({
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

  const isMarked = productsData?.results?.some(product => product.isComplete);

  const isNew = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;

  const [isOpen, setIsOpen] = useState(false);

  // const [productOportunitySelected, setProductOportunitySelected] = useState(null);

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
        <div className="row">
          <IconButton onClick={() => handleOnClickViewProduct(null)}>
            <ArrowBackIos />
          </IconButton>
          <p className="concept" onClick={() => router.push(`./pedidos/${orderSelectedData?.id}`)}>
            Lista de Asignaciones
          </p>
        </div>

        {/* <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              disabled={!isMarked}
              className={` button ${!isMarked && "buttondisabled"}`}
              onClick={() => handleOnClickSaveOrder()}
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
        </div> */}
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          <div>
            <h4>Orden de Venta</h4>
            <p>
              Folio de Orden: <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
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
            <p className="contentpreview__address--title">Almacen Asignado </p>
            <AddressInfo orderSelectedData={orderSelectedData} />
          </div>
          {/* <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div> */}
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
                  <p>Cantidad Surtida</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad Solicitada</p>
                </div>
                <div className="tablehead center">
                  <p>Stock</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData.results.map((productOportunity, index) => (
                  <div key={index}>
                    <div
                      className={`tablerow  ${productOportunity.id == productOportunitySelected?.id && "selected"}`}
                      onClick={() => {}}
                    >
                      <div className="tablecell code">{productOportunity.product.code}</div>
                      <div className="tablecell tableheadproductrow">
                        <div className="content">{productOportunity.product.name}</div>
                      </div>
                      <div className="tablecell center">{productOportunity.totalorder}</div>
                      <div className="tablecell center">{productOportunity.quantity}</div>
                      <div className="tablecell center">{productOportunity.product.stock}</div>
                      <div className="tablecell actions">
                        <div>
                          {productOportunity?.totalorder === productOportunity?.quantity && (
                            <button onClick={() => handleToggleWereHouses()}>Ver</button>
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
                                almacenes :
                              </h4>
                            </div>
                            <div className="content">
                              {werehouseProductsData?.results?.map((item, index) => {
                                return (
                                  <div
                                  key={index}
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
                                      Piezas
                                      {
                                        productOportunity?.x?.filter((y, i) => {
                                          return y.werehouseId === item.warehouseId;
                                        })[0]?.quantity
                                      }
                                    </p>
                                  </div>
                                );
                              })}

                              {/* <p>Este es el contenido que se colapsa y expande.</p>
                              <p>Puedes agregar más contenido aquí.</p> */}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
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
