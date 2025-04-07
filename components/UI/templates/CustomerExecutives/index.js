import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AccountBox, Cached, Close, Email, ErrorOutline, FilterList, People, SearchOutlined } from "@material-ui/icons";
import { Button, Chip, Grid, LinearProgress, Modal, TextField, withStyles, Switch, Collapse } from "@material-ui/core";
import { api } from "../../../../services/api";
import { EntitiesLocal, filterByDate, filtersTypeDateClients, orderClients } from "../../../../BD/databd";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { normalizeTableClients, normalizeTableClientsDiscarted } from "../../../../utils/normalizeData";
import DrawerClient from "../../../../components/DrawerClient";
import {
  ClientesStyled,
  DrawerContainer,
  ContainerModal,
  ContainerModalDiscard,
  Error,
  AlertDateRange,
} from "../../../../styles/Clientes/clientes.styled";
import { colors } from "../../../../styles/global.styles";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import TableComponent from "../../../../components/TableDataClients";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import WhatsappV2 from "../../../../components/WhatsappV2";
import ModalTracking from "../../../../components/ModalTracking";
import AddPending from "../../../../components/ModalAddPendings";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import AscendingAndDescendingOrder from "../../molecules/AscendingAndDescendingOrder";
import ModalSales from "../../../ModalSales";
import dayjs from "dayjs";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import PaginationWithText from "../../molecules/PaginationWithText";
import ModalDeleteClient from "../../organism/ModalDeleteClient";
import LoadingImage from "../../atoms/LoadingImage";

