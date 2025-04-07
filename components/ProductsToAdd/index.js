import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  Radio,
  Tooltip,
} from "@material-ui/core";
import { Close, FilterList, Refresh, Search } from "@material-ui/icons";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { LoaderStyle, PreviewProduct, ProductSyle } from "./style";
import { commonSelector, getProductsCommon } from "../../redux/slices/commonSlice";
import { formatNumber, toUpperCaseChart } from "../../utils";
import useModal from "../../hooks/useModal";
import NumberFormat from "react-number-format";
import { userSelector } from "../../redux/slices/userSlice";
import { handleGlobalAlert } from "../../utils";
export default function ProductsToAdd(props) {
  const { open, close, allProducts, setAllProducts } = props;
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const { open: openPreviewProduct, toggleModal: togglePreviewProduct, closeModal: closePreviewProduct } = useModal();
  const { productstypes: types, categories, brands, products } = useSelector(commonSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    isFilterTypeProduct: false,
    typeProduct: "",
    labelProduct: "",
    isFilterCategory: false,
    category: "",
    labelCategory: "",
    isFilterBrand: false,
    brand: "",
    labelBrand: "",
  });
  const [productPreview, setProductPreview] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isCanAdd, setIsCanAdd] = useState(true);
  const todosPerPage = 50;
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / todosPerPage);

  useEffect(() => {
    toggleFlag();
  }, [filters, searchTerm]);

  useEffect(() => {
    let subtotal = productPreview.callamount * productPreview.quantity;
    let iva = productPreview.applyIVA ? subtotal * 0.16 : 0;
    let total = subtotal + iva - productPreview.discount;
    setProductPreview({
      ...productPreview,
      subtotal: Number(subtotal.toFixed(2)),
      total: Number(total.toFixed(2)),
      iva: Number(iva.toFixed(2)),
    });

    if (productPreview.quantity > 0 && productPreview.callamount > 0) {
      setIsCanAdd(true);
    } else {
      setIsCanAdd(false);
    }
  }, [productPreview.quantity, productPreview.callamount, productPreview.discountPercentage, productPreview.applyIVA]);

  for (let i = 1; i <= Math.ceil(totalProducts / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  const todosData = useMemo(() => {
    let productsRes = products.results || [];
    if (searchTerm) {
      productsRes = productsRes.filter(
        todo =>
          todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.isFilterTypeProduct)
      productsRes = productsRes.filter(todo => todo.productstype?.id === filters?.typeProduct);
    if (filters.isFilterCategory) productsRes = productsRes.filter(todo => todo.category?.id === filters?.category);
    if (filters.isFilterBrand) productsRes = productsRes.filter(todo => todo.brand?.id === filters?.brand);
    setTotalProducts(productsRes.length);
    return productsRes.slice((page - 1) * todosPerPage, (page - 1) * todosPerPage + todosPerPage);
  }, [products, page, searchTerm, filters]);

  const handlePageCandidate = (event, value) => setPage(value);

  const handleSelectProduct = product => {
    let ivatotal = calculateFirstIVA(product.callamount, 1, true);
    setProductPreview({
      ...product,
      subtotal: product.callamount,
      quantity: 1,
      discount: 0,
      discountPercentage: 0,
      applyIVA: true,
      info: "",
      iva: ivatotal,
      total: Number(product.callamount + ivatotal),
    });
    togglePreviewProduct();
  };

  const handleAddProduct = () => {
    let copyProducts = [...allProducts.results];
    let normalizeProduct = {
      prodId: productPreview.id,
      quantity: productPreview.quantity,
      discount: productPreview.discount,
      iva: productPreview.iva,
      total: productPreview.total,
      note: productPreview.info,
      newprice: productPreview.callamount,
      callamount: productPreview.callamount,
      customproduct: productPreview.code == "ENVIO-UA" ? true : false,
      shownote: false,
      ejecutiveId: id_user,
      dispercentage: productPreview.discountPercentage,
      newProduct: true,
      brand: productPreview.brand,
      code: productPreview.code,
      name: productPreview.name,
      product: {
        name: productPreview.name,
        code: productPreview.code,
        import: productPreview.import,
      },
    };
    copyProducts.push(normalizeProduct);
    setAllProducts({ ...allProducts, results: copyProducts });
    handleGlobalAlert("success", "Producto Agregado Correctamente", "basic", dispatch);
    handleCloseAll();
  };

  const calculateFirstIVA = (price, quantity, isApplyIva) => {
    let calculate = isApplyIva ? quantity * price * 0.16 : 0;
    return Number(calculate.toFixed(2));
  };

  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };
  const reloadProducts = () => {
    let paramsProducts = {
      count: 1,
      limit: 15,
      include: "brand",
      join: "bra",
      where: {
        isactive: true,
      },
    };

    const paramsProductsWithQuery = {
      count: 1,
      all: 1,
      include: "brand",
      join: "bra",
      where: {
        isactive: true,
        $or: [{ name: { iRegexp: searchQuery.trim() } }, { code: { iRegexp: searchQuery.trim() } }],
      },
    };

    dispatch(getProductsCommon({ params: searchQuery != "" ? paramsProductsWithQuery : paramsProducts }));
  };

  const handleCloseAll = () => {
    close();
    closePreviewProduct();
  };

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
    <ProductSyle open={open} onClose={close} anchor={"right"}>
      <div className="container_products">
        <div className="container_products__head">
          <div className="title_container">
            <p className="title" onClick={() => console.log("producto", todosData[0])}>
              Productos
            </p>
            <Tooltip title="Actualizar Productos" arrow={true}>
              <IconButton className="bt_refresh" onClick={() => reloadProducts()}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </div>
          <IconButton className="bt_close" onClick={close}>
            <Close />
          </IconButton>
        </div>
        {products.isFetching && <LoaderProducts />}
        {!products.isFetching && (
          <div className="container_products__body">
            <div className="searchFilters">
              <div className="search_box">
                <Input
                  className="input_search"
                  placeholder="Ingrese Nombre del Producto"
                  disableUnderline={true}
                  fullWidth={true}
                  startAdornment={<Search />}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {/* <Button
                  className="bt_filter"
                  startIcon={<FilterList />}
                  onClick={() => setIsShowFilters(!isShowFilters)}
                >
                  Filtros
                </Button> */}
              </div>
            </div>
            <Collapse in={isShowFilters}>
              <Grid className="filters" container={true} spacing={1}>
                <Grid item={true} md={3}>
                  <Select
                    className="select_filter"
                    placeholder="Tipo de Producto"
                    noOptionsMessage={() => "Sin Opciones"}
                    options={types.results}
                    onChange={option =>
                      setFilters({
                        ...filters,
                        isFilterTypeProduct: true,
                        typeProduct: option.id,
                        labelProduct: option.name,
                      })
                    }
                    getOptionLabel={option => toUpperCaseChart(option.name)}
                    getOptionValue={option => option.id}
                  />
                </Grid>
                <Grid item={true} md={3}>
                  <Select
                    className="select_filter"
                    placeholder="Tipo de Categoría"
                    noOptionsMessage={() => "Sin Opciones"}
                    options={categories.results}
                    onChange={option =>
                      setFilters({
                        ...filters,
                        isFilterCategory: true,
                        category: option.id,
                        labelCategory: option.name,
                      })
                    }
                    getOptionLabel={option => toUpperCaseChart(option.name)}
                    getOptionValue={option => option.id}
                  />
                </Grid>
                <Grid item={true} md={3}>
                  <Select
                    className="select_filter"
                    placeholder="Marca"
                    noOptionsMessage={() => "Sin Opciones"}
                    options={brands.results}
                    onChange={option =>
                      setFilters({ ...filters, isFilterBrand: true, brand: option.id, labelBrand: option.name })
                    }
                    getOptionLabel={option => toUpperCaseChart(option.name)}
                    getOptionValue={option => option.id}
                  />
                </Grid>
              </Grid>
            </Collapse>
            <div className="chips">
              {searchTerm && (
                <Chip
                  className="chip"
                  label={"Búsqueda: " + searchTerm}
                  color="primary"
                  onDelete={() => setSearchTerm("")}
                />
              )}
              {filters.isFilterTypeProduct && (
                <Chip
                  className="chip"
                  label={"Tipo de Producto: " + toUpperCaseChart(filters.labelProduct)}
                  color="primary"
                  onDelete={() => setFilters({ ...filters, isFilterTypeProduct: false })}
                />
              )}
              {filters.isFilterCategory && (
                <Chip
                  className="chip"
                  label={"Categoría: " + toUpperCaseChart(filters.labelCategory)}
                  color="primary"
                  onDelete={() => setFilters({ ...filters, isFilterCategory: false })}
                />
              )}
              {filters.isFilterBrand && (
                <Chip
                  className="chip"
                  label={"Marca: " + toUpperCaseChart(filters.labelBrand)}
                  color="primary"
                  onDelete={() => setFilters({ ...filters, isFilterBrand: false })}
                />
              )}
            </div>
            <div className="products">
              <div className="table_container">
                <table className="table">
                  <thead className="table__head">
                    <tr>
                      <th className="th secondColor">Código</th>
                      <th className="th primaryColor">Producto</th>
                      <th className="th secondColor">Marca</th>
                      <th className="th secondColor">Categoría</th>
                      <th className="th secondColor">Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {todosData.map((item, index) => (
                      <tr className="tr_body" onClick={() => handleSelectProduct(item)} key={index}>
                        <td className="td">{item.code}</td>
                        <td className="td">{item.name}</td>
                        <td className="td justify">{item.brand?.name}</td>
                        <td className="td justify">{item.category?.name}</td>
                        <td className="td">{formatNumber(item.callamount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination_container">
                <Pagination
                  className="pagination"
                  shape="rounded"
                  page={page}
                  defaultPage={1}
                  onChange={handlePageCandidate}
                  count={totalPages}
                  color="primary"
                />
                <p className="products_count">{`Total de Productos: ${totalProducts} Página: ${page} - ${totalPages}
              `}</p>
              </div>
            </div>
          </div>
        )}
        <div className="container_products__footer"></div>
      </div>
      <PreviewProduct open={openPreviewProduct} onClose={closePreviewProduct}>
        <div className="preview_style">
          <div className="preview_style__header">
            <p className="title" onClick={() => console.log("producto", productPreview)}>
              Confirmación de Producto
            </p>
            <IconButton className="bt_close" onClick={closePreviewProduct}>
              <Close />
            </IconButton>
          </div>
          <div className="preview_style__body">
            <Grid className="product_data" container={true} spacing={2}>
              <Grid item={true} md={12}>
                <p className="title">Producto</p>
                <input className="input" value={productPreview?.name} disabled={true} />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Código</p>
                <input className="input" disabled={true} value={productPreview?.code} />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Clasificación</p>
                <input className="input" disabled={true} value={productPreview?.import ? "Importado" : "Nacional"} />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Precio Unitario</p>
                <NumberFormat
                  className="input"
                  prefix="$"
                  thousandSeparator={true}
                  decimalScale={2}
                  value={productPreview?.callamount}
                  onValueChange={e => {
                    setProductPreview({
                      ...productPreview,
                      callamount: e.floatValue ? e.floatValue : 0,
                    });
                  }}
                />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Marca</p>
                <input className="input" disabled={true} value={productPreview?.brand?.name} />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Cantidad</p>
                <NumberFormat
                  className="input"
                  thousandSeparator=","
                  displayType="input"
                  allowNegative={false}
                  defaultValue={1}
                  onValueChange={e => {
                    setProductPreview({
                      ...productPreview,
                      quantity: e.floatValue ? e.floatValue : 0,
                    });
                  }}
                />
              </Grid>
              <Grid item={true} md={6}>
                <p className="title">Descuento del Producto (%)</p>
                <NumberFormat
                  className="input"
                  disabled={productPreview.import ? false : true}
                  thousandSeparator={true}
                  allowNegative={false}
                  prefix="%"
                  placeholder={productPreview.import ? "Ingresa el Porcentaje" : ""}
                  onValueChange={e => {
                    let calDisc = e.floatValue ? e.floatValue / 100 : 0;
                    let cantDisc = e.floatValue ? productPreview.subtotal * calDisc : 0;
                    setProductPreview({
                      ...productPreview,
                      discountPercentage: e.floatValue ? e.floatValue : 0,
                      discount: Number(cantDisc.toFixed(2)),
                    });
                  }}
                />
              </Grid>
              <Grid item={true} md={12}>
                <p className="title">Observaciones de Producto</p>
                <textarea
                  className="text_area"
                  onChange={e => setProductPreview({ ...productPreview, info: e.target.value })}
                />
              </Grid>
              <Grid className="iva_container" item={true} md={12}>
                <p className="title_iva">IVA</p>
                <Checkbox
                  disabled={productPreview.import || productPreview.code === "ENVIO-UA" ? false : true}
                  defaultChecked={true}
                  onChange={e => setProductPreview({ ...productPreview, applyIVA: e.target.checked })}
                />
              </Grid>
              <Grid className="totals_container" item={true} md={12}>
                <NumberFormat prefix="IVA:  $" displayType="text" value={productPreview.iva} thousandSeparator="," />
                {productPreview.import || productPreview.code === "ENVIO-UA" ? (
                  <NumberFormat
                    prefix="Descuento:  $"
                    displayType="text"
                    value={productPreview.discount}
                    thousandSeparator=","
                  />
                ) : (
                  <></>
                )}
                <NumberFormat
                  prefix="Subtotal:  $"
                  displayType="text"
                  value={productPreview.subtotal}
                  thousandSeparator=","
                />
                <NumberFormat
                  prefix="Total:  $"
                  displayType="text"
                  value={productPreview.total}
                  thousandSeparator=","
                />
              </Grid>
              <Grid className="buttons_container" item={true} md={12}>
                <Button className={`bt_add ${!isCanAdd && "disabled"}`} disabled={!isCanAdd} onClick={handleAddProduct}>
                  Agregar Producto
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </PreviewProduct>
    </ProductSyle>
  );
}

function LoaderProducts() {
  return (
    <LoaderStyle>
      <div className="loader_img">
        <img src="/load.png" />
      </div>
      <div className="loader_title">
        <p className="title">Cargando Productos</p>
        <LinearProgress className="progressbar" color="primary" />
      </div>
    </LoaderStyle>
  );
}
