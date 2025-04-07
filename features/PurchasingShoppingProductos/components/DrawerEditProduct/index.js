import React, { useEffect, useState } from "react";
import { DialogFullScreen, Error } from "./styles";
import { CloseOutlined, Edit } from "@material-ui/icons";
import { Button, Drawer, Grid } from "@material-ui/core";
import Select from "react-select";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useProductForm from "../../hooks/useProductForm";
export default function DrawerEditProduct(props) {
  const {
    openDrawer: { open },
    closeDrawer,
    selectedProduct,
    isfetching,
    idEdit,
    productEdit,
  } = props;

  useEffect(() => {
    if (open) {
      renderData();
    }
  }, [open]);

  // console.log("soy selectedProduct", selectedProduct);
  // console.log("idEdit en drawer", idEdit);
  // console.log("productEdit en Drawer:", productEdit);

  const {
    register,
    handleSubmit,
    errors,

    handleChangeValue,
    handleUploadProduct,
    renderData,

    typeProduct,
    typeProducts,
    typeCategory,
    typeBrand,
    typeProvider,
    typeImport,
    isActive,
  } = useProductForm(selectedProduct, productEdit, idEdit);

  const { categories, providers, brands, filterStatusProduct, filterImportProduct } = useSelector(commonSelector);
  return (
    <DialogFullScreen
      anchor="right"
      open={open}
      onClose={() => {
        console.log("soy el closeDrawer");
        closeDrawer();
      }}
    >
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={closeDrawer} />
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
            Producto <span>{`${selectedProduct.name} `}</span>
          </p>

          <Grid container className="form">
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    código <strong>*</strong>
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

                  {errors.name &&  (
                    <>
                      <div className="point"></div>
                      <Error> 
                      {errors.name.type === "required" &&  "Requerido"  }

                      {errors.name.type === "noTrailingSpaces" &&  "Nombre sin espacios"}
                      </Error>
                        
                    </>
                  )}
                </div>
                <input
                  placeholder="Nombre del producto, sin espacios al inicio o al final"
                  className="input capitalize"
                  {...register("name", {
                    required: true,
                    validate: {
                      noTrailingSpaces : value =>
                        !/^\s|\s$/.test(value) || "Sin espacios al inicio o al final " ,
                    }
                  }
                )}
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

                <Select
                  {...register("productstype", { required: true })}
                  name="productstype"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona el tipo de producto"}
                  options={typeProducts?.results}
                  // onChange={e => hanldeChangeValue(e, "productstype")}
                  onChange={e => handleChangeValue(e, "productstype")}
                  value={typeProducts?.results?.filter(item => item.id == typeProduct?.id)}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Categoría<strong>*</strong>
                  </p>

                  {errors.category && errors.category.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>

                <Select
                  {...register("category", { required: true })}
                  name="category"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona la categoria"}
                  options={categories?.results}
                  // onChange={e => hanldeChangeValue(e, "category")}
                  onChange={e => handleChangeValue(e, "category")}
                  value={categories?.results?.filter(item => item.id == typeCategory?.id)}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
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
                <Select
                  {...register("brand", { required: true })}
                  name="brand"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona una opcion"}
                  options={brands?.results}
                  // onChange={e => hanldeChangeValue(e, "brand")}
                  onChange={e => handleChangeValue(e, "brand")}
                  value={brands?.results?.filter(item => item.id == typeBrand?.id)}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
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

                <Select
                  {...register("provider", { required: true })}
                  name="provider"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona un proveedor"}
                  options={providers?.results}
                  // onChange={e => hanldeChangeValue(e, "provider")}
                  onChange={e => handleChangeValue(e, "provider")}
                  value={providers?.results?.filter(item => item.id == typeProvider?.id)}
                  getOptionLabel={option => option.companyname}
                  getOptionValue={option => option.id}
                />
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
            {/*  */}

            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Peso<strong>*</strong>
                  </p>

                  {errors.weight && (
                    <>
                      <div className="point"></div>
                      <Error>
                        {errors.weight.type === "required" && "Requerido"}
                        {errors.weight.type === "pattern" && errors.weight.message}
                      </Error>
                    </>
                  )}
                </div>

                <input
                  placeholder="Peso del producto"
                  className="input capitalize"
                  {...register("weight", {
                    required: true,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Sólo números y sin espacios",
                    },
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Altura<strong>*</strong>
                  </p>

                  {errors.height && (
                    <>
                      <div className="point"></div>
                      <Error>
                        {errors.height.type === "required" && "Requerido"}
                        {errors.height.type === "pattern" && errors.height.message}
                      </Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Altura del producto"
                  className="input capitalize"
                  {...register("height", {
                    required: true,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Sólo números y sin espacios",
                    },
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Ancho<strong>*</strong>
                  </p>

                  {errors.width && (
                    <>
                      <div className="point"></div>
                      <Error>
                        {errors.width.type === "required" && "Requerido"}
                        {errors.width.type === "pattern" && errors.width.message}
                      </Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Ancho del producto"
                  className="input capitalize"
                  {...register("width", {
                    required: true,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Sólo números y sin espacios",
                    },
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Longitud<strong>*</strong>
                  </p>
                  {errors.length && (
                    <>
                      <div className="point"></div>
                      <Error>
                        {errors.length.type === "required" && "Requerido"}
                        {errors.length.type === "pattern" && errors.length.message}
                      </Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Longitud del producto"
                  className="input capitalize"
                  {...register("length", {
                    required: true,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Sólo números y sin espacios",
                    },
                  })}
                />
              </div>
            </Grid>

            {/*  */}
            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Producto Importado</p>
                </div>

                <Select
                  {...register("import")}
                  name="import"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona una opcion"}
                  options={filterImportProduct}
                  // onChange={e => hanldeChangeValue(e, "import")}
                  onChange={e => handleChangeValue(e, "import")}
                  value={filterImportProduct?.filter(item => item.name == typeImport?.name)}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Estatus del producto</p>
                </div>
                <Select
                  {...register("isactive")}
                  name="isactive"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona una opcion"}
                  options={filterStatusProduct}
                  // onChange={e => hanldeChangeValue(e, "isactive")}
                  onChange={e => handleChangeValue(e, "isactive")}
                  value={filterStatusProduct?.filter(item => item.name == isActive?.name)}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
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
              <Button variant="contained" className="btn_cancel" onClick={closeDrawer}>
                Cerrar
              </Button>
              <Button
                disabled={isfetching ? true : false}
                variant="contained"
                className="btn_upload"
                onClick={handleSubmit(handleUploadProduct)}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </DialogFullScreen>
  );
}
