import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Drawer, LinearProgress, Modal, Tooltip, CircularProgress, Backdrop } from "@material-ui/core";
import {
  AddAlert,
  ErrorRounded,
  FiberManualRecord,
  Launch,
  PersonPinCircle,
  PostAdd,
  Timeline,
  Today,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import styled from "styled-components";
import AlertGlobal from "../Alerts/AlertGlobal";
import { userSelector } from "../../redux/slices/userSlice";
import { formatDate, formatHour } from "../../utils";
import { api } from "../../services/api";
import FormWhatsapp from "../SendWhatsapp";
import ProspectData from "../ProspectData";
import CompletePending from "../ModalCompletePendings";
import ModalReasigned from "../ModalReasigned";
import Files from "../Files";
import ButtonClose from "../ButtonClose";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import dayjs from "dayjs";
const DrawerProspects = ({
  oportunityId,
  isOportunity,
  show,
  closeDrawer,
  prospectId,
  orderPendings,
  setOrderPendigs,
  refetch,
  setRefetch,
  flag,
  handleClickAddTracking,
  handleClickAddPending,
  type,
  id_executive,
}) => {
  const router = useRouter();
  const { id_user, roleId } = useSelector(userSelector);
  const { pendingstypes } = useSelector(commonSelector);
  const [load, setload] = useState(true);
  const [openWhats, setOpenWhats] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const [openConfirmPending, setOpenConfirmPending] = useState(false);
  const [reloadDataCompletePending, setReloadDataCompletePending] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [pendingToComplete, setPendingToComplete] = useState({});
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [prospect, setProspect] = useState({});
  const [tracking, setTracking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsCalendary, setEventsCalendary] = useState([]);
  const [eventPayment, setEventPayment] = useState();
  const [prospectPending, setProspectPending] = useState({});
  const [prospectSelected, setProspectSelected] = useState(null);
  const [viewOption, setViewOption] = useState("month");
  const { getCatalogBy } = useGlobalCommons();
  const [openEdit, setOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [dataProspects, setDataProspects] = useState(null);
  const [oportunitiesFromProspectSelected, setOportunitiesFromProspectSelected] = useState(null);
  const [openEditPending, setOpenEditPending] = useState(false);
  const [pendingToEdit, setPendingToEdit] = useState(null);
  const [typePending, setTypePending] = useState({});
  const [nowDate, setNowDate] = useState(new Date());
  const [events, setEvents] = useState();
  const [oportunities, setOportunities] = useState([]);
  const [products, setProducts] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const idOportunity = oportunityId;
  const handleCloseConfirmPending = () => setOpenConfirmPending(false);
  const handleCloseEditPending = () => setOpenEditPending(false);

    

  const dateRange = {
    month: [dayjs(nowDate).startOf("month").format(), dayjs(nowDate).endOf("month").format()],
    week: [dayjs(nowDate).startOf("week").format(), dayjs(nowDate).endOf("week").format()],
    day: [dayjs(nowDate).startOf("day").format(), dayjs(nowDate).endOf("day").format()],
  }[viewOption];

  useEffect(() => {
    getDataProspects();
    getCatalogBy("pendingstypes");
  }, []);

  // Datos
  useEffect(() => {
    const fetchData = async () => {
      await setEventsCalendary([]);
      await getDataCalendary(); // Luego, ejecuta getDataCalendary
    };

    fetchData(); // Llama a la función async
  }, [flag]);

  useEffect(() => {
    setEventsCalendary(events?.concat(eventPayment));
  }, [eventPayment, events]);

  const {
    register: registerEditPending,
    handleSubmit: handleSubmitEditPending,
    setValue: setValueEditPending,
    reset: resetEditPending,
    formState: { errorsEditPending },
  } = useForm();

    // SetValue formulario editar pendiente
    useEffect(() => {
      if (!pendingToEdit) {
        return;
      }
      console.log(pendingToEdit, "pendingyoedit")
      let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      setValueEditPending("description", pendingToEdit?.description);
      setValueEditPending("priority", pendingToEdit?.priority);
      setValueEditPending("type", pendingToEdit?.pendingstypeId);
      setValueEditPending("subject", pendingToEdit?.subject);
      setValueEditPending("prospect", pendingToEdit?.prospectId);
      setValueEditPending("place", pendingToEdit?.place);
      setValueEditPending("notify", pendingToEdit?.notify);
      setValueEditPending("remember", pendingToEdit?.remember);
      setValueEditPending(
        "date_from",
        `${new Date(new Date(pendingToEdit.date_from) - tzoffset).toISOString().slice(0, -1).split(":")[0]}:${
          new Date(new Date(pendingToEdit.date_from) - tzoffset).toISOString().slice(0, -1).split(":")[1]
        }`
      );
      setValueEditPending("zone", pendingToEdit?.zone);
      if (pendingToEdit.date_to) {
        setValueEditPending(
          "date_to",
          `${new Date(new Date(pendingToEdit.date_to) - tzoffset).toISOString().slice(0, -1).split(":")[0]}:${
            new Date(new Date(pendingToEdit.date_to) - tzoffset).toISOString().slice(0, -1).split(":")[1]
          }`
        );
      }
      if (pendingToEdit.oportunityId) {
        setValueEditPending("oportunity", pendingToEdit?.oportunityId);
      }
      setProspectSelected(pendingToEdit.prospectId);
      
    }, [pendingToEdit, flag]);
  

  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];


  const NZONE = 6;
  const zones = [
    { gmt: "GMT-05:00", zones: ["Quintana Roo"] },
    { gmt: `GMT-0${NZONE}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: false },
    { gmt: `GMT-0${NZONE - 1}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: true },
    { gmt: `GMT-0${NZONE + 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: false },
    { gmt: `GMT-0${NZONE + 1 - 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: true },
    { gmt: `GMT-0${NZONE + 2}:00`, zones: "Baja California", summer: false },
    { gmt: `GMT-0${NZONE + 2 - 1}:00`, zones: "Baja California", summer: true },
  ];

  
  const getDataCalendary = async () => {
    try {
      setIsLoading(true);
      const query = {
        params: {
          limit: 500,
          count: 1,
          include: "pendingstype,prospect,prospect.phase",
          where: {
            ejecutiveId: type === "ejecutive" ? id_user : id_executive,
            isdone: false,
            date_from: {
              between: dateRange,
            },
          },
        },
      };
      
            const pendings = await api.get("pendings", query);
            if (pendings.status === 200) {
              const updatedPendings = pendings.data;
              console.log('upddatedPendings:', updatedPendings);
              setCountSlopes(pendings.data.count);
              
              // Normalización de datos para el calendario
              const events = normalizeDataCalendaryEjecutive(pendings.data.results);
              console.log('Eventos noramlizados', events);
              
              //Asegurandonos de que los eventos se asignen a eventsCalendary
              // setEventsCalendary(events.concat(eventPayment || []));
              setEvents(events);
              //setEventsCalendary(events.concat(eventPayment)); //Datos para el Calendario
            }
      
      
          } catch (error) {
            console.error("getDataCalendary error:", error);
          } finally {
            setIsLoading(false);
          }
        };

  //Get prospectos del ejecutivo
    const getDataProspects = async () => {
      let query = {};
      if (id_user) {
        query.ejecutiveId = type === "ejecutive" ? id_user : id_executive;
      }
      try {
        let prospects = await api.get(`prospects?where=${JSON.stringify(query)}&order=-createdAt&all=1`);
        setDataProspects(prospects.data.results);
      } catch (error) {
        console.log(error);
      }
    };


  const [loaderBack, setLoaderBack] = useState(false);
  const { cve } = router.query;
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }

    return () => (mounted = false);
  }, [prospectId, flag, reloadDataCompletePending]);
  //petición para pendientes sin el loader(cargando) 24/10/2022
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getPendings();
    }
    return () => (mounted = false);
  }, [prospectId, refetch, reloadDataCompletePending]);

  useEffect(() => {
    if (idOportunity) {
      getQuotesByOportunity();
    }
  }, [oportunityId]);

  useEffect(() => {
    if (openReasign === false) setProspectDataReasign(prospect);
  }, [prospectDataReasign]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getInitialData = async () => {
    try {
      let queryTracking = {};
      setload(true);
      // 21/10/2022 se añadio el include a categoria
      let include =
        "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
      p.data.prospectId = prospectId;
      setProspect(p.data);
      setProspectDataReasign(p.data);
      queryTracking.prospectId = prospectId;
      let tracking = await api.get(`trackings?where=${JSON.stringify(queryTracking)}&order=-createdAt&include=phase`);
      setTracking(tracking.data.results);
      if (isOportunity) {
        let responseQuotes = await getQuotesByProspect();
        setOportunities(responseQuotes.data.results);
      }
      setload(false);
    } catch (error) {
      setload(false);
      if (error.response.config.url.includes("prospects")) {
        handleAlert("error", "Prospecto - Error al cargar los datos!", "basic");
      }
      if (error.response.config.url.includes("trackings")) {
        handleAlert("error", "Seguimientos - Error al cargar los datos!", "basic");
      }
    }
  };
  //petición para los pendientes sin el loader 24/10/2022
  const getPendings = async () => {
    try {
      setLoaderBack(true);
      let queryPendings = {};
      queryPendings.prospectId = prospectId;
      queryPendings.createdbyId = id_user;
      queryPendings.isdone = false;
      let params = {
        where: JSON.stringify(queryPendings),
        order: orderPendings.value,
        include: "pendingstype,prospect,prospect.phase",
      };
      let pendings = await api.get(`pendings`, { params });
      setPendings(pendings.data.results);
      setLoaderBack(false);
    } catch (error) {
      setLoaderBack(false);
      if (error.response.config.url.includes("pendings")) {
        handleAlert("error", "Pendientes - Error al cargar los datos!", "basic");
      }
    }
  };
  const getQuotesByProspect = () => {
    let query = {
      prospectId: prospectId,
    };
    let include = "phase";
    return api.get(`oportunities?where=${JSON.stringify(query)}&include=${include}&order=-createdAt`);
  };

  const getQuotesByOportunity = async () => {
    if (!oportunityId && isOportunity) return;
    try {
      let query = {
        oportunityId: oportunityId,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product",
      };
      let quotes = await api.get("productsoportunities", { params });

      let products = quotes.data?.results;
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  // * LLamada de Alerta
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  // * UTILS METHODS
  const formatNumber = number => {
    let options = { style: "currency", currency: "MXN" };
    let numberFormat = new Intl.NumberFormat("es-MX", options);
    return numberFormat.format(number);
  };

  const checkLength = array => (array?.length > 0 ? true : false);

  // * HANDLERS EVENTS

  const handleClickProspect = scrollTo => {
    if (isOportunity) {
      if (cve == "0111") {
        router.push({
          pathname: "/oportunidades/[oportunidad]",
          query: { oportunidad: prospect.id, scrollTo: scrollTo, cve: cve },
        });
      } else {
        router.push({
          pathname: "oportunidades/[oportunidad]",
          query: { oportunidad: prospect.id, scrollTo: scrollTo },
        });
      }
    } else {
      if (cve == "0111") {
        router.push({
          pathname: "/prospectos/[oportunidad]",
          query: { oportunidad: prospect.id, scrollTo: scrollTo, cve: cve },
        });
      } else {
        router.push({ pathname: "prospectos/[oportunidad]", query: { oportunidad: prospect.id, scrollTo: scrollTo } });
      }
    }
  };

  const handlePendingsComplete = async slope => {
    setPendingToComplete(slope);
    setOpenConfirmPending(true);
  };
  const handleSelectOrderPendigns = e => {
    let order = FiltersOrder.filter(item => item.value == e.target.value);
    setOrderPendigs({ label: order[0].label, value: order[0].value });
    setRefetch(!refetch);
  };

  const handleAddTraking = () => {
    // if function is passes by props, do handle
    // else old behavior
    if (handleClickAddTracking) {
      handleClickAddTracking(prospect);
      closeDrawer();
    } else {
      handleClickProspect("seguimientos");
    }
  };

  const handleAddPending = () => {
    let ViewData = {};
    ViewData.itemBD = prospect;
    ViewData.id = prospect.id;
    handleClickAddPending(ViewData);
    closeDrawer();
  };

  
 //Update pendientes
 const handleUpdatePending = async formData => {
  if (!pendingToEdit) {
    return;
  }
  let json = {
    notify: true,
    remember: true,
    isdone: false,
    notify_by: formData.notify_by,
    remember_by: formData.remember_by,
    description: formData.description,
    pendingstypeId: formData.type,
    subject: formData.subject,
    date_from: new Date(formData.date_from).toISOString(),
    prospectId: formData.prospect,
    oportunityId: "",
    zone: formData.zone,
    status: 1,
    priority: formData.priority,
  };
  if (formData.place) {
    json.place = formData.place;
  }
  if (formData.notify_by){
    json.notify_by = new Date(formData.notify_by).toDateString();
  }else{
    json.notify_by = "correo";
  }
  if (formData.remember_by) {
    json.remember_by = new Date(formData.remember_by).toISOString();
  }else{
    json.remember_by = "correo";
  }
  if (formData.date_to) {
    json.date_to = new Date(formData.date_to).toISOString(); //línea por si se tiene que eliminar
  }
  let prospect = dataProspects.filter(prospect => prospect.id == formData.prospect)[0];
  if (prospect.isoportunity && formData.oportunity) {
    json.status = 2;
    json.oportunityId = formData.oportunity;
  }
  if (prospect.isclient) {
    json.status = 3;
  }
  let oportunity = oportunitiesFromProspectSelected?.filter(oportunity => oportunity.id == formData.oportunity)[0];
  if (oportunity?.iscloseout) {
    json.status = 4;
  }
  try {
    // console.log("json",json)     
    const responsePendings = await api.put(`pendings/${pendingToEdit.id}`, json );
    if (responsePendings.status === 200 ) {
      handleAlert("success", "Pendiente - Actualizado Correctamente!", "basic");
    }
    setFlag(!flag);
    setOpenEditPending(!openEditPending);
    // console.log('json despues de put', responsePendings.data ); 
  } catch (error) {
    console.log('Error al actualizar el recordatorio',error);
  }
}; 

  return (
    <>
      <DrawerStyled anchor="right" open={show} onClose={() => closeDrawer()}>
        {!load && (
          <>
            <ButtonClose close={() => closeDrawer()} />
            <div className="ctr_information">
              <div className="ctr_information__top">
                <p className="title">Prospecto</p>

                <div>
                  {roleId !== "ejecutivo" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className="btn_reasign"
                      onClick={() => setOpenReasign(true)}
                    >
                      Reasignar
                    </Button>
                  )}
                  <Button variant="contained" color="primary" className="btn_view" onClick={handleClickProspect}>
                    Ver Prospecto completo
                  </Button>
                </div>
              </div>
              <div className="divider" />
              {prospect?.discarted === true && (
                <div className="containerDiscarted">
                  <p className="textDiscarted"> {`Descartado por: ${prospect?.discartedreason}.`}</p>
                </div>
              )}
              <br />
              <ProspectData
                prospect={prospect}
                handleClick={handleClick}
                id={id}
                anchorEl={anchorEl}
                handleCloseMenu={handleCloseMenu}
                setOpenWhats={setOpenWhats}
                open={open}
              />

              <div className="divider" />
              {isOportunity && (
                <>
                  <div className="ctr_information__ctr_targets">
                    <div className="title">
                      <Timeline className="icon" />
                      <p className="text">Productos Cotizados</p>
                    </div>
                    {checkLength(products) && (
                      <div className="ctr_grid">
                        {products.slice(0, 6).map((item, index) => (
                          <div key={index} style={{ padding: 5 }}>
                            <div className="target_tracing">
                              <div className="top">
                                <div className="item">
                                  <FiberManualRecord className="icon" />
                                  <p className="date capitalize">{item?.name}</p>
                                </div>
                                <div className="item">
                                  <Today className="icon" />
                                  <p className="date">{formatDate(item.createdAt)}</p>
                                </div>
                              </div>
                              <span className="span">Producto</span>
                              <p>{item.product?.name}</p>
                              <span className="span">Monto</span>
                              <p>
                                {item.newprice === 0
                                  ? formatNumber(item.product?.callamount)
                                  : formatNumber(item.newprice)}
                              </p>
                              <Box position="absolute" right={10} display="flex" alignItems="center">
                                <span className="span">Cantidad</span>
                                <p style={{ marginLeft: 8 }}>{item.quantity}</p>
                              </Box>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!checkLength(products) && (
                      <div className="tracing_empty">
                        <img src="empty_tracking.svg" />
                        <Button
                          variant="contained"
                          className="btn_tracking"
                          onClick={() => {
                            router.push({
                              pathname: "prospectos/[prospecto]",
                              query: { prospecto: prospect.id },
                            });
                          }}
                        >
                          Agregar Cotizacion
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="divider" />
                </>
              )}
              <div className="ctr_information__ctr_targets">
                <div className="title" value="valor">
                  <Timeline className="icon" />
                  <Tooltip title="Agregar seguimiento">
                    <PostAdd onClick={handleAddTraking} className="redirec icon" />
                  </Tooltip>
                  <p className="text">Seguimientos</p>
                  <Tooltip title="ver Seguimientos">
                    <Launch className="redirec" onClick={() => handleClickProspect("seguimientos")} />
                  </Tooltip>
                </div>
                {tracking.length === 0 && prospect?.discarted === true && (
                  <div className="alertRequest">
                    <ErrorRounded className="alertRequest__icon" />
                    <p className="alertRequest__title">(Sin seguimientos prospecto descartado)</p>
                  </div>
                )}
                {tracking.length > 0 ? (
                  <div className="ctr_grid">
                    {tracking.slice(0, 6).map((item, index) => (
                      <div key={index} style={{ padding: 5 }}>
                        <div className="target_tracing">
                          <div className="top">
                            <div className="item">
                              <FiberManualRecord className="icon" />
                              <p className="date capitalize">{item?.phase?.name}</p>
                            </div>
                            <div className="item">
                              <Today className="icon" />
                              <p className="date">{formatDate(item.createdAt)}</p>
                            </div>
                          </div>
                          <span className="span">Asunto</span>
                          <p>{item.reason}</p>
                          <span className="span">Observación</span>
                          <p>{item.observations.slice(0, 180)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="tracing_empty">
                    <img src="empty_tracking.svg" />
                    <Button variant="contained" className="btn_tracking" onClick={handleAddTraking}>
                      Agregar seguimientos
                    </Button>
                  </div>
                )}
              </div>
              <div className="divider" />
              <div className="ctr_information__ctr_targets">
                <div className="titlePendings">
                  <div className="cont">
                    <Timeline className="icon" />
                    <Tooltip title="Agregar pendiente">
                      <AddAlert onClick={handleAddPending} className="redirec icon" />
                    </Tooltip>
                    <p className="text">Pendientes</p>
                    <Tooltip title="ver Pendientes">
                      <Launch className="redirec" onClick={() => handleAddPending()} />
                    </Tooltip>
                  </div>

                  {pendings.length >= 1 && (
                    <div className="order">
                      <p>Ordenar Por: </p>
                      <select
                        value={orderPendings.value}
                        onChange={e => {
                          handleSelectOrderPendigns(e);
                        }}
                        className="input"
                      >
                        {FiltersOrder.map((item, index) => {
                          return (
                            <option value={item.value} key={index}>
                              {item.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
                {loaderBack && (
                  <div className="ctr_grid2">
                    <div className="containerLoader">
                      <CircularProgress color="inherit" />
                    </div>
                  </div>
                )}
                {!loaderBack &&
                  (pendings.length > 0 ? (
                    <div className="ctr_grid">
                      {pendings.slice(0, 6).map((item, index) => (
                        <div key={index} style={{ padding: 5 }}>
                          <div className="target_pendings">
                            <div className="top">
                              <div className="item">
                                <PersonPinCircle className="icon" />
                                <p className="date">
                                  {item?.place.length > 30 ? `${item?.place.slice(0, 30)}...` : item?.place}
                                </p>
                              </div>
                              <div className="item">
                                <Today className="icon" />
                                <p className="date">{formatDate(item?.createdAt)}</p>
                              </div>
                            </div>
                            <span className="span">Estado de pendiente</span>
                            <p className={` ${item.isdone ? "ct_icon_complete" : "ct_icon_incomplete"}`}>
                              {item.isdone ? "Completo" : "No completado"}
                            </p>
                            <span className="span">Asunto</span>
                            <p>{item?.subject.length > 40 ? `${item?.subject.slice(0, 40)}...` : item?.subject}</p>
                            <span className="span">Observación</span>
                            <p>{item?.description.slice(0, 80)}</p>
                            <span className="span">Fecha del pendiente</span>
                            <p className="time">{`${formatDate(item?.date_from)} a las ${formatHour(
                              item?.date_from
                            )}`}</p>
                            {item?.date_to && (
                              <>
                                <span className="span">Hasta</span>
                                <p className="time">{`${formatDate(item?.date_to)} a las ${formatHour(
                                  item?.date_top
                                )}`}</p>
                              </>
                            )}
                            <br />
                            {item.isdone === false ? (
                              <Button
                                onClick={() => handlePendingsComplete(item)}
                                className="pendingButton"
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                                Marcar como terminado
                              </Button>
                            ) : (
                              <Button className="pendingButton" variant="contained" size="small" disabled>
                                Marcar como terminado
                              </Button>
                            )}
                            <div className= "editPending" >
                            <Button  
                             onClick={() => {
                              console.log(event, "event ")
                              setPendingToEdit(item);
                              setOpen(false);
                              setOpenEditPending(true);
                            }}
                             className="btn_pending"  
                            variant="contained" 
                            color="primary"
                             size="small"  
                             >
                           Editar pendientes
                            </Button >
                            </div>
                            </div>
                          </div>
                      
                      ))}
                    </div>
                  ) : (
                    <div className="tracing_empty">
                      <img src="empty_tracking.svg" />
                      <Button variant="contained" className="btn_tracking" onClick={handleAddPending}>
                        Agregar pendiente
                      </Button>
                    </div>
                  ))}
              </div>
              <div className="divider" />
              <div className="ctr_information__ctr_targets">
                <Files filesFrom={"prospect"} data={prospect} />
              </div>
            </div>
          </>
        )}

        {load && (
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
      </DrawerStyled>
      <CompletePending
        pending={pendingToComplete}
        open={openConfirmPending}
        close={handleCloseConfirmPending}
        handleAlert={handleAlert}
        refetch={reloadDataCompletePending}
        setRefetch={setReloadDataCompletePending}
      />
      <FormWhatsapp
        idOportunity={idOportunity}
        isOportunity={false}
        isClient={false}
        isProspect={true}
        openWhats={openWhats}
        setOpenWhats={setOpenWhats}
        prospect={prospect}
        handleCloseMenu={handleCloseMenu}
        reloadDataCompletePending={reloadDataCompletePending}
        setReloadDataCompletePending={setReloadDataCompletePending}
      />
      <ModalReasigned
        open={openReasign}
        setopen={setOpenReasign}
        Prospect={prospectDataReasign}
        setProspect={setProspectDataReasign}
        setFlag={setRefetch}
        flag={refetch}
      />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}

    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={openEditPending}
      onClose={handleCloseEditPending}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropsProps={{
      timeout: 500,
      }}
    >
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
<ModalNewPending>
<p className="title">Editar Pendiente</p>
<div className="modalBody"> 
  <form onSubmit={handleSubmitEditPending(handleUpdatePending)}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <label className="ctr_inputs__label">Tipo de pendiente *</label>
        <select {...registerEditPending("type")} defaultValue={pendingToEdit?.pendingtypeId}
        onChange={e => {
          let type = pendingstypes.results.filter(item => item.id == e.target.value);
          setTypePending({ name: type[0].name, id: type[0].id });
        }}
        className={ errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input" }>
          <option value="" hidden>
            Seleccione uno...
          </option>
          {pendingstypes.isFetching && (
            <option disabled={true} value={null}>
              Cargando Opciones...
            </option>
          )}
          {pendingstypes.results?.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </Grid>
      <Grid item xs={12} md={4}>
          <label className="ctr_inputs__label">Prioridad *</label>
          <select
          {...registerEditPending("priority",{ required: true })}
          className={
            errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
          }
          >
          <option value="" hidden>
            Seleccione uno...
          </option>
          {prioritys?.map(item => (
            <option className="option" key={item.priority} value={item.priority}>
              {item.name}
            </option>
          ))}
          </select>
      </Grid>
      <Grid item xs={12} md={4}></Grid>
      <Grid item xs={12} md={4}>
        <label className="ctr_inputs__label">Prospecto:</label>
        <select
          {...registerEditPending("prospect", {required: true})}
          className={
            errorsEditPending?.prospect?.type === "required"
            ? "ctr_inputs__input error"
            : "ctr_inputs__input"
          }
          onChange={e => {
            setProspectSelected(e.target.value);
          }}>
            <option value={""} hidden>
              Selecciona uno...
            </option>
            {dataProspects?.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
           </select>
      </Grid>
      {oportunitiesFromProspectSelected ? (
        <Grid item xs={12} md={4}>
          <label className="ctr_inputs__label">Cotizaciones *:</label>
          <select 
          {...registerEditPending("oportunity", { required: true })}
           className={
            errorsEditPending?.prospect?.type === "required"
            ? "ctr_inputs__input error"
            : "ctr_inputs__input"
           }
        >
          <option value={""} hidden>
           Seleccione uno...
          </option>
          {oportunitiesFromProspectSelected.map(item => (
            <option key={item.id} value={item.id}>
              {item.concept}
            </option>
          ))}
          </select>
        </Grid>
      ):(
        <Grid item xs={12} md={4}></Grid>
      )}
      <Grid item xs={12} md={7}>
      <label className="ctr_inputs__label">Asunto</label>
      <input 
      {...registerEditPending("subject", { required: true })}
      className={
        errorsEditPending?.subject?.type === "required"
        ? "ctr_inputs__input error"
        : "ctr_inputs__input"
      }
      />
      </Grid>
      <Grid item xs={12} md={5}>
      <label className="ctr_inputs__label">Lugar</label>
      <input 
      {...registerEditPending("place", { required: false})}
      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
      className={
        errorsEditPending?.place?.type === "required"
        ? "ctr_inputs__input error"
        : "ctr_inputs__input"
      }
      />
      </Grid>
      <Grid item xs={12} md={12}>
        <label className="ctr_inputs__label">Descripción</label>
        <textarea
        {...registerEditPending("description", { required: false })}
        className={
          errorsEditPending?.description?.type === "required"
          ? "ctr_inputs__input error"
          : "ctr_inputs__input"
        }
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <label className="ctr_inputs_label">Fecha Inicio</label>
        <input 
        {...registerEditPending("date_from", { required: true })}
        type="datetime-local"
        className={
          errorsEditPending?.date_from?.type === "required"
          ? "ctr_inputs__input error"
          : "ctr_inputs__input"
        }
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <label className="ctr_inputs__label">Fecha Termino</label>
        <input 
        {...registerEditPending("date_to", { required: false})}
        type="datetime-local"
        disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
        className={
          errorsEditPending?.date_to?.type === "required"
          ? "ctr_inputs__input error"
          : "ctr_inputs__input"
        }
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <label className="ctr_inputs__labels">Zona Horaria:</label>
        <select 
        {...registerEditPending("zone", { required: true })}
        className={
          errorsEditPending?.zone?.type === "required"
          ? "ctr_inputs__input error"
          : "ctr_inputs__input"
        }
        >
        <option value={""} hidden >
        Selecciona uno...
        </option>  
        {zones?.map((item, index) => (
          <option key={index} value={item.gmt}>
            ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano" : null}
          </option> 
        ))}
        </select> 
      </Grid>
      
        <Button variant="contained" color="primary" type="submit" className="btn_save">
          Guardar
        </Button>
        <Button
        variant="contained"
        color="primary"
        type="reset"
        className="btn_cancel"
        onClick={() => {
          setOpenEditPending(!openEditPending);
          resetEditPending();
          setPendingToEdit(null);
        }}
        >
          Cancelar
        </Button>
      
    </Grid>
  </form>
</div>
</ModalNewPending>
</motion.div>
</Modal>
</>

);
};

export default DrawerProspects;

const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 20px;
    @media (max-width: 600px) {
      width: 100%;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .ctr_information {
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
      .btn_view {
        text-transform: capitalize;
      }
      .btn_reasign {
        text-transform: capitalize;
        margin-right: 5px;
      }
    }
    &__data {
      margin-bottom: 10px;
      .label {
        font-size: 13px;
        font-weight: bold;
        color: #4f4f4f;
        margin-bottom: 2px;
      }
      .paragraph {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }
      .capitalize {
        text-transform: capitalize;
      }

      .light {
        color: #2979ff;
      }
      .whatsApp {
        &:hover {
          cursor: pointer;
        }
      }
      span {
        color: #d1d1d1;
        font-size: 12px;
        font-weight: 500;
      }
      .name {
        text-transform: capitalize;
      }
    }
    &__ctr_targets {
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
          cursor: pointer;
        }
        .icon {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        .redirec {
          cursor: pointer;
        }
      }
      .cont {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .order {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          margin-top: 7px;
          margin-right: 7px;
          font-weight: 600;
          color: #495057;
        }
        .input {
          margin-top: 7px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          height: 40px;
          border: 2px solid #f3f3f3;

          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
            color: #405189;
          }
        }
      }
      .cont {
        display: flex;

        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .titlePendings {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-between;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
        .icon {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        .redirec {
          cursor: pointer;
        }
      }
      .alertRequest {
        display: flex;
        align-items: center;
        margin-left: 6px;
        &__icon {
          color: rgb(211, 47, 47);
          font-size: 14px;
          font-weight: bold;
        }
        &__title {
          color: rgb(211, 47, 47);
          font-size: 14px;
          font-weight: bold;
        }
      }
      .ctr_grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding: 0px 10px;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .ctr_grid2 {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding: 0px 10px;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .containerLoader {
        display: flex;
        padding: 5px;
        margin: auto;
        height: 265px;

        align-items: center;
      }
      .MuiCircularProgress-root.MuiCircularProgress-indeterminate {
        color: #3f51b5;
      }
      .target_tracing {
        padding: 10px;
        height: 210px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
        border-radius: 8px;
        position: relative;
        box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
        &::before {
          top: 0px;
          left: 0px;
          width: 5px;
          bottom: 0px;
          content: "";
          position: absolute;
          background-image: linear-gradient(
            to right bottom,
            #3f51b5,
            #2d499e,
            #1e4086,
            #13376f,
            #0e2d58,
            #122d55,
            #142c51,
            #172c4e,
            #20355c,
            #2a3e6b,
            #35487a,
            #405189
          );
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          .item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .icon {
              color: #3f51b5;
              font-size: 16px;
            }
            .date {
              font-size: 12px;
              font-weight: bold;
              color: #0c203b;
            }
            .capitalize {
              text-transform: capitalize;
            }
          }
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }
      }
      .editPending {
       position: relative;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;
          margin-top: -11px;
          top:30px
      }.btn_pending {
          margin-top: 10px;
          text-transform: capitalize;
          color: #fff;
          font-size: 12px;
          padding: 5px 100px;
        }
      .tracing_empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
          width: 320px;
          height: 120px;
          object-fit: contain;
        }
        .btn_tracking {
          margin-top: 10px;
          text-transform: capitalize;
          background: #103c82;
          color: #fff;
          font-size: 12px;
          padding: 5px 10px;
        }
      }
      .target_pendings {
        padding: 10px;
        height: 285px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
        border-radius: 8px;
        position: relative;
        box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
        &::before {
          top: 0px;
          left: 0px;
          width: 5px;
          bottom: 0px;
          content: "";
          position: absolute;
          background-image: linear-gradient(
            to right bottom,
            #3f51b5,
            #2d499e,
            #1e4086,
            #13376f,
            #0e2d58,
            #122d55,
            #142c51,
            #172c4e,
            #20355c,
            #2a3e6b,
            #35487a,
            #405189
          );
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          .item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .icon {
              color: #3f51b5;
              font-size: 16px;
            }
            .date {
              font-size: 12px;
              font-weight: bold;
              color: #0c203b;
            }
          }
        }
        .ct_icon_complete {
          justify-content: center;
          color: #008000;
        }
        .ct_icon_incomplete {
          justify-content: center;
          color: red;
        }
        .pendingButton {
          position: absolute;
          width: 300px;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;
          margin-top: -11px;
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }

        .time {
          font-size: 14px;
          font-weight: bold;
          color: #103c82;
        }
      }
      .files_container {
        .head {
          display: flex;
          align-items: center;

          .title {
            font-weight: bold;
            margin-bottom: -1px;
          }
          .icon {
            width: 30px;
            height: 30px;
            padding: 5px;
            margin-right: 5px;
            background: #dce1f6;
            color: #0c203b;
            border-radius: 50%;
          }
          .iconFolder {
            width: 30px;
            height: 30px;
            padding: 5px;
            margin-right: 5px;
            background: #dce1f6;
            color: #0c203b;
            border-radius: 50%;
          }
        }
        .body {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          .file {
            border: 1px solid #3f51b5;
            margin: 5px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            .icon_file {
              color: #3f51b5;
            }
            .content {
              width: 100%;
              padding: 5px;
              .title_file {
                width: 160px;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .button_options {
              width: 5px;
              height: 20px;
              margin-top: -25px;
              color: #3f51b5;
            }
          }
        }
      }
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
  }
  .textDiscarted {
    background-color: rgb(191, 24, 24);
    color: rgb(255, 255, 255);
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    padding: 4px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .link {
    margin-left: 8px;
    :hover {
      color: blue;
    }
  }

  .tooltip {
    width: 90px;
  }
`;

const MenuWhats = styled.div`
  .headerMenu {
    display: flex;
    align-items: center;
    .titleMenu {
      font-weight: 500;
      padding: 5px 5px 10px 10px;
    }
    &__icon {
      margin-top: -4px;
      font-size: 15px;
      color: #103c82;
    }
  }
  .number {
    font-weight: 500;
    padding: 5px 10px;
  }
  .menuItem {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: rgb(220, 225, 246, 0.4);
      .iconArrow {
        font-size: 25px;
        color: #103c82;
        transform: translateX(4px);
      }
    }

    .iconArrow {
      font-size: 25px;
      transition: 0.3s;
      margin-left: 5px;
      color: grey;
    }
    &__icon {
      color: green;
      font-size: 17px;
      margin-right: 5px;
    }
    &__title {
      font-weight: 500;
      font-size: 13px;
    }
  }
`;

const ModalNewPending = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  &:focus {
    outline: none;
    border: none;
  }
  .title {
    border-radius: 5px 5px 0px 0px;
    padding: 10px 20px;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: #0c203b;
    letter-spacing: 0.04em;
    color: #fff;
  }
  .modalBody {
    padding: 10px;
    .ctr_inputs {
      padding: 0 20px 20px 20px;
      &__label {
        font-size: 12px;
        font-weight: bold;
        color: #4f4f4f;
      }
      &__input {
        width: 100%;
        padding: 5px 0;
        border: none;
        border-bottom: 1.5px solid #ccc;
        transition: all 0.3s ease;
        font-size: 16px;
        min-height: 36px;
        resize: none;
        padding: 0px 5px;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;

          border-bottom: 1.5px solid #0d0d0d;
        }
      }
      .error {
        border-bottom: 1.5px solid #f50f;
      }
      &__span_error {
        height: 16px;
        font-weight: bold;
        letter-spacing: 0.05em;
        font-size: 10px;
        color: #f50;
        margin-top: 5px;
      }
    }
    .ctr_buttons {
      display: flex;
      padding: 0 20px;
      padding-bottom: 20px;
      justify-content: flex-end;
      .btn_cancel {
        text-transform: capitalize;
        background: #7c0b0b;
      }
      .btn_save {
        margin-right: 10px;
        text-transform: capitalize;
        background: #0c203b;
      }
    }
    .ctr_slope {
      padding: 20px;
      &__title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin-bottom: 10px;
        span {
          color: #0c203b;
        }
      }
      &__item {
        width: 100%;
        .label {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: #626262;
          svg {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-right: 5px;
            color: #115293;
          }
        }
        .text {
          color: #000;
          font-weight: 600;
        }
        .span {
          color: #c7c7c7;
          font-size: 14px;
          font-weight: 500;
        }
      }
      &__ctr_buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        .btn_close {
          text-transform: capitalize;
          background-color: #000;
          color: #fff;
          margin-right: 10px;
        }
        .btn_complete {
          text-transform: capitalize;
          background: #0c203b;
          color: #fff;
        }
      }
    }
  }
`;

const DivLine = styled.div`
  background-color: #303f9f;
  height: 0.5px;
  width: 100%;
`;
const FiltersOrder = [
  { label: "Fecha de Pendiente", value: "date_from" },
  { label: "Fecha de Creación", value: "-createdAt" },
];

const files = [
  {
    name: "archivo 1",
    url: "facebook.com",
  },
  {
    name: "nombre de archivo muy grande que no quepa en la info archivo 2",
    url: "facebook.com",
  },
  {
    name: "archivo 3",
    url: "facebook.com",
  },
  {
    name: "archivo 4",
    url: "facebook.com",
  },
  {
    name: "archivo 5",
    url: "facebook.com",
  },
];