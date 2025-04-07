import { Button, Drawer, LinearProgress, Grid, Link, Paper, Tooltip, AppBar, Tabs, Tab } from "@material-ui/core";
import {
  Assignment,
  AttachMoney,
  ErrorRounded,
  FiberManualRecord,
  Launch,
  Person,
  Timeline,
  Today,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import AlertGlobal from "../Alerts/AlertGlobal";
import { formatDate, formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../utils";
import ProspectData from "../ProspectData";
import { motion } from "framer-motion";
import { DivLine, DrawerStyled } from "./styles";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import FormWhatsapp from "../SendWhatsapp";
import Files from "../Files";
import ButtonClose from "../ButtonClose";
import { useDispatch } from "react-redux";
import { TabPanel } from "@material-ui/lab";
import useComments from "./hooks/useComments";

const DrawerClient = ({ ordersId, show, closeDrawer, prospectId, oportunityId }) => {
  const router = useRouter();
  const [load, setload] = useState(true);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospect, setProspect] = useState({});
  const [tracking, setTracking] = useState([]);
  const [infoOrders, setInfoOrders] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [newState, setNewState] = useState();
  const [openWhats, setOpenWhats] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { valueCommnet, handleOnChangeComment, handleOnSaveComment, handleOnSaveCommentAndTracking, isPosting } =
    useComments(infoOrders);

  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }
    return () => (mounted = false);
  }, [prospectId]);

  useEffect(() => {
    if (show) {
      getInitialDataOrders();
    }
  }, [ordersId]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getInitialDataOrders = async () => {
    try {
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let p = await api.get(`orders/${ordersId}?&include=${include}`);
      let results = p.data;
      results.prospectId = p.data.oportunity.prospectId;
      results.orderId = p.data.id;
      setInfoOrders(results);
    } catch (error) {
      console.log("e", error);
      handleGlobalAlert("error", "Pedido - Error al cargar los datos!", "basic", dispatch, 6000);
    }
  };
  const getInitialData = async () => {
    try {
      let queryTracking = {};
      setload(true);
      let include = "city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,channel,category";
      let p = await api.get(`prospects/${prospectId}?includ=${include}`);
      setProspect(p.data);
      queryTracking.prospectId = prospectId;
      let tracking = await api.get(`trackings?where=${JSON.stringify(queryTracking)}&order=-createdAt&include=phase`);
      setTracking(tracking.data.results);
      setload(false);
    } catch (error) {
      console.log(error);
      setload(false);
      handleGlobalAlert("error", "Error al cargar los datos de prospectos y seguimientos!", "basic", dispatch, 6000);
    }
  };

  const applyStatusStyle = status => {
    switch (status) {
      case "Pendiente de aprobación":
        return <p className="pending">{status}</p>;
      case "Rechazado":
        return <p className="rejected">{status}</p>;
      case "Aprobado":
        return <p className="ok">{status}</p>;
      default:
        return <p className="na">N/A</p>;
    }
  };

  const thereIsData = (data, custom) => {
    if (custom) return <p className={custom}>{data === "Pedido Nuevo" ? "Proceso no Iniciado" : data}</p>;
    if (data) {
      return <p className="paragraph">{data}</p>;
    } else {
      return <span>N/A</span>;
    }
  };
  const handleClickProspect = () => {
    router.push({
      pathname: "pedidos/pedido",
      query: {
        pe: ordersId,
        pr: prospectId,
        op: oportunityId,
      },
    });
  };

  const handleChange = newValue => {
    setTabIndex(newValue);
  };

  return (
    <>
      <DrawerStyled
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
            {/* <ButtonClose close={() => closeDrawer()} /> */}
            <div className="ctr_information">
              <div className="ctr_information__top">
                <p className="title">Pedido</p>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn_view"
                    onClick={() => {
                      router.push({
                        pathname: "/pedidos/pedido",
                        query: { pe: ordersId, pr: prospectId, op: oportunityId },
                      });
                    }}
                  >
                    Ver Pedido
                  </Button>
                </div>
              </div>
              <div className="divider" />
              <div className="ctr_information__ctr_targets">
                <Grid container spacing={1} className="ctr_information__data">
                  <Grid item xs={12}>
                    <div className="title" value="valor">
                      <Timeline className="icon" />
                      <p className="text">Datos de pedido</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className="label">Folio</p>
                    {infoOrders?.folio ? <p className="paragraph">{infoOrders?.folio}</p> : <span>N/A</span>}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className="label">Estado de Pedido</p>
                    {!newState ? applyStatusStyle(infoOrders?.orderstatus?.name) : applyStatusStyle(newState)}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className="label">Cuenta de Pago</p>
                    {thereIsData(toUpperCaseChart(infoOrders?.paymentaccount?.name))}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className="label">Estado Logística</p>
                    {thereIsData(toUpperCaseChart(infoOrders?.exitstatus), "exitstatus")}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <p className="label">Observaciones Generales</p>
                    {thereIsData(infoOrders?.observations)}
                  </Grid>
                </Grid>
                <div className="tabs">
                  <Button className={`bt_tab ${tabIndex === 0 && "active"}`} onClick={() => handleChange(0)}>
                    Información del Cliente
                  </Button>
                  <Button className={`bt_tab ${tabIndex === 1 && "active"}`} onClick={() => handleChange(1)}>
                    Datos de Venta
                  </Button>
                  <Button className={`bt_tab ${tabIndex === 2 && "active"}`} onClick={() => handleChange(2)}>
                    Seguimientos
                  </Button>
                  <Button className={`bt_tab ${tabIndex === 3 && "active"}`} onClick={() => handleChange(3)}>
                    Documentación
                  </Button>
                </div>
                <div className="render_content">
                  {tabIndex === 0 && (
                    <>
                      <Grid container spacing={1} className="ctr_information__data">
                        <ProspectData
                          title={true}
                          prospect={prospect}
                          handleClick={handleClick}
                          id={id}
                          anchorEl={anchorEl}
                          handleCloseMenu={handleCloseMenu}
                          open={open}
                          setOpenWhats={setOpenWhats}
                        />
                      </Grid>
                      <Grid container spacing={1} className="ctr_information__data">
                        <Grid item xs={12}>
                          <div className="title" value="valor">
                            <Timeline className="icon" />
                            <p className="text">Datos de envio</p>
                          </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <p className="label">Recibe</p>
                          {infoOrders?.receive ? <p className="paragraph">{infoOrders?.receive}</p> : <span>N/A</span>}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <p className="label">Telefono</p>
                          {infoOrders?.phone ? <p className="paragraph">{infoOrders?.phone}</p> : <span>N/A</span>}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <p className="label">Calle</p>
                          {infoOrders?.address?.street ? (
                            <p className="paragraph">{infoOrders?.address?.street}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <p className="label">Codigo Postal</p>
                          {infoOrders?.address?.postal?.postal_code ? (
                            <p className="paragraph">{infoOrders?.address?.postal?.postal_code}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <p className="label">Estado</p>
                          {infoOrders?.address?.entity?.name ? (
                            <p className="paragraph">{infoOrders?.address?.entity?.name}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <p className="label">Municipio</p>
                          {infoOrders?.address?.city?.name ? (
                            <p className="paragraph">{infoOrders?.address?.city?.name}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <p className="label">Referencias</p>
                          {infoOrders?.address?.references ? (
                            <p className="paragraph">{infoOrders?.address?.references}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} className="ctr_information__data">
                        <div className="title" value="valor">
                          <Timeline className="icon" />
                          <p className="text">Datos de facturación</p>
                        </div>
                        <Grid item xs={12} md={12}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <p className="label">Facturación</p>
                            {infoOrders?.billing ? (
                              <p className="paragraph">Si</p>
                            ) : (
                              <p className="paragraph">Sin Factura</p>
                            )}
                          </motion.div>
                        </Grid>
                        <Grid container spacing={1} className="ctr_information__data">
                          {viewMore && infoOrders?.billing == true ? (
                            <>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Razon Social</p>
                                  {thereIsData(infoOrders?.bill?.businessname)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">RFC</p>
                                  {thereIsData(infoOrders?.bill?.rfc)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">uso de CFDI</p>
                                  {thereIsData(infoOrders?.bill?.cfdi?.name)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Metodo de Pago</p>
                                  {thereIsData(infoOrders?.bill?.paymentmethod?.name)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Forma de Pago</p>
                                  {thereIsData(infoOrders?.bill?.paymentway?.name)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Telefono</p>
                                  {thereIsData(infoOrders?.bill?.phone)}
                                </motion.div>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Calle</p>
                                  {thereIsData(infoOrders?.bill?.address?.street)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Numero Interior</p>
                                  {thereIsData(infoOrders?.bill?.address?.int_number)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Numero Exterior</p>
                                  {thereIsData(infoOrders?.bill?.address?.ext_number)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Colonia</p>
                                  {thereIsData(infoOrders?.bill?.address?.settlement)}
                                </motion.div>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Codigo Postal</p>
                                  {thereIsData(infoOrders?.bill?.address?.postal?.postal_code)}
                                </motion.div>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Estado</p>
                                  {thereIsData(infoOrders?.bill?.address?.entity?.name)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <p className="label">Municipio</p>
                                  {thereIsData(infoOrders?.bill?.address?.city?.name)}
                                </motion.div>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Link className="link" onClick={() => setViewMore(false)}>
                                  Ver menos
                                </Link>
                              </Grid>
                            </>
                          ) : (
                            infoOrders?.billing == true && (
                              <Grid item xs={12} md={12}>
                                <Link className="link" onClick={() => setViewMore(true)}>
                                  Ver más información
                                </Link>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {tabIndex === 1 && (
                    <Grid container spacing={1} className="ctr_information__data">
                      <Grid item xs={12} md={12}>
                        <div className="title" value="valor">
                          <Timeline className="icon" />
                          <p className="text">Datos de venta</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <p className="label">Concepto</p>
                        <p className="paragraph capitalize">{infoOrders?.oportunity?.concept}</p>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <p className="label">Monto</p>
                        {formatNumber(infoOrders?.oportunity?.amount)}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <p className="label">Comisión</p>
                        {formatNumber(infoOrders?.oportunity?.comission)}
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <p className="label">Fecha de Venta</p>
                        {dayjs(infoOrders?.oportunity?.soldat).format("DD MMMM YYYY")}
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <p className="label ">Observaciones</p>
                        {infoOrders?.oportunity?.observations ? (
                          <p>{infoOrders?.oportunity?.observations.slice(0, 80)}</p>
                        ) : (
                          <p>N/A</p>
                        )}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <p className="label">Productos</p>
                        <Grid item xs={12} md={12}>
                          <div className="ctr_targetsProducts">
                            <div className="ctr_grid">
                              {infoOrders?.oportunity?.productsoportunities?.slice(0, 6).map((item, index) => (
                                <div key={index} style={{ padding: 5 }}>
                                  <div className="target_products">
                                    <div className="top">
                                      <div className="item">
                                        <FiberManualRecord className="icon" />
                                        <span className="span">Producto #{index + 1}:</span>
                                      </div>
                                    </div>
                                    <span className="span">Nombre:</span>
                                    <p> {item.product.name}</p>
                                    <span className="span">Precio:</span>
                                    <p className="date">
                                      <NumberFormat
                                        value={item.product.callamount}
                                        displayType="text"
                                        thousandSeparator=","
                                        prefix="$"
                                        className="info"
                                      />
                                    </p>

                                    <span className="span">Cantidad:</span>
                                    <p className="date">
                                      <NumberFormat
                                        value={item.quantity}
                                        displayType="text"
                                        thousandSeparator=","
                                        className="info"
                                      />
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {tabIndex === 2 && (
                    <Grid container className="ctr_information__data">
                      <div className="ctr_information__ctr_targets">
                        <div className="title" value="valor">
                          <Timeline className="icon" />

                          <p className="text">Datos de seguimientos</p>
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

                        <div className="containertext">
                          <div className="headercontainertracking">
                            <p className="subtitle">Agregar Comentario</p>
                          </div>
                          <textarea
                            value={valueCommnet}
                            onChange={handleOnChangeComment}
                            className="textareatrackings"
                            name="trackings"
                            id="trackings"
                          ></textarea>
                          <div className="line"></div>
                          <div className="actionscontainertracking">
                            <button
                              onClick={handleOnSaveComment}
                              disabled={valueCommnet.length < 4 || isPosting}
                              className={`${valueCommnet.length >= 4 || isPosting ? "active" : "disablebutton"} `}
                            >
                              Publicar
                            </button>
                            <button
                              onClick={handleOnSaveCommentAndTracking}
                              disabled={valueCommnet.length < 4 || isPosting}
                              className={`${valueCommnet.length >= 4 || isPosting ? "active" : "disablebutton"}`}
                            >
                              {" "}
                              Guardar comentario y como seguimiento{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  )}

                  {tabIndex === 3 && (
                    <Grid container className="ctr_information__data">
                      <Grid item xs={12} md={12}>
                        <Files filesFrom={"order"} data={infoOrders} />
                      </Grid>
                    </Grid>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DrawerStyled>

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </>
  );
};

export default DrawerClient;
