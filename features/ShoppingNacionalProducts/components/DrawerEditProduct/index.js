import React, { useEffect, useState } from "react";
import { DialogFullScreen, Error } from "./styles";
import { CloseOutlined, Edit } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";

export default function DrawerEditProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { categories, providers, brands, typeProducts, filterStatusProduct, filterImportProduct } = useSelector(commonSelector);
  let NameInputs = [
    "name",
    "code",
    "productstype",
    "category",
    "brand",
    "provider",
    "amount",
    "storeamount",
    "callamount",
    "import",
    "isactive",
    "description",
    "length",
    "width",
    "weight",
    "height",
  ];
  const [typeProduct, setTypeProduct] = useState({});
  const [typeCategory, setTypeCategory] = useState({});
  const [typeBrand, setTypeBrand] = useState({});
  const [typeProvider, setTypeProvider] = useState({});
  const [typeImport, setTypeImport] = useState({});

  const [isActive, setIsActive] = useState({});
  const {
    openDrawer: { open },
    selectedProduct,
    handleCloseEdit,
    handleUploadProduct,
    isfetching
  } = props;
  
  useEffect(() => {
    renderData();
  }, [open]);

  function renderData() {
    let type = typeProducts?.results?.filter(item => item.id == selectedProduct?.data?.producttypeId);
    let category = categories?.results?.filter(item => item.id == selectedProduct?.data?.categoryId);
    let brand = brands?.results?.filter(item => item.id == selectedProduct?.data?.brandId);
    let provider = providers?.results?.filter(item => item.id == selectedProduct?.data?.providerId);

    let importValues = selectedProduct?.import;
    let importsValue = filterImportProduct?.filter(item => item.name == importValues);
    let isactive = selectedProduct?.data?.isactive;
    let typeActive = filterStatusProduct?.filter(item => item.id == isactive);

    for (let i = 0; i < NameInputs.length; i++) {
      switch (NameInputs[i]) {
        case "productstype":
          setValue(NameInputs[i], type[0]);
          break;
        case "category":
          setValue(NameInputs[i], category[0]);
          break;
        case "brand":
          setValue(NameInputs[i], brand[0]);
          break;
        case "provider":
          setValue(NameInputs[i], provider[0]);
          break;
        case "import":
          setValue(NameInputs[i], importsValue[0]?.id);
          break;
        case "isactive":
          setValue(NameInputs[i], typeActive[0]?.id);
          break;
        case "amount":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "callamount":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "storeamount":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "length":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "width":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "weight":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        case "height":
          setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]);
          break;
        default:
          setValue(NameInputs[i], selectedProduct?.[NameInputs[i]]);
          break;
      }
    }

    setTypeProduct(type[0]);
    setTypeCategory(category[0]);
    setTypeBrand(brand[0]);
    setTypeProvider(provider[0]);
    setTypeImport(importsValue[0]);
    setIsActive(typeActive[0]);
  }

  const hanldeChangeValue = (e, string) => {
    if (string == "productstype") setTypeProduct(e);
    if (string == "category") setTypeCategory(e);
    if (string == "brand") setTypeBrand(e);
    if (string == "provider") setTypeProvider(e);
    if (string == "import") setTypeImport(e);
    if (string == "isactive") setIsActive(e);
    setValue(string, e.id);
  };

  const resetInputs = () => {
    for (let i = 0; i < NameInputs.length; i++) setValue(NameInputs[i], "");
    setTypeProduct({});
    setTypeCategory({});
    setTypeBrand({});
    setTypeProvider({});
    setTypeImport({});
    setIsActive({});
  };

  const closeDrawer = () => {
    resetInputs();
    handleCloseEdit();
  };

  return (
    <DialogFullScreen anchor="right" open={open} onClose={closeDrawer}>
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

                <Select
                  {...register("productstype", { required: true })}
                  name="productstype"
                  className="select_filter"
                  instanceId="postType"
                  noOptionsMessage={() => "Sin Opciones"}
                  placeholder={"Selecciona el tipo de producto"}
                  options={typeProducts?.results}
                  onChange={e => hanldeChangeValue(e, "productstype")}
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
                    Categoria<strong>*</strong>
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
                  onChange={e => hanldeChangeValue(e, "category")}
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
                  onChange={e => hanldeChangeValue(e, "brand")}
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
                  onChange={e => hanldeChangeValue(e, "provider")}
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
                  {errors.weight && errors.weight.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="peso del producto"
                  className="input capitalize"
                  {...register("weight", {
                    required: true,
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
                  {errors.height && errors.height.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="altura del producto"
                  className="input capitalize"
                  {...register("height", {
                    required: true,
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
                  {errors.width && errors.width.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="ancho del producto"
                  className="input capitalize"
                  {...register("width", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Dimension<strong>*</strong>
                  </p>
                  {errors.length && errors.length.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="dimension del producto"
                  className="input capitalize"
                  {...register("length", {
                    required: true,
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
                  onChange={e => hanldeChangeValue(e, "import")}
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
                  onChange={e => hanldeChangeValue(e, "isactive")}
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
                Cancelar
              </Button>
              <Button disabled={isfetching ? true:false} variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadProduct)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </DialogFullScreen>
  );
}
