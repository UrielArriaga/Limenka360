import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import { Button, Dialog } from "@material-ui/core";
import { Add, Beenhere, Cached, FilterList } from "@material-ui/icons";
import { MetasStyled, DialogAlert } from "../../styles/Herramientas/metas.styles";
import TableGoals from "../../components/TableGoals";
import FiltersGoals from "../../components/DrawerFiltersGoals";
import dayjs from "dayjs";
import router from "next/router";
import { api } from "../../services/api";
import { Pagination } from "@material-ui/lab";
import { Chip, Tooltip } from "@mui/material";

export default function Tags() {
  const [dataGoals, setDataGoals] = useState([]);
  const [totalGoals, setTotalGoals] = useState(0);
  const [dataGoalNames, setDataGoalNames] = useState([]);
  const [dataGoalTypes, setDataGoalTypes] = useState([]);
  const [arrayChips, setArrayChips] = useState([]);
  const [dataEjecutives, setDataEjecutives] = useState([]);
  const [dataGroups, setDataGroups] = useState([]);
  const [goalNameId, setGoalNameId] = useState("");
  const [goalType, setGoalType] = useState({});
  const [periodName, setPeriodName] = useState("");
  const [initialPeriod, setInitialPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [ejecutiveSearch, setEjecutiveSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [searchBy, setSearchBy] = useState({});
  const [forDeleteGoal, setForDeleteGoal] = useState({});
  const [limit, setLimit] = useState(14);
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [rangeIsOk, setRangeIsOk] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const totalPages = Math.ceil(totalGoals / limit);
  const navigateCreateNew = () => {
    router.push("../herramientas/nuevaMeta");
  };
  useEffect(() => {
    getInfoPage();
  }, []);
  useEffect(() => {
    getGoals();
  }, [page, refetch]);

  const generateFilters = () => {
    let query = {};
    let inQuery = {};
    query.goal = inQuery;
    if (goalNameId !== "") inQuery.goalnameId = goalNameId;
    if (goalType.id !== undefined) inQuery.goaltypeId = goalType.id;
    if (ejecutiveSearch.id !== undefined) query.ejecutiveId = ejecutiveSearch.id;
    if (groupSearch.id !== undefined) query.groupId = groupSearch.id;
    switch (periodName.value) {
      case "period":
        if (rangeIsOk === true) {
          let startPeriod = dayjs(initialPeriod).format("YYYY-MM-DD");
          let finishPeriod = dayjs(endPeriod).format("YYYY-MM-DD");
          query.initialperiodate = {
            $gte: `${startPeriod}T05:00:00.000Z`,
            $lte: `${finishPeriod}T05:00:00.000Z`,
          };
        }
        break;
      case "year now":
        let startYear = dayjs().startOf("year").format("YYYY-MM-DD");
        let endYear = dayjs(startYear).endOf("year").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = { $gte: `${startYear}T05:00:00.000Z`, $lte: `${endYear}T05:00:00.000Z` };
        break;
      case "semestry now":
        let calculateDateSemestry = Number(dayjs().startOf("month").format("MM"));
        let startSemestry;
        let endSemestry;
        if (calculateDateSemestry <= 6) {
          startSemestry = dayjs().startOf("year").format("YYYY-MM-DD");
          endSemestry = dayjs(startSemestry).add(6, "month").format("YYYY-MM-DD");
        } else {
          startSemestry = dayjs().startOf("year").add(6, "month").format("YYYY-MM-DD");
          endSemestry = dayjs(startSemestry).add(6, "month").format("YYYY-MM-DD");
        }
        query.initialperiodate = {
          $gte: `${startSemestry}T05:00:00.000Z`,
          $lte: `${endSemestry}T05:00:00.000Z`,
        };
        break;
      case "four-month now":
        let calculateDateFourMonth = Number(dayjs().startOf("month").format("MM"));
        let startFourMonth;
        let endFourMonth;
        if (calculateDateFourMonth <= 4) {
          startFourMonth = dayjs().startOf("year").format("YYYY-MM-DD");
          endFourMonth = dayjs(startFourMonth).add(4, "month").format("YYYY-MM-DD");
        }
        if (calculateDateFourMonth >= 5 && calculateDateFourMonth <= 8) {
          startFourMonth = dayjs().startOf("year").add(4, "month").format("YYYY-MM-DD");
          endFourMonth = dayjs(startFourMonth).add(4, "month").format("YYYY-MM-DD");
        }
        if (calculateDateFourMonth >= 9 && calculateDateFourMonth <= 12) {
          startFourMonth = dayjs().startOf("year").add(8, "month").format("YYYY-MM-DD");
          endFourMonth = dayjs(startFourMonth).add(4, "month").format("YYYY-MM-DD");
        }
        query.initialperiodate = {
          $gte: `${startFourMonth}T05:00:00.000Z`,
          $lte: `${endFourMonth}T05:00:00.000Z`,
        };
        break;
      case "trimestry now":
        let calculateDateTrimestry = Number(dayjs().startOf("month").format("MM"));
        let startTrimestry;
        let endTrimestry;
        if (calculateDateTrimestry <= 3) {
          startTrimestry = dayjs().startOf("year").format("YYYY-MM-DD");
          endTrimestry = dayjs(startTrimestry).add(3, "month").format("YYYY-MM-DD");
        }
        if (calculateDateTrimestry >= 4 && calculateDateTrimestry <= 6) {
          startTrimestry = dayjs().startOf("year").add(3, "month").format("YYYY-MM-DD");
          endTrimestry = dayjs(startTrimestry).add(3, "month").format("YYYY-MM-DD");
        }
        if (calculateDateTrimestry >= 7 && calculateDateTrimestry <= 9) {
          startTrimestry = dayjs().startOf("year").add(6, "month").format("YYYY-MM-DD");
          endTrimestry = dayjs(startTrimestry).add(6, "month").format("YYYY-MM-DD");
        }
        if (calculateDateTrimestry >= 10 && calculateDateTrimestry <= 12) {
          startTrimestry = dayjs().startOf("year").add(9, "month").format("YYYY-MM-DD");
          endTrimestry = dayjs(startTrimestry).add(9, "month").format("YYYY-MM-DD");
        }
        query.initialperiodate = {
          $gte: `${startTrimestry}T05:00:00.000Z`,
          $lte: `${endTrimestry}T05:00:00.000Z`,
        };
        break;
      case "bimestry now":
        let calculateDateBimestry = Number(dayjs().startOf("month").format("MM"));
        let startBimestry;
        let endBimestry;
        if (calculateDateBimestry <= 2) {
          startBimestry = dayjs().startOf("year").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        if (calculateDateBimestry >= 3 && calculateDateBimestry <= 4) {
          startBimestry = dayjs().startOf("year").add(2, "month").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        if (calculateDateBimestry >= 5 && calculateDateBimestry <= 6) {
          startBimestry = dayjs().startOf("year").add(4, "month").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        if (calculateDateBimestry >= 7 && calculateDateBimestry <= 8) {
          startBimestry = dayjs().startOf("year").add(6, "month").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        if (calculateDateBimestry >= 9 && calculateDateBimestry <= 10) {
          startBimestry = dayjs().startOf("year").add(8, "month").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        if (calculateDateBimestry >= 11 && calculateDateBimestry <= 12) {
          startBimestry = dayjs().startOf("year").add(10, "month").format("YYYY-MM-DD");
          endBimestry = dayjs(startBimestry).add(2, "month").format("YYYY-MM-DD");
        }
        query.initialperiodate = {
          $gte: `${startBimestry}T05:00:00.000Z`,
          $lte: `${endBimestry}T05:00:00.000Z`,
        };
        break;
      case "month now":
        let startMonth = dayjs().startOf("month").format("YYYY-MM-DD");
        let endMonth = dayjs(startMonth).endOf("month").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = { $gte: `${startMonth}T05:00:00.000Z`, $lte: `${endMonth}T05:00:00.000Z` };
        break;
      case "fortnight now":
        break;
      case "week now":
        let startWeek = dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD");
        let endWeek = dayjs(startWeek).endOf("week").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = { $gte: `${startWeek}T05:00:00.000Z`, $lte: `${endWeek}T05:00:00.000Z` };
        break;
      case "today":
        let startToday = dayjs().format("YYYY-MM-DD");
        let endToday = dayjs(startToday).add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = { $gte: `${startToday}T05:00:00.000Z`, $lte: `${endToday}T05:00:00.000Z` };
        break;
      case "year past":
        let startYearPast = dayjs().subtract(1, "year").startOf("year").format("YYYY-MM-DD");
        let endYearPast = dayjs(startYearPast).endOf("year").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = {
          $gte: `${startYearPast}T05:00:00.000Z`,
          $lte: `${endYearPast}T05:00:00.000Z`,
        };
        break;
      case "semestry past":
        break;
      case "four-month past":
        break;
      case "trimestry past":
        break;
      case "bimestry past":
        break;
      case "month past":
        let startMonthPast = dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
        let endMonthPast = dayjs(startMonthPast).endOf("month").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = {
          $gte: `${startMonthPast}T05:00:00.000Z`,
          $lte: `${endMonthPast}T05:00:00.000Z`,
        };
        break;
      case "fortnight past":
        break;
      case "week past":
        let startWeekPast = dayjs().subtract(1, "week").startOf("week").add(1, "day").format("YYYY-MM-DD");
        let endWeekPast = dayjs(startWeekPast).endOf("week").add(2, "day").format("YYYY-MM-DD");
        query.initialperiodate = {
          $gte: `${startWeekPast}T05:00:00.000Z`,
          $lte: `${endWeekPast}T05:00:00.000Z`,
        };
        break;
      case "yesterday":
        let startYesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        let endYesterday = dayjs().format("YYYY-MM-DD");
        query.initialperiodate = {
          $gte: `${startYesterday}T05:00:00.000Z`,
          $lte: `${endYesterday}T05:00:00.000Z`,
        };
        break;
      default:
        let defaultStart = dayjs().startOf("month").format("YYYY-MM-DD");
        let defaultEnd = dayjs(defaultStart).endOf("month").add(1, "day").format("YYYY-MM-DD");
        query.initialperiodate = {
          $gte: `${defaultStart}T05:00:00.000Z`,
          $lte: `${defaultEnd}T05:00:00.000Z`,
        };
        break;
    }
    return query;
  };

  const getInfoPage = async () => {
    try {
      let responseGoalNames = await api.get(`goalnames?order=name&limit=100&all=1`);
      let resultsNames = responseGoalNames.data.results;
      setDataGoalNames(resultsNames);
      let responseGoalTypes = await api.get(`goaltypes?order=name&limit=100&all=1`);
      let resultsTypes = responseGoalTypes.data.results;
      setDataGoalTypes(resultsTypes);
      let responseEjecutives = await api.get(`ejecutives?order=name&limit=100&all=1`);
      let resultsEjecutives = responseEjecutives.data.results;
      setDataEjecutives(resultsEjecutives);
      let responseGroups = await api.get(`groups?order=name&limit=100&all=1`);
      let resultsGroups = responseGroups.data.results;
      setDataGroups(resultsGroups);
    } catch (error) {
      console.log(error);
    }
  };

  const validateIncludes = (type) => {
    let includes;
    if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
      includes = "ejecutive,group,company,goal,goal.goaltype,goal.goalname";
    } else {
      includes = "ejecutive,group,company,goal,goal.goaltype.goalname";
    }
    return includes;
  };
  const validateJoins = (type) => {
    let joins;
    if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
      joins = "1,2,3,goal,goal.goaltype,goal.goalname";
    } else {
      joins = "1,2,3,goal,goal.goaltype.goalname";
    }
    return joins;
  };

  const getGoals = async () => {
    setIsLoadingTable(true);
    try {
      let query = generateFilters();
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "0",
        order: "-createdAt",
        skip: page,
      };
      params.include = validateIncludes(goalType.name);
      params.join = validateJoins(goalType.name);
      let responseGoals = await api.get(`ejecutivesgoals`, { params });
      let results = responseGoals?.data.results;
      setTotalGoals(responseGoals.data.count);
      setDataGoals(results);
      setIsLoadingTable(false);
    } catch (error) {
      setIsLoadingTable(false);
      console.log(error);
    }
  };
  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteGoal = (goal) => {
    setOpenAlertDelete(true);
    setForDeleteGoal(goal);
  };

  const deleteGoal = async () => {
    try {
      api.delete(`ejecutivesgoals/${forDeleteGoal.id}`);
      setRefetch(!refetch);
      setOpenAlertDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlertClose = () => {
    setOpenAlertDelete(false);
  };

  return (
    <MetasStyled>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="container">
          <div className="head">
            <div className="head__titles">
              <h1>Metas </h1>
              <div className="head__titles__results">
                <Beenhere className="head__titles__results__icon" />
                <p className="head__titles__results__total">{totalGoals}</p>
                <p>Registros</p>
                <Tooltip title="Recargar Datos" arrow>
                  <Cached
                    className="head__titles__results__iconReload"
                    onClick={() => setRefetch(!refetch)}
                  />
                </Tooltip>
              </div>
            </div>
            <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
              <Add />
              <p>Agregar Meta</p>
            </Button>
          </div>
          <div className="ctr_filter">
            <button onClick={() => setOpenFilters(true)} className="ctr_filter__button">
              <p className="ctr_filter__button__title">Filtros</p>
              <FilterList />
            </button>
          </div>
          <div className="filters_chip">
            {arrayChips.map((item, index) => (
              <Chip
                key={index}
                color="primary"
                label={
                  item.type === "Busqueda por"
                    ? `${item.type} : ${toUpperCaseChart(item.name)} - "${nameSearch}"`
                    : `${item.type}: ${toUpperCaseChart(item.name)}`
                }
                onDelete={() => deleteChip(item)}
                className="filters_chip__chip"
              />
            ))}
          </div>
          <div className="table">
            <TableGoals
              dataGoals={dataGoals}
              totalGoals={totalGoals}
              isLoadingTable={isLoadingTable}
              handleDeleteGoal={handleDeleteGoal}
            />
          </div>
          <div className="tfooter">
            <div className="tfooter__ctr_pagination">
              <Pagination count={totalPages} color="primary" page={page} onChange={handlePage} />
            </div>
          </div>
        </div>
      </div>
      <FiltersGoals
        open={openFilters}
        setOpen={setOpenFilters}
        refetch={refetch}
        setRefetch={setRefetch}
        dataGoalNames={dataGoalNames}
        dataGoalTypes={dataGoalTypes}
        dataEjecutives={dataEjecutives}
        dataGroups={dataGroups}
        goalNameId={goalNameId}
        setGoalNameId={setGoalNameId}
        goalType={goalType}
        setGoalType={setGoalType}
        periodName={periodName}
        setPeriodName={setPeriodName}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        ejecutiveSearch={ejecutiveSearch}
        setEjecutiveSearch={setEjecutiveSearch}
        groupSearch={groupSearch}
        setGroupSearch={setGroupSearch}
        initialPeriod={initialPeriod}
        setInitialPeriod={setInitialPeriod}
        endPeriod={endPeriod}
        setEndPeriod={setEndPeriod}
        rangeIsOk={rangeIsOk}
        setRangeIsOk={setRangeIsOk}
        page={page}
        setPage={setPage}
      />
      <Dialog
        open={openAlertDelete}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogAlert>
          <p className="title">¿Desea Eliminar la Meta Seleccionada?</p>
          <div className="buttons">
            <button className="buttons__cancel" onClick={() => setOpenAlertDelete(false)}>
              Cancelar
            </button>
            <button className="buttons__accept" onClick={() => deleteGoal()}>
              Aceptar
            </button>
          </div>
        </DialogAlert>
      </Dialog>
    </MetasStyled>
  );
}
