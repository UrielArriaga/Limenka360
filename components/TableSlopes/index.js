import { Button, Chip, CircularProgress, Dialog, Grid, Switch, Tooltip } from "@material-ui/core";
import {
  Assignment,
  Cached,
  Close,
  FilterList,
  NotificationsActive,
  Person,
  PersonPinCircle,
  RingVolume,
  TableChartOutlined,
  WatchLater,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { formatDate, formatHour } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { DialogContainer, DrawerContainer, SlopesStyled } from "./tableslopes.styled";
import { Pagination } from "@material-ui/lab";
import { refetchSlopes, refetchSlopesToday } from "../../redux/slices/slopesSlice";
import CompletePending from "../ModalCompletePendings";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";

const TableSlopes = ({ footer, prospect, handleAlert, setAlert, flag, setFlag, isCloseout, isProspecto, scrollTo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { actions, pendingstypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { id_user } = useSelector(userSelector);
  const [pendings, setPendings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [type, setType] = useState({});
  const [showAdd, setshowAdd] = useState(false);
  const handleCloseAdd = () => setshowAdd(false);
  const [showSlope, setShowSlope] = useState(false);
  const [slope, setSlope] = useState(null);
  const [quotesBd, setQuotesBd] = useState([]);
  const [infoQuote, SetInfoQuote] = useState([]);
  const [pendingQuote, setPendingQuote] = useState(false);
  const [clientsBd, setClientsBd] = useState([]);
  const [pendingSale, setPendingSale] = useState(false);
  const [infoSale, SetInfoSale] = useState([]);
  const [order, setOrder] = useState({ label: "", value: "" });
  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];

  //zona horaria
  const N = 6;
  const zones = [
    { gmt: "GMT-05:00", zones: ["Quintana Roo"] },
    { gmt: `GMT-0${N}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: false },
    { gmt: `GMT-0${N - 1}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: true },
    { gmt: `GMT-0${N + 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: false },
    { gmt: `GMT-0${N + 1 - 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: true },

    { gmt: `GMT-0${N + 2}:00`, zones: "Baja California", summer: false },
    { gmt: `GMT-0${N + 2 - 1}:00`, zones: "Baja California", summer: true },
  ];

  const heads = ["fecha", "pendiente", "asunto / observaciones", "Zona Horaria"];
  // * filters
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [isDone, setIsDone] = useState(false);
  const [typeq, setTypeQ] = useState("");
  // paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [highlight, setHighlight] = useState(false);

  const [totalPendings, setTotalPendings] = useState(0);
  const totalPages = Math.ceil(totalPendings / limit);
  const [loaderCompletePending, setLoaderCompletePending] = useState(false);
  // * functions

  const handleCloseConfirm = () => setShowSlope(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setHighlight(scrollTo);
    getOportunity();
    getClients();
    getCatalogBy("actions");
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial(mounted);
      getOportunity();
    }

    return () => (mounted = false);
  }, [fetch, page, prospect, flag]);

  const getDataInitial = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.prospectId = router.query.prospecto;
      query.isdone = false;

      if (isDone !== "") {
        query.isdone = isDone;
      } else {
        delete query.isdone;
      }
      if (typeq !== "") {
        query.pendingstypeId = { match: typeq.value };
      } else {
        delete query.pendingstypeId;
      }

      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        order: order.value === "" ? "date_from" : order.value,
        skip: page,
        include: "pendingstype,ejecutive,oportunity,prospect",
        join: "pendingstype,ejecutive",
      };

      let pendings = await api.get(`pendings`, { params });
      setPendings(pendings.data.results);
      setTotalPendings(pendings.data.count);
      setIsLoading(false);
      setTimeout(setHighlight(false), 4000);
    } catch (error) {
      handleAlert("error", "Pendientes - Error al cargar datos!", "basic");
      console.log(error);
      setIsLoading(false);
      setTimeout(setHighlight(false), 4000);
    }
  };

  const handleAction = item => {
    setSlope(item);
    setShowSlope(true);
  };

  const handleAddSlopes = async formData => {
    setLoaderCompletePending(true);
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Pendiente", type: "load" });
      let newPending = {};

      newPending.prospectId = prospect.id;
      newPending.status = "1";

      if (pendingQuote === true) {
        newPending.prospectId = prospect.id;
        newPending.status = "2";
        newPending.oportunityId = infoQuote.id;
      }

      if (isCloseout && pendingSale === false) {
        newPending.prospectId = prospect.id;
        newPending.status = "3";
      }

      if (pendingSale === true) {
        newPending.prospectId = prospect.id;
        newPending.oportunityId = infoSale.id;
        newPending.status = "4";
      }

      newPending.createdbyId = id_user;
      newPending.priority = formData.priority;
      newPending.subject = formData.subject;
      newPending.place = formData.place;
      newPending.pendingstypeId = type.id;
      newPending.zone = formData.zone;
      newPending.description = formData.description;
      newPending.remember = true;
      newPending.remember_by = "correo";
      newPending.notify = true;
      newPending.notify_by = "correo";
      newPending.date_from = formatnewDate(formData.date_from);
      if (formData.type == "62dp9dPnCtgdfTodXAUuzr1N" || formData.type == "62dN6LUisuI0rTZm1p5l5Lcp") {
        newPending.date_to = formatnewDate(formData.date_to);
      }
      newPending.ejecutiveId = id_user;
      let addPending = await api.post(`pendings`, newPending);
      if (addPending.status == 201) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Pendiente - Creado Correctamente!", "basic");
        let trackingPending = {};

        trackingPending.prospectId = router.query.prospecto;
        trackingPending.status = "1";

        if (pendingQuote === true) {
          trackingPending.prospectId = router.query.prospecto;
          trackingPending.status = "2";
          trackingPending.oportunityId = infoQuote.id;
        }

        if (isCloseout && pendingSale === false) {
          trackingPending.prospectId = prospect.id;
          trackingPending.status = "3";
        }

        if (pendingSale === true) {
          trackingPending.prospectId = router.query.prospecto;
          trackingPending.oportunityId = infoSale.id;
          trackingPending.status = "4";
        }

        trackingPending.observations = `Nuevo pendiente asignado como: ${type.name}`;
        let action = actions.results.filter(item => item.name == type.name);
        trackingPending.actionId = action[0].id;
        trackingPending.reason = "Seguimiento automático";
        trackingPending.phaseId = prospect.phaseId;
        trackingPending.createdbyId = id_user;
        await api.post(`trackings`, trackingPending);
        handleCloseAdd();
        cleanForm();
        setFetch(!fetch);
        setLoaderCompletePending(false);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
      }
      setFlag();
    } catch (error) {
      setAlert({ severity: null, show: false, message: null, type: null });
      if (error.response?.config?.url.includes("pendings")) {
        handleAlert("error", "Pendientes - Error al crear!", "basic");
      }
      console.log(error);
      setFetch(!fetch);
    }
    cleanForm();
  };

  function formatnewDate(str) {
    let date = new Date(str);
    return date.toISOString();
  }

  const getOportunity = async () => {
    try {
      let query = {
        prospectId: prospect.id,
      };
      query.iscloseout = false;
      let quote = await api.get(
        `oportunities?where=${JSON.stringify(query)}&count=1&limit=${limit}&skip=${page}&include=phase&order=-createdAt`
      );
      setQuotesBd(quote.data.results);
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Grupos - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Grupos - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Grupos - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Grupos - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const getClients = async () => {
    try {
      let query = {
        prospectId: prospect.id,
      };
      query.iscloseout = true;
      let client = await api.get(`oportunities?where=${JSON.stringify(query)}&include=phase,prospect&order=-createdAt`);
      setClientsBd(client.data.results);
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Grupos - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Grupos - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Grupos - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Grupos - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const cleanForm = () => {
    setValue("subject", "");
    setType("");
    setValue("type", "");
    SetInfoQuote("");
    SetInfoSale("");
    setPendingQuote(false);
    setPendingSale(false);
    setValue("cotiza", "");
    setValue("venta", "");
    setValue("pendingSale", "");
    setType("Recordatorio");
    setValue("place", "");
    setValue("zone", "");
    setValue("date_from", "");
    setValue("notify_by", "");
    setValue("date_to", "");
    setValue("remember", false);
    setValue("description", "");
    setValue("remember_by", "");
    setValue("notify", false);

    handleCloseAdd();
  };

  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleFilters = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(!showChips);
    setFetch(!fetch);
    handleCloseFilter();
  };

  const removeIsDone = () => {
    setIsDone(false);
    if (page > 1) {
      setPage(1);
    }
    setFetch(!fetch);
  };
  const removeTypeQ = () => {
    setTypeQ("");
    if (page > 1) {
      setPage(1);
    }
    setFetch(!fetch);
  };

  /* 27/10/2022 limpiar filtro de orden de pendientes */

  const removeOrder = () => {
    setOrder({ value: "" });
    if (page > 1) {
      setPage(1);
    }
    setFetch(!fetch);
  };
  /* -------- limpiar filtro de orden de pendientes --------*/

  const fecha = new Date(Date.now()).toISOString();

  const handlSelectOrderPendings = e => {
    let order = FiltersOrder.filter(item => item.value == e.target.value);
    setOrder({ label: order[0].label, value: order[0].value });
  };

  return (
    <SlopesStyled highlight={highlight}>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Pendientes ({totalPendings})</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setFetch(!fetch)} />
          )}
        </div>
        {showChips && (
          <div>
            {isDone !== "" && (
              <Chip
                color="primary"
                size="small"
                onDelete={removeIsDone}
                label={isDone == "true" ? "Completados" : "Sin completar"}
                className="chip"
              />
            )}
            {typeq !== "" && (
              <Chip color="primary" size="small" onDelete={removeTypeQ} label={typeq.name} className="chip" />
            )}
            {order.value !== "" && (
              <Chip color="primary" size="small" onDelete={removeOrder} label={order.label} className="chip" />
            )}
          </div>
        )}
        <div
          className="secondary"
          onClick={() => {
            setShowChips(false);
            setShowFilters(!showFilters);
          }}
        >
          <FilterList />
          <p>Filtros</p>
        </div>
      </div>
      {pendings.length > 0 ? (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                <th className="title checkbox">
                  <div className="ctr_title">
                    <p>Fecha</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p></p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Pendiente</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Asunto / Observaciones</p>
                  </div>
                </th>

                <th className="title">
                  <div className="ctr_title">
                    <p>Id Cotización </p>
                  </div>
                </th>

                <th className="title">
                  <div className="ctr_title">
                    <p>Realizado por</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {pendings?.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td
                      className="data fixed"
                      onClick={() => {
                        !item.isdone && handleAction(item);
                      }}
                    >
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.date_from)}, ${formatHour(item?.date_from)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <div
                        className={`ctr_td ${item.isdone ? "ctr_icon_complete" : "ctr_icon_incomplete"}`}
                        onClick={() => {
                          !item.isdone && handleAction(item);
                        }}
                      >
                        <Tooltip arrow title={item.isdone ? "Completo" : "No completado"}>
                          <p>{iconReturn(item?.pendingstype.name)}</p>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.pendingstype.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{`${item?.subject} ${
                        item?.description !== "" ? `- ${item?.description}` : ""
                      }`}</p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.oportunity?.concept ? item?.oportunity?.concept : "N/A"} </p>
                    </td>

                    <td className="data">
                      {item?.ejecutive && (
                        <Tooltip
                          arrow
                          placement="bottom"
                          title={`${item?.ejecutive?.name} ${item?.ejecutive?.lastname}`}
                        >
                          <p className="ejecutive">{`${item?.ejecutive?.name.slice(0, 1)}${
                            item?.ejecutive?.lastname !== "" ? `${item?.ejecutive?.lastname.slice(0, 1)}` : "-AD"
                          }`}</p>
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="table empty">
            <table className="ctr_table">
              <thead className="ctr_table__head">
                <tr className="ctr_table__head__tr">
                  {heads.map((item, index) => (
                    <th className="title" key={index}>
                      <div className="ctr_title">
                        <p>{item}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="body_empty">
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>Aun no hay datos</p>
            </div>
          </div>
        </>
      )}

      {footer && (
        <div className="tfooter">
          <div className="tfooter__ctr_button">
            <Button
              variant="contained"
              color="primary"
              className="add_buton"
              onClick={() => {
                setValue("date_from", `${fecha.split("T")[0]}T09:00`);
                setshowAdd(true);
              }}
            >
              Agregar pendiente
            </Button>
          </div>

          <div className="pagination">
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </div>
        </div>
      )}
      <Dialog
        open={showAdd}
        keepMounted
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <div className="titles">
            <p className="title">Agregar Pendiente</p>
            {loaderCompletePending && <CircularProgress className="titles__loader" />}
          </div>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={4}>
              <label className="ctr_inputs__label">Tipo *</label>
              <select
                {...register("type", { required: true })}
                id="type"
                name="type"
                value={type.id}
                onClick={() => getCatalogBy("pendingstypes")}
                onChange={e => {
                  let type = pendingstypes.results.filter(item => item.id == e.target.value);
                  setType({ name: type[0].name, id: type[0].id });
                }}
                className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {pendingstypes.isFetching && (
                  <option disabled={true} value={null}>
                    Cargando Opciones...
                  </option>
                )}
                {pendingstypes.results.map((item, index) => {
                  return (
                    <option key={index} value={item.id} className="option">
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </Grid>
            <Grid item xs={12} md={4}>
              <label className="ctr_inputs__label">Lugar </label>
              <input
                {...register("place", { required: false })}
                id="place"
                type="text"
                disabled={type.name !== "Cita" && type.name !== "Visita"}
                name="place"
                className={errors?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <label className="ctr_inputs__label">Prioridad *</label>
              <select
                {...register("priority", { required: true })}
                className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              >
                <option value="" hidden>
                  {" "}
                  Seleccione uno...
                </option>
                {prioritys?.map(item => (
                  <option className="option" key={item.priority} value={item.priority}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Asunto *</label>
              <input
                {...register("subject", { required: true })}
                id="subject"
                name="subject"
                className={errors?.subject?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12}>
              <label className="ctr_inputs__label">Descripción</label>
              <textarea
                {...register("description", { required: false })}
                id="description"
                name="description"
                minLength={"600"}
                className={errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            {!isCloseout && !isProspecto ? (
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label">Agregar pendiente a una Cotización</label>
                <Switch
                  {...register("pendingQuote", { required: pendingQuote })}
                  checked={pendingQuote}
                  size="small"
                  onChange={e => setPendingQuote(e.target.checked)}
                  name="pendingQuote"
                  color="primary"
                />
                <select
                  {...register("cotiza", { required: pendingQuote })}
                  disabled={!pendingQuote}
                  id="cotiza"
                  name="cotiza"
                  value={infoQuote.id}
                  onChange={e => {
                    let data = quotesBd.filter(item => item.id == e.target.value);
                    SetInfoQuote({ name: data[0].name, id: data[0].id });
                    // console.log(infoQuote.id);
                  }}
                  className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                >
                  <option value="" hidden>
                    Seleccione el Id de una cotización
                  </option>
                  {quotesBd.map((item, index) => {
                    return (
                      <option key={index} value={item.id} className="option">
                        {item.concept}
                      </option>
                    );
                  })}
                </select>
              </Grid>
            ) : (
              " "
            )}

            {isCloseout ? (
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label">Agregar pendiente a una Venta</label>
                <Switch
                  {...register("pendingSale", { required: pendingSale })}
                  checked={pendingSale}
                  size="small"
                  onChange={e => setPendingSale(e.target.checked)}
                  name="pendingSale"
                  color="primary"
                />
                <select
                  {...register("venta", { required: pendingSale })}
                  disabled={!pendingSale}
                  id="venta"
                  name="venta"
                  value={infoSale.id}
                  onChange={e => {
                    let data = clientsBd.filter(item => item.id == e.target.value);
                    SetInfoSale({ name: data[0].name, id: data[0].id });
                    // console.log(infoSale.id);
                  }}
                  className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                >
                  <option value="" hidden>
                    Seleccione el Id de una cotización
                  </option>
                  {clientsBd.map((item, index) => {
                    return (
                      <option key={index} value={item.id} className="option">
                        {item.concept}
                      </option>
                    );
                  })}
                </select>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Fecha Inicio* </label>
              <input
                {...register("date_from", { required: true })}
                type="datetime-local"
                className={errors?.date_from?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Fecha Termino </label>
              <input
                {...register(
                  "date_to",
                  type.name !== "Cita" && type.name !== "Visita" ? { required: false } : { required: true }
                )}
                id="date_to"
                type="datetime-local"
                disabled={type.name !== "Cita" && type.name !== "Visita"}
                name="date_to"
                className={errors?.date_to?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>

            <Grid item xs={12}>
              <label className="ctr_inputs__label">Zona Horaria* </label>
              <select
                {...register("zone", { required: true })}
                className={errors?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              >
                <option value="" hidden>
                  Seleccione uno...
                </option>
                {zones?.map((item, index) => (
                  <option key={index} value={item.gmt}>
                    ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                  </option>
                ))}
              </select>
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              disabled={loaderCompletePending}
              variant="contained"
              color="secondary"
              className={`btn_cancel ${loaderCompletePending && "disabled"}`}
              onClick={() => {
                cleanForm();
                handleCloseAdd();
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={loaderCompletePending}
              variant="contained"
              color="primary"
              className={`btn_upload ${loaderCompletePending && "disabled"}`}
              onClick={handleSubmit(handleAddSlopes)}
            >
              Guardar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>

      <CompletePending
        pending={slope}
        open={showSlope}
        close={handleCloseConfirm}
        handleAlert={handleAlert}
        refetch={flag}
        setRefetch={setFlag}
      />
      <DrawerContainer anchor="right" open={showFilters} onClose={handleCloseFilter}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={handleCloseFilter} />
          </div>
          <div className="ctr_drawer__ctr_inputs">
            {/* 27/10/2022 se agrego el filtro de  orden de los pendientes */}
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Ordenar por:</label>
              <select value={order.value} onChange={e => handlSelectOrderPendings(e)} className="input">
                <option value="" hidden>
                  Selecciona una opción
                </option>
                {FiltersOrder.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* ------- se agrego el filtro de  orden de los pendientes ----------*/}
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Completados / Sin completar</label>
              <select
                value={isDone}
                onChange={e => {
                  setIsDone(e.target.value);
                }}
                className="input"
              >
                <option value="">Selecciona una opción</option>
                <option value={false}>Sin completar</option>
                <option value={true}>Completados</option>
              </select>
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de pendiente</label>
              <select
                className="input"
                value={type.value}
                onChange={e => {
                  let tipo = pendingstypes.results.filter(item => item.id == e.target.value);
                  setTypeQ({ value: tipo[0].id, name: tipo[0].name });
                }}
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {pendingstypes.results.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={handleCloseFilter}>
              Cancelar
            </Button>

            <Button variant="contained" className="btn_apply" onClick={() => handleFilters()}>
              Aplicar
            </Button>
          </div>
        </div>
      </DrawerContainer>
    </SlopesStyled>
  );
};

export default TableSlopes;

const iconReturn = type => {
  switch (type) {
    case "Visita":
      return <PersonPinCircle />;
    case "Cita":
      return <WatchLater />;
    case "Recordatorio":
      return <NotificationsActive />;
    case "Llamada":
      return <RingVolume />;
    case "Tarea":
      return <Assignment />;
    default:
      return <Person />;
  }
};
// 27/10/2022 se agrego el orden se los pendientes
const FiltersOrder = [
  { label: "Fecha de Creación", value: "-createdAt" },
  { label: "Fecha de Pendiente", value: "date_from" },
];
