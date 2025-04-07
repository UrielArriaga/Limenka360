import { Button, CircularProgress, Grid } from "@material-ui/core";
import { LoaderProductsSelect, ModalNewNameGoalStyle, OptionSeeMore, StyleProductsOption } from "./style";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import Select, { components } from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { commonSelector, getProductsCommon } from "../../redux/slices/commonSlice";
import { Cached, ExpandMore } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { handleGlobalAlert } from "../../utils";
import { RequiredData } from "../../styles/global.styles";
export default function NewNameGoal(props) {
  const { open, close, categories, refetch, setRefetch } = props;
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loaderSaveChanges, setLoaderSaveChanges] = useState(false);
  const [countProducts, setCountProducts] = useState(0);
  const [limitShowProducts, setLimitShowProducts] = useState(50);
  const [keySearchProduct, setKeySearchProduct] = useState("");
  const [optionsProducts, setOptionsProducts] = useState([]);
  const { roleId } = useSelector(userSelector);
  const { products } = useSelector(commonSelector);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const typeGoal = watch("type");

  const handleCreateNewGoalName = async formData => {
    setLoaderSaveChanges(true);
    try {
      let body = {
        name: formData.name,
        type: formData.type.value,
      };

      if (typeGoal.id === "1") {
        body.id = formData?.categoryId?.id;
      } else {
        body.id = formData?.productId?.id;
      }
      let response = await api.post(`goalnames`, body);
      handleGlobalAlert("success", "Meta - Nombre de Meta Guardada!", "basic", dispatch, 6000);
      setRefetch(!refetch);
      setLoaderSaveChanges(false);
      props.close();
      reset();
      setValue("name", "");
    } catch (error) {
      handleGlobalAlert("error", "Meta - Error al Guardar !", "basic", dispatch, 6000);
      setLoaderSaveChanges(false);
      console.log(error);
    }
  };

  const FormatOptionsProduct = ({ name, code }) => {
    return (
      <StyleProductsOption>
        <p className="product_name">
          Nombre: <span className="data">{name}</span>
        </p>
        <p className="product_code">
          Código: <span className="data">{code}</span>
        </p>
      </StyleProductsOption>
    );
  };

  const handleProductSearch = useMemo(() => {
    let productsRes = products.results || [];

    if (keySearchProduct) {
      productsRes = productsRes.filter(
        todo =>
          todo.name.toLowerCase().includes(keySearchProduct.toLowerCase()) ||
          todo.code.toLowerCase().includes(keySearchProduct.toLowerCase()) ||
          todo.category.name.toLowerCase().includes(keySearchProduct.toLowerCase())
      );
    }
    // if (selectCategory) {
    //   productsRes = productsRes.filter(todo => todo.category?.id === selectCategory?.id);
    // }
    // if (selectTypeProduct) {
    //   productsRes = productsRes.filter(todo => todo.productstype?.id === selectTypeProduct?.id);
    // }
    // if (selectBrand) {
    //   productsRes = productsRes.filter(todo => todo.brand?.id === selectBrand?.id);
    // }

    setCountProducts(productsRes.length);
    return productsRes.slice(0, limitShowProducts);
  }, [keySearchProduct, limitShowProducts, products]);

  const MenuList = props => {
    const { MenuListHeader = null, MenuListFooter = null } = props.selectProps.components;

    return (
      <components.MenuList {...props}>
        {props.children.length && MenuListHeader}
        {props.children}
        {props.children.length && MenuListFooter}
      </components.MenuList>
    );
  };

  const MenuListFooter = () => {
    if (countProducts > limitShowProducts) {
      return (
        <OptionSeeMore onClick={() => setLimitShowProducts(limitShowProducts + 20)}>
          <ExpandMore className="icon" />
        </OptionSeeMore>
      );
    }
  };

  const LoaderProducts = () => {
    return (
      <LoaderProductsSelect>
        <p>Cargando Productos</p>
        <CircularProgress size={18} className="iconReload" />
      </LoaderProductsSelect>
    );
  };

  return (
    <ModalNewNameGoalStyle open={open} onClose={close}>
      <div className="container">
        <div className="container__head">
          <p className="title">Agregar Nombre de Meta</p>
          {loaderSaveChanges && <CircularProgress className="loader" size={30} />}
        </div>
        <div className={`container__body ${isOpenMenu && "upgrade_height"}`}>
          <Grid container spacing={2} className="form">
            <Grid item xs={12} md={6}>
              <p className="title">
                Nombre <RequiredData value={`*${errors.name ? errors.name.message : ""}`} />
              </p>
              <input className="input" {...register("name", { required: "Requerido" })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <p className="title">
                Tipo <RequiredData value={`*${errors.type ? errors.type.message : ""}`} />
              </p>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona el Tipo"
                    options={optionsTypeGoal}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.name}
                    styles={{
                      menu: provided => ({ ...provided, zIndex: 9999 }),
                    }}
                  />
                )}
              />
            </Grid>
            {typeGoal && (
              <>
                {typeGoal?.id === "1" ? (
                  <Grid item xs={12} md={12}>
                    <p className="title">
                      Categoría <RequiredData value={`*${errors.categoryId ? errors.categoryId.message : ""}`} />
                    </p>
                    <Controller
                      name="categoryId"
                      control={control}
                      rules={{ required: "Requerido" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select_product"
                          placeholder="Selecciona una categoria"
                          options={categories}
                          getOptionValue={option => option.id}
                          getOptionLabel={option => option.name}
                          onMenuOpen={() => setIsOpenMenu(true)}
                          onMenuClose={() => setIsOpenMenu(false)}
                          maxMenuHeight={250}
                          styles={{
                            menu: provided => ({ ...provided, zIndex: 9999 }),
                          }}
                        />
                      )}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <p className="title">
                      Producto <RequiredData value={`*${errors.productId ? errors.productId.message : ""}`} />
                    </p>
                    <Controller
                      name="productId"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select_product"
                          placeholder="Selecciona un Producto"
                          options={handleProductSearch}
                          onInputChange={e => {
                            setLimitShowProducts(50);
                            setKeySearchProduct(e);
                          }}
                          formatOptionLabel={FormatOptionsProduct}
                          getOptionValue={option => option.id}
                          getOptionLabel={option => `${option.name} ${option.code}`}
                          onMenuOpen={() => setIsOpenMenu(true)}
                          onMenuClose={() => setIsOpenMenu(false)}
                          maxMenuHeight={250}
                          noOptionsMessage={() => "Sin Productos"}
                          loadingMessage={LoaderProducts}
                          isLoading={products.isFetching}
                          styles={{
                            menu: provided => ({ ...provided, zIndex: 9999 }),
                          }}
                          components={{
                            MenuList,
                            MenuListFooter: <MenuListFooter />,
                          }}
                        />
                      )}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </div>
        <div className="container__footer">
          <div className="buttons_container">
            <Button className="btn_save" disabled={loaderSaveChanges} onClick={handleSubmit(handleCreateNewGoalName)}>
              Guardar
            </Button>
            <Button
              variant="contained"
              className="btn_cancel"
              disabled={loaderSaveChanges}
              onClick={() => {
                props.close();
                reset();
                setValue("name", "");
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </ModalNewNameGoalStyle>
  );
}

const optionsTypeGoal = [
  {
    id: "1",
    name: "Categoría",
    value: "c",
  },
  {
    id: "2",
    name: "Producto",
    value: "p",
  },
];
