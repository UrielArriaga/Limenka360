import React from "react";
import { ModalAssingWereHouseStyled } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { getColorStatusSHOPPINGORDER } from "../../../../utils/DirLog";
import { Divider, IconButton, Tooltip } from "@material-ui/core";
import { Pageview, RemoveRedEye } from "@material-ui/icons";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@material-ui/lab";

export default function ModalMarkDelivery({
  open,
  handleToggle,
  productToOrderSelected,
  orderDataSelect,
  GetSuplaceProducts,
  productsModal,
}) {
  const router = useRouter();
  const [showProducts, setShowProducts] = useState(false);

  const [productsByOrderCompras, setProductsByOrderCompras] = useState({
    isFetching: false,
    results: [],
    count: 0,
  });
  const [orderSelected, setOrderSelected] = useState(null);

  useEffect(() => {
    const getProductsByOrderCompras = async () => {
      try {
        let params = {
          where: {
            orderId: orderDataSelect.id,
          },
          include: "product,product.brand,product.category,product.producttypeId",
          // include: "purchaseorder,purchaseorder.statuspoo",
          count: 1,
        };
        const response = (await api.get("pickuppurchaseorder/grouppurchaseorder", { params })).data;
        setProductsByOrderCompras({
          isFetching: false,
          results: response.results,
          count: response.count,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (open && orderDataSelect) {
      getProductsByOrderCompras();
    }
  }, [open]);

  const handleOnClickSelectOrder = order => {
    // console.log(order.id, "la orden dentro de la funcion");
    GetSuplaceProducts(order);
    setOrderSelected(order);
    setShowProducts(true);
  };

  const handleClose = () => {
    handleToggle();
    setShowProducts(false);
  };

  return (
    <ModalAssingWereHouseStyled
      anchor="left"
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="container">
        <div className="header">
          <h2>Estatus de ordenes de compra</h2>
          <button className="btn_save" onClick={() => handleClose()}>
            Cerrar
          </button>
        </div>

        <div className="body">
          <div className="listorders">
            <div className="containerTable">
              <div className="table">
                <div className="tableheader">
                  <div className="tablehead">
                    <p>Fecha de creacion</p>
                  </div>
                  <div className="tablehead">
                    <p>Folio de orden </p>
                  </div>
                  <div className="tablehead">
                    <p>Cantidad de productos</p>
                  </div>
                  <div className="tablehead">
                    <p>Estatus </p>
                  </div>
                  <div className="tablehead">
                    <p>Acciones</p>
                  </div>
                </div>

                <div className="tablebody">
                  {productsByOrderCompras?.results.map((item, index) => {
                    const purchaseorder = item?.purchaseorder || { statuspoo: {} };
                    const statuspoo = purchaseorder?.statuspoo || {};
                    return (
                      <div key={index}>
                        <div className={`tablerow`} onClick={() => {}}>
                          <div className="tablecell code">
                            <p>{dayjs(purchaseorder?.createdAt).format("DD MMM YYYY")}</p>
                          </div>

                          <div className="tablecell code">
                            <p>{purchaseorder?.folio}</p>
                          </div>

                          <div className="tablecell code">
                            <p>{purchaseorder?.quantity}</p>
                          </div>

                          {purchaseorder?.draft ? (
                            <div className="tablecell code">
                              <div
                                className="TableName"
                                style={{
                                  display: "inline-block",
                                  padding: "2px 10px",
                                  borderRadius: 15,
                                  background: "#51A550",
                                }}
                              >
                                <p
                                  className="name"
                                  style={{
                                    color: "#fff",
                                    // color: getColorStatusSHOPPINGORDER(statuspoo?.name).color,
                                  }}
                                  onClick={() => {}}
                                >
                                  {purchaseorder?.draft ? "Borrador" : statuspoo?.name || "Borrador"}

                                  {/* {statuspoo?.name || "Borrador"}. */}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="tablecell code">
                              <div
                                className="TableName"
                                style={{
                                  display: "inline-block",
                                  padding: "2px 10px",
                                  borderRadius: 15,
                                  background: getColorStatusSHOPPINGORDER(statuspoo?.name).bgColor,
                                }}
                              >
                                <p
                                  className="name"
                                  style={{
                                    color: getColorStatusSHOPPINGORDER(statuspoo?.name).color,
                                  }}
                                  onClick={() => {}}
                                >
                                  {purchaseorder?.draft ? "Borrador" : statuspoo?.name || "Borrador"}

                                  {/* {statuspoo?.name || "Borrador"}. */}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="tablecell actions">
                            <Tooltip title="Ver detalle">
                              <IconButton
                                className="iconbuttonaction"
                                onClick={() => {
                                  // handleOnClickSelectOrder(item);

                                  router.push({
                                    pathname: `/comprasv2/ordenes/${purchaseorder?.id}`,
                                  });
                                }}
                              >
                                <Pageview className="iconaction" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Ver Productos">
                              <IconButton
                                className="iconbuttonaction"
                                onClick={() => {
                                  handleOnClickSelectOrder(item), setShowProducts(!showProducts);

                                  // router.push({
                                  //   pathname: `/comprasv2/ordenes/${purchaseorder?.id}`,
                                  // });
                                }}
                              >
                                <RemoveRedEye className="iconaction" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {showProducts && orderSelected.purchaseO === item.purchaseorder.id && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden", padding: "5px" }}
                            >
                              <div className="container-product">
                                <h4>Productos</h4>
                              </div>
                              {productsModal.isFetching ? (
                                <Skeleton variant="text" />
                              ) : productsModal.resultslength != 0 ? (
                                productsModal.results.products.map((itemd, index) => {
                                  return (
                                    <div key={index} className="cards">
                                      <p className="cant">
                                        <b>Cantidad:</b>
                                        {itemd.Cant} {itemd.unidad}
                                      </p>
                                      <p className="model">
                                        <b>Modelo:</b>
                                        {itemd.code}{" "}
                                      </p>
                                      <p className="name">
                                        <b>Nombre:</b>
                                        {itemd.name}
                                      </p>
                                      <p className="desc">
                                        <b>Descripción:</b>
                                        {itemd.descripcion}
                                      </p>
                                    </div>
                                  );
                                })
                              ) : (
                                <div>
                                  <p>Sin productos</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* {warehouseorders.map((warehouseOrder, index) => (
                  <div key={index}>
                    <div className={`tablerow  `} onClick={() => {}}>
                      <div className="tablecell code">{warehouseOrder?.warehouse?.name}</div>

                      <div className="tablecell">{warehouseOrder?.totalassing}</div>
                      <div className="tablecell">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: 15,
                            background: getColorStatusOrder(warehouseOrder?.statuswho).bgColor,
                            color: getColorStatusOrder(warehouseOrder?.statuswho).color,
                          }}
                        >
                          {warehouseOrder?.statuswho == "pedido nuevo" ? "Asignado" : warehouseOrder?.statuswho}
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>

            {/* {productsByOrderCompras?.results.map((item, index) => {
              const { purchaseorder } = item;
              const { statuspoo } = purchaseorder;
              return (
                <div className="listitem">
                  <p>{dayjs(purchaseorder?.createdAt).format("DD MMM YYYY")}</p>
                  <p>{purchaseorder?.folio}</p>
                </div>
              );
            })} */}
          </div>

          {/* {JSON.stringify(productsByOrderCompras?.results, null, 2)} */}
        </div>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
