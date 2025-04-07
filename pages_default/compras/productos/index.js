import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
  Tooltip,
} from "@material-ui/core";
import {
  Add,
  Cached,
  Category,
  Close,
  ContactMail,
  Delete,
  Edit,
  FilterList,
  SearchOutlined,
} from "@material-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import TableCustom from "../../../components/TableCustom";
import { api } from "../../../services/api";
import { DrawerContainer, ProductosStyled } from "../../../styles/Compras/productos/index";
import DrawerEditProduct from "../../../components/DrawerEditProduct";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { useRouter } from "next/router";
import { handleAlert } from "../../../utils";
import RequestCommon from "../../../services/request_Common";
import { normalizeTableProduct } from "../../../utils/normalizeData";
import { Pagination } from "@material-ui/lab";
import MainLayout from "../../../components/MainLayout";

export default function Products() {
  // * sidebar estado

  const [state, setState] = useState({ severity: null, show: null, message: "", type: null });
  const router = useRouter();
  const commonApi = new RequestCommon();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [productsTable, setProductsTable] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  // * filtros y busqueda
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [categorysFilter, setCategorysFilter] = useState([]);
  const [providersFilter, setProvidersFilter] = useState([]);
  const [typeProductFilter, setTypeProductFilter] = useState([]);
  const [nameProductSearch, setNameProductSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandsSearch] = useState("");
  const [providerSearch, setProviderSearch] = useState("");
  const [typeProductSearch, setTypeProductSearch] = useState("");
  const [isProductImport, setIsProductImport] = useState("");
  const [isActive, setIsActive] = useState("");

  //Editar Producto
  const [productEdit, setproductEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [productsBD, setProductsBD] = useState([]);
  // ELIMINAR
  const [openConfirmDelete, setopenConfirmDelete] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const paginasProducts = Math.ceil(totalProducts / limit);
  const [order, setOrder] = useState({ value: "-createdAt", label: "Fecha de Creación" });
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getProducts();
      setisLoading(true);
      return () => (mounted = false);
    }
  }, [page, flag, limit]);

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
      setTypeProductFilter(typeProducts?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      let query = {};
      if (searchKey !== "") {
        query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
      } else {
        delete query.name;
      }
      if (isProductImport !== "") {
        query.import = isProductImport;
      } else {
        delete query.import;
      }
      if (isActive !== "") {
        query.isactive = isActive;
      } else {
        delete query.isactive;
      }
      if (categorySearch !== "") {
        query.categoryId = categorySearch.id;
      } else {
        delete query.categorySearch;
      }
      if (brandSearch !== "") {
        query.brandId = brandSearch.id;
      } else {
        delete query.brandSearch;
      }
      if (providerSearch !== "") {
        query.providerId = providerSearch.id;
      } else {
        delete query.providerSearch;
      }
      if (typeProductSearch !== "") {
        query.producttypeId = typeProductSearch.id;
      } else {
        delete query.typeProductSearch;
      }
      let include = "category,brand,provider";
      let join = "category,bra,pro";
      let product = await api.get(
        `products?where=${JSON.stringify(
          query
        )}&include=${include}&join=${join}&skip=${page}&count=1&limit=${limit}&order=${order.value}`
      );
      setProductsBD(product.data.results);
      setTotalProducts(product.data.count);
      normalizeProducts(product.data.results);
    } catch (error) {
      console.log(error);
      setisLoading(false);
      console.log(error.response);
    }
  };

  const normalizeProducts = products => {
    let newProduct = normalizeTableProduct(products);
    setProductsTable(newProduct);
    setisLoading(false);
  };

  //Actualizar producto
  const uploadProduct = item => {
    let editProduct = productsBD.filter(i => i.id == item.id);
    setproductEdit(editProduct[0]);
    setOpenEdit(!openEdit);
  };
  //+++++++++++++++++++++++++++++++++++++++++++ eliminar Producto

  const deleteProduct = product => {
    setDataToDelete(product);
    setopenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setopenConfirmDelete(false);
    setDataToDelete("");
  };

  const deleteProducts = async () => {
    api
      .delete(`products/${dataToDelete.id}`)
      .then(res => {
        handleAlert("info", "Producto  - Eliminado!", "basic", setState);
        handleCloseConfirmDelete();
        setFlag(!flag);
      })
      .catch(err => {
        console.log(err);
        handleAlert("error", "Producto - Ocurrió un Problema!", "basic", setState);
      });
  };

  const cleanPagination = () => {
    setFlag(!flag);
    toggleFlag();
  };
  // * paginacion
  const handlePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };
  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };
  //Remover busqueda
  const removeSearches = () => {
    setSearchKey("");
    setNameProductSearch("");
    cleanPagination();
  };
  //Remover Filtro Categoria
  const removeCategory = () => {
    setCategorySearch("");
    cleanPagination();
  };

  const removeProductImport = () => {
    setIsProductImport("");
    cleanPagination();
  };
  const removeProductActive = () => {
    setIsActive("");
    cleanPagination();
  };

  const removeBrand = () => {
    setBrandsSearch("");
    cleanPagination();
  };

  const removeProvider = () => {
    setProviderSearch("");
    cleanPagination();
  };

  const removeTypeProduct = () => {
    setTypeProductSearch("");
    cleanPagination();
  };
  const removeOrder = () => {
    setOrder({ value: "-createdAt" });
    cleanPagination();
  };
  // * open filters
  const handleFilter = () => {
    cleanPagination();
    setShowChipsProducts(!showChipsProducts);
    closeDrawerFilters();
  };

  //chips filtros
  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {typeProductSearch !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeTypeProduct}
              label={`${"Tipo de Producto"}: ${typeProductSearch.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {isProductImport !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeProductImport}
              label={`${"Productos"}: ${isProductImport === "true" ? "Importados" : "No Importados"}`}
              className="chip"
            />
          )}
          {categorySearch !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeCategory}
              label={`${"Categoría"}: ${categorySearch.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {brandSearch !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeBrand}
              label={`${"Marca"}: ${brandSearch.name.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {providerSearch !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeProvider}
              label={`${"Proveedor"}: ${providerSearch.company.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={`${"Producto"}: ${searchKey.toLocaleLowerCase()}`}
              className="chip"
            />
          )}
          {isActive !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeProductActive}
              label={`${"Productos"}: ${isActive === "true" ? "Activos" : "No Activos"}`}
              className="chip"
            />
          )}
          {order.value !== "-createdAt" && (
            <Chip color="primary" size="small" onDelete={removeOrder} label={order.label} className="chip" />
          )}
        </div>
      );
    }
  };
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };

  return (
    <MainLayout>
      <ProductosStyled>
        <Head>
          <title>CRM JOBS - Productos</title>
        </Head>

        <div className="main">
          <div className="ctr_products">
            <div className="head">
              <div className="head__title">
                <h1>Productos</h1>
                <p className="total">
                  <Category />
                  {`${totalProducts} Productos`}
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached className="reload" onClick={() => setFlag(!flag)} />
                  </Tooltip>
                </p>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => router.push("../compras/productos/nuevo")}>
                <Add />
                <p>Agregar Producto</p>
              </Button>
            </div>
            <div className="ctr_filter">
              <div className="ctr_filter__ctr_input">
                <TextField
                  variant="outlined"
                  type="search"
                  value={nameProductSearch}
                  onChange={e => {
                    setNameProductSearch(e.target.value);
                    setSearchKey(e.target.value);
                    if (e.target.value == "") {
                      setFlag(!flag);
                    }
                  }}
                  // onChange={e => setNameProductSearch(e.target.value)}
                  label={nameProductSearch !== "" && "Buscar producto"}
                  placeholder="Ingresa Nombre de producto"
                  size="small"
                  className="inputText"
                  onKeyDown={e => {
                    if (e.key === "Enter" && e.target.value.length > 0) {
                      setSearchKey(e.target.value);
                      setFlag(!flag);
                      setShowChipsProducts(true);
                    }
                  }}
                />
                <SearchOutlined className="search" />
                <Tooltip title="Abrir Filtros">
                  <FilterList
                    className="filters"
                    onClick={() => {
                      setShowChipsProducts(false);
                      setshowFilters(!showFilters);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="filters_chip">{Chips()}</div>
            {isLoading ? (
              <div className="ctr_load">
                <div className="ctr_load__img">
                  <img src="/load.png" />
                </div>
                <div className="ctr_load__load">
                  <p>Cargando</p>
                  <LinearProgress color="primary" />
                </div>
              </div>
            ) : (
              <>
                <TableCustom
                  heads={[
                    "id",
                    "código",
                    "nombre",
                    "Categoría",
                    "Marca",
                    "Proveedor",
                    "Precio unitario",
                    "Precio Tienda",
                    "Precio Call Center",
                    "Importado",
                    "Descripción",
                  ]}
                  data={productsTable}
                  dataBD={productsBD}
                  identificador={"code"}
                  custom={true}
                  selectmultiple={false}
                  primaryColor={"#405189"}
                  secondaryColor={"#dce1f6"}
                  deleteItem={items => deleteItem(items)}
                  keyStorage="productos"
                  actionsPerItem={[
                    {
                      icon: <Edit className="icon_item" />,
                      title: "modificar",
                      action: e => uploadProduct(e),
                    },
                    {
                      icon: <Delete className="icon_item" />,
                      title: "Eliminar",
                      action: e => deleteProduct(e),
                    },
                  ]}
                  actionsItemsSelect={[
                    {
                      icon: <ContactMail className="icon_item" />,
                      title: "enviar correo múltiple",
                      action: () => console.log("correo multiple"),
                    },
                  ]}
                />
                {productsTable.length > 0 && (
                  <div className="ctr_products__tfooter">
                    <div className="ctr_products__tfooter__ctr_button"></div>
                    <div className="ctr_products__tfooter__ctr_pagination">
                      <p className="totalProducts">{`Total de Productos: ${totalProducts} Página: ${page} - ${Math.ceil(
                        totalProducts / limit
                      )}`}</p>
                      <div className="ctr_products__tfooter__ctr_pagination__pagination">
                        <Pagination
                          style={{ display: "flex", justifyContent: "center" }}
                          page={page}
                          defaultPage={1}
                          onChange={handlePage}
                          shape="rounded"
                          count={paginasProducts}
                          color="primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
          <div className="ctr_drawer">
            <div className="ctr_drawer__top">
              <p className="title">Filtra por tu preferencia</p>
              <Close className="close_icon" onClick={closeDrawerFilters} />
            </div>
            <div className="ctr_drawer__ctr_inputs">
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Tipo de Producto</label>
                <select
                  value={typeProductSearch.id}
                  className="input"
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setTypeProductSearch("");
                    } else {
                      let value = typeProductFilter.filter((item, index) => item.id === e.target.value);
                      setTypeProductSearch({ name: value[0].name, id: value[0].id });
                    }
                  }}
                >
                  <option hidden>Seleccione Tipo producto</option>
                  <option value="todos">Todos</option>
                  {typeProductFilter.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name.toLocaleLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Categoría</label>
                <select
                  value={categorySearch.id}
                  className="input"
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setCategorySearch("");
                    } else {
                      let value = categorysFilter.filter((item, index) => item.id === e.target.value);
                      setCategorySearch({ name: value[0].name, id: value[0].id });
                    }
                  }}
                >
                  <option hidden>Seleccione una Categoria</option>
                  <option value="todos">Todos</option>
                  {categorysFilter.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name.toLocaleLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Marca</label>
                <select
                  value={brandSearch.id}
                  className="input"
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setBrandsSearch("");
                    } else {
                      let value = brandsFilter.filter((item, index) => item.id === e.target.value);
                      setBrandsSearch({ name: value[0].name, id: value[0].id });
                    }
                  }}
                >
                  <option hidden>Seleccione una Marca</option>
                  <option value="todos">Todos</option>
                  {brandsFilter.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name.toLocaleLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Proveedor</label>
                <select
                  value={providerSearch.id}
                  className="input"
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setProviderSearch("");
                    } else {
                      let value = providersFilter.filter((item, index) => item.id === e.target.value);
                      setProviderSearch({ company: value[0].companyname, id: value[0].id });
                    }
                  }}
                >
                  <option hidden>Seleccione un Proveedor</option>
                  <option value="todos">Todos</option>
                  {providersFilter.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item?.companyname?.toLocaleLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Importados</label>
                <select
                  className="input"
                  value={isProductImport}
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setIsProductImport("");
                    } else {
                      setIsProductImport(e.target.value);
                    }
                  }}
                >
                  <option hidden>Seleccione una opción</option>
                  <option value="todos">Todos</option>
                  <option value="true">Importados</option>
                  <option value="false">No Importados</option>
                </select>
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Estado del producto</label>
                <select
                  className="input"
                  value={isActive}
                  onChange={e => {
                    if (e.target.value == "todos") {
                      setIsActive("");
                    } else {
                      setIsActive(e.target.value);
                    }
                  }}
                >
                  <option hidden>Seleccione una opción</option>
                  <option value="todos">Todos</option>
                  <option value="true">Activos</option>
                  <option value="false">Inactivos</option>
                </select>
              </div>
              {/* <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Ordenar por Precio</label>
                <option hidden>Seleccione orden Precio</option>
                <select
                  value={order.value}
                  className="input"
                  onChange={(e) => {
                    let order = FiltersOrder.filter((item) => item.value == e.target.value);
                    setOrder({ label: order[0].label, value: order[0].value });
                  }}
                >
                  <option hidden>Selecciona orden por precio</option>
                  {FiltersOrder.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div> */}
            </div>
            <div className="ctr_drawer__ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
                Cancelar
              </Button>

              <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
                Aplicar
              </Button>
            </div>
          </div>
        </DrawerContainer>

        <Dialog
          open={openConfirmDelete}
          onClose={handleCloseConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Estas seguro de esto?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Desea eliminar el Producto: {dataToDelete?.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => deleteProducts()} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        <DrawerEditProduct
          providersFilter={providersFilter}
          brandsFilter={brandsFilter}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          productEdit={productEdit}
          setFlag={() => setFlag(!flag)}
        />
        {state?.show && (
          <AlertGlobal severity={state.severity} message={state.message} show={state.show} type={state.type} />
        )}
      </ProductosStyled>
    </MainLayout>
  );
}
const FiltersOrder = [
  { label: "Precio unitario: Menor a Mayor", value: "amount" },
  { label: "Precio unitario: mayor a Menor", value: "-amount" },
  { label: "Precio Tienda: Menor a Mayor", value: "storeamount" },
  { label: "Precio Tienda: mayor a Menor", value: "-storeamount" },
  { label: "Precio Call Center: Menor a Mayor", value: "callamount" },
  { label: "Precio Call Center: mayor a Menor", value: "-callamount" },
];
