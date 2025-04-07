import { Button, Drawer, LinearProgress, Tooltip, CircularProgress, IconButton, Popover } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import AlertGlobal from "../Alerts/AlertGlobal";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import FormWhatsapp from "../SendWhatsapp";
import ProspectData from "../ProspectData";
import CompletePending from "../ModalCompletePendings";
import ModalReasigned from "../ModalReasigned";
import ButtonClose from "../ButtonClose";
import MenuInfoClients from "../MenuInfoClient";
import { DrawerStyled } from "./styles";
import { setArrayProducts } from "../../redux/slices/quotesSlice";
const DrawerClient = ({
  show,
  closeDrawer,
  prospectId,
  refetch,
  setRefetch,
  flag,
  handleClickAddTracking,
  handleClickAddPending,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cve } = router.query;
  const { id_user, roleId } = useSelector(userSelector);
  const [load, setload] = useState(true);
  const [openWhats, setOpenWhats] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospect, setProspect] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [reloadDataCompletePending, setReloadDataCompletePending] = useState(false);
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [pendingToComplete, setPendingToComplete] = useState({});
  const [openConfirmPending, setOpenConfirmPending] = useState(false);
  const [optionSelected, setOptionSelected] = useState("sells");
  const [tabValue, setTabValue] = useState(0);
  const [refetchActions, setRefetchActions] = useState(false);
  const [globalPagination, setGlobalPagination] = useState({
    page: 1,
    limit: 10, // Ajusta este valor según tu necesidad
  });
  const handleCloseConfirmPending = () => {
    setOpenConfirmPending(false);
  };

  const RefreshPending = () => {
    setRefetchActions(!refetchActions);
  };
  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }
    return () => (mounted = false);
  }, [prospectId, flag, reloadDataCompletePending]);

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
      setload(true);
      let include =
        "city,category,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
      setProspect(p.data);
      setProspectDataReasign(p.data);
      setload(false);
    } catch (error) {
      setload(false);
      console.log("error", error);
      handleAlert("error", "Prospecto - Error al cargar los datos!", "basic");
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

  const handleAddTraking = () => {
    let ViewClient = {};
    ViewClient.itemBD = prospect;
    ViewClient.id = prospect?.id;
    ViewClient.phase = prospect?.phase;

    handleClickAddTracking(ViewClient);
    closeDrawer();
  };

  const handleAddPending = () => {
    let ViewClient = {};
    ViewClient.itemBD = prospect;
    ViewClient.id = prospect?.id;
    ViewClient.phase = prospect?.phase;
    handleClickAddPending(ViewClient);
    closeDrawer();
  };

  const handleAddQuote = () => {
    router.push({
      pathname: `/oportunidades/nuevo/`,
      query: { p: prospect?.id },
    });
    dispatch(setArrayProducts([]));
  };

  const handleClickClient = scrollTo => {
    if (cve == "0111") {
      router.push({
        pathname: "/clientes/[prospecto]",
        query: { prospecto: prospect.id, cve: cve, scrollTo: scrollTo },
      });
    } else {
      router.push({ pathname: "clientes/[prospecto]", query: { prospecto: prospect.id, scrollTo: scrollTo } });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setGlobalPagination(prevPagination => ({
      ...prevPagination,
      page: 1,
    }));
  };
  return (
    <>
      <DrawerStyled
        anchor="right"
        open={show}
        onClose={() => {
          // setProspect({});
          setTabValue(0);
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
                <p className="title">Cliente</p>
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
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn_view"
                    onClick={() => {
                      handleClickClient();
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
              <MenuInfoClients
                clienteSeleccionado={prospect}
                setOptionSelected={setOptionSelected}
                optionSelected={optionSelected}
                handleTabChange={handleTabChange}
                tabValue={tabValue}
                setTabValue={setTabValue}
                globalPagination={globalPagination}
                setGlobalPagination={setGlobalPagination}
                handleClickClient={handleClickClient}
                handleAddTraking={handleAddTraking}
                handleAddPending={handleAddPending}
                handleAddQuote={handleAddQuote}
                handlePendingsComplete={handlePendingsComplete}
                refetchActions={refetchActions}
                RefreshPending={RefreshPending}
              />
            </div>
          </>
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
        reloadDataCompletePending={reloadDataCompletePending}
        setReloadDataCompletePending={setReloadDataCompletePending}
      />
      <CompletePending
        pending={pendingToComplete}
        open={openConfirmPending}
        close={handleCloseConfirmPending}
        handleAlert={handleAlert}
        refetch={refetch}
        setRefetch={setRefetch}
        GlobaldataRefetch={RefreshPending}
        title={"drawerClient"}
      />
      {roleId !== "ejecutivo" && (
        <ModalReasigned
          open={openReasign}
          setopen={setOpenReasign}
          Prospect={prospectDataReasign}
          setProspect={setProspectDataReasign}
          setFlag={setRefetch}
          flag={refetch}
        />
      )}
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </>
  );
};

export default DrawerClient;

const FiltersOrder = [
  { label: "Fecha de Pendiente", value: "date_from" },
  { label: "Fecha de Creación", value: "-createdAt" },
];
