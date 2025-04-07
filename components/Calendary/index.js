import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Grid,
  CircularProgress,
  Backdrop,
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from "@material-ui/core";
import "moment/locale/es";
import { api } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { refetchSlopes, refetchSlopesToday } from "../../redux/slices/slopesSlice";
import {
  WatchLater,
  RingVolume,
  NotificationsActive,
  Assignment,
  PersonPinCircle,
  MonetizationOn,
} from "@material-ui/icons";
import { formatDate, toUpperCaseChart } from "../../utils";
import {
  CalendaryStyled,
  ChipsContainer,
  ModalContainer,
  ModalContainerPayments,
  ModalNewPending,
} from "./calendary.styles";
import { normalizeDataCalendaryEjecutive } from "../../utils/normalizeData";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FilterListIcon from "@material-ui/icons/FilterList";
import DrawerCalendarCopy from "../DrawerCalendarCopy";
import "react-toastify/dist/ReactToastify.css";
import { MonthTarget, WeekTarget } from "./eventsTargets/targets";
import { zones } from "./zones/zones";
import { useMediaQuery } from "react-responsive";

const DashboardEjecutiveCalendary = ({ handleAlert, actions }) => {
  const dispatch = useDispatch();
  const toastRef = useRef(null);
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const localizer = momentLocalizer(moment);
  const [dataProspects, setDataProspects] = useState(null);
  const [dataEjecutives, setDataEjecutives] = useState(null);
  const [dataPendigsTypes, setDataPendigsTypes] = useState([]);
  const [eventsCalendary, setEventsCalendary] = useState([]);
  const [eventsCalendaryTotal, setEventsCalendaryTotal] = useState(0);
  const [dataNotificationsPendings, setDataNotificationsPendings] = useState([]);
  const [viewOption, setViewOption] = useState("month");
  const [nowDate, setNowDate] = useState(new Date());
  const [typePending, setTypePending] = useState({});
  const [event, setEvent] = useState({});
  const [pendingToEdit, setPendingToEdit] = useState(null);
  const [prospectSelected, setProspectSelected] = useState(null);
  const [ejecutiveSelected, setEjecutiveSelected] = useState(null);
  const [oportunitiesFromProspectSelected, setOportunitiesFromProspectSelected] = useState(null);
  const [remember, setRemember] = useState(false);
  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNewPending, setOpenNewPending] = useState(false);
  const [openEditPending, setOpenEditPending] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openConfirm, setopenConfirm] = useState(false);
  const [openDrawerFilters, setOpenDrawerFilters] = useState(false);
  const router = useRouter();
  const [timeState, setTimeState] = useState("00:-1");
  const [secondsInterval, setSecondsInterval] = useState(1000);
  const [filterIsPaid, setFilterIsPaid] = useState();
  const [filters, setFilters] = useState({ pendings: {}, payments: {} });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  //states pagos
  const [expiredPaidFilter, setExpiredPaidFilter] = useState(false);

  let time;
  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];

  useEffect(() => {
    if (!timeState) {
      return;
    }
    const updateTime = () => {
      clearInterval(intervalId);
      let today = new Date();
      time = today.toLocaleTimeString();
      let seconds = time.split(":")[2];
      setSecondsInterval(Math.abs(seconds * 1000 - 60000));
      if (time.split(":")[1] !== timeState.split(":")[1]) {
        dataNotificationsPendings.forEach(item => {
          let diferenciaHours = parseInt(
            ((today - new Date(item.date_from)) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let diferenciaMinutes = parseInt(((today - new Date(item.date_from)) % (1000 * 60 * 60)) / (1000 * 60));
          if (diferenciaHours == 0) {
            if (diferenciaMinutes >= -1 && diferenciaMinutes <= 1) {
              setEvent(item);
              toast(toastPendings(item), {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 10000,
              });
            }
          }
        });
        setTimeState(time);
      }
    };
    let intervalId = setInterval(updateTime, secondsInterval);
  }, [timeState]);

  //SetValue formulario editar pendiente
  useEffect(() => {
    if (!pendingToEdit) {
      return;
    }
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
  }, [pendingToEdit]);

  useEffect(() => {
    if (!openNewPending) {
      setProspectSelected(null);
      setOportunitiesFromProspectSelected(null);
      reset();
    }
  }, [openNewPending]);

  useEffect(() => {
    getDataNotifications();
    getDataCalendary();
    getTotalPendings();
  }, [flag]);

  useEffect(() => {
    getDataPendingsTypes();
    getDataEjecutives();
  }, []);

  useEffect(() => {
    if (!ejecutiveSelected) {
      getDataProspects();
    } else {
      getDataProspects(ejecutiveSelected);
    }
  }, [ejecutiveSelected]);

  //Oportunidades de prospecto seleccionado
  useEffect(() => {
    if (!prospectSelected) {
      return;
    }
    getOportunitiesFromProspectSelected(prospectSelected);
  }, [prospectSelected]);

  //Formularios crear/editar Pendientes
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: registerEditPending,
    handleSubmit: handleSubmitEditPending,
    setValue: setValueEditPending,
    reset: resetEditPending,
    formState: { errorsEditPending },
  } = useForm();

  //Custom react toast
  const toastPendings = item => {
    return (
      <div className="main_container">
        <div className="one">
          <Button
            variant="contained"
            color="primary"
            className="btn_save"
            onClick={() => {
              setOpen(true);
            }}
          >
            Ver pendiente
          </Button>
        </div>
        <div className="two">
          <label>{item.subject}</label>
          <p>
            {item.prospect.name} {item.prospect.lastname}
          </p>
        </div>
      </div>
    );
  };

  //Data pendings para notificaciones toast
  const getDataNotifications = async () => {
    try {
      let query = {};
      query.ejecutiveId = id_user;
      query.date_from = { between: getDataDay(nowDate) };
      let pendings = await api.get(`pendings?where=${JSON.stringify(query)}&limit=100&include=pendingstype,prospect`);
      setDataNotificationsPendings(pendings.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  //Oportunidades del prospecto seleccionado
  const getOportunitiesFromProspectSelected = async prospectSelected => {
    let prospect = dataProspects.filter(prospect => prospect.id == prospectSelected)[0];
    if (prospect.isoportunity) {
      let query = {};
      query.prospectId = prospect.id;
      let oportunities = await api.get(`oportunities?where=${JSON.stringify(query)}`);
      if (oportunities.status == 200) {
        setOportunitiesFromProspectSelected(oportunities.data.results);
      }
    } else {
      setOportunitiesFromProspectSelected(null);
    }
  };

  //Get tipo de pendientes
  const getDataPendingsTypes = async () => {
    try {
      let pendingsTypes = await api.get(`pendingstypes`);
      setDataPendigsTypes(pendingsTypes.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  //Get prospectos del ejecutivo
  const getDataProspects = async ejecutiveSelected => {
    let query = {};
    if (id_user) {
      query.ejecutiveId = id_user;
      if (ejecutiveSelected) {
        query.ejecutiveId = ejecutiveSelected;
      }
    }
    try {
      let prospects = await api.get(`prospects?where=${JSON.stringify(query)}&order=-createdAt&all=1`);
      setDataProspects(prospects.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  //Get ejecutivos del grupo
  const getDataEjecutives = async () => {
    let query = {};
    if (roleId == "gerente") {
      query.groupId = groupId;
    }
    try {
      let ejecutives = await api.get(`ejecutives?where=${JSON.stringify(query)}&order=-createdAt&all=1&include=role`);
      console.log(ejecutives.data.results);
      setDataEjecutives(ejecutives.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  //Post pendientes
  const handleCreatePending = async formData => {
    let json = {
      notify: true,
      remember: true,
      remember_by: "correo",
      notify_by: "correo",
      description: formData.description,
      pendingstypeId: formData.type,
      subject: formData.subject,
      date_from: new Date(formData.date_from).toISOString(),
      prospectId: formData.prospect,
      priority: parseInt(formData.priority),
      zone: formData.zone,
      status: 1,
    };
    if (roleId == "ejecutivo") {
      json.ejecutiveId = id_user;
    }
    if (roleId == "gerente") {
      if (formData.ejecutive) {
        json.ejecutiveId = formData.ejecutive;
      }
    }
    if (formData.place) {
      json.place = formData.place;
    }
    if (json.notify) {
    }
    if (json.remember) {
    }
    if (formData.date_to) {
      json.date_to = new Date(formData.date_to).toISOString();
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
      await api.post(`pendings`, json);
      setFlag(!flag);
      setOpenNewPending(!openNewPending);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  //Update pendientes
  const handleUpdatePending = async formData => {
    if (!pendingToEdit) {
      return;
    }
    let json = {
      notify: true,
      remember: true,
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
    };
    if (roleId == "gerente") {
      if (formData.ejecutive) {
        json.ejecutiveId = id_user;
      }
    }
    if (formData.place) {
      json.place = formData.place;
    }
    if (json.notify) {
      json.notify_by = "correo";
    }
    if (json.remember) {
      json.remember_by = "correo";
    }
    if (formData.date_to) {
      json.date_to = new Date(formData.date_to).toISOString();
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
    console.log(json);
    try {
      let responseUpdate = await api.put(`pendings/${pendingToEdit.id}`, json);
      if (responseUpdate.status === 200) {
        setFlag(!flag);
        setOpenEditPending(!openEditPending);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///////////Pendientes
  const getDataCalendary = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.ejecutiveId = id_user;
      if (viewOption == "month") {
        query.date_from = { between: getDataDaysMonth(nowDate) };
      }
      if (viewOption == "week") {
        query.date_from = { between: getDataDaysWeek(nowDate) };
      }
      if (viewOption == "day") {
        query.date_from = { between: getDataDay(nowDate) };
      }
      if (filters.pendings.type) {
        query.pendingstypeId = filters.pendings.type.id;
      }
      if (filters.pendings.priority) {
        query.priority = filters.pendings.priority.priority;
      }
      console.log(query);
      let pendings = await api.get(`pendings?where=${JSON.stringify(query)}&limit=0&include=pendingstype,prospect`);
      NormalizeCalendary(pendings.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPendings = async () => {
    try {
      let query = {};
      query.ejecutiveId = id_user;
      if (viewOption == "month") {
        query.date_from = { between: getDateTotalMonth(nowDate) };
      }
      if (viewOption == "week") {
        query.date_from = { between: getDataDaysWeek(nowDate) };
      }
      if (viewOption == "day") {
        query.date_from = { between: getDataDay(nowDate) };
      }
      let pendings = await api.get(`pendings?where=${JSON.stringify(query)}&limit=0&count=1`);
      setEventsCalendaryTotal(pendings.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  // * Normalizacion de datos para el calendario
  const NormalizeCalendary = async pendigns => {
    let events = normalizeDataCalendaryEjecutive(pendigns);
    let payments = await getPayments();
    console.log(events);
    setEventsCalendary(events.concat(payments));
    setIsLoading(false);
  };

  //* Rangos de fechas por mes
  const getDataDaysMonth = dates => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [
      new Date(primerDia.setDate(primerDia.getDate() - 6)).toISOString(),
      new Date(ultimoDia.setDate(ultimoDia.getDate() + 6)).toISOString(),
    ];
  };
  const getDateTotalMonth = dates => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [primerDia.toISOString(), ultimoDia.toISOString()];
  };

  // * Rango de fechas por semana
  const getDataDaysWeek = dates => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let monday = new Date(date.setDate(date.getDate() - date.getDay()));
    let lastDayWeek = new Date(monday.toISOString().slice(0, 10));
    let sunday = new Date(lastDayWeek.setDate(lastDayWeek.getDate() + 7));
    return [monday.toISOString(), sunday.toISOString()];
  };

  // * Rango de Fechas por dia
  const getDataDay = dates => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let today = new Date(date);
    let tomorrow = new Date(date.setDate(date.getDate() + 1));
    return [today.toISOString(), tomorrow.toISOString()];
  };

  // *  Accion de navegacion sig - ant
  const handleNavigationDate = date => {
    setEventsCalendary([]);
    setNowDate(date);
    setFlag(!flag);
  };

  // * actualizacion de estatus del pendiente
  const handleUploadSlope = async () => {
    try {
      let pending = await api.put(`pendings/${event.id}`, { isdone: true });
      let action = actions.filter(item => item.name == event.pendingstype.name);
      handleAlert("success", "Pendiente - Marcado como completado!", "basic");
      setopenConfirm(false);
      setFlag(!flag);

      let trackingPending = {};
      trackingPending.prospectId = event.prospect.id;
      trackingPending.observations = `Pendiente: ${event.subject}, completado el dia ${formatDate(
        pending.data.pending.updatedAt
      )}`;
      trackingPending.actionId = action[0].id;
      trackingPending.status = event.prospect.status;
      trackingPending.reason = "Seguimiento automático";
      trackingPending.phaseId = event.prospect.phaseId;
      trackingPending.createdbyId = id_user;
      await api.post(`trackings`, trackingPending);
      setFlag(!flag);
    } catch (error) {
      setopenConfirm(false);
      //   handleAlert("error", "Pendiente - Error al cambiar el estatus!", "basic");
      console.log(error);
    }
  };

  ///////////////////Pagos
  //Show the chips
  const Chips = () => {
    return (
      <div>
        {filterIsPaid && (
          <Chip color="primary" onDelete={removefilterIsPaid} label={`Pagado: ${filterIsPaid}`} className="chip" />
        )}
        {expiredPaidFilter && (
          <Chip
            color="primary"
            onDelete={removeExpiredPaidFilter}
            label={`Expirado: ${expiredPaidFilter}`}
            className="chip"
          />
        )}
        {filters.pendings.type && (
          <Chip
            color="primary"
            onDelete={removeTypePendingFilter}
            label={`Tipo: ${filters.pendings.type.name}`}
            className="chip"
          />
        )}
        {filters.pendings.priority && (
          <Chip
            color="primary"
            onDelete={removePriorityPendingFilter}
            label={`Prioridad: ${filters.pendings.priority.name}`}
            className="chip"
          />
        )}
      </div>
    );
  };

  const removefilterIsPaid = () => {
    setFilterIsPaid(null);
    setFlag(!flag);
  };

  const removeExpiredPaidFilter = () => {
    setExpiredPaidFilter(null);
    setFlag(!flag);
  };

  const removeTypePendingFilter = () => {
    setFilters({ ...filters, pendings: { ...filters.pendings, type: null } });
    setFlag(!flag);
  };
  const removePriorityPendingFilter = () => {
    setFilters({ ...filters, pendings: { ...filters.pendings, priority: null } });
    setFlag(!flag);
  };

  const expiredDates = date => {
    let today = new Date(Date.now()).getTime();
    let dateCompare = new Date(date).getTime();
    if (dateCompare - today <= 0) {
      return true;
    }
    if (dateCompare - today >= 0) {
      return false;
    }
  };
  const getPayments = async () => {
    console.log(filters);
    let filter = {};
    filter.oportunity = {};
    filter.oportunity.prospect = {};
    filter.oportunity.prospect.ejecutiveId = id_user;
    if (filterIsPaid) {
      filter.ispaid = `${filterIsPaid == "Si" ? true : false}`;
    }
    if (viewOption == "month") {
      filter.date = { between: getDataDaysMonth(nowDate) };
    }
    if (viewOption == "week") {
      filter.date = { between: getDataDaysWeek(nowDate) };
    }
    if (viewOption == "day") {
      filter.date = { between: getDataDay(nowDate) };
    }

    let query = {
      params: {
        include: "oportunity,oportunity.prospect",
        where: filter,
        join: "oportunity,oportunity.prospect",
        count: "1",
        all: 1,
      },
    };
    try {
      let newPayments = [];
      let payments = await api.get("salespayments", query);

      if (expiredPaidFilter) {
        if (expiredPaidFilter == "Si") {
          await payments.data.results.forEach(
            element =>
              expiredDates(element.date) &&
              newPayments.push({
                id: element.id,
                ispaid: element.ispaid,
                title: "pago",
                start: new Date(element.date),
                end: new Date(element.date),
                event: element,
              })
          );
        }
        if (expiredPaidFilter == "No") {
          await payments.data.results.forEach(
            element =>
              !expiredDates(element.date) &&
              newPayments.push({
                id: element.id,
                ispaid: element.ispaid,
                title: "pago",
                start: new Date(element.date),
                end: new Date(element.date),
                event: element,
              })
          );
        }
      } else {
        // sin filtro de datos expirados
        await payments.data.results.forEach(element =>
          newPayments.push({
            id: element.id,
            ispaid: element.ispaid,
            title: "pago",
            start: new Date(element.date),
            end: new Date(element.date),
            event: element,
          })
        );
      }
      return newPayments;
      //setEventPayment(newPayments);
    } catch (error) {
      console.log("error en pagos", error);
    }
  };

  //Funciones ventanas modales
  const handleCloseConfirm = () => setopenConfirm(false);
  const handleClose = () => setOpen(false);
  const handleCloseNewPending = () => setOpenNewPending(false);
  const handleCloseEditPending = () => setOpenEditPending(false);
  const handleClosePayment = () => setOpenPayment(false);
  const handleOpen = event => {
    setEvent(event);
    setOpen(true);
  };
  const handleOpenPayment = event => {
    setEvent(event);
    setOpenPayment(true);
  };

  return (
    <CalendaryStyled>
      <div className="ctr_calendary">
        <div className="ctr_title">
          <p className="title">Calendario de Pendientes</p>
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            <p className="total_pendings">{`Total: ${eventsCalendaryTotal} pendientes`}</p>
          )}
        </div>
        <Grid container className="filters">
          <Grid item md={10}>
            <ChipsContainer>{Chips()}</ChipsContainer>
          </Grid>
          <Grid item md={2}>
            <button className="button" onClick={() => setOpenDrawerFilters(true)}>
              <FilterListIcon />
            </button>
          </Grid>
        </Grid>
        <div className="ctr_body">
          <Calendar
            localizer={localizer}
            events={eventsCalendary}
            startAccessor="start"
            endAccessor="end"
            defaultView={viewOption}
            onNavigate={handleNavigationDate}
            onView={e => {
              if (e !== "agenda") {
                setViewOption(e);
                setFlag(!flag);
              }
            }}
            views={["month", "week", "day"]}
            style={isDesktopOrLaptop ? { height: 600 } : { height: 300 }}
            messages={{
              next: ">",
              previous: "<",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              date: "Fecha",
              time: "Horario",
              event: "Pendiente",
            }}
            tooltipAccessor={false}
            components={{
              month: { event: event => MonthTarget(event.event, handleOpen, handleOpenPayment) },
              week: { event: event => WeekTarget(event.event, handleOpen, handleOpenPayment) },
              day: { event: event => MonthTarget(event.event, handleOpen, handleOpenPayment) },
            }}
            selectable={true}
            onSelectSlot={e => {
              setOpenNewPending(!openNewPending);
              if (moment(e.start).format().split("T")[1].split("-")[0] == "00:00:00") {
                setValue("date_from", `${e.start.toISOString().split("T")[0]}T09:00`);
              } else {
                setValue(
                  "date_from",
                  `${moment(e.start).format().split("T")[0]}T${moment(e.start).format().split("T")[1].split("-")[0]}`
                );
              }
            }}
          />
        </div>
      </div>
      {/* Modal Pendiente Vista Previa */}
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ModalContainer className="ctr_pendings">
            <div className="subject">
              <h2>
                {iconReturn(event?.pendingstype?.name)} {event?.subject}
              </h2>
            </div>
            <div className="modalBody">
              <p id="spring-modal-description">{event?.description}</p>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <label>Nombre</label>
                  <p className="name">{`${event?.prospect?.name} ${event?.prospect?.lastname}`}</p>
                  <label>Correo</label>
                  <p className="email">{event?.prospect?.email}</p>
                  <label>Contacto</label>
                  <p className="name">{event?.prospect?.phone}</p>
                  <label>Numero secundario</label>
                  {event?.prospect?.optionalphone == "" ? (
                    <p className="name">N/A</p>
                  ) : (
                    <p className="name">{event?.prospect?.optionalphone}</p>
                  )}
                  <label>Fecha</label>
                  <p className="name">{formatDate(event?.date_from)}</p>
                  <p className="name">{`${new Date(event?.date_from).getHours()}:${
                    new Date(event?.date_from).getMinutes() < 10
                      ? `0${new Date(event?.date_from).getMinutes()}`
                      : new Date(event?.date_from).getMinutes()
                  }`}</p>
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <label>Prioridad</label>
                  <p className="name">{event?.priority}</p> */}
                  <div className="ctr_buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={event.isdone}
                      onClick={() => {
                        setOpen(false);
                        setopenConfirm(true);
                      }}
                    >
                      Marcar como terminado
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        router.push({
                          pathname: `prospectos/[prospecto]`,
                          query: { prospecto: event.prospectId },
                        });
                      }}
                    >
                      Ver Prospecto
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={event.isdone}
                      onClick={() => {
                        setPendingToEdit(event);
                        setOpen(false);
                        setOpenEditPending(true);
                      }}
                    >
                      Editar Pendiente
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </ModalContainer>
        </motion.div>
      </Modal>
      {/* Modal Agregar pendiente */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openNewPending}
        onClose={handleCloseNewPending}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ModalNewPending>
            <p className="title">Agregar Pendiente</p>
            <div className="modalBody">
              <form onSubmit={handleSubmit(handleCreatePending)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Tipo de pendiente *</label>
                    <select
                      {...register("type", { required: true })}
                      onChange={e => {
                        let type = dataPendigsTypes.filter(item => item.id == e.target.value);
                        setTypePending({ name: type[0].name, id: type[0].id });
                      }}
                      className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    >
                      <option value="" hidden>
                        {" "}
                        Seleccione uno...
                      </option>
                      {dataPendigsTypes?.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Prioridad *</label>
                    <select
                      {...register("priority", { required: true })}
                      className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    >
                      <option value="" hidden>
                        {" "}
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
                  {roleId == "gerente" ? (
                    <Grid item xs={12} md={12}>
                      <label className="ctr_inputs__label">Asignar a un Ejecutivo</label>
                      <Select
                        {...register("ejecutive", { required: true })}
                        getOptionValue={ejecutive => `${ejecutive["id"]}`}
                        getOptionLabel={ejecutive =>
                          `${toUpperCaseChart(ejecutive.name)} ${toUpperCaseChart(ejecutive.lastname)} ${
                            ejecutive.id == id_user ? "--- (Usuario Actual)" : ""
                          }`
                        }
                        options={dataEjecutives}
                        onChange={e => {
                          setEjecutiveSelected(e.id);
                          setValue("ejecutive", e.id);
                        }}
                        labelledBy={"Seleccionar ejecutivo"}
                        isCreatable={true}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Prospecto *</label>
                    <Select
                      {...register("prospect", { required: true })}
                      getOptionValue={prospect => `${prospect["id"]}`}
                      getOptionLabel={prospect =>
                        `${toUpperCaseChart(prospect.name)} ${toUpperCaseChart(prospect.lastname)}`
                      }
                      options={dataProspects}
                      onChange={e => {
                        setProspectSelected(e.id);
                        setValue("prospect", e.id);
                      }}
                      labelledBy={"Seleccionar prospecto"}
                      isCreatable={true}
                    />
                  </Grid>
                  {oportunitiesFromProspectSelected ? (
                    <Grid item xs={12} md={4}>
                      <label className="ctr_inputs__label">Cotizaciones *:</label>
                      <select
                        {...register("oportunity", { required: true })}
                        className={
                          errors?.prospect?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                        }
                      >
                        <option value={""} hidden>
                          Selecciona uno...
                        </option>
                        {oportunitiesFromProspectSelected.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.concept}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={4}></Grid>
                  )}
                  <Grid item xs={12} md={7}>
                    <label className="ctr_inputs__label">Asunto</label>
                    <input
                      {...register("subject", { required: true })}
                      className={errors?.subject?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <label className="ctr_inputs__label">Lugar</label>
                    <input
                      {...register("place", { required: false })}
                      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
                      className={errors?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <label className="ctr_inputs__label">Descripción</label>
                    <textarea
                      {...register("description", { required: false })}
                      className={
                        errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Fecha inicio</label>
                    <input
                      {...register("date_from", { required: true })}
                      type="datetime-local"
                      className={
                        errors?.date_from?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Fecha Termino </label>
                    <input
                      {...register("date_to", { required: false })}
                      type="datetime-local"
                      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
                      className={errors?.date_to?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Zona Horaria:</label>
                    <select
                      {...register("zone", { required: true })}
                      className={errors?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                    >
                      <option value={""} hidden>
                        Selecciona uno...
                      </option>
                      {zones?.map((item, index) => (
                        <option key={index} value={item.gmt}>
                          ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  {/* En espera por la lógica para recordatorios */}
                  {/* <Grid item xs={12} md={6}>
                  <label className="ctr_inputs__label">Notificar</label>
                  <Switch 
                    {...register("notify", { required: false })} 
                    checked={notify} 
                    size="small" 
                    onChange={(e) => setNotify(e.target.checked)} 
                    color="primary" />
                  <select
                    disabled={!notify}
                    {...register("notify_by", { required: false })}
                    className={errors?.notify_by?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  >
                    <option value="">Seleccione un tipo</option>
                    {["Correo", "SMS"].map((item, index) => (
                      <option key={index} value={item} className="option">
                        {item}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={6}>
                  <label className="ctr_inputs__label">Recordar</label>
                  <Switch 
                    {...register("remember", { required: false })} 
                    checked={remember} 
                    size="small" 
                    onChange={(e) => setRemember(e.target.checked)} 
                    color="primary" />
                  <select
                    disabled={!remember}
                    {...register("remember_by", { required: false })}
                    className={errors?.remember_by?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  >
                    <option value="">Seleccione un tipo</option>
                    {["Correo", "SMS"].map((item, index) => (
                      <option key={index} value={item} className="option">
                        {item}
                      </option>
                    ))}
                  </select>
                </Grid> */}
                  <Grid container className="ctr_buttons">
                    <Button variant="contained" color="primary" type="submit" className="btn_save">
                      Crear Pendiente
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="reset"
                      className="btn_cancel"
                      onClick={() => {
                        setOpenNewPending(!openNewPending);
                        reset();
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </ModalNewPending>
        </motion.div>
      </Modal>
      {/* Modal Editar Pendiente */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openEditPending}
        onClose={handleCloseEditPending}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
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
                    <select
                      {...registerEditPending("type", { required: true })}
                      onChange={e => {
                        let type = dataPendigsTypes.filter(item => item.id == e.target.value);
                        setTypePending({ name: type[0].name, id: type[0].id });
                      }}
                      className={
                        errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    >
                      <option value="" hidden>
                        {" "}
                        Seleccione uno...
                      </option>
                      {dataPendigsTypes?.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Prioridad *</label>
                    <select
                      {...registerEditPending("priority", { required: true })}
                      className={
                        errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    >
                      <option value="" hidden>
                        {" "}
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
                      {...registerEditPending("prospect", { required: true })}
                      className={
                        errorsEditPending?.prospect?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                      onChange={e => {
                        setProspectSelected(e.target.value);
                      }}
                    >
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
                          Selecciona uno...
                        </option>
                        {oportunitiesFromProspectSelected.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.concept}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  ) : (
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
                      {...registerEditPending("place", { required: false })}
                      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
                      className={
                        errorsEditPending?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
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
                    <label className="ctr_inputs__label">Fecha inicio</label>
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
                    <label className="ctr_inputs__label">Fecha Termino </label>
                    <input
                      {...registerEditPending("date_to", { required: false })}
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
                    <label className="ctr_inputs__label">Zona Horaria:</label>
                    <select
                      {...registerEditPending("zone", { required: true })}
                      className={
                        errorsEditPending?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    >
                      <option value={""} hidden>
                        Selecciona uno...
                      </option>
                      {zones?.map((item, index) => (
                        <option key={index} value={item.gmt}>
                          ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  {/* En espera por la lógica para recordatorios */}
                  {/* <Grid item xs={12} md={6}>
                  <label className="ctr_inputs__label">Notificar</label>
                  <Switch 
                    {...registerEditPending("notify", { required: false })} 
                    checked={notify} 
                    size="small" 
                    onChange={(e) => setNotify(e.target.checked)} 
                    color="primary" />
                  <select
                    disabled={!notify}
                    {...registerEditPending("notify_by", { required: false })}
                    className={errorsEditPending?.notify_by?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  >
                    <option value="">Seleccione un tipo</option>
                    {["Correo", "SMS"].map((item, index) => (
                      <option key={index} value={item} className="option">
                        {item}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={6}>
                  <label className="ctr_inputs__label">Recordar</label>
                  <Switch 
                    {...registerEditPending("remember", { required: false })} 
                    checked={remember} 
                    size="small" 
                    onChange={(e) => setRemember(e.target.checked)} 
                    color="primary" />
                  <select
                    disabled={!remember}
                    {...registerEditPending("remember_by", { required: false })}
                    className={errorsEditPending?.remember_by?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  >
                    <option value="">Seleccione un tipo</option>
                    {["Correo", "SMS"].map((item, index) => (
                      <option key={index} value={item} className="option">
                        {item}
                      </option>
                    ))}
                  </select>
                </Grid> */}
                  <Grid container className="ctr_buttons">
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
                </Grid>
              </form>
            </div>
          </ModalNewPending>
        </motion.div>
      </Modal>
      {/* Modal Pagos Vista Previa */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openPayment}
        onClose={handleClosePayment}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {event?.payment ? (
            <ModalContainerPayments>
              <div className="subject">
                <h2>
                  <MonetizationOn />
                  {event.ispaid
                    ? "Pagado"
                    : `No pagado
                  ${expiredDates(event.date) ? " - Expirado" : " - Vigente"} `}
                </h2>
              </div>
              <div className="modalBody">
                <p id="spring-modal-description">{event?.description}</p>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <label>Prospecto</label>
                    <p className="name">{`${event?.oportunity?.prospect?.name} ${event?.oportunity?.prospect?.lastname}`}</p>
                    <label>Monto</label>
                    <p className="name">${event?.oportunity?.amount}</p>
                    <label>Pagos realizados</label>
                    <p className="email">{event?.oportunity?.payments}</p>
                    <label>Contacto</label>
                    <p className="email">
                      {event?.oportunity?.prospect?.phone} {event?.oportunity?.prospect?.email}
                    </p>
                    <label>Fecha</label>
                    <p className="name">{formatDate(event?.date_from)}</p>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="ctr_buttons">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={event.ispaid}
                        onClick={() => {
                          setOpenPayment(false);
                          setOpenConfirmPayment(true);
                        }}
                      >
                        Marcar como pagado
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          router.push({
                            pathname: `ventas/[prospecto]`,
                            query: { prospecto: event.oportunity.prospect.id },
                          });
                        }}
                      >
                        Ver Cotización
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </ModalContainerPayments>
          ) : (
            "Sin datos"
          )}
        </motion.div>
      </Modal>
      <Dialog
        open={openConfirm}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ width: "90%", maxWidth: "500px", margin: "auto" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Completar Pendiente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Este pendiente sera marcado como completado </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setOpen(true);
              handleCloseConfirm();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleUploadSlope(event);
            }}
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <DrawerCalendarCopy
        openDrawerFilters={openDrawerFilters}
        setOpenDrawerFilters={setOpenDrawerFilters}
        filterIsPaid={filterIsPaid}
        setFilterIsPaid={setFilterIsPaid}
        flag={flag}
        setFlag={setFlag}
        expiredPaidFilter={expiredPaidFilter}
        setExpiredPaidFilter={setExpiredPaidFilter}
        filters={filters}
        setFilters={setFilters}
        dataPendingsTypes={dataPendigsTypes}
        priorities={prioritys}
      />
      <ToastContainer ref={toastRef} theme="dark" />
    </CalendaryStyled>
  );
};

export default DashboardEjecutiveCalendary;

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
    default:
      return;
      break;
  }
};
