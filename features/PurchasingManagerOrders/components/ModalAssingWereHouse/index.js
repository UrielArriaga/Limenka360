import React from "react";
import { ModalAssingWereHouseStyled } from "./styles";
import { useState, useEffect } from "react";
import usePagination from "../../../../hooks/usePagination";
import { api } from "../../../../services/api";
import { Button, Fade } from "@material-ui/core";
import ListPOrdersV2 from "./ListPOrdersV2";
import AddProduct from "./AddProduct";
import { useForm } from "react-hook-form";
import useAlertToast from "../../../../hooks/useAlertToast";
import { DialogContainer } from "./styled";
import Form from "./Form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function ModalAssingPorder({
  open,
  handleToggle,
  productToOrderSelected,
  isLoadingUpdate,
  orderSelectedData,
  getDataOrder,
}) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [orders, setOrders] = useState({
    isFeching: false,
    data: [],
    count: 0,
  });
  const [orderSelected, setOrderSelected] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [view, setView] = useState("selectOrder");
  const { page, limit, handlePagination, setPage } = usePagination({
    defaultLimit: 10,
    defaultPage: 1,
    count: orders?.count,
  });
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [productsToOrderSelected, setProductsToOrderSelected] = useState([]);

  useEffect(() => {
    setProductsToOrderSelected(productToOrderSelected);
  }, [productToOrderSelected]);

  useEffect(() => {
    if (productToOrderSelected[0]?.product?.providerId && open) {
      getOrders(search);
    }
  }, [search, page, isAscending, open, productToOrderSelected]);

  const getOrders = async search => {
    try {
      let query = {
        draft: true,
        providerId: productToOrderSelected[0]?.product?.providerId,
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
          <ListPOrdersV2
            orderSelected={orderSelected}
            orders={orders}
            setOrderSelected={setOrderSelected}
            setView={setView}
            paginationData={{
              limit,
              page,
              handlePagination,
              setPage,
              total: orders?.count,
            }}
            setIsCreatingNew={setIsCreatingNew}
            productToOrderSelected={productToOrderSelected}
          />
        );
      case "addProduct":
        return (
          <AddProduct
            orderSelected={orderSelected}
            productsToOrderSelected={productsToOrderSelected}
            setProductsToOrderSelected={setProductsToOrderSelected}
            setShowAddProduct={setShowAddProduct}
            setOrderSelected={setOrderSelected}
            setView={setView}
            resetView={resetView}
            orderSelectedData={orderSelectedData}
            getDataOrder={getDataOrder}
          />
        );
      case "createorder":
        return (
          <NewOrder
            handleToggle={handleToggle}
            setView={setView}
            getOrders={getOrders}
            setIsCreatingNew={setIsCreatingNew}
            resetView={resetView}
          />
        );

      default:
        return;
    }
  };

  const NewOrder = ({ getOrders, setIsCreatingNew, setView, handletoogle, resetView, handleToggle }) => {
    const { register, handleSubmit, control, setValue } = useForm({});
    const { roleId } = useSelector(userSelector);

    const { showAlertSucces, showAlertError } = useAlertToast();

    const onSubmit = async formdata => {
      try {
        let data = {
          alias: formdata.alias,
          folio: formdata.folio,
          providerId: formdata.providerId,
          draft: true,
          relation: formdata.relation,
          national: roleId === "compras" ? true : false,
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
          <h3>Crear Nueva orden de compra</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bodymodal">
              <Form
                register={register}
                control={control}
                setValue={setValue}
                productToOrderSelected={productToOrderSelected}
              />
            </div>
            <div className="ctr_buttons">
              <Button
                variant="contained"
                className={`btn_cancel ${isLoadingUpdate && "disabled"}`}
                onClick={() => setView("selectOrder")}
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

  const closeToggle = () => {
    handleToggle(), 
    setShowAddProduct(false);
    setOrderSelected(null);
    setView("selectOrder");
  }

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
          <button
            className="btn_save"
            onClick={() => {
              closeToggle();
            }}
          >
            Cerrar
          </button>
        </div>

        <div className="body">
          <RenderView view={view} />
        </div>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
