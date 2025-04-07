import React from "react";
import { ModalAssingWereHouseStyled } from "./styles";
// import all that the file needs
import { useState, useEffect } from "react";

import usePagination from "../../../../hooks/usePagination";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { Button, Fade, IconButton } from "@material-ui/core";

import ListPOrders from "./ListPOrders";
import AddProduct from "./AddProduct";
import { useForm } from "react-hook-form";
import useAlertToast from "../../../../hooks/useAlertToast";
import { DialogContainer } from "./styled";
import { ArrowBackIos } from "@material-ui/icons";
import Form from "./Form";

export default function ModalAssingByProduct({ open, handleToggle, productToOrderSelected, isLoadingUpdate }) {
  console.log(productToOrderSelected);
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
    if (productToOrderSelected?.product?.providerId && open) {
      getOrders(search);
    }
  }, [search, page, isAscending, open, productToOrderSelected]);

  const getOrders = async search => {
    try {
      let query = {
        draft: true,
        providerId: productToOrderSelected?.product?.providerId,
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

      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPage = Math.ceil(orders.count / limit);

  const resetView = () => {
    handleToggle();
    setView("selectOrder");
    setSearch("");
    setOrderSelected(null);
  };

  const RenderView = ({ view }) => {
    switch (view) {
      case "selectOrder":
        return (
          <ListPOrders
            orderSelected={orderSelected}
            orders={orders}
            setOrderSelected={setOrderSelected}
            productToOrderSelected={productToOrderSelected}
            setView={setView}
          />
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
      case "createorder":
        return (
          <NewOrder setView={setView} getOrders={getOrders} setIsCreatingNew={setIsCreatingNew} resetView={resetView} />
        );

      default:
        return <SelectOrder />;
    }
  };

  const NewOrder = ({ getOrders, setIsCreatingNew, setView, handletoogle, resetView }) => {
    const { register, handleSubmit, control, setValue } = useForm({});

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
            {/* <div className="headerDialog">
              <div className="headerDialog__title">
                <IconButton className="btnback" onClick={() => setView("selectOrder")}>
                  <ArrowBackIos />
                </IconButton>
                <p>Crear nueva orden</p>
              </div>
            </div> */}
            <div className="bodymodal">
              {/* <p className="title">Seleccion o crea una nueva orden de pago</p> */}
              <Form register={register} control={control} setValue={setValue} />
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
          <h2>Generar orden de compra o agrega a una existente</h2>
          <button className="btn_save" onClick={handleToggle}>
            Cerrar
          </button>
        </div>

        <div className="body">
          <div className="infoproductselected">
            <h3>
              Ordenes de compra activas{" "}
              <span className="warnning">(Estas ordenes aun no han enviadas a proveedor)</span>
            </h3>
            <div className="row">
              <p>
                Producto : <span>{productToOrderSelected?.product?.name}</span>
              </p>
              <p>
                Codigo de producto : <span>{productToOrderSelected?.product?.code}</span>
              </p>

              <p>
                Piezas Requeridas : <span>{productToOrderSelected?.quantity}</span>
              </p>

              <p>
                Proveedor : <span>{productToOrderSelected?.product?.provider?.companyname}</span>
              </p>
            </div>

            <div className="crearnueva">
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setIsCreatingNew(true);
                  setView("createorder");
                }}
              >
                Crear nueva orden de compra
              </Button>
            </div>
          </div>

          <RenderView view={view} />
        </div>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
