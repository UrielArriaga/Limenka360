import { Button, Grid } from "@material-ui/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import SideBar from "../../../../components/SideBar";
import { api } from "../../../../services/api";
import { useForm } from "react-hook-form";
import { ProductosStyledAdd } from "../../../../styles/Productos";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import RequestCommon from "../../../../services/request_Common";
import { useRouter } from "next/router";
import { Add } from "@material-ui/icons";
import { normalizeAddProduct } from "../../../../utils/normalizeData";
import { handleAlert } from "../../../../utils";
export default function NewProduct() {
  // * sidebar estado
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const commonApi = new RequestCommon();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // * filtros
  const [BrandsFilter, setBrandsFilter] = useState([]);
  const [categorysFilter, setCategorysFilter] = useState([]);
  const [providersFilter, setProvidersFilter] = useState([]);
  const [productTypeFilter, setProductTypeFilter] = useState([]);

  //Categorias y marcas
  useEffect(() => {
    getCategories();
    getBrands();
    getProviders();
    getTypeProducts();
  }, []);
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
  //Agregar productos
  const handleAddTProduct = async formData => {
    try {
      let newProduct = normalizeAddProduct(formData);
      console.log("Producto:", newProduct);
      let ProductNew = await api.post("products", newProduct);
      if (ProductNew.status == 201) {
        handleAlert("success", "producto - Creado correctamente!", "basic", setAlert);
        router.back();
      }
    } catch (error) {
      handleAlert("error", "producto - Ocurrio un problema!", "basic");
      console.log(error.response);
    }
  };
  //+++++++++++++++++++++++++++++++++++++++++++ eliminar Producto

  return (
    <ProductosStyledAdd>
      <Head>
        <title>CRM JOBS - Productos</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="ctr_products">
          <div className="head">
            <div className="head__title">
              <h1>
                Agregar Producto <Add className="icons" />
              </h1>
            </div>
          </div>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={6}>
              <p>
                Código <strong>*</strong>
              </p>
              <input
                {...register("code", { required: true })}
                id="code"
                name="code"
                placeholder="Ingresa Codigo Producto"
                className={errors?.code?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Nombre <strong>*</strong>
              </p>
              <input
                {...register("name", { required: true })}
                id="name"
                name="name"
                placeholder="Ingresa Nombre"
                className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Tipo de Producto<strong>*</strong>
              </p>
              <select
                className={errors?.productstype?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                {...register("productstype", { required: true })}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {productTypeFilter.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Categoría<strong>*</strong>
              </p>
              <select
                className={errors?.category?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                {...register("category", { required: true })}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {categorysFilter.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} md={6}>
              <p>
                Marca<strong>*</strong>
              </p>
              <select
                className={errors?.brand?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                {...register("brand", { required: true })}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {BrandsFilter.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} md={6}>
              <p>
                Proveedor<strong>*</strong>
              </p>
              <select
                className={errors?.provider?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                {...register("provider", { required: true })}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {providersFilter.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.companyname}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} md={6}>
              <p>
                Precio Unitario <strong>*</strong>
              </p>
              <input
                {...register("amount", { required: true })}
                id="amount"
                name="amount"
                type="number"
                placeholder="Ingresa Precio Unitario"
                className={errors?.amount?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Precio Tienda <strong>*</strong>
              </p>
              <input
                {...register("storeamount", { required: true })}
                id="storeamount"
                name="storeamount"
                type="number"
                placeholder="Ingresa Precio Tienda"
                className={errors?.storeamount?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>
                Precio Call Center <strong>*</strong>
              </p>
              <input
                {...register("callamount", { required: true })}
                id="callamount"
                name="callamount"
                type="number"
                placeholder="Ingresa Precio Call Center"
                className={errors?.callamount?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <p>Producto Importado</p>
              <select
                {...register("import", { required: false })}
                id="import"
                name="import"
                type="number"
                placeholder="Ingresa Precio Call Center"
                className="ctr_inputs__input"
              >
                <option value={"false"}>No</option>
                <option value={"true"}>Si</option>
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>Estado del producto</p>
              <select
                {...register("isactive", { required: false })}
                id="isactive"
                name="isactive"
                type="number"
                placeholder="Ingresa Precio Call Center"
                className="ctr_inputs__input"
              >
                <option value={"true"}>Activo</option>
                <option value={"false"}>Inactivo</option>
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>Es Paquete</p>
              <select
                {...register("ispackage", { required: false })}
                id="ispackage"
                name="ispackage"
                type="number"
                placeholder="Ingresa Precio Call Center"
                className="ctr_inputs__input"
              >
                <option value={"true"}>Si</option>
                <option value={"false"}>No</option>
              </select>
            </Grid>
            <Grid item xs={12} md={12}>
              <p>Descripción</p>
              <textarea
                {...register("description", { required: false })}
                id="description"
                name="description"
                type="text"
                placeholder="Ingresa Breve Descripción"
                className="ctr_inputs__textarea"
              />
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              variant="contained"
              color="secondary"
              className="btn_cancel"
              onClick={() => router.push("../productos")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="btn_upload"
              onClick={handleSubmit(handleAddTProduct)}
            >
              Guardar
            </Button>
          </Grid>
        </div>
      </div>
      {alert?.show && (
        <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
      )}
    </ProductosStyledAdd>
  );
}
