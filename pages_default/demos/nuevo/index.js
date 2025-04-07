import React, { useEffect, useState } from "react";
import {
  AddProductStyle,
  ErrorAddress,
  ErrorStyle,
  FormNewProdStyle,
  LayoutDrawer,
  NewDemoStyled,
  ProductStyle,
  customStyles,
  selectFilter,
} from "../../../styles/Demos/nuevo.styled";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import MainLayout from "../../../components/MainLayout";
import { Button, Collapse, Grid, IconButton, Input, Chip, Tooltip, Divider } from "@material-ui/core";
import useNewDemo from "../../../hooks/useNewDemo";
import { commonSelector, getProductsCommon } from "../../../redux/slices/commonSlice";
import { generateTemporalId, handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import {
  Add,
  Autorenew,
  Ballot,
  Cached,
  Close,
  FilterList,
  MailOutline,
  PersonOutline,
  PhoneIphone,
  Search,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import { colors } from "../../../styles/global.styles";
import DemotoTemplate from "../../../components/Templates/DemoTemplate";
export default function CreateNewDemo() {
  const router = useRouter();
  const { idOportunity } = router.query;
  const {
    oportunity,
    seeMore,
    products,
    EntitiesLocal,
    cities,
    settlements,
    isCreatingDemo,
    openAddProduct,
    validateData,
    getOptionsCities,
    handleSeeMore,
    handleEditProduct,
    handleAddProduct,
    handleDeleteProduct,
    handleOpenAddProduct,
    handleCloseAddProduct,
    handleCreateDemo,
    handlePostalCode,
    handleCityPostal,
    handleSubmit,
    register,
    control,
    errors,
    openPreviewModal,
    CloseModalPreview,
    DataTemplateNormalize,
  } = useNewDemo(idOportunity);

  return (
    <MainLayout>
      <NewDemoStyled seemore={seeMore.toString()}>
        <div className="content_newDemo">
          <div className="content_newDemo__header">
            <p className="title_header">Nueva Demo</p>
          </div>
          <div className="content_newDemo__body">
            <Grid container={true} className="opportunity" spacing={3}>
              <Grid className="item" item={true} md={12} sm={12} xs={12}>
                <p className="title_opportunity">Datos de la Cotización</p>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <p className="title">Folio</p>
                <p className="data">{validateData(oportunity?.concept)}</p>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <p className="title">Nombre Completo</p>
                <p className="data capitalize">
                  <PersonOutline />
                  {validateData(oportunity?.prospect?.fullname)}
                </p>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <p className="title">Movil</p>
                <p className="data">
                  <PhoneIphone />
                  {validateData(oportunity?.prospect?.phone)}
                </p>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <p className="title">Correo</p>
                <p className="data">
                  <MailOutline />
                  {validateData(oportunity?.prospect?.email)}
                </p>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Tipo de Cliente</p>
                  <p className="data capitalize">{validateData(oportunity?.prospect?.clienttype?.name)}</p>
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Fase</p>
                  <p className="data capitalize">{validateData(oportunity?.phase?.name)}</p>
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Origen</p>
                  <p className="data capitalize">{validateData(oportunity?.prospect?.origin?.name)}</p>
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Fecha de Creación</p>
                  <p className="data capitalize">{validateData(oportunity?.createdAt, "date")}</p>
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Monto Cotizado</p>
                  {validateData(oportunity?.amount, "money")}
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Comisión</p>
                  {validateData(oportunity?.comission, "money")}
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={3} sm={4} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Certeza</p>
                  <p className="data">{validateData(oportunity?.certainty + "%")}</p>
                </Collapse>
              </Grid>
              <Grid className="item" item={true} md={12} sm={12} xs={12}>
                <Collapse in={seeMore}>
                  <p className="title">Observaciones</p>
                  <p className="data">{validateData(oportunity?.observations)}</p>
                </Collapse>
              </Grid>
            </Grid>
            <p className="see_more" onClick={() => handleSeeMore()}>
              {seeMore ? "Ver Menos" : "Ver más"}
            </p>

            <Grid container={true} className="demo" spacing={3}>
              <Grid className="item" item={true} md={12} sm={12} xs={12}>
                <p className="title_demo">Datos de la Demo</p>
              </Grid>

              <Grid className="item" item={true} md={4} sm={4} xs={12}>
                <p className="title">
                  Ejecutivo <ErrorForm message={errors?.executive?.message} />
                </p>

                <input
                  className="input_data"
                  placeholder="Ingresa el Nombre..."
                  {...register("executive", { required: "*Requerido" })}
                />
              </Grid>
              <Grid className="item" item={true} md={4} sm={4} xs={12}>
                <p className="title">
                  Esfera de Negocio <ErrorForm message={errors?.business_sphere?.message} />
                </p>
                <input
                  className="input_data"
                  placeholder="Ingresa el Nombre..."
                  {...register("business_sphere", { required: "*Requerido" })}
                />
              </Grid>
              <Grid className="item" item={true} md={4} sm={4} xs={12}>
                <p className="title">
                  Instructor Asignado <ErrorForm message={errors?.instructor?.message} />
                </p>
                <input
                  className="input_data"
                  placeholder="Ingresa el Nombre..."
                  {...register("instructor", { required: "*Requerido" })}
                />
              </Grid>
              <Grid className="item" item={true} md={6} sm={12} xs={12}>
                <p className="title">
                  Nombre del Cliente <ErrorForm message={errors?.client?.message} />
                </p>
                <input
                  className="input_data"
                  placeholder="Ingresa el Nombre del Cliente"
                  {...register("client", { required: "*Requerido" })}
                />
              </Grid>
              <Grid className="item" item={true} md={6} sm={12} xs={12}>
                <p className="title">
                  Teléfono del Cliente <ErrorForm message={errors?.phone?.message} />
                </p>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "*Requerido",
                    maxLength: {
                      value: 10,
                      message: "*10 Caracteres",
                    },
                    minLength: {
                      value: 10,
                      message: "*10 Caracteres",
                    },
                    pattern: {
                      value: /[0-9]+/i,
                      message: "*Caracter Invalido",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat placeholder="Ingresa el telefono del cliente" {...field} className="input_data" />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={12} sm={12} xs={12}>
                <p className="title">
                  Lugar de la Demostración <ErrorForm message={null} />
                </p>
                <Divider style={{ marginTop: 10 }} />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <input
                  className={`input_data adress ${errors.address?.street && "required"}`}
                  placeholder="Calle"
                  {...register("address.street", { required: true })}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.no_int"
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      placeholder="No. Interior"
                      className={`input_data adress`}
                      allowNegative={false}
                      allowLeadingZeros={true}
                    />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.no_ext"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      placeholder="No. Exterior"
                      className={`input_data adress ${errors.address?.no_ext && "required"}`}
                      allowNegative={false}
                      allowLeadingZeros={true}
                    />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.postal"
                  control={control}
                  rules={{
                    required: true,
                    minLength: {
                      value: 5,
                      message: "5 Caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className={`input_data adress ${errors.address?.postal && "required"}`}
                      placeholder="Código Postal"
                      onValueChange={e => handlePostalCode(e.value)}
                      maxLength={5}
                    />
                  )}
                />
                <ErrorAddress>{errors?.address?.postal?.message}</ErrorAddress>
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.entity"
                  control={control}
                  rules={{ required: "Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      styles={customStyles}
                      className={`select_data adress ${errors.address?.entity && "required"}`}
                      placeholder="Estado"
                      options={EntitiesLocal}
                      getOptionLabel={e => e.name}
                      onChange={value => getOptionsCities(true, value)}
                      getOptionValue={e => e.id}
                      maxMenuHeight={130}
                      noOptionsMessage={() => "Sin Opciones"}
                    />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.city"
                  control={control}
                  rules={{ required: "Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className={`select_data adress ${errors.address?.city && "required"}`}
                      styles={customStyles}
                      placeholder="Ciudad"
                      options={cities}
                      getOptionLabel={e => e.name}
                      getOptionValue={e => e.id}
                      onChange={value => handleCityPostal(value)}
                      maxMenuHeight={130}
                      noOptionsMessage={() => "Selecciona Primero un Estado"}
                    />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <Controller
                  name="address.settlement"
                  control={control}
                  rules={{ required: "Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className={`select_data adress ${errors.address?.settlement && "required"}`}
                      styles={customStyles}
                      placeholder="Asentamiento"
                      options={settlements}
                      getOptionLabel={e => e.settlement}
                      getOptionValue={e => e.id}
                      // onChange={value => handleCityPostal(value)}
                      maxMenuHeight={130}
                      noOptionsMessage={() => "Selecciona Primero una Ciudad"}
                    />
                  )}
                />
              </Grid>
              <Grid className="item" item={true} md={3} sm={3} xs={12}>
                <input
                  className={`input_data adress ${errors.address?.references && "required"}`}
                  placeholder="Referencias"
                  {...register("address.references", { required: false })}
                />
              </Grid>
              <Grid className="item" item={true} md={12} sm={12} xs={12} />
              <Grid className="item" item={true} md={4} sm={3} xs={12}>
                <p className="title">
                  Fecha y Hora de la Demostración <ErrorForm message={errors?.time?.message} />
                </p>
                <input className="input_data" type="datetime-local" {...register("time", { required: "*Requerido" })} />
              </Grid>
              <Grid className="item" item={true} md={4} sm={3} xs={12}>
                <p className="title">
                  Unidad Asignada <ErrorForm message={errors?.unityassign?.message} />
                </p>
                <input className="input_data" {...register("unityassign", { required: "*Requerido" })} />
              </Grid>
              <Grid className="item" item={true} md={4} sm={3} xs={12}>
                <p className="title">
                  Viáticos Asignados <ErrorForm message={errors?.travel_expenses?.message} />
                </p>
                <Controller
                  name="travel_expenses"
                  control={control}
                  rules={{ required: "*Requerido" }}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className="input_data"
                      thousandSeparator=","
                      prefix="$"
                      allowNegative={false}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div className="table_products">
              <p className="title_products">Productos</p>
              <div className="table">
                <TableProducts
                  products={products}
                  handleEditProduct={handleEditProduct}
                  handleOpenAddProduct={handleOpenAddProduct}
                  // handleAddProduct={handleAddProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            </div>
          </div>
          <div className="content_newDemo__footer">
            <div className="buttons">
              <Button className="br_create" onClick={handleSubmit(handleCreateDemo)}>
                Crear Demo
              </Button>
            </div>
          </div>
        </div>
        <AddNewProduct addProduct={handleAddProduct} open={openAddProduct} close={handleCloseAddProduct} />
        <PreviewDemo
          openPreviewModal={openPreviewModal}
          CloseModalPreview={CloseModalPreview}
          DataTemplateNormalize={DataTemplateNormalize}
        ></PreviewDemo>
      </NewDemoStyled>
      {isCreatingDemo && <LoaderCompleteScreen />}
    </MainLayout>
  );
}

const PreviewDemo = ({ openPreviewModal, CloseModalPreview, DataTemplateNormalize }) => {
  return (
    <LayoutDrawer anchor="right" open={openPreviewModal} onClose={CloseModalPreview}>
      <div className="drawertop">
        <p className="drawertop__title">Vista previa de Demo</p>
        <b style={{ color: "red", cursor: "pointer" }} onClick={() => CloseModalPreview()}>
          X
        </b>
      </div>
      <div>
        <DemotoTemplate obj={DataTemplateNormalize}></DemotoTemplate>
      </div>
    </LayoutDrawer>
  );
};

const TableProducts = ({ products, handleEditProduct, handleOpenAddProduct, handleDeleteProduct }) => {
  return (
    <ProductStyle>
      <div className="content_table">
        <table className="table">
          <thead className="head">
            <tr className="tr_head">
              <th className="th">Modelo</th>
              <th className="th">Descripción</th>
              <th className="th">No. Piezas</th>
              <th className="th" colSpan={2}>
                No. Serie
              </th>
            </tr>
          </thead>
          <tbody className="body">
            {products.length >= 1 ? (
              products.map((item, index) => (
                <tr key={index} className="tr_body">
                  <td className="td">
                    <input
                      className="input_data"
                      placeholder="Ingresa el Modelo"
                      onChange={e => handleEditProduct(e.target.value, "model", index)}
                      value={item.model}
                    />
                  </td>
                  <td className="td">
                    <input
                      className="input_data"
                      placeholder="Agrega una Descripción"
                      onChange={e => handleEditProduct(e.target.value, "description", index)}
                      value={item.description}
                    />
                  </td>
                  <td className="td">
                    <input
                      className="input_data"
                      placeholder="Agregar Numero de Piezas"
                      onChange={e => handleEditProduct(e.target.value, "quantity", index)}
                      value={item.quantity}
                    />
                  </td>
                  <td className="td">
                    <input
                      className="input_data"
                      placeholder="Ingresa el No. de Serie"
                      onChange={e => handleEditProduct(e.target.value, "serial", index)}
                      value={item.serial}
                    />
                  </td>
                  <td className="td">
                    <IconButton className="bt_delete" onClick={() => handleDeleteProduct(item.id)}>
                      <Close />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="empty_products" colSpan={5}>
                  No Hay Productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <Button className="add_product" startIcon={<Add />} onClick={() => handleOpenAddProduct()}>
          Agregar Producto
        </Button>
      </div>
    </ProductStyle>
  );
};

const AddNewProduct = ({ addProduct, open, close }) => {
  const { products, categories, typeProducts, brands } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const dispatch = useDispatch();
  const [keySearch, setKeySearch] = useState("");
  const [openProduct, setOpenProduct] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState(null);
  const [typeProduct, setTypeProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [productSelect, setProductSelect] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const rangeData = 50;
  const totalPages = Math.ceil(totalProducts / rangeData);

  const handleSelectProduct = product => {
    setProductSelect(product);
    handleOpenFormProduct();
  };
  const handleCloseFormProduct = () => {
    setProductSelect({});
    setOpenProduct(false);
  };
  const handleCloseAll = () => {
    setProductSelect({});
    setOpenProduct(false);
    close();
  };

  const reloadProducts = () => {
    let paramsProducts = {
      include: "category,provider,brand,productstype",
      join: "category,pro,bra,prodTy",
      where: `{"isactive": true}`,
      all: 1,
      order: "-createdAt",
      count: 1,
    };
    dispatch(getProductsCommon({ params: paramsProducts }));
  };

  const productsData = useMemo(() => {
    let productsRes = products.results || [];
    if (keySearch) {
      productsRes = productsRes?.filter(
        todo =>
          todo.name?.toLowerCase()?.includes(keySearch.toLowerCase()) ||
          todo.code?.toLowerCase()?.includes(keySearch.toLowerCase()) ||
          todo.category?.name?.toLowerCase().includes(keySearch.toLowerCase())
      );
    }
    if (category?.id) productsRes = productsRes.filter(todo => todo.category?.id === category?.id);
    if (typeProduct?.id) productsRes = productsRes.filter(todo => todo.productstype?.id === typeProduct?.id);
    if (brand?.id) productsRes = productsRes.filter(todo => todo.brand?.id === brand?.id);

    setTotalProducts(productsRes.length);

    return productsRes.slice((page - 1) * rangeData, (page - 1) * rangeData + rangeData);
  }, [products, page, keySearch, category, typeProduct, brand]);

  const handleSelect = (setIdentifier, value) => {
    if (value) {
      setIdentifier(value);
    } else {
      setIdentifier(null);
    }
  };

  const handlePage = (event, value) => setPage(value);
  const handleOpenFormProduct = () => setOpenProduct(true);
  const handleShowFilters = () => setShowFilters(!showFilters);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length < 3) return;

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      return;
    }

    const fetchData = async () => {
      try {
        const paramsProducts = {
          count: 1,
          all: 1,
          include: "brand",
          join: "bra",
          where: {
            isactive: true,
            $or: [{ name: { iRegexp: searchQuery.trim() } }, { code: { iRegexp: searchQuery.trim() } }],
          },
        };
        dispatch(getProductsCommon({ params: paramsProducts }));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <AddProductStyle anchor="right" open={open} onClose={close}>
      <div className="content_products">
        <div className="content_products__header">
          <p className="title_header">
            Productos
            <Tooltip title="Cargar los Productos" arrow={true}>
              <Autorenew className="bt_reload" onClick={() => reloadProducts()} />
            </Tooltip>
          </p>
          <IconButton className="bt_close" onClick={() => close()}>
            <Close />
          </IconButton>
        </div>
        <div className="content_products__body">
          <Input
            className="search_box"
            placeholder="Buscar por Nombre del Producto..."
            fullWidth={true}
            disableUnderline={true}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            // value={keySearch}
            // onChange={e => setKeySearch(e.target.value)}
            startAdornment={<Search className="search_icon" />}
          />
          <Collapse in={showFilters}>
            <div className="filters">
              <Select
                className="select_filter"
                placeholder="Tipo de Producto"
                onMenuOpen={() => getCatalogBy("typeProducts")}
                onChange={e => handleSelect(setTypeProduct, e)}
                styles={selectFilter}
                options={typeProducts.results}
                isLoading={typeProducts.isFetching}
                isClearable={true}
                value={typeProduct}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
              <Select
                className="select_filter"
                placeholder="Categoría del Producto"
                onMenuOpen={() => getCatalogBy("categories")}
                onChange={e => handleSelect(setCategory, e)}
                styles={selectFilter}
                options={categories.results}
                isLoading={categories.isFetching}
                isClearable={true}
                value={category}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
              <Select
                className="select_filter"
                placeholder="Marca del Producto"
                onMenuOpen={() => getCatalogBy("brands")}
                onChange={e => handleSelect(setBrand, e)}
                styles={selectFilter}
                isLoading={brands.isFetching}
                options={brands.results}
                isClearable={true}
                value={brand}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
            </div>
          </Collapse>
          <div className="chips">
            {keySearch.length >= 1 && (
              <Chip
                className="chip"
                color="primary"
                size="small"
                label={"Búsqueda: " + keySearch}
                onDelete={() => setKeySearch("")}
              />
            )}
            {category?.id && (
              <Chip
                className="chip"
                color="primary"
                size="small"
                label={"Categoría: " + category.name}
                onDelete={() => setCategory(null)}
              />
            )}
            {typeProduct?.id && (
              <Chip
                className="chip"
                color="primary"
                size="small"
                label={"Tipo de Producto: " + typeProduct.name}
                onDelete={() => setTypeProduct(null)}
              />
            )}
            {brand?.id && (
              <Chip
                className="chip"
                color="primary"
                size="small"
                label={"Marca: " + brand.name}
                onDelete={() => setBrand(null)}
              />
            )}
          </div>
          <p className="count_products">
            <Ballot className="icon_count" />
            {/* <span className="count">{totalProducts}</span>
            Total de Productos */}
          </p>
          <div className="table_products">
            <table className="table">
              <thead className="head">
                <tr className="tr_head">
                  <th className="th">Modelo</th>
                  <th className="th">Producto</th>
                  <th className="th">Marca</th>
                  <th className="th">Categoría</th>
                </tr>
              </thead>
              <tbody className="body">
                {products.isFetching ? (
                  <tr>
                    <td className="load_products" colSpan={5}>
                      Cargando Productos...
                    </td>
                  </tr>
                ) : productsData.length >= 1 ? (
                  productsData.map((item, index) => (
                    <tr key={index} className="tr_body" onClick={() => handleSelectProduct(item)}>
                      <td className="td">{item.code}</td>
                      <td className="td product_name">{item.name}</td>
                      <td className="td">{item?.brand?.name}</td>
                      <td className="td">{item?.category?.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="empty_products" colSpan={5}>
                      No Hay Productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* {!products.isFetching && (
            <div className="pagination">
              <Pagination
                color="primary"
                shape="rounded"
                size="small"
                page={page}
                defaultPage={1}
                onChange={handlePage}
                count={totalPages}
              />
            </div>
          )} */}
        </div>
        <div className="content_products__footer"></div>
      </div>
      <FormNewProduct
        open={openProduct}
        close={handleCloseFormProduct}
        closeAll={handleCloseAll}
        product={productSelect}
        addProduct={addProduct}
      />
    </AddProductStyle>
  );
};

const FormNewProduct = ({ open, close, closeAll, product, addProduct }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({});
  useEffect(() => {
    setNewProduct({
      id: generateTemporalId(5),
      model: product.code,
      description: product.name,
      quantity: 1,
      serial: "",
    });
  }, [product]);

  const handleEditProduct = (value, identifier) => {
    let copyProduct = { ...newProduct };
    copyProduct[identifier] = value;
    setNewProduct(copyProduct);
  };

  const handleAdd = () => {
    handleGlobalAlert("success", "Producto Agregado Correctamente", "basic", dispatch, 6000);
    addProduct(newProduct);
    closeAll();
  };

  return (
    <FormNewProdStyle open={open} onClose={close}>
      <div className="content_product">
        <div className="content_product__header">
          <p className="title_header">Confirmación de Producto</p>
        </div>
        <div className="content_product__body">
          <Grid className="form_product" container={true} spacing={1}>
            <Grid className="item" item={true} md={4}>
              <p className="title">Modelo</p>
              <input
                className="input_data"
                value={newProduct?.model}
                onChange={e => handleEditProduct(e.target.value, "model")}
              />
            </Grid>
            <Grid className="item" item={true} md={4}>
              <p className="title">No. Piezas</p>
              <NumberFormat
                className="input_data"
                value={newProduct?.quantity}
                onValueChange={e => handleEditProduct(e.floatValue, "quantity")}
                allowNegative={false}
                allowLeadingZeros={false}
                thousandSeparator=","
              />
            </Grid>
            <Grid className="item" item={true} md={4}>
              <p className="title">No. Serie</p>
              <input
                className="input_data"
                placeholder="Ingrese el Número"
                value={newProduct?.serial}
                onChange={e => handleEditProduct(e.target.value, "serial")}
              />
            </Grid>
            <Grid className="item" item={true} md={12}>
              <p className="title">Descripción</p>
              <textarea
                className="input_data description"
                value={newProduct?.description}
                onChange={e => handleEditProduct(e.target.value, "description")}
              />
            </Grid>
          </Grid>
        </div>
        <div className="content_product__footer">
          <div className="buttons">
            <Button className="bt_cancel" onClick={() => close()}>
              Cancelar
            </Button>
            <Button className="bt_add" onClick={() => handleAdd()}>
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </FormNewProdStyle>
  );
};

const ErrorForm = ({ message }) => {
  return <ErrorStyle>{message ? message : "*"}</ErrorStyle>;
};
