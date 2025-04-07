import React, { useEffect, useState } from "react";
import { ListOrdersStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import { Delete } from "@material-ui/icons";

export default function ListOrders({
  order: purcharseOrder,
  orders,
  deleteOfListOrder,
  handleAddPurcharseOrder,
  purcharseOrdersToPickups,
  handleAddAllPurchaseOrders
}) {
  return (
    <ListOrdersStyled>
      <h3>Pedidos disponibles para ruta</h3>

      <div className="containertable">
        <div className="containertable__products">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead checkboxhead">
                <input type="checkbox" onChange={(e)=> { handleAddAllPurchaseOrders(e.target.checked,orders) }} />
              </div>
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
                        checked={purcharseOrdersToPickups?.find(item => item.id === order.id)}
                        onChange={e => handleAddPurcharseOrder(e.target.checked, order)}
                        type="checkbox"
                      />
                    </div>
                    <div className="tablecell">{dayjs(order?.createdAt).format("DD/MM/YYYY")}</div>
                    <div className="tablecell">{order?.folio || "N/A"}</div>
                    <div className="tablecell center">{order?.methoddelivery || "N/A"}</div>
                    <div className="tablecell">{order?.paymentcondition || "N/A"}</div>
                    <div className="tablecell">{order?.deliveryDate || "N/A"}</div>
                    <div className="tablecell actions">
                      {!order?.isprimary && (
                        <IconButton onClick={() => deleteOfListOrder(order)}>
                          <Delete />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ListOrdersStyled>
  );
}
