import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddPendingCalendary from "../ModalAddPendingsCalendary";
import { Grid, Tooltip, CircularProgress, Backdrop, Modal, Button } from "@material-ui/core";
import "moment/locale/es";
import { api, api2 } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import {
  WatchLater,
  RingVolume,
  NotificationsActive,
  Assignment,
  PersonPinCircle,
  MonetizationOn,
} from "@material-ui/icons";
import { formatDate, returnFomatTime, formatDatecomplete } from "../../utils";
import { CalendaryStyled, ModalContainer, ModalContainerPayments, ModalNewPending } from "./calendaryejecutive.styles";
import { normalizeDataCalendaryEjecutive } from "../../utils/normalizeData";
import moment from "moment";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import FilterListIcon from "@material-ui/icons/FilterList";
import DrawerCalendar from "../DrawerCalendar";
import { ChipsContainer } from "../DrawerCalendar";
import { Chip } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CompletePending from "../ModalCompletePendings";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import dayjs from "dayjs";
import ModalMarkAsPaid from "../ModalMarkAsPaid";
import { id } from "date-fns/locale";

const DashboardEjecutiveCalendary = ({ handleAlert, actions, type, id_executive,  }) => {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const { pendingstypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const localizer = momentLocalizer(moment);
  const [eventsCalendary, setEventsCalendary] = useState([]);
  const [eventPayment, setEventPayment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nowDate, setNowDate] = useState(new Date());
  const [viewOption, setViewOption] = useState("month");
  const [isProspectType, setIsProspectType] = useState("");
  const [dataProspects, setDataProspects] = useState(null);
  const [prospectPending, setProspectPending] = useState({});
  const [prospectSelected, setProspectSelected] = useState(null);
  const [oportunitiesFromProspectSelected, setOportunitiesFromProspectSelected] = useState(null);
  const [event, setEvent] = useState({});
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [openConfirm, setopenConfirm] = useState(false);
  const [openEditPending, setOpenEditPending] = useState(false);
  const [pendingToEdit, setPendingToEdit] = useState(null);
  const [typePending, setTypePending] = useState({});
  const [openDrawerFilters, setOpenDrawerFilters] = useState(false);
  const [filterIsPaid, setFilterIsPaid] = useState("No");
  const [expiredPaidFilter, setExpiredPaidFilter] = useState();
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);
  const handleCloseEditPending = () => setOpenEditPending(false);
  const [countSlopes, setCountSlopes] = useState(0);
  const [countPayments, setCountPayments] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState();
  const [events, setEvents] = useState();

  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];

  const dateRange = {
    month: [dayjs(nowDate).startOf("month").format(), dayjs(nowDate).endOf("month").format()],
    week: [dayjs(nowDate).startOf("week").format(), dayjs(nowDate).endOf("week").format()],
    day: [dayjs(nowDate).startOf("day").format(), dayjs(nowDate).endOf("day").format()],
  }[viewOption];

  useEffect(() => {
    getDataProspects();
    getCatalogBy("pendingstypes");
  }, []);

  //Oportunidades de prospecto seleccionado
  useEffect(() => {
    if (!prospectSelected) {
      return;
    }
    getOportunitiesFromProspectSelected(prospectSelected);
  }, [prospectSelected, prospectPending]);

  // Datos
  useEffect(() => {
    const fetchData = async () => {
      await setEventsCalendary([]);
      await getPayments(); // Espera a que getPayments termine
      await getDataCalendary(); // Luego, ejecuta getDataCalendary
    };

    fetchData(); // Llama a la función async
  }, [flag]);

  useEffect(() => {
    setEventsCalendary(events?.concat(eventPayment));
  }, [eventPayment, events]);

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
    
  }, [pendingToEdit, flag, ]);
  
  const {
    register: registerEditPending,
    handleSubmit: handleSubmitEditPending,
    setValue: setValueEditPending,
    reset: resetEditPending,
    formState: { errorsEditPending },
  } = useForm();

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
    setNowDate(date);
    setFlag(!flag);
  };

  const iconMap = {
    Visita: <PersonPinCircle />,
    Cita: <WatchLater />,
    Llamada: <RingVolume />,
    Recordatorio: <NotificationsActive />,
    Tarea: <Assignment />,
    pago: <MonetizationOn />,
  };

  // * componente de targetas de eventos
  const MonthEvent = ({ event }) => {
    const isPayment = event.title === "pago";
    const eventType = isPayment ? event.title : event.event.pendingstype.name;
    const handleClick = isPayment ? () => handleOpenPayment(event.event) : () => handleOpen(event.event);
    const eventClass = isPayment ? "" : eventType.toLowerCase();
    const description = isPayment ? event.title : `${event.title} - ${event.event.description}`;
    const isPending = isPayment ? !event.ispaid : !event.event.isdone;

    return (
      <Tooltip placement="top" title={<p>{description}</p>} arrow>
        <div className={`target ${eventClass}`} onClick={handleClick}>
          <div className="type">
            {iconMap[eventType]}
            <p>{event.title}</p>
          </div>
          {isPending && <div className="pending" />}
        </div>
      </Tooltip>
    );
  };

  const weekEvent = ({ event }) => {
    const isPayment = event.title === "pago";
    const eventType = isPayment ? event.title : event.event.pendingstype.name;
    const handleClick = isPayment ? () => handleOpenPayment(event.event) : () => handleOpen(event.event);
    const eventClass = isPayment ? "" : eventType.toLowerCase();
    const description = isPayment ? (
      event.title
    ) : (
      <>
        {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
        <p>{`${event.title} - ${event.event.description}`}</p>
      </>
    );
    const isPending = isPayment ? !event.ispaid : !event.event.isdone;

    return (
      <Tooltip placement="top" title={description} arrow>
        <div className={`target ${eventClass}`} onClick={handleClick}>
          <div className="type">
            {iconMap[eventType]}
            <p>{event.title}</p>
          </div>
          {isPending && <div className="pending" />}
        </div>
      </Tooltip>
    );
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
  
  // filtro para datos expirados
  const expiredDates = d => {
    let splitDate = d.split("-", 4);
    let splitDateYear = splitDate[0];
    let splitDateMonth = splitDate[1];

    let preDay = splitDate[2].split("T");
    let splitDateDay = preDay[0];

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
        if (splitDateDay <= todayDay) {
          return txtExpirado;
        }

        //El dia es mayor aun tenemos dias
        if (splitDateDay >= todayDay) {
          return txtNoExpirado;
        }

        //El dia es hoy aun podemos pagar
        if (splitDateDay == todayDay) {
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

  // traer las cuentas por cobrar
  const getPayments = async () => {
    try {
      const filter = {
        oportunity: {
          prospect: { ejecutiveId: id_user },
        },
        ...(filterIsPaid && { ispaid: filterIsPaid === "Si" }),
        ...(viewOption === "month" && {
          createdAt: {
            $gte: getDataDaysMonth(nowDate)[0],
            $lte: getDataDaysMonth(nowDate)[1],
          },
        }),
        ...(viewOption === "week" && {
          createdAt: {
            $gte: getDataDaysWeek(nowDate)[0],
            $lte: getDataDaysWeek(nowDate)[1],
          },
        }),
        ...(viewOption === "day" && {
          createdAt: {
            $gte: getDataDay(nowDate)[0],
            $lte: getDataDay(nowDate)[1],
          },
        }),
      };

      const query = {
        params: {
          include: "oportunity,oportunity.prospect",
          where: filter,
          join: "oportunity,oportunity.prospect",
          count: "1",
          all: 1,
        },
      };

      const payments = await api.get("salespayments", query);
      const results = payments.data.results || [];

      const newPayments = results
        .filter(element => {
          const shouldInclude = expiredPaidFilter
            ? expiredPaidFilter === "Si"
              ? expiredDates(element.date)
              : !expiredDates(element.date)
            : true;

          return shouldInclude;
        })
        .map(element => {
          const mappedElement = {
            id: element.id,
            ispaid: element.ispaid,
            title: "pago",
            start: new Date(element.date),
            end: new Date(element.date),
            event: element,
          };

          return mappedElement;
        });

      setCountPayments(payments.data.count);
      setEventPayment(newPayments);
    } catch (error) {
      console.error("error en pagos", error);
    }
  };

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

  //Funciones ventanas modales
  const handleClose = () => setOpen(false);
  const handleClosePayment = () => setOpenPayment(false);
  const handleOpen = event => {
    setEvent(event);
    setOpen(true);
    if (event.oportunityId === null && event.prospect?.isclient === false) {
      setIsProspectType("Ver Prospecto");
    }
    if (event.oportunityId !== null) {
      setIsProspectType("Ver Oportunidad");
    }
    if (event.prospect?.isclient === true && event.oportunityId === null) {
      setIsProspectType("Ver Cliente");
    }
  };
  const handleOpenPayment = event => {
    setEvent(event);
    setOpenPayment(true);
  };

  const redirectTypeProspect = pendiente => {
    if (pendiente.oportunityId === null && pendiente.prospect?.isclient === false) {
      return router.push({
        pathname: `prospectos/[prospecto]`,
        query: { prospecto: pendiente.prospectId },
      });
    }
    if (pendiente.oportunityId !== null) {
      return router.push({ pathname: "oportunidades/[oportunidad]", query: { oportunidad: pendiente.prospectId } });
    }
    if (pendiente.prospect?.isclient === true && pendiente.oportunityId === null) {
      router.push({ pathname: "clientes/[prospecto]", query: { prospecto: pendiente.prospectId } });
    }
  };

  const handleCloseConfirm = () => setopenConfirm(false);
  const handleCloseConfirmPayment = () => setOpenConfirmPayment(false);

  const handleClickAddPending = item => {
    setProspectPending(item);
    setOpen(false);
    setShowAddPending(true);
  };

  const checkPayment = async itemClient => {
    setOpenPayment(false);
    let payment = await api.get(`salespayments/${itemClient.id}`);
    setSelectedPayment(payment.data);
    setOpenConfirmPayment(true);
  };
  

  useEffect(() => {
    console.log("Eventos del calendario actualizados:", eventsCalendary);
  }, [eventsCalendary]);

  
  return (
    <CalendaryStyled>
      <div className="ctr_calendary">
        <div className="ctr_title">
          <p className="title">Calendario de Pendientes</p>
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
            style={{ height: 500 }}
            messages={{
              next: ">",
              today: "Hoy",
              previous: "<",
              month: "Mes",
              week: "Semana",
              day: "Día",
              date: "Fecha",
              time: "Horario",
              event: "Pendiente",
            }}
            tooltipAccessor={false}
            components={{ month: { event: MonthEvent }, week: { event: weekEvent }, day: { event: MonthEvent } }}
          />
        </div>
        <div className="ctr_footer">
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            <div>
              <p className="total_pendings">
                Total de pendientes: <a>{` ${countSlopes}`}</a>
              </p>
              <p className="total_pendings">
                Total de pagos: <a>{` ${countPayments}`}</a>
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
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
                  <p className="name">{formatDatecomplete(event?.date_from)}</p>
                </Grid>
                <Grid item xs={12} md={6}>
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
                    <Button variant="contained" color="primary" onClick={() => redirectTypeProspect(event)}>
                      {isProspectType}
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClickAddPending(event);
                      }}
                    >
                      Nuevo Pendiente
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </ModalContainer>
        </motion.div>
      </Modal>

      <AddPendingCalendary
        open={showAddPending}
        prospect={prospectPending}
        handleAlert={handleAlert}
        close={handleCloseAddPending}
        flag={flag}
        setFlag={setFlag}
      />

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

                    <p className="name">{formatDate(event?.date)}</p>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="ctr_buttons">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={event.ispaid}
                        onClick={() => {
                          checkPayment(event);
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
                        {...registerEditPending("type")} defaultValue={pendingToEdit?.pendingstypeId}
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
                      {/* {pendingstypes.results?.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))} */}
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
                      {...registerEditPending("priority", { required: true })}
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
      <CompletePending
        pending={event}
        open={openConfirm}
        close={handleCloseConfirm}
        handleAlert={handleAlert}
        refetch={flag}
        setRefetch={setFlag}
      />

      {selectedPayment && (
        <ModalMarkAsPaid
          open={openConfirmPayment}
          handleClose={handleCloseConfirmPayment}
          item={selectedPayment}
          setRecharge={setFlag}
          recharge={flag}
        />
      )}

      <DrawerCalendar
        openDrawerFilters={openDrawerFilters}
        setOpenDrawerFilters={setOpenDrawerFilters}
        filterIsPaid={filterIsPaid}
        setFilterIsPaid={setFilterIsPaid}
        getPayments={getPayments}
        expiredPaidFilter={expiredPaidFilter}
        setExpiredPaidFilter={setExpiredPaidFilter}
      />
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
  }
};