export default function CustomerExecutives({ from }) {
  // * sidebar estado
  const router = useRouter();
  const dispatch = useDispatch();
  const { cve } = router.query;
  const { phases, categories, origins, clientTypes, specialties, users, clientsCompanies, reasons, discardreasons } =
    useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isLoading, setisLoading] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [flag, setFlag] = useState(false);
  const { id_user } = useSelector(userSelector);
  const [oportunities, setOportunities] = useState([]);
  const [prospectId, setProspectId] = useState("");
  const [oportunityId, setOportunityId] = useState("");
  //FILTROS
  const [showDrawer, setshowDrawer] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [prospectDelete, setProspectDelete] = useState();
  const [openModal, setOpenModal] = useState({ activate: false, type: "" });
  const [prospectSelected, setProspectSelected] = useState({});
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [showAddPending, setShowAddPending] = useState(false);
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [step, setStep] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [queryNew, setQueryNew] = useState(initialQuery);
  const [inQueryNew, setInQueryNew] = useState(initialInQuery);
  const [loadCities, setLoadCities] = useState(false);
  const [dataSales, setDataSales] = useState({});
  const [showDiscatedTable, setshowDiscatedTable] = useState(false);
  const filterDescarted = [{ label: " Descartados", value: true, type: "Mostrar", identifier: "discarted" }];
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);
  const handleCloseAddPending = () => setShowAddPending(false);
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const openOrder = () => setShowOrder(true);
  const closeProducts = () => setShowOrder(false);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  //fechas
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChips(!showChips);
  };
  const heads = [
    "id",
    "nombre",
    "correo",
    "movil",
    "télefono",
    "categoría de interes",
    "código de producto",
    "tipo de cliente",
    "puesto",
    "estado",
    "comentarios",
    "calle",
    "título",
    "canal",
    "web",
    "facebook",
    "google maps",
    "fecha Conversión cliente",
    "ultima actualización",
    "fecha de creación",
  ];

  const discardHeaders = [
    "id",
    "nombre",
    "correo",
    "télefono",
    "categoría de interes",
    "razon de descarte",
    "fecha de descarte",
  ];

  //Save filter date
  const [filterDate, setFilterDate] = useState({
    applyFilter: false,
    identifier: "",
    label: "",
    filterby: "",
    value: "",
  });
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  //Switch
  const [falling, setFalling] = useState(false);
  const [order, setOrder] = useState("createdAt");

  //When you flip the switch
  useEffect(() => {
    if (page != 1) {
      setPage(1);
    } else {
      getOportunities();
    }
  }, [falling, order]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunities();
      setisLoading(true);

      return () => (mounted = false);
    }
  }, [id_user, page, flag, limit, readyLocalStorage]);

  useEffect(() => {
    if (dateFinish && dateStart) {
      if (dateFinish >= dateStart) {
        setFilterDate({
          ...filterDate,
          value: [dayjs(dateStart).format(), dayjs(dateFinish).endOf("day").format()],
          applyFilter: true,
        });
      } else {
        setFilterDate({ ...filterDate, value: null, applyFilter: false });
      }
    }
  }, [dateStart, dateFinish]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1000&order=name`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };

  const generateFilters = () => {
    let query = {};
    query.discarted = showDiscatedTable;
    query.isclient = true;
    query.ejecutiveId = id_user;

    //Filter of the date
    if (filterDate.applyFilter) {
      query[filterDate.identifier] = { between: filterDate.value };
    }

    if (hasValue(searchKey)) {
      saveDataLocalStorage(searchKey, "keyword", "clientsEjecutive_keyword");
      if (searchKey.includes("@")) {
        query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
      } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchKey.trim())) {
        query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
      } else {
        query.fullname = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
      }
    } else {
      setSearchKey("");
    }

    Object.keys(queryNew).forEach((propertyName, index) => {
      if (queryNew[propertyName].show === true) {
        query[propertyName] = queryNew[propertyName].id;
      }
    });

    return query;
  };

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("clientsEjecutive_keyword");

    if (searchkeyword) {
      setNameSearch(searchkeyword);
      setSearchKey(searchkeyword);
      setShowChips(true);
    }

    let query = localStorage.getItem("clientsEjecutive_query");
    if (query) {
      let queryFormat = JSON.parse(query);
      if (queryFormat["discarted"].show === true) {
        setshowDiscatedTable(true);
      }
      setQueryNew(JSON.parse(query));
      setShowChips(true);
    }

    let orderby = localStorage.getItem("clientsEjecutive_order");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("clientsEjecutiveNew_asc");
    let newVariable = localStorage.getItem("clientsEjecutiveNe_asc");

    if (newVariable === null) {
      localStorage.setItem("clientsEjecutiveNew_asc", JSON.stringify(false));
      localStorage.setItem("clientsEjecutiveNe_asc", JSON.stringify(falling));
      setFalling(false);
    } else {
      if (asc) {
        setFalling(JSON.parse(asc));
      }
    }

    let filterDateProspect = localStorage.getItem("clientsEjecutive_filterDate");
    if (filterDateProspect) {
      let dataFilter = JSON.parse(filterDateProspect);
      if (dataFilter.filterby === "Rango") {
        if (dataFilter.value !== null) {
          setDateStart(dayjs(dataFilter.value[0]).format("YYYY-MM-DD"));
          setDateFinish(dayjs(dataFilter.value[1]).format("YYYY-MM-DD"));
        }
      } else {
        let searchValue = filterByDate.filter(item => item.label === dataFilter.label);
        if (searchValue.length > 0) dataFilter.value = searchValue[0].value;
      }
      setFilterDate(dataFilter);
    }

    setReadyLocalStorage(true);
  };

  const getOportunities = async () => {
    setisLoading(true);
    if (readyLocalStorage === false) return;
    try {
      let query = generateFilters();
      let params = {
        include: "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,channel",
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: falling ? order : `-${order}`,
        skip: page,
        join: "cat,cy,ey,pe,ejecutive,cy,on,ce,sy,ch",
        subquery: "1",
      };
      let responseOportunities = await api.get(`prospects`, { params });
      let results = responseOportunities?.data.results;
      if (showDiscatedTable == true) {
        normalizeDiscarted(results);
      } else {
        normalizeProspect(results);
      }
      setTotalProspects(responseOportunities.data.count);
      setisLoading(false);
      saveDataLocalStorage(queryNew, "query", "clientsEjecutive_query");
      saveDataLocalStorage(falling, "asc", "clientsEjecutiveNew_asc");
      saveDataLocalStorage(order, "order", "clientsEjecutive_order");
      saveDataLocalStorage(filterDate, "filterDate", "clientsEjecutive_filterDate");
    } catch (error) {
      console.log(error);
    }
  };

  const normalizeProspect = prospects => {
    let normalizeData = prospects.map(item => normalizeTableClients(item));
    setOportunities(normalizeData);
    setisLoading(false);
  };

  const normalizeDiscarted = prospects => {
    let normalizeData = prospects.map(item => normalizeTableClientsDiscarted(item));
    setOportunities(normalizeData);
    setisLoading(false);
  };

  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;

      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const handleSelectQuery = (e, identifier) => {
    let queryToMutation = queryNew;

    if (identifier == "discarted") {
      setshowDiscatedTable(true);
    }

    // TODO ADD THIS FUCK

    if (identifier === "gender" || identifier === "discarted" || identifier === "viewed") {
      if (e === null) {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: e.value,
          name: e.label,
          type: e.type,
        };
      }
    } else {
      if (e === null) {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: e.id,
          name: e.name,
        };
      }
    }
    setQueryNew({ ...queryToMutation });
  };

  const applyFilters = () => {
    closeDrawerFilters();
    setFlag(!flag);

    if (page > 1) {
      setPage(1);
    }

    let propertiesNameQuery = Object.keys(queryNew);
    let queryFinal = queryNew;
    let propertiesNameInQuery = Object.keys(inQueryNew);
    let inQueryFinal = inQueryNew;
    for (let i = 0; i < propertiesNameInQuery.length; i++) {
      const element = propertiesNameInQuery[i];
      if (inQueryFinal[element].name !== null) {
        inQueryFinal[element].show = true;
      }
    }
    for (let i = 0; i < propertiesNameQuery.length; i++) {
      const element = propertiesNameQuery[i];
      if (queryFinal[element].name !== null) {
        queryFinal[element].show = true;
      }
    }
    setQueryNew(queryFinal);
    setInQueryNew(inQueryFinal);
  };

  const handleSelectQueryDelete = identifier => {
    let queryItem = {};

    if (identifier === "discarted") {
      setshowDiscatedTable(false);
    }

    let queryToMutate = queryNew;
    queryItem["id"] = null;
    queryItem["name"] = null;
    queryItem["show"] = false;
    queryItem["identifier"] = identifier;
    queryItem["value"] = false;

    queryToMutate[identifier] = {
      ...queryToMutate[identifier],
      ...queryItem,
    };

    setQueryNew({
      ...queryToMutate,
    });

    setFlag(!flag);
  };

  const handleSelectCompanyclients = item => {
    let clients = {
      id: item.id,
      name: item.companyname,
      type: "Empresa",
    };

    handleSelectQuery(clients, "clientCompanyId");
  };

  const handleSelectEntitie = item => {
    if (item !== null) {
      let entitie = {
        id: item.id,
        name: item.name,
        type: "Entidad",
      };
      if (item !== "") {
        getCities(item.id);
      } else {
        setCitiesByEntity([]);
      }
      handleSelectQuery(entitie, "entityId");
    }
  };

  const handleSelectCity = item => {
    if (item !== null) {
      let city = {
        id: item.id,
        name: item.name,
        type: "Ciudad",
      };
      handleSelectQuery(city, "cityId");
    }
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("clientsEjecutive_keyword");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //drawer por prospecto
  const handleClickClient = (itemClient, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      setProspectId(itemClient.id);
      setOportunityId(itemClient.id);
      setshowDrawer(true);
      setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
      setRefetchPendings(!refetchPendings);
      setFlagTrackings(!flagTrackings);
    } else {
      //return console.log("cve: ", cve)
      if (cve == "0111") {
        router.push({
          pathname: "/clientes/[prospecto]",
          query: { prospecto: itemClient.id, cve: cve },
        });
      } else {
        router.push({
          pathname: "clientes/[prospecto]",
          query: { prospecto: itemClient.id },
        });
      }
    }
  };

  const handleClickOrder = itemClient => {
    openOrder();
    setDataSales(itemClient);
  };

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const ConfirmDelete = clients => {
    setProspectDelete(clients);
    setOpenModal({ ...openModal, activate: true });
  };
  const closeModal = () => {
    setProspectDelete("");
    setStep(0);
    setOpenModal({ ...openModal, activate: false, type: "" });
  };
  const validateInfo = item => {
    if (item === undefined || item === null || item === "") {
      return "";
    } else {
      return item;
    }
  };

  const confirmRestore = prospect => {
    setProspectDelete(prospect);
    setOpenModal({ ...openModal, activate: true, type: "restore" });
  };

  const handleClickOpenWhatsApp = item => {
    setProspectSelected(item.itemBD);
    setOpenWhatsApp(true);
  };
  const handleClickAddTracking = item => {
    setProspectSelected(item);
    setShowAddTrackings(true);
    console.log("item", item);
  };
  const handleClickAddPending = item => {
    setProspectSelected(item);
    setShowAddPending(true);
  };
  const handleClickQuoteAgain = item => {
    router.push({
      pathname: `/oportunidades/nuevo/`,
      query: { p: item.itemBD.id },
    });
    cleanData();
  };
  const handleValueFilterDate = (event, type) => {
    if (type === "typeDate") {
      setFilterDate({ ...filterDate, identifier: event.identifier, label: event.label });
    } else {
      setFilterDate({
        ...filterDate,
        value: event.value,
        filterby: event.label,
        applyFilter: event.identifier === "range" ? false : true,
      });
    }
    setDateStart("");
    setDateFinish("");
  };

  const handleDeleteFilterDate = () => {
    setPage(1);
    setFlag(!flag);
    setFilterDate({ identifier: "", label: "", filterby: "", value: "", applyFilter: false });
    setDateStart("");
    setDateFinish("");
  };
  const cleanData = () => {
    dispatch(setArrayProducts([]));
  };
  const showDateErrors = () => {
    if (filterDate?.filterby == "Rango") {
      if (!dateStart || !dateFinish) {
        return (
          <AlertDateRange>
            <ErrorOutline className="icon" />
            <p className="alert_title">Ingrese ambas fechas</p>
          </AlertDateRange>
        );
      } else if (dateFinish < dateStart) {
        return (
          <AlertDateRange>
            <ErrorOutline className="icon" />
            <p className="alert_title">La fecha final no puede ser mayor a la inicial.</p>
          </AlertDateRange>
        );
      } else {
        return null; // No errors
      }
    }
  };
  return (
    <ClientesStyled>
      <Head>
        <title>CRM JOBS - Clientes</title>
      </Head>
      <div className="main">
        <div className="ctr_clients">
          <div className="head">
            <div className="head__title">
              <h1>Clientes</h1>
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
                value={nameSearch}
                label={nameSearch !== "" && "Buscar Cliente"}
                onChange={e => setNameSearch(e.target.value)}
                placeholder="Ingresa Nombre o Correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter" && e.target.value.length > 0) {
                    setSearchKey(e.target.value);
                    setFlag(!flag);
                    setShowChips(true);
                    setPage(1);
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

          <div className="filters_chip">
            {showChips && (
              <div>
                {searchKey !== "" && (
                  <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
                )}

                {filterDate?.applyFilter && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={handleDeleteFilterDate}
                    label={`${filterDate.label} : ${filterDate.filterby} ${
                      filterDate.filterby === "Rango" ? `(${dateStart} - ${dateFinish})` : ""
                    }`}
                    className="chip"
                  />
                )}
                {Object.keys(queryNew).map((item, index) => {
                  if (queryNew[item].show == true) {
                    return (
                      <Chip
                        key={index}
                        color="primary"
                        size="small"
                        onDelete={() => handleSelectQueryDelete(queryNew[item].identifier)}
                        label={`${queryNew[item].type} : ${queryNew[item].name}`}
                        className="chip"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          <>
            <AscendingAndDescendingOrder
              falling={falling}
              setFalling={setFalling}
              order={order}
              setOrder={setOrder}
              addOptions={orderClients}
            />

            {isLoading && <LoadingImage />}
            {!isLoading && (
              <>
                <TableComponent
                  data={oportunities}
                  id="nombre"
                  discartedTable={showDiscatedTable}
                  heads={showDiscatedTable ? discardHeaders : heads}
                  secondaryColor="#dce1f6"
                  primaryColor="#405189"
                  handleClickName={(item, e) => handleClickClient(item, e)}
                  handleClickDiscardSales={ConfirmDelete}
                  handleClickAddTracking={handleClickAddTracking}
                  handleClickRestore={confirmRestore}
                  handleClickAddPending={handleClickAddPending}
                  handleClickOpenWhatsApp={handleClickOpenWhatsApp}
                  handleClickQuoteAgain={handleClickQuoteAgain}
                  handleClickOrder={(item, e) => handleClickOrder(item, e)}
                  handleAlert={handleAlert}
                  setFlag={setFlag}
                  flag={flag}
                />

                <PaginationWithText
                  total={totalProspects}
                  actualPage={page}
                  setActualPage={setPage}
                  totalPages={Math.ceil(totalProspects / limit)}
                />
              </>
            )}
          </>
        </div>
      </div>
      <DrawerClient
        isOportunity={true}
        width={"60%"}
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        prospectId={prospectId}
        oportunityId={oportunityId}
        orderPendings={orderPendings}
        setOrderPendigs={setOrderPendigs}
        refetch={refetchPendings}
        setRefetch={setRefetchPendings}
        flag={flagTrackings}
        setFlag={setFlagTrackings}
        handleClickAddTracking={handleClickAddTracking}
        handleClickAddPending={handleClickAddPending}
      />
      <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={closeDrawerFilters} />
          </div>

          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fecha</label>
              <Select
                className="selects"
                placeholder="Selecciona una Opción"
                options={filtersTypeDateClients}
                value={filtersTypeDateClients.filter(item => item.identifier === filterDate?.identifier)}
                onChange={event => handleValueFilterDate(event, "typeDate")}
                getOptionValue={option => option.identifier}
              />
              {filterDate?.identifier !== "" && (
                <Select
                  className="selects"
                  placeholder="Selecciona una Opción"
                  options={filterByDate}
                  value={filterByDate.filter(item => item.label === filterDate?.filterby)}
                  onChange={event => handleValueFilterDate(event, "filterType")}
                />
              )}
              <Collapse in={filterDate?.filterby === "Rango" ? true : false}>
                <Grid className="range_dates" container={true} spacing={1}>
                  <Grid item={true} md={6}>
                    <p className="title_date">De</p>
                    <input
                      className="input_date"
                      type="date"
                      value={dateStart}
                      onChange={e => {
                        setDateStart(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item={true} md={6}>
                    <p className="title_date">Al</p>
                    <input
                      className="input_date"
                      type="date"
                      value={dateFinish}
                      onChange={e => setDateFinish(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Collapse>
              {showDateErrors()}
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Zona geografica</label>
              <Select
                className="drawer_container__form__containerSelect__select"
                placeholder="Selecciona un Estado"
                onChange={e => handleSelectEntitie(e)}
                value={EntitiesLocal.filter(item => item.id === queryNew["entityId"]?.id)}
                options={EntitiesLocal}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary: "   #405189",
                  },
                })}
              />
            </div>

            {queryNew["entityId"]?.id && (
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Ciudad</label>
                <Select
                  className="drawer_container__form__containerSelect__select"
                  placeholder="Selecciona una Ciudad"
                  onChange={e => handleSelectCity(e)}
                  value={citiesByEntity?.filter(item => item.id === queryNew["cityId"]?.id)}
                  isLoading={loadCities}
                  options={citiesByEntity}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} `}
                  theme={theme => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      primary: "   #405189",
                    },
                  })}
                />
              </div>
            )}

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categoría de interes</label>
              {/* 21/10/2022 se añadio categoria de interes */}
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleSelectQuery(e, "categoryId")}
                options={categories.results}
                value={categories.results.filter(item => item.id === queryNew["categoryId"]?.id)}
                onMenuOpen={() => getCatalogBy("categories")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={categories.isFetching}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Origen</label>
              <Select
                isClearable={true}
                onChange={e => handleSelectQuery(e, "originId")}
                options={origins.results}
                className="selectAccess"
                placeholder="Selecciona un origen"
                onMenuOpen={() => getCatalogBy("origins")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={origins.isFetching}
                value={origins.results.filter(item => item.id === queryNew["originId"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary: "   #405189",
                  },
                })}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fase</label>
              <Select
                isClearable={true}
                onChange={e => handleSelectQuery(e, "phaseId")}
                options={phases.results}
                onMenuOpen={() => getCatalogBy("phases")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={phases.isFetching}
                className="selectAccess"
                placeholder="Selecciona una Fase"
                value={phases.results.filter(item => item.id === queryNew["phaseId"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary: "   #405189",
                  },
                })}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de Cliente</label>
              <Select
                isClearable={true}
                value={clientTypes.results.filter(item => item.id === queryNew["clientTypeId"]?.id)}
                options={clientTypes.results}
                onChange={e => handleSelectQuery(e, "clientTypeId")}
                onMenuOpen={() => getCatalogBy("clientTypes")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientTypes.isFetching}
                className="selectAccess"
                placeholder="Selecciona tipo de Cliente"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary: "   #405189",
                  },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Especialidad</label>
              <Select
                isClearable={true}
                value={specialties.results?.filter(item => item.id === queryNew["specialtyId"]?.id)}
                onChange={e => handleSelectQuery(e, "specialtyId")}
                onMenuOpen={() => getCatalogBy("specialties")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={specialties.isFetching}
                options={specialties.results}
                className="selectAccess"
                placeholder="Selecciona Especialidad"
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: {
                    ...theme.colors,
                    primary: "   #405189",
                  },
                })}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Compañia</label>
              <Select
                placeholder="Seleccione una compañia"
                onMenuOpen={() => getCatalogBy("clientsCompanies")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientsCompanies.isFetching}
                options={clientsCompanies.results}
                value={clientsCompanies.results?.filter(item => item.id === queryNew["clientCompanyId"]?.id)}
                onChange={e => handleSelectCompanyclients(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.companyname} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Descartados</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                options={filterDescarted}
                onChange={e => handleSelectQuery(e, "discarted")}
              />
            </div>
          </div>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
              Cancelar
            </Button>
            <Button variant="contained" className="btn_apply" onClick={() => applyFilters()}>
              Aplicar
            </Button>
          </div>
        </div>
      </DrawerContainer>
      <WhatsappV2
        isOportunity={false}
        isClient={true}
        isProspect={false}
        prospect={prospectSelected}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
        flag={flag}
        setFlag={setFlag}
      />
      <ModalTracking
        isclient={true}
        prospect={prospectSelected}
        open={showAddTrackings}
        close={handleCloseAddTrackigns}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={flag}
        setFlag={setFlag}
        prospectEdit={prospectSelected}
      />
      <AddPending
        oportunity={true}
        isclient={true}
        prospect={prospectSelected}
        open={showAddPending}
        close={handleCloseAddPending}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
      />
      <ModalDeleteClient
        openModal={openModal}
        closeModal={closeModal}
        prospectDelete={prospectDelete}
        flag={flag}
        setFlag={setFlag}
        handleAlert={handleAlert}
        ConfirmDelete={ConfirmDelete}
        step={step}
        setStep={setStep}
      />

      <ModalSales open={showOrder} close={closeProducts} dataSales={dataSales} />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ClientesStyled>
  );
}

