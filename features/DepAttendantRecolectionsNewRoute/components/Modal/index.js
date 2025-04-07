import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ModalStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination } from "@material-ui/lab";

export default function Modal({
  open = false,
  onClose = () => {},
  orders,
  ordersToAdd,
  handleOnChangeAddOrder,
  handlePage,
  page,
  purcharseOrdersToPickups
}) {

  useEffect(()=>{},[orders, purcharseOrdersToPickups,ordersToAdd,open])
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
          <h2 className="title">Ordenes de compra disponibles para asignar a ruta</h2>

          <div className="closeO">
            <button onClick={onClose} className="close_button">Cerrar</button>
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
                    <p>Metodo de entrega</p>
                  </div>
                  <div className="tablehead">
                    <p>Metodo de pago</p>
                  </div>
                  <div className="tablehead">
                    <p>Fecha de entrega</p>
                  </div>
                </div>

                <div className="tablebody">
                  {orders?.data?.map((order, index) => (
                    <div key={index}>
                      <div className="tablerow">
                        <div className="tablecell tablecellcheckbox">
                          {order?.isprimary == true ? (
                            <input
                              checked
                              type="checkbox"
                            />
                          ):(
                            <input
                              checked={ordersToAdd.find(item => item.id === order.id)}
                              type="checkbox"
                              onChange={e => handleOnChangeAddOrder(e.target.checked, order)}
                            />
                          )}
                        </div>
                        <div className="tablecell">{dayjs(order.createdAt).format("DD/MM/YYYY")}</div>
                        <div className="tablecell">{order?.folio || "N/A"}</div>
                        <div className="tablecell center">{order?.methoddelivery || "N/A"}</div>
                        <div className="tablecell center">{order?.paymentcondition || "N/A"}</div>
                        <div className="tablecell center">{order?.deliveryDate || "N/A"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <Pagination
            variant="outlined"
            count={Math.ceil(orders?.count / 10)}
            onChange={(e, value) => handlePage(value)}
            size="small"
            page={page}
            color="primary"
          />
        </div>
      </div>
    </ModalStyled>
  );
}
