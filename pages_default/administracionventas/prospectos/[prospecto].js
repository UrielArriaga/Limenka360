import { Button, Grid, LinearProgress, Tooltip, Menu, MenuItem, Popover, Divider, Modal } from "@material-ui/core";
import {
  AssignmentInd,
  AttachMoney,
  Edit,
  MailOutline,
  WhatsApp,
  Person,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneIphone,
  Room,
  WorkOutline,
  NavigateNext,
  Settings,
  TransferWithinAStation,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import TableTracing from "../../../components/TableTracing";
import TableSlopes from "../../../components/TableSlopes";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import SideBar from "../../../components/SideBar";
import dayjs from "dayjs";
import { months } from "../../../BD/databd";
import DrawerEditProspect from "../../../components/EditProspect";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { motion } from "framer-motion";
import { formatLink, toUpperCaseChart } from "../../../utils";
import ModalDiscardProspect from "../../../components/ModalDiscardProspect";
import ModalTracking from "../../../components/ModalTracking";
import ReturnButton from "../../../components/ReturnButton";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import ModalReasigned from "../../../components/ModalReasigned";
import WhatsappV2 from "../../../components/WhatsappV2";
import ReasignedAdminS from "../../../components/UI/atoms/ReasignModalAdminSales";
import MainLayout from "../../../components/MainLayout";
const Prospecto = () => {
  const router = useRouter();
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const [prospect, setProspect] = useState({});
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [isLoading, setIsLoading] = useState([]);
  const [openWhats, setOpenWhats] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const [flag, setFlag] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { prospecto, scrollTo } = router.query;
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [flag, prospecto]);

  useEffect(() => {
    const scroll = () => {
      const element = document.getElementById(router.query.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scroll();
  }, []);

  useEffect(() => {
    if (openReasign === false) setProspectDataReasign(prospect);
  }, [prospectDataReasign]);

  const getDataInitial = async () => {
    try {
      setIsLoading(true);
      let Prospect = await api.get(
        `prospects/${prospecto}?include=category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,ejecutive,ejecutive.group,prospectslabels,prospectslabels.label`
      );
      setProspect(Prospect.data);
      setProspectDataReasign(Prospect.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(str) {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    return `${month[0]} ${day}, ${year}`;
  }

  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = () => {
    setprospectEdit(prospect);
    console.log("datos del prospecto", prospect);
    setOpenEdit(!openEdit);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const [showAll, setShowAll] = useState(false);

  return (
    <MainLayout>
      <ProspectoStyled>
        {/* <SideBar />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="ctr_prospecto">
            <ReturnButton text={"Prospecto"} />
            {!isLoading && (
              <div className="ctr_prospecto__info">
                <div className="ctr_prospecto__info__ctr_title">
                  <div className="ctr_prospecto__info__ctr_title__title">
                    <PersonOutlineOutlined />
                    <p>Datos del Prospecto</p>
                  </div>

                  <Edit className="ctr_prospecto__info__ctr_title__edit" onClick={() => handleEdit()} />
                </div>
                <Grid container spacing={2} className="ctr_prospecto__info__data">
                  <Grid item xs={12} md={4}>
                    <p className="label">Nombre</p>
                    <p className="primary_paragraph capitalize">
                      <PersonOutline />
                      {`${prospect?.name} ${prospect?.lastname}`}
                    </p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Correo</p>
                    <p className="primary_paragraph">
                      <MailOutline />
                      {prospect?.email}
                    </p>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <p className="label">Movil</p>
                    {prospect?.phone && (
                      <Tooltip title="Acciones" arrow>
                        <p className="primary_paragraph sendMessage" onClick={handleClick}>
                          <PhoneIphone />
                          {prospect?.phone}
                        </p>
                      </Tooltip>
                    )}

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "center",
                        horizontal: "right",
                      }}
                    >
                      {prospect?.phone && (
                        <MenuWhats>
                          <div className="headerMenu">
                            <p className="titleMenu">Acciones</p>
                            <Settings className="headerMenu__icon" />
                          </div>
                          <Divider />

                          <div onClick={() => setOpenWhats(true)} className="menuItem">
                            <WhatsApp className="menuItem__icon" />
                            <p className="menuItem__title">Enviar WhatsApp</p>
                            <NavigateNext className="iconArrow" />
                          </div>
                        </MenuWhats>
                      )}
                    </Popover>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <p className="label">Teléfono</p>
                    {prospect?.optionalphone ? (
                      <p className="primary_paragraph">
                        <Phone />
                        {prospect?.optionalphone}
                      </p>
                    ) : (
                      <span>N/A</span>
                    )}
                  </Grid>
                  {showAll && (
                    <Grid item xs={12} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <p className="label ">Código postal</p>
                        {prospect?.postalId ? (
                          <p className="paragraph capitalize">{prospect?.postal?.postal_code}</p>
                        ) : (
                          <span>N/A</span>
                        )}
                      </motion.div>
                    </Grid>
                  )}
                  <Grid item xs={12} md={4}>
                    <p className="label">Estado</p>
                    <p className="primary_paragraph">
                      <Room /> {prospect?.entity?.name}
                    </p>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <p className="label">Ciudad / Municipio</p>
                    {prospect?.city ? (
                      <p className="primary_paragraph">
                        <Room /> {prospect?.city?.name}
                      </p>
                    ) : (
                      <span>N/A</span>
                    )}
                  </Grid>
                  {showAll && (
                    <>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label ">Calle</p>
                          {prospect?.street ? (
                            <p className="paragraph capitalize">{prospect?.street}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label ">Colonia</p>
                          {prospect?.postalId ? (
                            <p className="paragraph capitalize">{prospect?.postal?.settlement}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label ">Empresa</p>
                          {prospect?.clientcompany ? (
                            <p className="paragraph capitalize">{prospect?.clientcompany?.companyname}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Origen</p>
                          {prospect?.origin ? (
                            <p className="paragraph capitalize">{prospect?.origin?.name}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Fase</p>
                          {prospect?.phase ? (
                            <p className="paragraph capitalize">{prospect?.phase?.name}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      {/*21/20/2022 se añadio categoria de interes */}
                      <Grid item xs={12} md={2}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Categoría de Interés</p>
                          {prospect?.category?.name ? (
                            <p className="paragraph capitalize">{prospect?.category?.name.toLocaleLowerCase()}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} md={2}>
                    <p className="label">Tipo de Cliente</p>
                    {prospect?.clienttype ? (
                      <p className="primary_paragraph capitalize">
                        <AssignmentInd />
                        {prospect?.clienttype?.name}
                      </p>
                    ) : (
                      <span>N/A</span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <p className="label">Web</p>
                      {prospect?.url ? <p className="paragraph">{formatLink(prospect?.url)}</p> : <span>N/A</span>}
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <p className="label">Facebook</p>
                      {prospect?.facebook ? (
                        <p className="paragraph">{formatLink(prospect?.facebook)}</p>
                      ) : (
                        <span>N/A</span>
                      )}
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <p className="label">Google Maps</p>
                      {prospect?.location ? (
                        <p className="paragraph">{formatLink(prospect?.location)}</p>
                      ) : (
                        <span>N/A</span>
                      )}
                    </motion.div>
                  </Grid>
                  {showAll && (
                    <>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Género</p>
                          {prospect?.gender ? (
                            <p className="paragraph capitalize">{prospect?.gender}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Especialidad</p>
                          {prospect?.specialtyId ? (
                            <p className="primary_paragraph">
                              <WorkOutline />
                              {prospect?.specialty?.name}
                            </p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Fecha de creación</p>
                          <p className="paragraph">{formatDate(prospect?.createdAt)}</p>
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Ultima actualización</p>
                          <p className="paragraph">{formatDate(prospect?.updatedAt)}</p>
                        </motion.div>
                      </Grid>
                      {roleId !== "ejecutivo" && (
                        <Grid item xs={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <p className="label">Asignado a</p>
                            <p className="paragraph">Nombre: {prospect?.ejecutive?.fullname}</p>
                            <p className="paragraph">Grupo: {prospect?.ejecutive?.group?.name}</p>
                          </motion.div>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Etiquetas</p>
                          {prospect?.prospectslabels ? (
                            <p className="paragraph">
                              {prospect?.prospectslabels.map(item => item.label.label).join()}
                            </p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={12}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Observaciones</p>
                          {prospect?.product ? (
                            <p className="paragraph capitalize">{prospect?.observations}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <div className="oportunity">
                      <p onClick={() => setShowAll(!showAll)} className="view">
                        {showAll ? " Ocultar datos" : "Ver mas"}
                      </p>
                      <div>
                        {roleId !== "ejecutivo" && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenReasign(true)}
                            className="bt_reasign"
                            disabled={prospect.discarted}
                          >
                            <TransferWithinAStation />
                            <p>Reasignar</p>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <div className="divider" />

                <div id="seguimientos">
                  <TableTracing
                    scrollTo={router.query.scrollTo === "seguimientos"}
                    footer={true}
                    prospect={prospect}
                    handleAlert={handleAlert}
                    isProspectoFlag={true}
                    setAlert={setAlert}
                    setFlag={() => setFlag(!flag)}
                  />
                </div>

                <div className="divider" />

                <div id="pendientes">
                  <TableSlopes
                    scrollTo={router.query.scrollTo === "pendientes"}
                    footer={true}
                    prospect={prospect}
                    handleAlert={handleAlert}
                    isProspecto={true}
                    setAlert={setAlert}
                    setFlag={() => setFlag(!flag)}
                  />
                </div>

                <ModalDiscardProspect
                  name={`${prospect?.name} ${prospect?.lastname}`}
                  email={prospect?.email}
                  id={prospect?.id}
                  handleAlert={handleAlert}
                  discarted={prospect.discarted}
                />
              </div>
            )}
            {isLoading && (
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
          </div>
        </div>
        <WhatsappV2
          openWhats={openWhats}
          setOpenWhats={setOpenWhats}
          prospect={prospect}
          handleCloseMenu={handleCloseMenu}
          isOportunity={false}
          isClient={false}
          isProspect={true}
          flag={flag}
          setFlag={setFlag}
        />
        <DrawerEditProspect
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          prospectEdit={prospectEdit}
          setFlag={() => setFlag(!flag)}
        />
        <ReasignedAdminS
          Prospect={prospectDataReasign}
          setProspect={setProspectDataReasign}
          open={openReasign}
          setopen={setOpenReasign}
          flag={flag}
          setFlag={setFlag}
        />
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </ProspectoStyled>
    </MainLayout>
  );
};

export default Prospecto;

const ProspectoStyled = styled.div`
  * {
    margin: 0;
  }
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  .main {
    /* width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px; */
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ctr_prospecto {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 0.04em;
      margin-bottom: 15px;
    }
    &__info {
      width: 100%;
      &__ctr_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__title {
          display: flex;
          align-items: center;
          svg {
            width: 30px;
            height: 30px;
            padding: 5px;
            margin-right: 5px;
            background: #dce1f6;
            color: #0c203b;
            border-radius: 50%;
          }
          p {
            font-size: 18px;
            letter-spacing: 0.04em;
            font-weight: 600;
          }
        }
        &__edit {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #103c82;
          color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      &__data {
        margin-bottom: 10px;
        transition: all 0.5s ease;
        .label {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: bold;
          color: #4f4f4f;
          margin-bottom: 2px;
          height: 32px;
          svg {
            color: #103c82;
          }
        }
        .paragraph {
          font-size: 16px;
          padding: 0 10px;
          font-weight: 500;
        }
        .primary_paragraph {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          /* padding: 0 10px; */
          svg {
            font-size: 25px;
            color: #66b271;
          }
        }
        .sendMessage {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .capitalize {
          text-transform: capitalize;
        }
        span {
          color: #d1d1d1;
          font-size: 12px;
          font-weight: 500;
        }
        .oportunity {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          button {
            p {
              font-size: 14px;
              text-transform: capitalize;
              color: #fff;
            }
          }
          .bt_reasign {
            margin-right: 10px;
          }

          .view {
            font-size: 14px;
            color: #82b1ff;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 1.5px solid #f3f3f3;
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(100vh - 200px);
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
