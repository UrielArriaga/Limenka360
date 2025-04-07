import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Cached, Cancel, Close, FilterList, Info, People, SearchOutlined } from "@material-ui/icons";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Switch,
  TextField,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "@material-ui/core/Modal";
import Select from "react-select";
import styled from "styled-components";
import RestoreIcon from "@material-ui/icons/Restore";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import SideBar from "../../../../components/SideBar";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../../../services/api";
import { userSelector } from "../../../../redux/slices/userSlice";
import { normalizeTableDataSales } from "../../../../utils/normalizeData";
import RequestCommon from "../../../../services/request_Common";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import DrawerSales from "../../../../components/DrawerSales";
import TableComponent from "../../../../components/TableDataComponentSales";
import WhatsappV2 from "../../../../components/WhatsappV2";
import AddPending from "../../../../components/ModalAddPendings";
import ModalTracking from "../../../../components/ModalTracking";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { AlertDateManager, AlertDeleteStyle, FiltersManagerSales, OptionExecutive, SalesManagerStyled } from "./style";
import dayjs from "dayjs";
import { colors } from "../../../../styles/global.styles";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import useModal from "../../../../hooks/useModal";
import { createNewTracking } from "../../../../redux/slices/trackingSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { EntitiesLocal } from "../../../../BD/databd";
export default function ManagerSales() {
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const router = useRouter();
  const { open: openAlertDelete, toggleModal: toggleModalAlertDelete, closeModal: closeAlertDelete } = useModal();
  const { phases, origins, clientTypes, categories, clientsCompanies, labels, entities, users, products } =
    useSelector(commonSelector);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const { id_user, groupId, userData } = useSelector(userSelector);
  const [sales, setSales] = useState([]);
  const [prospectId, setProspectId] = useState("");
  const [oportunityId, setOportunityId] = useState("");
  const commonApi = new RequestCommon();
  const limit = 20;
  //FILTROS

  //Datos de la venta para eliminar
  const [dataSaleSelected, setDataSaleSelected] = useState({});
  //

  const [filters, setFilters] = useState([]);
  const [showDrawer, setshowDrawer] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [cities, setCities] = useState([]);
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [showDatesRange, setShowDatesRange] = useState(false);
  const [isRangeOk, setIsRangeOk] = useState(false);
  const [discartReasons, setdiscartReasons] = useState([]);
  const [wayOrder, setWayOrder] = useState({});
  const [salesDelete, setSalesDelete] = useState();
  const [openModal, setOpenModal] = useState({ activate: false, type: "" });
  const [isShowSalesDiscarted, setIsShowSalesDiscarted] = useState(false);
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  const totalPages = Math.ceil(totalProspects / limit);
  //Filtros de la tarjeta de pagos para mandar al DrawerSales
  const [prospectTrackings, setProspectTrackings] = useState({});
  const [prospectSelected, setProspectSelected] = useState({});
  const [prospectPending, setProspectPending] = useState({});
  const [switchPayments, setSwitchPayments] = useState(false);
  const [switchExpiredPayments, setSwitchExpiredPayments] = useState(false);
  const [switchFilters, setswitchFilters] = useState(false);
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const [showAddPending, setShowAddPending] = useState(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const handleCloseAddPending = () => setShowAddPending(false);
  //fechas
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChips(!showChips);
  };
  const heads = [
    "id",
    "nombre",
    "correo",
    "concepto",
    "monto total",
    "comisión total",
    "certeza",
    "télefono",
    "género",
    "puesto",
    "categoría de interés",
    "origen",
    "empresa",
    "fase",
    "ultimo seguimiento",
    "fecha de cierre",
    "fecha de venta",
  ];
  const headsDiscarted = ["id", "nombre", "correo", "concepto", "motivo de descarte", "fecha de descarte"];

  const headsHidden = ["correo", "género", "puesto", "origen", "certeza", "empresa", "fecha de cierre"];
  const [cat, setCat] = useState([]);
  const [o, setO] = useState([]);
  const { ejeid, ejena, entid, entna, catid, catna, proid, proco, proId, proCo } = router.query;
  // Filtrar por producto
  const [filterProduct, setFilterProduct] = useState({ show: false, label: null, value: null, prodId: null });
  const handleSelectProduct = product =>
    setFilterProduct({ ...filterProduct, show: true, label: "Producto: ", value: product.code, prodId: product.id });

  const [filterCategory, setFilterCategory] = useState({ show: false, label: null, value: null, categoryId: null });
  const handleSelectCategory = cate =>
    setFilterCategory({
      ...filterCategory,
      show: true,
      label: "Categoria: ",
      value: cate.name,
      categoryId: cate.id,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunitiesSales();
      setisLoading(true);
      getDiscartReasons();
      return () => (mounted = false);
    }
  }, [id_user, page, flag, isReadyLocalStorage]);

  useEffect(() => {
    validateFilterDiscarted();
  }, [filters]);

  useEffect(() => {
    if (router.query) {
      const ejecutivoCompleto = ejeid !== undefined && ejena !== undefined;
      const crearObjetoEjecutivo = () => {
        return ejecutivoCompleto
          ? { id: "ejecutiveId", label: ejena, nameFilter: "Ejecutivo", typeQuery: "prospect", value: ejeid }
          : null;
      };
      const ejecutivoObj = crearObjetoEjecutivo();
      //entidad
      const entidadCompleto = entid !== undefined && entna !== undefined;
      const crearObjetoEntidad = () => {
        return entidadCompleto
          ? { id: "entityId", label: entna, nameFilter: "Estado", typeQuery: "prospect", value: entid }
          : null;
      };
      const entidadObj = crearObjetoEntidad();
      // Filtra los objetos que no son vacíos
      const objetosFiltrados = [ejecutivoObj, entidadObj].filter(obj => obj !== null && Object.keys(obj).length > 0);
      // Actualiza el arreglo de objetos solo si ambas variables de ejecutivo están presentes
      if (ejecutivoCompleto || entidadCompleto) {
        setFilters(objetosFiltrados);
      }
      if (catid !== undefined) {
        setFilterCategory({
          ...filterCategory,
          show: true,
          label: "Categoria: ",
          value: catna,
          categoryId: catid,
        });
      }
      if (proId !== undefined) {
        setFilterProduct({
          ...filterProduct,
          show: true,
          label: "Producto: ",
          value: proCo,
          prodId: proId,
        });
      }
    }
  }, [router.query]);

  const customFilterCategorys = keysearch => {
    let allcategories = categories?.results;
    let categoriesSearch = [];
    if (keysearch) {
      categoriesSearch = allcategories.filter(
        item =>
          item.name.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.id.toLowerCase().includes(keysearch.toLowerCase())
      );
    }
    let limitProducts = categoriesSearch.slice(0, 10);
    setCat(limitProducts);
  };
  const customFilter = keysearch => {
    let allproducts = products.results;
    let productSearch = [];
    if (keysearch) {
      productSearch = allproducts.filter(
        item =>
          item.name.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.code.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.category?.name.toLowerCase().includes(keysearch.toLowerCase())
      );
    }
    let limitProducts = productSearch.slice(0, 10);
    setO(limitProducts);
  };

  const validateFilterDiscarted = () => {
    let searchDiscardFilter = filters.filter(item => item.id === "discarted");
    if (searchDiscardFilter.length > 0) {
      setIsShowSalesDiscarted(true);
    } else {
      setIsShowSalesDiscarted(false);
    }
  };

  useEffect(() => {
    if (dateStart && dateFinish) {
      if (dateFinish >= dateStart) {
        let valueRange = [dayjs(dateStart).format(), dayjs(dateFinish).endOf("day").format()];
        handleFilterSelect(valueRange, `Rango (${dateStart}  al  ${dateFinish})`, "Fecha", "soldat", null);
        setIsRangeOk(true);
      } else {
        setIsRangeOk(false);
      }
    } else {
      setIsRangeOk(false);
    }
  }, [dateStart, dateFinish]);

  // * obtiene las ciudades / municipios dependiendo el estado

  const getLocalStorage = () => {
    let filtersExecutive = localStorage.getItem("s_FiltersManager");
    if (filtersExecutive) {
      setFilters(JSON.parse(filtersExecutive));
    } else {
      let optionDefault = {
        id: "soldat",
        label: "Mes",
        nameFilter: "Fecha",
        typeQuery: null,
        value: [dayjs().startOf("month").format(), dayjs().endOf("month").format()],
      };
      setFilters([optionDefault]);
    }
    let orderby = localStorage.getItem("s_orderManager");
    if (orderby) {
      setOrderBy(JSON.parse(orderby));
    }
    let asc = localStorage.getItem("s_ascManager");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    let filterProduct = localStorage.getItem("sale_FilterProductManager");
    if (filterProduct) setFilterProduct(JSON.parse(filterProduct));
    let filterCategory = localStorage.getItem("sale_FilterCategoryManager");
    if (filterCategory) setFilterCategory(JSON.parse(filterCategory));
    setIsReadyLocalStorage(true);
  };

  const getCities = async id => {
    try {
      let query = {};
      query.entityId = id;
      let response = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1014`);
      setCities(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterSelect = (value, label, nameFilter, identifier, typeQuery) => {
    let newArrayFilters = [...filters];
    let bodyOption = {
      id: identifier,
      nameFilter: nameFilter,
      label: label,
      value: value,
      typeQuery: typeQuery,
    };
    let searchFilter = newArrayFilters.findIndex((item, index) => item?.id === bodyOption?.id);
    if (Math.sign(searchFilter) >= 0) {
      newArrayFilters[searchFilter] = bodyOption;
    } else {
      newArrayFilters.push(bodyOption);
    }
    //Funciones extras
    if (identifier === "entityId") getCities(value);
    //
    setFilters(newArrayFilters);
  };

  const handleFilterDate = optionDate => {
    if (optionDate.label === "Rango") {
      setShowDatesRange(true);
    } else {
      setShowDatesRange(false);
      handleFilterSelect(optionDate.value, optionDate.label, "Fecha", "soldat", null);
    }
  };
  const validateFilters = filters => {
    let query = {
      discarted: false,
      iscloseout: true,
      // prospect: {
      //   ejecutive: {
      //     groupId: groupId,
      //   },
      // },
    };

    if (filterCategory.show === true && filterProduct.show === true) {
      query.product = {
        id: filterProduct.prodId,
        categoryId: filterCategory.categoryId,
      };
    }
    if (filterCategory.show === false && filterProduct.show === true) {
      query.product = {
        id: filterProduct.prodId,
      };
    }
    if (filterCategory.show === true && filterProduct.show === false) {
      query.product = {
        categoryId: filterCategory.categoryId,
      };
    }
    for (let i = 0; i < filters.length; i++) {
      if (!query[filters[i].typeQuery] && filters[i].typeQuery) {
        query = {
          ...query,
          [filters[i].typeQuery]: {},
        };
      }
      if (filters[i].typeQuery) {
        if (filters[i].id === "keySearch") {
          let searchValue = filters[i].value;
          if (searchValue.includes("@")) {
            query[filters[i]?.typeQuery].email = { iRegexp: `${searchValue.trim().toLocaleLowerCase()}` };
          } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(searchValue.trim())) {
            query[filters[i]?.typeQuery].phone = { iRegexp: `${searchValue.trim()}` };
          } else {
            query[filters[i]?.typeQuery].fullname = { iRegexp: `${searchValue.trim()}` };
          }
        } else {
          query[filters[i]?.typeQuery][filters[i]?.id] = filters[i]?.value;
        }
      } else {
        if (filters[i].id === "soldat") {
          if (filters[i].label === "Rango") {
            if (isRangeOk) query[filters[i]?.id] = { between: filters[i]?.value };
          } else {
            query[filters[i]?.id] = { between: filters[i]?.value };
          }
        } else {
          query[filters[i]?.id] = filters[i]?.value;
        }
      }
    }
    return JSON.stringify(query);
  };
  const validateOrder = () => {
    if (
      orderBy === "createdAt" ||
      orderBy === "updatedAt" ||
      orderBy === "estimatedclossing" ||
      orderBy === "lastTrackingcreatedAt" ||
      orderBy === "amount" ||
      orderBy === "concept" ||
      orderBy === "certainty"
    ) {
      let todays = `${ASC ? "" : "-"}${orderBy}`;
      let today = todays;
      return today;
    } else if (orderBy === "createdAtProspect") {
      let todaycreatedAtProspect = `prospect.${ASC ? "" : "-"}createdAt`;
      return todaycreatedAtProspect;
    } else {
      let todayUpdatedAt = `prospect.${ASC ? "" : "-"}updatedAt`;
      return todayUpdatedAt;
    }
  };
  const getOportunitiesSales = async () => {
    if (isReadyLocalStorage === false) return;
    try {
      let namePoint =
        filterProduct?.show || filterCategory?.show ? "oportunities/filterproducts/oportunities" : "oportunities";
      let params = {
        include: "phase,prospect,prospect.origin,prospect.category,prospect.clientcompany",
        where: validateFilters(filters),
        limit: limit,
        count: 1,
        join: "ph,prospect,prospect.origin,prospect.category,prospect.clientcompany",
        order: validateOrder(),
        skip: page,
        // showlabel: "1",
      };
      // let response = await api.get(`oportunities`, { params });
      let response = await api.get(`${namePoint}`, { params });
      let results = response?.data.results;
      let normalizeData = results.map(item => normalizeTableDataSales(item));
      saveInLocalStorage(filters, "s_FiltersManager");
      saveInLocalStorage(ASC, "s_ascManager");
      saveInLocalStorage(orderBy, "s_orderManager");
      saveInLocalStorage(filterProduct, "sale_FilterProductManager");
      saveInLocalStorage(filterCategory, "sale_FilterCategoryManager");
      setTotalProspects(response.data.count);
      setSales(normalizeData);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  const Chips = filters => {
    if (showChips) {
      return (
        <div>
          {filters.map((item, index) => (
            <Chip
              key={index}
              color="primary"
              size="small"
              onDelete={() => deleteFilter(item)}
              label={`${item.nameFilter} : ${item.label}`}
              className="chip"
            />
          ))}
          {filterProduct?.show && (
            <Tooltip title={("", filterProduct?.value)} arrow={true}>
              <Chip
                color="primary"
                size="small"
                onDelete={() => {
                  setFilterProduct({ ...filterProduct, show: false });
                  setFlag(!flag);
                  if (proId) {
                    let queries = router.query;
                    delete queries.proId;
                    delete queries.proCo;
                    router.replace({ query: queries });
                  }
                }}
                label={`Producto : ${
                  filterProduct?.value.length > 10 ? filterProduct?.value.slice(0, 10) + "..." : filterProduct?.value
                }`}
                className="chip"
              />
            </Tooltip>
          )}

          {filterCategory?.show && (
            <Tooltip title={("", filterCategory?.value)} arrow={true}>
              <Chip
                color="primary"
                size="small"
                onDelete={() => {
                  setFilterCategory({ ...filterCategory, show: false });
                  setFlag(!flag);
                  if (catid) {
                    let queries = router.query;
                    delete queries.catid;
                    delete queries.catna;
                    router.replace({ query: queries });
                  }
                }}
                label={`Categoria producto Cotizado : ${
                  filterCategory?.value.length > 10 ? filterCategory?.value.slice(0, 10) + "..." : filterCategory?.value
                }`}
                className="chip"
              />
            </Tooltip>
          )}
        </div>
      );
    }
  };
  const deleteFilter = filter => {
    let newFilters = filters.filter(item => item.id !== filter.id);
    //Acciones Extras
    if (filter.id === "soldat") {
      setDateStart("");
      setDateFinish("");
      setShowDatesRange(false);
    }

    if (filter?.id === "entityId" && entid !== undefined) {
      let queries = router.query;
      delete queries.entid;
      delete queries.entna;
      router.replace({ query: queries });
    }
    if (filter?.id === "ejecutiveId" && ejeid !== undefined) {
      let queries = router.query;
      delete queries.ejeid;
      delete queries.ejena;
      router.replace({ query: queries });
    }
    setFilters(newFilters);
    setPaginations();
  };
  //drawer por prospecto
  const handleClickClient = (itemClient, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      setSwitchExpiredPayments(false);
      setSwitchPayments(false);
      setswitchFilters(false);
      setProspectId(itemClient.prospectId);
      setOportunityId(itemClient.id);
      setshowDrawer(true);
      // 27/10/2022 se agrego orden de pendientes
      setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
      setRefetchPendings(!refetchPendings);
      setFlagTrackings(!flagTrackings);
      //------------------------///
    } else {
      router.push({
        pathname: "ventas/[prospecto]",
        query: { prospecto: itemClient.prospectId, o: itemClient.id },
      });
    }
  };
  // * open filters
  const handleFilter = () => {
    if (page > 1) {
      setPage(1);
    } else {
      setFlag(!flag);
    }
    setShowChips(!showChips);
    closeDrawerFilters();
  };
  // * paginacion
  const setPaginations = () => {
    if (page > 1) {
      setPage(1);
    } else {
      setFlag(!flag);
    }
  };
  const handlePage = (event, value) => setPage(value);
  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const getDiscartReasons = async () => {
    try {
      let reasons = await commonApi.getReasons();
      setdiscartReasons(reasons.data.results);
    } catch (error) {}
  };
  const deleteSale = async formData => {
    let update = {};
    let reason = discartReasons.filter(item => item.id == formData.descarted);
    update.status = 0;
    update.discartedbyId = id_user;
    update.oporeasonId = formData.descarted;
    update.opodiscartedreason = reason[0].reason;
    try {
      await api.put(`oportunities/discardoportunity/${salesDelete.id}`, update);
      handleAlert("success", "Venta - Descartada!", "basic");
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se descarto la venta!", "basic");
    }
    closeModal();
  };
  // * descarta una venta
  const ConfirmDelete = sales => {
    setSalesDelete(sales);
    setOpenModal({ ...openModal, activate: true });
  };
  const closeModal = () => {
    setSalesDelete("");
    setOpenModal({ ...openModal, activate: false, type: "" });
    setFlag(!flag);
  };
  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(true);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
  };

  const handleMakeOrder = item => {
    if (item.isorder) {
      let params = {
        where: JSON.stringify({
          oportunityId: item.id,
        }),
        keys: "id",
      };
      api
        .get(`orders`, { params })
        .then(res => {
          let idOrder = res.data.results[0].id;
          router.push({
            pathname: "pedidos/pedido",
            query: {
              pe: idOrder,
              pr: item?.prospectId,
            },
          });
        })
        .catch(err => console.log(err));
    } else {
      router.push({
        pathname: "pedidos/nuevo",
        query: { o: item.id, p: item.prospectId },
      });
      dispatch(setArrayProducts([]));
    }
  };

  const handleSearchKey = (valueKey, isSearch) => {
    setSearchKey(valueKey);
    if (isSearch) {
      handleFilterSelect(valueKey, valueKey, "Resultados de la Busqueda", "keySearch", "prospect");
      setPaginations();
    }
  };
  const validateValueFilterOption = (idFilter, idOption, nameOption, valueFilter, nameFilter) => {
    let formatOption = {};
    let searchValue = filters.filter(item => item.id === idFilter);
    if (searchValue.length > 0) {
      (formatOption[idOption] = searchValue[0][valueFilter]), (formatOption[nameOption] = searchValue[0][nameFilter]);
      return formatOption;
    }
    return "";
  };

  const formatOptionLabel = ({ name, code }) => (
    <ProductStyle>
      {/* {console.log("name", name)} */}
      <div className="product">
        <p className="title">{name}</p>
        <p className="subtitle">
          código: <span className="code">{code}</span>
        </p>
      </div>
    </ProductStyle>
  );
  const formatOptionLabelCategory = ({ name, code, category }) => (
    <CategoryStyle>
      <div className="product">
        <p className="title">{name}</p>
      </div>
    </CategoryStyle>
  );

  const customFilterSelect = (option, searchText) => {
    if (searchText) {
      if (
        option.data.name.toLowerCase().includes(searchText.toLowerCase()) ||
        option.data.code.toLowerCase().includes(searchText.toLowerCase()) ||
        option.data.category.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const customFilterSelectCategory = (option, searchText) => {
    if (searchText) {
      if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }
  };
  const body = (
    <ContainerModal>
      <p className="title">¿Estas seguro de esto?</p>
      <p>Se descartara la venta de tus registros</p>
      <p className="text_input">Razon: </p>
      <select name="descarted" className="descarted_input" {...register("descarted", { required: true })}>
        <option value="" hidden="">
          Seleccione una opción
        </option>
        {discartReasons.map((item, index) => (
          <option key={index} value={item.id}>
            {item.reason}
          </option>
        ))}
      </select>
      <div className="buttons">
        <Button color="primary" onClick={() => closeModal()}>
          Cancelar
        </Button>
        <Button color="primary" onClick={handleSubmit(deleteSale)}>
          Aceptar
        </Button>
      </div>
    </ContainerModal>
  );
  // * menu por defecto de la tabla
  const tableMenu = [
    {
      icon: <Cancel className="icon_item" />,
      title: "Descartar",
      action: e => ConfirmDelete(e),
    },
  ];

  const saveInLocalStorage = (value, keyStorage) => localStorage.setItem(keyStorage, JSON.stringify(value));

  // RESTABLECER VENTA

  // * restablece una oportunidad boton
  const confirmRestore = sales => {
    setSalesDelete(sales);
    setOpenModal({ ...openModal, activate: true, type: "restore" });
  };

  // * menu de la tabla para restablecer venta
  const tableMenuRestore = [
    {
      icon: <RestoreIcon className="icon_item" />,
      title: "Restablecer",
      action: e => confirmRestore(e),
    },
  ];

  // * restablecer oportunidad contenido del modal
  const modalRestore = (
    <ContainerModal>
      <p className="title">¿Estas seguro de esto?</p>
      <p>Se restablecera la venta de tus registros</p>
      <div className="buttons-restore">
        <Button color="primary" onClick={() => closeModal()}>
          Cancelar
        </Button>
        <Button color="primary" onClick={() => restoreSale()}>
          Aceptar
        </Button>
      </div>
    </ContainerModal>
  );

  // * funcion para restablecer oportunidad
  const restoreSale = async () => {
    try {
      await api.put(`/oportunities/resetoportunity/${salesDelete.id}`);
      handleAlert("success", "Oportunidad - Restaurada!", "basic");
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se restauro la oportunidad!", "basic");
    }
    closeModal();
  };
  const handleClickOpenWhatsApp = item => {
    item.itemBD.idOportunity = item.id;
    setProspectSelected(item.itemBD);
    setOpenWhatsApp(true);
  };

  const FormatOptionsGroup = data => {
    return (
      <OptionExecutive>
        <p className="title">
          Nombre: <span className="data">{data.fullname}</span>
        </p>
        <p className="title">
          Correo: <span className="data">{data.email}</span>
        </p>
      </OptionExecutive>
    );
  };

  const searchExecutive = (id, optionsFilter, filtersSearch) => {
    let searchFilter = filtersSearch.filter(item => item.id === id);
    if (searchFilter.length > 0) {
      let searchValue = optionsFilter.filter(item => item.id === searchFilter[0].value);
      return searchValue[0];
    }
    return "";
  };

  //Abre la alerta de eliminar la venta, y guarda los datos de la venta
  const handleAlertDeleteSale = item => {
    setDataSaleSelected(item);
    toggleModalAlertDelete();
  };
  //_______________________________________________

  // Funcion para Eliminar la Venta por Completo
  const deleteDataSale = async () => {
    try {
      let response = await api.put(`oportunities/resetsaletooportunity/${dataSaleSelected.id}`);
      createTracking(dataSaleSelected.id, dataSaleSelected.prospectId, dataSaleSelected.saleData);
      handleGlobalAlert("success", "Ventas - Venta Eliminada Correctamente!", "basic", dispatch, 6000);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("warning", "Error al Eliminar la Venta", "basic", dispatch, 6000);
    }
    setDataSaleSelected({});
    toggleModalAlertDelete();
  };
  //************************************************ */

  //Se crea seguimiento al eliminar la venta

  const createTracking = (idOpor, idProsp, sale) => {
    try {
      let bodyNewTracking = {
        prospectId: idProsp,
        status: "2",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: idOpor,
        reason: `Seguimiento Automatico`,
        observations: `Se elimina Venta: Concepto ${sale.concept}, Monto Total ${formatNumber(
          sale.amount
        )}, Comision ${formatNumber(sale.comission)}, No. Pagos ${sale.payments}, No. Productos ${
          sale.quantity
        }, eliminada por ${userData.name} ${userData.lastname}`,
        createdbyId: userData.id,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      dispatch(
        createNewTracking({
          data: bodyNewTracking,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ***********************************

  return (
    <SalesManagerStyled>
      <Head>
        <title>CRM JOBS - Ventas</title>
      </Head>
      {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
      <div className="main">
        <div className="ctr_clients">
          <div className="head">
            <div className="head__title">
              <h1>Ventas</h1>
              <p className="total">
                <People />
                {totalProspects} Registros
                <Cached className="reloadIcon" onClick={() => setFlag(!flag)} />
              </p>
            </div>
          </div>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={searchKey}
                onChange={e => handleSearchKey(e.target.value, false)}
                placeholder="Ingresa Nombre o Correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSearchKey(e.target.value, true);
                  }
                }}
              />
              <SearchOutlined className="search" />
              <div
                className="ctr_filters"
                onClick={() => {
                  setShowChips(false);
                  setshowFilters(!showFilters);
                }}
              >
                <FilterList className="filters" />
                <p className="text">Filtros</p>
              </div>
            </div>
          </div>
          <div className="filters_chip">{Chips(filters)}</div>
          {isLoading && (
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          )}
          {!isLoading && (
            <>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
                  <Box>
                    <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
                    <select
                      className="order-select"
                      onChange={e => {
                        setOrderBy(e.target.value);
                        setFlag(!flag);
                      }}
                      value={orderBy}
                      name=""
                      id=""
                      style={{ marginRight: 5 }}
                    >
                      {optionsOrderhBy.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Box>

                  <Grid item>
                    <p style={{ fontSize: 11 }}>Ascendente</p>
                  </Grid>
                  <Grid item>
                    <PurpleSwitch
                      checked={ASC}
                      onChange={e => {
                        setASC(e.target.checked);
                        setFlag(!flag);
                      }}
                      name="checkedC"
                    />
                  </Grid>
                  <Grid item>
                    <p style={{ fontSize: 11 }}>Descendente</p>
                  </Grid>
                </Grid>
              </Box>
              <TableComponent
                data={sales}
                id="nombre"
                discartedTable={isShowSalesDiscarted}
                heads={isShowSalesDiscarted ? headsDiscarted : heads}
                headsHidden={headsHidden}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                handleClickName={(item, e) => handleClickClient(item, e)}
                handleClickDiscardSales={ConfirmDelete}
                handleClickAddTracking={handleClickAddTracking}
                handleMakeOrder={handleMakeOrder}
                handleClickRestore={confirmRestore}
                handleClickAddPending={handleClickAddPending}
                handleClickOpenWhatsApp={handleClickOpenWhatsApp}
                handleDeleteSale={handleAlertDeleteSale}
              />
              <div className="ctr_clients__tfooter">
                <div className="ctr_clients__tfooter__ctr_button"></div>
                <div className="ctr_clients__tfooter__ctr_pagination">
                  <p className="">{`Total de Ventas: ${totalProspects} Página: ${page} - ${Math.ceil(
                    totalProspects / limit
                  )}`}</p>
                  <div className="ctr_clients__tfooter__ctr_pagination__pagination">
                    <Pagination
                      style={{ display: "flex", justifyContent: "center" }}
                      page={page}
                      defaultPage={1}
                      onChange={handlePage}
                      shape="rounded"
                      count={totalPages}
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <DrawerSales
        // 27/10/2022 se agrego orden de pendientes
        orderPendings={orderPendings}
        setOrderPendigs={setOrderPendigs}
        /////////----------////
        isOportunity={true}
        width={"60%"}
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        prospectId={prospectId}
        oportunityId={oportunityId}
        switchPayments={switchPayments}
        setSwitchPayments={setSwitchPayments}
        switchExpiredPayments={switchExpiredPayments}
        setSwitchExpiredPayments={setSwitchExpiredPayments}
        switchFilters={switchFilters}
        setswitchFilters={setswitchFilters}
        refetch={refetchPendings}
        setRefetch={setRefetchPendings}
        flag={flagTrackings}
        setFlag={setFlagTrackings}
      />
      <AddPending
        oportunity={true}
        isCloseOut={true}
        prospect={prospectPending}
        open={showAddPending}
        close={handleCloseAddPending}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
      />
      <ModalTracking
        isCloseOut={true}
        prospect={prospectTrackings}
        open={showAddTrackings}
        close={handleCloseAddTrackigns}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={flag}
        setFlag={setFlag}
        prospectEdit={prospectTrackings}
      />
      <WhatsappV2
        isSale={true}
        prospect={prospectSelected}
        idOportunity={prospectSelected.idOportunity}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
      />

      <FiltersManagerSales anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={closeDrawerFilters} />
          </div>
          {!showDatesRange ? (
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fecha</label>
              <Select
                isSearchable={false}
                isClearable={false}
                placeholder="Selecciona un Periodo"
                onChange={e => handleFilterDate(e)}
                value={validateValueFilterOption("soldat", "value", "label", "value", "label")}
                options={FiltersOrder}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>
          ) : (
            <div className="ctr_drawer__ctr_inputs__input">
              <div className="button_range">
                <Tooltip
                  title="Cerrar Rangos"
                  arrow={true}
                  onClick={() => {
                    setDateStart("");
                    setDateFinish("");
                    setShowDatesRange(false);
                  }}
                >
                  <IconButton className="bt_close">
                    <Close />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="ranges">
                <div className="dateOne">
                  <label className="label">Fecha Inicio</label>
                  <input
                    className="input"
                    type="date"
                    value={dateStart}
                    onChange={e => {
                      setDateStart(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="dateTwo">
                  <label className="label">Fecha Termino </label>
                  <input
                    className="input"
                    type="date"
                    value={dateFinish}
                    onChange={e => {
                      setDateFinish(e.target.value);
                    }}
                  ></input>
                  {dateFinish !== "" && dateFinish < dateStart && (
                    <AlertDateManager>
                      <p className="alert_title">La fecha Final del Rango no puede ser Menor a la Inicial</p>
                    </AlertDateManager>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Zona geografica</label>
              <Select
                className="selectAccess"
                isClearable={false}
                options={EntitiesLocal}
                onChange={e => handleFilterSelect(e.id, e.name, "Estado", "entityId", "prospect")}
                value={validateValueFilterOption("entityId", "id", "name", "value", "label")}
                placeholder="Selecciona un Estado"
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Ciudad</label>
              <Select
                isClearable={false}
                onChange={e => handleFilterSelect(e.id, e.name, "Ciudad", "cityId", "prospect")}
                value={validateValueFilterOption("cityId", "id", "name", "value", "label")}
                options={cities}
                className="selectAccess"
                placeholder="Selecciona una Ciudad"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                noOptionsMessage={() => "Primero seleccione un Estado"}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Por Ejecutivo</label>
              <Select
                placeholder="Seleccione un Ejecutivo"
                onChange={e => handleFilterSelect(e.id, e.fullname, "Ejecutivo", "ejecutiveId", "prospect")}
                onMenuOpen={() => getCatalogBy("executives")}
                options={users.results}
                isLoading={users.isFetching}
                loadingMessage={() => "Cargando Opciones..."}
                isClearable={false}
                formatOptionLabel={FormatOptionsGroup}
                value={searchExecutive("ejecutiveId", users.results, filters)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.fullname} `)}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categorias de Interes</label>
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleFilterSelect(e.id, e.name, "Categoria Interes", "categoryId", "prospect")}
                onMenuOpen={() => getCatalogBy("categories")}
                loadingMessage={() => "Cargando Opciones..."}
                options={categories.results}
                isLoading={categories.isFetching}
                isClearable={false}
                value={validateValueFilterOption("categoryId", "id", "name", "value", "label")}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Origen</label>
              <Select
                isClearable={false}
                value={validateValueFilterOption("originId", "id", "name", "value", "label")}
                onChange={e => handleFilterSelect(e.id, e.name, "Origen", "originId", "prospect")}
                onMenuOpen={() => getCatalogBy("origins")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={origins.isFetching}
                className="selectAccess"
                options={origins.results}
                placeholder="Selecciona un origen"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fase</label>
              <Select
                isClearable={false}
                value={validateValueFilterOption("phaseId", "id", "name", "value", "label")}
                onChange={e => handleFilterSelect(e.id, e.name, "Fase", "phaseId", null)}
                options={phases.results}
                onMenuOpen={() => getCatalogBy("phases")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={phases.isFetching}
                className="selectAccess"
                placeholder="Selecciona una Fase"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de Cliente</label>
              <Select
                isClearable={false}
                onMenuOpen={() => getCatalogBy("clientTypes")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientTypes.isFetching}
                onChange={e => handleFilterSelect(e.id, e.name, "Tipo de Cliente", "clientCompanyId", "prospect")}
                value={validateValueFilterOption("clientCompanyId", "id", "name", "value", "label")}
                options={clientTypes.results}
                className="selectAccess"
                placeholder="Selecciona tipo de Cliente"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Certeza</label>
              <Select
                isSearchable={true}
                isClearable={false}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
                placeholder="Selecciona Certeza"
                options={FiltersCertainty}
                value={validateValueFilterOption("certainty", "value", "label", "value", "label")}
                onChange={e => handleFilterSelect(e.value, e.label, "Certeza", "certainty", null)}
              />
            </div>

            <Grid item md={12} className="ctr_drawer__ctr_inputs__input">
              <p className="label">Productos de Interés</p>
              <Select
                placeholder="Buscar Nombre del Producto..."
                options={o}
                isClearable={false}
                noOptionsMessage={() => "Ingrese el Nombre"}
                onInputChange={customFilter}
                formatOptionLabel={formatOptionLabel}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                onChange={handleSelectProduct}
                filterOption={customFilterSelect}
                className="selectAccess"
              />
            </Grid>
            <Grid item md={12} className="ctr_drawer__ctr_inputs__input">
              <p className="label">Categoria de Producto Cotizado</p>
              <Select
                onMenuOpen={() => getCatalogBy("categories")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={categories.isFetching}
                placeholder="Buscar Nombre de categoria de Producto..."
                options={cat}
                isClearable={false}
                noOptionsMessage={() => "Ingrese el Nombre"}
                onInputChange={customFilterCategorys}
                formatOptionLabel={formatOptionLabelCategory}
                getOptionLabel={option => {
                  option.name;
                }}
                getOptionValue={option => option.id}
                onChange={handleSelectCategory}
                filterOption={customFilterSelectCategory}
              />
            </Grid>
            {/* <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Descartadas</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={false}
                options={filterDescarted}
                value={validateValueFilterOption("discarted", "value", "label", "value", "label")}
                onChange={e => handleFilterSelect(e.value, e.label, "Descartadas", "discarted", null)}
              />
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
      </FiltersManagerSales>
      <Modal
        open={openModal.activate}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {openModal.type == "restore" ? modalRestore : body}
      </Modal>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
      <AlertDeleteSale open={openAlertDelete} close={closeAlertDelete} handleDelete={deleteDataSale} />
    </SalesManagerStyled>
  );
}

function AlertDeleteSale({ open, close, handleDelete }) {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!open) {
      setLoader(false);
      setValue("reason", "");
    }
  }, [open]);

  useEffect(() => {
    let reasonMessagge = watch("reason");
    setValue("reason", reasonMessagge?.trimStart());
  }, [watch("reason")]);

  const acceptDelete = ({ reason }) => {
    setLoader(true);
    handleDelete(reason);
  };

  return (
    <AlertDeleteStyle open={open} onClose={close}>
      <div className="container_delete">
        <form onSubmit={handleSubmit(acceptDelete)}>
          <div className="message">
            <Info />
            <div className="message__content">
              <p className="title_message">¿Estas Seguro que quieres Eliminar?</p>
              <p className="text_message">
                Al eliminar la venta, se eliminara <b>todo</b> registro de la misma y no podra ser recuperada.
              </p>
              <TextField
                error={errors.reason && true}
                className="reason_delete"
                variant="outlined"
                multiline={true}
                label="Razón de Eliminación"
                maxRows={10}
                required={true}
                size="small"
                disabled={loader}
                {...register("reason", { minLength: 15, required: true })}
              />
            </div>
          </div>
          <div className="buttons">
            {loader ? (
              <CircularProgress className="progress" size={35} />
            ) : (
              <>
                <Button className="bt delete" type="submit">
                  Eliminar
                </Button>
                <Button className="bt cancel" onClick={close}>
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </AlertDeleteStyle>
  );
}

const FiltersOrder = [
  { label: "Hoy", value: [dayjs().startOf("day").format(), dayjs().endOf("day").format()] },
  { label: "Semana", value: [dayjs().startOf("week").format(), dayjs().endOf("week").format()] },
  { label: "Mes", value: [dayjs().startOf("month").format(), dayjs().endOf("month").format()] },
  { label: "Rango", value: [] },
];
const filterDescarted = [{ label: "Mostrar", value: true }];
const FiltersCertainty = [
  { label: "10%", value: "10" },
  { label: "20%", value: "20" },
  { label: "30%", value: "30" },
  { label: "40%", value: "40" },
  { label: "50%", value: "50" },
  { label: "60%", value: "60" },
  { label: "70%", value: "70" },
  { label: "80%", value: "80" },
  { label: "90%", value: "90" },
  { label: "100%", value: "100" },
];

const optionsOrderhBy = [
  { label: "Fecha de Actualización", value: "updatedAt" },
  { label: "Fecha de Venta", value: "soldat" },
  { label: "Fecha Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
  { label: "Fecha Creación Prospecto", value: "createdAtProspect" },
  { label: "Fecha Actualización Prospecto", value: "updatedAtProspect" },
  { label: "Concepto", value: "concept" },
  { label: "Monto Cotizado", value: "amount" },
];

const ContainerModal = styled.div`
  position: absolute;
  width: 400px;
  height: 250px;
  top: 40%;
  left: 40%;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  font-size: 18px;
  color: gray;

  .title {
    font-size: 20px;
    color: black;
    margin-bottom: 10px;
  }

  .buttons {
    position: relative;
    top: 30px;
    left: 180px;
  }

  .buttons-restore {
    position: relative;
    top: 120px;
    left: 180px;
  }

  .text_input {
    color: black;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .descarted_input {
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.47rem 0.75rem;
    width: 100%;
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
  }
`;
const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

const ProductStyle = styled.div`
  padding: 0%;
  margin: 1px;
  .product {
    margin: 0px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 12px;
      font-weight: 500;

      text-transform: capitalize;
    }
    .subtitle {
      color: grey;
      font-size: 11px;
    }
    .code {
      color: ${colors.primaryColorDark};
    }
  }
`;

const CategoryStyle = styled.div`
  padding: 0%;
  margin: 1px;
  .product {
    margin: 0px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .subtitle {
      color: grey;
      font-size: 11px;
    }
    .code {
      color: ${colors.primaryColorDark};
    }
  }
`;
