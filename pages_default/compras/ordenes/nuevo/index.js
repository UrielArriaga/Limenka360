import styled from "styled-components";

import { colors } from "../../../../styles/global.styles";
import { Divider, Grid, IconButton, Button, Drawer, Tooltip, Input, Chip, Collapse, Dialog } from "@material-ui/core";
import { useState } from "react";
import { ErrorStyle } from "../../../../styles/Demos/nuevo.styled";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { api } from "../../../../services/api";
import { useEffect } from "react";
import { Add, ArrowBack, Autorenew, Ballot, Close, FilterList, Search } from "@material-ui/icons";
import { commonSelector, getProductsCommon } from "../../../../redux/slices/commonSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useMemo } from "react";
import { Pagination } from "@mui/material";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import MainLayout from "../../../../components/MainLayout";
import { useRouter } from "next/router";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function NewOrder() {
  const {
    setValue,
    handleSubmit,
    register,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const [providers, setProviders] = useState([]);
  const [taxinformation, setTaxinformation] = useState([]);
  const [products, setProducts] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const { id_user, userData } = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter()

  console.log(id_user);

  useEffect(() => {
    handleMethoddelivery();
  }, []);

  useEffect(() => {
    handleTaxinformation();
  }, []);

  const handleEditProduct = (value, identifier, position, item) => {
    let copyProducts = [...products];
    copyProducts[position][identifier] = value;

    if (identifier === "quantity") {
      let total = value * item.unitprice;
      copyProducts[position]["amount"] = total;
      setProducts(copyProducts);
    } else {
      setProducts(copyProducts);
    }
  };

  //*Se actualiza Products
  const handleAddProduct = product => {
    let copyProducts = [...products];
    copyProducts.push(product);
    setProducts(copyProducts);
  };

  const handleMethoddelivery = async () => {
    try {
      let params = {
        limit: 100,
      };
      let response = await api.get(`providers`, { params });
      let provi = response.data.results;
      setProviders(provi);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaxinformation = async () => {
    try {
      let response = await api.get(`taxinformation`);
      let taxinfo = response.data.results;
      setTaxinformation(taxinfo);
    } catch (error) {
      console.log(error);
    }
  };

  //*TODO POST
  const handleCreateOrder = async formData => {
    try {
      let bodyDemo = await normalizeForm(formData);
   
      let response = await api.post(`purchaseorders`, bodyDemo);
      if (response.status === 201) {
        handleGlobalAlert("success", "Ordern Agregado Correctamente", "basic", dispatch, 6000);

        setProducts([]);
        reset({
          paymentcondition: "",
          phone: "",
          observations: "",
          methoddelivery: "",
          providerId: "",
          taxinformationId: "",
        });
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Algo sucedio revisa tu conexion", "basic", dispatch, 6000);
    }
  };

  const normalizeForm = async formData => {
    return {
      paymentcondition: formData.paymentcondition,
      phone: formData.phone,
      observations: formData.observations,
      methoddelivery: formData.methoddelivery,
      providerId: formData.providerId.id,
      taxinformationId: formData.taxinformationId.id,
      supplies: products,
    };
  };

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);
  const handleDeleteProduct = idProd => {
    let copyProducts = [...products];
    let deleteProduct = copyProducts.filter(item => item.productId !== idProd.productId);
    setProducts(deleteProduct);
  };
  return (
    <MainLayout>
      <OrdersStyled>
        <div className="main">
          <div className="container">
            <div className="container__header">
              <IconButton onClick={()=>router.back()} size="small" className="btnBack">
                <ArrowBack />
              </IconButton>
              <p className="title_header">Orden de Compra</p>
            </div>
            <div className="container__body">
              <Divider />

              <Grid container={true} className="demo" spacing={3}>
                <Grid className="item" item={true} md={12} sm={12} xs={12}>
                  <p className="title_demo">Datos de compra</p>
                </Grid>

                <Grid className="item" item={true} md={4} sm={4} xs={12}>
                  <p className="title">
                    Condiciones de pago <ErrorForm message={errors?.paymentcondition?.message} />
                  </p>

                  <input
                    className="input_data"
                    placeholder="Ingresa el tipo de pago..."
                    {...register("paymentcondition", { required: "*Requerido" })}
                  />
                </Grid>

                <Grid className="item" item={true} md={4} sm={4} xs={12}>
                  <p className="title">
                    Teléfono <ErrorForm message={errors?.phone?.message} />
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
                      <NumberFormat placeholder="Ingresa el telefono" {...field} className="input_data" />
                    )}
                  />
                </Grid>

                <Grid className="item" item={true} md={4} sm={4} xs={12}>
                  <p className="title">
                    Metodo de entrega <ErrorForm message={errors?.methoddelivery?.message} />
                  </p>
                  <input
                    className="input_data"
                    placeholder="Ingresa el metodo de entrega"
                    {...register("methoddelivery", { required: "*Requerido" })}
                  />
                </Grid>

                <Grid className="item" item={true} md={12} sm={12} xs={12}>
                  <p className="title">
                    Observaciones <ErrorForm message={errors?.observations?.message} />
                  </p>
                  <input
                    className="input_data"
                    placeholder="Ingresa Observaciones..."
                    {...register("observations", { required: "*Requerido" })}
                  />
                </Grid>

                <Grid className="item" item={true} md={6} sm={6} xs={12}>
                  <label>Proveedor</label>
                  <Controller
                    name="providerId"
                    control={control}
                    rules={{ required: "Requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        className={`select_data adress ${errors.providerId && "required"}`}
                        placeholder="Proveedor"
                        options={providers}
                        getOptionLabel={e => e.companyname}
                        // onChange={value => getOptionsCities(true, value)}
                        getOptionValue={e => e.id}
                        maxMenuHeight={130}
                        noOptionsMessage={() => "Sin Opciones"}
                      />
                    )}
                  />
                </Grid>

                <Grid className="item" item={true} md={6} sm={6} xs={12}>
                  <label>Inpuesto</label>
                  <Controller
                    name="taxinformationId"
                    control={control}
                    rules={{ required: "Requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        styles={customStyles}
                        className={`select_data adress ${errors.taxinformationId && "required"}`}
                        placeholder="Impuesto"
                        options={taxinformation}
                        getOptionLabel={e => e.name}
                        // onChange={value => getOptionsCities(true, value)}
                        getOptionValue={e => e.id}
                        maxMenuHeight={130}
                        noOptionsMessage={() => "Sin Opciones"}
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
                    handleDeleteProduct={handleDeleteProduct}
                  />
                </div>
              </div>
            </div>
            <div className="container__footer">
              <div className="buttons">
                <Button className="br_create" onClick={handleSubmit(handleCreateOrder)}>
                  Crear
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AddNewProduct addProduct={handleAddProduct} open={openAddProduct} close={handleCloseAddProduct} />
      </OrdersStyled>
    </MainLayout>
  );
}

const TableProducts = ({ products, handleEditProduct, handleOpenAddProduct, handleDeleteProduct }) => {
  return (
    <ProductStyle>
      <div className="content_table">
        <table className="table">
          <thead className="head">
            <tr className="tr_head">
              <th className="th">Codigo</th>
              <th className="th">Descripción</th>
              <th className="th">Cantidad</th>
              <th className="th">Unidad</th>
              <th className="th">Precio Unit.</th>
              <th className="th">Importe</th>
              <th className="th" colSpan={2}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="body">
            {products.length >= 1 &&
              products.map((item, index) => (
                <tr key={index} className="tr_body">
                  <td className="td">
                    <p>{item.model}</p>
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
                      placeholder="Agrega una cantidad"
                      onChange={e => handleEditProduct(e.target.value, "quantity", index, item)}
                      value={item.quantity}
                    />
                  </td>

                  <td className="td">{item.unit}</td>

                  <td className="td">
                    <p>{item.unitprice}</p>
                    {/* <input
                        className="input_data"
                        placeholder="Agrega una cantidad"
                        onChange={e => handleEditProduct(e.target.value, "unitprice", index, item)}
                        value={item.unitprice}
                      /> */}
                  </td>
                  <td className="td">$ {item.amount}</td>
                  <td className="td">
                    <IconButton className="bt_delete" onClick={() => handleDeleteProduct(item)}>
                      <Close />
                    </IconButton>
                  </td>
                </tr>
              ))}
            {products.length === 0 && (
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

  const chipData = [
    { id: keySearch?.length >= 1, label: "Búsqueda: " + keySearch, onDelete: () => setKeySearch("") },
    { id: category?.id, label: "Categoría: " + category?.name, onDelete: () => setCategory(null) },
    { id: typeProduct?.id, label: "Tipo de Producto: " + typeProduct?.name, onDelete: () => setTypeProduct(null) },
    { id: brand?.id, label: "Marca: " + brand?.name, onDelete: () => setBrand(null) },
  ];

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
            value={keySearch}
            onChange={e => setKeySearch(e.target.value)}
            startAdornment={<Search className="search_icon" />}
            endAdornment={
              <Button className="bt_filters" onClick={() => handleShowFilters()} startIcon={<FilterList />}>
                Filtros
              </Button>
            }
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
            {chipData?.map(
              (chip, index) =>
                chip.id && (
                  <Chip
                    key={index}
                    className="chip"
                    color="primary"
                    size="small"
                    label={chip.label}
                    onDelete={chip.onDelete}
                  />
                )
            )}
          </div>

          <p className="count_products">
            <Ballot className="icon_count" />
            <span className="count">{totalProducts}</span>
            Total de Productos
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
                {products?.isFetching && (
                  <tr>
                    <td className="load_products" colSpan={5}>
                      Cargando Productos...
                    </td>
                  </tr>
                )}

                {!products?.isFetching &&
                  productsData?.length >= 1 &&
                  productsData?.map((item, index) => (
                    <tr key={index} className="tr_body" onClick={() => handleSelectProduct(item)}>
                      <td className="td">{item.code}</td>
                      <td className="td product_name">{item.name}</td>
                      <td className="td">{item.brand.name}</td>
                      <td className="td">{item.category.name}</td>
                    </tr>
                  ))}
                {!products?.isFetching && productsData?.length === 0 && (
                  <tr>
                    <td className="empty_products" colSpan={5}>
                      No hay Productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!products.isFetching && (
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
          )}
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
  const [newProduct, setNewProduct] = useState({
    model: "",
    description: "",
    quantity: 1,
    unit: "pzas",
    unitprice: 0,
    amount: 0,
    productId: "",
  });

  useEffect(() => {
    if (product) {
      setNewProduct({
        model: product?.code,
        description: product?.name,
        quantity: 1,
        unit: "pzas",
        unitprice: product?.callamount,
        amount: product?.callamount,
        productId: product?.id,
      });
    }
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
            <Grid className="item" item={true} md={6}>
              <p className="title">Modelo</p>
              <input
                className="input_data"
                value={newProduct?.model}
                onChange={e => handleEditProduct(e.target.value, "model")}
              />
            </Grid>
            <Grid className="item" item={true} md={6}>
              <p className="title">Precio unitario</p>
              <NumberFormat
                className="input_data"
                value={newProduct?.unitprice}
                onValueChange={e => handleEditProduct(e.floatValue, "unitprice")}
                allowNegative={false}
                allowLeadingZeros={false}
                thousandSeparator=","
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

const OrdersStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }
  .main {
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

    .container {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;

      &__header {
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        gap: 10px;
        .title_header {
          font-size: 27px;
          /* margin-bottom: 10px; */
          font-weight: bold;
        }
        .btnBack{
         background: ${colors.iconsSideColor};
        }
      }
      &__body {
        margin-bottom: 70px;
        .opportunity {
          .item {
            .title_opportunity {
              font-size: 16px;
              font-weight: 500;
              margin-bottom: 15px;
            }
            .title {
              color: grey;
              font-size: 13px;
            }
            .data {
              font-weight: 500;
            }
            .capitalize {
              text-transform: capitalize;
            }
          }
        }
        .demo {
          margin-top: 20px;
          margin-bottom: 20px;
          .item {
            .title_demo {
              font-size: 16px;
              font-weight: 500;
              margin-bottom: 10px;
            }
            .title {
              color: grey;
              font-size: 13px;
            }
            .data {
              font-weight: 500;
            }
            .capitalize {
              text-transform: capitalize;
            }
            .input_data {
              height: 32px;
              width: 100%;
              padding: 4px;
              font-size: 15px;
              border: 1px solid #d4d4d4;
              border-radius: 5px;
              outline: none;
            }
            .select_data {
              height: 32px;
              width: 100%;
              font-size: 14px;
              border: 1px solid #d4d4d4;
              border-radius: 5px;
            }
            .adress {
              height: 32px;
              font-size: 13px;
              padding: 5px;
            }
            .required {
              border: 1px solid rgb(255, 0, 0, 0.4);
            }
          }
        }
        .table_products {
          margin-bottom: 20px;
          .title_products {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }
        }
        .see_more {
          margin-top: ${({ seemore }) => (seemore === "true" ? "10px" : "-20px")};
          font-size: 14px;
          color: ${colors.primaryColorDark};
          font-weight: 500;
          cursor: pointer;
        }
      }
      &__footer {
        .buttons {
          display: flex;
          flex-direction: row-reverse;
          margin-bottom: 10px;
          .br_create {
            font-weight: 500;
            color: #fff;
            text-transform: capitalize;
            background-color: ${colors.primaryColorDark};
          }
        }
      }
    }
  }
`;

const customStyles = {
  control: base => ({
    ...base,
    marginTop: -5,
    marginLeft: -5,
    width: "100%",
    minHeight: 30,
    fontSize: 12,
    border: "none",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 1,
  }),
};

const ProductStyle = styled.div`
  .content_table {
    margin-bottom: 20px;

    .table {
      width: 100%;
      border: none;
      border-collapse: collapse;
      .head {
        .tr_head {
          color: #fff;
          background-color: ${colors.primaryColor};
          height: 40px;
          .th {
            text-align: left;
          }
        }
      }
      .body {
        .tr_body {
          .td {
            .input_data {
              margin: 5px 0px;
              font-size: 14px;
              padding: 5px;
              border: 1px solid #d4d4d4;
              outline: none;
              width: 90%;
            }
            .bt_delete {
              height: 30px;
              width: 30px;
              border-radius: 8px;
              color: red;
              margin: 0px;
              svg {
                font-size: 20px;
              }
            }
          }
        }
      }
      .empty_products {
        padding: 10px;
        text-align: center;
        font-size: 15px;
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    .add_product {
      font-size: 11px;
      border: 1px solid;
      text-transform: capitalize;
      color: ${colors.primaryColorDark};
      border: 1px solid ${colors.primaryColorDark};
    }
  }
`;

const AddProductStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(80% - 250px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
  }
  .content_products {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 10px;
      .title_header {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        color: ${colors.primaryColorDark};
        .bt_reload {
          transition: 0.2s;
          margin-left: 10px;
          font-size: 21px;
          margin-bottom: -4px;
          cursor: pointer;
          &:hover {
            transform: rotate(180deg);
          }
        }
      }
      .bt_close {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        color: red;
      }
    }
    &__body {
      padding: 20px;

      .search_box {
        padding: 3px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        margin-bottom: 30px;
        .search_icon {
          font-size: 22px;
          margin-right: 5px;
          color: grey;
        }
        .bt_filters {
          text-transform: capitalize;
          color: ${colors.primaryColorDark};
          font: 13px;
          svg {
            font-size: 17px;
          }
        }
      }
      .filters {
        width: 100%;
        display: flex;
        margin-bottom: 30px;
        .select_filter {
          z-index: 2;
          margin-right: 10px;
        }
      }
      .chips {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .chip {
          margin: 2px;
        }
      }
      .count_products {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 5px;
        .icon_count {
          font-size: 18px;
          color: ${colors.primaryColorDark};
        }
        .count {
          margin: 0px 3px;
          font-weight: bold;
        }
      }
      .table_products {
        overflow: auto;
        height: auto;
        max-height: 55vh;
        .table {
          width: 100%;
          border: none;
          border-collapse: collapse;
          .head {
            .tr_head {
              position: sticky;
              z-index: 1;
              top: 0;
              color: #fff;
              background-color: ${colors.primaryColorDark};
              .th {
                padding: 10px;
                text-align: left;
              }
            }
          }
          .body {
            tr:nth-child(even) {
              background: #f3f3f3;
            }
            .tr_body {
              transition: 0.2s;
              cursor: pointer;
              &:hover {
                background: #00c853;
              }
              .td {
                font-size: 14px;
                padding: 10px 8px;
                font-weight: 500;
                .bt_delete {
                  height: 30px;
                  width: 30px;
                  border-radius: 8px;
                  color: red;
                  margin: 0px;
                  svg {
                    font-size: 20px;
                  }
                }
              }
              .product_name {
                width: 60%;
              }
            }
          }
          .empty_products {
            padding: 10px;
            text-align: center;
            font-size: 15px;
          }
          .load_products {
            font-weight: 500;
            padding: 20px;
            text-align: center;
            font-size: 15px;
          }
        }
        margin-bottom: 20px;
      }
      .pagination {
        display: flex;
        flex-direction: row-reverse;
      }
    }
    &__footer {
    }
  }
`;

const FormNewProdStyle = styled(Dialog)`
  .content_product {
    &__header {
      padding: 10px;
      .title_header {
        font-size: 17px;
        color: ${colors.primaryColorDark};
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      margin-bottom: 10px;
      .form_product {
        .title {
          font-size: 13px;
          color: grey;
        }
        .input_data {
          width: 100%;
          font-size: 14px;
          border-radius: 5px;
          padding: 5px;
          border: 1px solid #d4d4d4;
          outline: none;
        }
        .description {
          resize: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
      }
    }
    &__footer {
      padding: 10px;
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        .bt_add {
          height: 30px;
          width: 10px;
          color: #fff;
          margin-right: 5px;
          background-color: ${colors.primaryColorDark};
          text-transform: capitalize;
          font-size: 12px;
        }
        .bt_cancel {
          height: 30px;
          width: 10px;
          text-transform: capitalize;
          color: red;
          font-size: 12px;
        }
      }
    }
  }
`;

const selectFilter = {
  control: base => ({
    ...base,
    minHeight: 34,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 2,
  }),
};
