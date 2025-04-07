import { Button, CircularProgress, Grid, Switch } from "@material-ui/core";
import { FiberManualRecord, FilterList, Replay } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TablePendings from "../../components/TablePendings";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { EjecutivePendingsStyled, graphColor } from "./ejecutivependings.styles";
import { motion } from "framer-motion";
import Select from "react-select";
import { Chip } from "@material-ui/core";

const DashboardEjecutivePendings = ({ typePendings, handleAlert, type, id_executive }) => {
  const { name, id_user } = useSelector(userSelector);
  const [isLoadingPendings, setIsLoadingPendings] = useState(true);
  const [totalPendings, setTotalPendings] = useState(0);
  const [pendings, setPendings] = useState([]);
  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];

  // * new states
  const [totalPendingsToday, setTotalPendingsToday] = useState({});
  const [totalDates, setTotalDates] = useState({});
  const [totalVisit, setTotalVisit] = useState({});
  const [totalCalls, setTotalCalls] = useState({});
  const [totalReminders, setTotalReminders] = useState({});
  const [totalTask, setTotalTask] = useState({});

  // * filtros
  const [filterPendings, setFilterPendings] = useState(false);
  const [flag, setFlag] = useState(false);
  const [typeDate, setTypeDate] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [typePending, setTypePending] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [page, setPage] = useState(1);

  const [ascendingOrder, setAscendingOrder] = useState(false);

  const [datesFilterList] = useState([
    { value: "date_from", label: "Fecha del pendiente" },
    { value: "createdAt", label: "Fecha de creación del pendiente" },
  ]);

  useEffect(() => {
    getPendingsToday();
  }, [id_user, id_executive]);

  useEffect(() => {
    getPendingsTable();
  }, [page, flag]);

  const getPendingsToday = async () => {
    try {
      let query = {};
      let queryC = {};
      let today = formatDateQuery(dayjs().toISOString());
      let tomorrow = formatDateQuery(dayjs().add(1, "day").toISOString());
      query.prospect = { ejecutiveId: type === "ejecutive" ? id_user : id_executive };
      query.pending = { date_from: { between: [today, tomorrow] } };
      queryC.prospect = { ejecutiveId: type === "ejecutive" ? id_user : id_executive };
      queryC.pending = { date_from: { between: [today, tomorrow] }, isdone: true };
      let join = "prospect,pending";
      let pendingsToday = await api.get(`dashboard/pendingstype?where=${JSON.stringify(query)}&join=${join}`);
      let pendingsTodayComplete = await api.get(`dashboard/pendingstype?where=${JSON.stringify(queryC)}&join=${join}`);
      let resultsToday = pendingsToday.data.results;
      let resultsTodayComplete = pendingsTodayComplete.data.results;
      handlePendings(resultsToday, resultsTodayComplete);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePendings = (pendings, pendingscomplete) => {
    let totalPendings = { total: 0, complete: 0, percentage: 0 };
    let dates = { total: 0, complete: 0, percentage: 0 };
    let calls = { total: 0, complete: 0, percentage: 0 };
    let reminders = { total: 0, complete: 0, percentage: 0 };
    let task = { total: 0, complete: 0, percentage: 0 };
    let visit = { total: 0, complete: 0, percentage: 0 };

    for (let i = 0; i < pendings.length; i++) {
      const element = pendings[i];
      totalPendings.total = totalPendings.total + Number(element.totalPendings);
      switch (element.name) {
        case "Visita":
          visit.total = Number(element.totalPendings);
          break;
        case "Recordatorio":
          reminders.total = Number(element.totalPendings);
          break;
        case "Cita":
          dates.total = Number(element.totalPendings);
          break;
        case "Tarea":
          task.total = Number(element.totalPendings);
          break;
        case "Llamada":
          calls.total = Number(element.totalPendings);
          break;
      }
    }
    for (let i = 0; i < pendingscomplete.length; i++) {
      const element = pendingscomplete[i];
      totalPendings.complete = totalPendings.complete + Number(element.totalPendings);
      switch (element.name) {
        case "Visita":
          visit.complete = Number(element.totalPendings);
          break;
        case "Recordatorio":
          reminders.complete = Number(element.totalPendings);
          break;
        case "Cita":
          dates.complete = Number(element.totalPendings);
          break;
        case "Tarea":
          task.complete = Number(element.totalPendings);
          break;
        case "Llamada":
          calls.complete = Number(element.totalPendings);
          break;
      }
    }
    totalPendings.percentage = getPercentage(totalPendings);
    setTotalPendingsToday(totalPendings);
    visit.percentage = getPercentage(visit);
    setTotalVisit(visit);
    task.percentage = getPercentage(task);
    setTotalTask(task);
    reminders.percentage = getPercentage(reminders);
    setTotalReminders(reminders);
    calls.percentage = getPercentage(calls);
    setTotalCalls(calls);
    dates.percentage = getPercentage(dates);
    setTotalDates(dates);
  };

  const getPercentage = data => Math.trunc((data.complete * 100) / data.total);

  const getPendingsTable = async () => {
    try {
      let query = {
        params: {
          limit: 10,
          count: 1,
          skip: page,
          include: "ejecutive,prospect,pendingstype",
          order: `${ascendingOrder ? "-" : ""}date_from`,
          where: {
            isdone: false,
            ejecutiveId: type === "ejecutive" ? id_user : id_executive,
          },
        },
      };

      let localFilters = localStorage.getItem("ejecutive_pendings_filters");
      let localFilterObject = {
        type: "",
        priority: "",
        type_date: { value: "", lavel: "" },
        order: false,
        dateFinish: "",
        dateInitial: "",
      };
      if (localFilters) {
        localFilterObject = JSON.parse(localFilters);
      }

      if (localFilterObject.type_date.value) {
        setTypeDate(localFilterObject.type_date);
        // En teoria con dejar que cada setDate sea el objeto de localstorage queda, pero por si modifican el objeto o hay error en alguno
        if (localFilterObject.dateFinish !== "" && localFilterObject.dateInitial !== "") {
          setDateInitial(localFilterObject.dateInitial);
          setDateFinish(localFilterObject.dateFinish);
          query.params.where[localFilterObject.type_date.value] = {
            between: [formatFirstDate(localFilterObject.dateInitial), formatLastDate(localFilterObject.dateFinish)],
          };
        } else {
          setDateInitial("");
          setDateFinish("");
        }
      } else {
        if (dateFinish !== "" && dateInitial !== "") {
          if (typeDate == "date_from") {
            query.params.where.date_from = { between: [formatFirstDate(dateInitial), formatLastDate(dateFinish)] };
          } else {
            delete query.params.where.date_from;
          }
          if (typeDate == "createdAt") {
            query.params.where.createdAt = { between: [formatFirstDate(dateInitial), formatLastDate(dateFinish)] };
          } else {
            delete query.params.where.createdAt;
          }
        }
      }

      if (localFilterObject.type.id) {
        query.params.where.pendingstypeId = localFilterObject.type.id;
        setTypePending(localFilterObject.type);
      } else {
        if (typePending !== "") {
          query.params.where.pendingstypeId = typePending.id;
        } else {
          delete query.params.where.pendingstypeId;
        }
      }

      if (localFilterObject.priority) {
        query.params.where.priority = localFilterObject.priority.priority;
        setFilterPriority(localFilterObject.priority);
      } else {
        if (filterPriority.priority !== "") {
          query.params.where.priority = filterPriority.priority;
        } else {
          delete query.params.where.priority;
        }
      }

      setIsLoadingPendings(true);

      let pendings = await api.get(`pendings`, query);
      setPendings(pendings.data.results);
      setTotalPendings(pendings.data.count);
      setIsLoadingPendings(false);
    } catch (error) {
      setIsLoadingPendings(false);
      console.log(error);
    }
  };
  const formatDateQuery = date => date.slice(0, 10).concat("T00:00:00.000Z");
  const formatFirstDate = date => dayjs(date).startOf("day").format("");

  const formatLastDate = date => dayjs(date).endOf("day").format("");
  const handleChangePage = (event, value) => {
    if (typeDate !== "") {
      if (dateInitial == "" || dateFinish == "") {
        handleAlert("warning", "Fechas incompletas - se necesitan para aplicar el filtro!", "basic");
        return;
      }
      if (dateInitial > dateFinish) {
        handleAlert("warning", "Fechas - La fecha de inicio no puede ser mayor que la de termino!", "basic");
        return;
      }
    }
    setPage(value);
    setFlag(!flag);
  };
  const handleSearch = () => {
    if (typeDate !== "") {
      if (dateInitial == "" || dateFinish == "") {
        handleAlert("warning", "Fechas incompletas - se necesitan para aplicar el filtro!", "basic");
        return;
      }
      if (dateInitial > dateFinish) {
        handleAlert("warning", "Fechas - La fecha de inicio no puede ser mayor que la de termino!", "basic");
        return;
      }
    }
    if (page > 1) {
      setPage(1);
    }
    setFlag(!flag);
  };

  const handleFilterType = e => {
    if (e) {
      setTypePending(e);
      saveDataLocalStorage("type", e);
    } else {
      setTypePending("");
      saveDataLocalStorage("type", "");
    }
  };
  const handleFilterPriority = e => {
    if (e) {
      setFilterPriority(e);
      saveDataLocalStorage("priority", e);
    } else {
      setFilterPriority("");
      saveDataLocalStorage("priority", "");
    }
  };
  const handleFilterDate = e => {
    if (e) {
      saveDataLocalStorage("type_date", e);
      setTypeDate(e);
    } else {
      setDateInitial("");
      setDateFinish("");
      setTypeDate("");
      saveDataLocalStorage("type_date", "");
      saveDataLocalStorage("dateInitial", "");
      saveDataLocalStorage("dateFinish", "");
    }
  };

  const handleDateInitial = e => {
    setDateInitial(e.target.value);
    saveDataLocalStorage("dateInitial", e.target.value);
  };
  const handleDateFinish = e => {
    setDateFinish(e.target.value);
    saveDataLocalStorage("dateFinish", e.target.value);
  };

  //* Save Filters Local Storage
  const saveDataLocalStorage = (key, value) => {
    let typeLocal = localStorage.getItem("ejecutive_pendings_filters");
    let typeLocalObject = {
      type: "",
      priority: "",
      type_date: { value: "", lavel: "" },
      order: false,
      dateFinish: "",
      dateInitial: "",
    };

    if (typeLocal) {
      typeLocalObject = JSON.parse(typeLocal);
    }

    typeLocalObject[`${key}`] = value;

    localStorage.setItem("ejecutive_pendings_filters", JSON.stringify(typeLocalObject));
  };

  const handleChangeAscending = e => {
    if (typeDate !== "") {
      if (dateInitial == "" || dateFinish == "") {
        handleAlert("warning", "Fechas incompletas - se necesitan para aplicar el filtro!", "basic");
        return;
      }
      if (dateInitial > dateFinish) {
        handleAlert("warning", "Fechas - La fecha de inicio no puede ser mayor que la de termino!", "basic");
        return;
      }
    }
    setAscendingOrder(!ascendingOrder);
    setFlag(!flag);
  };

  return (
    <EjecutivePendingsStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div className="pendings">
            <div className="settings">
              <p>Pendientes del día</p>
              <Replay onClick={() => setFlag(!flag)} />
            </div>
            <div className="progress">
              {totalPendingsToday.total > 0 ? (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={totalPendingsToday.percentage}
                    style={{ width: 150, height: 150, color: graphColor(totalPendingsToday.percentage) }}
                  />
                  <div className="data">
                    <p>{`${totalPendingsToday.percentage}% de ${totalPendingsToday.total}`}</p>
                    <p className="title">Pendientes</p>
                    <p className="title">completados</p>
                  </div>
                </>
              ) : (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    style={{ width: 150, height: 150, color: graphColor(50) }}
                  />
                  <div className="data">
                    <p>Aun no tienes</p>
                    <p>Pendientes hoy</p>
                  </div>
                </>
              )}
            </div>
            <div className="slopes">
              <div className="slope">
                <p className="label">
                  <FiberManualRecord style={{ color: graphColor(totalDates.percentage) }} /> Citas
                </p>
                {totalDates.total == 0 ? (
                  <p className="empty">Sin pendientes</p>
                ) : (
                  <p className="percentage">{`${totalDates.complete} de ${totalDates.total} / ${totalDates.percentage}%`}</p>
                )}
              </div>
              <div className="slope">
                <p className="label">
                  <FiberManualRecord style={{ color: graphColor(totalCalls.percentage) }} /> Llamadas
                </p>
                {totalCalls.total == 0 ? (
                  <p className="empty">Sin pendientes</p>
                ) : (
                  <p className="percentage">{`${totalCalls.complete} de ${totalCalls.total} / ${totalCalls.percentage}%`}</p>
                )}
              </div>
              <div className="slope">
                <p className="label">
                  <FiberManualRecord style={{ color: graphColor(totalReminders.percentage) }} />
                  Recordatorio
                </p>
                {totalReminders.total == 0 ? (
                  <p className="empty">Sin pendientes</p>
                ) : (
                  <p className="percentage">{`${totalReminders.complete} de ${totalReminders.total} / ${totalReminders.percentage}%`}</p>
                )}
              </div>
              <div className="slope">
                <p className="label">
                  <FiberManualRecord style={{ color: graphColor(totalTask.percentage) }} />
                  Tarea
                </p>
                {totalTask.total == 0 ? (
                  <p className="empty">Sin pendientes</p>
                ) : (
                  <p className="percentage">{`${totalTask.complete} de ${totalTask.total} / ${totalTask.percentage}%`}</p>
                )}
              </div>
              <div className="slope">
                <p className="label">
                  <FiberManualRecord style={{ color: graphColor(totalVisit.percentage) }} />
                  Visita
                </p>
                {totalVisit.total == 0 ? (
                  <p className="empty">Sin pendientes</p>
                ) : (
                  <p className="percentage">{`${totalVisit.complete} de ${totalVisit.total} / ${totalVisit.percentage}%`}</p>
                )}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          <div className="tablePendings">
            <div className="title_pendings">
              <div className="title">
                <p>Pendientes</p>
                {isLoadingPendings && <CircularProgress size={20} className="load" />}
              </div>

              <div className="filters" onClick={() => setFilterPendings(!filterPendings)}>
                <FilterList />
                <p>Filtros</p>
              </div>
            </div>
            {filterPendings && (
              <div className="ctr_filters">
                <div className="ctr_filters__title">Filtra por tu preferencia</div>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <label>Tipo de pendiente</label>
                    <Select
                      defaultValue={typePending}
                      value={typePending}
                      isClearable
                      options={typePendings}
                      isLoading={typePendings === []}
                      getOptionValue={type => `${type["id"]}`}
                      getOptionLabel={type => `${type.name}`}
                      onChange={handleFilterType}
                      placeholder={"Seleccionar tipo de pendiente"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Prioridad</label>
                    <Select
                      defaultValue={filterPriority}
                      isClearable
                      options={prioritys}
                      getOptionValue={priority => `${priority.priority}`}
                      getOptionLabel={priority => `${priority.name}`}
                      onChange={handleFilterPriority}
                      placeholder={"Seleccionar prioridad"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>Filtrar fecha por</label>
                    <Select
                      defaultValue={typeDate}
                      isClearable
                      value={typeDate}
                      onChange={handleFilterDate}
                      options={datesFilterList}
                      getOptionLabel={priority => `${priority.label}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {typeDate !== "" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <label>Fecha inicio</label>
                            <input
                              defaultValue={dateInitial}
                              disabled={typeDate !== "" ? false : true}
                              value={dateInitial}
                              label="Fecha inicial"
                              onChange={handleDateInitial}
                              type="date"
                              className="input"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <label>Fecha termino</label>
                            <input
                              defaultValue={dateFinish}
                              disabled={typeDate !== "" ? false : true}
                              value={dateFinish}
                              label="Fecha inicial"
                              onChange={handleDateFinish}
                              type="date"
                              className="input"
                            />
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}
                  </Grid>
                  <Grid item sm={6}>
                    <div>
                      Ascendente
                      <Switch checked={ascendingOrder} onChange={handleChangeAscending} color="primary" />
                      Descendente
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="ctr_filters__ctr_buttons">
                      <Button variant="contained" className="btn_search" onClick={() => handleSearch()}>
                        Buscar
                      </Button>
                      {/* Boton para limpiar filtros, se hará luego xd */}
                      {/* <Button onClick={() => setFilterPendings(false)}>
                    Limpiar
                  </Button> */}
                    </div>
                  </Grid>
                </Grid>
              </div>
            )}

            <TablePendings pendings={pendings} />
            <div className="pagination_pendings">
              <div>
                <p className="total">{`Total de pendientes: ${totalPendings} `}</p>
              </div>
              <Pagination
                onChange={handleChangePage}
                count={Math.ceil(totalPendings / 10)}
                page={page}
                size="small"
                color="primary"
              />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* <FiltersDrawer show={filterPendings} closeDrawer={() => setFilterPendings(false)}>

      </FiltersDrawer> */}
    </EjecutivePendingsStyled>
  );
};

export default DashboardEjecutivePendings;
