import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Pagination } from "@material-ui/lab";
import Select from "react-select";
import DrawerProspectsAdminSales from "../../organism/PreviewProspectAdminSales";
import { DialogContainer, DrawerContainer, ProspectosAdmiStyles, Error } from "../../../../styles/AdministracionVentas";
import { toUpperCaseChart } from "../../../../utils";
import { EntitiesLocal } from "../../../../BD/databd";
import DrawerEditProspect from "../../../EditProspect";
import { useForm } from "react-hook-form";
import AddPending from "../../../ModalAddPendings";
import { normalizeTableDataProspect, normalizeTableDataProspectDiscarted } from "../../../../utils/normalizeData";

import WhatsappV2 from "../../../WhatsappV2";
import ModalTracking from "../../../ModalTracking";
import { useDispatch } from "react-redux";
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
} from "@material-ui/core";
import { FilterList, Close, People, SearchOutlined, Cached } from "@material-ui/icons";
import dayjs from "dayjs";
import { colors, StyleExecutiveGroup, StyleGroup } from "../../../../styles/global.styles";

import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import RequestCommon from "../../../../services/request_Common";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import {
  commonSelector,
  getCategoriesCommon,
  getClientTypesCommon,
  getOriginsCommon,
  getPhasesCommon,
  getSpecialtiesCommon,
} from "../../../../redux/slices/commonSlice";

import ModalNoReassigned from "../../../ModalNoReassigned";
import ReasignedAdminS from "../../atoms/ReasignModalAdminSales";
import TableComponentAdminSales from "../../../TableDataProspectsAdminSales";
import ModalReasignedProspect from "../../organism/ModalReasignProspectSales";

