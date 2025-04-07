import { Box, Chip, Grid, IconButton, LinearProgress, TextField, Tooltip } from "@material-ui/core";
import { Cached, Category, Clear, Close, FilterList, SearchOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector, getProductsCommon } from "../../redux/slices/commonSlice";
import { setProductSelect } from "../../redux/slices/quotesSlice";
import { formatNumber, toUpperCaseChart } from "../../utils";
import QuantityModal from "../QuantityModal";
import { DrawerStyled } from "./styles";

const useDrawerCotizacionLogic = () => {
  const dispatch = useDispatch();
  const { products, categories, typeProducts, brands } = useSelector(commonSelector);

  const [openQuantity, setOpenQuantity] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [btClearSearch, setbtClearSearch] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBrand, setSelectBrand] = useState("");
  const [selectTypeProduct, setSelectTypeProducts] = useState("");
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const reloadProducts = () => {
    const paramsProducts = {
      count: 1,
      limit: 15,
      include: "brand",
      join: "bra",
      where: {
        isactive: true,
      },
    };
    dispatch(getProductsCommon({ params: paramsProducts }));
  };

  const handleSelectProduct = item => {
    dispatch(setProductSelect(item));
    setOpenQuantity(!openQuantity);
  };

  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };

  const handleCategory = event => {
    event ? setSelectCategory(event) : removeCategory();
    setShowChipsProducts(true);
  };

  const handleBrand = event => {
    event ? setSelectBrand(event) : removeBrand();
    setShowChipsProducts(true);
  };

  const handleTypeProduct = event => {
    event ? setSelectTypeProducts(event) : removeTypeProduct();
    setShowChipsProducts(true);
  };

  const cleanPagination = () => {
    setFlag(!flag);
    toggleFlag();
  };

  const removeCategory = () => {
    setSelectCategory("");
    cleanPagination();
  };

  const removeBrand = () => {
    setSelectBrand("");
    cleanPagination();
  };

  const removeTypeProduct = () => {
    setSelectTypeProducts("");
    cleanPagination();
  };

  const removeProduct = () => {
    setSearchTerm("");
    setbtClearSearch(false);
    cleanPagination();
  };

  const todosData = useMemo(() => {
    let productsRes = products.results || [];
    if (searchTerm) {
      productsRes = productsRes.filter(todo =>
        [todo.name, todo.code, todo.category?.name].some(field =>
          field?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
      );
    }
    if (selectCategory) productsRes = productsRes.filter(todo => todo.category?.id === selectCategory?.id);
    if (selectTypeProduct) productsRes = productsRes.filter(todo => todo.productstype?.id === selectTypeProduct?.id);
    if (selectBrand) productsRes = productsRes.filter(todo => todo.brand?.id === selectBrand?.id);

    setTotalProducts(productsRes.length);
    return productsRes.slice((page - 1) * limit, page * limit);
  }, [products, searchTerm, selectCategory, selectTypeProduct, selectBrand, page, limit]);

  return {
    openQuantity,
    totalProducts,
    btClearSearch,
    selectCategory,
    selectBrand,
    selectTypeProduct,
    showChipsProducts,
    searchTerm,
    setSearchTerm,
    setSelectCategory,
    setSelectBrand,
    setSelectTypeProducts,
    reloadProducts,
    handleSelectProduct,
    handleCategory,
    handleBrand,
    handleTypeProduct,
    removeProduct,
    todosData,
  };
};

