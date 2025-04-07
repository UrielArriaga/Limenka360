import React, { useEffect } from "react";
import { DialogFullScreen } from "../../../../styles/Productos";
import { CloseOutlined, Edit } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useAlertToast from "../../../../hooks/useAlertToast";
import { BudgetsServices } from "../../services";

const Error = ({ children }) => {
  children;
};

export default function ModalProductEdit({
  openEdit,
  toggleEdit,
  productEdit,
  budgetsSelected,
  refetchProducts,
  productSelected,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { typeProducts, brands, categories, providers } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const request = new BudgetsServices();

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getCatalogBy("categories");
      getCatalogBy("brands");
      getCatalogBy("providers");
      getCatalogBy("typeProducts");
    };
    if (mounted) {
      getDataInitial();
    }
    if (openEdit) {
      setValues(productEdit);
    }
    return () => (mounted = false);
  }, [openEdit, productEdit, getCatalogBy]);

  const normalizePutProduct = formData => {
    let newProduct = {
      code: formData.code,
      name: formData.name,
      categoryId: formData.category,
      brandId: formData.brand,
      providerId: formData.provider,
      producttypeId: formData.productstype,
      amount: formData.amount,
      storeamount: formData.storeamount,
      callamount: formData.callamount,
      import: formData.import,
      isactive: formData.isactive,
    };

    return {
      quantity: 0,
      discount: 0,
      dispercentage: 0,
      iva: 0,
      total: 0,
      newprice: 0,
      note: "",
      budgetId: budgetsSelected?.id,
      product: newProduct,
    };
  };

  const handleUploadProduct = async item => {
    try {
      let newProduct = normalizePutProduct(item);
      let updateProduct = await request.putProduct(newProduct, productEdit?.id);
      if (updateProduct.status == 200) {
        showAlertSucces("Producto editado correctamente");
        toggleEdit();
        refetchProducts();
        resetInputs();
      }
    } catch (error) {
      showAlertError("Ocurrio un error al  editar producto");
      console.log(error);
    }
  };

  const setValues = item => {
    let product = item.product;
    console.log("prosdsd", product);
    setValue("code", product.code);
    setValue("name", product.name);
    setValue("storeamount", product.storeamount);
    setValue("amount", product.amount);
    setValue("callamount", product.callamount);
    setValue("category", product.categoryId);
    setValue("brand", product.brandId);
    setValue("provider", product.providerId);
    setValue("productstype", product.producttypeId);
    setValue("description", product.description);
    setValue("import", product.import);
    setValue("isactive", product.isactive);
  };

  const resetInputs = () => {
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
  };

  const handleCloseEdit = () => {
    resetInputs();
    toggleEdit();
  };

  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={toggleEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={toggleEdit} />
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
            Producto <span>{`${productEdit?.product?.name} `}</span>
          </p>
          <form onSubmit={handleSubmit(handleUploadProduct)}>
            <Grid container className="form">
              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Codigo <strong>*</strong>
                    </p>
                    {errors.code && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.code.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Codigo del Producto"
                    className="input capitalize"
                    {...register("code", { required: "Este campo es requerido" })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre <strong>*</strong>
                    </p>
                    {errors.name && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.name.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Nombre del producto"
                    className="input capitalize"
                    {...register("name", { required: "Este campo es requerido" })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Tipo de producto<strong>*</strong>
                    </p>
                    {errors.productstype && (
                      <>
                        <Error>{errors.productstype.message}</Error>
                      </>
                    )}
                  </div>
                  <select
                    className="input capitalize"
                    {...register("productstype", { required: "Este campo es requerido" })}
                  >
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {typeProducts?.results.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Categoría<strong>*</strong>
                    </p>
                    {errors.category && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.category.message}</Error>
                      </>
                    )}
                  </div>
                  <select
                    className="input capitalize"
                    {...register("category", { required: "Este campo es requerido" })}
                  >
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {categories?.results.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Marca<strong>*</strong>
                    </p>
                    {errors.brand && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.brand.message}</Error>
                      </>
                    )}
                  </div>
                  <select className="input capitalize" {...register("brand", { required: "Este campo es requerido" })}>
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {brands?.results.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Proveedor <strong>*</strong>
                    </p>
                    {errors.provider && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.provider.message}</Error>
                      </>
                    )}
                  </div>
                  <select
                    className="input capitalize"
                    {...register("provider", { required: "Este campo es requerido" })}
                  >
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {providers?.results.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.companyname}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Precio Unitario <strong>*</strong>
                    </p>
                    {errors.amount && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.amount.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="precio del producto"
                    className="input capitalize"
                    {...register("amount", { required: "Este campo es requerido" })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Precio Tienda<strong>*</strong>
                    </p>
                    {errors.storeamount && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.storeamount.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="precio tienda del producto"
                    className="input capitalize"
                    {...register("storeamount", { required: "Este campo es requerido" })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Precio Call Center<strong>*</strong>
                    </p>
                    {errors.callamount && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.callamount.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="precio Call Center del producto"
                    className="input capitalize"
                    {...register("callamount", { required: "Este campo es requerido" })}
                  />
                </div>
              </Grid>

              {/** Producto Importado y Estatus */}
              <Grid item xs={12} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Producto Importado</p>
                  </div>
                  <select className="input capitalize" {...register("import")}>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Estatus del producto</p>
                  </div>
                  <select className="input capitalize" {...register("isactive")}>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} className="ctr_buttons">
                <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                  Cancelar
                </Button>
                <Button variant="contained" className="btn_upload" type="submit">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </DialogFullScreen>
  );
}
