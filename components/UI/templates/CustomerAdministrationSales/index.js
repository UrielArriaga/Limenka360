import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  AccountBox,
  Cached,
  Close,
  Email,
  FiberManualRecord,
  FilterList,
  ImportExport,
  People,
  SearchOutlined,
} from "@material-ui/icons";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  TextField,
  Tooltip,
  withStyles,
  Switch,
} from "@material-ui/core";
import { api } from "../../../../services/api";
import { EntitiesLocal } from "../../../../BD/databd";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { normalizeTableClients, normalizeTableClientsAdminSale } from "../../../../utils/normalizeData";

import {
  ClientesStyled,
  DrawerContainer,
  Error,
  ContainerModal,
  ContainerModalDiscard,
  ShowProducts,
} from "../../../../styles/ClientesAdminSales/clientes.styled";
import { colors, StyleExecutiveGroup, StyleGroup } from "../../../../styles/global.styles";
import RequestCommon from "../../../../services/request_Common";
import Select from "react-select";
import { formatNumber, getDataDay, getDataDaysMonth, getDataDaysWeek, toUpperCaseChart } from "../../../../utils";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";
import TableComponent from "../../../../components/TableDataClientsAdminSale";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import WhatsappV2 from "../../../../components/WhatsappV2";
import AddPending from "../../../../components/ModalAddPendings";
import {
  commonSelector,
  getClientTypesCommon,
  getOriginsCommon,
  getPhasesCommon,
  getCategoriesCommon,
  getSpecialtiesCommon,
} from "../../../../redux/slices/commonSlice";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import AscendingAndDescendingOrder from "../../molecules/AscendingAndDescendingOrder";
import ModalTracking from "../../../ModalTracking";
import SideBarAdministrationSales from "../../../SideBar/SideBarAdministrationSales";
import NavBarDashboardAdministrationSales from "../../../NavBarDashboard/AdministrationSales";
import DrawerClientAdminSales from "../../organism/PreviewClientsAdmin";
import dayjs from "dayjs";
import SelectForFilters from "../../molecules/SelectForFilters/SelectForFilters";
export default function CustomerAdmiSales() {
  // * sidebar estado
  const router = useRouter();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [flag, setFlag] = useState(false);
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const [oportunities, setOportunities] = useState([]);
  const [prospectId, setProspectId] = useState("");
  const [oportunityId, setOportunityId] = useState("");
  const commonApi = new RequestCommon();
  //FILTROS
  const [showDrawer, setshowDrawer] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [ejecutives, setEjecutives] = useState([]);
  const [dataGroups, setDataGroups] = useState([]);
  const [respaldo, setRespaldo] = useState([]);
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [ejecutive, setEjecutive] = useState("");
  const totalPages = Math.ceil(totalProspects / limit);
  const [prospectDelete, setProspectDelete] = useState();
  const [openModal, setOpenModal] = useState({ activate: false, type: "" });
  const [discartReasons, setdiscartReasons] = useState([]);
  const [discarded, setDiscarded] = useState({ value: false, activate: false });
  const [clientsCompanies, setClientsCompanies] = useState([]);
  const [prospectSelected, setProspectSelected] = useState({});
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [step, setStep] = useState(0);
  const [sales, setSales] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [isLoadingSales, setisLoadingSales] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [queryNew, setQueryNew] = useState(initialQuery);
  const [inQueryNew, setInQueryNew] = useState(initialInQuery);
  const { origins, phases, clientTypes, categories, specialties } = useSelector(commonSelector);
  const [loadCities, setLoadCities] = useState(false);
  const filterDescarted = [{ label: " Descartados", value: true, type: "Mostrar", identifier: "discarted" }];
  const dispatch = useDispatch();
  //Save filter date
  const [filters, setFilters] = useState({ date: "" });
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  //Switch
  const [falling, setFalling] = useState(true);
  const [showDiscartedProspects, setShowDiscartedProspects] = useState(false);
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

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
    //prospecto
    "id",
    "nombre",
    "correo",
    "télefono",
    "categoría de interes",
    "género",
    "puesto",
    "empresa",
    "comentarios",
    "codigo postal",
    "estado",
    "ciudad",
    "colonia",
    "calle",
    "ejecutivo",
    "tipo de cliente",
    "fase",
    "origen",
    "título",
    "especialidad",
    "web",
    "facebook",
    "google maps",
    "fecha de creación",
    "ultima actualización",
  ];

  const discardHeaders = ["id", "nombre", "correo", "fecha de descarte"];

  //When you flip the switch
  useEffect(() => {
    if (page != 1) {
      setPage(1);
    } else {
      //getProspects();
      getOportunities();
    }
  }, [falling, orderBy]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunities();
      setisLoading(true);
      getDiscartReasons();
      return () => (mounted = false);
    }
  }, [id_user, page, flag, limit, readyLocalStorage]);

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      let params = {
        limit: 100,
        count: "1",
        order: "name",
      };
      getUsers();
      dispatch(getOriginsCommon({ params }));
      dispatch(getPhasesCommon({ params }));
      dispatch(getClientTypesCommon({ params }));
      dispatch(getSpecialtiesCommon({ params }));
      dispatch(getCategoriesCommon({ params }));
      getClientscompanies();
      getDataGroups();
    };
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

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

  const getUsers = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
        include: "group",
      };
      let response = await api.get(`ejecutives`, { params });
      setEjecutives(response?.data?.results);
      setRespaldo(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataGroups = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
      };
      let response = await api.get(`groups`, { params });
      setDataGroups(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientscompanies = async clientCompanyId => {
    try {
      let query = {};

      let clientsCompany = await commonApi.getClientsCompanies(query);
      setClientsCompanies(clientsCompany.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDiscartReasons = async () => {
    try {
      let reasons = await commonApi.getReasons();
      setdiscartReasons(reasons.data.results);
    } catch (error) {}
  };
  const normalizeDateQuery = type => {
    switch (type) {
      case "day":
        let today = dayjs().startOf("day").toDate();
        let nextDay = dayjs().add(1, "day").startOf("day").toDate();
        return [today, nextDay];
      case "week":
        let startWeek = dayjs().startOf("week").toDate();
        let finishWeerk = dayjs().endOf("week").toDate();
        return [startWeek, finishWeerk];

      case "month":
        let startMonth = dayjs().startOf("month").toDate();
        let finishMonth = dayjs().endOf("month").toDate();
        return [startMonth, finishMonth];

      case "range":
        let startRange = dayjs(dateStart).startOf("day").toDate();
        let finisRange = dayjs(dateFinish).endOf("day").toDate();
        return [startRange, finisRange];
      default:
        let todayDefault = dayjs().startOf("day").toDate();
        let nextDayDefault = dayjs().add(1, "day").startOf("day").toDate();
        return [todayDefault, nextDayDefault];
    }
  };

  const generateFilters = () => {
    let query = {};
    query.discarted = showDiscartedProspects;
    query.isclient = true;

    if (hasValue(searchKey)) {
      saveDataLocalStorage(searchKey, "keyword", "clientsAdminSales_keyword");
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
        switch (propertyName) {
          case "url":
            if (queryNew.url.name === "Con pagina web") {
              query.url = {
                ne: "",
              };
            } else {
              query.url = "";
            }
            break;
          case "facebook":
            if (queryNew.facebook.name === "Con Facebook") {
              query.facebook = {
                ne: "",
              };
            } else {
              query.facebook = "";
            }
            break;
          case "groupId":
            query.ejecutive = {
              groupId: queryNew[propertyName].id,
            };
            break;
          case "ejecutiveId":
            query.ejecutiveId = queryNew[propertyName].id;

            break;
          default:
            query[propertyName] = queryNew[propertyName].id;
            break;
        }
      }
    });
    if (filters?.date?.id) {
      query[orderBy] = { between: normalizeDateQuery(filters?.date?.id) };
    }

    return query;
  };

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("clientsAdminSales_keyword");

    if (searchkeyword) {
      setNameSearch(searchkeyword);
      setSearchKey(searchkeyword);
      setShowChips(true);
    }

    let query = localStorage.getItem("clientsAdminSales_query");
    if (query) {
      let queryFormat = JSON.parse(query);
      if (queryFormat["discarted"].show === true) {
        setShowDiscartedProspects(true);
      }
      setQueryNew(JSON.parse(query));
      setShowChips(true);
    }
    let ejecutives = localStorage.getItem("clientsAdminSales_ejecutive");
    if (ejecutives) {
      setEjecutive(JSON.parse(ejecutives));
      setShowChips(true);
    }
    let orderby = localStorage.getItem("clientsAdminSales_order");
    if (orderby) {
      setOrderBy(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("clientsAdminSales_asc");
    if (asc) {
      setFalling(JSON.parse(asc));
    }

    setReadyLocalStorage(true);
  };

  const getOportunities = async () => {
    setisLoading(true);
    if (readyLocalStorage === false) return;
    try {
      let query = generateFilters();
      let params = {
        include: "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal",
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: falling ? orderBy : `-${orderBy}`,
        skip: page,
        join: "cat,cy,ey,pe,ejecutive,ct,or,ce,sy,pl",
        subquery: "2",
      };
      let responseOportunities = await api.get(`prospects`, { params });
      let results = responseOportunities?.data.results;
      let normalizeData = results.map(item => normalizeTableClientsAdminSale(item));
      // console.log(responseOportunities?.data.results);
      setTotalProspects(responseOportunities.data.count);
      setOportunities(normalizeData);
      setisLoading(false);
      saveDataLocalStorage(queryNew, "query", "clientsAdminSales_query");
      saveDataLocalStorage(falling, "asc", "clientsAdminSales_asc");
      saveDataLocalStorage(orderBy, "order", "clientsAdminSales_order");

      saveDataLocalStorage(ejecutive, "ejecutive", "clientsAdminSales_ejecutive");
    } catch (error) {
      console.log(error);
    }
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

    // TODO ADD THIS FUCK
    if (identifier == "discarted") {
      // alert("true");

      setShowDiscartedProspects(true);
    }
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
    // console.log(inQueryNew);
    if (identifier === "groupId") {
      setEjecutives(respaldo);
    }
    if (identifier === "discarted") {
      setShowDiscartedProspects(false);
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

  const getPaymnetsByOportunity = async itemClient => {
    try {
      setisLoadingSales(true);
      let query = {};
      query.prospectId = itemClient.id;
      query.discarted = false;
      query.iscloseout = true;
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "prospect",
        order: "-createdAt",
      };
      let payment = await api.get("oportunities", { params });
      let salese = payment.data?.results;
      setSales(salese);
      setisLoadingSales(false);
    } catch (error) {
      console.log(error);
      setisLoadingSales(false);
    }
  };
  const handleSelectEjecutives = item => {
    if (item) {
      let eje = {
        id: item.id,
        name: item.name,
        lastname: item.lastname,
        type: "Ejecutivo",
      };
      handleSelectQuery(eje, "ejecutiveId");
    } else {
      handleSelectQuery(null, "ejecutiveId");
    }
  };

  const handleSelectGroup = group => {
    if (group) {
      let groups = {
        id: group.id,
        name: group.name,
        type: "Grupo",
      };
      let newPaymentsAdd = respaldo.filter(item => item?.group?.id === group?.id);
      setEjecutives(newPaymentsAdd);
      handleSelectQuery(groups, "groupId");
    } else {
      setEjecutives(respaldo);
      handleSelectQuery(null, "groupId");
    }
  };

  const handleSelectCompanyclients = item => {
    let clients = {
      id: item.id,
      name: item.companyname,
      type: "Empresa",
    };

    if (item !== "") {
      getClientscompanies(item.id);
    } else {
      setClientsCompanies([]);
    }

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
    localStorage.setItem("clientsAdminSales_keyword", "");

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
      router.push({
        pathname: "clientes/[cliente]",
        query: { cliente: itemClient.id },
      });
    }
  };

  const handleClickSelectedSales = item => {
    router.push({
      pathname: "/pedidos/nuevo",
      query: { o: item.id, p: item.prospectId },
    });
  };
  const handleClickOrder = itemClient => {
    openOrder();
    getPaymnetsByOportunity(itemClient);
  };

  const handlePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const deleteClient = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          let reason = discartReasons.filter(item => item.id == formData?.descarted?.id);
          update.status = 3;
          update.discartedbyId = id_user;
          update.reasonId = formData?.descarted?.id;
          update.discartedreason = reason[0].reason;

          let deleteProspect = await api.put(`prospects/discardprospect/${prospectDelete.id}`, update);
          if (deleteProspect.status == 200) {
            ConfirmDelete();
            closeModal();
            setFlag(!flag);
            handleAlert("success", "Cliente - Descartado!", "basic");
            setValue("descarted", "");
          }
          break;
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se descarto el Cliente!", "basic");
      console.log(error);
    }
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

  const body = () => {
    switch (step) {
      case 0:
        return (
          <Grid container className="dialogContainer">
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <AccountBox className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Nombre</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(prospectDelete?.nombre?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Email className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Correo</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(prospectDelete?.correo?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__header__title">
                Razon:
                {errors.descarted && errors.descarted.type === "required" && (
                  <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
                )}{" "}
              </p>
              <Controller
                name="descarted"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    maxMenuHeight={220}
                    className="dialogContainer__item__select"
                    placeholder="Selecciona una opción"
                    options={discartReasons}
                    isClearable={true}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container className="dialogContainer">
            <Grid item xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__content">¿Está seguro de proceder?</p>
              <p className="dialogContainer__item__contentAccept">
                Al descartar este cliente se eliminarán pagos y oportunidades activas.
              </p>
            </Grid>
          </Grid>
        );
      default:
        break;
    }
  };

  const confirmRestore = prospect => {
    setProspectDelete(prospect);
    setOpenModal({ ...openModal, activate: true, type: "restore" });
  };
  // * restablecer contenido del modal
  const modalRestore = (
    <ContainerModal>
      <div className="title">
        <p>Restablecer Cliente</p>
      </div>
      <div className="containerBody">
        <p className="titleName">Se restablecera cliente a registros</p>
        <div className="buttons-restore">
          <Button className="cancel" color="primary" onClick={() => closeModal()}>
            Cancelar
          </Button>
          <Button className="accept" color="primary" onClick={() => restoreClient()}>
            Aceptar
          </Button>
        </div>
      </div>
    </ContainerModal>
  );
  // * funcion para restablecer prospecto
  const restoreClient = async () => {
    try {
      let update = {};
      update.discarted = false;
      update.discartedreason = "";
      update.discartedbyId = null;
      update.reasonId = null;
      update.deletedAt = null;
      let deleteProspect = await api.put(`prospects/resetprospect/${prospectDelete.id}`, update);
      if (deleteProspect.status == 200) {
        closeModal();
        setFlag(!flag);
        handleAlert("success", "Prospecto - Restablecido!", "basic");
        setValue("descarted", "");
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se restablecio el prospecto!", "basic");
      console.log(error);
    }
  };

  const handleClickOpenWhatsApp = item => {
    setProspectSelected(item.itemBD);
    setOpenWhatsApp(true);
  };
  const handleClickAddTracking = item => {
    setProspectSelected(item);
    setShowAddTrackings(true);
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
  };
  const setDate = newDate => {
    setFilters({ ...filters, date: newDate });
  };
  const FormatOptionsExecutiveGroup = ({ fullname, group, email }) => {
    return (
      <StyleExecutiveGroup>
        <div className="dataExecutive">
          <p className="fullname">{fullname} - </p>
          <p className="email">{email}</p>
        </div>
        <p className="groupname">
          Grupo: <span className="name">{group.name}</span>
        </p>
      </StyleExecutiveGroup>
    );
  };

  const FormatOptionsGroup = ({ name }) => {
    return (
      <StyleGroup>
        <p className="groupname">{name}</p>
      </StyleGroup>
    );
  };

  const handleNameSearch = e => {
    setNameSearch(e.target.value);
    localStorage.setItem("clientsAdminSales_keyword", e.target.value);
  };

  return (
    <ClientesStyled>
      <Head>
        <title>CRM JOBS - Clientes</title>
      </Head>
      {/* <SideBarAdministrationSales open={open} setOpen={setOpen} />
      <NavBarDashboardAdministrationSales sideBar={true} /> */}
      <div className="main">
        <div className="ctr_clients">
          <div className="head">
            <div className="head__title">
              <h1 onClick={() => getOportunities()}>Clientes</h1>
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
                label={nameSearch !== "" && "Buscar prospecto"}
                onChange={handleNameSearch}
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

                {filters?.date && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setPage(1);
                      setFilters({ date: "" });
                      setFlag(!flag);
                      setDateStart("");
                      setDateFinish("");
                    }}
                    label={`${"Fecha"}: ${filters?.date?.name} 
                    
                                                        
                   `}
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
              order={orderBy}
              setOrder={setOrderBy}
              addOptions={[
                { label: "Fecha Creación Prospecto", value: "createdAt" },
                { label: "Fecha Actualización Prospecto", value: "updatedAt" },
                { label: "Fecha Conversión Cliente", value: "clientat" },
                { label: "Fecha Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
              ]}
            />

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
                <TableComponent
                  data={oportunities}
                  id="nombre"
                  discartedTable={showDiscartedProspects}
                  heads={showDiscartedProspects ? discardHeaders : heads}
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
                />

                <div className="ctr_clients__tfooter">
                  <div className="ctr_clients__tfooter__ctr_button"></div>
                  <div className="ctr_clients__tfooter__ctr_pagination">
                    <p className="">{`Total de Clienes: ${totalProspects} Página: ${page} - ${Math.ceil(
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
          </>
        </div>
      </div>
      <DrawerClientAdminSales
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
      />
      <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={closeDrawerFilters} />
          </div>

          <SelectForFilters
            selectTitle={"Fecha De Creación"}
            setSaveSelection={setDate}
            selectedFilter={filters.date}
            dateStart={dateStart}
            setDateStart={setDateStart}
            dateFinish={dateFinish}
            setDateFinish={setDateFinish}
            dataForOptions={[
              { name: "Hoy", id: "day" },
              { name: "Semana", id: "week" },
              { name: "Mes", id: "month" },
              { name: "Rango", id: "range" },
            ]}
          />

          <div className="ctr_drawer__ctr_inputs">
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
              <label className="label"> Grupo</label>

              <Select
                placeholder="Selecciona un Grupo"
                isClearable={true}
                onChange={e => handleSelectGroup(e)}
                formatOptionLabel={FormatOptionsGroup}
                value={dataGroups.filter(item => item.id === queryNew["groupId"]?.id)}
                options={dataGroups}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name}`}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Ejecutivo</label>

              <Select
                isClearable={true}
                className="drawer_container__form__containerSelect__select"
                formatOptionLabel={e => FormatOptionsExecutiveGroup(e)}
                placeholder="Selecciona Ejecutivo"
                onChange={e => handleSelectEjecutives(e)}
                value={ejecutives.filter(item => item.id === queryNew["ejecutiveId"]?.id)}
                options={ejecutives}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categoría de interes</label>
              {/* 21/10/2022 se añadio categoria de interes */}
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleSelectQuery(e, "categoryId")}
                options={categories.results}
                value={categories.results.filter(item => item.id === queryNew["categoryId"]?.id)}
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
                options={clientsCompanies}
                value={clientsCompanies.results?.filter(item => item.id === queryNew["clientCompanyId"]?.id)}
                onChange={e => handleSelectCompanyclients(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.companyname} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Pagina web</label>
              <Select
                placeholder="Seleccione una Opcion"
                onChange={e => handleSelectQuery(e, "url")}
                options={filterWeb}
                value={filterWeb.filter(item => item.id === queryNew["url"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Facebook</label>
              <Select
                placeholder="Seleccione una opcion"
                onChange={e => handleSelectQuery(e, "facebook")}
                options={filterFacebook}
                value={filterFacebook.filter(item => item.id === queryNew["facebook"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
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
      <Modal
        open={openModal.activate}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {openModal.type == "restore" ? (
          modalRestore
        ) : (
          <ContainerModalDiscard>
            <div className="title">
              <p>Descartar Cliente</p>
            </div>
            <div className="containerBody">
              {body()}
              <div className="dialogContainer__buttons">
                <Button className="dialogContainer__buttons__cancel" color="primary" onClick={() => closeModal()}>
                  Cancelar
                </Button>
                {step >= 1 && (
                  <Button
                    className="dialogContainer__buttons__cancel"
                    onClick={() => {
                      if (step > 0) setStep(prev => prev - 1);
                    }}
                    color="primary"
                  >
                    Regresar
                  </Button>
                )}
                <Button
                  className="dialogContainer__buttons__acept"
                  color="primary"
                  onClick={handleSubmit(deleteClient)}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </ContainerModalDiscard>
        )}
      </Modal>
      <ShowProducts open={showOrder} onClose={closeProducts}>
        <div className="header">
          <p className="header__title">Ventas de {sales[0]?.prospect?.name} </p>
          <IconButton onClick={() => closeProducts()}>
            <Close className="header__icon" />
          </IconButton>
        </div>
        {isLoadingSales && (
          <DialogContent className="contenido">
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          </DialogContent>
        )}
        {!isLoadingSales && (
          <DialogContent className="contenido">
            {sales?.map((item, index) => (
              <Paper elevation={2} className="sale" key={index}>
                <div className="item">
                  <FiberManualRecord className="iconStatus" />
                  <p className="date capitalize">Venta #{index + 1}</p>
                </div>
                <div className="sale__infoName">
                  <p className="sale__infoName__title">Concepto:</p>
                  <p className="sale__infoName__info">{item.concept}</p>
                </div>

                <div className="amount">
                  <div className="amount__infoPrice">
                    <p className="amount__infoPrice__title">Monto:</p>
                    {formatNumber(item.amount)}
                  </div>
                </div>
                <div className="amount__infoQuantity">
                  <p className="amount__infoQuantity__title">Observaciones:</p>
                  {item.observations.slice(0, 80)}
                </div>
                <div className="buttonSale">
                  {item.isorder == false ? (
                    <Button
                      onClick={() => handleClickSelectedSales(item)}
                      className="OrderButton"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Realizar Pedido
                    </Button>
                  ) : (
                    <Button className="OrderButtonDisabled" variant="contained" color="primary" size="small" disabled>
                      Realizar Pedido
                    </Button>
                  )}
                </div>
              </Paper>
            ))}
          </DialogContent>
        )}
      </ShowProducts>
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
  prospectslabels: {
    id: null,
    name: null,
    type: "Etiqueta",
    show: false,
    identifier: "prospectslabels",
  },
  ejecutiveId: {
    id: null,
    name: null,
    type: "Ejecutivo",
    show: false,
    identifier: "ejecutiveId",
  },
  groupId: {
    id: null,
    name: null,
    type: "Grupo",
    show: false,
    identifier: "groupId",
  },
  url: {
    id: null,
    name: null,
    type: "Pagina web",
    show: false,
    identifier: "url",
  },
  facebook: {
    id: null,
    name: null,
    type: "Facebook",
    show: false,
    identifier: "facebook",
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

const filterWeb = [
  { id: "15251", name: "Con pagina web", value: true },
  { id: "15898", name: "sin pagina web", value: true },
];
const filterFacebook = [
  { id: "1525158", name: "Con Facebook", value: true },
  { id: "1589854", name: "Sin Facebook", value: true },
];
