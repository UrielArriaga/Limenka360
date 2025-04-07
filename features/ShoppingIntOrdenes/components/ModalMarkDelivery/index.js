import React from "react";
import { ModalAssingWereHouseStyled } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { getColorStatusSHOPPINGORDER } from "../../../../utils/DirLog";
import { IconButton, Tooltip } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
import { useRouter } from "next/router";

export default function ModalMarkDelivery({ open, handleToggle, productToOrderSelected, orderDataSelect }) {
  console.log(orderDataSelect);
  const router = useRouter();
  const [productsByOrderCompras, setProductsByOrderCompras] = useState({
    isFetching: false,
    results: [],
    count: 0,
  });

  useEffect(() => {
    const getProductsByOrderCompras = async () => {
      try {
        let params = {
          where: {
            orderId: orderDataSelect.id,
          },
          include: "purchaseorder,purchaseorder.statuspoo",
          count: 1,
        };
        const response = (await api.get("pickuppurchaseorder", { params })).data;
        setProductsByOrderCompras({
          isFetching: false,
          results: response.results,
          count: response.count,
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (open && orderDataSelect) {
      getProductsByOrderCompras();
    }
  }, [open]);

  return (
    <ModalAssingWereHouseStyled
      anchor="left"
      open={open}
      keepMounted
      onClose={handleToggle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="container">
        <div className="header">
          <h2>Estatus de ordenes de compra</h2>
          <button className="btn_save" onClick={handleToggle}>
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
                        <div className={`tablerow  `} onClick={() => {}}>
                          <div className="tablecell code">
                            <p>{dayjs(purchaseorder?.createdAt).format("DD MMM YYYY")}</p>
                          </div>

                          <div className="tablecell code">
                            <p>{purchaseorder?.folio}</p>
                          </div>

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
                                {statuspoo?.name || "Borrador"}
                              </p>
                            </div>
                          </div>

                          <div className="tablecell actions">
                            <Tooltip title="Ver detalle">
                              <IconButton
                                className="iconbuttonaction"
                                onClick={() => {
                                  router.push({
                                    pathname: `/comprasv2/ordenes/${purchaseorder?.id}`,
                                  });
                                }}
                              >
                                <RemoveRedEye className="iconaction" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
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
