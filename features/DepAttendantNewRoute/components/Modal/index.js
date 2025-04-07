import dayjs from "dayjs";
import React, { useState } from "react";
import { ModalStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@material-ui/lab";

export default function Modal({
  open = false,
  onClose = () => {},
  orders,
  ordersToAdd,
  handleOnChangeAddOrder,
  GetprodutinventoryExit,
  productsModal,
}) {
  const [showProducts, setShowProducts] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);

  const handleOnClickSelectOrder = order => {
    GetprodutinventoryExit(order);
    setOrderSelected(order);
    setShowProducts(true);
  };

  return (
    <ModalStyled
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="containermodal">
        <div className="header">
          <h2 className="title">Pedidos disponibles para asignar a ruta</h2>
          <div className="close">
            <button onClick={onClose} className="button-close">
              Cerrar
            </button>
          </div>
        </div>
        <div className="bodymodal">
          <div className="containertable">
            <div className="containertable__products">
              <div className="table">
                <div className="tableheader">
                  <div className="tablehead checkboxhead"></div>
                  <div className="tablehead">
                    <p>Fecha de creacion</p>
                  </div>
                  <div className="tablehead">
                    <p>Folio de orden</p>
                  </div>

                  <div className="tablehead">
                    <p>Direccion de Envio</p>
                  </div>

                  <div className="tablehead">
                    <p>Total de productos</p>
                  </div>

                  <div className="tablehead">
                    <p>Acciones </p>
                  </div>
                </div>

                <div className="tablebody">
                  {orders?.map((order, index) => (
                    <div key={index}>
                      <div className="tablerow">
                        <div className="tablecell tablecellcheckbox">
                          <input
                            checked={ordersToAdd.find(item => item?.id === order?.id)}
                            type="checkbox"
                            onChange={e => handleOnChangeAddOrder(e.target.checked, order)}
                          />
                        </div>
                        <div className="tablecell">{dayjs(order?.createdAt).format("DD/MM/YYYY")}</div>
                        <div className="tablecell">{order?.order?.folio}</div>
                        <div className="tablecell">
                          {order?.order?.address?.entity?.name},{order?.order?.address?.city?.name},
                          {order?.order?.address?.postal?.postal_code}
                        </div>
                        <div className="tablecell center">{order?.quantity || 0}</div>

                        <div className="tablecell actions">
                          <button onClick={() => handleOnClickSelectOrder(order)}>Ver Productos</button>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {showProducts && orderSelected.id === order.id && (
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
                                <h4>Productos</h4>

                                {productsModal.isFetching ? (
                                  <Skeleton variant="text" />
                                ) : productsModal.results.products.length != 0 ? (
                                  productsModal.results.products.map((item, index) => {
                                    return (
                                      <div key={index} style={{ justifyContent: "space-between" }}>
                                        <p>modelo: {item.id} </p>
                                        <p>serie: {item.articledescripcion},</p>
                                        <p>nombre: {item.name}</p>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div>
                                    <p>Sin productos</p>
                                  </div>
                                )}
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

        <div className="actions"></div>
      </div>
    </ModalStyled>
  );
}
