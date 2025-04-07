import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, Switch, Modal, Backdrop } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import Select, { createFilter } from "react-select";
import { EmojiEvents, Delete } from "@material-ui/icons";
import dayjs from "dayjs";
import {
  Error,
  ModalNewNameGoal,
  ModalNewNameGoalStyled,
  NuevaMetaStyled,
} from "../../../../styles/Herramientas/nuevameta.styles";
import { api } from "../../../../services/api";
import { months } from "../../../../BD/databd";
import { formatNumberNoSymbol, handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { userSelector } from "../../../../redux/slices/userSlice";
import { StyleExecutiveGroup } from "../../../../styles/global.styles";
import LoaderCompleteScreen from "../../../../components/LoaderCompleteScreen";
import NewNameGoal from "../../../../components/ModalAddNameGoal";

export default function NewGoals() {
  const { id_company } = "62dz3qnimTqzfPfKpt7JtOtE";
  const { id_user, roleId, groupId } = useSelector(userSelector);
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
  const [categoriesBd, setCategoriesBd] = useState([]);
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState(0);
  const [yearPeriod, setYearPeriod] = useState("");
  const [array, setArray] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [finishRange, setFinishRange] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finaldate, setFinalDate] = useState("");
  const [openModalNewNameGoal, setOpenModalNewNameGoal] = useState(false);
  const [typeSelected, setTypeSelected] = useState({ switch: false, type: null });
  //info de EJECUTIVOS de la BD
  const [ejecutivesBd, SetEjecutivesBd] = useState([]);
  const [ejecutive, setEjecutive] = useState({});
  //info de GRUPOS de la BD
  const [groupsBd, SetGroupsBd] = useState([]);
  const [groups, setGroups] = useState({});
  //info de compañias de la BD
  const [companiesBd, SetCompaniesBd] = useState([]);
  const [companies, setCompanies] = useState({});
  const [refetchGoalsName, setRefetchGoalsName] = useState(false);
  const selectInputRef = useRef();
  const [loaderNameMetas, setLoaderNameMetas] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const dispatch = useDispatch();
  const [errort, setErrort] = useState(false);
  const navigateMetas = () => {
    router.push("/herramientas/metas");
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
  }, [
    goal,
    duration,
    initialDate,
    finaldate,
    name,
    type,
    period,
    startRange,
    finishRange,
    monthPeriod,
    yearPeriod,
    ejecutive,
    groups,
    companies,
  ]);

  useEffect(() => {
    if (!selectInputRef.current) {
      return;
    }
    selectInputRef.current.clearValue();
  }, [typeSelected]);

  useEffect(() => {
    calculateYear();
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
      getCategories();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    getGoalsNames();
  }, [refetchGoalsName]);

  const calculateTotal = goal => {
    let totalGoal = 0;
    goal.forEach(ejecutive => {
      totalGoal = totalGoal + Number(ejecutive.finalgoal);
    });
    return totalGoal;
  };

  const getGoalsNames = async () => {
    setLoaderNameMetas(true);
    try {
      let params = {
        all: 1,
        order: "name",
      };
      let response = await api.get(`goalnames`, { params });
      SetGoalsNameBd(response.data.results);
      setLoaderNameMetas(false);
    } catch (err) {
      setLoaderNameMetas(false);
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getGoalsTypes = async () => {
    try {
      let query = {};

      if (roleId === "ejecutivo") {
        query.name = "Individual";
      }
      let type = await api.get(`goaltypes`, {
        params: { where: JSON.stringify(query) },
      });
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
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
        include: "group",
      };
      let response = await api.get(`ejecutives`, { params });
      SetEjecutivesBd(response.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getGroups = async () => {
    try {
      let query = {};
      if (roleId === "ejecutivo") {
        query.id = groupId;
      }
      let params = {
        limit: 100,
        where: JSON.stringify(query),
        all: 1,
      };
      let grupo = await api.get(`groups`, { params });
      SetGroupsBd(grupo.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getCompanies = async () => {
    try {
      let company = await api.get(`companies?all=1`);
      SetCompaniesBd(company.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const getCategories = async () => {
    try {
      let params = {
        all: 1,
      };
      let categories = await api.get(`categories`, { params });
      setCategoriesBd(categories.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const createData = async (formData, e) => {
    setIsLoadingCreate(true);
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Meta", type: "load" });
      let newGoal = {};

      newGoal.alias = formData.alias;
      newGoal.goalnameId = formData.goalnameId.id;
      newGoal.goaltypeId = type.id;
      newGoal.periodId = period.id;

      if (period.name === "rango") {
        newGoal.initialdate = dayjs(startRange).format();
        newGoal.finaldate = dayjs(finishRange).format();
        newGoal.duration = "1";
      } else {
        newGoal.initialdate = dayjs(initialDate).format();
        newGoal.finaldate = dayjs(finaldate).format();
        newGoal.duration = formData.duration;
      }
      newGoal.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      newGoal.total = calculateTotal(array);
      newGoal.periods = formatDatesToPost(array);
      let NewGoal = await api.post(`goals`, newGoal);
      if (NewGoal.status == 201) {
        handleGlobalAlert("success", "Meta - ¡Agregada correctamente!", "basic", dispatch, 6000);
        setTimeout(() => {
          router.push("/herramientas/metas");
        }, 2000);
      }
    } catch (err) {
      setIsLoadingCreate(false);
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

  const formatDatesToPost = dates => {
    let newArray = [...dates];
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].initialperiodate = dayjs(newArray[i].initialperiodate).startOf("day").format();
      newArray[i].finalperiodate = dayjs(newArray[i].finalperiodate).endOf("day").format();
    }
    return newArray;
  };

  const FormatOptionsExecutiveGroup = ({ fullname, group, email }) => {
    return (
      <StyleExecutiveGroup>
        <div className="dataExecutive">
          <p className="fullname">{fullname} - </p>
          <p className="email">{email}</p>
        </div>
        <p className="groupname">
          Grupo: <span className="name">{group.name}</span>
        </p>
      </StyleExecutiveGroup>
    );
  };

  const handleMonths = month => {
    setMonthPeriod(month.id);
    setValue("monthPeriod", month);
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

  const handleYear = year => {
    setYearPeriod(year.id);
    setValue("yearPeriod", year);
  };

  const calculateDates = () => {
    switch (period.name) {
      case "rango":
        let arrayRanges = [];
        for (let index = 0; index < 1; index++) {
          switch (type.name) {
            case "Individual":
              arrayRanges.push({
                initialperiodate: `${startRange}T06:00:00.001Z`,
                finalperiodate: `${finishRange}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });

              break;

            case "Grupal":
              arrayRanges.push({
                initialperiodate: `${startRange}T06:00:00.001Z`,
                finalperiodate: `${finishRange}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayRanges.push({
                initialperiodate: `${startRange}T06:00:00.001Z`,
                finalperiodate: `${finishRange}T06:00:00.001Z`,
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
                initialperiodate: `${startYear}T06:00:00.001Z`,
                finalperiodate: `${addYear}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayYears.push({
                initialperiodate: `${startYear}T06:00:00.001Z`,
                finalperiodate: `${addYear}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayYears.push({
                initialperiodate: `${startYear}T06:00:00.001Z`,
                finalperiodate: `${addYear}T06:00:00.001Z`,
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
                initialperiodate: `${startSemestry}T06:00:00.001Z`,
                finalperiodate: `${endSemestry}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arraySemestrys.push({
                initialperiodate: `${startSemestry}T06:00:00.001Z`,
                finalperiodate: `${endSemestry}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arraySemestrys.push({
                initialperiodate: `${startSemestry}T06:00:00.001Z`,
                finalperiodate: `${endSemestry}T06:00:00.001Z`,
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
                initialperiodate: `${startTrimestry}T06:00:00.001Z`,
                finalperiodate: `${endTrimestry}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayTrimestrys.push({
                initialperiodate: `${startTrimestry}T06:00:00.001Z`,
                finalperiodate: `${endTrimestry}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayTrimestrys.push({
                initialperiodate: `${startTrimestry}T06:00:00.001Z`,
                finalperiodate: `${endTrimestry}T06:00:00.001Z`,
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
                initialperiodate: `${startBimestry}T06:00:00.001Z`,
                finalperiodate: `${endBimestry}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayBimestrys.push({
                initialperiodate: `${startBimestry}T06:00:00.001Z`,
                finalperiodate: `${endBimestry}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayBimestrys.push({
                initialperiodate: `${startBimestry}T06:00:00.001Z`,
                finalperiodate: `${endBimestry}T06:00:00.001Z`,
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
                initialperiodate: `${startMonth}T06:00:00.001Z`,
                finalperiodate: `${endMonth}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });

              break;

            case "Grupal":
              arrayMonths.push({
                initialperiodate: `${startMonth}T06:00:00.001Z`,
                finalperiodate: `${endMonth}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayMonths.push({
                initialperiodate: `${startMonth}T06:00:00.001Z`,
                finalperiodate: `${endMonth}T06:00:00.001Z`,
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
                initialperiodate: `${startWeek}T06:00:00.001Z`,
                finalperiodate: `${endWeek}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayWeeks.push({
                initialperiodate: `${startWeek}T06:00:00.001Z`,
                finalperiodate: `${endWeek}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayWeeks.push({
                initialperiodate: `${startWeek}T06:00:00.001Z`,
                finalperiodate: `${endWeek}T06:00:00.001Z`,
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
                initialperiodate: `${startDay}T06:00:00.001Z`,
                finalperiodate: `${endDay}T06:00:00.001Z`,
                finalgoal: goal,
                ejecutives: ejecutive,
              });
              break;

            case "Grupal":
              arrayDays.push({
                initialperiodate: `${startDay}T06:00:00.001Z`,
                finalperiodate: `${endDay}T06:00:00.001Z`,
                finalgoal: goal,
                groups: groups,
              });
              break;

            case "Empresarial":
              arrayDays.push({
                initialperiodate: `${startDay}T06:00:00.001Z`,
                finalperiodate: `${endDay}T06:00:00.001Z`,
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

  const addEjecutives = value => {
    let arrayEjecutives = [];
    value.forEach(ejecutivo => {
      arrayEjecutives.push(ejecutivo.id);
      setEjecutive(arrayEjecutives);
    });

    setValue("ejecutiveId", arrayEjecutives);
  };

  const addGroups = value => {
    let arrayGroups = [];
    value.forEach(grupo => {
      arrayGroups.push(grupo.id);
      setGroups(arrayGroups);
    });
    setValue("groupId", arrayGroups);
  };

  const addCompanies = value => {
    let arrayCompanies = [];
    value.forEach(company => {
      arrayCompanies.push(company.id);
      setCompanies(arrayCompanies);
    });
    setValue("companyId", arrayCompanies);
  };

  const formatDates = str => {
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

  const admin = role => {
    if (role === "Admin_compania" || role === "director") {
      return true;
    } else {
      return false;
    }
  };

  const handleCloseModalNewNameGoal = () => setOpenModalNewNameGoal(false);
  const handleCreateNewGoalName = async formData => {
    console.log("se crea", formData);
    // if (!admin(roleId)) {
    //   return;
    // }
    // let json = {};
    // json.name = formData.name;
    // json.type = formData.type;
    // if (json.type == "p") {
    //   json.id = productSelected;
    // }
    // if (json.type == "c") {
    //   json.id = categorySelected;
    // }

    // let response = await api.post(`goalnames`, json);
    // if (response.status === 200) {
    //   selectInputRef.current.clearValue();
    //   resetModal();
    // }
  };

  const messageDurationPeriod = (duration, period) => {
    switch (period) {
      case "mensual":
        return duration == 1
          ? `(Ingrese ${duration} mes de duración de la meta).`
          : `(Ingrese ${duration} meses de duración de la meta).`;
      case "semanal":
        return duration == 1
          ? `(Ingrese ${duration} semana de duración de la meta).`
          : `(Ingrese ${duration} semanas de duración de la meta).`;
      case "trimestral":
        return duration == 1
          ? `(Ingrese ${duration} trimestre de duración de la meta).`
          : `(Ingrese ${duration} trimestres de duración de la meta).`;
      case "diario":
        return duration == 1
          ? `(Ingrese ${duration} día de duración de la meta).`
          : `(Ingrese  ${duration} días de duración de la meta).`;
      case "bimestral":
        return duration == 1
          ? `(Ingrese ${duration} bimestre de duración de la meta).`
          : `(Ingrese ${duration} bimestres de duración de la meta).`;
      case "anual":
        return duration == 1
          ? `(Ingrese ${duration} año de duración de la meta).`
          : `(Ingrese  ${duration} años de duración de la meta).`;
      case "semestral":
        return duration == 1
          ? `(Ingrese ${duration} semestre de duración de la meta).`
          : `(Ingrese ${duration} semestres  de duración de la meta).`;
      default:
        break;
    }
  };

  const typeByRoles = () => {
    switch (roleId) {
      case "ejecutivo":
        return goalsTypeBd.filter(goal => goal.name === "Individual");
      case "gerente":
        return goalsTypeBd.filter(goal => goal.name === "Individual" || goal.name === "Grupal");
      case "director":
        return goalsTypeBd;
      case "Admin_compania":
        return goalsTypeBd;
      default:
        return [];
    }
  };

  return (
    <NuevaMetaStyled>
      {/* <NavBarDashboard /> */}
      <div className="main">
        <div className="head">
          <h1> Agregar Meta</h1>
        </div>

        <div className="main_prospects">
          <Grid container className="form">
            <Grid item xs={12} sm={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p className="p">
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
                  <p className="p">
                    Meta <strong>*</strong>
                  </p>
                  {errors.goalnameId && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.goalnameId?.message}</Error>
                    </>
                  )}
                </div>

                <Controller
                  name="goalnameId"
                  control={control}
                  rules={{ required: "*Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="select-options"
                      placeholder="Selecciona una Opción"
                      options={goalsNameBd}
                      isLoading={loaderNameMetas}
                      getOptionValue={option => option.id}
                      getOptionLabel={option => option.name}
                      noOptionsMessage={() => "Sin Opciones"}
                      filterOption={createFilter({ ignoreAccents: false })}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p className="p">
                    Tipo <strong>*</strong>
                  </p>

                  {errors.goaltypeId && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.goaltypeId?.message}</Error>
                    </>
                  )}
                </div>
                <Controller
                  name="goaltypeId"
                  control={control}
                  rules={{ required: "*Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="select-options"
                      placeholder="Elige una Opción"
                      options={typeByRoles()}
                      getOptionLabel={e => e.name}
                      getOptionValue={e => e.id}
                      noOptionsMessage={() => "Sin Opciones"}
                      onChange={e => {
                        setType({ name: e.name, id: e.id });
                        setValue("goaltypeId", e);
                      }}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p className="p">
                    Periodo <strong>*</strong>
                  </p>
                  {errors.periodId && (
                    <>
                      <div className="point"></div>

                      <Error>{errors.periodId?.message}</Error>
                    </>
                  )}
                </div>

                <Controller
                  name="periodId"
                  control={control}
                  rules={{ required: "Requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="select-options"
                      placeholder="Elige una Opción"
                      options={periodsBd}
                      getOptionLabel={e => e.name}
                      getOptionValue={e => e.id}
                      noOptionsMessage={() => "Sin Opciones"}
                      onChange={e => {
                        setPeriod({ name: e.name, id: e.id });
                        setValue("periodId", e);
                      }}
                    />
                  )}
                />
              </div>
            </Grid>

            {period.name === "rango" ? (
              <>
                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p className="p">
                        Fecha de Inicio <strong>*</strong>
                      </p>
                      {errors.startRange && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.startRange?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      {...register("startRange", {
                        required: "*Requerido",
                      })}
                      className="input"
                      type="date"
                      id="startRange"
                      name="startRange"
                      onChange={e => setStartRange(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p className="p">
                        Fecha de Termino <strong>*</strong>
                      </p>
                      {errors.finishRange && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.finishRange?.message}</Error>
                        </>
                      )}
                    </div>

                    <input
                      {...register("finishRange", {
                        required: "*Requerido",
                      })}
                      className="input"
                      type="date"
                      onChange={e => setFinishRange(e.target.value)}
                    />
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p className="p">
                        Inicio de la meta <strong>*</strong>
                      </p>
                      {errors.monthPeriod && errors.monthPeriod.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>

                    <Controller
                      name="monthPeriod"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={monthsPeriodOptions}
                          isClearable={true}
                          onChange={e => (e === null ? handleMonths("") : handleMonths(e))}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${option.name}`}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p className="p">
                        Año <strong>*</strong>
                      </p>
                      {errors.yearPeriod && errors.yearPeriod.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>

                    <Controller
                      name="yearPeriod"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={yearPeriodOptions}
                          isClearable={true}
                          onChange={e => (e === null ? handleYear("") : handleYear(e))}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${option.name}`}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p className="p">
                        Durante {period.name && messageDurationPeriod(duration, period.name)} <strong>*</strong>
                      </p>
                      {errors.duration && (
                        <>
                          <div className="point"></div>
                          <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>

                    <input
                      type="number"
                      placeholder="Ingresa la duración"
                      name="duration"
                      id="duration"
                      className="input"
                      {...register("duration", {
                        required: "*Requerido",
                      })}
                      onChange={e => setDuration(e.target.value)}
                    />
                  </div>
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p className="p">
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
                  onChange={e => setGoal(e.target.value)}
                />
              </div>
            </Grid>
            {type.name === "Grupal" ? (
              <Grid item xs={12} md={12} style={{ marginTop: "1%" }}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <h4>Selecciona los grupos *</h4>
                    {errors.groupId && errors.groupId.type === "required" && (
                      <>
                        <div className="point"></div> <Error>{"*Requerido"}</Error>
                      </>
                    )}
                  </div>
                  <Controller
                    input
                    name="groupId"
                    id="guoupId"
                    control={control}
                    rules={{ required: true }}
                    value={[]}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        className="selectOption"
                        onChange={e => {
                          onChange, addGroups(e);
                        }}
                        isMulti
                        placeholder="Selecciona el grupo"
                        options={groupsBd}
                        getOptionValue={option => `${option["id"]}`}
                        getOptionLabel={option => `${option.name} `}
                      />
                    )}
                  />
                </div>
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
                    {errors.ejecutiveId && errors.ejecutiveId.type === "required" && (
                      <>
                        <div className="point"></div> <Error>{"*Requerido"}</Error>
                      </>
                    )}
                  </div>
                  <Controller
                    input
                    name="ejecutiveId"
                    control={control}
                    rules={{ required: true }}
                    value={[]}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={e => {
                          onChange, addEjecutives(e);
                        }}
                        isMulti
                        formatOptionLabel={e => FormatOptionsExecutiveGroup(e)}
                        placeholder="Selecciona el ejecutivo"
                        options={ejecutivesBd}
                        getOptionValue={option => `${option["id"]}`}
                        getOptionLabel={option => `${option.name} ${option.lastname} - ${option.email}`}
                      />
                    )}
                  />
                </div>
              </Grid>
            ) : (
              ""
            )}
            {type.name === "Empresarial" ? (
              <Grid item xs={12} md={12} style={{ marginTop: "1%" }}>
                <div className="ContentTitleandAlert">
                  <h4>Selecciona las empresas *</h4>
                  {errors.companyId && errors.companyId.type === "required" && (
                    <>
                      <div className="point"></div> <Error>{"*Requerido"}</Error>
                    </>
                  )}
                </div>
                <Controller
                  input
                  name="companyId"
                  id="companyId"
                  control={control}
                  rules={{ required: true }}
                  value={[]}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className="selectOption"
                      onChange={e => {
                        onChange, addCompanies(e);
                      }}
                      isMulti
                      placeholder="Selecciona compañia"
                      options={groupsBd}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} `}
                    />
                  )}
                />
              </Grid>
            ) : (
              ""
            )}

            <Grid container className="objetive">
              <Grid item xs={12} md={12} className="title">
                <h2>
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
                <thead className="ctr_table__head"></thead>
                <tbody className="ctr_table__body">
                  <tr className="row" onClick={() => {}}>
                    {array.map((item, index) => (
                      <td key={index} className="data">
                        <p className="date"> {` Del ${formatDates(item.initialperiodate)}`} </p>
                        <p className="date"> {` al ${formatDates(item.finalperiodate)}`} </p>
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
              {admin(roleId) ? (
                <Button className="btnGoal" onClick={() => setOpenModalNewNameGoal(true)}>
                  Agregar nombre de la meta
                </Button>
              ) : null}

              <Button
                disabled={isLoadingCreate}
                variant="outlined"
                color="primary"
                className={`btnsalir ${isLoadingCreate && "disabled"}`}
                onClick={() => navigateMetas()}
              >
                Cancelar
              </Button>
              <Button
                disabled={isLoadingCreate}
                variant="contained"
                color="primary"
                className={`btnGuardar ${isLoadingCreate && "disabled"}`}
                onClick={handleSubmit(createData)}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      <NewNameGoal
        open={openModalNewNameGoal}
        close={handleCloseModalNewNameGoal}
        categories={categoriesBd}
        refetch={refetchGoalsName}
        setRefetch={setRefetchGoalsName}
      />

      {isLoadingCreate && <LoaderCompleteScreen />}
    </NuevaMetaStyled>
  );
}

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
