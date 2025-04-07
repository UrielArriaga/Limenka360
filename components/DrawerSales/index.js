import { Button, Grid, LinearProgress, Tooltip, CircularProgress, Box } from "@material-ui/core";
import {
  AttachMoney,
  FiberManualRecord,
  Launch,
  PersonOutlineOutlined,
  PersonPinCircle,
  Timeline,
  Today,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../services/api";
import AlertGlobal from "../Alerts/AlertGlobal";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { formatDate, formatHour, formatLink, formatNumber } from "../../utils";
import { DrawerStyled, MenuWhats, DivLine } from "./styles";
import FormWhatsapp from "../SendWhatsapp";
import Switch from "@material-ui/core/Switch";
import ProspectData from "../ProspectData";
import RequestCommon from "../../services/request_Common";
import ButtonClose from "../ButtonClose";
import ProductsOportunity from "../ProductsCotization";

const DrawerSales = ({
  oportunityId,
  isOportunity,
  isClient,
  show,
  closeDrawer,
  prospectId,
  switchPayments,
  setSwitchPayments,
  switchExpiredPayments,
  setSwitchExpiredPayments,
  switchFilters,
  setswitchFilters,
  orderPendings,
  setOrderPendigs,
  refetch,
  setRefetch,
  flag,
  setFlag,
}) => {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const [load, setload] = useState(true);
  const [Alert, setAlert] = useState({
    severity: null,
    show: null,
    message: "",
    type: null,
  });
  const [prospect, setProspect] = useState({});
  const [products, setProducts] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [openWhats, setOpenWhats] = useState(false);
  const [informationOportunities, setInformationOportunities] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const idOportunity = oportunityId;
  const [loaderBack, setLoaderBack] = useState(false);

  const [actions, setActions] = useState([]);
  const commonApi = new RequestCommon();

  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }
    return () => (mounted = false);
  }, [prospectId, flag]);
  //petición para pendientes sin el loader(cargando) 24/10/2022
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getPendings();
      getActions();
    }
    return () => (mounted = false);
  }, [prospectId, refetch]);

  useEffect(() => {
    getPaymnetsByOportunity();
    getoportunities();
    getProductsOportunity();
  }, [oportunityId]);

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
        include: "pendingstype,prospect",
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
  const getInitialData = async () => {
    try {
      let queryTracking = {};

      setload(true);
      // 21/10/2022 se añadio el include a categoria
      let include =
        "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,channel,prospectslabels,prospectslabels.label";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
      setProspect(p.data);
      queryTracking.prospectId = prospectId;
      let tracking = await api.get(`trackings?where=${JSON.stringify(queryTracking)}&order=-createdAt&include=phase`);
      setTracking(tracking.data.results);

      setload(false);
    } catch (error) {
      setload(false);
      if (error.response.config.url.includes("prospects")) {
        handleAlert("error", "Prospecto - Error al cargar los datos!", "basic");
      }
      if (error.response.config.url.includes("trackings")) {
        handleAlert("error", "Seguimientos - Error al cargar los datos!", "basic");
      }
      if (error.response.config.url.includes("pendings")) {
        handleAlert("error", "Pendientes - Error al cargar los datos!", "basic");
      }
    }
  };

  const getoportunities = async () => {
    try {
      let oportuntiesResponse = await api.get(`oportunities/${oportunityId}?include=phase`);
      setInformationOportunities(oportuntiesResponse.data);
    } catch (error) {}
  };

  const getPaymnetsByOportunity = async () => {
    if (!oportunityId && isOportunity) return;
    try {
      let query = { oportunityId };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        order: "date",
        include: "oportunity",
      };
      let payment = await api.get("salespayments", { params });
      let paymentse = payment.data?.results;
      setPayments(paymentse);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsOportunity = async () => {
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
  //Cuenta los pagos
  const countPaidPayments = async idProspect => {
    let query = {
      params: {
        include: "oportunity,oportunity.prospect",
        count: "1",
        limit: "20",
        skip: "1",
        where: `{"ispaid": true, "oportunity": {"prospect": { "id": "${idProspect}"} }}`,
      },
    };

    try {
      await api.get("salespayments", query);
    } catch (error) {}
  };

  // Marcar como pagado
  const pay = async p => {
    //Formar el objeto para colocar como true el pago
    let paymentFormat = { ...p };
    delete paymentFormat.oportunity;
    delete paymentFormat.id;
    let payments = {
      payments: [
        {
          ...paymentFormat,
          paymentId: p.id,
          ispaid: true,
        },
      ],
    };
    try {
      let checkPay = await api.put("salespayments", payments);
      let query = {
        params: {
          include: "oportunity,oportunity.prospect",
          count: "1",
          limit: "20",
          skip: "1",
          where: `{"ispaid": true, "oportunity": {"prospect": { "id": "${prospectId}"} }}`,
        },
      };
      let countPaidPayments = await api.get("salespayments", query);
      let oportuntiesResponse = await api.get(`oportunities/${oportunityId}?&include=phase`);
      !oportuntiesResponse.data.ispaid && checkPay && handleAlert("success", "Se marco como pagado!", "basic");
      if (oportuntiesResponse.data.ispaid === true) {
        handleAlert("success", "Tus pagos de la venta se han concluido", "basic");
      }
      //Crear el objeto
      let trackings = {
        reason: `Pago ${countPaidPayments.data.count} de ${p.oportunity.payments}`,
        observations: `El pago ${countPaidPayments.data.count} de ${p.oportunity.payments} fue realizado`,
        actionId: ACTIONIDPRODUCTIONMODE,
        prospectId: prospectId,
        phaseId: p.oportunity.phaseId, //Cuenta por cobrar
        oportunityId: p.oportunityId,
        status: 4,
      };
      //Crear el seguimiento del pago
      await api.post("trackings", trackings);
      getInitialData(); //Actualiza  los seguimientos
      getPaymnetsByOportunity(); //Actualiza los pagos
    } catch (error) {
      handleAlert("error", "Error al marcar el pago!", "basic");
    }
  };

  const splitDate = d => {
    if (d) {
      let splitDate = d.split("T", 1);
      return splitDate[0];
    } else {
      return "-";
    }
  };

  const expiredDates = d => {
    let splitDate = d.split("-", 3);
    let splitDateYear = splitDate[0];
    let splitDateMonth = splitDate[1];
    let splitDateDay = splitDate[2];

    const today = new Date();
    today.toLocaleDateString();

    let todayYear = today.getFullYear().toString();
    let todayMonth = today.getMonth() + 1;
    let todayDay = today.getDate();

    let txtExpirado = true;
    let txtNoExpirado = false;

    //Menor ya no se puede pagar
    if (splitDateYear < todayYear) {
      return txtExpirado;
    }

    //Igual revisemos el mes
    if (splitDateYear == todayYear) {
      //Mes menor ya no se puede pagar
      if (splitDateMonth < todayMonth) {
        return txtExpirado;
      }

      //Mes igual hay que revisar el dia
      if (splitDateMonth == todayMonth) {
        //Si el dia es menor ya paso por lo que no se puede pagar
        if (splitDateDay < todayDay) {
          return txtExpirado;
        }

        //El dia es hoy aun podemos pagar
        if (splitDateDay == todayDay) {
          return txtNoExpirado;
        }

        //El dia es mayor aun tenemos dias
        if (splitDateDay > todayDay) {
          return txtNoExpirado;
        }
      }

      //Mes mayor el dia no importa se puede pagar
      if (splitDateMonth > todayMonth) {
        return txtNoExpirado;
      }
    }

    //Mayor se puede pagar
    if (splitDateYear > todayYear) {
      return txtNoExpirado;
    }
  };
  const handlePendingsComplete = async slope => {
    try {
      let pending = await api.put(`pendings/${slope.id}`, { isdone: true });
      // let action = actions.filter((item) => item.name == slope.pendingstype.name);
      handleAlert("success", "Pendiente - Marcado como completado!", "basic");
      setRefetch(!refetch);
      let trackingPending = {};
      trackingPending.prospectId = slope.prospect.id;
      trackingPending.observations = `Pendiente: ${slope.subject}, completado el dia ${formatDate(
        pending.data.pending.updatedAt
      )}`;
      trackingPending.actionId = ACTIONIDPRODUCTIONMODE;
      trackingPending.status = "4";
      trackingPending.reason = "Seguimiento automático";
      trackingPending.phaseId = PHASEIDPRODUCTIONMODE;
      trackingPending.createdbyId = id_user;
      trackingPending.oportunityId = idOportunity;

      await api.post(`trackings`, trackingPending);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
      handleAlert("error", "Pendiente - Error al cambiar el estatus!", "basic");
    }
  };
  const handleClickProspect = () => {
    router.push({
      pathname: "ventas/[prospecto]",
      query: { prospecto: prospect.id, o: oportunityId },
    });
  };
  const handleSelectOrderPendigns = e => {
    let order = FiltersOrder.filter(item => item.value == e.target.value);
    setOrderPendigs({ label: order[0].label, value: order[0].value });
    setRefetch(!refetch);
  };
  return (
    <DrawerStyled
      width={"60%"}
      anchor="right"
      open={show}
      onClose={() => {
        closeDrawer();
      }}
    >
      {load ? (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      ) : (
        <>
          <ButtonClose close={() => closeDrawer()} />
          <div className="ctr_information">
            <div className="ctr_information__top">
              <p className="title">Venta</p>
              <div>
                <Button variant="contained" color="primary" className="btn_view" onClick={() => handleClickProspect()}>
                  Ver Venta completa
                </Button>
              </div>
            </div>
            <div className="divider" />
            <div className="ctr_information__titleProspectContainer">
              <PersonOutlineOutlined />
              <p className="ctr_information__titleProspect">Datos Prospecto</p>
            </div>
            <ProspectData
              prospect={prospect}
              handleClick={handleClick}
              id={id}
              anchorEl={anchorEl}
              handleCloseMenu={handleCloseMenu}
              setOpenWhats={setOpenWhats}
              open={open}
            />
            <div className="ctr_information__titleProspectContainer">
              <AttachMoney />
              <p className="ctr_information__titleProspect">Datos Venta</p>
            </div>
            <Grid container spacing={2} className="ctr_information__data">
              <Grid item xs={12} md={4}>
                <p className="label">Concepto</p>
                <p className="paragraph capitalize">{informationOportunities.concept}</p>
              </Grid>

              <Grid item xs={12} md={4}>
                <p className="label">Monto Total</p>
                <p className="paragraph">{formatNumber(informationOportunities.amount)}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <p className="label">Comisión Total</p>
                <p className="paragraph capitalize">{formatNumber(informationOportunities.comission)}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <p className="label">Num. Pagos</p>
                <p className="paragraph capitalize">{informationOportunities.payments}</p>
              </Grid>
            </Grid>
            <div className="divider" />

            <div className="ctr_information__ctr_targets">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className="title">
                    <Timeline className="icon" />
                    <p className="text">Productos Vendidos</p>
                  </div>
                  <ProductsOportunity products={products} />
                </Grid>
                <Grid item xs={8}>
                  <div className="title">
                    <Timeline className="icon" />
                    <p className="text">Pagos</p>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <p style={{ marginLeft: 12, marginTop: 7 }}>
                    {switchFilters ? "Filtros activados" : "Filtros desactivados"}
                  </p>
                </Grid>
                <Grid item xs={1}>
                  <Switch onChange={() => setswitchFilters(!switchFilters)} color="primary" />
                </Grid>
                {switchFilters && (
                  <Grid container>
                    <Grid item xs={3}>
                      <p style={{ marginLeft: 12, marginTop: 7 }}>
                        Mostrar los {switchPayments ? "pagados" : "no pagados"}
                      </p>
                    </Grid>
                    <Grid item xs={1}>
                      <Switch onChange={() => setSwitchPayments(!switchPayments)} color="primary" />
                    </Grid>
                    <Grid item xs={3}>
                      <p style={{ marginLeft: 12, marginTop: 7 }}>
                        Mostrar los {switchExpiredPayments ? "expirados" : "no expirados"}
                      </p>
                    </Grid>
                    <Grid item xs={1}>
                      <Switch onChange={() => setSwitchExpiredPayments(!switchExpiredPayments)} color="primary" />
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {payments.length > 0 && (
                <div className="ctr_grid">
                  {payments.slice(0, 6).map((item, index) =>
                    switchFilters ? (
                      switchPayments == item.ispaid &&
                      switchExpiredPayments == expiredDates(splitDate(item.date)) && (
                        <div key={index} style={{ padding: 5 }}>
                          <div className="target_payments">
                            <div className="top">
                              <div className="item">
                                <FiberManualRecord className="iconStatus" />
                                <p className="date capitalize">Pago: {index + 1}</p>
                              </div>
                              <div className="item">
                                <Today className="icon" />
                                <p className="date">{formatDate(item.date)}</p>
                              </div>
                            </div>
                            <span className="span">Estado Pago:</span>

                            {item.ispaid === true ? (
                              <p className="paymentTrue">Pagado</p>
                            ) : (
                              <p className="paymentFalse">Pendiente</p>
                            )}

                            <span className="span">Monto:</span>
                            <p>{formatNumber(item.payment)}</p>

                            <span className="span">Comisión:</span>
                            <p> {formatNumber(item.comission)}</p>

                            <span className="span">Observación:</span>
                            <p>{item.observations.slice(0, 80)}</p>

                            {item.ispaid === false ? (
                              <Button
                                onClick={() => pay(item)}
                                className="paymentButton"
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                                Marcar como pagado
                              </Button>
                            ) : (
                              <Button className="paymentButton" variant="contained" size="small" disabled>
                                Pagado
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      <div key={index} style={{ padding: 5 }}>
                        <div className="target_payments">
                          <div className="top">
                            <div className="item">
                              <FiberManualRecord className="iconStatus" />
                              <p className="date capitalize">Pago: {index + 1}</p>
                            </div>
                            <div className="item">
                              <Today className="icon" />
                              <p className="date">{formatDate(item.date)}</p>
                            </div>
                          </div>
                          <span className="span">Estado Pago:</span>

                          {item.ispaid === true ? (
                            <p className="paymentTrue">Pagado</p>
                          ) : (
                            <p className="paymentFalse">Pendiente</p>
                          )}

                          <span className="span">Monto:</span>
                          <p>{formatNumber(item.payment)}</p>

                          <span className="span">Comisión:</span>
                          <p> {formatNumber(item.comission)}</p>

                          <span className="span">Observación:</span>
                          <p>{item.observations.slice(0, 80)}</p>

                          {item.ispaid === false ? (
                            <Button
                              onClick={() => pay(item)}
                              className="paymentButton"
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Marcar como pagado
                            </Button>
                          ) : (
                            <Button className="paymentButton" variant="contained" size="small" disabled>
                              Pagado
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="divider" />
            <div className="ctr_information__ctr_targets">
              <div className="title">
                <Timeline className="icon" />
                <p onClick={() => handleClickProspect()} className="text">
                  Seguimientos
                </p>
                <Tooltip title="ver Pendientes">
                  <Launch className="redirec" onClick={() => handleClickProspect()} />
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
                        <p>{item.observations.slice(0, 80)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tracing_empty">
                  <img src="empty_tracking.svg" />
                  <Button variant="contained" className="btn_tracking" onClick={() => handleClickProspect()}>
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
                  <p className="text" onClick={() => handleClickProspect()}>
                    Pendientes
                  </p>
                  <Tooltip title="ver Pendientes">
                    <Launch className="redirec" onClick={() => handleClickProspect()} />
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
                    <img src="empty_tracking.svg" />
                    <Button variant="contained" className="btn_tracking" onClick={() => handleClickProspect()}>
                      Agregar pendiente
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}

      <FormWhatsapp
        idOportunity={idOportunity}
        isOportunity={false}
        isProspect={false}
        isClient={false}
        isSale={true}
        openWhats={openWhats}
        setOpenWhats={setOpenWhats}
        prospect={prospect}
        handleCloseMenu={handleCloseMenu}
        reloadDataCompletePending={flag}
        setReloadDataCompletePending={setFlag}
      />
    </DrawerStyled>
  );
};

export default DrawerSales;
const FiltersOrder = [
  { label: "Fecha de Pendiente", value: "date_from" },
  { label: "Fecha de Creación", value: "-createdAt" },
];
