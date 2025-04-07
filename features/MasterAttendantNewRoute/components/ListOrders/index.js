import React, { useEffect, useState } from "react";
import { ListOrdersStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import { AttachFile, Delete, FiberManualRecord, NoteAdd, Store } from "@material-ui/icons";
import { api } from "../../../../services/api";

export default function ListOrders({
  order: asdas,
  orders,
  isPackage,
  handleOnClickSelectOrder,
  orderSelected,
  handleEditProduct,
  funtionSeleccion,
  handleDeleteOrder,
  GetprodutinventoryExit,
}) {
  const [showProducts, setShowProducts] = useState(false);
  const [orderSelectedLocal, setOrderSelectedLocal] = useState(null);
  const [id, setId] = useState();

  return (
    <ListOrdersStyled>
      <h3 onClick={() => console.log(orders)}>Pedidos disponibles para ruta</h3>

      <div className="containertable">
        <div className="containertable__products">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead checkboxhead">
                <input type="checkbox" />
              </div>
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
                <p>Folio de salida</p>
              </div>
              <div className="tablehead">
                <p>Tipo de envío</p>
              </div>
              <div className="tablehead">
                <p>Acciones </p>
              </div>
            </div>

            <div className="tablebody">
              {orders?.map((order, index) => {
                return (
                  <div key={index}>
                    <div className="tablerow">
                      <div className="tablecell tablecellcheckbox">
                        <input type="checkbox" />
                      </div>
                      <div className="tablecell">{dayjs(order?.createdAt).format("DD/MM/YYYY")}</div>
                      <div className="tablecell">{order?.order?.folio}</div>
                      <div className="tablecell">
                        {order?.order?.address?.entity?.name},{order?.order?.address?.city?.name},
                        {order?.order?.address?.postal?.postal_code}
                      </div>
                      <div className="tablecell center">{order?.total || 0}</div>
                      <div className="tablecell">{order?.warehouseId}</div>
                      <div className="tablecell">{order?.shipping?.shippingtype?.name}</div>

                      <div className="tablecell actions">
                        <IconButton onClick={() => funtionSeleccion(order)}>
                          <AttachFile />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            if (order?.id != id) {
                              GetprodutinventoryExit(order);
                              setId(order?.id);
                            } else {
                              handleOnClickSelectOrder(order);
                              setOrderSelectedLocal(order);
                              setShowProducts(!showProducts);
                            }
                          }}
                        >
                          <Store />
                        </IconButton>
                        {!order?.isprimary && (
                          <IconButton onClick={() => handleDeleteOrder(order)}>
                            <Delete />
                          </IconButton>
                        )}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {showProducts && orderSelectedLocal?.id === order?.id && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="tablelist">
                            {/* <p>ads</p> */}
                            {order?.products?.length === 0 ? (
                              <div style={{ padding: "10px" }}>
                                <b>Sin productos</b>
                              </div>
                            ) : (
                              order?.products?.map((article, indexh) => {
                                return (
                                  <div className="tablelititem" key={indexh}>
                                    {/* <pre>{JSON.stringify(article, null, 2)}</pre> */}
                                    <div className="description">
                                      <FiberManualRecord className="icon" />
                                      <p className="serialnumber">{article?.id}</p>
                                      <p className="name">{article?.name}</p>
                                      <textarea
                                        // onChange={e => handleOnChangeComments(productOportunity, article, e.target.value)}
                                        value={article?.comments}
                                        placeholder="Comentarios"
                                        rows="4"
                                      />
                                    </div>

                                    <div className="contentdimentions">
                                      <div>
                                        Peso:{" "}
                                        <input
                                          type="number"
                                          placeholder="kg"
                                          className="inputdimentions"
                                          min="0"
                                          onChange={e => handleEditProduct(e.target.value, "weight", index, orders)}
                                          defaultValue={article?.weight}
                                        />
                                      </div>
                                      <div>
                                        Altura:{" "}
                                        <input
                                          type="number"
                                          placeholder="cm"
                                          min="0"
                                          className="inputdimentions"
                                          onChange={e => handleEditProduct(e.target.value, "high", index, orders)}
                                          defaultValue={article?.high}
                                        />
                                      </div>
                                      <div>
                                        Largo:
                                        <input
                                          type="number"
                                          placeholder="cm"
                                          min="0"
                                          className="inputdimentions"
                                          onChange={e => handleEditProduct(e.target.value, "long", index, orders)}
                                          defaultValue={article?.long}
                                        />
                                      </div>
                                      <div>
                                        Ancho:
                                        <input
                                          type="number"
                                          placeholder="cm"
                                          min="0"
                                          className="inputdimentions"
                                          onChange={e => handleEditProduct(e.target.value, "broad", index, orders)}
                                          defaultValue={article?.broad}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
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
    </ListOrdersStyled>
  );
}
