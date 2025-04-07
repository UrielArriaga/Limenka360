import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip, Switch } from "@material-ui/core";
import {
  Cached,
  NavigateBefore,
  NavigateNext,
  TableChartOutlined,
  PersonPinCircle,
  WatchLater,
  NotificationsActive,
  RingVolume,
  Assignment,
  Extension,
  FilterList,
  Close,
  Nature,
  WhatsApp,
  LabelImportant,
  TrendingUp,
  Today,
  Comment,
  Person,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TableCustom from "../TableCustom";
import { useRouter } from "next/router";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { capitalizeString, formatDate, formatHour } from "../../utils";
import RequestCommon from "../../services/request_Common";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { DialogContainer, DrawerContainer, TracingStyled } from "./tabletracing.styles";
import { Pagination } from "@material-ui/lab";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";

const TableTracing = ({
  footer,
  prospect,
  handleAlert,
  setAlert,
  setFlag,
  trackingFlag,
  isProspectoFlag,
  scrollTo,
  isOrder,
  phaseOportunity,
}) => {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);

  const commonApi = new RequestCommon();

  const { actions, phases } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  const [trackings, setTrackings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingsTable, settrackingsTable] = useState([]);

  const [action, setAction] = useState("");
  const [phase, setphase] = useState(prospect?.phase?.id);
  const [showAdd, setshowAdd] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [trackingQuote, setTrackingQuote] = useState(false);
  const [infoQuote, SetInfoQuote] = useState([]);
  const [quotesBd, setQuotesBd] = useState([]);

  const [trackingSale, setTrackingSale] = useState(false);
  const [infoSale, SetInfoSale] = useState([]);
  const [clientsBd, setClientsBd] = useState([]);
  const handleCloseAdd = () => setshowAdd(!showAdd);

  const [trackingShow, setTrackingShow] = useState({});
  const [showTracking, setShowTracking] = useState(false);
  const handleCloseShow = () => setShowTracking(!showTracking);
  const heads = ["fecha de creación", "", "accion", "asunto / observations", "fase", "Id Cotización", "realizado por"];

  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalTracking, setTotalTracking] = useState(0);
  const totalPages = Math.ceil(totalTracking / limit);

  //* filters
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [typeq, setTypeQ] = useState("");
  const [phaseq, setPhaseQ] = useState("");
  const [loaderCompletePending, setLoaderCompletePending] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const defaultAction = actions.results.find(item => item.name === "Seguimiento Automatico");
  // Establecer la acción por defecto en el estado inicial
  const [act, setAct] = useState({
    value: "",
    name: "",
  });
  const handleChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setHighlight(scrollTo);
      // getPashes();
      // getActions();
      getOportunity();
      getClients();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
      setInitial();
    }
    return () => (mounted = false);
  }, [refetch, page, prospect]);

  const getDataInitial = async () => {
    try {
      let query = {};
      query.prospectId = isOrder === undefined ? router.query.prospecto : router.query.pr;

      if (typeq !== "") {
        query.actionId = typeq.value;
      } else {
        delete query.actionId;
      }
      if (phaseq !== "") {
        query.phaseId = phaseq.value;
      } else {
        delete query.phaseId;
      }
      setIsLoading(true);
      let tracking = await api.get(
        `trackings?where=${JSON.stringify(
          query
        )}&count=1&limit=${limit}&skip=${page}&include=prospect,phase,action,ejecutive,oportunity&order=-createdAt&join=1,2,3,4`
      );
      setTrackings(tracking.data.results);
      setTotalTracking(tracking.data.count);
      normalizeTrackings(tracking.data.results);
      setTimeout(setHighlight(false), 4000);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Seguimientos - Error al cargar los datos!", "basic");

      setTimeout(setHighlight(false), 4000);
    }
  };
  function setInitial() {
    setphase(prospect?.phase?.id);
  }

  const normalizeTrackings = trackings => {
    let newTrackings = [];
    for (let i = 0; i < trackings.length; i++) {
      const element = trackings[i];
      let normalize = {};
      normalize.id = element?.id;
      normalize.reason = element?.reason;
      normalize.observations = element?.observations;
      normalize.phase = element?.phaseId ? capitalizeString(element?.phase?.name) : "";
      normalize.date = `${formatDate(element?.createdAt)}, ${formatHour(element?.createdAt)}`;
      newTrackings.push(normalize);
    }
    settrackingsTable(newTrackings);
    setIsLoading(false);
  };

  const handleAddTracing = async formData => {
    setLoaderCompletePending(true);
    try {
      let newTracing = {};
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Seguimiento", type: "load" });
      newTracing.prospectId = isOrder === undefined ? router.query.prospecto : router.query.pr;
      newTracing.status = "1";

      if (trackingQuote === true) {
        newTracing.prospectId = isOrder === undefined ? router.query.prospecto : router.query.pr;
        newTracing.status = "2";
        newTracing.oportunityId = infoQuote.id;
      }

      if (trackingFlag && trackingSale === false) {
        newTracing.prospectId = prospect.id;
        newTracing.status = "3";
      }

      if (trackingSale === true) {
        newTracing.prospectId = router.query.prospecto;
        newTracing.oportunityId = infoSale.id;
        newTracing.status = "4";
      }
      if (isOrder === true) {
        newTracing.prospectId = router.query.pr;
        newTracing.oportunityId = router.query.op;
        newTracing.orderId = router.query.pe;
        newTracing.status = "5";
      }
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.actionId = act?.value;
      newTracing.createdbyId = id_user;
      if (phase !== "") {
        newTracing.phaseId = phase;
      }

      let addTracking = await api.post(`trackings`, newTracing);
      if (addTracking.status == 201) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Seguimientos - Creado Correctamente!", "basic");
        setRefetch(!refetch);
        resetForm();
        setLoaderCompletePending(false);
      }
      if (formData.phase !== "" && phase !== prospect?.phase?.id) {
        let trackingFase = {};

        trackingFase.prospectId = isOrder === undefined ? router.query.prospecto : router.query.pr;
        trackingFase.status = "1";

        if (trackingQuote === true) {
          trackingFase.prospectId = router.query.prospecto;
          trackingFase.status = "2";
          trackingFase.oportunityId = infoQuote.id;
        }

        if (trackingFlag && trackingSale === false) {
          trackingFase.prospectId = prospect.id;
          trackingFase.status = "3";
        }

        if (trackingSale === true) {
          trackingFase.prospectId = router.query.prospecto;
          trackingFase.oportunityId = infoSale.id;
          trackingFase.status = "4";
        }
        if (isOrder === true) {
          trackingFase.prospectId = router.query.pr;
          trackingFase.oportunityId = router.query.op;
          trackingFase.orderId = router.query.pe;
          trackingFase.status = "5";
        }
        trackingFase.observations = `La fase ha sido cambiada. Fase anterior: ${
          prospect.phaseId ? capitalizeString(prospect?.phase?.name) : "Sin fase anterior"
        } `;
        trackingFase.actionId = act.value;
        trackingFase.reason = "Seguimiento automático";
        trackingFase.phaseId = phase;
        trackingFase.createdbyId = id_user;

        await api.put(`prospects/${prospect?.id}`, { phaseId: phase });
        setFlag();
      }
    } catch (error) {
      handleAlert("error", "Seguimientos - No se pudo crear el seguimiento!", "basic");
      console.log(error);
    }

    setshowAdd(false);
  };

  const resetForm = () => {
    setValue("observations", "");
    setValue("action", "");
    setValue("reason", "");
    setTrackingSale(false);

    setValue("trackingSale", false);
    setValue("venta", "");
    SetInfoSale("");
    setTrackingQuote(false);
    setValue("trackingQuote", "");
    setValue("cotiza", "");
    SetInfoQuote("");
    setphase(prospect?.phase?.id);

    handleCloseAdd();
  };
  const handleNextPage = () => {
    if (page < Math.ceil(totalTracking / limit)) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleAction = item => {
    let tracking = trackings.filter(i => i.id == item.id);
    setTrackingShow(tracking[0]);
    setShowTracking(!showTracking);
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
    setRefetch(!refetch);
    handleCloseFilter();
  };
  const removeTypeQ = () => {
    setTypeQ("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };
  const removePhaseQ = () => {
    setPhaseQ("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };

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
      handleAlert("error", " Error al cargar oportunidades", "basic");
      console.log(err);
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
      handleAlert("error", " Error al cargar ventas", "basic");
      console.log(err);
    }
  };
  const handleSelectChange = e => {
    const selectedAction = actions.results.find(item => item.id == e.target.value);
    setAct({ value: selectedAction.id, name: selectedAction.name });
  };

  const getObservations = item => {
    return (
      <div className="ctr_td">
        {item.observations.length > 85 ? (
          <p>
            {item?.reason} - {item?.observations.substring(0, 85)}...{" "}
            <a onClick={() => handleAction(item)} className="showmore">
              Ver más
            </a>
          </p>
        ) : (
          <p>
            {item?.reason} - {item?.observations}
          </p>
        )}
      </div>
    );
  };

  return (
    <TracingStyled highlight={highlight}>
      <div className="title_table" id="trackings">
        <div className="primary">
          <p>Total de Seguimientos ({totalTracking})</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setRefetch(!refetch)} />
          )}
        </div>
        {showChips && (
          <div>
            {typeq !== "" && (
              <Chip color="primary" size="small" onDelete={removeTypeQ} label={typeq.name} className="chip" />
            )}
            {phaseq !== "" && (
              <Chip color="primary" size="small" onDelete={removePhaseQ} label={phaseq.name} className="chip" />
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
      {trackings.length > 0 ? (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item == "fecha de creación" && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {trackings.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed" onClick={() => handleAction(item)}>
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.createdAt)}, ${formatHour(item?.createdAt)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <p className={`ctr_td ctr_icon_complete`}>
                        {item?.actionId && (
                          <Tooltip arrow title={item?.action?.name}>
                            {iconReturn(item?.action?.name)}
                          </Tooltip>
                        )}
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.action?.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{`${item?.reason} ${
                        item?.observations !== "" ? `- ${item?.observations}` : ""
                      }`}</p>
                    </td>

                    <td className="data">
                      {item.phaseId && (
                        <p className="ctr_td icon">
                          <Tooltip arrow title={item?.phase?.name}>
                            <Nature />
                          </Tooltip>
                        </p>
                      )}
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.oportunity?.concept ? item?.oportunity?.concept : "N/A"} </p>
                    </td>

                    <td className="data">
                      {item?.createdbyId && (
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
                    <th className="title " key={index}>
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
            {prospect && Object.keys(prospect).length > 0 && (
              <Button
                variant="contained"
                color="primary"
                className="add_buton"
                disabled={isLoading ? true : false}
                onClick={() => {
                  setshowAdd(true);
                  const defaultAction = actions.results.find(item => item.name === "Seguimiento Automatico");
                  setAct({
                    value: defaultAction ? defaultAction.id : "",
                    name: defaultAction ? defaultAction.name : "",
                  });
                }}
              >
                Agregar Seguimiento
              </Button>
            )}
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
          <p className="title">Agregar Seguimiento</p>
          <form onSubmit={handleSubmit(handleAddTracing)}>
            <Grid spacing={1} container className="ctr_inputs">
              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Contacto</label>
                <input
                  name="contact"
                  disabled={true}
                  className="ctr_inputs__input capitalize"
                  value={`${prospect?.name} ${prospect?.lastname}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Empresa</label>
                <input
                  id="company"
                  name="company"
                  disabled={true}
                  className="ctr_inputs__input capitalize"
                  value={prospect?.clientcompany?.company ? prospect?.clientcompany?.company : "N/A"}
                />
              </Grid>

              {!trackingFlag && !isProspectoFlag && !isOrder ? (
                <Grid item xs={12} md={12}>
                  <label className="ctr_inputs__label">Agregar seguimiento a una Cotización</label>
                  <Switch
                    {...register("trackingQuote", { required: trackingQuote })}
                    checked={trackingQuote}
                    size="small"
                    onChange={e => setTrackingQuote(e.target.checked)}
                    name="trackingQuote"
                    color="primary"
                  />
                  <select
                    {...register("cotiza", { required: trackingQuote })}
                    disabled={!trackingQuote}
                    id="cotiza"
                    name="cotiza"
                    value={infoQuote.id}
                    onChange={e => {
                      let data = quotesBd.filter(item => item.id == e.target.value);
                      SetInfoQuote({ name: data[0].name, id: data[0].id });
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

              {trackingFlag ? (
                <Grid item xs={12} md={12}>
                  <label className="ctr_inputs__label">Agregar seguimiento a una Venta</label>
                  <Switch
                    {...register("trackingSale", { required: trackingSale })}
                    checked={trackingSale}
                    size="small"
                    onChange={e => setTrackingSale(e.target.checked)}
                    name="trackingSale"
                    color="primary"
                  />
                  <select
                    {...register("venta", { required: trackingSale })}
                    disabled={!trackingSale}
                    id="venta"
                    name="venta"
                    value={infoSale.id}
                    onChange={e => {
                      let data = clientsBd.filter(item => item.id == e.target.value);
                      SetInfoSale({ name: data[0].name, id: data[0].id });
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
                <label className="ctr_inputs__label">Fase</label>
                <select
                  value={phase}
                  className="ctr_inputs__input capitalize"
                  {...register("phase", { required: false })}
                  onChange={e => setphase(e.target.value)}
                  onClick={() => getCatalogBy("phases")}
                >
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {phases.isFetching && (
                    <option disabled={true} value={null}>
                      Cargando Opciones...
                    </option>
                  )}
                  {phases.results.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>

              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Acción*</label>
                <select
                  value={act.value}
                  className="ctr_inputs__input capitalize"
                  {...register("action", { required: false })}
                  onChange={handleSelectChange}
                  onClick={() => getCatalogBy("actions")}
                >
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {actions.isFetching && (
                    <option disabled={true} value={null}>
                      Cargando Opciones...
                    </option>
                  )}
                  {actions.results.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>

              {/* <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Tipo de Acción</label>
                <select
                  className="input"
                  value={typeq.value}
                  onChange={e => {
                    let action = actions.filter(item => item.id == e.target.value);
                    setTypeQ({ value: action[0].id, name: action[0].name });
                  }}
                >
                  <option value="" hidden>
                    Seleccione un tipo
                  </option>
                  {actions.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div> */}
              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Asunto *</label>
                <input
                  {...register("reason", { required: true })}
                  id="reason"
                  name="reason"
                  className={errors?.reason?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                />
              </Grid>

              <Grid item xs={12}>
                <label className="ctr_inputs__label">Comentarios *</label>
                <textarea
                  {...register("observations", { required: true })}
                  id="observations"
                  name="observations"
                  className={
                    errors?.observations?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                  }
                />
              </Grid>
            </Grid>
            <Grid container className="ctr_buttons">
              <Button
                variant="contained"
                color="secondary"
                className={`btn_cancel ${loaderCompletePending && "disabled"}`}
                disabled={loaderCompletePending}
                onClick={() => {
                  handleCloseAdd();
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                className={`btn_upload ${loaderCompletePending && "disabled"}`}
                disabled={loaderCompletePending}
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleAddTracing)}
              >
                Guardar
              </Button>
            </Grid>
          </form>
        </DialogContainer>
      </Dialog>
      <Dialog
        open={showTracking}
        keepMounted
        onClose={handleCloseShow}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Vista del Seguimiento</p>
          <div className="ctr_tracking">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} className="ctr">
                <label>
                  <LabelImportant className="icon" />
                  Asunto
                </label>
                <p className="paraghap">{trackingShow?.reason}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <label>
                  <TrendingUp className="icon" />
                  Fase
                </label>
                <p className="paraghap capitalize">{trackingShow?.phase?.name}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <label>
                  <Today className="icon" />
                  Fecha de creación
                </label>
                <p className="paraghap capitalize">{formatDate(trackingShow?.createdAt)}</p>
              </Grid>
              <Grid item xs={12}>
                <label>
                  <Comment className="icon" />
                  Observación
                </label>
                <p className="paraghap">{trackingShow?.observations}</p>
              </Grid>
            </Grid>
          </div>
        </DialogContainer>
      </Dialog>
      <DrawerContainer anchor="right" open={showFilters} onClose={handleCloseFilter}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={handleCloseFilter} />
          </div>
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fases</label>
              <select
                value={phaseq.value}
                onChange={e => {
                  let phase = phases.results.filter(item => item.id == e.target.value);
                  setPhaseQ({ value: phase[0].id, name: phase[0].name });
                }}
                className="input"
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {phases.results.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de Acción</label>
              <select
                className="input"
                value={typeq.value}
                onChange={e => {
                  let action = actions.results.filter(item => item.id == e.target.value);
                  setTypeQ({ value: action[0].id, name: action[0].name });
                }}
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {actions.results.map((item, index) => {
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
    </TracingStyled>
  );
};

export default TableTracing;

const iconReturn = type => {
  switch (type) {
    case "Visita":
      return <PersonPinCircle />;

    case "Seguimiento":
      return <PersonPinCircle />;
    case "Cita":
      return <WatchLater />;
    case "Recordatorio":
      return <NotificationsActive />;
    case "Llamada":
      return <RingVolume />;
    case "Tarea":
      return <Assignment />;
    case "Pendiente":
      return <Extension />;
    case "Whatsapp":
      return <WhatsApp />;
    default:
      return <Person />;
  }
};
