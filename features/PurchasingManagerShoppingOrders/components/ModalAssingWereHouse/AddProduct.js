import React, { useState } from "react";
import { DialogContainer } from "./styled";
import { Button } from "@material-ui/core";
import { formatNumber } from "../../../../utils";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";
import InputMoney from "../../../ExecutiveOrders/components/ModalShipping/MoneyInput";

export default function AddProduct({
  orderSelected,
  setShowAddProduct,
  setOrderSelected,
  productsToOrderSelected,
  setView,
  resetView,
  orderSelectedData,
  getDataOrder,
  setProductsToOrderSelected,
}) {
  const [isFetching, setIsFetching] = useState(false);

  const { showAlertSucces, showAlertError } = useAlertToast();

  const handleSubmitProduct = async () => {
    const datax = [...productsToOrderSelected];

    const normalizeDataToPost = datax?.map(item => {
      return {
        quantity: parseInt(item?.quantity),
        unit: "pzas",
        unitprice: parseInt(item?.product?.callamount),
        amount: item?.product?.amount,
        productId: item?.productId,
        purchaseorderId: orderSelected?.id,
        orderId: orderSelectedData?.id,
        productoportunityId: item?.id,
      };
    });

    let data = normalizeDataToPost;

    try {
      setIsFetching(true);
      let response = await api.post("/supplies", data);
      console.log(response, " respuesta");
      showAlertSucces("Producto agregado correctamente");
      resetView("selectOrder");
      setIsFetching(false);
      getDataOrder();
    } catch (error) {
      console.log(error);
      setIsFetching(false);

      showAlertError("Error al agregar producto");
    }
  };

  // function parseCurrency(value) {
  //   if (!value) return 0;
  //   const number = Number(value.replace(/[^0-9.-]+/g, ""));
  //   return isNaN(number) ? 0 : number;
  // }

  const handleChangePrice = (value, product) => {
    setProductsToOrderSelected([
      ...productsToOrderSelected?.map(item => {
        if (item.id == product.id) {
          return {
            ...item,
            product: {
              ...item["product"],
              callamount: value,
              amount: value * item.quantity,
            },
          };
        } else {
          return item;
        }
      }),
    ]);
  };
  const handleChangeQuantity = (value, product) => {
    setProductsToOrderSelected([
      ...productsToOrderSelected?.map(item => {
        if (item.id == product.id) {
          return {
            ...item,
            quantity: value,
            product: {
              ...item["product"],
              amount: value * item.product.callamount,
            },
          };
        } else {
          return item;
        }
      }),
    ]);
  };

  return (
    <DialogContainer>
      <div className="infoproductselected">
        <h3 className="infoTile">
          Lista de Productos asignar a orden de compra
          <span className="warnning"> (Puede editar el precio y cantidad antes de agregarlos)</span>
        </h3>
      </div>
      <div className="contentPreview">
        <div className="containerTable">
          <div className="containerTable__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Producto</p>
                </div>
                <div className="tablehead code">
                  <p>Proveedor</p>
                </div>
                <div className="tablehead">
                  <p>Precio $</p>
                </div>
                <div className="tablehead">
                  <p>Cantidad</p>
                </div>
                <div className="tablehead">
                  <p>Total $</p>
                </div>
              </div>
              <div className="tablebody">
                {productsToOrderSelected?.map((product, index) => (
                  <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                    <div className="tablerow">
                      <div className="tablecell code">
                        <p>{product?.product?.name}</p>
                      </div>
                      <div className="tablecell code">
                        <p>{product?.product.provider?.companyname}</p>
                      </div>
                      <div className="tablecell code">
                        <input
                          className="input_data"
                          onKeyDown={e => {
                            if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                          }}
                          value={product?.product?.callamount}
                          placeholder="Precio Unitario"
                          onChange={e => {
                            handleChangePrice(e.target.value, product);
                          }}
                        />
                      </div>
                      <div className="tablecell code">
                        <input
                          className="input_data"
                          value={product?.quantity}
                          onKeyDown={e => {
                            if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                          }}
                          placeholder="Cantidad"
                          onChange={e => {
                            handleChangeQuantity(e.target.value, product);
                          }}
                        />
                      </div>
                      <div className="tablecell code">
                        <p>{product?.product?.callamount * product?.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <Button
          variant="contained"
          color="primary"
          className={`btn_cancel ${false && "disabled"}`}
          onClick={() => {
            setShowAddProduct(false);
            setOrderSelected(null);
            setView("selectOrder");
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={isFetching}
          className={`btn_upload`}
          variant="contained"
          color="primary"
          onClick={() => handleSubmitProduct()}
        >
          Agregar producto a orden de compra
        </Button>
      </div>
    </DialogContainer>
  );
}