export default function ProspectosAdministracion() {
  const router = useRouter();
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();

  const { id_user } = useSelector(userSelector);
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
  const [ASC, setASC] = useState(true);
  const [showDiscartedProspects, setShowDiscartedProspects] = useState(false);
  // *  NECESARIOS

  const [prospectsTable, setProspectsTable] = useState([]);

  // ! TO REMOVE
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospectsBD, setProspectsBD] = useState([]);
  // ! TO REMOVE

  // ? EN CUESTIONAMIENTO
  const [tags, setTags] = useState([]);
  const [clientsCompanies, setClientsCompanies] = useState([]);
  const [ejecutives, setEjecutives] = useState([]);
  const [ejecutivesBackup, setEjecutivesBackup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [prospectPending, setProspectPending] = useState({});
  const [prospectSelected, setProspectSelected] = useState({});
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);

  // * To make request
  const [page, setPage] = useState(1);
  const [totalProspects, setTotalProspects] = useState(0);
  const [flag, setFlag] = useState(false);
  const [order, setOrder] = useState("createdAt");

  // * To make request

  const [queryNew, setQueryNew] = useState(initialQuery);

  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [viewOption, setViewOption] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [tag, setTag] = useState("");
  const [ejecutive, setEjecutive] = useState("");

  const filterDescarted = [{ id: 1, label: "Mostrar Descartados", value: true }];
  const [loadCities, setLoadCities] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const limit = 30;
  const [selectedTags, setSelectedTags] = useState([]);
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  //27/10/2022 se agrego el orden de los pendientes
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  // ? NUEVOS CAMBIOS

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isMultiReasign, setIsMultiReasign] = useState(false);

  const { phases, categories, origins, clientTypes, specialties, channels } = useSelector(commonSelector);
  const [openReasing, setopenReasing] = useState(false);
  // ? NUEVOS CAMBIOS
  const {
    register,
    handleSubmit,
    setValue,
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
      getProspectsAdminSales();
      setisLoading(true);
    }
    return () => (mounted = false);
  }, [id_user, page, flag, orderby, ASC, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getClientscompanies();
      getLabels();
      getExecutivesWithGroup();
      getGroups();
      getPhases();
      getCategories();
      getOrigins();
      getTypeClients();
      getSpecialties();
    };
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

  // * UTILS  OPEN
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
    let searchkeyword = localStorage.getItem("prospectAdminSales_keyord");
    if (searchkeyword) {
      setSearchKey(searchkeyword);
      setShowChips(true);
    }
    let ejecutives = localStorage.getItem("prospectAdminSales_ejecutive");
    if (ejecutives) {
      setEjecutive(JSON.parse(ejecutives));
      setShowChips(true);
    }
    let query = localStorage.getItem("prospectAdminSales_query");
    if (query) {
      let queryFormat = JSON.parse(query);
      if (queryFormat["discarted"].show === true) {
        setShowDiscartedProspects(true);
      }
      setQueryNew(JSON.parse(query));
      setShowChips(true);
    }

    let orderby = localStorage.getItem("prospectAdminSalesr_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("prospectAdminSales_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }

    let date = localStorage.getItem("prospectAdminSales_date");
    if (date) {
      let toObject = JSON.parse(date);

      if (toObject.value !== null || toObject.value !== undefined) {
        setViewOption({ label: toObject.label, value: toObject.value });
      } else {
        setViewOption("");
      }

      if (toObject.value === "range") {
        setDateStart(dayjs(toObject.startrange));
        setDateFinish(dayjs(toObject.finishrange));
      }
    }

    setReadyLocalStorage(true);
  };
  const validateJoins = () => {
    let joins;
    if (tag !== "") {
      joins = "cat,cy,ey,pe,ejecutive,cy,on,ce,sy,pl,prospectslabels,prospectslabels.label,ch";
    } else {
      joins = "cat,cy,ey,pe,ejecutive,cy,on,ce,sy,pl,sy,pl,ch";
    }
    return joins;
  };

  const getProspectsAdminSales = async () => {
    if (readyLocalStorage === false) return;
    try {
      setIsMultiReasign(false);
      setCheckedUsers([]);
      let query = {};
      query.isclient = false;
      query.isoportunity = false;
      query.discarted = showDiscartedProspects;
      if (hasValue(searchKey)) {
        saveDataLocalStorage(searchKey, "keyword", "prospectAdminSales_keyword");
        if (searchKey.includes("@")) {
          query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchKey.trim())) {
          query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else {
          query.fullname = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }
      } else {
        setSearchKey("");
      }
      Object.keys(queryNew).forEach((propertyName, index) => {
        if (queryNew[propertyName].show === true) {
          switch (propertyName) {
            case "prospectslabels":
              query.prospectslabels = {
                labelId: queryNew[propertyName].id,
              };
              break;
            case "groupId":
              query.ejecutive = {
                groupId: queryNew[propertyName].id,
              };
              break;
            case "url":
              if (queryNew[propertyName].name === "Con pagina web") {
                query.url = {
                  ne: "",
                };
              } else {
                query.url = "";
              }
              break;
            case "facebook":
              if (queryNew[propertyName].name === "Con Facebook") {
                query.facebook = {
                  ne: "",
                };
              } else {
                query.facebook = "";
              }
              break;

            default:
              query[propertyName] = queryNew[propertyName].id;
              break;
          }
        }
      });
      if (viewOption.value) {
        query[orderby] = { between: normalizeDateQuery(viewOption.value) };
      }

      let includes =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel";
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: includes,
        subquery: "1",
      };

      params.join = validateJoins();
      let prospect = await api.get(`prospects`, { params });

      let queryCountNew = query;

      queryCountNew.viewed = false;

      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        limit: 0,
        count: 1,
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: includes,
        subquery: "1",
      };

      paramsCountNew.join = validateJoins();

      let countProspectNew = await api.get(`prospects`, { params: paramsCountNew });

      setProspectsNew(countProspectNew.data?.count);

      // TODO Count no viewed

      let queryCountViewed = query;

      queryCountViewed.viewed = true;

      let paramsCountViewed = {
        where: JSON.stringify(queryCountViewed),
        limit: 0,
        count: 1,
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: includes,
        subquery: "1",
      };

      paramsCountViewed.join = validateJoins();

      let countProspectViewed = await api.get(`prospects`, { params: paramsCountViewed });

      setProspectsBD(prospect.data.results);
      setTotalProspects(prospect.data.count);
      if (showDiscartedProspects == true) {
        normalizeDiscarted(prospect.data.results);
      } else {
        normalizeProspect(prospect.data.results);
      }
      saveDataLocalStorage(queryNew, "query", "prospectAdminSales_query");
      saveDataLocalStorage(orderby, "order", "prospectAdminSales_order");
      saveDataLocalStorage(ASC, "asc", "prospectAdminSales_asc");
      saveDataLocalStorage(ejecutive, "ejecutive", "prospectAdminSales_ejecutive");
      saveDataLocalStorage(
        {
          label: viewOption.label,
          value: viewOption.value,
          startrange: dateStart,
          finishrange: dateFinish,
        },
        "prospectAdminSales_date",
        "prospectAdminSales_date"
      );
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  // * HANDLERS
  const handleSelectOrder = item => {
    setViewOption(item);
    switch (item.value) {
      case "updatedAt":
        setOrder("updatedAt");
        break;
      case "lastTrackingcreatedAt":
        setOrder("lastTrackingcreatedAt");
        break;
      case "viewed":
        setOrder("viewed");
        break;
      default:
        setOrder("createdAt");
        break;
    }
  };

  // * paginacion
  const handleOnChangePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };

  const handleCloseConfirmDelete = () => {
    setProspect("");
    setopenConfirmDelete(false);
    setStep(0);
    setValue("descarted", "");
  };

  const handleCloseConfirmRestore = () => {
    setProspect("");
    setopenConfirmRestore(false);
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
  const handleFilter = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(true);
    setFlag(!flag);
    closeDrawerFilters();

    let propertiesName = Object.keys(queryNew);

    let queryFinal = queryNew;

    for (let i = 0; i < propertiesName.length; i++) {
      const element = propertiesName[i];

      if (queryFinal[element].name !== null) {
        queryFinal[element].show = true;
      }
    }

    setQueryNew(queryFinal);
  };

  // * drawer al seccionar un nombre
  const handleAction = item => {
    setProspect(item);
    setshowDrawer(true);
    //27/10/2022 se agrego el orden de los pendientes
    setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
    ///--------------///
    if (!item.viewed) {
      updatedView(item);
    }
  };

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

  const getLabels = async () => {
    try {
      let tag = await commonApi.getLabels();
      setTags(tag?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getExecutivesWithGroup = async () => {
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
      setEjecutivesBackup(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
      };
      let response = await api.get(`groups`, { params });
      setGroups(response?.data?.results);
    } catch (error) {}
  };

  const getPhases = async () => {
    try {
      let bodyPhases = {
        all: 1,
        order: "name",
      };
      dispatch(
        getPhasesCommon({
          params: bodyPhases,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      let bodyCategories = {
        all: 1,
        order: "name",
      };
      dispatch(
        getCategoriesCommon({
          params: bodyCategories,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getOrigins = async () => {
    try {
      let bodyOrigins = {
        all: 1,
        order: "name",
      };
      dispatch(
        getOriginsCommon({
          params: bodyOrigins,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTypeClients = async () => {
    try {
      let bodyTypeClients = {
        all: 1,
        order: "name",
      };
      dispatch(
        getClientTypesCommon({
          params: bodyTypeClients,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecialties = async () => {
    try {
      let bodySpecialties = {
        all: 1,
        order: "name",
      };
      dispatch(
        getSpecialtiesCommon({
          params: bodySpecialties,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getClientscompanies = async () => {
    try {
      let query = {};
      let clientsCompany = await commonApi.getClientsCompanies(query);
      let response = clientsCompany.data.results;
      for (let i = 0; i < response.length; i++) {
        response[i].name = response[i].companyname;
      }
      setClientsCompanies(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  // * Editar Prospecto

  const handleEdit = item => {
    let editProspect = prospectsBD.filter(i => i.id == item.id);
    setprospectEdit(editProspect[0]);
    setOpenEdit(!openEdit);
  };

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const handleSelectQueryDelete = identifier => {
    switch (identifier) {
      case "discarted":
        setShowDiscartedProspects(false);
        break;
      case "prospectslabels":
        setTag("");
        break;
      case "groupId":
        setEjecutives(ejecutivesBackup);
        break;
      default:
        break;
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

  const handleSelectEjecutive = executive => {
    if (executive) {
      let exe = {
        id: executive.id,
        name: executive?.name + " " + executive?.lastname,
        type: "Ejecutivo",
      };
      handleSelectQuery(exe, "ejecutiveId");
    } else {
      handleSelectQuery(null, "ejecutiveId");
    }
  };

  const handleSelectDiscarted = discarted => {
    if (discarted) {
      let bodyDiscarted = {
        id: discarted.id,
        name: discarted?.label,
        type: "Descartados",
      };

      handleSelectQuery(bodyDiscarted, "discarted");
    } else {
      handleSelectQuery(null, "discarted");
    }
  };

  const handleSelectGroup = group => {
    if (group) {
      let bodyGroup = {
        id: group.id,
        name: group.name,
        type: "Grupo",
      };
      let filterExecutivesByGroup = ejecutivesBackup.filter(item => item.groupId === group.id);
      setEjecutives(filterExecutivesByGroup);
      handleSelectQuery(bodyGroup, "groupId");
    } else {
      setEjecutives(ejecutivesBackup);
      handleSelectQuery(null, "groupId");
    }
  };

  const handleSelectPhase = phase => {
    if (phase) {
      let phaseBody = {
        id: phase.id,
        name: phase.name,
        type: "Fase",
      };
      handleSelectQuery(phaseBody, "phaseId");
    } else {
      handleSelectQuery(null, "phaseId");
    }
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
  const handleSelectEntitie = entity => {
    if (entity) {
      let bodyEntity = {
        id: entity.id,
        name: entity.name,
        type: "Entidad",
      };
      getCities(entity.id);
      handleSelectQuery(bodyEntity, "entityId");
    } else {
      setCitiesByEntity([]);
      handleSelectQuery(null, "entityId");
    }
  };
  const handleSelectCity = city => {
    if (city) {
      let bodyCity = {
        id: city.id,
        name: city.name,
        type: "Ciudad",
      };
      handleSelectQuery(bodyCity, "cityId");
    } else {
      handleSelectQuery(null, "cityId");
    }
  };
  const handleSelectTags = item => {
    if (item !== null) {
      let tag = {
        id: item.id,
        name: item.label,
      };
      if (item !== "") {
        setTag(tag);
        handleSelectQuery(tag, "prospectslabels");
      } else {
        setTag({});
      }
    }
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("prospectAdminSales_keyord");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const removeEjecutive = () => {
    setEjecutive("");
    localStorage.removeItem("prospectAdminSales_ejecutive");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeViewed = () => {
    setDateStart("");
    setDateFinish("");
    setViewOption("");
    setOrder("createdAt");
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

  const handleSelectAll = () => {
    setSelectedTags(prospectsBD);
  };

  const handleSearch = e => {
    if (!e.target.value) {
      setFlag(!flag);
      setPage(1);
      setNameSearch("");
      setSearchKey("");
    }
    setNameSearch(e.target.value);
  };

  return (
    <ProspectosAdmiStyles>
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
                <People />
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
          </div>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={nameSearch}
                onChange={handleSearch}
                label={nameSearch !== "" && "Buscar prospecto"}
                placeholder="Ingresa Nombre o correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
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
              <>
                {searchKey !== "" && (
                  <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
                )}
                {viewOption?.label && dayjs(dateStart).isValid() && dayjs(dateFinish).isValid() && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeViewed}
                    label={`${"Fecha"}: ${viewOption.label} 
                    ${
                      viewOption?.value == "range"
                        ? `de  ${dayjs(dateStart).format("DD/MM/YYYY")} - ${dayjs(dateFinish).format("DD/MM/YYYY")}`
                        : ""
                    }                                        
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
                        label={`${queryNew[item].type}: ${queryNew[item].name}`}
                        className="chip"
                      />
                    );
                  }
                  return null;
                })}
              </>
            )}
          </div>

          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
              <Box>
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
                  }}
                  name="checkedC"
                />
              </Grid>
              <Grid item>
                <p style={{ fontSize: 11 }}>Descendente</p>
              </Grid>
            </Grid>
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
            <TableComponentAdminSales
              data={prospectsTable}
              id="nombre"
              discartedTable={showDiscartedProspects}
              heads={showDiscartedProspects ? headsDiscarted : heads}
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
        prospect={prospectSelected}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
        isOportunity={false}
        isClient={false}
        isProspect={true}
      />
      <DrawerProspectsAdminSales
        width={"60%"}
        orderPendings={orderPendings}
        setOrderPendigs={setOrderPendigs}
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        prospectId={Prospect.id}
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
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fecha</label>
              <Select
                isSearchable={false}
                isClearable={true}
                theme={theme => ({
                  ...theme,
                  borderRadius: "6px",
                  colors: { ...theme.colors, primary: "#405189" },
                })}
                placeholder="Selecciona un Periodo"
                options={FiltersOrder}
                value={viewOption?.labe ? viewOption?.label : viewOption}
                onChange={e => (e === null ? handleSelectOrder("") : handleSelectOrder(e))}
              />
              <div className="ctr_drawer__ctr_inputs__input">
                {viewOption.label === "Rango" && (
                  <>
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
                          <Error>
                            <p className="alert_title">La fecha Final del Rango no puede ser Menor a la Inicial</p>
                          </Error>
                        )}
                        {dateStart == dateFinish && (
                          <Error>
                            <p className="alert_title">No hay un rango de fechas, selecciona otro periodo diferente</p>
                          </Error>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
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

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Grupo</label>
              <Select
                placeholder="Selecciona un Grupo"
                onChange={e => handleSelectGroup(e)}
                isClearable={true}
                formatOptionLabel={FormatOptionsGroup}
                value={groups.filter(item => item.id === queryNew["groupId"].id)}
                options={groups}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name}`}
                noOptionsMessage={() => "Sin Grupos"}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Ejecutivo</label>
              <Select
                placeholder="Selecciona un Ejecutivo"
                onChange={e => handleSelectEjecutive(e)}
                isClearable={true}
                formatOptionLabel={e => FormatOptionsExecutiveGroup(e)}
                value={ejecutives.filter(item => item.id === queryNew["ejecutiveId"].id)}
                options={ejecutives}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                noOptionsMessage={() => "Sin Ejecutivos"}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categoría de interes</label>
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleSelectQuery(e, "categoryId")}
                options={categories.results}
                isClearable={true}
                value={categories.results.filter(item => item.id === queryNew["categoryId"].id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
                noOptionsMessage={() => "Sin Categorias de Interés"}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Origen</label>
              <Select
                placeholder="Seleccione un origen"
                onChange={e => handleSelectQuery(e, "originId")}
                options={origins.results}
                isClearable={true}
                value={origins.results.filter(item => item.id === queryNew["originId"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                noOptionsMessage={() => "Sin Origenes"}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label" onClick={() => getPhases()}>
                Fase
              </label>
              <Select
                placeholder="Seleccione una fase"
                onChange={e => handleSelectPhase(e)}
                isClearable={true}
                options={phases.results}
                value={phases.results.filter(item => item.id === queryNew["phaseId"].id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                noOptionsMessage={() => "Sin Fases"}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Género</label>
              <Select
                placeholder="Seleccione una género"
                isSearchable={true}
                isClearable={true}
                options={filtergenders}
                value={filtergenders.filter(item => item.value === queryNew["gender"]?.id)}
                onChange={e => handleSelectQuery(e, "gender")}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Compañia</label>
              <Select
                placeholder="Selecciona Compañia"
                onChange={e => handleSelectQuery(e, "clientCompanyId")}
                isClearable={true}
                value={clientsCompanies.filter(item => item.id === queryNew["clientCompanyId"]?.id)}
                options={clientsCompanies}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.companyname} `}
                noOptionsMessage={() => "Sin Compañias"}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de cliente</label>
              <Select
                className="drawer_container__form__containerSelect__select"
                placeholder="Selecciona el Tipo de Cliente"
                onChange={e => handleSelectQuery(e, "clientTypeId")}
                isClearable={true}
                value={clientTypes.results.filter(item => item.id === queryNew["clientTypeId"]?.id)}
                options={clientTypes.results}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                noOptionsMessage={() => "Sin Tipos de Cliente"}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Especialidad</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                options={specialties.results}
                value={specialties.results.filter(item => item.id === queryNew["specialtyId"]?.id)}
                onChange={e => handleSelectQuery(e, "specialtyId")}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
                noOptionsMessage={() => "Sin Especialidades"}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Canal</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                options={channels.results}
                value={channels.results.filter(item => item.id === queryNew["channelId"]?.id)}
                onChange={e => handleSelectChannel(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Página Web</label>
              <Select
                placeholder="Seleccione una opcion"
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

      <ModalReasignedProspect
        openConfirmDelete={openConfirmDelete}
        setopenConfirmDelete={setopenConfirmDelete}
        Prospect={Prospect}
        setProspect={setProspect}
        setFlag={setFlag}
        flag={flag}
      />

      <ReasignedAdminS
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
    </ProspectosAdmiStyles>
  );
}

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
  "categoria de interés",
  "código de producto",
  "género",
  "puesto",
  "empresa",
  "comentarios",
  "codigo postal",
  "estado",
  "colonia",
  "calle",
  "ejecutivo",
  "tipo de cliente",
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
    type: "URL",
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

  prospectslabels: {
    id: null,
    name: null,
    type: "Etiqueta",
    show: false,
    identifier: "prospectslabels",
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
