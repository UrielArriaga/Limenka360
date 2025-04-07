import { ChipsContainer, Error, Field, FiltersPayments, PedidosStyled, PurpleSwitch } from "../../styles/Pedidos";
import Head from "next/head";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Assignment, Cached, Close, FilterList, SearchOutlined } from "@material-ui/icons";
import { Box, Button, Chip, Grid, IconButton, TextField, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import TableComponent from "../../components/TableDataComponetOrders";
import { handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { Pagination } from "@material-ui/lab";
import DrawerOrder from "../../components/DrawerOrder";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { normalizeTableDataOrders, normalizeTableDataOrdersDiscarted } from "../../utils/normalizeData";
import dayjs from "dayjs";
import MainLayout from "../../components/MainLayout";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { motion } from "framer-motion";
import {
  FiltersOrderEjecutive,
  filterDescartedEjecutive,
  filtersTypeDateEjecutive,
  headsDiscartedOrderEjecutive,
  headsOrdersEjecutive,
  optionsStatusEjecutive,
  orderByOrdersExecutive,
} from "../../BD/databd";
import ModalTracking from "../../components/ModalTracking";
import LoaderTable from "../../components/UI/molecules/LoaderTable";
import ModalDeleteOrder from "../../components/UI/organism/ModalDeleteOrder";
import ModalRestoreOrder from "../../components/UI/organism/ModalRestoreOrder";
export default function Pedidos() {
  // * HandlesEvents Table
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { id_user, roleId } = useSelector(userSelector);
  const [queryNew, setQueryNew] = useState(initialQueryFiltersOrders);
  const router = useRouter();
  const [totalOrder, setTotalOrder] = useState(0);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [orderTable, setOrderTable] = useState([]);
  const [showChips, setShowChips] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 30;
  const [cf, setCf] = useState({});
  const [method, setMethod] = useState({});
  const [payment, setPayment] = useState({});
  const [regime, setRegime] = useState({});
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [filterDate, setFilterDate] = useState({
    applyFilter: false,
    identifier: "",
    label: "",
    filterby: "",
    value: "",
  });
  const [showDrawer, setshowDrawer] = useState(false);
  const [prospectId, setProspectId] = useState("");
  const [oportunityId, setOportunityId] = useState("");
  const [ordersId, setOrdersId] = useState("");
  const [orders, setOrders] = useState({});
  const [openConfirmDelete, setopenConfirmDelete] = useState(false);
  const [openConfirmRestore, setopenConfirmRestore] = useState(false);
  const [showDiscatedTableOrders, setshowDiscatedTableOrders] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState(false);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const { getCatalogBy } = useGlobalCommons();
  const [prospectSelected, setProspectSelected] = useState({});
  const { taxregime, paymentway, paymentmethod, cfdi, paymentsacount, discardreasonsOrders, orderstatus } =
    useSelector(commonSelector);
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);

  useEffect(() => {
    let mounted = true; 
    if (mounted) {
      getOrders();
    }
    return () => (mounted = false);
  }, [id_user, page, flag, limit, readyLocalStorage, orderBy]);

  useEffect(() => {
    getCatalogBy("phases");
    getCatalogBy("actions");
  }, []);

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

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem("orderEjecutive_keyword");
    if (searchkeyword) {
      setNameSearch(searchkeyword);
      setSearchKey(searchkeyword);
    }
    let query = localStorage.getItem("orderEjecutive_query");
    if (query) {
      let result = JSON.parse(query);
      if (result["discarted"].show === true) {
        setshowDiscatedTableOrders(true);
      }
      setQueryNew(result);
      setShowChips(true);
    }

    let orderby = localStorage.getItem("orderEjecutive_order");
    if (orderby) {
      setOrderBy(JSON.parse(orderby));
    }
    let asc = localStorage.getItem("orderEjecutive_asc");

    let newVariable = localStorage.getItem("orderEjecutiveNew_asc");

    if (newVariable === null) {
      localStorage.setItem("orderEjecutive_asc", JSON.stringify(false));
      localStorage.setItem("orderEjecutiveNew_asc", JSON.stringify(ASC));
      setASC(false);
    } else {
      if (asc) {
        setASC(JSON.parse(asc));
      }
    }

    let filterDateProspect = localStorage.getItem("orderEjecutive_date");
    if (filterDateProspect) {
      let dataFilter = JSON.parse(filterDateProspect);
      if (dataFilter.filterby === "Rango" && dataFilter?.filterby?.value) {
        setDateStart(dayjs(dataFilter.value[0]).format("YYYY-MM-DD"));
        setDateFinish(dayjs(dataFilter.value[1]).format("YYYY-MM-DD"));
      } else {
        let searchValue = FiltersOrderEjecutive.filter(item => item.label === dataFilter.label);
        if (searchValue.length > 0) dataFilter.value = searchValue[0].value;
      }
      setFilterDate(dataFilter);
    }
    setReadyLocalStorage(true);
  };

  const generateFilters = () => {
    let query = {};
    let inQueryBill = {};
    query.bill = inQueryBill;
    query.discarted = showDiscatedTableOrders;

    if (roleId !== "gerente") {
      query.createdbyId = id_user;
    }

    if (hasValue(nameSearch)) {
      saveDataLocalStorage(nameSearch, "keyword", "orderEjecutive_keyword");
      query.oportunity = {
        prospect: {
          fullname: {
            regexp: nameSearch.toLocaleLowerCase(),
          },
        },
      };
    } else {
      setNameSearch("");
    }
    Object.keys(queryNew).forEach((propertyName, index) => {
      if (queryNew[propertyName].show === true) {
        switch (propertyName) {
          case "cfdiId":
            inQueryBill[propertyName] = queryNew[propertyName].id;

            break;
          case "paymentmethodId":
            inQueryBill[propertyName] = queryNew[propertyName].id;
            break;
          case "paymentwayId":
            inQueryBill[propertyName] = queryNew[propertyName].id;
            break;
          case "taxregimeId":
            inQueryBill[propertyName] = queryNew[propertyName].id;
            break;

          default:
            query[propertyName] = queryNew[propertyName].id;
            break;
        }
      }
    });
    if (filterDate.applyFilter) {
      query[filterDate.identifier] = { between: filterDate.value };
    }

    return query;
  };

  const getOrders = async () => {
    if (readyLocalStorage === false) return;
    try {
      setisLoading(true);
      let query = generateFilters();

      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        skip: page,
        order: `${ASC ? "" : "-"}${orderBy}`,
        join: validateJoins({}),
        include:
          "oportunity,oportunity.prospect,oportunity.soldby,oportunity.phase,orderstatus,address,address.city,address.entity,bill,bill.paymentmethod,bill.paymentway,createdbyid,paymentaccount",
      };
      let pedidos = await api.get(`orders`, { params });

      setTotalOrder(pedidos?.data?.count);
      if (showDiscatedTableOrders == true) {
        normalizeDiscarted(pedidos.data.results);
      } else {
        normalizeProspect(pedidos.data.results);
      }
      saveDataLocalStorage(queryNew, "query", "orderEjecutive_query");
      saveDataLocalStorage(ASC, "asc", "orderEjecutive_asc");
      saveDataLocalStorage(orderBy, "order", "orderEjecutive_order");
      saveDataLocalStorage(filterDate, "orderEjecutive_date", "orderEjecutive_date");
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const validateJoins = () => {
    let joins;
    let resultscfdi = Object.keys(cf).length === 0;
    let resultspayment = Object.keys(payment).length === 0;
    let resultsObjectMethod = Object.keys(method).length === 0;
    let resultsObjectRegimes = Object.keys(regime).length === 0;
    if (
      resultscfdi !== true ||
      resultspayment !== true ||
      resultsObjectMethod !== true ||
      resultsObjectRegimes !== true
    ) {
      joins =
        "oportunity,oportunity.prospect,oportunity.soldby,oportunity.phase,orderstatus,address,address.c,address.e,bill,bill.pm,bill.pw,createdbyid,p";
    } else {
      joins =
        "oportunity,oportunity.prospect,oportunity.soldby,oportunity.phase,orderstatus,address,address.c,address.e,bil,bill.pm,bill.pw,createdbyid,p";
    }
    return joins;
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

  const handleFilter = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(!showChips);
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

  const handleSelectQuery = (e, identifier) => {
    let queryToMutation = queryNew;
    // TODO ADD THIS FUCK
    if (identifier == "discarted") {
      setshowDiscatedTableOrders(true);
    }
    if (identifier === "discarted" || identifier === "billing") {
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

    setQueryNew({ ...queryToMutation });
  };

  const normalizeProspect = order => {
    let newOrder = normalizeTableDataOrders(order);
    setOrderTable(newOrder);
    setisLoading(false);
  };
  const normalizeDiscarted = order => {
    let newOrder = normalizeTableDataOrdersDiscarted(order);
    setOrderTable(newOrder);
    setisLoading(false);
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChips(!showChips);
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("orderEjecutive_keyword");
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const validateSearchBoxEmpty = string => {
    if (string === "") {
      setNameSearch("");
      setFlag(!flag);
    }
    setSearchKey(string);
  };

  const handleClickClient = (itemClient, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      setshowDrawer(true);
      setProspectId(itemClient?.data?.oportunity?.prospectId);
      setOportunityId(itemClient?.data?.oportunity?.id);
      setOrdersId(itemClient?.id);
    } else {
      router.push({
        pathname: "pedidos/pedido",
        query: {
          pe: itemClient?.id,
          pr: itemClient?.data?.oportunity?.prospectId,
          op: itemClient?.data?.oportunityId,
        },
      });
    }
  };

  const handleClickEditOrder = item => {
    if (item?.data?.orderstatus?.status === 2) {
      handleGlobalAlert(
        "error",
        `Este pedido no puede ser editado por Estado de pedido APROBADO`,
        "basic",
        dispatch,
        6000
      );
    } else {
      router.push({
        pathname: "/pedidos/EditarPedido",
        query: {
          pe: item.id,
          op: item?.data?.oportunityId,
        },
      });
    }
  };
  const handleClickDiscardOrder = item => {
    setOrders(item);
    setopenConfirmDelete(!openConfirmDelete);
  };
  const handleClickRestore = item => {
    setOrders(item);
    setopenConfirmRestore(!openConfirmRestore);
  };

  const handleCloseConfirmRestore = () => {
    setOrders("");
    setopenConfirmRestore(false);
  };

  const handleSelectQueryDelete = identifier => {
    switch (identifier) {
      case "groupId":
        setEjecutives(ejecutivesBackup);
        break;
      case "cfdiId":
        setCf({});
        break;
      case "paymentmethodId":
        setMethod("");
        break;
      case "paymentwayId":
        setPayment("");
        break;
      case "taxregimeId":
        setRegime("");
        break;
      case "discarted":
        setshowDiscatedTableOrders(false);
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

  const handleSelectCfdi = item => {
    if (item) {
      let cfd = {
        id: item.id,
        name: item.name,
        type: "CFDI",
      };

      setCf(cfd);
      handleSelectQuery(cfd, "cfdiId");
    } else {
      setCf({});
      handleSelectQuery(null, "cfdiId");
    }
  };

  const handleSelectMethodPayment = item => {
    if (item) {
      let method = {
        id: item.id,
        name: item.name,
        type: "Metodo de pago",
      };

      setMethod(method);
      handleSelectQuery(method, "paymentmethodId");
    } else {
      setMethod({});
      handleSelectQuery(null, "paymentmethodId");
    }
  };

  const handleSelectPaymentWay = item => {
    if (item) {
      let method = {
        id: item.id,
        name: item.name,
        type: "Forma de Pago",
      };

      setPayment(method);
      handleSelectQuery(method, "paymentwayId");
    } else {
      setPayment({});
      handleSelectQuery(null, "paymentwayId");
    }
  };

  const handleSelectRegimes = item => {
    if (item) {
      let method = {
        id: item.id,
        name: item.name,
        type: "Regimen Fiscal",
      };

      setRegime(method);
      handleSelectQuery(method, "taxregimeId");
    } else {
      setRegime({});
      handleSelectQuery(null, "taxregimeId");
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
  const handleClickAddTracking = item => {
    setProspectSelected(item);
    setShowAddTrackings(true);
  };
  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <MainLayout>
      <PedidosStyled>
        <Head>
          <title>CRM JOBS - Pedidos</title>
        </Head>
        <div className="main">
          <div className="ctr_prospects">
            <div className="head">
              <div className="head__title">
                <h1>Pedidos</h1>
                <div className="total">
                  {totalOrder} Registros
                  <Tooltip title="Recargar">
                    <Cached
                      className="reloadIcon"
                      onClick={() => {
                        setFlag(!flag);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="ctr_filter">
              <div className="ctr_filter__ctr_input">
                <TextField
                  variant="outlined"
                  type="search"
                  value={searchKey}
                  onChange={e => validateSearchBoxEmpty(e.target.value)}
                  placeholder="Ingresa Nombre"
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
            <ChipsContainer>
              {!showFilters && (
                <>
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

                  {Object?.keys(queryNew).map((item, index) => {
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
            </ChipsContainer>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
                <Box>
                  <label style={{ marginRight: 5, fontSize: 11 }}>Ordenar por</label>
                  <select
                    className="order-select"
                    onChange={e => {
                      setFlag(!flag);
                      setOrderBy(e.target.value);
                    }}
                    value={orderBy}
                    name=""
                    id=""
                    style={{ marginRight: 5 }}
                  >
                    {orderByOrdersExecutive?.map((item, index) => (
                      <option key={index} value={item.identifier}>
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
            {isLoading && <LoaderTable />}

            {!isLoading && (
              <>
                <TableComponent
                  data={orderTable}
                  id="nombre"
                  discartedTable={showDiscatedTableOrders}
                  heads={showDiscatedTableOrders ? headsDiscartedOrderEjecutive : headsOrdersEjecutive}
                  secondaryColor="#dce1f6"
                  primaryColor="#405189"
                  handleClickName={(item, e) => handleClickClient(item, e)}
                  handleClickEditOrder={handleClickEditOrder}
                  handleClickDiscardOrder={handleClickDiscardOrder}
                  handleClickRestore={handleClickRestore}
                  handleClickAddTracking={handleClickAddTracking}
                />
                {orderTable.length > 0 && (
                  <div className="pagination">
                    <Pagination
                      style={{ display: "flex", justifyContent: "center" }}
                      page={page}
                      defaultPage={1}
                      onChange={handlePagination}
                      shape="rounded"
                      count={Math.ceil(totalOrder / limit)}
                      color="primary"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <FiltersPayments anchor="right" open={showFilters} onClose={closeDrawerFilters}>
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <IconButton onClick={closeDrawerFilters}>
              <Close className="close_icon" />
            </IconButton>
          </div>
          <Field>
            <label>Fecha</label>
            <Select
              className="selects"
              placeholder="Selecciona una Opción"
              options={filtersTypeDateEjecutive}
              value={filtersTypeDateEjecutive.filter(item => item.identifier === filterDate?.identifier)}
              onChange={event => handleValueFilterDate(event, "typeDate")}
              getOptionValue={option => option.identifier}
            />
          </Field>
          {filterDate.identifier !== "" && (
            <Field>
              <label>Periodo</label>
              <Select
                isSearchable={false}
                isClearable={false}
                placeholder="Selecciona un Periodo"
                options={FiltersOrderEjecutive}
                value={FiltersOrderEjecutive.filter(item => item.label === filterDate?.filterby)}
                onChange={event => handleValueFilterDate(event, "filterType")}
              />
            </Field>
          )}
          {filterDate?.filterby === "Rango" && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Field>
                  <label>Fecha Inicio</label>
                  <input
                    className="inputDates"
                    type="date"
                    value={dateStart}
                    onChange={e => {
                      setDateStart(e.target.value);
                    }}
                  ></input>
                </Field>
                <Field>
                  <label>Fecha Termino</label>
                  <input
                    className="inputDates"
                    type="date"
                    value={dateFinish}
                    onChange={e => {
                      setDateFinish(e.target.value);
                    }}
                  ></input>
                </Field>

                <Field>
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
                </Field>
              </motion.div>
            </>
          )}
          <Field>
            <label>Estado de Pedido</label>
            <Select
              placeholder="Selecciona una Opción"
              options={orderstatus.results}
              isLoading={orderstatus.isFetching}
              onMenuOpen={() => getCatalogBy("orderstatus")}
              loadingMessage={() => "Cargando Opciones..."}
              value={orderstatus.results.filter(item => item.id === queryNew["orderstatusId"]?.id)}
              onChange={e => handleSelectQuery(e, "orderstatusId")}
              isClearable={true}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            />
          </Field>
          <Field>
            <label>Factura</label>
            <Select
              placeholder="Seleccione una opción"
              isClearable={true}
              options={optionsStatusEjecutive}
              value={optionsStatusEjecutive.filter(item => item.value === queryNew["billing"]?.id)}
              onChange={e => handleSelectQuery(e, "billing")}
            />
          </Field>
          <Field>
            <label>Cuenta de Pago</label>
            <Select
              isClearable={true}
              options={paymentsacount.results}
              isLoading={paymentsacount.isFetching}
              onMenuOpen={() => getCatalogBy("paymentsacount")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              onChange={e => handleSelectQuery(e, "paymentaccountId")}
              value={paymentsacount.results.filter(item => item.id === queryNew["paymentaccountId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            />
          </Field>
          <Field>
            <label>Uso de Cfdi</label>
            <Select
              isClearable={true}
              placeholder="Selecciona una Opción"
              options={cfdi.results}
              onMenuOpen={() => getCatalogBy("cfdis")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={cfdi.isFetching}
              value={cfdi.results.filter(item => item.id === queryNew["cfdiId"]?.id)}
              onChange={e => handleSelectCfdi(e)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            />
          </Field>
          <Field>
            <label>Metodo de Pago</label>
            <Select
              placeholder="Selecciona una opcion"
              onMenuOpen={() => getCatalogBy("paymentmethods")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={paymentmethod.isFetching}
              options={paymentmethod.results}
              value={paymentmethod.results.filter(item => item.id === queryNew["paymentmethodId"]?.id)}
              onChange={e => handleSelectMethodPayment(e)}
              isClearable={true}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Field>
          <Field>
            <label>Forma de Pago</label>
            <Select
              placeholder="Selecciona una Opción"
              onMenuOpen={() => getCatalogBy("paymentways")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={paymentway.isFetching}
              options={paymentway.results}
              value={paymentway.results.filter(item => item.id === queryNew["paymentwayId"]?.id)}
              onChange={e => handleSelectPaymentWay(e)}
              isClearable={true}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            />
          </Field>
          <Field>
            <label>Regimen Fiscal</label>
            <Select
              value={taxregime?.results.filter(item => item.id === queryNew["taxregimeId"]?.id)}
              placeholder="Selecciona una Opción"
              onChange={e => handleSelectRegimes(e)}
              isLoading={taxregime.isFetching}
              onMenuOpen={() => getCatalogBy("taxregimes")}
              options={taxregime?.results}
              loadingMessage={() => "Cargando Opciones..."}
              isClearable={true}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            />
          </Field>

          <Field>
            <label>Descartados</label>
            <Select
              placeholder="Seleccione una opción"
              options={filterDescartedEjecutive}
              value={filterDescartedEjecutive.filter(item => item.value === queryNew["discarted"]?.id)}
              onChange={e => handleSelectQuery(e, "discarted")}
            />
          </Field>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
              Cancelar
            </Button>
            <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
              Aplicar
            </Button>
          </div>
        </FiltersPayments>
        <DrawerOrder
          width={"60%"}
          closeDrawer={() => setshowDrawer(!showDrawer)}
          show={showDrawer}
          isOportunity={true}
          prospectId={prospectId}
          oportunityId={oportunityId}
          ordersId={ordersId}
        />

        <ModalDeleteOrder
          openConfirmDelete={openConfirmDelete}
          setopenConfirmDelete={setopenConfirmDelete}
          orderTable={orderTable}
          setFlag={setFlag}
          flag={flag}
          orders={orders}
          setOrders={setOrders}
        />
        <ModalRestoreOrder
          open={openConfirmRestore}
          setopen={setopenConfirmRestore}
          orders={orders}
          setFlag={setFlag}
          flag={flag}
          handleClose={handleCloseConfirmRestore}
        />

        <ModalTracking
          isOrder={true}
          prospect={prospectSelected}
          open={showAddTrackings}
          close={handleCloseAddTrackigns}
          handleAlert={handleAlert}
          setAlert={setAlert}
          flag={flag}
          setFlag={setFlag}
          prospectEdit={prospectSelected}
        />
      </PedidosStyled>
    </MainLayout>
  );
}

const initialQueryFiltersOrders = {
  discarted: {
    id: null,
    name: null,
    type: "Descartados",
    show: false,
    identifier: "discarted",
  },
  paymentaccountId: {
    id: null,
    name: null,
    type: "Cuenta de Pago",
    show: false,
    identifier: "paymentaccountId",
  },
  paymentwayId: {
    id: null,
    name: null,
    type: "Forma de Pago",
    show: false,
    identifier: "paymentwayId",
  },
  paymentmethodId: {
    id: null,
    name: null,
    type: "Metodo de Pago",
    show: false,
    identifier: "paymentmethodId",
  },
  cfdiId: {
    id: null,
    name: null,
    type: "Uso de Cfdi",
    show: false,
    identifier: "cfdiId",
  },
  taxregimeId: {
    id: null,
    name: null,
    type: "Regimen Fiscal",
    show: false,
    identifier: "taxregimeId",
  },
  orderstatusId: {
    id: null,
    name: null,
    type: "Estado de Pedido",
    show: false,
    identifier: "orderstatusId",
  },
  billing: {
    id: null,
    name: null,
    type: "Con factura",
    show: false,
    identifier: "billing",
  },
};
