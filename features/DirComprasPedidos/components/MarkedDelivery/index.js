import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { Button, Fade, Grid, IconButton, withStyles, Switch, LinearProgress } from "@material-ui/core";
import { DialogContainer } from "./styles";
import { Add, ArrowBackIos } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";
import { formatNumber } from "../../../../utils";

import usePagination from "../../../../hooks/usePagination";
import { colors } from "../../../../styles/global.styles";

export default function ProductDelivery({ openModalDelivery = true, toggleModalDelivery, productsData }) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [orders, setOrders] = useState({
    isFeching: false,
    data: [],
    count: 0,
  });
  const [orderSelected, setOrderSelected] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [view, setView] = useState("selectOrder");
  const { page, limit, handlePagination, setPage } = usePagination({ defaultPage: 1 });
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // getOrders(search);
  }, [search, page, isAscending]);

  return (
    <Dialog
      maxWidth={1000}
      open={openModalDelivery}
      keepMounted
      onClose={toggleModalDelivery}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <div className="headerDialog__title">
            <p className="">Marcar listos para entrega</p>
          </div>
        </div>
        <div className="containerTable">
          <div className="products">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Proveedor</th>
                  <th>Cantidad</th>
                  <th>Por surtir</th>
                  <th>Stock</th>
                  <th>Marcar entregado</th>
                </tr>
              </thead>
              {}

              <tbody className="bodyTable">
                {}
                {productsData?.isFetching ? (
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
                ) : (
                  productsData?.results?.map((productOportunity, index) => (
                    <tr key={index}>
                      <td>{productOportunity?.product.name}</td>
                      <td>{productOportunity?.product?.provider?.companyname}</td>
                      <td>{productOportunity?.quantity}</td>
                      <td> <input className="input_data" type={"number"} placeholder="ingesa la cantidad a surtir" /> </td>
                      <td>{productOportunity?.product?.stock}</td>

                      <td>
                        <input type="checkbox" placeholder="Entregado"/>
                      </td>
                      {/* <td>
                  <div>
                    <Tooltip title="Validar Stock">
                      <IconButton>
                        <Check />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContainer>
    </Dialog>
  );
}
