import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Pagination } from "@material-ui/lab";
import Select from "react-select";
import { DialogContainer, DrawerContainer, ProspectosStyled, Error } from "../../styles/Propectos";
import NavBarDashboard from "../../components/NavBarDashboard";
import { getDataDay, getDataDaysMonth, getDataDaysWeek, toUpperCaseChart } from "../../utils";
import DrawerProspects from "../../components/DrawerProspects";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import SideBar from "../../components/SideBar";
import RequestCommon from "../../services/request_Common";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import { EntitiesLocal } from "../../BD/databd";
import DrawerEditProspect from "../../components/EditProspect";
import { useForm } from "react-hook-form";
import AddPending from "../../components/ModalAddPendings";
import { normalizeTableDataProspect, normalizeTableDataProspectDiscarted } from "../../utils/normalizeData";
import TableComponent from "../../components/TableDataComponent";
import WhatsappV2 from "../../components/WhatsappV2";
import ModalTracking from "../../components/ModalTracking";
import { commonSelector } from "../../redux/slices/commonSlice";
import ModalDeleteProspect from "../../components/UI/organism/ModalDeleteProspect";
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
import {
  Add,
  FilterList,
  Close,
  People,
  SearchOutlined,
  Cached,
  ImportExport,
  Email,
  AccountBox,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { colors } from "../../styles/global.styles";

export default function Prospectos() {
  const router = useRouter();
  const commonApi = new RequestCommon();
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
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
  const [showDiscatedTable, setshowDiscatedTable] = useState(false);
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
  const { origin: valuecurrent, phase: phasevalueee } = queryNew;

  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [isOrderLast, setIsOrderLast] = useState("-");
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [viewOption, setViewOption] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [entity, setEntity] = useState("");
  const [city, setCity] = useState("");
  const [origin, setOrigin] = useState("");
  const [category, setCategory] = useState("");
  const [phase, setPhase] = useState("");
  const [tag, setTag] = useState("");
  const [ejecutive, setEjecutive] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientType, setclientType] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loadCities, setLoadCities] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [discarted, setDiscarted] = useState({ value: false });
  const [nowDate, setNowDate] = useState(new Date());
  const [gender, setGender] = useState();
  const limit = 30;
  const totalPages = Math.ceil(totalProspects / limit);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  //27/10/2022 se agrego el orden de los pendientes
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  //------////////////
  // 21/10/2022 se añadio categoria de interes
  const [viewed, setViewed] = useState("");
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [step, setStep] = useState(0);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  // ? NUEVOS CAMBIOS

  const [showNewsChips, setShowNewsChips] = useState(false);
  const { phases, categories, origins, clientTypes, specialties } = useSelector(commonSelector);

  // ? NUEVOS CAMBIOS

  const [queryToSave, setQueryToSave] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // * trae toda la data a mostrar junto con filtros
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (roleId != "ejecutivo") {
        getProspectManager();
      } else {
        getProspectv2();
      }

      setisLoading(true);
    }
    return () => (mounted = false);
  }, [id_user, page, flag, orderby, ASC, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    let mounted = true;
    const countNewProspect = async () => {
      try {
        let querynew = {};
        querynew.isclient = false;
        querynew.isoportunity = false;
        querynew.ejecutiveId = id_user;
        querynew.viewed = false;
        // querynew.discarted = false;
        let newProspect = await api.get(`prospects?where=${JSON.stringify(querynew)}&limit=0&count=1`);
        // setProspectsNew(newProspect.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    // countNewProspect();
    return () => (mounted = false);
  }, [refetch]);

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getClientscompanies();
      getLabels();
      getUsers();
    };
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

  // * UTILS  OPEN
  const navigateCreateNew = () => router.push("/prospectos/nuevo");

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

  const validateJoins = () => {
    let joins;
    if (tag !== "") {
      joins = "cat,cy,ey,pe,ee,cy,on,ce,sy,pl,prospectslabels,prospectslabels.label";
    } else {
      joins = "cat,cy,ey,pe,ee,cy,on,ce,sy,pl,prl,k";
    }
    return joins;
  };

  const normalizeProspect = prospects => {
    let newProspect = normalizeTableDataProspect(prospects);
    setshowDiscatedTable(false);
    setProspectsTable(newProspect);
    setisLoading(false);
  };

  const normalizeDiscarted = prospects => {
    let newProspect = normalizeTableDataProspectDiscarted(prospects);
    setshowDiscatedTable(true);
    setProspectsTable(newProspect);
    setisLoading(false);
  };

  // * UTILS CLOSE

  // * FUNTIONS

  // *****!!! TO DELETE

  const getProspect = async () => {
    console.log("here");
    try {
      //  * DEFAULT QUERIES
      let query = {
        isclient: false,
        isoportunity: false,
        discarted: discarted.value,
      };

      if (ejecutive == "") {
        query.ejecutiveId = id_user;
      } else {
        query.ejecutiveId = ejecutive.id;
      }

      if (searchKey !== "") {
        query.or = [
          { name: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
          { lastname: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
          { email: { regexp: `${searchKey.toLocaleLowerCase()}` } },
          { phone: { regexp: `${searchKey}` } },
        ];
      } else {
        delete query.or;
      }

      let propertiesNames = Object.keys(queryNew);

      propertiesNames.forEach((propertyName, index) => {
        // console.log(queryNew[propertyName]);
        console.log(propertyName);
      });

      console.log(query);

      // TODO MAKE DINAMIC THIS

      if (origin !== "") {
        query.originId = origin.id;
      } else {
        delete query.origin;
      }

      //filtros nombre email y apellidos -20/10/2022
      if (entity !== "") {
        query.entityId = entity.id;
      } else {
        delete query.entityId;
      }
      if (city !== "") {
        query.cityId = city.id;
      } else {
        delete query.cityId;
      }
      if (origin !== "") {
        query.originId = origin.id;
      } else {
        delete query.origin;
      }
      // 21/10/2022 se añadio categoria de interes
      if (category !== "") {
        query.categoryId = category.id;
      } else {
        delete query.categoryId;
      }
      if (phase !== "") {
        query.phaseId = phase.value;
      } else {
        delete query.phaseId;
      }
      // if (tag !== "") {
      //   query.labelId = tag.value;
      // } else {
      //   delete query.labelId;
      // }
      if (tag !== "") {
        query.prospectslabels = {
          or: [
            {
              labelId: tag.value,
            },
          ],
        };
      } else {
        delete query.prospectslabels;
      }

      if (specialty !== "") {
        query.specialtyId = specialty.id;
      } else {
        delete query.specialtyId;
      }

      if (clientCompany !== "") {
        query.clientCompanyId = clientCompany.id;
      } else {
        delete query.clientCompanyId;
      }

      if (clientType !== "") {
        query.clientTypeId = clientType.value;
      } else {
        delete query.clientTypeId;
      }

      switch (viewOption.value) {
        case "day":
          query.createdAt = { between: getDataDay(nowDate) };
          break;
        case "week":
          query.createdAt = { between: getDataDaysWeek(nowDate) };
          break;
        case "month":
          query.createdAt = { between: getDataDaysMonth(nowDate) };
          break;
        case "range":
          if (dateStart < dateFinish) {
            query.createdAt = { between: [dateStart, dateFinish] };
          }
          break;
        default:
          break;
      }

      let include =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";

      // console.log(query);
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };
      console.log(query);
      params.join = validateJoins();
      let prospect = await api.get(`prospects`, { params });

      // console.log(prospect.data?.results);
      let queryCountNew = query;

      queryCountNew.viewed = false;

      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        limit: 0,
        count: 1,
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
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
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };

      paramsCountViewed.join = validateJoins();

      let countProspectViewed = await api.get(`prospects`, { params: paramsCountViewed });

      // console.log(countProspectViewed);

      // console.log(prospect);

      setProspectsBD(prospect.data.results);

      setTotalProspects(prospect.data.count);
      if (discarted.value == true) {
        normalizeDiscarted(prospect.data.results);
      } else {
        normalizeProspect(prospect.data.results);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      console.log(error.response);
    }
  };

  // * REQUESTS  OPEN

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("p_keyord");

    if (searchkeyword) {
      console.log(searchkeyword);
      setSearchKey(searchkeyword);
      console.log(searchkeyword);

      setShowChips(true);
    }

    let query = localStorage.getItem("p_query");
    if (query) {
      if (queryNew["discarted"].show === true) {
        setShowDiscartedProspects(true);
      }
      setQueryNew(JSON.parse(query));
      setShowChips(true);
    }

    let orderby = localStorage.getItem("p_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("p_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }

    let date = localStorage.getItem("p_date");
    if (date) {
      console.log(date);
      let toObject = JSON.parse(date);

      console.log(toObject);
      if (toObject.value !== null || toObject.value !== undefined) {
        console.log(`%c Current Values Query ${JSON.stringify(toObject)} `, "background: #222; color: # 4682bf");
        setViewOption({ label: toObject.label, value: toObject.value });
      } else {
        setViewOption("");
      }

      if (toObject.value === "range") {
        console.log(toObject);

        setDateStart(dayjs(toObject.startrange));
        setDateFinish(dayjs(toObject.finishrange));
      }
    }

    setReadyLocalStorage(true);
  };

  const getProspectv2 = async () => {
    if (readyLocalStorage === false) return;
    try {
      // getLocalStorage();
      //  * DEFAULT QUERIES
      let query = {
        isclient: false,
        isoportunity: false,
        discarted: false,
      };

      ejecutive == "" ? (query.ejecutiveId = id_user) : (query.ejecutiveId = ejecutive.id);

      if (hasValue(searchKey)) {
        saveDataLocalStorage(searchKey, "keyword", "p_keyword");
        if (searchKey.includes("@")) {
          console.log("es correo");
          query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchKey.trim())) {
          query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else {
          console.log("nombre normal");
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

      saveDataLocalStorage(queryNew, "query", "p_query");

      if (viewOption.value) {
        query[orderby] = { between: normalizeDateQuery(viewOption.value) };
      }

      let includeValue =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";

      console.log(query);

      // TODO MAKE DINAMIC THIS

      console.log(`%c Las value ${JSON.stringify(query, null, 2)} `, "background: #222; color: #bada55");

      let paramsQuery = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: includeValue,
      };

      paramsQuery.join = validateJoins();

      let prospectv2 = await api.get(`prospects`, { params: paramsQuery });

      setTotalProspects(prospectv2.data.count);
      if (showDiscartedProspects == true) {
        normalizeDiscarted(prospectv2.data.results);
      } else {
        normalizeProspect(prospectv2.data.results);
      }

      saveKeyWordLocalStorage(searchKey);

      saveDataLocalStorage(orderby, "order", "p_order");
      saveDataLocalStorage(ASC, "asc", "p_asc");

      saveDataLocalStorage(
        {
          label: viewOption.label,
          value: viewOption.value,
          startrange: dateStart,
          finishrange: dateFinish,
        },
        "p_date",
        "p_date"
      );

      let queryCountNew = query;

      queryCountNew.viewed = false;

      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        limit: 0,
        count: 1,
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };

      paramsCountNew.join = validateJoins();

      console.log(paramsCountNew);

      let countProspectNew = await api.get(`prospects`, { params: paramsCountNew });

      setProspectsNew(countProspectNew.data?.count);

      // console.log(prospectv2);

      return;

      let include =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";

      // console.log(query);
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };
      console.log(query);
      params.join = validateJoins();
      let prospect = await api.get(`prospects`, { params });

      // console.log(prospect.data?.results);
      // let queryCountNew = query;

      // queryCountNew.viewed = false;

      // let paramsCountNew = {
      //   where: JSON.stringify(queryCountNew),
      //   limit: 0,
      //   count: 1,
      //   order: `${isOrderLast}${order}`,
      //   skip: page,
      //   include: include,
      // };

      // paramsCountNew.join = validateJoins();

      // let countProspectNew = await api.get(`prospects`, { params: paramsCountNew });

      // setProspectsNew(countProspectNew.data?.count);

      // TODO Count no viewed

      let queryCountViewed = query;

      queryCountViewed.viewed = true;

      let paramsCountViewed = {
        where: JSON.stringify(queryCountViewed),
        limit: 0,
        count: 1,
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };

      paramsCountViewed.join = validateJoins();

      let countProspectViewed = await api.get(`prospects`, { params: paramsCountViewed });

      // console.log(countProspectViewed);

      // console.log(prospect);

      setProspectsBD(prospect.data.results);

      setTotalProspects(prospect.data.count);
      if (discarted.value == true) {
        normalizeDiscarted(prospect.data.results);
      } else {
        normalizeProspect(prospect.data.results);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      console.log(error.response);
    }
  };
  const getProspectManager = async () => {
    try {
      let query = {};
      query.isclient = false;
      query.isoportunity = false;
      query.discarted = discarted.value;
      if (ejecutive == "") {
        query.ejecutive = {
          groupId: groupId,
        };
      } else {
        query.ejecutiveId = ejecutive.id;
      }
      //filtros nombre email y apellidos
      if (searchKey !== "") {
        query.or = [
          { name: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
          { lastname: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
          { email: { regexp: `${searchKey.toLocaleLowerCase()}` } },
          { phone: { regexp: `${searchKey}` } },
        ];
      } else {
        delete query.or;
      }
      //filtros nombre email y apellidos -20/10/2022
      if (entity !== "") {
        query.entityId = entity.id;
      } else {
        delete query.entityId;
      }
      if (city !== "") {
        query.cityId = city.id;
      } else {
        delete query.cityId;
      }
      if (origin !== "") {
        query.originId = origin.id;
      } else {
        delete query.origin;
      }
      // 21/10/2022 se añadio categoria de interes
      if (category !== "") {
        query.categoryId = category.id;
      } else {
        delete query.categoryId;
      }
      if (phase !== "") {
        query.phaseId = phase.value;
      } else {
        delete query.phaseId;
      }
      // if (tag !== "") {
      //   query.labelId = tag.value;
      // } else {
      //   delete query.labelId;
      // }
      if (tag !== "") {
        query.prospectslabels = {
          or: [
            {
              labelId: tag.value,
            },
          ],
        };
      } else {
        delete query.prospectslabels;
      }

      if (specialty !== "") {
        query.specialtyId = specialty.id;
      } else {
        delete query.specialtyId;
      }

      if (clientCompany !== "") {
        query.clientCompanyId = clientCompany.id;
      } else {
        delete query.clientCompanyId;
      }
      if (clientType !== "") {
        query.clientTypeId = clientType.value;
      } else {
        delete query.clientTypeId;
      }

      switch (viewOption.value) {
        case "day":
          query.createdAt = { between: getDataDay(nowDate) };
          break;
        case "week":
          query.createdAt = { between: getDataDaysWeek(nowDate) };
          break;
        case "month":
          query.createdAt = { between: getDataDaysMonth(nowDate) };
          break;
        case "range":
          if (dateStart < dateFinish) {
            query.createdAt = { between: [dateStart, dateFinish] };
          }
          break;
        default:
          break;
      }

      let include =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";

      // console.log(query);
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };

      params.join = validateJoins();
      let prospect = await api.get(`prospects`, { params });

      // console.log(prospect.data?.results);
      let queryCountNew = query;

      queryCountNew.viewed = false;

      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        limit: 0,
        count: 1,
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
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
        order: `${isOrderLast}${order}`,
        skip: page,
        include: include,
      };

      paramsCountViewed.join = validateJoins();

      let countProspectViewed = await api.get(`prospects`, { params: paramsCountViewed });

      // console.log(countProspectViewed);

      // console.log(prospect);

      setProspectsBD(prospect.data.results);

      setTotalProspects(prospect.data.count);
      if (discarted.value == true) {
        normalizeDiscarted(prospect.data.results);
      } else {
        normalizeProspect(prospect.data.results);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      console.log(error.response);
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

  const ConfirmDelete = prospect => {
    setProspect(prospect);
    setopenConfirmDelete(!openConfirmDelete);
  };
  const handleCloseConfirmDelete = () => {
    setProspect("");
    setopenConfirmDelete(false);
    setStep(0);
    setValue("descarted", "");
  };

  const RestoreProspect = prospect => {
    setProspect(prospect);
    setopenConfirmRestore(true);
  };
  const handleCloseConfirmRestore = () => {
    setProspect("");
    setopenConfirmRestore(false);
  };

  const deleteProspect = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          let reason = discartReasons.filter(item => item.id == formData?.descarted);
          update.status = 0;
          update.discartedbyId = id_user;
          update.reasonId = formData?.descarted;
          update.discartedreason = reason[0].reason;
          let deleteProspect = await api.put(`prospects/discardprospect/${Prospect.id}`, update);
          if (deleteProspect.status == 200) {
            handleCloseConfirmDelete();
            handleAlert("success", "Prospecto - Descartado!", "basic");
            setValue("descarted", "");
            setFlag(!flag);
          }
          break;
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se descarto el prospecto!", "basic");
      console.log(error);
    }
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
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1012`);
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

    setShowNewsChips(true);

    setShowChips(!showChips);
    setFlag(!flag);
    closeDrawerFilters();
    console.log(queryToSave);

    let propertiesName = Object.keys(queryNew);

    let queryFinal = queryNew;

    for (let i = 0; i < propertiesName.length; i++) {
      const element = propertiesName[i];
      console.log(element);
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

  const getUsers = async () => {
    try {
      let origins = await commonApi.getUsers();
      setEjecutives(origins.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientscompanies = async () => {
    try {
      let query = {};
      query.ejecutiveId = id_user;
      let clientsCompany = await commonApi.getClientsCompanies(query);
      setClientsCompanies(clientsCompany.data.results);
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
    if (identifier === "discarted") {
      setShowDiscartedProspects(false);
    }
    console.log(identifier);
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

    console.log(queryItem);
    console.log(queryToMutate);

    setQueryNew({
      ...queryToMutate,
    });

    getProspectv2();
  };

  const handleSelectQuery = (e, identifier) => {
    let queryToMutation = queryNew;
    console.log(`%c Current Values Query ${JSON.stringify(queryToMutation)} `, "background: #222; color: # 4682bf");
    console.log(`%c Current Value ${JSON.stringify(e, null, 2)} `, "background: #222; color: #bada55");

    if (identifier == "discarted") {
      alert("true");
      setshowDiscatedTable(true);
      setShowDiscartedProspects(true);
    }

    if (identifier === "entityId" && e !== null) {
      getCities(e.value);
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

    console.log(queryToMutation[identifier]);

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
  const handleSelectCity = item => {
    let city = {
      id: item.id,
      name: item.name,
      type: "Ciudad",
    };
    item !== "" ? setCity(city) : setCity({});
  };

  const handleSelectPhase = item => {
    let phase = {
      value: item.id,
      label: item.name,
      type: "Fase",
    };
    item !== "" ? setPhase(phase) : setPhase({});
  };
  const handleSelectTags = item => {
    let tag = {
      value: item.id,
      label: item.label,
      type: "Etiquetas",
    };
    item !== "" ? setTag(tag) : setTag({});
  };
  const handleSelectTypeClient = item => {
    let typeClient = {
      value: item.id,
      label: item.name,
      type: "Tipo de Cliente",
    };
    item !== "" ? setclientType(typeClient) : setclientType({});
  };

  const handleSelectSpeciality = item => {
    let specialty = {
      id: item.id,
      name: item.name,
      type: "Especialidad",
    };
    item !== "" ? setSpecialty(specialty) : setSpecialty({});
  };

  const handleSelectCompanyclients = item => {
    let clients = {
      id: item.id,
      label: item.companyname,
      type: "Empresa",
    };
    item !== "" ? setClientCompany(clients) : setClientCompany({});
  };

  const handleSelectDescarted = item => {
    let discarted = {
      value: item.value,
      label: item.label,
      type: "Descartados",
    };
    if (item !== "") {
      setDiscarted("");
    } else {
      setDiscarted(true);
    }
    item !== "" ? setDiscarted(discarted) : setDiscarted({});
  };
  const validateInfo = item => {
    if (item === undefined || item === null || item === "") {
      return "";
    } else {
      return item;
    }
  };
  const Chips = () => {
    if (showChips) {
      return (
        <div>
          {searchKey && (
            <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
          )}

          {tag !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeTag}
              label={`${"Etiqueta"}: ${tag.label}`}
              className="chip"
            />
          )}
          {clientCompany !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeClient}
              label={`${clientCompany.type}: ${clientCompany.label}`}
              className="chip"
            />
          )}

          {discarted.value && (
            <Chip color="primary" size="small" onDelete={removeDiscarted} label={"Descartados"} className="chip" />
          )}

          {viewOption?.label && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeViewed}
              label={`${"Fecha"}: ${viewOption.label} de  ${dayjs(dateStart).format("")} - ${dayjs(dateFinish).format(
                ""
              )}`}
              className="chip"
            />
          )}

          {ejecutive.id && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeEjecutive}
              label={`${"Ejecutivo"}: ${ejecutive.name} ${ejecutive.lastname}`}
              className="chip"
            />
          )}

          {viewed && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeView}
              label={`${"Prospectos"}: ${isOrderLast === "" ? "No Vistos" : "Vistos"}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("p_keyord");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const removeEjecutive = () => {
    setEjecutive("");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeView = () => {
    setViewed("");
    setOrder("createdAt");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeTag = () => {
    setTag("");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeClient = () => {
    setClientCompany("");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeDiscarted = () => {
    setDiscarted({ value: false });
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
    console.log(item);
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

  const saveKeyWordLocalStorage = value => {
    if (value === "") return;
    localStorage.setItem("p_keyord", value);
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

  const deleteLocalStorage = () => {};
  return (
    <ProspectosStyled>
      <Head>
        <title>CRM JOBS - Prospectos</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} />
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
                // variant="dot"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <h1
                  onClick={() => {
                    getProspectv2();
                  }}
                >
                  Prospectos
                </h1>
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
              <div>
                {ejecutive.id && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeEjecutive}
                    label={`${"Ejecutivo"}: ${ejecutive.name} ${ejecutive.lastname}`}
                    className="chip"
                  />
                )}
                {searchKey !== "" && (
                  <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
                )}

                {discarted.value && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeDiscarted}
                    label={"Descartados"}
                    className="chip"
                  />
                )}

                {viewed && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeView}
                    label={`${"Prospectos"}: ${isOrderLast === "" ? "No Vistos" : "Vistos"}`}
                    className="chip"
                  />
                )}
                {viewOption?.label && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeViewed}
                    label={`${"Fecha"}: ${viewOption.label} 
                    ${
                      viewOption.value == "range"
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
                        label={queryNew[item].name}
                        className="chip"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
              <Box>
                <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
                <select
                  className="order-select"
                  onChange={e => setOrderby(e.target.value)}
                  defaultValue={orderby}
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
                    console.log(e.target.checked);
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
            <TableComponent
              data={prospectsTable}
              id="nombre"
              discartedTable={showDiscartedProspects}
              heads={!showDiscatedTable ? heads : headsDiscarted}
              secondaryColor="#dce1f6"
              primaryColor="#405189"
              handleClickName={handleClickName}
              handleClickAddTracking={handleClickAddTracking}
              handleClickEditProspect={handleClickEditProspect}
              handleClickAddPending={handleClickAddPending}
              handleClickConverToOportunity={handleClickConverToOportunity}
              handleClickDiscardProspect={handleClickDiscardProspect}
              handleClickRestore={handleClickRestore}
              handleClickOpenWhatsApp={handleClickOpenWhatsApp}
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
        isOportunity={true}
        prospect={prospectSelected}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
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
      />
      <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p
              className="title"
              onClick={() => {
                console.log(queryNew);
                console.log(showNewsChips);
              }}
            >
              Filtra por tu preferencia
            </p>
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
                value={viewOption}
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
                onChange={e => handleSelectQuery(e, "entityId")}
                isClearable={true}
                value={EntitiesLocal.filter(item => item.id === queryNew["entityId"]?.id)}
                options={EntitiesLocal}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            {queryNew["entityId"].id && (
              <div className="ctr_drawer__ctr_inputs__input">
                <Select
                  className="drawer_container__form__containerSelect__select"
                  placeholder="Selecciona una Ciudad"
                  onChange={e => {
                    e === null ? handleSelectCity("") : handleSelectCity(e);
                    handleSelectQuery(e, "cityId");
                  }}
                  isClearable={true}
                  isLoading={loadCities}
                  value={citiesByEntity?.filter(item => item.id === queryNew["cityId"]?.id)}
                  options={citiesByEntity}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} `}
                />
              </div>
            )}
            {/* 21/10/2022 se oculto el filtro de ejecutivo a role ejecutivo */}
            {roleId !== "ejecutivo" && (
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Ejecutivo</label>
                <Select
                  placeholder="Selecciona un Ejecutivo"
                  onChange={e => (e === null ? handleSelectEjecutive("") : handleSelectEjecutive(e))}
                  isClearable={true}
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
            {/* <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Etiquetas</label>
              <Select
                placeholder="Seleccione una Etiqueta"
                onChange={e => (e === null ? handleSelectTags("") : handleSelectTags(e))}
                isClearable={true}
                options={tags}
                value={tags.filter(item => item.id === tag?.value)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.label} `}
              />
            </div> */}
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Género</label>
              <Select
                placeholder="Seleccione una género"
                isSearchable={true}
                isClearable={true}
                options={filtergenders}
                value={gender}
                onChange={e => handleSelectQuery(e, "gender")}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Compañia</label>
              <Select
                placeholder="Seleccione una compañia"
                onChange={e => handleSelectQuery(e, "clientCompanyId")}
                options={clientsCompanies}
                isClearable={true}
                value={clientsCompanies.filter(item => item.id === clientCompany?.id)}
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
                isClearable={true}
                value={clientTypes.results.filter(item => item.id === clientType?.value)}
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
                options={specialties.results}
                value={specialties.results.filter(item => item.id === specialty?.id)}
                onChange={e => handleSelectQuery(e, "specialtyId")}
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

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Vistos</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={true}
                options={filterViewed}
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

      <ModalDeleteProspect
        openConfirmDelete={openConfirmDelete}
        setopenConfirmDelete={setopenConfirmDelete}
        Prospect={Prospect}
        setProspect={setProspect}
        setFlag={setFlag}
        flag={flag}
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

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ProspectosStyled>
  );
}

const filterDescarted = [{ label: "Mostrar Descartados", value: true }];

const filterViewed = [
  { label: "Mostrar no visualizados", value: false },
  { label: "Mostart visualizados", value: true },
];

const FiltersOrder = [
  { label: "Hoy", value: "day" },
  { label: "Semana", value: "week" },
  { label: "Mes", value: "month" },
  { label: "Rango", value: "range" },
];

// { label: "Rango", value: "range" },
// { label: "Fecha de Creación", value: "createdAt" },
// { label: "Fecha de Actualización", value: "updatedAt" },
// { label: "Fecha de Último Seguimiento", value: "lastTracking" },
// { label: "Vistos", value: "viewed" },

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
  "ciudad",
  "colonia",
  "calle",
  "ejecutivo",
  "tipo de cliente",
  "fase",
  "origen",
  "Etiquetas",
  "título",
  "especialidad",
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
    type: "Estado",
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
  clientCompanyId: {
    id: null,
    name: null,
    type: "Empresa",
    show: false,
    identifier: "clientCompanyId",
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