const initialQuery = {
  discarted: {
    id: null,
    name: null,
    type: "Descartados",
    show: false,
    identifier: "discarted",
  },
  originId: {
    id: null,
    name: null,
    type: "Origen",
    show: false,
    identifier: "originId",
  },
  categoryId: {
    id: null,
    name: null,
    type: "Categoria",
    show: false,
    identifier: "categoryId",
  },
  phaseId: {
    id: null,
    name: null,
    type: "Fase",
    show: false,
    identifier: "phaseId",
  },
  entityId: {
    id: null,
    name: null,
    type: "Estado",
    show: false,
    identifier: "entityId",
  },
  cityId: {
    id: null,
    name: null,
    type: "Ciudad",
    show: false,
    identifier: "cityId",
  },
  gender: {
    id: null,
    name: null,
    type: "Género",
    show: false,
    identifier: "gender",
  },
  clientTypeId: {
    id: null,
    name: null,
    type: "Tipo de cliente",
    show: false,
    identifier: "clientTypeId",
  },
  specialtyId: {
    id: null,
    name: null,
    type: "Especialidad",
    show: false,
    identifier: "specialtyId",
  },
  viewed: {
    id: null,
    name: null,
    type: "Vistos",
    show: false,
    identifier: "viewed",
  },
  clientCompanyId: {
    id: null,
    name: null,
    type: "Empresa",
    show: false,
    identifier: "clientCompanyId",
  },
  ejecutiveId: {
    id: null,
    name: null,
    type: "Ejecutivo",
    show: false,
    identifier: "ejecutiveId",
  },
};

const initialInQuery = {
  originId: {
    id: null,
    name: null,
    type: "Origen",
    show: false,
    identifier: "originId",
  },
};
