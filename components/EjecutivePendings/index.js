import { Button, CircularProgress, Divider, Grid, IconButton, Tooltip } from "@material-ui/core";
import {
  ArrowDropDown,
  Assignment,
  CachedOutlined,
  Check,
  Close,
  ErrorOutline,
  FilterListOutlined,
  NavigateBefore,
  NavigateNext,
  NotificationsActive,
  PersonPinCircle,
  RingVolume,
  RoomOutlined,
  TimerOutlined,
  WatchLater,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
import { getSlopesByQuery, slopesSelector, getSlopesByQuery2 } from "../../redux/slices/slopesSlice";
import { userSelector } from "../../redux/slices/userSlice";
import RequestCommon from "../../services/request_Common";
import { returnFomatTime, toUpperCaseChart } from "../../utils";
import CompletePending from "../ModalCompletePendings";
import { AlertDate, AlertPending, DrawerStyle, Main, SelectOptions } from "./styles.styled";
export default function Pendientes({
  role,
  drawerShowPending,
  setDrawerShowPending,
  setTotalPendings,
  totalPendings,
  ...props
}) {
  const { slopesresults, totalSlopes, isFetchingSlopes, isErrorSlopes, isSuccesSlopes, reloadFething, messageError } =
    useSelector(slopesSelector);

  const { getCatalogBy } = useGlobalCommons();
  const { pendingstypes } = useSelector(commonSelector);

  const router = useRouter();
  const commonApi = new RequestCommon();
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [pendingItem, setPendingItem] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [confirmationPending, setConfirmationPending] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [canSearchRange, setCanSearchRange] = useState(false);
  const [isloaderPendings, setisLoaderPendings] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByRange, setFilterByRange] = useState("");
  const [orderBy, setOrderBy] = useState({ id: 1, name: "Pendientes por Vencer", value: "date_to" });
  const [limitPendings, setLimitPendings] = useState(10);
  const [page, setPage] = useState(1);
  const { id_user } = useSelector(userSelector);
  const mainTop = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorSelect, setAnchorSelect] = useState(null);
  const openSelect = Boolean(anchorSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    console.log("role:", role);
  }, [refetch, page, reloadFething]);

  useEffect(() => {
    if (dateStart !== "" && dateFinish !== "") {
      if (dateFinish < dateStart) {
        setCanSearchRange(false);
      } else {
        setCanSearchRange(true);
        setRefetch(!refetch);
      }
    } else {
      setCanSearchRange(false);
    }
  }, [dateStart, dateFinish]);

  const handleSelectOpen = event => {
    setAnchorSelect(event.currentTarget);
  };
  const handleSelectClose = () => {
    setAnchorSelect(null);
  };

  const drawerClose = () => {
    setDrawerShowPending(false);
  };
  const iconReload = () => {
    setRefetch(!refetch);
  };

  const finishPending = item => {
    setPendingItem(item);
    setConfirmationPending(true);
  };
  const redirectProspect = item => {
    setDrawerShowPending(false);
    let prospect = item.prospect;
    if (prospect.isoportunity === true) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    } else {
      router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: prospect.id } });
    }
  };

  const handleSelectPeriod = period => {
    if (period) {
      setFilterByRange(period.value);
    } else {
      setFilterByRange("");
    }
    setRefetch(!refetch);
  };

  const handleSelectOptionOrder = option => {
    setOrderBy(option);
    handleSelectClose();
    setRefetch(!refetch);
    if (page > 1) setPage(1);
  };

  const handleSelectFilterBy = filterBy => {
    if (filterBy) {
      setFilterBy(filterBy.id);
    } else {
      setFilterBy("");
    }
    setRefetch(!refetch);
  };

  const getData = () => {
    setisLoaderPendings(true);
    let query = {};
    query.isdone = false;
    if (!["director_compras", "gerente_compras"].includes(role)) {
      query.createdbyId = id_user;
    }

    if (filterByDate) {
      if (filterByRange) {
        if (filterByRange !== "range") {
          let startOf = dayjs().startOf(filterByRange).toISOString();
          let endOf = dayjs().add(1, filterByRange).startOf(filterByRange).add(1, "millisecond").toISOString();
          query[`${filterByDate}`] = { between: [startOf, endOf] };
        } else {
          if (canSearchRange === true) {
            let startRange = dayjs(dateStart).toISOString();
            let endRange = dayjs(dateFinish).add(1, "day").toISOString();
            query[`${filterByDate}`] = { between: [startRange, endRange] };
          }
        }
      }
    }
    if (filterBy === undefined || filterBy === null || filterBy === "") {
      delete query.pendingstypeId;
    } else {
      query.pendingstypeId = filterBy;
    }

    if (!["director_compras", "gerente_compras"].includes(role)) {
    let bodySlopes = {
      where: JSON.stringify(query),
      include: "prospect,pendingstype",
      count: 1,
      order: orderBy.value,
      limit: limitPendings,
      skip: page,
    };

    dispatch(getSlopesByQuery({ params: bodySlopes }));
    } else{
      let bodySlopes = {
        where: JSON.stringify(query),
        include: "pendingstype",
        count: 1,
        order: orderBy.value,
        limit: limitPendings,
        skip: page,
      };
      dispatch(getSlopesByQuery2({ params: bodySlopes }));
    }
    setTotalPendings(totalSlopes);
    if (isSuccesSlopes) {
    }
  };
  const validateInfo = item => {
    if (item === undefined || item === null || item === "") {
      return "";
    } else {
      return item;
    }
  };
  const showPlace = item => {
    if (item.pendingstype?.name == "Cita" || item.pendingstype?.name == "Visita") {
      if (item.place === "" || item.place === undefined || item.place === null) {
      } else {
        return (
          <div className="contenido__item__content__place">
            <RoomOutlined className="contenido__item__content__place__icon" />
            <p className="contenido__item__content__place__title">{item.place}</p>
          </div>
        );
      }
    }
  };
  const returnDesignType = item => {
    switch (item) {
      case "Visita":
        return <PersonPinCircle className="contenido__item__header__title__icon" />;
      case "Cita":
        return <WatchLater className="contenido__item__header__title__icon" />;
      case "Recordatorio":
        return <NotificationsActive className="contenido__item__header__title__icon" />;
      case "Llamada":
        return <RingVolume className="contenido__item__header__title__icon" />;
      case "Tarea":
        return <Assignment className="contenido__item__header__title__icon" />;
      default:
        return <Check />;
    }
  };

  const returnFormatDate = item => {
    if (item === undefined || item === null) {
      return "";
    } else {
      let date = new Date(item);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let dateComplete = day + "/" + month + "/" + year;
      {
      }
      return dateComplete;
    }
  };

  const scrollToTop = () => {
    if (showFilters === false) {
      mainTop.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  const handleSelectTypePending = typePending => {
    if (typePending) {
      setFilterByDate(typePending.value);
    } else {
      setFilterByDate("");
    }
    setRefetch(!refetch);
  };

  const handleClose = () => {
    setConfirmationPending(false);
    setPendingItem({});
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <DrawerStyle onClose={drawerClose} open={drawerShowPending} anchor="right">
      <Main>
        <p ref={mainTop}></p>
        <div className="drawer_header">
          <div className="drawer_header__title">
            <p className="drawer_header__title__Subtitle">Pendientes</p>
            <span className="drawer_header__title__Subtitle__total">{totalSlopes}</span>
            <Tooltip title="Recargar">
              <CachedOutlined className="drawer_header__title__iconReload" onClick={() => iconReload()} />
            </Tooltip>
            <Tooltip title="Filtrar">
              <FilterListOutlined
                className={
                  showFilters == true
                    ? "drawer_header__title__iconFilter drawer_header__title__active"
                    : "drawer_header__title__iconFilter"
                }
                onClick={() => {
                  setShowFilters(!showFilters);
                  scrollToTop();
                }}
              />
            </Tooltip>
          </div>
          <Tooltip title="Cerrar">
            <IconButton className="drawer_header__button" onClick={() => setDrawerShowPending(false)}>
              <Close className="drawer_header__icon" />
            </IconButton>
          </Tooltip>
        </div>
        {showFilters == true && (
          <Grid container spacing={1} className="drawer_filters">
            <Grid item md={6} className="item">
              <p className="title">Tipo de Pendiente</p>
              <Select
                onMenuOpen={() => getCatalogBy("pendingstypes")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={pendingstypes.isFetching}
                options={pendingstypes.results}
                className="select"
                placeholder="Selecciona una Opción"
                onChange={e => handleSelectFilterBy(e)}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id}
                isClearable={true}
                noOptionsMessage={() => "No hay Opciones "}
              />
            </Grid>
            <Grid item md={6} className="item">
              <p className="title">Filtrar por Fecha de:</p>
              <Select
                className="select"
                placeholder="Selecciona una Opción"
                options={optionsFilterDate}
                onChange={e => handleSelectTypePending(e)}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id}
                isClearable={true}
                noOptionsMessage={() => "No hay Opciones "}
              />
            </Grid>
            {filterByRange !== "range" && (
              <Grid item md={6} className="item">
                <p className="title">Filtrar Pendientes</p>
                <Select
                  className="select"
                  placeholder="Selecciona una Opción"
                  options={optionsFilterRange}
                  onChange={e => handleSelectPeriod(e)}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  isClearable={true}
                  noOptionsMessage={() => "No hay Opciones "}
                />
              </Grid>
            )}
            {filterByRange === "range" && (
              <Grid item md={12} className="item">
                <div className="container_range">
                  <div className="startRange">
                    <p className="title">De:</p>
                    <input type="date" className="date" onChange={e => setDateStart(e.target.value)} />
                  </div>
                  <div className="endRange">
                    <p className="title">Al:</p>
                    <input type="date" className="date" onChange={e => setDateFinish(e.target.value)} />
                  </div>
                </div>
                <div className="container_footer">
                  <Button
                    className="button_return"
                    onClick={() => {
                      setFilterByRange("");
                      setRefetch(!refetch);
                    }}
                  >
                    Quitar Rango
                  </Button>
                  {!canSearchRange && (
                    <AlertDate>
                      <ErrorOutline className="icon" />
                      <p className="alert_title">La Fecha de Inicio debe ser Mayor a la de Termino</p>
                    </AlertDate>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
        )}
        {alert?.show && (
          <AlertPending>
            <Alert severity={alert.severity} show={alert.show.toString()} type={alert.type}>
              {alert.message}
            </Alert>
          </AlertPending>
        )}
        <div className="container_order">
          <p onClick={handleSelectOpen} className="style_selectOrder">
            Ordenar Por: {`"${orderBy.name}"`}
            <ArrowDropDown className="icon" />
          </p>

          <SelectOptions
            id="mouse-over-popover"
            open={openSelect}
            anchorEl={anchorSelect}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handleSelectClose}
            disableRestoreFocus
          >
            <div className="container_options">
              <p
                className={`option ${orderBy.id === 1 && "selected"}`}
                onClick={() => {
                  handleSelectOptionOrder({ id: 1, name: "Pendientes por Vencer", value: "date_to" });
                }}
              >
                Pendientes por Vencer
              </p>
              <Divider />
              <p
                className={`option ${orderBy.id === 2 && "selected"}`}
                onClick={() => {
                  handleSelectOptionOrder({ id: 2, name: "Pendientes Creados Recientemente", value: "-date_from" });
                }}
              >
                Pendientes Creados Recientemente
              </p>
            </div>
          </SelectOptions>
        </div>
        <div className="contenido">
          {isFetchingSlopes == true ? (
            <div className="contenido__loader">
              <CircularProgress />
            </div>
          ) : slopesresults.length == 0 ? (
            <div className="contenido__empty">
              <img src="/empty_table.svg" className="contenido__empty__image" />
              <p className="contenido__empty__title">Sin resultados</p>
            </div>
          ) : (
            <>
              {slopesresults.map((item, index) => (
                <div className="contenido__item" key={index}>
                  <div className="contenido__item__header">
                    <div className="contenido__item__header__title">
                      {returnDesignType(item.pendingstype?.name)}
                      { (!["director_compras", "gerente_compras"].includes(role)) && (
                      <p onClick={() => redirectProspect(item)}>
                        {item.pendingstype?.name} -{" "}
                        {item.prospect ? (
                        <>
                        {toUpperCaseChart(validateInfo(item.prospect?.name))}
                        {" "}
                        {toUpperCaseChart(validateInfo(item.prospect?.lastname))}
                        </>
                        ) : (
                        "Sin prospecto asociado"
                      )}
                      </p>
                      )}
                    </div>
                    <div>
                      <Tooltip title="Completar Pendiente">
                        <IconButton className="contenido__item__header__button" onClick={() => finishPending(item)}>
                          <TimerOutlined className="contenido__item__header__iconCheck" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="contenido__item__content">
                    <p className="contenido__item__content__subject">{validateInfo(item.subject)}</p>
                    <p className="contenido__item__content__description">{validateInfo(item.description)}</p>
                    {showPlace(item)}
                  </div>
                  <div className="contenido__item__footer">
                    <Grid container className="contenido__item__footer__date">
                      <Grid item>
                        <p>
                          Inicio: <strong>{dayjs(item.date_from).format("DD/MM/YYYY hh:mm")}</strong>
                          {item.date_to !== null && <strong> {returnFomatTime(item.date_from)}</strong>}
                        </p>
                      </Grid>
                      <Grid item>
                        {item.date_to !== null ? (
                          <p>
                            Termino: <strong>{returnFormatDate(item.date_to)}</strong>{" "}
                            <strong>{returnFomatTime(item.date_to)}</strong>
                          </p>
                        ) : (
                          <p>
                            Termino: <strong>Sin Fecha Limite</strong>
                          </p>
                        )}
                      </Grid>
                    </Grid>

                    <div>
                      <p>{}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="contenido__pagination">
                <IconButton
                  color="primary"
                  disabled={page <= 1 ? true : false}
                  className="contenido__pagination__buttonBefore"
                  onClick={() => setPage(page - 1)}
                >
                  <NavigateBefore className="contenido__pagination__buttonBefore__icon" />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={page >= Math.ceil(totalSlopes / limitPendings) ? true : false}
                  className="contenido__pagination__buttonNext"
                  onClick={() => setPage(page + 1)}
                >
                  <NavigateNext className="contenido__pagination__buttonNext__icon" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </Main>

      <CompletePending
        pending={pendingItem}
        open={confirmationPending}
        close={handleClose}
        handleAlert={handleAlert}
        refetch={refetch}
        setRefetch={setRefetch}
        role={role}
      />
    </DrawerStyle>
  );
}

const optionsFilterDate = [
  {
    id: 2,
    name: "Fecha de Inicio",
    value: "date_from",
  },
  {
    id: 3,
    name: "Fecha de Termino",
    value: "date_to",
  },
];

const optionsFilterRange = [
  {
    id: 1,
    name: "Hoy",
    value: "day",
  },
  {
    id: 2,
    name: "Semana",
    value: "week",
  },
  {
    id: 3,
    name: "Mes",
    value: "month",
  },
  {
    id: 4,
    name: "Rango",
    value: "range",
  },
];
