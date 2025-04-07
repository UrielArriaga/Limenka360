import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  LinearProgress,
  Tooltip,
  Link,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import {
  AddAlert,
  FiberManualRecord,
  Launch,
  NavigateNext,
  PersonPinCircle,
  PostAdd,
  Settings,
  Timeline,
  Today,
  WhatsApp,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { DrawerStyled } from "./styles";
import ProspectData from "../../../ProspectData";
import CompletePending from "../../../ModalCompletePendings";
import FormWhatsapp from "../../../SendWhatsapp";
import ModalReasigned from "../../../ModalReasigned";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { userSelector } from "../../../../redux/slices/userSlice";
import RequestCommon from "../../../../services/request_Common";
import { api } from "../../../../services/api";
import { formatDate, formatHour } from "../../../../utils";
import ReasignedAdminSales from "../../atoms/ReasignModalAdminSales";
export default function DrawerProspectsAdminSales({
  oportunityId,
  isOportunity,
  isClient,
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
}) {
  const router = useRouter();
  const { id_user, roleId } = useSelector(userSelector);
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
  const [oportunities, setOportunities] = useState([]);
  const [products, setProducts] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const idOportunity = oportunityId;
  const handleCloseConfirmPending = () => setOpenConfirmPending(false);

  const [actions, setActions] = useState([]);
  const [loaderBack, setLoaderBack] = useState(false);
  // const [flag, setFlag] = useState(false);
  const commonApi = new RequestCommon();
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
      getActions();
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
    getQuotesByOportunity();
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

  const getActions = async () => {
    try {
      let actions = await commonApi.getActions();
      setActions(actions.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getInitialData = async () => {
    try {
      let queryTracking = {};
      setload(true);
      // 21/10/2022 se añadio el include a categoria
      let include =
        "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
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
      router.push({ pathname: "oportunidades/[oportunidad]", query: { oportunidad: prospect.id, scrollTo: scrollTo } });
    } else {
      router.push({ pathname: "prospectos/[prospecto]", query: { prospecto: prospect.id } });
    }
  };

  const handleClickProspectWithId = id => {
    if (isOportunity) {
      router.push({ pathname: `oportunidades/[oportunidad]/#${id}`, query: { oportunidad: prospect.id } });
    } else {
      router.push({ pathname: `prospectos/[oportunidad]/#${id}`, query: { oportunidad: prospect.id } });
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
    // if function is passes by props, do handle
    // else old behavior
    if (handleClickAddPending) {
      handleClickAddPending(prospect);
      closeDrawer();
    } else {
      handleClickProspect("pendientes");
    }
  };

  return (
    <>
      <DrawerStyled anchor="right" open={show} onClose={() => closeDrawer()}>
        {!load && (
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
                  <img src="/empty_tracking.svg" />
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
                    <Launch className="redirec" onClick={() => handleClickProspect("pendientes")} />
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
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="tracing_empty">
                    <img src="/empty_tracking.svg" />
                    <Button variant="contained" className="btn_tracking" onClick={handleAddPending}>
                      Agregar pendiente
                    </Button>
                  </div>
                ))}
            </div>
          </div>
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
      />
      <ReasignedAdminSales
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
    </>
  );
}

const FiltersOrder = [
  { label: "Fecha de Pendiente", value: "date_from" },
  { label: "Fecha de Creación", value: "-createdAt" },
];
