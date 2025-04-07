import { FilterList, SearchOutlined, People, Cached, Email, AccountBox, Note } from "@material-ui/icons";
import { Box, Chip, Grid, LinearProgress, TextField, Switch, withStyles, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { userSelector } from "../../../../redux/slices/userSlice";

import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { Pagination } from "@material-ui/lab";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import RequestCommon from "../../../../services/request_Common";
import { Controller, useForm } from "react-hook-form";
import AlertGlobal from "../../../Alerts/AlertGlobal";

import WhatsappV2 from "../../../WhatsappV2";
import AddPending from "../../../ModalAddPendings";
import ModalTracking from "../../../ModalTracking";
import Select from "react-select";
import { colors } from "../../../../styles/global.styles";

import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../../services/api";
import { dialogSelector } from "../../../../redux/slices/dialogSlice";
import {
  normalizeTableDataOpotunityAdmin,
  normalizeTableDataOpotunityDiscarted,
} from "../../../../utils/normalizeData";
import { initialFilters } from "../../../../BD/initialStates";
import useModal from "../../../../hooks/useModal";
import { createNewTracking } from "../../../../redux/slices/trackingSlice";
import {
  ContainerModal,
  ContainerModalImportant,
  ContainerModalRejected,
  OportinitiesStyled,
} from "../../../../styles/oportunitiesAdmiSales";
import ModalRestoreImportant from "../../../ModalRestoreImportant";
import ModalRestoreReject from "../../../ModalRestoreReject";

import DrawerOportunitiesAdmin from "../../organism/previewOportunitiesAdmin";
import DrawerFiltersOportunitiesAdmin from "../../organism/DrawerFiltersOportunitiesAdmin/index.js";
import TableComponent from "../../organism/TableOportunitiesAdmistrationSales";
import { companySelector } from "../../../../redux/slices/companySlice";
import { useContext } from "react";
import { SocketContext } from "../../../../context/socketContext";

export default function OportunidadesAdmiSales() {
  const dispatch = useDispatch();
  const { openMenuSide } = useSelector(dialogSelector);
  const { open: openImportantModal, toggleModal: toggleImportantModal, closeModal: closeModalImportant } = useModal();
  const { open: openRejectedModal, toggleModal: toggleRejectedModal, closeModal: closeModalRejected } = useModal();
  const { open: openImportanRestore, toggleModal: toggleImportantRestore, closeModal: closeModalRestore } = useModal();
  const { open: openRejectedRestoret, toggleModal: toggleRejected, closeModal: closeModalRejectedRestore } = useModal();

  // const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  // * sidebar estado
  const [inQueryNew, setInQueryNew] = useState(initialInQuery);
  const [queryNew, setQueryNew] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [showDrawer, setshowDrawer] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isRangeOk, setIsRangeOk] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [isEjecutiveSelected, setIsEjecutiveSelected] = useState(false);
  const [oportunities, setOportunities] = useState([]);
  const [prospectId, setProspectId] = useState("");
  const [clientCompany, setClientCompany] = useState({});
  const [oportunityId, setOportunityId] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [group, setGroup] = useState("");
  const [ejecutive, setEjecutive] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [typeDate, setTypeDate] = useState({});
  const [rangeDate, setRangeDate] = useState({});
  const [prospectSelected, setProspectSelected] = useState({});
  const [totalOportunities, setTotalOportunities] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5000);
  const { id_user, roleId } = useSelector(userSelector);
  const router = useRouter();
  const totalPages = Math.ceil(totalOportunities / limit);
  const [filters, setFilters] = useState(initialFilters);
  const [oportunity, setOportunity] = useState();
  const [openModal, setOpenModal] = useState({ activate: false, type: "" });
  const commonApi = new RequestCommon();
  const [discartReasons, setdiscartReasons] = useState([]);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospectPending, setProspectPending] = useState({});
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);
  // 27/10/2022 se agrego el orden se los pendientes
  const [orderPendings, setOrderPendigs] = useState({ value: "date_from", label: "Fecha de Pendiente" });
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [refetchPendings, setRefetchPendings] = useState(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [prospectEdit, setprospectEdit] = useState({});
  const [step, setStep] = useState(0);

  const [showDiscatedTableOportunities, setshowDiscatedTableOportunities] = useState(false);
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const [rejectedReasons, setRejectedReasons] = useState([]);
  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [importantReasons, setImportantReasons] = useState([]);
  const [importantOptionSelected, setImportantOptionSelected] = useState("");
  const [respaldo, setRespaldo] = useState();
  const [ejecutives, setEjecutives] = useState([]);
  const { id_company } = useSelector(companySelector);
  const { socket } = useContext(SocketContext);

  //-------------//

  const heads = [
    "id",
    "nombre",
    "correo",
    "télefono",
    "monto",
    "certeza",
    "categoría de interes",
    "concepto",
    "fase",
    "origen",
    "género",
    "puesto",
    "Empresa",
    "web",
    "facebook",
    "google maps",
    "fecha de cierre",
    "fecha de creacion",
  ];
  const headsDiscarted = [
    "id",
    "nombre",
    "concepto",
    "correo",
    "certeza",
    "télefono",
    "fecha de cierre",
    "fecha de creacion",
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDiscartReasons();
      getRejectReasons();
      getImportantReasons();
      return () => (mounted = false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunities();
      return () => (mounted = false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_user, page, flag, limit, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getRejectReasons = () => {
    api
      .get("rejected", { params: {} })
      .then(res => setRejectedReasons(res.data.results))
      .catch(err => console.log(err));
  };
  const getImportantReasons = () => {
    api
      .get("important")
      .then(res => {
        setImportantReasons(res.data.results);
      })
      .catch(err => console.log("error", err.response));
  };
  const generateFilters = () => {
    let query = {};
    let inQuery = {};
    query.discarted = showDiscatedTableOportunities;
    query.prospect = inQuery;
    query.iscloseout = false;
    inQuery.isoportunity = true;

    if (hasValue(nameSearch)) {
      saveDataLocalStorage(nameSearch, "keyword", "o_keywordAdministrationSales");
      if (nameSearch.includes("@")) {
        inQuery.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
      } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(nameSearch.trim())) {
        inQuery.phone = { iRegexp: `${nameSearch.trim()}` };
      } else {
        inQuery.fullname = { iRegexp: `${nameSearch.trim()}` };
      }
    } else {
      setNameSearch("");
    }

    Object.keys(inQueryNew).forEach((propertyName, index) => {
      if (inQueryNew[propertyName].show === true) {
        switch (propertyName) {
          case "url":
            if (inQueryNew.url.name === "Con pagina web") {
              inQuery.url = {
                ne: "",
              };
            } else {
              inQuery.url = "";
            }
            break;
          case "facebook":
            if (inQueryNew.facebook.name === "Con Facebook") {
              inQuery.facebook = {
                ne: "",
              };
            } else {
              inQuery.facebook = "";
            }
            break;
          case "groupId":
            inQuery.ejecutive = {
              groupId: inQueryNew[propertyName].id,
            };
            break;
          case "ejecutiveId":
            inQuery.ejecutiveId = inQueryNew[propertyName].id;

            break;

          default:
            inQuery[propertyName] = inQueryNew[propertyName].id;
            break;
        }
      }
    });

    Object.keys(queryNew).forEach((propertyName, index) => {
      if (queryNew[propertyName].show === true) {
        query[propertyName] = queryNew[propertyName].id;
      }
    });

    if (rangeDate.type) {
      query[orderBy] = { between: normalizeDateQuery(rangeDate.type) };
    }
    return query;
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

      case "mounth":
        let startMonth = dayjs().startOf("month").toDate();
        let finishMonth = dayjs().endOf("month").toDate();
        return [startMonth, finishMonth];

      case "range":
        let startRange = dayjs(dateFrom).startOf("day").toDate();
        let finisRange = dayjs(dateTo).endOf("day").toDate();

        return [startRange, finisRange];

      default:
        let todayDefault = dayjs().startOf("day").toDate();
        let nextDayDefault = dayjs().add(1, "day").startOf("day").toDate();
        return [todayDefault, nextDayDefault];
    }
  };
  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("o_keywordAdministrationSales");
    if (searchkeyword) {
      setNameSearch(searchkeyword);
      setSearchKey(searchkeyword);
    }

    let query = localStorage.getItem("o_queryAdministrationSales");
    if (query) {
      let queryFormat = JSON.parse(query);
      if (queryFormat["discarted"].show === true) {
        setshowDiscatedTableOportunities(true);
      }
      setQueryNew(JSON.parse(query));
    }
    let inquery = localStorage.getItem("o_inqueryAdministrationSales");
    if (inquery) {
      setInQueryNew(JSON.parse(inquery));
    }
    let orderby = localStorage.getItem("o_orderAdministrationSales");
    if (orderby) {
      setOrderBy(JSON.parse(orderby));
    }
    let asc = localStorage.getItem("o_ascAdministrationSales");
    if (asc) {
      setASC(JSON.parse(asc));
    }

    let date = localStorage.getItem("o_dateAdministrationSales");
    if (date) {
      let toObject = JSON.parse(date);

      if (toObject.value !== null || toObject.value !== undefined) {
        setRangeDate({ id: toObject.id, name: toObject.label, type: toObject.value });
      } else {
        setRangeDate("");
      }

      if (toObject.value === "range") {
        setDateFrom(dayjs(toObject.startrange));
        setDateTo(dayjs(toObject.finishrange));
      }
    }
    setReadyLocalStorage(true);
  };

  const getOportunities = async () => {
    setisLoading(true);
    if (readyLocalStorage === false) return;
    try {
      let query = generateFilters();
      let params = {
        include:
          "prospect,prospect.phase,prospect.origin,prospect.ejecutive,prospect.category,prospect.clientcompany,phase",
        where: JSON.stringify(query),
        limit: limit,
        count: 1,
        join: "prospect,prospect.phase,prospect.origin,prospect.ejecutive,cd,cli,ph",
        order: validateOrder(),
        skip: page,
      };
      let responseOportunities = await api.get(`oportunities`, { params });
      let results = responseOportunities?.data.results;

      if (showDiscatedTableOportunities == true) {
        normalizeDiscarted(results);
      } else {
        normalizeProspect(results);
      }
      setTotalOportunities(responseOportunities.data?.count);
      setisLoading(false);
      saveDataLocalStorage(queryNew, "query", "o_queryAdministrationSales");
      saveDataLocalStorage(inQueryNew, "query", "o_inqueryAdministrationSales");
      saveDataLocalStorage(ASC, "asc", "o_ascAdministrationSales");
      saveDataLocalStorage(orderBy, "order", "o_orderAdministrationSales");
      saveDataLocalStorage(
        {
          id: rangeDate.id,
          label: rangeDate.name,
          value: rangeDate.type,
          startrange: dateFrom,
          finishrange: dateTo,
        },
        "o_dateAdministrationSales",
        "o_dateAdministrationSales"
      );
    } catch (error) {
      console.log(error.response);
      setisLoading(false);
    }
  };

  const validateOrder = () => {
    if (
      orderBy === "createdAt" ||
      orderBy === "updatedAt" ||
      orderBy === "estimatedclossing" ||
      orderBy === "lastTrackingcreatedAt" ||
      orderBy === "amount" ||
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
  const normalizeProspect = results => {
    let normalizeData = results.map(item => normalizeTableDataOpotunityAdmin(item));
    setshowDiscatedTableOportunities(false);
    setOportunities(normalizeData);
    setisLoading(false);
  };
  const normalizeDiscarted = order => {
    let newOrder = order.map(item => normalizeTableDataOpotunityDiscarted(item));
    setshowDiscatedTableOportunities(true);
    setOportunities(newOrder);
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
      setshowDiscatedTableOportunities(true);
    }

    if (
      identifier === "discarted" ||
      identifier === "viewed" ||
      identifier === "rejected" ||
      identifier === "isimportant"
    ) {
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
          identifier: identifier,
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

  const handleSelectInQuery = (e, identifier) => {
    let inQueryToMutation = inQueryNew;
    if (identifier === "discarted" || identifier === "viewed") {
      if (e === null) {
        inQueryToMutation[identifier] = {
          ...inQueryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        inQueryToMutation[identifier] = {
          ...inQueryToMutation[identifier],
          id: e.value,
          name: e.label,
        };
      }
    } else {
      if (e === null) {
        inQueryToMutation[identifier] = {
          ...inQueryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        inQueryToMutation[identifier] = {
          ...inQueryToMutation[identifier],
          id: e.id,
          name: e.name,
        };
      }
    }

    setInQueryNew({ ...inQueryToMutation });
  };

  const applyFilters = () => {
    setFlag(!flag);
    setOpenFilters(false);
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
  const handleClickOportunity = (itemOportunity, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      setProspectId(itemOportunity.prospectId);
      setOportunityId(itemOportunity.id);
      setshowDrawer(true);
      setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
      setRefetchPendings(!refetchPendings);
      setFlagTrackings(!flagTrackings);
    } else {
      router.push({
        pathname: "oportunidades/[prospecto]",
        query: { prospecto: itemOportunity.prospectId },
      });
    }
  };
  const handlePagination = (event, page) => {
    setPage(page);
  };

  const handleSelectInQueryDelete = identifier => {
    let inqueryItem = {};
    let inqueryToMutate = inQueryNew;

    if (identifier === "groupId") {
      setEjecutives(respaldo);
    }

    inqueryItem["id"] = null;
    inqueryItem["name"] = null;
    inqueryItem["show"] = false;
    inqueryItem["identifier"] = identifier;
    inqueryToMutate[identifier] = {
      ...inqueryToMutate[identifier],
      ...inqueryItem,
    };
    setInQueryNew({
      ...inqueryToMutate,
    });
    setFlag(!flag);
  };

  const handleSelectQueryDelete = identifier => {
    if (identifier === "discarted") {
      setshowDiscatedTableOportunities(false);
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

  const validateSearchBoxEmpty = string => {
    if (string === "") {
      setNameSearch("");
      setFlag(!flag);
    }
    setSearchKey(string);
  };

  const hasValue = value => !(value === "" || value === undefined || value == null);

  const getDiscartReasons = async () => {
    try {
      let reasons = await commonApi.getReasons();
      setdiscartReasons(reasons.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOportunity = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          let reason = discartReasons.filter(item => item.id == formData?.descarted?.id);
          update.status = 0;
          update.discartedbyId = id_user;
          update.oporeasonId = formData.descarted?.id;
          update.opodiscartedreason = reason[0].reason;

          let deleteProspect = await api.put(`oportunities/discardoportunity/${oportunity.id}`, update);
          if (deleteProspect.status == 200) {
            ConfirmDelete();
            closeModal();
            setFlag(!flag);

            handleAlert("success", "Oportunidad - Descartada!", "basic");
          }
          break;
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se descarto la oportunidad!", "basic");
    }
  };

  // * elimina una oportunidad
  const ConfirmDelete = oportunity => {
    setOportunity(oportunity);
    setOpenModal({ ...openModal, activate: true });
  };
  const rejectOportunity = async () => {
    if (rejectedOptionSelected === "") {
      handleGlobalAlert("error", "Selecciona una opcion de rechazo", "basic", dispatch, 6000);
      return;
    }
    setLoaderCompleteRejected(true);
    try {
      if (oportunity.isimportant === true) {
        // modificar de importante a rechazada y agregar seguimiento
        let dataImportant = {
          isimportant: false,
          rejectedreason: "",
          rejectId: rejectedOptionSelected,
          rejectbyId: id_user,
        };
        let bodyNewTrackingChange = {
          prospectId: oportunity?.prospectId,
          status: "2",
          actionId: ACTIONIDPRODUCTIONMODE,
          oportunityId: oportunity?.id,
          reason: `Seguimiento Automatico`,
          observations: `La cotización ${oportunity?.concepto} fue modificada de  importante a rechazada.`,
          createdbyId: id_user,
          phaseId: PHASEIDPRODUCTIONMODE,
        };

        let responseImportant = await api.put(`oportunities/reject/${oportunity.id}`, dataImportant);
        if (responseImportant.status === 200) {
          toggleRejectedModal();
          setFlag(!flag);
          setRejectedOptionSelected("");
          dispatch(
            createNewTracking({
              data: bodyNewTrackingChange,
            })
          );
          setLoaderCompleteRejected(false);
        }
      } else {
        let data = {
          rejected: true,
          rejectedreason: "",
          rejectId: rejectedOptionSelected,
          rejectbyId: id_user,
        };
        let bodyNewTracking = {
          prospectId: oportunity?.prospectId,
          status: "2",
          actionId: ACTIONIDPRODUCTIONMODE,
          oportunityId: oportunity?.id,
          reason: `Seguimiento Automatico`,
          observations: `La Cotización ${oportunity?.concepto} se marco como rechazada`,
          createdbyId: id_user,
          phaseId: PHASEIDPRODUCTIONMODE,
        };

        let responseRejected = await api.put(`oportunities/reject/${oportunity.id}`, data);
        if (responseRejected.status === 200) {
          handleGlobalAlert("success", "El estatus de la oportunidad cambio", "basic", dispatch, 6000);
          toggleRejectedModal();
          setFlag(!flag);
          setLoaderCompleteRejected(false);
          setRejectedOptionSelected("");
          dispatch(
            createNewTracking({
              data: bodyNewTracking,
            })
          );
        }
      }
    } catch (error) {
      handleGlobalAlert("error", "Oportunidad - ocurrio un error al marcar como rechazada", "basic", dispatch, 6000);
      setLoaderCompleteRejected(false);
    }
  };

  // *Marcar como Importante

  const handleImportantOportunity = async () => {
    if (importantOptionSelected === "") {
      handleGlobalAlert("error", "Selecciona una opcion ", "basic", dispatch, 6000);
      return;
    }
    setLoaderComplete(true);
    try {
      if (oportunity.rejected === true) {
        // midificar de rechazada a importante
        let dataRejected = {
          rejected: false,
          importantreason: "",
          importantId: importantOptionSelected,
          importantbyId: id_user,
        };

        let bodyNewTrackingChange = {
          prospectId: oportunity?.prospectId,
          status: "2",
          actionId: ACTIONIDPRODUCTIONMODE,
          oportunityId: oportunity?.id,
          reason: `Seguimiento Automatico`,
          observations: `La cotización ${oportunity?.concepto} fue modificada de rechazada a importante.`,
          createdbyId: id_user,
          phaseId: PHASEIDPRODUCTIONMODE,
        };

        let responseRejected = await api.put(`oportunities/important/${oportunity.id}`, dataRejected);
        if (responseRejected.status === 200) {
          socket?.emit("send_notify_activity", {
            activity: {
              type: "update",
              from: "oportunities",
              message: `La cotización ${oportunity?.concepto} fue modificada de rechazada a importante.`,
              data: { data: responseImportant.data, oportunity: oportunity },
              ejecutiveId: id_user,
              groupId: groupId,
              companyId: id_company,
            },
          });
          handleGlobalAlert("success", "El estatus de la oportunidad cambio", "basic", dispatch, 6000);
          toggleImportantModal();
          setFlag(!flag);
          setLoaderComplete(false);
          setImportantOptionSelected("");
          dispatch(
            createNewTracking({
              data: bodyNewTrackingChange,
            })
          );
        }
      } else {
        let data = {
          isimportant: true,
          importantreason: "",
          importantId: importantOptionSelected,
          importantbyId: id_user,
        };

        let bodyNewTracking = {
          prospectId: oportunity?.prospectId,
          status: "2",
          actionId: ACTIONIDPRODUCTIONMODE,
          oportunityId: oportunity?.id,
          reason: `Seguimiento Automatico`,
          observations: `La Cotización ${oportunity?.concepto} se marco como importante.`,
          createdbyId: id_user,
          phaseId: PHASEIDPRODUCTIONMODE,
        };

        let responseImportant = await api.put(`oportunities/important/${oportunity.id}`, data);
        if (responseImportant.status === 200) {
          socket?.emit("send_notify_activity", {
            activity: {
              type: "update",
              from: "oportunities",
              message: `La Cotización ${oportunity?.concepto} se marco como importante.`,
              data: { data: oportunity },
              ejecutiveId: id_user,
              groupId: groupId,
              companyId: id_company,
            },
          });
          handleGlobalAlert("success", "El estatus de la oportunidad cambio", "basic", dispatch, 6000);
          toggleImportantModal();
          setFlag(!flag);
          setLoaderComplete(false);
          setImportantOptionSelected("");
          dispatch(
            createNewTracking({
              data: bodyNewTracking,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Oportunidad - ocurrio un error al marcar como importante", "basic", dispatch, 6000);
      setLoaderComplete(false);
    }
  };

  const closeModal = () => {
    setOportunity("");
    setOpenModal({ ...openModal, activate: false, type: "" });
    setStep(0);
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
                {toUpperCaseChart(validateInfo(oportunity?.nombre?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Email className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Correo</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(oportunity?.correo?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Note className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Concepto</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(oportunity?.concepto?.slice(0, 50)))}{" "}
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
              <p className="dialogContainer__item__content">¿Está seguro de proceder a descartar la cotización?</p>
            </Grid>
          </Grid>
        );
      default:
        break;
    }
  };

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  // RESTABLECER OPORTUNIDAD

  // * restablece una oportunidad boton
  const confirmRestore = oportunity => {
    setOportunity(oportunity);
    setOpenModal({ ...openModal, activate: true, type: "restore" });
  };

  // * restablecer oportunidad contenido del modal
  const modalRestore = (
    <ContainerModal>
      <p className="title">¿Estas seguro de esto?</p>
      <p className="titleNameRestore">Se restablecera la oportunidad de tus registros</p>
      <div className="containerBodyRestore">
        <Button className="cancel" color="primary" onClick={() => closeModal()}>
          Cancelar
        </Button>
        <Button className="accept" color="primary" onClick={() => restoreOportunity()}>
          Aceptar
        </Button>
      </div>
    </ContainerModal>
  );

  // * funcion para restablecer oportunidad
  const restoreOportunity = async () => {
    try {
      await api.put(`/oportunities/resetoportunity/${oportunity.id}`);
      handleAlert("success", "Oportunidad - Restaurada!", "basic");
      setFlag(!flag);
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se restauro la oportunidad!", "basic");
    }
    closeModal();
  };

  const handleClickConverToSale = item => {
    router.push({
      pathname: `/clientes/nuevo/`,
      query: {
        p: item.prospectId,
        o: item.id,
      },
    });
  };
  const handleClickQuoteAgain = item => {
    router.push({
      pathname: `/oportunidades/nuevo/`,
      query: { p: item.prospectId },
    });
  };
  const handleClickOpenWhatsApp = item => {
    let oportunity = { ...item.itemBD };
    oportunity.idOportunity = item.id;
    setProspectSelected(oportunity);
    setOpenWhatsApp(true);
  };
  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(true);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
    setprospectEdit(item);
  };
  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("o_keywordAdministrationSales");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleClickRejectOportunity = item => {
    setOportunity(item);
    toggleRejectedModal();
  };
  const handleClickImportantOportunity = item => {
    setOportunity(item);

    toggleImportantModal();
  };
  // * restablece una oportunidad boton
  const confirmRestoreImportant = oportunity => {
    setOportunity(oportunity);
    toggleImportantRestore();
  };

  const handleClickImportantRestore = item => {
    setOportunity(item);
    toggleRejected();
  };

  return (
    <OportinitiesStyled isOpen={openMenuSide}>
      <Head>
        <title>CRM JOBS - Oportunidades</title>
      </Head>
      {/* <SideBarAdministrationSales open={open} setOpen={setOpen} />
      <NavBarDashboardAdministrationSales sideBar={true} /> */}
      <div className="main">
        <div className="ctr_oportunities">
          <div className="head">
            <div className="head__title">
              <h1>Oportunidades</h1>
              <p className="total">
                <People />
                {totalOportunities} Registros
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
                onChange={e => validateSearchBoxEmpty(e.target.value)}
                placeholder="Ingresa Nombre o Correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setNameSearch(searchKey);
                    setFlag(!flag);
                    if (page > 1) {
                      setPage(1);
                    }
                  }
                }}
              />
              <SearchOutlined className="search" />
              <FilterList className="filters" onClick={() => setOpenFilters(true)} />
            </div>
          </div>
          <div className="filters_chip">
            {!openFilters && (
              <>
                {Object.keys(inQueryNew).map((item, index) => {
                  if (inQueryNew[item].show == true) {
                    return (
                      <Chip
                        key={index}
                        color="primary"
                        size="small"
                        onDelete={() => handleSelectInQueryDelete(inQueryNew[item].identifier)}
                        label={`${inQueryNew[item].type} : ${inQueryNew[item].name}`}
                        className="chip"
                      />
                    );
                  }
                  return null;
                })}

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

                {typeDate.name !== undefined && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setTypeDate({});
                      setFlag(!flag);
                    }}
                    label={`Fecha : ${typeDate.name}`}
                    className="chip"
                  />
                )}

                {rangeDate.name !== undefined && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setRangeDate({});
                      setFlag(!flag);
                      setDateFrom("");
                      setDateTo("");
                    }}
                    label={`Rango : ${rangeDate.name}`}
                    className="chip"
                  />
                )}

                {nameSearch && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeSearchKey}
                    label={`Búsqueda: ${nameSearch}`}
                    className="chip"
                  />
                )}
              </>
            )}
          </div>
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
                  {optionsOrder.map((item, index) => (
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
                discartedTable={showDiscatedTableOportunities}
                heads={!showDiscatedTableOportunities ? heads : headsDiscarted}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                handleClickName={(item, e) => handleClickOportunity(item, e)}
                handleClickAddTracking={handleClickAddTracking}
                handleClickConverToSale={handleClickConverToSale}
                handleClickQuoteAgain={handleClickQuoteAgain}
                handleClickDiscardOportunities={ConfirmDelete}
                handleClickRestore={confirmRestore}
                handleClickAddPending={handleClickAddPending}
                handleClickOpenWhatsApp={handleClickOpenWhatsApp}
                handleClickRejectOportunity={handleClickRejectOportunity}
                handleClickImportantOportunity={handleClickImportantOportunity}
                handleCliclImportantRestore={confirmRestoreImportant}
                handleCliclRejectedRestore={handleClickImportantRestore}
              />
              {oportunities.length > 0 && (
                <div className="table__pagination">
                  <Pagination
                    shape="rounded"
                    color="primary"
                    count={totalPages}
                    defaultPage={1}
                    page={page}
                    onChange={handlePagination}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <WhatsappV2
        idOportunity={prospectSelected.idOportunity}
        isOportunity={true}
        isClient={false}
        isProspect={false}
        prospect={prospectSelected}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
      />
      <DrawerOportunitiesAdmin
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
      <Modal
        open={openRejectedModal}
        onClose={closeModalRejected}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ContainerModalRejected>
          <div className="title">
            <p>Rechazar Cotización</p>
            {loaderCompleteRejected && <CircularProgress className="title__loader" />}
          </div>

          <div className="containerBody">
            <Grid container>
              <Grid item md={6}>
                <div className="column">
                  <div className="row">
                    <AccountBox />
                    <p className="label">Nombre</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.nombre?.slice(0, 50)))} </p>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="column">
                  <div className="row">
                    <Email />
                    <p className="label">Correo</p>
                  </div>
                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.correo?.slice(0, 50)))} </p>
                </div>
              </Grid>

              <Grid item md={6}>
                <div className="column">
                  <div className="row">
                    <Note />
                    <p className="label">Concepto</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.concepto?.slice(0, 50)))} </p>
                </div>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className="row">
                <Note />
                <p className="label">Razon</p>
              </div>
              <Select
                maxMenuHeight={220}
                className="dialogContainer__item__select"
                placeholder="Selecciona una opción"
                options={rejectedReasons}
                onChange={e => setRejectedOptionSelected(e.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
              />
            </Grid>

            <div className="buttons">
              <Button
                disabled={loaderCompleteRejected}
                className={`dialogContainer__buttons__cancel ${loaderComplete && "disabled"}`}
                color="primary"
                onClick={() => closeModalRejected()}
              >
                Cancelar
              </Button>

              <Button
                disabled={loaderCompleteRejected}
                className={`dialogContainer__buttons__acept ${loaderComplete && "disabled"}`}
                color="primary"
                onClick={rejectOportunity}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </ContainerModalRejected>
      </Modal>
      <Modal
        open={openModal.activate}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {openModal.type == "restore" ? (
          modalRestore
        ) : (
          <ContainerModal>
            <div className="title">
              <p>Descartar Cotización</p>
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
                  onClick={handleSubmit(deleteOportunity)}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </ContainerModal>
        )}
      </Modal>
      {/* --------------------------------------------Marcar como importante */}
      <Modal
        open={openImportantModal}
        onClose={closeModalImportant}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ContainerModalImportant>
          <div className="title">
            <p>Marcar cotización como importante</p>
            {loaderComplete && <CircularProgress className="title__loader" />}
          </div>

          <div className="containerBody">
            <Grid container>
              <Grid item md={12}>
                <div className="column">
                  <div className="row">
                    <AccountBox />
                    <p className="label">Nombre</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.nombre?.slice(0, 50)))} </p>
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="column">
                  <div className="row">
                    <Email />
                    <p className="label">Correo</p>
                  </div>
                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.correo?.slice(0, 50)))} </p>
                </div>
              </Grid>

              <Grid item md={12}>
                <div className="column">
                  <div className="row">
                    <Note />
                    <p className="label">Concepto</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(validateInfo(oportunity?.concepto?.slice(0, 50)))} </p>
                </div>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className="row">
                <Note />
                <p className="label">Razon</p>
              </div>
              <Select
                maxMenuHeight={220}
                className="dialogContainer__item__select"
                placeholder="Selecciona una opción"
                options={importantReasons}
                onChange={e => setImportantOptionSelected(e.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
              />
            </Grid>
            <Box m={8}></Box>
            <div className="buttons">
              <Button
                disabled={loaderComplete}
                className={`dialogContainer__buttons__cancel ${loaderComplete && "disabled"}`}
                color="primary"
                onClick={() => closeModalImportant()}
              >
                Cancelar
              </Button>
              <Button
                disabled={loaderComplete}
                className={`dialogContainer__buttons__acept ${loaderComplete && "disabled"}`}
                onClick={handleImportantOportunity}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </ContainerModalImportant>
      </Modal>

      <AddPending
        oportunity={true}
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
        prospectEdit={prospectEdit}
      />
      <ModalRestoreImportant
        oportunity={oportunity}
        open={openImportanRestore}
        setOpen={setOpen}
        close={closeModalRestore}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
        toggleImportantRestore={toggleImportantRestore}
      />
      <ModalRestoreReject
        oportunity={oportunity}
        open={openRejectedRestoret}
        setOpen={setOpen}
        close={closeModalRejectedRestore}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
        toggleRejected={toggleRejected}
      />
      <DrawerFiltersOportunitiesAdmin
        id_user={id_user}
        anchor="right"
        open={openFilters}
        setOpen={setOpenFilters}
        flag={flag}
        setFlag={setFlag}
        filters={filters}
        setFilters={setFilters}
        clientCompany={clientCompany}
        setClientCompany={setClientCompany}
        ejecutive={ejecutive}
        setEjecutive={setEjecutive}
        group={group}
        setGroup={setGroup}
        typeDate={typeDate}
        setTypeDate={setTypeDate}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
        dateTo={dateTo}
        setDateTo={setDateTo}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        isRangeOk={isRangeOk}
        setIsRangeOk={setIsRangeOk}
        applyFilters={applyFilters}
        roleId={roleId}
        inQueryNew={inQueryNew}
        queryNew={queryNew}
        handleSelectQuery={handleSelectQuery}
        handleSelectInQuery={handleSelectInQuery}
        respaldo={respaldo}
        setRespaldo={setRespaldo}
        ejecutives={ejecutives}
        setEjecutives={setEjecutives}
      />
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </OportinitiesStyled>
  );
}

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

const initialInQuery = {
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

const initialQuery = {
  discarted: {
    id: null,
    name: null,
    type: "Descartados",
    show: false,
    identifier: "discarted",
  },
  rejected: {
    id: null,
    name: null,
    type: "Rechazadas",
    show: false,
    identifier: "rejected",
  },
  isimportant: {
    id: null,
    name: null,
    type: "Importantes",
    show: false,
    identifier: "isimportant",
  },
};
const optionsOrder = [
  { label: "Fecha de Creación", value: "createdAt" },
  { label: "Fecha de Actualización", value: "updatedAt" },
  { label: "Fecha de Cierre", value: "estimatedclossing" },
  { label: "Fecha Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
  { label: "Fecha Creación Prospecto", value: "createdAtProspect" },
  { label: "Fecha Actualización Prospecto", value: "updatedAtProspect" },
  { label: "Monto Cotizado", value: "amount" },
  { label: "Certeza", value: "certainty" },
];
