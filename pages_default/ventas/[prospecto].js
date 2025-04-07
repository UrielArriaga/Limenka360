import { Button, Dialog, Divider, Grid, LinearProgress, Popover, Tooltip } from "@material-ui/core";
import {
  AssignmentInd,
  AttachMoney,
  Edit,
  LabelImportant,
  MailOutline,
  Money,
  NavigateNext,
  Person,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneIphone,
  Room,
  Settings,
  WhatsApp,
  WorkOutline,
} from "@material-ui/icons";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import NavBarDashboard from "../../components/NavBarDashboard";
import TableTracing from "../../components/TableTracing";
import TableSlopes from "../../components/TableSlopes";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import SideBar from "../../components/SideBar";
import DrawerEditProspect from "../../components/EditProspect";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import { motion } from "framer-motion";
import RelatedContacts from "../../components/TableContact";
import { formatDate, formatLink, formatNumber } from "../../utils";
import { colors } from "../../styles/global.styles";
import DrawerPreviewQuote from "../../components/DrawerPreviewQuote";
import { dialogSelector } from "../../redux/slices/dialogSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import LoaderPage from "../../components/LoaderPage";
import useValidateLogin from "../../hooks/useValidateLogin";
import FormWhatsapp from "../../components/SendWhatsapp";
import TableSalesPayments from "../../components/TableSalesPayments";
import ReturnButton from "../../components/ReturnButton";
import MainLayout from "../../components/MainLayout";
const Prospecto = () => {
  const router = useRouter();
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const { isLogged_User } = useSelector(userSelector);
  const { openMenuSide } = useSelector(dialogSelector);
  const [openWhats, setOpenWhats] = useState(false);
  const [prospect, setProspect] = useState({});
  const [oportunity, setOportunity] = useState({});
  const [isLoading, setIsLoading] = useState([]);
  const [flag, setFlag] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const { prospecto } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial(mounted);
    }
    return () => (mounted = false);
  }, [flag, prospecto]);

  useEffect(() => {
    getOportunitiesByProspect();
  }, [isLogged_User]);

  const getDataInitial = async () => {
    if (!prospecto) return;
    try {
      setIsLoading(true);
      let includes =
        "category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label";
      let Prospect = await api.get(`prospects/${prospecto}?include=${includes}`);
      setProspect(Prospect.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getOportunitiesByProspect = async () => {
    if (!isLogged_User) return;
    try {
      let query = {};
      query.iscloseout = true;
      query["prospect"] = {
        isclient: true,
      };
      let oportuntiesResponse = await api.get(
        `oportunities/${router.query.o}?where=${JSON.stringify(query)}&include=phase`
      );
      setOportunity(oportuntiesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setprospectEdit(prospect);
    setOpenEdit(!openEdit);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <ProspectoStyled isOpen={openMenuSide}>
        {/* <SideBar />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="ctr_prospecto">
            <ReturnButton text={"Venta"} />
            {!isLoading && (
              <div className="ctr_prospecto__info">
                <div className="ctr_prospecto__info__ctr_title">
                  <div className="ctr_prospecto__info__ctr_title__title">
                    <AttachMoney />
                    <p onClick={() => console.log("datos", oportunity)}>Datos de Venta</p>
                  </div>
                </div>
                <Grid container spacing={2} className="ctr_prospecto__info__data">
                  <Grid item xs={12} md={4}>
                    <p className="label">Concepto</p>
                    <p className="primary_paragraph capitalize">{oportunity.concept}</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Monto Total</p>
                    <p className="primary_paragraph">{formatNumber(oportunity.amount)}</p>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <p className="label">Comision Total</p>

                    <p className="primary_paragraph">{formatNumber(oportunity.comission)}</p>
                  </Grid>
                </Grid>
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
                  <Grid className="griditem-menu" item xs={12} md={2}>
                    <p className="label">Movil</p>
                    <Tooltip title="Acciones" arrow>
                      <p className="primary_paragraph sendMessage" onClick={handleClick}>
                        <PhoneIphone />
                        {prospect?.phone}
                      </p>
                    </Tooltip>
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
                        <p className="label ">Codigo postal</p>
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
                            <p className="paragraph capitalize">{prospect?.clientcompany?.company}</p>
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
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Web</p>
                          {prospect?.url ? (
                            <p className="paragraph">
                              <a target={"_blank"} without="true" rel="noreferrer" href={prospect?.url}>
                                {prospect?.url}
                              </a>
                            </p>
                          ) : (
                            <span>N/A</span>
                          )}
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
                      <Grid item xs={12}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Etiquetas</p>
                          {prospect?.prospectslabels ? (
                            <p className="paragraph capitalize">
                              {prospect.prospectslabels.map(item => item.label.label).join(", ")}
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
                    </div>
                  </Grid>
                </Grid>

                <div className="divider" />
                <TableSalesPayments
                  footer={true}
                  prospect={prospect}
                  oportunity={oportunity}
                  handleAlert={handleAlert}
                  setAlert={setAlert}
                  setFlag={() => setFlag(!flag)}
                />
                <div className="divider" />
                <TableTracing
                  footer={true}
                  prospect={prospect}
                  handleAlert={handleAlert}
                  setAlert={setAlert}
                  setFlag={() => setFlag(!flag)}
                />
                <div className="divider" />
                <TableSlopes
                  footer={true}
                  prospect={prospect}
                  handleAlert={handleAlert}
                  setAlert={setAlert}
                  setFlag={() => setFlag(!flag)}
                />
                <div className="divider" />
                <RelatedContacts prospect={prospect} />
                <FormWhatsapp
                  openWhats={openWhats}
                  setOpenWhats={setOpenWhats}
                  prospect={prospect}
                  handleCloseMenu={handleCloseMenu}
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

        <DrawerEditProspect
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          prospectEdit={prospectEdit}
          setFlag={() => setFlag(!flag)}
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
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .griditem-menu {
    position: relative;
  }

  .griditem-menuchiquito {
    padding: 5px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: 100%;
    width: 150px;
    position: absolute;
    top: 0;
    right: -50%;
    transition: all 3s ease-in-out;
    .item {
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: red;
      }
    }
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
            color: ${colors.iconColor};
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
