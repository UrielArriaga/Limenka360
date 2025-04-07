import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Pagination } from "@material-ui/lab";
import Select from "react-select";
import { DialogContainer, DrawerContainer, ProspectosStyled, Error } from "../../../../styles/Propectos";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { EntitiesLocal } from "../../../../BD/databd";
import DrawerEditProspect from "../../../EditProspect";
import { useForm } from "react-hook-form";
import AddPending from "../../../ModalAddPendings";
import { normalizeTableDataProspect, normalizeTableDataProspectDiscarted } from "../../../../utils/normalizeData";
import TableComponent from "../../../TableDataComponent";
import WhatsappV2 from "../../../WhatsappV2";
import ModalTracking from "../../../ModalTracking";
import ModalDeleteProspect from "../../organism/ModalDeleteProspect";
import {
  Button,
  LinearProgress,
  TextField,
  Chip,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Tooltip,
  Badge,
  Grid,
  Box,
  Switch,
  withStyles,
  Collapse,
} from "@material-ui/core";
import {
  Add,
  FilterList,
  Close,
  People,
  SearchOutlined,
  Cached,
  Visibility,
  VisibilityOff,
  PeopleOutline,
  ExpandMore,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { colors } from "../../../../styles/global.styles";
import ModalTutorialOrder from "../../../ModalTutorialOrders";
import ModalReasigned from "../../../ModalReasigned";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import RequestCommon from "../../../../services/request_Common";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import DrawerProspects from "../../../DrawerProspects";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import ModalNoReassigned from "../../../ModalNoReassigned";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ProspectosManager() {
  const router = useRouter();
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();
  const { getCatalogBy } = useGlobalCommons();
  const { id_user, roleId, groupId, company } = useSelector(userSelector);
  const [Prospect, setProspect] = useState({});
  const [prospectsNew, setProspectsNew] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [showDrawer, setshowDrawer] = useState(false);
  const [showFilters, setshowFilters] = useState(false);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChips(!showChips);
  };

  // *  NECESARIOS
  const [openConfirmDelete, setopenConfirmDelete] = useState(false);
  const [openConfirmRestore, setopenConfirmRestore] = useState(false);
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(false);
  // *  NECESARIOS

  const [prospectsTable, setProspectsTable] = useState([]);

  // ! TO REMOVE
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  // ! TO REMOVE

  // ? EN CUESTIONAMIENTO
  const [ejecutives, setEjecutives] = useState([]);

  const [prospectPending, setProspectPending] = useState({});
  const [prospectSelected, setProspectSelected] = useState({});
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);

  // * To make request
  const [page, setPage] = useState(1);
  const [totalProspects, setTotalProspects] = useState(0);
  const [flag, setFlag] = useState(false);

  // * To make request

  const [queryNew, setQueryNew] = useState(initialQuery);

  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [filterDate, setFilterDate] = useState({
    applyFilter: false,
    identifier: "",
    label: "",
    filterby: "",
    value: "",
  });
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [phase, setPhase] = useState("");
  const [tag, setTag] = useState("");
  const [ejecutive, setEjecutive] = useState("");
  const optionDefault = {
    name: "Todos los Ejecutivos de mi grupo",
    lastname: "",
    id: "",
  };
  const [loadCities, setLoadCities] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [discarted, setDiscarted] = useState(false);
  const limit = 30;
  const totalPages = Math.ceil(totalProspects / limit);
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  //27/10/2022 se agrego el orden de los pendientes
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  //------////////////
  // 21/10/2022 se añadio categoria de interes
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  // ? NUEVOS CAMBIOS

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isMultiReasign, setIsMultiReasign] = useState(false);

  const { phases, categories, origins, clientTypes, specialties, channels, clientsCompanies } =
    useSelector(commonSelector);
  const [openReasing, setopenReasing] = useState(false);
  const [statusSearch, setStatusSearch] = useState(0);
  // ? NUEVOS CAMBIOS

  //Filtro para mostrar prospectos sin seguimiento
  const [filterTracking, setFilterTracking] = useState(false);
  //

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [openNoAdd, setOpenNoAdd] = useState(false);
  const [usersNoAdded, setUsersNoAdded] = useState([]);

  const handleCloseNoAdd = () => {
    setOpenNoAdd(false);
  };

  const handleOpenNoAdd = () => {
    setOpenNoAdd(true);
  };
  // * trae toda la data a mostrar junto con filtros
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getProspectManager();
      setisLoading(true);
    }
    return () => (mounted = false);
  }, [id_user, page, flag, orderby, ASC, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

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
    let mounted = true;
    const countNewProspect = async () => {
      try {
        let querynew = {};
        querynew.isclient = false;
        querynew.isoportunity = false;
        querynew.ejecutiveId = id_user;
        querynew.viewed = false;
        let newProspect = await api.get(`prospects?where=${JSON.stringify(querynew)}&limit=0&count=1`);
      } catch (error) {
        console.log(error);
      }
    };

    return () => (mounted = false);
  }, [refetch]);

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getUsers();
    };
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

  // * UTILS  OPEN
  const navigateCreateNew = () => router.push("/prospectos/nuevo");

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const normalizeProspect = prospects => {
    let newProspect = normalizeTableDataProspect(prospects);
    setProspectsTable(newProspect);
    setisLoading(false);
  };

  const normalizeDiscarted = prospects => {
    let newProspect = normalizeTableDataProspectDiscarted(prospects);
    setProspectsTable(newProspect);
    setisLoading(false);
  };

  // * UTILS CLOSE

  // * FUNTIONS

  // *****!!! TO DELETE

  // * REQUESTS  OPEN

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("prospectManager_keyord");
    if (searchkeyword) {
      setSearchKey(searchkeyword);
      setShowChips(true);
    }
    let ejecutives = localStorage.getItem("prospectManager_ejecutive");
    if (ejecutives) {
      setEjecutive(JSON.parse(ejecutives));
      setShowChips(true);
    }
    let query = localStorage.getItem("prospectManager_query");
    if (query) {
      let queryFormat = JSON.parse(query);
      if (queryFormat["discarted"].show === true) {
        setDiscarted(true);
      }
      if (queryFormat["viewed"]?.name === "Mostrar no visualizados") {
        setStatusSearch(1);
      }
      if (queryFormat["viewed"]?.name === "Mostrar visualizados") {
        setStatusSearch(2);
      }
      setQueryNew(queryFormat);
      setShowChips(true);
    }

    let orderby = localStorage.getItem("prospectManager_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }
    let asc = localStorage.getItem("prospectManager_asc");
    let newVariable = localStorage.getItem("NewOrderByManager_asc");
    if (newVariable === null) {
      localStorage.setItem("prospectManager_asc", JSON.stringify(false));
      localStorage.setItem("NewOrderByManager_asc", JSON.stringify(ASC));
      setASC(false);
    } else {
      if (asc) {
        setASC(JSON.parse(asc));
      }
    }

    let filterDateProspect = localStorage.getItem("prospectManager_date");
    if (filterDateProspect) {
      let dataFilter = JSON.parse(filterDateProspect);
      if (dataFilter.filterby === "Rango") {
        setDateStart(dayjs(dataFilter.value[0]).format("YYYY-MM-DD"));
        setDateFinish(dayjs(dataFilter.value[1]).format("YYYY-MM-DD"));
      } else {
        let searchValue = filterByDate.filter(item => item.label === dataFilter.label);
        if (searchValue.length > 0) dataFilter.value = searchValue[0].value;
      }
      setFilterDate(dataFilter);
    }

    let filterTrack = localStorage.getItem("prospectManager_filterTracking");
    if (filterTrack) {
      let filterData = JSON.parse(filterTrack);
      setFilterTracking(filterData);
    }

    setReadyLocalStorage(true);
  };
  const validateJoins = () => {
    let joins;
    if (tag !== "") {
      joins = "cat,ejecutive,cy,on,ce,sy,pl,pl,prospectslabels.label,ch";
    } else {
      joins = "cat,ejecutive,cy,on,ce,sy,pl,sy,pl,ch";
    }
    return joins;
  };

  const getProspectManager = async () => {
    if (readyLocalStorage === false) return;
    try {
      setIsMultiReasign(false);
      setCheckedUsers([]);

      let query = {};
      query.isclient = false;
      query.isoportunity = false;
      query.discarted = discarted;

      if (ejecutive.id) {
        query.ejecutiveId = ejecutive.id;
      } else {
        query.ejecutive = {
          groupId: groupId,
        };
      }

      //Filtro para mostrar prospectos sin seguimiento
      if (filterTracking) query.totalTrackings = { $eq: 1 };
      //

      if (hasValue(searchKey)) {
        saveDataLocalStorage(searchKey, "keyword", "prospectManager_keyword");
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
          if (propertyName === "prospectslabels") {
            query.prospectslabels = {
              label: { id: queryNew[propertyName].id },
            };
          } else {
            query[propertyName] = queryNew[propertyName].id;
          }
        }
      });

      if (filterDate.applyFilter) {
        query[filterDate.identifier] = { between: filterDate.value };
      }

      let include = "category,ejecutive,city,entity,clienttype,specialty,phase,channel";

      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: include,
      };

      params.join = validateJoins();
      let prospect = await api.get(`prospects`, { params });
      //Peticion contador prospectos no vistos ---->
      let queryCountNew = query;
      queryCountNew.viewed = false;
      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        all: 1,
        count: 1,
      };

      let countProspectNew = await api.get(`prospects`, { params: paramsCountNew });
      setProspectsNew(countProspectNew.data?.count);
      //<--------------------

      setTotalProspects(prospect.data.count);
      if (discarted == true) {
        normalizeDiscarted(prospect.data.results);
      } else {
        normalizeProspect(prospect.data.results);
      }
      saveDataLocalStorage(filterTracking, "filterTracking", "prospectManager_filterTracking");
      saveDataLocalStorage(queryNew, "query", "prospectManager_query");
      saveDataLocalStorage(orderby, "order", "prospectManager_order");
      saveDataLocalStorage(ASC, "asc", "prospectManager_asc");
      saveDataLocalStorage(ejecutive, "ejecutive", "prospectManager_ejecutive");
      saveDataLocalStorage(filterDate, "filterDate", "prospectManager_date");
    } catch (error) {
      console.log(error);
      setisLoading(false);
      console.log(error.response);
    }
  };

  // * HANDLERS

  // * paginacion
  const handleOnChangePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };

  const handleCloseConfirmRestore = () => {
    setProspect("");
    setopenConfirmRestore(false);
  };

  const restoreProspect = async () => {
    try {
      let update = {};
      update.status = 1;
      update.discarted = false;
      update.discartedreason = "";
      update.discartedbyId = null;
      update.reasonId = null;
      update.deletedAt = null;
      let deleteProspect = await api.put(`prospects/resetprospect/${Prospect.id}`, update);
      if (deleteProspect.status == 200) {
        handleCloseConfirmRestore();
        handleAlert("success", "Prospecto - Restablecido!", "basic");
        setValue("descarted", "");
        setFlag(!flag);
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se restablecio el prospecto!", "basic");
      console.log(error);
    }
  };

  // * obtiene las ciudades / municipios dependiendo el estado
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

  // * open filters
  const handleFilter = i => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(true);
    setFlag(!flag);
    if (i == undefined) {
      closeDrawerFilters();
    }

    // console.log(queryToSave);

    let propertiesName = Object.keys(queryNew);

    let queryFinal = queryNew;

    for (let i = 0; i < propertiesName.length; i++) {
      const element = propertiesName[i];
      // console.log("elemnt", element);
      if (queryFinal[element].name !== null) {
        queryFinal[element].show = true;
      }
    }
    if (queryFinal["viewed"]?.name === null) {
      setStatusSearch(0);
      setShowChips(true);
    }
    if (queryFinal["viewed"]?.name === "Mostrar no visualizados") {
      setStatusSearch(1);
      setShowChips(true);
    }
    if (queryFinal["viewed"]?.name === "Mostrar visualizados") {
      setStatusSearch(2);
      setShowChips(true);
    }
    setQueryNew(queryFinal);
  };

  // * drawer al seccionar un nombre

  const updatedView = async item => {
    try {
      await api.put(`prospects/${item.id}`, { viewed: true });
      for (let i = 0; i < prospectsTable.length; i++) {
        const element = prospectsTable[i];
        if (element.id == item.id) {
          element.viewed = true;
        }
      }
      setRefetch(!refetch);
      if (prospectsNew >= 1) {
        setProspectsNew(prev => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      let ejecutive = await commonApi.getUsers();
      let EjecutivesResults = ejecutive?.data?.results;
      setEjecutives(EjecutivesResults);
      setEjecutives(old => [optionDefault, ...old]);
    } catch (error) {
      console.log(error);
    }
  };

  // * Editar Prospecto

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => handleGlobalAlert(severity, message, type, dispatch);

  const handleSelectQueryDelete = identifier => {
    if (identifier === "discarted") {
      setDiscarted(false);
    }
    if (identifier === "prospectslabels") {
      setTag("");
    }
    if (identifier === "viewed") {
      setStatusSearch(0);
    }
    let queryItem = {};
    let queryToMutate = queryNew;
    queryItem["id"] = null;
    queryItem["name"] = null;
    queryItem["show"] = false;
    queryItem["identifier"] = identifier;

    queryToMutate[identifier] = {
      ...queryToMutate[identifier],
      ...queryItem,
    };

    setQueryNew({
      ...queryToMutate,
    });

    setFlag(!flag);
  };

  const handleSelectQuery = (e, identifier) => {
    let queryToMutation = queryNew;
    if (identifier == "discarted") {
      setDiscarted(true);
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
        if (queryToMutation["viewed"]?.name === "Mostrar no visualizados") return setStatusSearch(0);
      } else {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: e.value,
          name: e.label,
        };
        if (queryToMutation["viewed"]?.name === "Mostrar no visualizados") return setStatusSearch(1);
        if (queryToMutation["viewed"]?.name === "Mostrar visualizados") return setStatusSearch(2);
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
        if (identifier !== "channelId") {
          queryToMutation[identifier] = {
            ...queryToMutation[identifier],
            id: e.id,
            name: e.name,
          };
        } else {
          queryToMutation[identifier] = {
            ...queryToMutation[identifier],
            id: e.id,
            name: e.name,
            type: e.type,
            identifier: e.identifier,
          };
        }
      }
    }
    setQueryNew({ ...queryToMutation });
  };

  const handleSelectEjecutive = item => {
    let eje = {
      id: item.id,
      name: item.name,
      lastname: item.lastname,
      type: "Ejecutivo",
    };

    item !== "" ? setEjecutive(eje) : setEjecutive({});
  };
  const handleSelectChannel = item => {
    if (item !== null) {
      let canal = {
        id: item.id,
        name: item.name,
        type: "Canal",
        show: true,
        identifier: "channelId",
      };
      handleSelectQuery(canal, "channelId");
    }
  };

  const handleSelectPhase = item => {
    let phase = {
      value: item.id,
      label: item.name,
      type: "Fase",
    };
    item !== "" ? setPhase(phase) : setPhase({});
  };
  const handleSelectCompanyclients = item => {
    if (item !== null) {
      let clients = {
        id: item.id,
        name: item.companyname,
        type: "Empresa",
      };

      handleSelectQuery(clients, "clientCompanyId");
    } else {
      handleSelectQuery("", "clientCompanyId");
    }
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
    localStorage.removeItem("prospectManager_keyord");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const removeEjecutive = () => {
    setEjecutive("");
    localStorage.removeItem("prospectManager_ejecutive");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // * HandlesEvents Table
  const handleClickName = (item, isClickOpenPreview) => {
    if (!item.viewed) {
      updatedView(item);
    }

    if (isClickOpenPreview) {
      setProspect(item);
      setshowDrawer(true);
      setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
      setRefetchPendings(!refetchPendings);
      setFlagTrackings(!flagTrackings);
    } else {
      router.push({ pathname: "prospectos/[prospecto]", query: { prospecto: item.id } });
    }
  };

  const handleClickDiscardProspect = item => {
    setProspect(item);
    setopenConfirmDelete(!openConfirmDelete);
  };

  const handleClickReasingProspect = item => {
    setProspect(item);
    setIsMultiReasign(false);
    setopenReasing(!openReasing);
  };
  const handleClickEditProspect = item => {
    setprospectEdit(item.itemBD);
    setOpenEdit(!openEdit);
  };

  const handleClickConverToOportunity = item => {
    router.push({
      pathname: `/oportunidades/nuevo/`,
      query: { p: item.id },
    });
    dispatch(setArrayProducts([]));
  };

  const handleClickRestore = item => {
    setProspect(item);
    setopenConfirmRestore(true);
  };

  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(true);
  };

  const handleClickOpenWhatsApp = item => {
    setProspectSelected(item.itemBD);
    setOpenWhatsApp(true);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
  };

  // * HandlesEvents Table
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

  const handleClickReasingProspects = () => {
    setIsMultiReasign(true);
    setopenReasing(!openReasing);
  };

  const selectDeselectAll = () => {
    if (checkedUsers.length === prospectsTable.length) {
      setCheckedUsers([]);
    } else {
      setCheckedUsers(prospectsTable);
    }
  };

  const handleChangeUsersCheck = user => {
    if (!checkedUsers.find(currentChecked => currentChecked.id === user.id)) {
      setCheckedUsers(checkedUsers => [...checkedUsers, user]);
    } else {
      setCheckedUsers(checkedUsers => checkedUsers.filter(currentChecked => currentChecked.id !== user.id)); // Delete from array
    }
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

  return (
    <ProspectosStyled>
      <Head>
        <title>CRM JOBS - Prospectos</title>
      </Head>
      <div className="main">
        <div className="ctr_prospects">
          <div className="head">
            <div className="head__title">
              <Badge
                overlap="rectangular"
                color="primary"
                size="small"
                badgeContent={prospectsNew}
                max={99}
                showZero={false}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <h1>Prospectos</h1>
              </Badge>
              {/* <span>{prospectsNew}</span> */}
              <p className="total">
                <People onClick={() => console.log(queryNew)} />
                {`${totalProspects} Registros`}
                <Tooltip arrow title="Recargar" placement="right">
                  <Cached
                    className="reload"
                    onClick={() => {
                      setRefetch(!refetch);
                      setFlag(!flag);
                    }}
                  />
                </Tooltip>
              </p>
            </div>
            <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
              <Add />
              <p>Agregar Prospecto</p>
            </Button>
          </div>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={nameSearch}
                onChange={e => setNameSearch(e.target.value)}
                label={nameSearch !== "" && "Buscar prospecto"}
                placeholder="Ingresa Nombre o correo"
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
          {/* <div className="filters_chip">{Chips()}</div> */}

          <div className="filters_chip">
            {/* {valuecurrent.show && <p onClick={() => handleSelectQueryDelete("origin")}>asdsadasdsa curren origin</p>} */}
            {/* {phasevalueee.show && <p>asdasdasdasdsa current phase</p>} */}
            {showChips && (
              <>
                {ejecutive?.name && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeEjecutive}
                    label={`${ejecutive.name} ${ejecutive.lastname}`}
                    className="chip"
                  />
                )}
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

                {filterTracking && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setFilterTracking(false);
                      setFlag(!flag);
                    }}
                    label={"Prospectos sin Seguimiento"}
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
              </>
            )}
          </div>

          <Box className="ordersAndView">
            <div className="status">
              <div className="type" tabIndex="0">
                <Renderstatus status={statusSearch} />
                <ExpandMore className="more" />
              </div>

              <div className="menu">
                <li
                  tabIndex="1"
                  className={statusSearch === "nopublish" ? "listSelect" : "list"}
                  onClick={() => {
                    handleSelectQuery(null, "viewed");
                    handleFilter("view");
                  }}
                >
                  Todos
                </li>
                <li
                  tabIndex="1"
                  className={statusSearch === "nopublish" ? "listSelect" : "list"}
                  onClick={() => {
                    handleSelectQuery({ label: "Mostrar no visualizados", value: false }, "viewed");
                    handleFilter("view");
                  }}
                >
                  No Visualizados
                </li>
                <li
                  tabIndex="1"
                  className={statusSearch === "publish" ? "listSelect" : "list"}
                  onClick={() => {
                    handleSelectQuery({ label: "Mostrar visualizados", value: true }, "viewed");
                    handleFilter("view");
                  }}
                >
                  Visualizados
                </li>
              </div>
            </div>
            <OrderByProspects ASC={ASC} setASC={setASC} setOrderby={setOrderby} orderby={orderby} />
          </Box>
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
            <TableComponent
              data={prospectsTable}
              id="nombre"
              discartedTable={discarted}
              heads={discarted ? headsDiscarted : heads}
              secondaryColor="#dce1f6"
              primaryColor="#405189"
              handleClickName={handleClickName}
              handleClickAddTracking={handleClickAddTracking}
              handleClickEditProspect={handleClickEditProspect}
              handleClickAddPending={handleClickAddPending}
              handleClickConverToOportunity={handleClickConverToOportunity}
              handleClickDiscardProspect={handleClickDiscardProspect}
              handleClickReasingProspect={handleClickReasingProspect}
              handleClickRestore={handleClickRestore}
              handleClickOpenWhatsApp={handleClickOpenWhatsApp}
              checkedUsers={checkedUsers}
              handleChangeUsersCheck={handleChangeUsersCheck}
              handleClickReasingProspects={handleClickReasingProspects}
              selectDeselectAll={selectDeselectAll}
              canMultiAssign={true}
              handleAlert={handleAlert}
              setFlag={setFlag}
              flag={flag}
            />
          )}

          {prospectsTable.length > 0 && (
            <div className="ctr_prospects__tfooter">
              <div className="ctr_prospects__tfooter__ctr_button"></div>
              <div className="ctr_prospects__tfooter__ctr_pagination">
                <p className="">{`Total de Prospectos: ${totalProspects} Página: ${page} - ${Math.ceil(
                  totalProspects / limit
                )}`}</p>
                <div className="ctr_prospects__tfooter__ctr_pagination__pagination">
                  <Pagination
                    style={{ display: "flex", justifyContent: "center" }}
                    page={page}
                    defaultPage={1}
                    onChange={handleOnChangePage}
                    shape="rounded"
                    count={Math.ceil(totalProspects / limit)}
                    color="primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <WhatsappV2
        // idOportunity={idOportunity}
        prospect={prospectSelected}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
        isOportunity={false}
        isClient={false}
        isProspect={true}
        flag={flag}
        setFlag={setFlag}
      />
      <DrawerProspects
        width={"60%"}
        // 27/10/2022 se agrego el orden se los pendientes
        orderPendings={orderPendings}
        setOrderPendigs={setOrderPendigs}
        //-----------------//
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        prospectId={Prospect.id}
        refetch={refetchPendings}
        setRefetch={setRefetchPendings}
        flag={flagTrackings}
        setFlag={setFlagTrackings}
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
                options={filtersTypeDate}
                value={filtersTypeDate.filter(item => item.identifier === filterDate?.identifier)}
                onChange={event => handleValueFilterDate(event, "typeDate")}
                getOptionValue={option => option.identifier}
              />
              <Select
                className="selects"
                placeholder="Selecciona una Opción"
                options={filterByDate}
                value={filterByDate.filter(item => item.label === filterDate?.filterby)}
                onChange={event => handleValueFilterDate(event, "filterType")}
              />
              <Collapse in={filterDate?.filterby === "Rango" ? true : false}>
                <Grid className="range_dates" container={true} spacing={1}>
                  <Grid item={true} md={6}>
                    <p className="title_date">De</p>
                    <input
                      className="input_date"
                      type="date"
                      value={dateStart}
                      onChange={e => {
                        console.log("primera fecha", e.target.value);
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
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Zona geografica</label>
              <Select
                placeholder="Selecciona un Estado"
                onChange={e => handleSelectEntitie(e)}
                value={EntitiesLocal.filter(item => item.id === queryNew["entityId"]?.id)}
                options={EntitiesLocal}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              {citiesByEntity !== null && (
                <Select
                  placeholder="Selecciona una Ciudad"
                  onChange={e => handleSelectCity(e)}
                  isLoading={loadCities}
                  options={citiesByEntity}
                  value={citiesByEntity?.filter(item => item.id === queryNew["cityId"]?.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} `}
                />
              )}
            </div>

            {/* 21/10/2022 se oculto el filtro de ejecutivo a role ejecutivo */}

            {roleId !== "ejecutivo" && (
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Ejecutivo o Grupo</label>
                <Select
                  placeholder="Selecciona un Ejecutivo"
                  onChange={e => (e === null ? handleSelectEjecutive("") : handleSelectEjecutive(e))}
                  isClearable={true}
                  formatOptionLabel={FormatOptionLabel}
                  value={ejecutives.filter(item => item.id === ejecutive?.id)}
                  options={ejecutives}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                />
              </div>
            )}

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categoría de interes</label>
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleSelectQuery(e, "categoryId")}
                onMenuOpen={() => getCatalogBy("categories")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={categories.isFetching}
                options={categories.results}
                isClearable={true}
                value={categories.results.filter(item => item.id === queryNew["categoryId"].id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Origen</label>
              <Select
                placeholder="Seleccione un origen"
                onChange={e => handleSelectQuery(e, "originId")}
                onMenuOpen={() => getCatalogBy("origins")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={origins.isFetching}
                options={origins.results}
                isClearable={true}
                value={origins.results.filter(item => item.id === queryNew["originId"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fase</label>
              <Select
                placeholder="Seleccione una fase"
                onMenuOpen={() => getCatalogBy("phases")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={phases.isFetching}
                onChange={e => {
                  e === null ? handleSelectPhase("") : handleSelectPhase(e);
                  handleSelectQuery(e, "phaseId");
                }}
                isClearable={true}
                options={phases.results}
                value={phases.results.filter(item => item.id === queryNew["phaseId"].id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Género</label>
              <Select
                placeholder="Seleccione una género"
                isSearchable={true}
                isClearable={false}
                options={filtergenders}
                value={filtergenders.filter(item => item.value === queryNew["gender"]?.id)}
                onChange={e => handleSelectQuery(e, "gender")}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Compañia</label>
              <Select
                placeholder="Selecciona Compañia"
                onChange={e => handleSelectCompanyclients(e)}
                isClearable={false}
                onMenuOpen={() => getCatalogBy("clientsCompanies")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientsCompanies.isFetching}
                value={clientsCompanies.results.filter(item => item.id === queryNew["clientCompanyId"]?.id)}
                options={clientsCompanies.results}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.companyname} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de cliente</label>
              <Select
                className="drawer_container__form__containerSelect__select"
                placeholder="Selecciona el Tipo de Cliente"
                onChange={e => handleSelectQuery(e, "clientTypeId")}
                isClearable={false}
                onMenuOpen={() => getCatalogBy("clientTypes")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientTypes.isFetching}
                value={clientTypes.results.filter(item => item.id === queryNew["clientTypeId"]?.id)}
                options={clientTypes.results}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Especialidad</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                isLoading={specialties.isFetching}
                options={specialties.results}
                onMenuOpen={() => getCatalogBy("specialties")}
                loadingMessage={() => "Cargando Opciones..."}
                value={specialties.results.filter(item => item.id === queryNew["specialtyId"]?.id)}
                onChange={e => handleSelectQuery(e, "specialtyId")}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Canal</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                isLoading={channels.isFetching}
                onMenuOpen={() => getCatalogBy("channels")}
                loadingMessage={() => "Cargando Opciones..."}
                options={channels.results}
                onChange={e => handleSelectChannel(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Descartados</label>
              <Select
                placeholder="Seleccione una opción"
                options={filterDescarted}
                isClearable={true}
                value={filterDescarted.filter(item => item.value === queryNew["discarted"]?.id)}
                onChange={e => handleSelectQuery(e, "discarted")}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Vistos</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                options={filterViewed}
                value={filterViewed.filter(item => item.value === queryNew["viewed"]?.id)}
                onChange={e => handleSelectQuery(e, "viewed")}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Prospectos sin Seguimiento</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                value={filterTracking}
                options={[{ label: "Mostrar", value: true }]}
                onChange={e => setFilterTracking(e)}
              />
            </div>
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
      <DrawerEditProspect
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        prospectEdit={prospectEdit}
        setFlag={() => setFlag(!flag)}
      />

      <ModalDeleteProspect
        openConfirmDelete={openConfirmDelete}
        setopenConfirmDelete={setopenConfirmDelete}
        Prospect={Prospect}
        setProspect={setProspect}
        setFlag={setFlag}
        flag={flag}
      />

      <ModalReasigned
        open={openReasing}
        setopen={setopenReasing}
        Prospect={Prospect.itemBD}
        setProspect={setProspect}
        setFlag={setFlag}
        flag={flag}
        isMultiReasign={isMultiReasign}
        setIsMultiReasign={setIsMultiReasign}
        prospects={checkedUsers}
        handleOpenNoAdd={handleOpenNoAdd}
        setNoAdded={setUsersNoAdded}
      />

      <DialogContainer
        open={openConfirmRestore}
        onClose={handleCloseConfirmRestore}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="title" id="alert-dialog-title">
          {"¿Estas seguro de esto?"}
        </DialogTitle>
        <DialogContent className="containerBody">
          <DialogContentText className="DialogText" id="alert-dialog-description">
            Se restablecera el prospecto en tu registros.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="buttons">
          <Button className="cancel" onClick={handleCloseConfirmRestore} color="primary">
            Cancelar
          </Button>
          <Button className="acept" onClick={() => restoreProspect()} type="submit" color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </DialogContainer>

      <AddPending
        oportunity={false}
        prospect={prospectPending}
        open={showAddPending}
        close={handleCloseAddPending}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
      />
      <ModalTracking
        prospect={prospectTrackings}
        open={showAddTrackings}
        close={handleCloseAddTrackigns}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={flag}
        setFlag={setFlag}
        prospectEdit={prospectTrackings}
      />

      <ModalNoReassigned open={openNoAdd} handleCloseNoAdd={handleCloseNoAdd} usersNoAdded={usersNoAdded} />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}

      <ModalTutorialOrder />
    </ProspectosStyled>
  );
}
function OrderByProspects({ ASC, setASC, orderby, setOrderby }) {
  return (
    <>
      <div>
        <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
        <select
          className="order-select"
          onChange={e => setOrderby(e.target.value)}
          // defaultValue={orderby}
          value={orderby}
          name=""
          id=""
          style={{ marginRight: 5 }}
        >
          <option value="lastTrackingcreatedAt" name="Ultimo seguimiento">
            Ultimo seguimiento
          </option>
          <option
            value="createdAt"
            name="Fech
                  a de creacion"
          >
            Fecha de creacion
          </option>

          <option
            value="updatedAt"
            name="Fech
                  a de creacion"
          >
            Fecha de actualizacion
          </option>
          <option value="viewed" name="Visualizados">
            Visualizados
          </option>
        </select>
      </div>
      <div className="orderAsc">
        <p style={{ fontSize: 11 }}>Ascendente</p>

        <PurpleSwitch
          checked={ASC}
          onChange={e => {
            setASC(e.target.checked);
          }}
          name="checkedC"
        />

        <p style={{ fontSize: 11 }}>Descendente</p>
      </div>
    </>
  );
}
const Renderstatus = ({ status }) => {
  if (status === undefined || status === null) return null;
  switch (status) {
    case 0:
      return (
        <Box display="flex" alignItems="center">
          <PeopleOutline className="iconAll" />
          <p className="titles" style={{ fontSize: 13 }}>
            Todos
          </p>
        </Box>
      );
    case 1:
      return (
        <Box display="flex" alignItems="center">
          <VisibilityOff className="iconOff" />
          <p className="titles">No visualizados</p>
        </Box>
      );
    case 2:
      return (
        <Box display="flex" alignItems="center">
          <Visibility className="iconOn" />
          <p className="titles">Visualizados</p>
        </Box>
      );

    default:
      return null;
  }
};
const filterDescarted = [{ label: "Mostrar Descartados", value: true }];
const ejecutiveGroup = [
  {
    id: "25125",
    name: "Mostrar ejecutivos de mi grupo",
    lastname: "",
    fullname: "",
    email: "",
    phone: "5548168969",
    optionalphone: "",
    password: "$2a$10$nicofdIoE/FOMUhJle5W9eIPDEOSwbOPDJgBqyj/SPTlauqiDsOn.",
    isonline: false,
    photo: "",
    isactive: true,
    username: "ANVA",
    oportcount: 0,
    isverified: true,
    title: "",
    createdAt: "2022-10-11T15:49:54.017Z",
    updatedAt: "2022-12-08T17:30:58.382Z",
    roleId: "62d94hH7xnfeqrfYLLDSKAtR",
    groupId: "APTLWB1HPy3Atzb8Hmi9kVpg",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
];

const filterViewed = [
  { label: "Mostrar no visualizados", value: false },
  { label: "Mostrar visualizados", value: true },
];

const FiltersOrder = [
  { label: "Hoy", value: "day" },
  { label: "Semana", value: "week" },
  { label: "Mes", value: "month" },
  { label: "Rango", value: "range" },
];

const filtergenders = [
  { label: "Hombre", value: "Hombre" },
  { label: "Mujer", value: "Mujer" },
];

const heads = [
  "id",
  "nombre",
  "correo",
  "movil",
  "teléfono",
  "ejecutivo",
  "categoria de interés",
  "código de producto",
  "género",
  "puesto",
  "estado",
  "comentarios",
  // "codigo postal",
  // "colonia",
  "calle",
  "título",
  "canal",
  "web",
  "facebook",
  "google maps",
  "fecha de creación",
  "ultima actualización",
];

// 21/10/2022 se añadio categoria de interes
const headsDiscarted = [
  "id",
  "nombre",
  "correo",
  "motivo de descarte",
  "movil",
  "categoría de interés",
  "código de producto",
  "fecha de descartado",
];

const initialQuery = {
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
  categoryId: {
    id: null,
    name: null,
    type: "Categoria",
    show: false,
    identifier: "categoryId",
  },
  originId: {
    id: null,
    name: null,
    type: "Origen",
    show: false,
    identifier: "originId",
  },
  phaseId: {
    id: null,
    name: null,
    type: "Fase",
    show: false,
    identifier: "phaseId",
  },

  gender: {
    id: null,
    name: null,
    type: "Género",
    show: false,
    identifier: "gender",
  },

  clientCompanyId: {
    id: null,
    name: null,
    type: "Empresa",
    show: false,
    identifier: "clientCompanyId",
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
  channelId: {
    id: null,
    name: null,
    type: "Canal",
    show: false,
    identifier: "channelId",
  },
  discarted: {
    id: null,
    name: null,
    type: "Descartados",
    show: false,
    identifier: "discarted",
  },
  viewed: {
    id: null,
    name: null,
    type: "Vistos",
    show: false,
    identifier: "viewed",
  },
  ejecutiveId: {
    id: null,
    name: null,
    type: "Grupo",
    show: false,
    identifier: "ejecutiveId",
  },
  prospectslabels: {
    id: null,
    name: null,
    type: "Etiqueta",
    show: false,
    identifier: "prospectslabels",
  },
};

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

const filtersTypeDate = [
  {
    label: "Ultimo Seguimiento",
    identifier: "lastTrackingcreatedAt",
  },
  {
    label: "Fecha de Creación",
    identifier: "createdAt",
  },
  {
    label: "Fecha de Actualización",
    identifier: "updatedAt",
  },
];

const filterByDate = [
  {
    identifier: "month",
    label: "Mes",
    value: [dayjs().startOf("month").format(), dayjs().endOf("month").format()],
  },
  {
    identifier: "week",
    label: "Semana",
    value: [dayjs().startOf("week").format(), dayjs().endOf("week").format()],
  },
  {
    identifier: "day",
    label: "Hoy",
    value: [dayjs().startOf("day").format(), dayjs().endOf("day").format()],
  },
  {
    identifier: "range",
    label: "Rango",
    value: null,
  },
];
