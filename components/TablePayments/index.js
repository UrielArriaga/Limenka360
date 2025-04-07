import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip } from "@material-ui/core";
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
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TableCustom from "../TableCustom";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { capitalizeString, formatDate, formatHour, formatNumber, isEmptyArray } from "../../utils";
import RequestCommon from "../../services/request_Common";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { DialogContainer, DrawerContainer, TableQuoteStyled } from "./tablequotes.styles";

const TablePayments = ({ handleClickQuote, footer, prospect, handleAlert, setAlert, setFlag }) => {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const commonApi = new RequestCommon();

  // * My own States
  const [oportunities, setOportunities] = useState([]);

  // * My own States
  const [trackings, setTrackings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalTracking, setTotalTracking] = useState(0);
  const [trackingsTable, settrackingsTable] = useState([]);
  const [phases, setPhases] = useState([]);
  const [actions, setActions] = useState([]);
  const [action, setAction] = useState("");
  const [phase, setphase] = useState(prospect?.phase?.id);
  const [showAdd, setshowAdd] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleCloseAdd = () => setshowAdd(!showAdd);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [trackingShow, setTrackingShow] = useState({});
  const [showTracking, setShowTracking] = useState(false);
  const handleCloseShow = () => setShowTracking(!showTracking);
  const heads = ["fecha de creación", "", "Concepto", "Descuento", "Comision", "Monto Total"];
  const [currentPage, setCurrentPage] = useState([]);

  //* filters
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [typeq, setTypeQ] = useState("");
  const [phaseq, setPhaseQ] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getPashes();
      getActions();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunitiesByProspect();
      setInitial();
    }
    return () => (mounted = false);
  }, [refetch, page, prospect]);

  useEffect(() => {
    setCurrentPage(oportunities.slice((page - 1) * limit, page * limit));
  }, [page]);

  const getOportunitiesByProspect = async () => {
    try {
      let query = {
        prospectId: prospect.id,
        iscloseout: true,
      };
      let oportuntiesResponse = await api.get(
        `oportunities?where=${JSON.stringify(query)}&include=phase&order=-createdAt`
      );
      setOportunities(oportuntiesResponse.data?.results);

      console.log(oportuntiesResponse);

      // setOportunitiesTable(oportunitiesNormalize);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataInitial = async () => {
    try {
      let query = {};
      query.prospectId = router.query.prospecto;
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
        )}&count=1&limit=${limit}&skip=${page}&include=prospect,phase,action,ejecutive&order=-createdAt`
      );
      console.log(tracking.data.results);
      setTrackings(tracking.data.results);
      setTotalTracking(tracking.data.count);
      normalizeTrackings(tracking.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Seguimientos - Error al cargar los datos!", "basic");
    }
  };
  function setInitial() {
    setphase(prospect?.phase?.id);
    setAction("62dEUlcqck7L1f8JvFtRSeoX");
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
    try {
      let newTracing = {};
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Seguimiento", type: "load" });
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.actionId = action;
      newTracing.prospectId = router.query.prospecto;
      newTracing.createdbyId = id_user;
      if (phase !== "") {
        newTracing.phaseId = phase;
      }
      let addTracking = await api.post(`trackings`, newTracing);
      if (addTracking.status == 200) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Seguimientos - Creado Correctamente!", "basic");
        setRefetch(!refetch);
        resetForm();
      }
      if (formData.phase !== "" && phase !== prospect?.phase?.id) {
        let trackingFase = {};
        trackingFase.prospectId = router.query.prospecto;
        trackingFase.observations = `La fase ha sido cambiada. Fase anterior: ${
          prospect.phaseId ? capitalizeString(prospect?.phase?.name) : "Sin fase anterior"
        } `;
        trackingFase.actionId = action;
        trackingFase.reason = "Seguimiento automático";
        trackingFase.phaseId = phase;
        trackingFase.createdbyId = id_user;
        await api.put(`prospects/${prospect?.id}`, { phaseId: phase });
        await api.post(`trackings`, trackingFase);
        setFlag();
      }
    } catch (error) {
      handleAlert("error", "Seguimientos - No se pudo crear el seguimiento!", "basic");
      console.log(error);
    }

    setshowAdd(false);
  };
  const getPashes = async () => {
    try {
      let phases = await commonApi.getPashes();
      setPhases(phases.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getActions = async () => {
    try {
      let actions = await commonApi.getActions();
      setActions(actions.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setValue("observations", "");
    setValue("action", "");
    setValue("reason", "");
    setphase(prospect?.phase?.id);
  };
  const handleNextPage = () => {
    if (page < Math.ceil(oportunities.length / limit)) {
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

  return (
    <TableQuoteStyled>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Pagos</p>
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

      {isEmptyArray(oportunities) && TableEmpty(heads)}

      {!isEmptyArray(oportunities) && (
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
              {currentPage.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={checkrow(index) ? "row" : "inpar row"}
                    style={{ background: item.iscloseout && "rgba(100, 181, 246,0.5)" }}
                  >
                    <td
                      className="data fixed"
                      onClick={() => handleClickQuote(item)}
                      style={{ background: item.iscloseout && "rgba(100, 181, 246,0.5)" }}
                    >
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
                      <p className="ctr_td">{item?.concept}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item.discount}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatNumber(item.comission)}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatNumber(item.amount)}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {footer && (
        <div className="tfooter">
          <div className="tfooter__ctr_button"></div>
          <div className="tfooter__ctr_pagination">
            <p className="">{`Total de pagos: ${oportunities.length} Pagina: ${page}- ${Math.ceil(
              totalTracking.length || 1 / limit
            )}`}</p>
            <div className="tfooter__ctr_pagination__pagination">
              <button className="before" onClick={handlePreviousPage}>
                <NavigateBefore />
              </button>
              <button className="next" onClick={handleNextPage}>
                <NavigateNext />
              </button>
            </div>
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
              <Grid item xs={12} md={4}>
                <label className="ctr_inputs__label">Contacto</label>
                <input
                  name="contact"
                  disabled={true}
                  className="ctr_inputs__input capitalize"
                  value={`${prospect?.name} ${prospect?.lastname}`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <label className="ctr_inputs__label">Empresa</label>
                <input
                  id="company"
                  name="company"
                  disabled={true}
                  className="ctr_inputs__input capitalize"
                  value={prospect?.clientcompany?.company}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <label className="ctr_inputs__label">Fase</label>
                <select
                  value={phase}
                  className="ctr_inputs__input capitalize"
                  {...register("phase", { required: false })}
                  onChange={e => setphase(e.target.value)}
                >
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {phases.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Asunto *</label>
                <input
                  {...register("reason", { required: true })}
                  id="reason"
                  name="reason"
                  className={errors?.reason?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label className="ctr_inputs__label">Acciones</label>
                <select
                  value={action}
                  className="ctr_inputs__input capitalize"
                  {...register("action", { required: false })}
                  onChange={e => setAction(e.target.value)}
                >
                  <option hidden value="">
                    Selecciona una Opción
                  </option>
                  {actions.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
              <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseAdd}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="btn_upload"
                onClick={handleSubmit(handleAddTracing)}
              >
                Guardar
              </Button>
            </Grid>
          </form>
        </DialogContainer>
      </Dialog>
      {/* <Dialog open={showTracking} keepMounted onClose={handleCloseShow} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
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
      </Dialog> */}
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
                  let phase = phases.filter(item => item.id == e.target.value);
                  setPhaseQ({ value: phase[0].id, name: phase[0].name });
                }}
                className="input"
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {phases.map((item, index) => {
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
    </TableQuoteStyled>
  );
};

export default TablePayments;

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
    case "Pendiente":
      return <Extension />;
    default:
      return;
      break;
  }
};
function TableEmpty(heads) {
  return (
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
  );
}
