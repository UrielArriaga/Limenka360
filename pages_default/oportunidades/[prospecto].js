import { Button, Dialog, Divider, Grid, LinearProgress, Popover, Tooltip } from "@material-ui/core";
import {
  AssignmentInd,
  AttachMoney,
  Edit,
  MailOutline,
  NavigateNext,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneIphone,
  Room,
  Settings,
  TransferWithinAStation,
  WhatsApp,
  WorkOutline,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import DrawerPreviewQuote from "../../components/DrawerPreviewQuote";
import DrawerEditProspect from "../../components/EditProspect";
import RelatedContacts from "../../components/TableContact";
import TableSlopes from "../../components/TableSlopes";
import TableTracing from "../../components/TableTracing";
import { api } from "../../services/api";
import { colors } from "../../styles/global.styles";
import { formatDate, formatNumber } from "../../utils";
import { useSelector } from "react-redux";
import LoaderPage from "../../components/LoaderPage";
import MainLayout from "../../components/MainLayout";
import ModalDiscardQuotation from "../../components/ModalDiscardQuotation";
import ModalReasigned from "../../components/ModalReasigned";
import ReturnButton from "../../components/ReturnButton";
import TableQuotes from "../../components/TableQuotes";
import WhatsappV2 from "../../components/WhatsappV2";
import useValidateLogin from "../../hooks/useValidateLogin";
import { dialogSelector } from "../../redux/slices/dialogSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { formatLink } from "../../utils";

const Prospecto = () => {
  const router = useRouter();
  const { isLoadingPage } = useValidateLogin([
    "gerente",
    "ejecutivo",
    "Admin_compañia",
    "admin",
    "administrador_de_ventas",
  ]);
  const { isLogged_User, roleId } = useSelector(userSelector);
  const { openMenuSide } = useSelector(dialogSelector);
  const [openWhats, setOpenWhats] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const [prospect, setProspect] = useState({});
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [oportunities, setoportunities] = useState([]);
  const [oportunitiesTable, setOportunitiesTable] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [flag, setFlag] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const { prospecto, cve } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [idOportunity, setidOportunity] = useState();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // OportunityStates
  const [openPreviewQuote, setOpenPreviewQuote] = useState(false);
  const [oportunitySelect, setOportunitySelect] = useState(undefined);

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

  useEffect(() => {
    if (openReasign === false) setProspectDataReasign(prospect);
  }, [prospectDataReasign]);

  const getDataInitial = async () => {
    if (!prospecto) return;
    try {
      setIsLoading(true);
      {
        /*21/10/2022 se añadio categoria de interes*/
      }
      let Prospect = await api.get(
        `prospects/${prospecto}?include=category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel`
      );
      setProspect(Prospect.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const scroll = () => {
      const element = document.getElementById(router.query.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scroll();
  }, []);

  const getOportunitiesByProspect = async () => {
    if (!isLogged_User) return;

    try {
      let query = {
        prospectId: prospecto,
      };
      let oportuntiesResponse = await api.get(`oportunities?where=${JSON.stringify(query)}&include=phase`);
      setoportunities(oportuntiesResponse.data?.results);
      setidOportunity(oportuntiesResponse.data?.results[0].id);
      let oportunitiesNormalize = oportuntiesResponse?.data?.results.map((item, index) => ({
        concepto: item.concept,
        quantity: item.quantity,
        comission: formatNumber(item.comission),
        total: formatNumber(item.amount),
        estimatedClosingDate: formatDate(item.estimatedclossing),
      }));

      setOportunitiesTable(oportunitiesNormalize);
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

  const handleClickQuote = item => {
    setOportunitySelect(item);
    setOpenPreviewQuote(true);
  };
  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <ProspectoStyled isOpen={openMenuSide}>
        {/* {cve == "0111" ? <SideBarCustomExecutive /> : <SideBar />} */}
        {/* <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="ctr_prospecto">
            <ReturnButton text={"Oportunidad"} />
            {!isLoading && (
              <div className="ctr_prospecto__info">
                <div className="ctr_prospecto__info__ctr_title">
                  <div className="ctr_prospecto__info__ctr_title__title">
                    <PersonOutlineOutlined />
                    <p>Datos de la oportunidad</p>
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
                      {/*21/10/2022 se añadio categoria de interes*/}
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
                          <p className="label">Genero</p>
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
                      <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          <p className="label">Canal</p>
                          {prospect?.channel ? (
                            <p className="paragraph capitalize">{prospect?.channel?.name}</p>
                          ) : (
                            <span>N/A</span>
                          )}
                        </motion.div>
                      </Grid>
                      <Grid item xs={8}>
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
                            onClick={() => {
                              setProspectDataReasign(prospect);
                              setOpenReasign(true);
                            }}
                            className="bt_reasign"
                          >
                            <TransferWithinAStation />
                            <p>Reasignar</p>
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setShowQuotes(!showQuotes);
                            return;
                          }}
                        >
                          <AttachMoney />
                          <p>Convertir a venta</p>
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <div className="divider" />
                <TableQuotes
                  handleClickQuote={handleClickQuote}
                  footer={true}
                  prospect={prospect}
                  handleAlert={handleAlert}
                  setAlert={setAlert}
                  setFlag={() => setFlag(!flag)}
                />

                <div className="divider" />
                {/* <SectionQuotes oportunitiesTable={oportunitiesTable} products={[]} /> */}
                <WhatsappV2
                  idOportunity={idOportunity}
                  isOportunity={true}
                  isClient={false}
                  isProspect={false}
                  flag={flag}
                  setFlag={setFlag}
                  openWhats={openWhats}
                  setOpenWhats={setOpenWhats}
                  prospect={prospect}
                  handleCloseMenu={handleCloseMenu}
                />
                {/* <div id="cotizaciones">
                  <TablePayments
                    scrollTo={router.query.scrollTo === "cotizaciones"}
                    handleClickQuote={handleClickQuote}
                    footer={true}
                    prospect={prospect}
                    handleAlert={handleAlert}
                    setAlert={setAlert}
                    setFlag={() => setFlag(!flag)}
                  />
                </div>

                <div className="divider" /> */}

                <div id="seguimientos">
                  <TableTracing
                    scrollTo={router.query.scrollTo === "seguimientos"}
                    footer={true}
                    prospect={prospect}
                    handleAlert={handleAlert}
                    setAlert={setAlert}
                    trackingFlag={false}
                    setFlag={() => setFlag(!flag)}
                  />
                </div>

                <div className="divider" />

                <div id="pendientes">
                  <TableSlopes
                    scrollTo={router.query.scrollTo === "pendientes"}
                    footer={true}
                    prospect={prospect}
                    oportunities={oportunities}
                    isCloseout={false}
                    handleAlert={handleAlert}
                    setAlert={setAlert}
                    setFlag={() => setFlag(!flag)}
                    flag={flag}
                  />
                </div>

                <div className="divider" />

                <div id="contactos">
                  <RelatedContacts scrollTo={router.query.scrollTo === "pendientes"} prospect={prospect} />
                </div>

                {/* <ModalDiscardQuotation
                  name={`${prospect?.name} ${prospect?.lastname}`}
                  email={prospect?.email}
                  id={prospect?.id}
                  handleAlert={handleAlert}
                  activityFrom="oportunities"
                /> */}
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

        <Dialog open={showQuotes} onClose={() => setShowQuotes(!showQuotes)}>
          <DialogContainer>
            <p className="title">Selecciona Cotizacion A Convertir</p>

            <Grid container spacing={2} className="grid_container">
              {oportunities.map((item, index) => (
                <Grid
                  onClick={() =>
                    router.push({
                      pathname: "/clientes/nuevo",
                      query: {
                        p: item.prospectId,
                        o: item.id,
                      },
                    })
                  }
                  key={item.id}
                  item
                  xs={12}
                  md={12}
                  className="grid_item"
                >
                  <div className="card">
                    <div className="cardtop">
                      <p>
                        Concepto: <span>{item.concept}</span>
                      </p>
                    </div>
                    <div className="cardcolumn">
                      <p>
                        Monto: <span>$ {item.amount}</span>
                      </p>

                      <p>
                        Comision: <span>$ {item.comission}</span>
                      </p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </DialogContainer>
        </Dialog>
        <DrawerEditProspect
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          prospectEdit={prospectEdit}
          setFlag={() => setFlag(!flag)}
          activityFrom="oportunities"
        />
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
        <DrawerPreviewQuote
          prospect={prospect}
          oportunitySelect={oportunitySelect}
          open={openPreviewQuote}
          setOpen={setOpenPreviewQuote}
        />
        <ModalReasigned
          Prospect={prospectDataReasign}
          setProspect={setProspectDataReasign}
          open={openReasign}
          setopen={setOpenReasign}
          flag={flag}
          setFlag={setFlag}
        />
      </ProspectoStyled>
    </MainLayout>
  );
};

export default Prospecto;

const DialogContainer = styled.div`
  width: 600px;
  P {
    margin: 0;
    position: sticky;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .grid_container {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    border: 1px solid;
  }

  .grid_item {
    .card {
      padding: 10px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      background-color: #fff;
      border-radius: 4px;
      width: 100%;
      .cardtop {
        font-weight: bold;
        span {
          font-weight: normal;
        }
      }

      .cardcolumn {
        font-weight: bold;
        span {
          font-weight: normal;
        }
      }

      &:hover {
        background-color: rgba(64, 81, 137, 0.3);
        cursor: pointer;
      }
    }
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      resize: none;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .capitalize {
      text-transform: capitalize;
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
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .ctr_tracking {
    padding: 20px;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      /* color: #eaeaea; */
      letter-spacing: 0.03em;
      .icon {
        font-size: 16px;
        margin-right: 5px;
        color: #405189;
      }
    }
    .paraghap {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .capitalize {
      text-transform: capitalize;
    }
  }
`;
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

    /* .form {
      width: 0;
      height: 0;
      transform: rotate(10deg);
      border-left: 100px solid #f0ad4e;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
    } */
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
