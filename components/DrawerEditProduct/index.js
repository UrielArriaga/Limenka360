import { Button, Drawer, Grid } from "@material-ui/core";
import { Add, CloseOutlined, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AlertGlobal from "../Alerts/AlertGlobal";
import RequestCommon from "../../services/request_Common";
import { DialogFullScreen, Error } from "../../styles/Productos";
import { api } from "../../services/api";
import { normalizePutProduct } from "../../utils/normalizeData";
import { handleAlert } from "../../utils";
const DrawerEditProduct = ({ openEdit, setOpenEdit, productEdit, setFlag, flag }) => {
  const commonApi = new RequestCommon();
  const [State, setState] = useState({ severity: null, show: null, message: "", type: null });
  const [BrandsFilter, setBrandsFilter] = useState([]);
  const [categorysFilter, setCategorysFilter] = useState([]);
  const [providersFilter, setProvidersFilter] = useState([]);
  const [productTypeFilter, setProductTypeFilter] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getCategories();
      getBrands();
      getProviders();
      getTypeProducts();
    };
    if (mounted) {
      getDataInitial();
    }
    if (openEdit) {
      SetValues(productEdit);
    }
    return () => (mounted = false);
  }, [openEdit]);
  const getCategories = async () => {
    try {
      let category = await commonApi.getCategories();
      setCategorysFilter(category?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getBrands = async () => {
    try {
      let Brand = await commonApi.getBrands();
      setBrandsFilter(Brand?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProviders = async () => {
    try {
      let provider = await commonApi.getProviders();
      setProvidersFilter(provider?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getTypeProducts = async () => {
    try {
      let typeProducts = await commonApi.getTypeProducts();
      setProductTypeFilter(typeProducts?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadProduct = async (formData) => {
    try {
      let putProduct = normalizePutProduct(formData);
      let productNew = await api.put(`products/${productEdit.id}`, putProduct);
      if (productNew.status == 200) {
        handleAlert("success", "Producto - Editado correctamente!", "basic", setState);
        setTimeout(() => {
          resetInputs();
          setFlag();
          setOpenEdit(!openEdit);
        }, 1000);
      }
    } catch (error) {
      handleAlert("error", "Producto - Ocurrio un problema!", "basic", setState);

      console.log(error);
    }
  };

  function SetValues(product) {
    setValue("code", product?.code);
    setValue("name", product?.name);
    setValue("storeamount", product?.storeamount);
    setValue("amount", product?.amount);
    setValue("callamount", product?.callamount);
    setValue("category", product?.categoryId);
    setValue("brand", product?.brandId);
    setValue("provider", product?.providerId);
    setValue("productstype", product?.producttypeId);
    setValue("description", product?.description);
    setValue("import", product?.import);
    setValue("isactive", product?.isactive);
    setValue("ispackage", product?.ispackage);
  }

  function resetInputs() {
    setValue("name", "");
    setValue("code", "");
    setValue("amount", "");
    setValue("callamount", "");
    setValue("storeamount", "");
    setValue("category", "");
    setValue("brand", "");
    setValue("provider", "");
    setValue("productstype", "");
    setValue("description", "");
    setValue("import", "");
    setValue("isactive", "");
    setValue("ispackage", "");
  }

  const handleCloseEdit = () => {
    resetInputs();
    setOpenEdit(!openEdit);
  };

  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={handleCloseEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCloseEdit} />
            <p className="title">Editar Producto</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmit(handleUploadProduct)}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">
            <Edit />
            Producto <span>{`${productEdit.name} `}</span>
          </p>

          <Grid container className="form">
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    codigo <strong>*</strong>
                  </p>
                  {errors.code && errors.code.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Codigo del Producto"
                  className="input capitalize"
                  {...register("code", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Nombre <strong>*</strong>
                  </p>

                  {errors.name && errors.name.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Nombre del producto"
                  className="input capitalize"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Tipo de producto<strong>*</strong>
                  </p>

                  {errors.productstype && errors.productstype.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <select className="input capitalize" {...register("productstype", { required: true })}>
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {productTypeFilter.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Categoria<strong>*</strong>
                  </p>

                  {errors.category && errors.category.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <select className="input capitalize" {...register("category", { required: true })}>
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {categorysFilter.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Marca<strong>*</strong>
                  </p>

                  {errors.brand && errors.brand.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <select className="input capitalize" {...register("brand", { required: true })}>
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {BrandsFilter.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Proveedor <strong>*</strong>
                  </p>

                  {errors.provider && errors.provider.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <select className="input capitalize" {...register("provider", { required: true })}>
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {providersFilter.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.companyname}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Precio Unitario <strong>*</strong>
                  </p>
                  {errors.amount && errors.amount.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="precio del producto"
                  className="input capitalize"
                  {...register("amount", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Precio Tienda<strong>*</strong>
                  </p>

                  {errors.storeamount && errors.storeamount.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="precio tienda del producto"
                  className="input capitalize"
                  {...register("storeamount", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Precio Call Center<strong>*</strong>
                  </p>
                  {errors.callamount && errors.callamount.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="precio Call Center del producto"
                  className="input capitalize"
                  {...register("callamount", {
                    required: true,
                  })}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Producto Importado</p>
                </div>
                <select className="input capitalize" {...register("import", { required: false })}>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Estatus del producto</p>
                </div>
                <select className="input capitalize" {...register("isactive", { required: false })}>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Es Paquete</p>
                </div>
                <select className="input capitalize" {...register("ispackage", { required: false })}>
                <option value={"true"}>Si</option>
                <option value={"false"}>No</option>
                </select>
              </div>
            </Grid>
                      <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Descripción</p>
                </div>
                <textarea
                  placeholder="Descripción del Producto"
                  className="textarea capitalize"
                  {...register("description", {
                    required: false,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} className="ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadProduct)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      {State?.show && (
        <AlertGlobal severity={State.severity} message={State.message} show={State.show} type={State.type} />
      )}
    </DialogFullScreen>
  );
};

export default DrawerEditProduct;