const DrawerCotizacion = ({
  setAlert,
  show,
  closeDrawer,
  setProducto,
  producto,
  ShowAlert,
  amountProduct,
  totalPieces,
  discountTotal,
  totalFinal,
  priceUnit,
  openDiscount,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { getCatalogBy } = useGlobalCommons();
  const { products, categories, typeProducts, brands } = useSelector(commonSelector);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [btClearSearch, setbtClearSearch] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBrand, setSelectBrand] = useState("");
  const [selectProvider, setSelectProvider] = useState("");
  const [selectTypeProduct, setSelectTypeProducts] = useState("");
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [orderArrow, setOrderArrow] = useState(false);
  const [order, setOrder] = useState("-createdAt");
  const paginasProducts = Math.ceil(totalProducts / limit);
  const todosPerPage = 50;

  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(totalProducts / todosPerPage);
  const [quantity, setQuantity] = useState(1);
  const [applyIva, setApplyIva] = useState(true);

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

  const handleSelectProduct = item => {
    dispatch(setProductSelect(item));
    setOpenQuantity(!openQuantity);
  };

  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };

  const handleCategory = event => {
    if (event) {
      setSelectCategory(event);
      setShowChipsProducts(true);
    } else {
      removeCategory();
    }
  };
  const handleBrand = event => {
    if (event) {
      setSelectBrand(event);
      setShowChipsProducts(true);
    } else {
      removeBrand();
    }
  };

  const handleTypeProduct = event => {
    if (event == null) {
      removeTypeProduct();
    } else {
      setSelectTypeProducts(event);
      setShowChipsProducts(true);
    }
  };
  const cleanPagination = () => {
    setFlag(!flag);
    toggleFlag();
  };
  const removeCategory = () => {
    setSelectCategory("");
    cleanPagination();
  };
  const removeBrand = () => {
    setSelectBrand("");
    cleanPagination();
  };

  const removeTypeProduct = () => {
    setSelectTypeProducts("");
    cleanPagination();
  };
  const removeProduct = () => {
    setSearchTerm("");
    setbtClearSearch(false);
    cleanPagination();
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const todosData = useMemo(() => {
    let productsRes = products.results || [];
    if (searchTerm) {
      productsRes = productsRes?.filter(
        todo =>
          todo.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          todo.code?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          todo.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectCategory) {
      productsRes = productsRes.filter(todo => todo.category?.id === selectCategory?.id);
    }
    if (selectTypeProduct) {
      productsRes = productsRes.filter(todo => todo.productstype?.id === selectTypeProduct?.id);
    }
    if (selectBrand) {
      productsRes = productsRes.filter(todo => todo.brand?.id === selectBrand?.id);
    }
    setTotalProducts(productsRes.length);

    return productsRes.slice((page - 1) * todosPerPage, (page - 1) * todosPerPage + todosPerPage);
  }, [products, page, searchTerm, selectCategory, selectTypeProduct, selectBrand]);

  const handlePageCandidate = (event, value) => {
    setPage(value);
    setFlag(!flag);
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

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {searchTerm !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeProduct}
              label={`${"Producto"}: ${searchTerm.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {selectCategory !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeCategory}
              label={`${"Categoría"}: ${selectCategory.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {selectBrand !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeBrand}
              label={`${"Marca"}: ${selectBrand.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {selectTypeProduct !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeTypeProduct}
              label={`${"Tipo producto"}: ${selectTypeProduct.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const tablesHeads = () => {
    return (
      <table className="table">
        <thead className="head">
          <tr className="tr">
            <th className="title ">
              <div className="ctr_title">
                <p>Codigo</p>
              </div>
            </th>
            <th className="title fixed">
              <div className="ctr_title">
                <p>Producto</p>
              </div>
            </th>
            <th className="title">
              <div className="ctr_title">
                <p>Marca</p>
              </div>
            </th>

            <th className="title">
              <div className="ctr_title">
                <p>Precio Unitario</p>
              </div>
            </th>
            <th className="title ">
              <div className="ctr_title"></div>
            </th>
          </tr>
        </thead>
      </table>
    );
  };

  return (
    <DrawerStyled anchor="right" open={show} onClose={closeDrawer}>
      <div className="drawer_container">
        <div className="drawer_container__top">
          <div className="drawer_container__top__title">
            <p>Productos</p>
          </div>
          <div className="drawer_container__top__close">
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </div>
        </div>
        <Grid container spacing={1} className="drawer_container__formsearch">
          <Grid item xs={12} md={9}>
            <div className="ctr_filter">
              <div className="ctr_filter__ctr_input">
                <TextField
                  variant="outlined"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  label={searchTerm !== "" && "Buscar producto"}
                  placeholder="Ingresa Nombre de producto"
                  size="small"
                  className="inputText"
                />
                {btClearSearch == true && (
                  <Tooltip title="Limpiar Busqueda">
                    <Clear
                      className="clear"
                      onClick={() => {
                        removeProduct();
                      }}
                    />
                  </Tooltip>
                )}
                <SearchOutlined className="search" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className="filterNone">
              {/* <div className="filterNone__filters" onClick={() => setShowAll(!showAll)}>
                {showAll ? <FilterList /> : <FilterList />}
                <p className="filterNone__titleFilter"> {showAll ? " Filtros" : "Filtros"}</p>
              </div> */}
              <Box display="flex" alignItems="center" ml={2}>
                <Tooltip title="Recargar productos">
                  <Cached onClick={reloadProducts} style={{ cursor: "pointer" }} />
                </Tooltip>
              </Box>
            </div>
          </Grid>
          {showAll && (
            <>
              <Grid item xs={12} md={2}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Select
                    onMenuOpen={() => getCatalogBy("typeProducts")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={typeProducts.isFetching}
                    isClearable={true}
                    value={selectTypeProduct}
                    onChange={handleTypeProduct}
                    options={typeProducts.results}
                    className="selectAccess"
                    placeholder="Tipo Producto"
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={2}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Select
                    onMenuOpen={() => getCatalogBy("categories")}
                    loadingMessage={() => "Cargando Opciones..."}
                    options={categories.results}
                    isLoading={categories.isFetching}
                    isClearable={true}
                    value={selectCategory}
                    onChange={handleCategory}
                    className="selectAccess"
                    placeholder="Elige Categoria"
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={2}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Select
                    onMenuOpen={() => getCatalogBy("brands")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={brands.isFetching}
                    options={brands.results}
                    isClearable={true}
                    value={selectBrand}
                    onChange={handleBrand}
                    className="selectAccess"
                    placeholder="Elige Marca"
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                  />
                </motion.div>
              </Grid>
            </>
          )}
        </Grid>
        <div className="containerResults">
          <p className="total">
            <Category />
            {`${products?.count || 0} Productos`}
          </p>
          <div className="drawer_container__filters_chip">{Chips()}</div>
        </div>

        {products.isFetching && <p>Cargando productos esto puede demorar un momento.... </p>}

        {products.isFetching == false && totalProducts == 0 && (
          <div className="body_empty">
            <div className="message_ctr">
              {tablesHeads()}
              <img src="/empty_table.svg" />
              <p className="titleNotFound">No hay datos de {searchQuery}</p>
            </div>
          </div>
        )}

        {products.isFetching == false && totalProducts >= 1 && (
          <div className="drawer_container__tableproducts">
            <>
              <table className="table">
                <thead className="head">
                  <tr className="tr">
                    <th className="title fix code">
                      <div className="ctr_title">
                        <p>Codigo</p>
                      </div>
                    </th>
                    <th className="title fixed ">
                      <div className="ctr_title">
                        <p>Producto</p>
                      </div>
                    </th>
                    <th className="title">
                      <div className="ctr_title">
                        <p>Marca</p>
                      </div>
                    </th>
                    <th className="title">
                      <div className="ctr_title">
                        <p>Stock</p>
                      </div>
                    </th>

                    <th className="title">
                      <div className="ctr_title">
                        <p>Precio Unitario</p>
                      </div>
                    </th>
                    <th className="title ">
                      <div className=""></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="body">
                  {todosData.map((item, index) => (
                    <Tooltip title={"Agregar" + " " + item.name.toLocaleLowerCase() + " " + "a cotización"} key={index}>
                      <tr
                        onClick={() => handleSelectProduct(item)}
                        className={index % 2 == 0 ? "row" : "inpar row"}
                        key={index}
                      >
                        <td className="data fixed">
                          <p className="ctr_td">{item.code}</p>
                        </td>
                        <td className="data">
                          <p className="ctr_td" width={"25px"}>
                            {item.name}
                          </p>
                        </td>

                        <td className="data">
                          <p className="text">{item.brand?.name}</p>
                        </td>
                        <td className="data">
                          <p className="text">{item.stock}</p>
                        </td>

                        <td className="data">
                          <p className="text">{formatNumber(item.callamount)}</p>
                        </td>
                        <td className="data">
                          <p className="text"></p>
                        </td>
                      </tr>
                    </Tooltip>
                  ))}
                </tbody>
              </table>
            </>
            {/* {products.isFetching ? (
                <div className="ctr_load">
                  {tablesHeads()}
                  <div className="ctr_load__img">
                    <img src="/load.png" />
                  </div>
                  <div className="ctr_load__load">
                    <p>Cargando Productos</p>
                    <LinearProgress color="primary" />
                  </div>
                </div>
              ) : (

              )} */}
          </div>
        )}

        {/* {products.isFetching && (
          <div className="ctr_load">
            <div className="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div className="ctr_load__load">
              <p>Cargando Productos</p>
              <LinearProgress color="primary" />
            </div>
          </div>
        )} */}
      </div>
      <QuantityModal openDiscount={openDiscount} setOpen={setOpenQuantity} open={openQuantity} setAlert={setAlert} />
    </DrawerStyled>
  );
};
export default DrawerCotizacion;
