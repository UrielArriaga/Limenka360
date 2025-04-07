import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Switch,
  TextField,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { AccountBox, Cached, Email, FilterList, Note, People, SearchOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { initialFilters } from "../../../../BD/initialStates";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import DrawerFiltersOportunities from "../../../../components/DrawerFiltersOportunities";
import DrawerOportunities from "../../../../components/DrawerOportunities";
import LoaderPage from "../../../../components/LoaderPage";
import AddPending from "../../../../components/ModalAddPendings";
import ModalTracking from "../../../../components/ModalTracking";
import TableComponent from "../../../../components/TableDataComponentOportunities";
import WhatsappV2 from "../../../../components/WhatsappV2";
import { SocketContext } from "../../../../context/socketContext";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import useModal from "../../../../hooks/useModal";
import useValidateLogin from "../../../../hooks/useValidateLogin";
import { companySelector } from "../../../../redux/slices/companySlice";
import { dashboardViewExecutiveSelector } from "../../../../redux/slices/dashboardViewExecutiveSlice";
import { dialogSelector } from "../../../../redux/slices/dialogSlice";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import { createNewTracking } from "../../../../redux/slices/trackingSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../../../services/api";
import RequestCommon from "../../../../services/request_Common";
import { colors } from "../../../../styles/global.styles";
import {
  ContainerModal,
  ContainerModalImportant,
  ContainerModalRejected,
  OportinitiesStyled,
} from "../../../../styles/oportunities";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { normalizeTableDataOpotunity, normalizeTableDataOpotunityDiscarted } from "../../../../utils/normalizeData";
import ModalRestoreImportant from "../../../ModalRestoreImportant";
import ModalRestoreReject from "../../../ModalRestoreReject";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import ModalAddPotential from "../../../ModdalAddPottential";
import ModalDeletePotential from "../../../ModalDeletePottential";

export default function OportunidadesEjecutive({ from }) {
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { discardreasons, importantresons, rejectedreasons } = useSelector(commonSelector);
  const { open: openRejectedModal, toggleModal: toggleRejectedModal, closeModal: closeModalRejected } = useModal();
  const { open: openImportantModal, toggleModal: toggleImportantModal, closeModal: closeModalImportant } = useModal();
  const { open: openImportanRestore, toggleModal: toggleImportantRestore, closeModal: closeModalRestore } = useModal();
  const { open: openRejectedRestoret, toggleModal: toggleRejected, closeModal: closeModalRejectedRestore } = useModal();
  const { open: openPottential, toggleModal: togglePotential, closeModal: closeModalPottential } = useModal();
  const { open: openPottentialDel, toggleModal: togglePotentialDel, closeModal: closeModalPottentialDel } = useModal();
  const { openMenuSide } = useSelector(dialogSelector);

  const { id_executive } = useSelector(dashboardViewExecutiveSelector);

  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  // important
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [importantReasons, setImportantReasons] = useState([]);
  const [importantOptionSelected, setImportantOptionSelected] = useState("");
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
  const [valueFilterDate, setValueFilterDate] = useState({
    identifier: null,
    label: null,
    query: null,
    typeDate: null,
    value: null,
  });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ejecutive, setEjecutive] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState(false);
  const [typeDate, setTypeDate] = useState({});
  const [rangeDate, setRangeDate] = useState({});
  const [prospectSelected, setProspectSelected] = useState({});
  const [totalOportunities, setTotalOportunities] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const router = useRouter();
  const { cve } = router.query;
  const totalPages = Math.ceil(totalOportunities / limit);
  const [filters, setFilters] = useState(initialFilters);
  const [oportunity, setOportunity] = useState();
  const [openModal, setOpenModal] = useState({ activate: false, type: "" });
  const commonApi = new RequestCommon();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [discarded, setDiscarded] = useState({
    value: false,
    type: "Mostar oportunidades",
    name: "descartadas",
    activate: false,
  });
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
  const [showDiscatedTable, setshowDiscatedTable] = useState(false);
  const [showDiscatedTableOportunities, setshowDiscatedTableOportunities] = useState(false);
  const [tag, setTag] = useState("");
  const { id_company } = useSelector(companySelector);
  const { socket } = useContext(SocketContext);

  //-------------//

  // Filtrar por producto
  const [filterProduct, setFilterProduct] = useState({ show: false, label: null, value: null, prodId: null });
  const handleSelectProduct = product =>
    setFilterProduct({ ...filterProduct, show: true, label: "Producto: ", value: product.name, prodId: product.id });
  //--------------------

  //Filtrar por Categoria
  const [filterCategory, setFilterCategory] = useState({ show: false, label: null, value: null, categoryId: null });
  const handleSelectCategory = cate =>
    setFilterCategory({
      ...filterCategory,
      show: true,
      label: "Categoria: ",
      value: cate.name,
      categoryId: cate.id,
    });

  //-----------------
  const heads = [
    "id",
    "nombre",
    "correo",
    "télefono",
    "monto",
    "certeza",
    "categoría de interes",
    "concepto",
    "tipo de cliente",
    "género",
    "puesto",
    "canal",
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
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // other code
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

  const generateFilters = () => {
    let query = {};
    let inQuery = {};
    query.discarted = discarded.value && discarded.activate;
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
    query.prospect = inQuery;
    query.iscloseout = false;
    inQuery.isoportunity = true;
    inQuery.discarted = false;
    if (isEjecutiveSelected === false) {
      inQuery.ejecutiveId = from === "managerview" ? id_executive : id_user;
    }
    if (hasValue(nameSearch)) {
      saveDataLocalStorage(nameSearch, "keyword", "o_keywordEjecutive");

      if (nameSearch.includes("@")) {
        inQuery.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
      } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(nameSearch.trim())) {
        inQuery.phone = { iRegexp: `${nameSearch.trim()}` };
      } else {
        if (/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)*$/im.test(nameSearch.trim())) {
          inQuery.fullname = { iRegexp: `${nameSearch.trim()}` };
        } else {
          query.concept = { iRegexp: `${nameSearch.trim()}` };
        }
      }
    } else {
      setNameSearch("");
    }
    Object.keys(inQueryNew).forEach((propertyName, index) => {
      if (inQueryNew[propertyName].show === true) {
        if (propertyName === "prospectslabels") {
          inQuery.prospectslabels = {
            labelId: inQueryNew[propertyName].id,
          };
        } else {
          inQuery[propertyName] = inQueryNew[propertyName].id;
        }
      }
    });
    Object.keys(queryNew).forEach((propertyName, index) => {
      if (queryNew[propertyName].show === true) {
        query[propertyName] = queryNew[propertyName].id;
      }
    });

    if (valueFilterDate.identifier && valueFilterDate.label) {
      if (valueFilterDate.query) {
        if (valueFilterDate.label === "Rango") {
          if (isRangeOk) {
            query[valueFilterDate.query][valueFilterDate.identifier] = valueFilterDate.value;
          }
        } else {
          query[valueFilterDate.query][valueFilterDate.identifier] = valueFilterDate.value;
        }
      } else {
        if (valueFilterDate.label === "Rango") {
          if (isRangeOk) {
            query[valueFilterDate.identifier] = valueFilterDate.value;
          }
        } else {
          query[valueFilterDate.identifier] = valueFilterDate.value;
        }
      }
    }
    return query;
  };

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("o_keywordEjecutive");
    if (searchkeyword) {
      setNameSearch(searchkeyword);
      setSearchKey(searchkeyword);
    }
    let query = localStorage.getItem("o_queryEjecutive");
    if (query) {
      if (queryNew["discarted"].show === true) {
        setshowDiscatedTableOportunities(true);
      }
      setQueryNew(JSON.parse(query));
    }
    let inquery = localStorage.getItem("o_inqueryEjecutive");
    if (inquery) {
      setInQueryNew(JSON.parse(inquery));
    }
    let orderby = localStorage.getItem("o_orderEjecutive");
    if (orderby) {
      setOrderBy(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("o_ascEjecutive");
    let newVariable = localStorage.getItem("o_ascNewEjecutive");

    if (newVariable === null) {
      localStorage.setItem("o_ascEjecutive", JSON.stringify(false));
      localStorage.setItem("o_ascNewEjecutive", JSON.stringify(ASC));
      setASC(false);
    } else {
      if (asc) {
        setASC(JSON.parse(asc));
      }
    }
    let filterDate = localStorage.getItem("o_filterDateExecutive");
    if (filterDate) {
      setValueFilterDate(JSON.parse(filterDate));
      setIsRangeOk(true);
    }
    let filterProduct = localStorage.getItem("o_FilterProductExecutive");
    if (filterProduct) setFilterProduct(JSON.parse(filterProduct));
    let filterCategory = localStorage.getItem("o_FilterCategoryExecutive");
    if (filterCategory) setFilterCategory(JSON.parse(filterCategory));
    setReadyLocalStorage(true);
  };

  const getOportunities = async () => {
    setisLoading(true);
    if (readyLocalStorage === false) return;
    try {
      let namePoint =
        filterProduct?.show || filterCategory?.show ? "oportunities/filterproducts/oportunities" : "oportunities";
      let query = generateFilters();
      let params = {
        include:
          "prospect,prospect.ejecutive,prospect.category,prospect.phase,prospect.clienttype,prospect.channel,phase",
        where: JSON.stringify(query),
        limit: limit,
        count: 1,
        join: "prospect,prospect.ejecutive,prospect.c,prospect.phase,prospect.clienttyp,prospect.ch,p",
        order: validateOrder(),
        skip: page,
      };
      let responseOportunities = await api.get(`${namePoint}`, { params });
      let results = responseOportunities?.data.results;
      if (showDiscatedTableOportunities == true) {
        normalizeDiscarted(results);
      } else {
        normalizeProspect(results);
      }
      setisLoading(false);
      setTotalOportunities(responseOportunities.data?.count);
      saveDataLocalStorage(valueFilterDate, "dateFilter", "o_filterDateExecutive");
      saveDataLocalStorage(queryNew, "query", "o_queryEjecutive");
      saveDataLocalStorage(inQueryNew, "query", "o_inqueryEjecutive");
      saveDataLocalStorage(ASC, "asc", "o_ascEjecutive");
      saveDataLocalStorage(orderBy, "order", "o_orderEjecutive");
      saveDataLocalStorage(filterProduct, "productfilter", "o_FilterProductExecutive");
      saveDataLocalStorage(filterCategory, "categoryfilter", "o_FilterCategoryExecutive");
    } catch (error) {
      console.log(error);
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
      orderBy === "certainty" ||
      orderBy === "concept"
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
    let normalizeData = results.map(item => normalizeTableDataOpotunity(item));
    setshowDiscatedTable(false);
    setOportunities(normalizeData);
    setisLoading(false);
  };
  const normalizeDiscarted = order => {
    let newOrder = order.map(item => normalizeTableDataOpotunityDiscarted(item));
    setshowDiscatedTable(true);
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

    // TODO ADD THIS FUCK
    if (identifier == "discarted") {
      setshowDiscatedTable(true);
      setshowDiscatedTableOportunities(true);
    }

    if (
      identifier === "gender" ||
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
    if (identifier === "discarted" || identifier === "viewed" || identifier === "isclient") {
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
    if (identifier === "ejecutiveId") {
      setIsEjecutiveSelected(true);
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
      // 27/10/2022 se agrego el orden se los pendientes
      setOrderPendigs({ value: "date_from", label: "Fecha de Pendiente" });
      setRefetchPendings(!refetchPendings);
      setFlagTrackings(!flagTrackings);
    } else {
      //return console.log("cve: ", cve)
      if (cve == "0111") {
        router.push({
          pathname: "/oportunidades/[prospecto]",
          query: {
            prospecto: itemOportunity.prospectId,
            cve: cve,
          },
        });
      } else {
        router.push({ pathname: "oportunidades/[prospecto]", query: { prospecto: itemOportunity.prospectId } });
      }
    }
  };
  const handlePagination = (event, page) => {
    setPage(page);
  };

  const handleSelectInQueryDelete = identifier => {
    if (identifier === "prospectslabels") {
      setTag("");
    }
    let inqueryItem = {};
    let inqueryToMutate = inQueryNew;
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
    if (identifier === "ejecutiveId") {
      setIsEjecutiveSelected(false);
    }
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

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const deleteOportunity = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          let reason = discardreasons.results.filter(item => item.id == formData?.descarted?.id);
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
      console.log(error);
    }
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
              data: { data: responseRejected.data, oportunity: oportunity },
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
        let opoProducts = await api.get(`oportunities/${oportunity.id}`);
        if (responseImportant.status === 200) {
          socket?.emit("send_notify_activity", {
            activity: {
              type: "update",
              from: "oportunities",
              message: `La Cotización ${oportunity?.concepto} se marco como importante.`,
              data: {
                data: responseImportant.data,
                oportunity: oportunity,
                products: opoProducts.data.productsoportunities,
              },
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

  // * elimina una oportunidad
  const ConfirmDelete = oportunity => {
    setOportunity(oportunity);
    setOpenModal({ ...openModal, activate: true });
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
                    onMenuOpen={() => getCatalogBy("discardreasons")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={discardreasons.isFetching}
                    maxMenuHeight={220}
                    className="dialogContainer__item__select"
                    placeholder="Selecciona una opción"
                    options={discardreasons.results}
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
    cleanData();
  };
  const handleClickEditOportunity = item => {
    router.push({
      pathname: `/oportunidades/editar/`,
      query: { o: item.id },
    });
  };
  const handleClickOpenWhatsApp = item => {
    let oportunity = { ...item.itemBD };
    oportunity.idOportunity = item.id;
    setProspectSelected(oportunity);
    setOpenWhatsApp(true);
  };
  const handleClickAddPending = item => {
    // console.log("ITEM", item);
    setProspectPending(item);
    setShowAddPending(true);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
    setprospectEdit(item);
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
  const handleClickpottential = item => {
    setOportunity(item);
    togglePotential();
  };
  const handleClickpottentialDelete = item => {
    setOportunity(item);
    togglePotentialDel();
  };

  const handleCreateDemo = item => {
    router.push({
      pathname: `/demos/nuevo/`,
      query: { idOportunity: item.id },
    });
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("o_keywordEjecutive");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const cleanData = () => {
    dispatch(setArrayProducts([]));
  };

  if (isLoadingPage) return <LoaderPage />;
  return (
    <OportinitiesStyled isOpen={openMenuSide}>
      <Head>
        <title>CRM JOBS - Oportunidades</title>
      </Head>
      {/* {from === "managerview" ? <SideBarCustomExecutive /> : <SideBar open={open} setOpen={setOpen} />}
      <NavBarDashboard sideBar={true} /> */}
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

                {filterProduct?.show && (
                  <Tooltip title={("", filterProduct?.value)} arrow={true}>
                    <Chip
                      color="primary"
                      size="small"
                      onDelete={() => {
                        setFilterProduct({ ...filterProduct, show: false });
                        setFlag(!flag);
                      }}
                      label={`Producto : ${
                        filterProduct?.value.length > 10
                          ? filterProduct?.value.slice(0, 10) + "..."
                          : filterProduct?.value
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
                      }}
                      label={`Categoria producto Cotizado : ${
                        filterCategory?.value.length > 10
                          ? filterCategory?.value.slice(0, 10) + "..."
                          : filterCategory?.value
                      }`}
                      className="chip"
                    />
                  </Tooltip>
                )}

                {valueFilterDate.identifier && valueFilterDate.value && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setValueFilterDate({
                        identifier: null,
                        label: null,
                        query: null,
                        typeDate: null,
                        value: null,
                      });
                      setFlag(!flag);
                      setIsRangeOk(false);
                      setDateFrom("");
                      setDateTo("");
                    }}
                    label={`${valueFilterDate.typeDate} : ${
                      valueFilterDate.label === "Rango"
                        ? dayjs(valueFilterDate.value.between[0]).format("DD-MM-YYYY") +
                          " al " +
                          dayjs(valueFilterDate.value.between[1]).format("DD-MM-YYYY")
                        : valueFilterDate.label
                    } `}
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
                heads={!showDiscatedTable ? heads : headsDiscarted}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                handleClickEditToOportunity={handleClickEditOportunity}
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
                handleClickpottential={handleClickpottential}
                handleClickDeletepottential={handleClickpottentialDelete}
                handleCreateDemo={handleCreateDemo}
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
        flag={flag}
        setFlag={setFlag}
      />
      <DrawerOportunities
        isOportunity={true}
        width={"60%"}
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        prospectId={prospectId}
        oportunityId={oportunityId}
        // 27/10/2022 se agrego el orden se los pendientes
        orderPendings={orderPendings}
        setOrderPendigs={setOrderPendigs}
        refetch={refetchPendings}
        setRefetch={setRefetchPendings}
        flag={flagTrackings}
        setFlag={setFlagTrackings}
        //--------------//
        handleClickAddTracking={handleClickAddTracking}
        handleClickAddPending={handleClickAddPending}
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
                  <p className="content"> {validateInfo(oportunity?.correo?.slice(0, 50))} </p>
                </div>
              </Grid>

              <Grid item md={6}>
                <div className="column">
                  <div className="row">
                    <Note />
                    <p className="label">Concepto</p>
                  </div>

                  <p className="content"> {validateInfo(oportunity?.concepto?.slice(0, 50))} </p>
                </div>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <div className="row">
                <Note />
                <p className="label">Razon</p>
              </div>
              <Select
                onMenuOpen={() => getCatalogBy("rejectedreasons")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={rejectedreasons.isFetching}
                maxMenuHeight={220}
                className="dialogContainer__item__select"
                placeholder="Selecciona una opción"
                options={rejectedreasons.results}
                onChange={e => setRejectedOptionSelected(e.id)}
                getOptionValue={option => option.id}
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
                onMenuOpen={() => getCatalogBy("importantresons")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={importantresons.isFetching}
                maxMenuHeight={220}
                className="dialogContainer__item__select"
                placeholder="Selecciona una opción"
                options={importantresons.results}
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
      *{" "}
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
      <ModalAddPotential
        oportunity={oportunity}
        open={openPottential}
        setOpen={setOpen}
        close={closeModalPottential}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
        toggle={togglePotential}
      />
      <ModalDeletePotential
        oportunity={oportunity}
        open={openPottentialDel}
        setOpen={setOpen}
        close={closeModalPottentialDel}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
        toggle={togglePotentialDel}
      />
      <DrawerFiltersOportunities
        valueDate={valueFilterDate}
        setValueDate={setValueFilterDate}
        tag={tag}
        setTag={setTag}
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
        handleSelectProduct={handleSelectProduct}
        handleSelectCategory={handleSelectCategory}
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
  isclient: {
    id: null,
    name: null,
    type: "Clientes",
    show: false,
    identifier: "isclient",
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
  { label: "Concepto", value: "concept" },
];
