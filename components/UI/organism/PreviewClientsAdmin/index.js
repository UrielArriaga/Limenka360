import { Button, Drawer, LinearProgress, Tooltip, CircularProgress } from "@material-ui/core";
import { AddAlert, FiberManualRecord, Launch, PersonPinCircle, PostAdd, Timeline, Today } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { formatDate, formatHour, formatLink, formatNumber } from "../../../../utils";
import FormWhatsapp from "../../../SendWhatsapp";
import ProspectData from "../../../ProspectData";
import CompletePending from "../../../ModalCompletePendings";
import ModalReasigned from "../../../ModalReasigned";
import ShowMoreProducts from "../../../ShowMoreProducts";

import ReasignedAdminS from "../../atoms/ReasignModalAdminSales";

const DrawerClientAdminSales = ({
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
}) => {
  const router = useRouter();
  const { id_user, roleId } = useSelector(userSelector);
  const [load, setload] = useState(true);
  const [openWhats, setOpenWhats] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospect, setProspect] = useState({});
  const [tracking, setTracking] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [sales, setSales] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loaderBack, setLoaderBack] = useState(false);
  const [reloadDataCompletePending, setReloadDataCompletePending] = useState(false);
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [pendingToComplete, setPendingToComplete] = useState({});
  const [openConfirmPending, setOpenConfirmPending] = useState(false);
  const handleCloseConfirmPending = () => setOpenConfirmPending(false);
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }
    return () => (mounted = false);
  }, [prospectId, flag, reloadDataCompletePending]);

  //petición para pendientes sin el loader(cargando) 10/11/2022
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getPendings();
    }
    return () => (mounted = false);
  }, [prospectId, refetch, reloadDataCompletePending]);

  useEffect(() => {
    getPaymnetsByOportunity();
  }, [oportunityId]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (openReasign === false) setProspectDataReasign(prospect);
  }, [prospectDataReasign]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getInitialData = async () => {
    try {
      let queryTracking = {};

      setload(true);
      let include =
        "city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,channel,category,prospectslabels,prospectslabels.label";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
      setProspect(p.data);
      setProspectDataReasign(p.data);
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

  const getPaymnetsByOportunity = async () => {
    if (!prospectId && isOportunity) return;
    try {
      let query = {};
      query.prospectId = prospectId;
      query.iscloseout = true;
      query.discarted = false;
      query["prospect"] = {
        isclient: true,
      };

      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "prospect",
        order: "-createdAt",
        showproducts: 1,
      };
      let payment = await api.get("oportunities", { params });
      let salese = payment.data?.results;
      setSales(salese);
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

  const handlePendingsComplete = async slope => {
    setPendingToComplete(slope);
    setOpenConfirmPending(true);
  };

  const handleSelectOrderPendigns = e => {
    let order = FiltersOrder.filter(item => item.value == e.target.value);
    setOrderPendigs({ label: order[0].label, value: order[0].value });
    setRefetch(!refetch);
  };
  const handleClickProspect = scrollTo => {
    router.push({
      pathname: "clientes/[cliente]",
      query: { cliente: prospect.id, scrollTo: scrollTo },
    });
  };

  const handleClickIdOportunity = item => {
    router.push({
      pathname: "/pedidos/nuevo",
      query: { o: item.id, p: item.prospectId },
    });
  };

  const handleAddTraking = () => {
    // handleClickAddTracking(prospect);
    // closeDrawer();

    if (handleClickAddTracking) {
      handleClickAddTracking(prospect);
      closeDrawer();
    } else {
      handleClickProspect("seguimientos");
    }
  };

  const handleAddPending = () => {
    if (handleClickAddPending) {
      handleClickAddPending(prospect);
      closeDrawer();
    } else {
      handleClickProspect("pendientes");
    }
  };

  return (
    <>
      <DrawerStyled
        anchor="right"
        open={show}
        onClose={() => {
          // setProspect({});
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
          <div className="ctr_information">
            <div className="ctr_information__top">
              <p className="title">Cliente</p>
              <div>
                {roleId !== "ejecutivo" && (
                  <>
                    {prospect.discarted === false && (
                      <Button
                        variant="contained"
                        color="secondary"
                        className="btn_reasign"
                        onClick={() => setOpenReasign(true)}
                      >
                        Reasignar
                      </Button>
                    )}
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_view"
                  onClick={() => {
                    router.push({
                      pathname: "clientes/[cliente]",
                      query: { cliente: prospect.id },
                    });
                  }}
                >
                  Ver Cliente Completo
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

            <div className="ctr_information__ctr_targets">
              {sales.length > 0 && (
                <>
                  <div className="title">
                    <Timeline className="icon" />
                    <p onClick={() => console.log(sales)} className="text">
                      Ventas Realizadas
                    </p>
                    <Tooltip title="ver Ventas">
                      <Launch className="redirec" onClick={() => handleClickProspect("ventas")} />
                    </Tooltip>
                  </div>

                  <div className="ctr_grid">
                    {sales.slice(0, 6).map((item, index) => (
                      <div key={index} style={{ padding: 5 }}>
                        <div className="target_sales">
                          <div className="top">
                            <div className="item">
                              <FiberManualRecord className="iconStatus" />
                              <p className="date capitalize">Venta #{index + 1}</p>
                            </div>
                            <div className="item">
                              <Today className="icon" />
                              <p className="date">{formatDate(item.soldat)}</p>
                            </div>
                          </div>
                          <div className="grid2">
                            <div>
                              <span className="span">Concepto:</span>
                              <p> {item.concept}</p>
                            </div>
                            <div>
                              <span className="span">Monto:</span>
                              <p> {formatNumber(item.amount)}</p>
                            </div>
                          </div>
                          <ShowMoreProducts productsoportunities={item?.productsoportunities} />
                          <span className="span">Observación:</span>
                          <br />
                          {item.observations ? <p>{item.observations.slice(0, 80)}</p> : <p>N/A</p>}
                          {/* {item.isorder == false ? (
                            <Button
                              onClick={() => handleClickIdOportunity(item)}
                              className="OrderButton"
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Realizar Pedido
                            </Button>
                          ) : (
                            <Button className="OrderButton" variant="contained" color="primary" size="small" disabled>
                              Realizar Pedido
                            </Button>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="divider" />
            <div className="ctr_information__ctr_targets">
              <div className="title">
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
                        <p>{item.observations.slice(0, 80)}</p>
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

            {/* <div className="ctr_information__ctr_targets">
              <div className="title">
                <Timeline className="icon" />
                <p className="text">Pendientes</p>
              </div>
              {pendings.length > 0 ? (
                <div className="ctr_grid">
                  {pendings.slice(0, 6).map((item, index) => (
                    <div key={index} style={{ padding: 5 }}>
                      <div className="target_pendings">
                        <div className="top">
                          <div className="item">
                            <PersonPinCircle className="icon" />
                            <p className="date">{item?.place.length > 30 ? `${item?.place.slice(0, 30)}...` : item?.place}</p>
                          </div>
                          <div className="item">
                            <Today className="icon" />
                            <p className="date">{formatDate(item?.createdAt)}</p>
                          </div>
                        </div>
                        <span className="span">Asunto</span>
                        <p>{item?.subject.length > 40 ? `${item?.subject.slice(0, 40)}...` : item?.subject}</p>
                        <span className="span">Observación</span>
                        <p>{item?.description.slice(0, 80)}</p>
                        <span className="span">Fecha del pendiente</span>
                        <p className="time">{`${formatDate(item?.date_from)} a las ${formatHour(item?.date_from)}`}</p>
                        {item?.date_to && (
                          <>
                            <span className="span">Hasta</span>
                            <p className="time">{`${formatDate(item?.date_to)} a las ${formatHour(item?.date_top)}`}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tracing_empty">
                  <img src="empty_tracking.svg" />
                  <Button
                    variant="contained"
                    className="btn_tracking"
                    onClick={() => {
                      router.push({ pathname: "clientes/[prospecto]", query: { prospecto: prospect.id } });
                    }}
                  >
                    Agregar pendiente
                  </Button>
                </div>
              )}
            </div> */}
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
      </DrawerStyled>
      <FormWhatsapp
        openWhats={openWhats}
        setOpenWhats={setOpenWhats}
        prospect={prospect}
        isClient={true}
        isProspect={false}
        isOportunity={false}
        handleCloseMenu={handleCloseMenu}
      />
      <CompletePending
        pending={pendingToComplete}
        open={openConfirmPending}
        close={handleCloseConfirmPending}
        handleAlert={handleAlert}
        refetch={refetch}
        setRefetch={setRefetch}
      />

      <ReasignedAdminS
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
};

export default DrawerClientAdminSales;

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
      .light {
        color: #2979ff;
      }
      .whatsApp {
        cursor: pointer;
      }
      .capitalize {
        text-transform: capitalize;
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
        height: 245px;
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

      .target_sales {
        padding: 10px;
        height: 230px;
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
        .paymentTrue {
          color: green;
        }
        .paymentFalse {
          color: red;
        }
        span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
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
            .iconStatus {
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
        .OrderButton {
          position: absolute;
          width: 300px;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;

          margin-top: 22px;
        }
        .grid2 {
          display: grid;
          grid-template-columns: auto auto;
        }
      }
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
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

const DivLine = styled.div`
  background-color: #303f9f;
  height: 0.5px;
  width: 100%;
`;
const FiltersOrder = [
  { label: "Fecha de Pendiente", value: "date_from" },
  { label: "Fecha de Creación", value: "-createdAt" },
];
