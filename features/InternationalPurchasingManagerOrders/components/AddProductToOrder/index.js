import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { Button, Fade, Grid, IconButton, withStyles, Switch } from "@material-ui/core";
import { DialogContainer } from "./styled";
import { ArrowBackIos } from "@material-ui/icons";
import Form from "./Form";
import { useForm } from "react-hook-form";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";
import { formatNumber } from "../../../../utils";
import ListOrders from "./ListOrders";
import AddProduct from "./AddProduct";
import usePagination from "../../../../hooks/usePagination";
import { match } from "assert";
import { colors } from "../../../../styles/global.styles";

export default function AddProductToOrder({ open = true, handletoogle, productToOrderSelected, isLoadingUpdate }) {
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
    getOrders(search);
  }, [search, page, isAscending]);

  const getOrders = async search => {
    try {
      let query = {
        draft: true,
      };

      if (search) {
        const regexPosDecimal = /^-?\d+(\.\d+)?$/;
        if (regexPosDecimal.test(search)) {
          query.folio = search.trim();
          setPage(1);
          delete query.alias;
        } else {
          query.alias = search;
          setPage(1);
          delete query.folio;
        }
      } else {
        delete query.alias;
        delete query.folio;
      }

      let params = {
        where: JSON.stringify(query),
        skip: page,
        limit: limit,
        count: 1,
        include: "provider",
        order: isAscending ? "createdAt" : "-createdAt",
      };

      setOrders(prev => ({ ...prev, isFeching: true }));
      const response = await api.get("purchaseorders", {
        params,
      });
      const res = response.data.results || [];
      const countOrders = response.data.count;

      setOrders(prev => ({ ...prev, data: res, count: countOrders, isFeching: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPage = Math.ceil(orders.count / limit);

  const resetView = () => {
    handletoogle();
    setView("selectOrder");
    setSearch("");
    setOrderSelected(null);
  };

  const SelectOrder = ({
    orderSelected,
    setOrderSelected,
    setShowAddProduct,
    productToOrderSelected,
    showAddProduct,
    setIsCreatingNew,
    handletoogle,
  }) => {
    return (
      <DialogContainer>
        <div className="headerDialog">
          <div className="headerDialog__title">
            {orderSelected && (
              <IconButton
                className="btnback"
                onClick={() => {
                  setShowAddProduct(false);
                  setOrderSelected(null);
                }}
              >
                <ArrowBackIos />
              </IconButton>
            )}
            <p className="">Agregar a orden de compra</p>
          </div>
        </div>
        {showAddProduct && (
          <div className="bodyadd">
            <p className="title">Agregar producto a orden de compra</p>

            <Grid container spacing={2}>
              <Grid item md={12}>
                <div className="inputContainer">
                  <p className="label">Producto</p>
                  <input value={productToOrderSelected?.product?.name} />
                </div>
              </Grid>

              <Grid item md={12}>
                <div className="inputContainer">
                  <p className="label">Proveedor</p>
                  <input value={orderSelected?.provider?.companyname} />
                </div>
              </Grid>

              <Grid item md={6}>
                <div className="inputContainer">
                  <p className="label">Cantidad</p>
                  <input type="number" placeholder="Cantidad" />
                </div>
              </Grid>

              <Grid item md={6}>
                <div className="inputContainer">
                  <p className="label">
                    Precio <span>({formatNumber(productToOrderSelected?.product?.callamount)})</span>
                  </p>
                  <input type="text" value={productToOrderSelected?.product?.callamount} />
                </div>
              </Grid>
              <Grid item md={12}>
                <p>Total : {formatNumber(productToOrderSelected?.product?.callamount)}</p>
              </Grid>
            </Grid>
          </div>
        )}

        {!showAddProduct && (
          <>
            <div className="bodymodal">
              <p className="title">Seleccion o crea una nueva orden de pago</p>

              <div className="row">
                <div className="bodymodal__inputContainer">
                  <input type="text" placeholder="Buscar por alias o folio" />
                </div>

                <div className="bodymodal__new">
                  <button
                    onClick={() => {
                      console.log("me diste click");
                      setIsCreatingNew(true), setView("newOrder");
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              </div>
              {orders.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      console.log(item);
                    }}
                    className={`bodymodal__item  ${orderSelected?.id == item.id && "selected"}`}
                  >
                    <div className="row">
                      <div>
                        <p className="bodymodal__item--name">{item.alias}</p>
                        <p className="bodymodal__item--date">{item.createdAt}</p>
                        <p>{item?.provider?.companyname}</p>
                      </div>

                      <div className="actions">
                        <button onClick={() => setOrderSelected(item)}>Seleccionar</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ctr_buttons">
              <Button
                variant="contained"
                className={`btn_cancel ${isLoadingUpdate && "disabled"}`}
                onClick={() => handletoogle()}
                disabled={isLoadingUpdate}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                disabled={orderSelected === null}
                className={`btn_upload ${orderSelected === null && "disabled"}`}
                onClick={() => {
                  setShowAddProduct(true);
                }}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
      </DialogContainer>
    );
  };

  const NewOrder = ({ getOrders, setIsCreatingNew, setView }) => {
    const { register, handleSubmit, control } = useForm({});

    const { showAlertSucces, showAlertError } = useAlertToast();

    const onSubmit = async formdata => {
      try {
        let data = {
          alias: formdata.alias,
          folio: formdata.folio,
          providerId: formdata.providerId?.id,
          draft: true,
          relation: formdata.relation,
        };

        let resp = await api.post("purchaseorders", data);
        setIsCreatingNew(false);
        setView("selectOrder");
        getOrders();
        showAlertSucces("Orden creada correctamente");
      } catch (error) {
        console.log(error);
        showAlertError("Error al crear la orden");
      }
    };

    return (
      <Fade in={isCreatingNew}>
        <DialogContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="headerDialog">
              <div className="headerDialog__title">
                <IconButton className="btnback" onClick={() => setView("selectOrder")}>
                  <ArrowBackIos />
                </IconButton>
                <p>Crear nueva orden</p>
              </div>
            </div>
            <div className="bodymodal">
              <p className="title">Seleccion o crea una nueva orden de pago</p>
              <Form register={register} control={control} />
            </div>
            <div className="ctr_buttons">
              <Button
                variant="contained"
                className={`btn_cancel ${isLoadingUpdate && "disabled"}`}
                onClick={() => handletoogle()}
                disabled={isLoadingUpdate}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                disabled={isLoadingUpdate}
                className={`btn_upload ${isLoadingUpdate && "disabled"}`}
                type="submit"
              >
                Guardar y seleccionar
              </Button>
            </div>
          </form>
        </DialogContainer>
      </Fade>
    );
  };

  const renderView = () => {
    switch (view) {
      case "selectOrder":
        return (
          <ListOrders
            orders={orders}
            orderSelected={orderSelected}
            setOrderSelected={setOrderSelected}
            setShowAddProduct={setShowAddProduct}
            setView={setView}
            setIsCreatingNew={setIsCreatingNew}
            setSearch={setSearch}
            resetView={resetView}
            search={search}
            handlePagination={handlePagination}
            page={page}
            totalPage={totalPage}
            isAscending={isAscending}
            setIsAscending={setIsAscending}
          />
        );
      case "newOrder":
        return (
          <NewOrder setView={setView} getOrders={getOrders} setIsCreatingNew={setIsCreatingNew} resetView={resetView} />
        );
      case "addProduct":
        return (
          <AddProduct
            orderSelected={orderSelected}
            productToOrderSelected={productToOrderSelected}
            setShowAddProduct={setShowAddProduct}
            setOrderSelected={setOrderSelected}
            setView={setView}
            resetView={resetView}
          />
        );
      default:
        return <SelectOrder />;
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handletoogle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {renderView(view)}
    </Dialog>
  );
}

{
  /* <div style={{ height: 100, overflow: "scroll" }}>
              <pre>{JSON.stringify(productToOrderSelected, null, 2)}</pre>
            </div>

            <div style={{ height: 100, overflow: "scroll" }}>
              <pre>{JSON.stringify(orderSelected, null, 2)}</pre>
            </div> */
}
{
  /*
 const AddProduct = () => {
   return <Fade in={isCreatingNew}></Fade>;
 };

*/
}

{
  /* {isCreatingNew ? <NewOrder setIsCreatingNew={setIsCreatingNew} getOrders={getOrders} /> : <SelectOrder />} */
}
