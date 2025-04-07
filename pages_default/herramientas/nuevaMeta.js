import React, { useState, useEffect } from "react";
import { NewProspectStyled, Error } from "../../styles/Propectos/NewProspect";
import NavBarDashboard from "../../components/NavBarDashboard";
import { Controller, useForm } from "react-hook-form";
import { Grid, Button } from "@material-ui/core";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import router from "next/router";
import Select from "react-select";
import { EmojiEvents, Delete } from "@material-ui/icons";
import { months } from "../../BD/databd";
import { motion } from "framer-motion";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import { toUpperCaseChart } from "../../utils";
import dayjs from "dayjs";
import { formatNumberNoSymbol } from "../../utils";
import NumberFormat from "react-number-format";

export default function NewProspect() {
  const { id_company } = "62dz3qnimTqzfPfKpt7JtOtE";
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [monthPeriod, setMonthPeriod] = useState({});
  const [fetch, setFetch] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [periods, SetPeriods] = useState([]);
  const [goalsNameBd, SetGoalsNameBd] = useState([]);
  const [name, setName] = useState({});
  const [goalsTypeBd, SetGoalsTypeBd] = useState([]);
  const [type, setType] = useState({});
  const [periodsBd, SetPeriodsBd] = useState([]);
  const [period, setPeriod] = useState({});
  const [yearPeriodOptions, setyearPeriodOptions] = useState([]);
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState(0);
  const [yearPeriod, setYearPeriod] = useState("");
  const [array, setArray] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [finishRange, setFinishRange] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finaldate, setFinalDate] = useState("");
  //info de EJECUTIVOS de la BD
  const [ejecutivesBd, SetEjecutivesBd] = useState([]);
  const [ejecutive, setEjecutive] = useState({});
  //info de GRUPOS de la BD
  const [groupsBd, SetGroupsBd] = useState([]);
  const [groups, setGroups] = useState({});
  //info de compañias de la BD
  const [companiesBd, SetCompaniesBd] = useState([]);
  const [companies, setCompanies] = useState({});

  const navigateMetas = () => {
    router.push("../herramientas/metas");
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    calculateDates();
  }, [goal, duration, initialDate, finaldate, name, type, period, startRange, finishRange, monthPeriod, yearPeriod, ejecutive, groups, companies]);

  useEffect(() => {
    calculateYear();
    dataInitial();
  }, [duration]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getGoalsNames();
      getGoalsTypes();
      getPeriods();
      getEjecutives();
      getGroups();
      getCompanies();
    }
    return () => (mounted = false);
  }, []);

  const calculateTotal = (goal) => {
    let totalGoal = 0;
    goal.forEach((ejecutive) => {
      totalGoal = totalGoal + Number(ejecutive.finalgoal);
    });
    return totalGoal;
  };

  function dataInitial() {
    setPeriod({ name: "mensual", id: "62dAupLsSFICWWTU3F1y64Mj" });
    setType({ name: "Individual", id: "62dilssNQWT5RUcANZqAcDuZ" });
  }

  const getGoalsNames = async () => {
    try {
      let goal = await api.get(`goalnames`);
      SetGoalsNameBd(goal.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getGoalsTypes = async () => {
    try {
      let type = await api.get(`goaltypes`);
      SetGoalsTypeBd(type?.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getPeriods = async () => {
    try {
      let period = await api.get(`periods`);
      SetPeriodsBd(period.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getEjecutives = async () => {
    try {
      let ejecutive = await api.get(`ejecutives?limit=200`);
      SetEjecutivesBd(ejecutive.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getGroups = async () => {
    try {
      let grupo = await api.get(`groups?limit=200`);
      SetGroupsBd(grupo.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getCompanies = async () => {
    try {
      let company = await api.get(`companies?limit=200`);
      SetCompaniesBd(company.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Meta", type: "load" });
      let newGoal = {};

      newGoal.alias = formData.alias;
      newGoal.goalnameId = formData.goalnameId;
      newGoal.goaltypeId = type.id;
      newGoal.periodId = period.id;

      if (period.name === "rango") {
        newGoal.initialdate = `${startRange}T05:00:00.001Z`;
        newGoal.finaldate = `${finishRange}T05:00:00.001Z`;
        newGoal.duration = "1";
      } else {
        newGoal.initialdate = `${initialDate}T05:00:00.001Z`;
        newGoal.finaldate = `${finaldate}T05:00:00.001Z`;
        newGoal.duration = formData.duration;
      }

      newGoal.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      newGoal.total = calculateTotal(array);
      newGoal.periods = array;

      console.log(newGoal);

      let NewGoal = await api.post(`goals`, newGoal);

      if (NewGoal.status == 200) {
        handleAlert("success", "Meta - ¡Agregada correctamente!", "basic");
        setTimeout(() => {
          router.push("../herramientas/metas");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Metas - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Metas - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Metas - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Metas - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const monthsPeriodOptions = [
    {
      id: "1",
      name: "enero",
      value: 1,
    },
    {
      id: "2",
      name: "febrero",
      value: 2,
    },
    {
      id: "3",
      name: "marzo",
      value: 3,
    },
    {
      id: "4",
      name: "abril",
      value: 4,
    },
    {
      id: "5",
      name: "mayo",
      value: 5,
    },
    {
      id: "6",
      name: "junio",
      value: 6,
    },
    {
      id: "7",
      name: "julio",
      value: 7,
    },
    {
      id: "8",
      name: "agosto",
      value: 8,
    },
    {
      id: "9",
      name: "septiembre",
      value: 9,
    },
    {
      id: "10",
      name: "octubre",
      value: 10,
    },
    {
      id: "11",
      name: "noviembre",
      value: 11,
    },
    {
      id: "12",
      name: "diciembre",
      value: 12,
    },
  ];

  const handleMonths = (month) => {
    setMonthPeriod(month.id);
  };

  const calculateYear = () => {
    let year = dayjs().startOf("year").$y;
    let yearNext = dayjs().add(1, "year").$y;
    setyearPeriodOptions([
      {
        id: year,
        name: year,
      },
      {
        id: yearNext,
        name: yearNext,
      },
    ]);
  };

  const handleYear = (year) => {
    setYearPeriod(year.id);
  };

  const calculateDates = () => {
    switch (period.name) {
      case "rango":
        let arrayRanges = [];
        for (let index = 0; index < 1; index++) {
          switch (type.name) {
            case "Individual":
              arrayRanges.push({
                initialperiodate: `${startRange}T05:00:00.001Z`,
                finalperiodate: `${finishRange}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });

              break;

            case "Grupal":
              arrayRanges.push({
                initialperiodate: `${startRange}T05:00:00.001Z`,
                finalperiodate: `${finishRange}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayRanges.push({
                initialperiodate: `${startRange}T05:00:00.001Z`,
                finalperiodate: `${finishRange}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });

              break;

            default:
              break;
          }
        }
        setArray(arrayRanges);
        break;
      case "anual":
        let arrayYears = [];
        let newDate = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startYear = dayjs(`${yearPeriod}-0${monthPeriod}-01`).add(index, "year").format("YYYY-MM-DD");
          let endYear = dayjs(startYear).startOf("month").format("YYYY-MM-DD");
          let addYear = dayjs(endYear).add(1, "year").subtract(1, "day").format("YYYY-MM-DD");
          setFinalDate(addYear);

          switch (type.name) {
            case "Individual":
              arrayYears.push({
                initialperiodate: `${startYear}T05:00:00.001Z`,
                finalperiodate: `${addYear}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayYears.push({
                initialperiodate: `${startYear}T05:00:00.001Z`,
                finalperiodate: `${addYear}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayYears.push({
                initialperiodate: `${startYear}T05:00:00.001Z`,
                finalperiodate: `${addYear}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setInitialDate(newDate);
        setArray(arrayYears);
        break;
      case "semestral":
        let arraySemestrys = [];
        let dateSemestry = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startSemestry = dayjs(dateSemestry)
            .add(index * 6, "month")
            .format("YYYY-MM-DD");

          let endSemestry = dayjs(startSemestry).add(5, "month").endOf("month").format("YYYY-MM-DD");
          setFinalDate(endSemestry);
          switch (type.name) {
            case "Individual":
              arraySemestrys.push({
                initialperiodate: `${startSemestry}T05:00:00.001Z`,
                finalperiodate: `${endSemestry}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arraySemestrys.push({
                initialperiodate: `${startSemestry}T05:00:00.001Z`,
                finalperiodate: `${endSemestry}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arraySemestrys.push({
                initialperiodate: `${startSemestry}T05:00:00.001Z`,
                finalperiodate: `${endSemestry}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setArray(arraySemestrys);
        setInitialDate(dateSemestry);
        break;
      case "trimestral":
        let arrayTrimestrys = [];
        let dateTrimestry = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startTrimestry = dayjs(dateTrimestry)
            .add(index * 3, "month")
            .format("YYYY-MM-DD");
          let endTrimestry = dayjs(startTrimestry).add(2, "month").endOf("month").format("YYYY-MM-DD");
          setFinalDate(endTrimestry);

          switch (type.name) {
            case "Individual":
              arrayTrimestrys.push({
                initialperiodate: `${startTrimestry}T05:00:00.001Z`,
                finalperiodate: `${endTrimestry}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayTrimestrys.push({
                initialperiodate: `${startTrimestry}T05:00:00.001Z`,
                finalperiodate: `${endTrimestry}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayTrimestrys.push({
                initialperiodate: `${startTrimestry}T05:00:00.001Z`,
                finalperiodate: `${endTrimestry}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setArray(arrayTrimestrys);
        setInitialDate(dateTrimestry);
        break;
      case "bimestral":
        let arrayBimestrys = [];
        let dateBimestry = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startBimestry = dayjs(dateBimestry)
            .add(index * 2, "month")
            .format("YYYY-MM-DD");

          let endBimestry = dayjs(startBimestry).add(1, "month").endOf("month").format("YYYY-MM-DD");
          setFinalDate(endBimestry);

          switch (type.name) {
            case "Individual":
              arrayBimestrys.push({
                initialperiodate: `${startBimestry}T05:00:00.001Z`,
                finalperiodate: `${endBimestry}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayBimestrys.push({
                initialperiodate: `${startBimestry}T05:00:00.001Z`,
                finalperiodate: `${endBimestry}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayBimestrys.push({
                initialperiodate: `${startBimestry}T05:00:00.001Z`,
                finalperiodate: `${endBimestry}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setArray(arrayBimestrys);
        setInitialDate(dateBimestry);
        break;
      case "mensual":
        let arrayMonths = [];
        let dateInitial = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startMonth = dayjs(`${yearPeriod}-0${monthPeriod}-01`).add(index, "month").format("YYYY-MM-DD");
          let endMonth = dayjs(startMonth).endOf("month").format("YYYY-MM-DD");
          setFinalDate(endMonth);

          switch (type.name) {
            case "Individual":
              arrayMonths.push({
                initialperiodate: `${startMonth}T05:00:00.001Z`,
                finalperiodate: `${endMonth}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });

              break;

            case "Grupal":
              arrayMonths.push({
                initialperiodate: `${startMonth}T05:00:00.001Z`,
                finalperiodate: `${endMonth}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayMonths.push({
                initialperiodate: `${startMonth}T05:00:00.001Z`,
                finalperiodate: `${endMonth}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });

              break;

            default:
              break;
          }
        }
        setArray(arrayMonths);
        setInitialDate(dateInitial);
        break;
      case "semanal":
        let arrayWeeks = [];
        let dateWeek = dayjs(`${yearPeriod}-0${monthPeriod}-01`).startOf("week").format("YYYY-MM-DD");
        let addOneDayWeek = dayjs(dateWeek).add(1, "day").format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startWeek = dayjs(addOneDayWeek).add(index, "week").format("YYYY-MM-DD");
          let endWeek = dayjs(startWeek).endOf("week").add(1, "day").format("YYYY-MM-DD");
          setFinalDate(endWeek);
          switch (type.name) {
            case "Individual":
              arrayWeeks.push({
                initialperiodate: `${startWeek}T05:00:00.001Z`,
                finalperiodate: `${endWeek}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayWeeks.push({
                initialperiodate: `${startWeek}T05:00:00.001Z`,
                finalperiodate: `${endWeek}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayWeeks.push({
                initialperiodate: `${startWeek}T05:00:00.001Z`,
                finalperiodate: `${endWeek}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setArray(arrayWeeks);
        setInitialDate(addOneDayWeek);
        break;
      case "diario":
        let arrayDays = [];
        let dateDay = dayjs(`${yearPeriod}-0${monthPeriod}-01`).format("YYYY-MM-DD");
        for (let index = 0; index < duration; index++) {
          let startDay = dayjs(dateDay).add(index, "day").format("YYYY-MM-DD");
          let endDay = dayjs(startDay).endOf("day").format("YYYY-MM-DD");
          setFinalDate(endDay);

          switch (type.name) {
            case "Individual":
              arrayDays.push({
                initialperiodate: `${startDay}T05:00:00.001Z`,
                finalperiodate: `${endDay}T05:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayDays.push({
                initialperiodate: `${startDay}T05:00:00.001Z`,
                finalperiodate: `${endDay}T05:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayDays.push({
                initialperiodate: `${startDay}T05:00:00.001Z`,
                finalperiodate: `${endDay}T05:00:00.001Z`,
                finalgoal: goal,
                companies: companies,
              });
              break;

            default:
              break;
          }
        }
        setArray(arrayDays);
        setInitialDate(dateDay);
        break;
      default:
        break;
    }
  };

  const addEjecutives = (value) => {
    let arrayEjecutives = [];
    value.forEach((ejecutivo) => {
      arrayEjecutives.push(ejecutivo.id);
      setEjecutive(arrayEjecutives);
    });
    console.log(arrayEjecutives);
  };

  const addGroups = (value) => {
    let arrayGroups = [];
    value.forEach((grupo) => {
      arrayGroups.push(grupo.id);
      setGroups(arrayGroups);
    });
    console.log(arrayGroups);
  };

  const addCompanies = (value) => {
    let arrayCompanies = [];
    value.forEach((company) => {
      arrayCompanies.push(company.id);
      setCompanies(arrayCompanies);
    });
    console.log(arrayCompanies);
  };

  const formatDates = (str) => {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    let hour = dates.hour().toString();
    let min = dates.minute().toString();
    let mil = dates.millisecond().toString();
    return `  ${day} ${month[0]}, ${year}`;
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <NewProspectStyled>
      <NavBarDashboard />

      <div className="main">
        <div className="head">
          <h1> Agregar Meta</h1>
        </div>

        <div className="main_prospects">
          {" "}
          <Grid container className="form">
            <Grid item xs={12} sm={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Alias <strong>*</strong>
                  </p>
                  {errors.alias && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.alias?.message}</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Nombre de la Fase"
                  className="input"
                  {...register("alias", {
                    required: "*Requerido",
                  })}
                  id="alias"
                  name="alias"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Meta <strong>*</strong>
                  </p>
                  {errors.goalnameId && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.goalnameId?.message}</Error>
                    </>
                  )}
                </div>
                <select
                  placeholder="Nombre de la Fase"
                  className="input"
                  {...register("goalnameId", {
                    required: "*Requerido",
                  })}
                  id="goalnameId"
                  name="goalnameId"
                >
                  <option value="" hidden>
                    Selecciona tipo de meta
                  </option>

                  {goalsNameBd.map((item, index) => {
                    return (
                      <option key={index} value={item.id} className="option">
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Tipo <strong>*</strong>
                  </p>

                  {errors.goaltypeId && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.goaltypeId?.message}</Error>
                    </>
                  )}
                </div>
                <select
                  placeholder="Nombre de la Fase"
                  className="input"
                  {...register("goaltypeId", {})}
                  value={type.id}
                  id="goaltypeId"
                  name="goaltypeId"
                  defaultValue={type}
                  selected
                  onChange={(e) => {
                    let tipo = goalsTypeBd.filter((item) => item.id == e.target.value);
                    setType({ name: tipo[0].name, id: tipo[0].id });
                    console.log(type.id);
                  }}
                >
                  <option value="" hidden>
                    Selecciona una opción
                  </option>

                  {goalsTypeBd?.map((item, index) => {
                    return (
                      <option key={index} value={item.id} className="option">
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Periodo <strong>*</strong>
                  </p>
                  {errors.periodId && (
                    <>
                      <div className="point"></div>

                      <Error>{errors.periodId?.message}</Error>
                    </>
                  )}
                </div>
                <select
                  placeholder="Nombre de la Fase"
                  className="input"
                  {...register("periodId", {})}
                  value={period.id}
                  id="periodId"
                  name="periodId"
                  defaultValue={period.id}
                  selected
                  onChange={(e) => {
                    let periodo = periodsBd.filter((item) => item.id == e.target.value);
                    setPeriod({ name: periodo[0].name, id: periodo[0].id });
                  }}
                >
                  <option value="" hidden>
                    Selecciona una opción
                  </option>

                  {periodsBd.map((item, index) => {
                    return (
                      <option key={index} value={item.id} className="option">
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Grid>

            {period.name === "rango" ? (
              <Grid item xs={12} md={12}>
                <div className="item">
                  <p>Fecha de Inicio</p>
                  <input className="input" type="date" onChange={(e) => setStartRange(e.target.value)} />
                  <p>Fecha de Termino</p>
                  <input className="input" type="date" onChange={(e) => setFinishRange(e.target.value)} />
                </div>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Inicio <strong>*</strong>
                      </p>

                      {errors.initialdate && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.initialdate?.message}</Error>
                        </>
                      )}
                    </div>
                    <Select
                      placeholder="Selecciona el Mes de Inicio"
                      options={monthsPeriodOptions}
                      onChange={(e) => (e === null ? handleMonths("") : handleMonths(e))}
                      getOptionValue={(option) => `${option["id"]}`}
                      getOptionLabel={(option) => `${toUpperCaseChart(option.name)} `}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>Año</p>
                      {errors.finaldate && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.finaldate?.message}</Error>
                        </>
                      )}
                    </div>
                    <Select
                      placeholder="Selecciona el Año"
                      options={yearPeriodOptions}
                      onChange={(e) => (e === null ? handleYear("") : handleYear(e))}
                      getOptionValue={(option) => `${option["id"]}`}
                      getOptionLabel={(option) => `${option.name} `}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p onClick={() => console.log(array)}>
                        Durante <strong>*</strong>
                      </p>
                      {errors.duration && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.duration?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      type="number"
                      placeholder="Ingresa la duración"
                      className="input"
                      {...register("duration", {
                        required: "*Requerido",
                      })}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p onClick={() => console.log(array)}>
                    Meta a alcanzar <strong>*</strong>
                  </p>
                  {errors.total && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.total?.message}</Error>
                    </>
                  )}
                </div>

                <input
                  type="number"
                  placeholder="Ingrese meta del ejecutivo "
                  className="input"
                  {...register("total", {
                    required: "*Requerido",
                  })}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
            </Grid>

            {type.name === "Grupal" ? (
              <Grid item xs={12} md={12} style={{ marginTop: "1%" }}>
                <h4>Selecciona los grupos *</h4>
                <Select
                  options={groupsBd}
                  isMulti
                  className="selectOption"
                  placeholder="Selecciona el grupo"
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option.name} `}
                  onChange={(e) => (e === null ? addGroups("") : addGroups(e))}
                />
              </Grid>
            ) : (
              ""
            )}
            {type.name === "Individual" ? (
              <Grid item xs={12} md={12} style={{ marginTop: "1%" }}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <h4>
                      Selecciona los ejecutivos <strong>*</strong>
                    </h4>
                  </div>

                  <Select
                    options={ejecutivesBd}
                    isMulti
                    className="selectOption"
                    placeholder="Selecciona el ejecutivo"
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option.name} ${option.lastname} - ${option.email}`}
                    onChange={(e) => (e === null ? addEjecutives("") : addEjecutives(e))}
                  />
                </div>
              </Grid>
            ) : (
              ""
            )}

            {type.name === "Empresarial" ? (
              <Grid item xs={12} md={12} style={{ marginTop: "1%" }}>
                <h4>Selecciona las empresas *</h4>
                <Select
                  options={companiesBd}
                  isMulti
                  className="selectOption"
                  placeholder="Selecciona la Compañia"
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option.company}`}
                  onChange={(e) => (e === null ? addCompanies("") : addCompanies(e))}
                />
              </Grid>
            ) : (
              ""
            )}

            <Grid container className="objetive">
              <Grid item xs={12} md={12} className="title">
                <h2>
                  {" "}
                  <EmojiEvents />
                  Objetivos
                </h2>
              </Grid>
            </Grid>

            <Grid item md={12} style={{ backgroundColor: "#0d47a1", paddingBlockEnd: "1%" }}>
              <h3 style={{ color: "white", marginLeft: "3%" }}>Periodos</h3>
            </Grid>

            <div className="table">
              <table className="ctr_table">
                <thead className="ctr_table__head">
                  {/* <tr className="ctr_table__head__tr">
                    <th className="title ">
                      <div className="ctr_title">
                        <p></p>
                      </div>
                    </th>
                  </tr> */}
                </thead>
                <tbody className="ctr_table__body">
                  <tr className="row" onClick={() => {}}>
                    {array.map((item, index) => (
                      <td key={index} className="data">
                        <p className="date"> {` Del ${formatDates(item.initialperiodate)}`} </p>
                        <p className="date"> {` al${formatDates(item.finalperiodate)}`} </p>
                        <div>
                          <hr />
                          <p> Meta: {formatNumberNoSymbol(item.finalgoal).toString()}</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <Grid item xs={12} md={12} className="buttons">
              <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateMetas()}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" className="btnGuardar" onClick={handleSubmit(createData)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      {Alert?.show && <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />}
    </NewProspectStyled>
  );
}
