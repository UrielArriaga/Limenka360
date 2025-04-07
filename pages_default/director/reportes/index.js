import React, { useState } from "react";
import DirectorLayout from "../../../layouts/DirectorLayout";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip as TooltipChart,
} from "chart.js";

import styled from "styled-components";

import {
  Avatar,
  Box,
  Button,
  Chip as CustomChip,
  IconButton,
  LinearProgress,
  MenuItem,
  Popover,
  Select,
  Tooltip,
} from "@material-ui/core";
import { Close, Delete, HourglassEmpty, MoreVert, RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import usePagination from "../../../hooks/usePagination";
import { api } from "../../../services/api";
import { colors } from "../../../styles/global.styles";
import { normalizeExecutivesPhases } from "../../../utils/normalizeData";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, TooltipChart, Legend);

export const ProspectosStyled = styled.div`
  overflow: hidden;
  height: 100%;
  background-color: #f1f1f1;
  td {
    :hover {
      cursor: pointer;
    }
  }
  box-shadow: 0 0 10px rgba(119, 108, 235, 0.5);
  transition: all 1s ease;
  * {
    margin: 0;
  }

  .main {
    height: 100%;
    overflow-y: scroll;
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    min-height: 284px;
  }

  .barcontainer {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    min-height: 290px;
    transition: transform 1s ease;
  }
  .chipscontainer {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    .chip {
      :hover {
        /* margin-bottom: 5px; */
        filter: grayscale(50%) blur(0px);
        transition: all 2s ease;
      }
    }
  }
  .filtercontainer {
    background-color: white;
    display: flex;
    width: calc(100% - 40px);
    flex-wrap: wrap;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 1em;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    .MuiSelect {
      height: 38px;
      &-select {
        :focus {
          background-color: transparent;
        }
      }
    }

    input {
      border-radius: 5px;
      width: 128px;
      height: 38px;
      z-index: 999;
    }
    &_selector {
      width: 140px;
      label {
        font-size: 14px;
        color: #757575;
      }
      &_select {
        width: 90%;
        background-color: white;
        height: 36px;
        input {
          :hover {
          }
          :focus {
          }
        }
      }
    }
    &_date {
      z-index: 51;
      width: 140px;

      .datepicker {
        z-index: 9999;
      }

      label {
        font-size: 14px;
        color: #757575;
      }
    }
    .react-datepicker__input-container {
      width: 10px;
    }

    &_input {
      width: 140px;

      label {
        font-size: 14px;
        color: #757575;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 18px 0px;
    transition: transform 1s ease;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head .totalrows {
    display: flex;
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
    transition: transform 1s ease;
  }

  // ** Start Search
  .search {
    margin-bottom: 20px;
  }

  .inputicon {
    position: relative;

    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
  // ** Finish Search

  // ** Start Filter Section
  .filters {
    display: inline-block;
    background-color: #dad8db;
    select {
      height: 30px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
    }
  }
  .currentfilters {
    .chip {
      background-color: #fff;
      color: ${colors.primaryColor};
      border: 1px solid ${colors.primaryColor};
      :hover {
        border: 1px solid rgba(119, 108, 235, 0.2);
      }
      svg {
        color: ${colors.primaryColor};
      }
    }
  }

  .titlegroup {
    font-weight: bold;
    color: #495057;
    text-transform: capitalize;
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }

  .percentage {
    text-align: right;
    font-size: 12px;
    color: #212121;
  }

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .row {
    display: flex;
    align-items: center;
    padding: 10px;

    .avatar {
      margin-right: 10px;
    }
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }
  .activefilterssection {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .disable {
    pointer-events: none;
    filter: blur(0.5px);
  }

  // ** Finish Filter Section
  #ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__img {
      width: 200px;
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
  .MuiPopover-paper,
  .popover-body {
    padding: 1em;
  }
`;

export const options = {
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      grid: {
        drawBorder: false,
        lineWidth: 0,
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        font: {
          size: 12,
        },
      },
    },

    title: {
      display: false,
      text: "Bla bla bla algo va aqui",
    },
  },
};

let colorsBars = ["lightgray"];
// This is UX better options but the pages given show above line look like,,,
let colorsBarsBorder = [
  "rgb(155, 93, 229,1)",
  "rgb(241, 91, 181,1)",
  "rgb(254, 228, 64,1)",
  "rgb(0, 187, 249,1)",
  "rgb(0, 245, 212,1)",
];
let colorsBarsTransparent = [
  "rgb(155, 93, 229,0.5)",
  "rgb(241, 91, 181,0.5)",
  "rgb(254, 228, 64,0.5)",
  "rgb(0, 187, 249,0.5)",
  "rgb(0, 245, 212,0.5)",
];

const getColors = (index, transparent) => {
  return transparent ? colorsBarsTransparent[index] : colorsBars[index];
};

const labels = ["Cotizado", "Esperando aprobación", "pospuesto"];

const heads = ["id", "ejecutivo", "cotizado", "esperando aprobacion", "pospuesto", "total"];

export default function Reportes() {
  const [executivesTable, setExecutivesTable] = useState([]);
  const [count, setCount] = useState(0);

  const [refetch, setRefetch] = useState(false);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  // const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  const [isFetchingExecutives, setIsFetchingExecutives] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState([
    { type: "Nombre", value: "todos", label: "{...Todos...}", active: false },
    { type: "Agrupar", value: "todos", label: "{...Todos...}", active: false },
    { type: "Tipo", value: "todos", label: "{...Todos...}", active: false },
    { type: "Grupo", value: "todos", label: "{...Todos...}", active: false },
    { type: "Ordenar", value: "fullname", label: "nombre", active: false },
    { type: "Periodo", value: "todos", label: "{...Todos...}", active: false },
  ]);

  const [query, setQuery] = useState(filters);

  const [optionsGroupBy] = useState([
    { value: "todos", label: "{...Todos...}" },
    { value: "executive", label: "Por ejecutivo" },
  ]);

  const [optionsTypes] = useState([
    { value: "todos", label: "{...Todos...}" },
    { value: "quantity", label: "Por cantidad" },
  ]);

  const [optionsPeriods] = useState([
    { value: "todos", label: "{...Todos...}" },
    { value: "week", label: "Semanal" },
    { value: "month", label: "Mensual" },
    { value: "year", label: "Año" },
  ]);
  const [optionsGroup, setOptionsGroup] = useState([{ value: "todos", label: "{...Todos...}" }]);
  const [orderBy] = useState([
    { value: "fullname", label: "Nombre completo" }, // Need back update
    { value: "updatedAt", label: "Actualizado" },
    { value: "updatedAt", label: "Cotizado" },
    { value: "updatedAt", label: "Esperando aprobación" },
    { value: "updatedAt", label: "Pospuesto" },
  ]);

  const [datasets, setDatasets] = useState([]);

  const data = {
    labels,
    datasets: datasets,
  };

  useEffect(() => {
    const getGroups = async () => {
      let res = await api.get("groups?all=1&order=name");
      setOptionsGroup(res.data.results);
      let aux = [{ value: "todos", label: "{...Todos...}" }];

      res.data.results.forEach(element => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setOptionsGroup(aux);
    };

    getGroups();
  }, []);

  useEffect(() => {
    getejecutivesquoteamounthistory();
    getejecutivesorigins();
    getejecutivesentities();
  }, [limit]);

  useEffect(() => {
    getejecutivesphases();
  }, [page, refetch]);

  useEffect(() => {
    let localFilters = localStorage.getItem("director_reports_table");
    if (localFilters) {
      let localFilterObject = JSON.parse(localFilters);
      setFilters(localFilterObject);
    } else {
      localStorage.setItem("director_reports_table", JSON.stringify(filters));
    }
  }, []);

  const getejecutivesphases = async () => {
    try {
      setIsFetchingExecutives(true);
      let localFilters = localStorage.getItem("director_reports_table");
      let localFilterObject;

      if (localFilters) {
        localFilterObject = JSON.parse(localFilters);
      }

      let newQuery = {};

      if (filters[0].value && filters[0].value !== "todos" && filters[0].value !== "") {
        newQuery.fullname = { iRegexp: `${filters[0].value.toLocaleLowerCase()}` };
      }

      if (filters[3].value !== "todos" && filters[3].value !== "") {
        newQuery.groupId = filters[3].value;
      }

      if (filters[5].value !== "todos" && filters[5].value !== "") {
        if (filters[5].value === "week") {
          newQuery.prospect = {
            createdAt: {
              $gte: dayjs(startDate).startOf("week").format(),
              $lte: dayjs(startDate).startOf("week").format(),
            },
          };
        }
        if (filters[5].value === "month") {
          newQuery.prospect = {
            createdAt: {
              $gte: dayjs(startDate).startOf("month").format(),
              $lte: dayjs(startDate).startOf("month").format(),
            },
          };
        }
        if (filters[5].value === "year") {
          newQuery.prospect = {
            createdAt: {
              $gte: dayjs(startDate).startOf("year").format(),
              $lte: dayjs(startDate).startOf("year").format(),
            },
          };
        }
      }

      let params = {
        count: 1,
        skip: page,
        limit: limit,
        where: JSON.stringify(newQuery),
        order: filters[4].value, // Comented until back get real order
        include: "company,group",
        join: "company,group",
      };
      let params2 = {
        count: 1,
        include: "company,group",
        join: "company,group",
      };

      let res = await api.get("dashboard/ejecutivesphases", { params: params });
      let realCount = await api.get("ejecutives", { params: params2 }); //needed to get real total
      setCount(realCount.data.count);

      let executivesNormalized = normalizeExecutivesPhases(res.data.results);
      setExecutivesTable(executivesNormalized);

      let datasetAux = executivesNormalized?.map((pivotExecutive, index) => {
        return {
          label: "Ejecutivo: " + pivotExecutive.ejecutivo?.charAt(0).toUpperCase() + pivotExecutive.ejecutivo.slice(1),
          data: [pivotExecutive["cotizado"], pivotExecutive["esperando aprobacion"], pivotExecutive["pospuesto"]],
          borderColor: getColors(index % 5, false),
          backgroundColor: getColors(index % 5, true),
        };
      });
      setIsFetchingExecutives(false);
      setDatasets(datasetAux);
      setCount(res.data.count);
      // setFilters(query)
    } catch (error) {
      console.log(error);
    }
  };

  const getejecutivesquoteamounthistory = async () => {
    try {
      let params = {
        count: 1,
        skip: page,
        limit: limit,
      };

      let res = await api.get("dashboard/ejecutivesquoteamounthistory", { params: params });
      // console.log("getejecutivesquoteamounthistory.data.results", res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getejecutivesorigins = async () => {
    try {
      let params = {
        count: 1,
        skip: page,
        limit: limit,
      };

      let res = await api.get("dashboard/ejecutivesorigins", { params: params });
      // console.log("getejecutivesorigins.data.results", res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getejecutivesentities = async () => {
    try {
      let params = {
        count: 1,
        skip: page,
        limit: limit,
      };

      let res = await api.get("dashboard/ejecutivesentities", { params: params });
      // console.log("getejecutivesentities.data.results", res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAplyFilters = () => {
    // if (filters != query) { //Se comenta, ya que subobjectos impiden la búsqueda
    handlePage(1);
    setQuery(filters);
    setRefetch(!refetch);
    // }
  };

  function updateFilterValue(index, newValue, label) {
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      value: newValue,
      label: label,
      active: label !== "{...Todos...}",
    };
    setFilters(updatedFilters);
    if (index === 0 && newValue === "") {
      onClickDelete(0);
    }
  }

  const onClickDelete = index => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], value: "todos", label: "{...Todos...}", active: false };
    setFilters(updatedFilters);
    setQuery(updatedFilters);
    setRefetch(!refetch);
    handlePage(1);
  };

  const handleKeyDown = event => {
    if (event?.key === "Enter") {
      handleAplyFilters();
    }
  };

  //
  const saveDataLocalStorage = () => {
    localStorage.setItem("director_reports_table", JSON.stringify(query));
  };

  const hadleClickName = id => {
    router.push({ pathname: "/ejecutivos/[prospecto]", query: { prospecto: id } });
  };

  const cleanFilters = () => {
    setFilters([
      { type: "Nombre", value: "todos", label: "{...Todos...}", active: false },
      { type: "Agrupar", value: "todos", label: "{...Todos...}", active: false },
      { type: "Tipo", value: "todos", label: "{...Todos...}", active: false },
      { type: "Grupo", value: "todos", label: "{...Todos...}", active: false },
      { type: "Ordenar", value: "fullname", label: "nombre", active: false },
      { type: "Periodo", value: "todos", label: "{...Todos...}", active: false },
    ]);
  };

  function dates() {
    var week = new Array();
    let current = new Date(startDate);
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  const onChangeDate = e => {
    setStartDate(e);
  };

  function showDate() {
    // This can be donde in T(t)=o(1) && T(s)=o(1)
    if (filters[5].value === "week") {
      return (
        <div className="filtercontainer_date">
          <label>Seleccionar semana</label>

          <ReactDatePicker
            className="datepicker"
            selected={startDate}
            onChange={date => onChangeDate(date)}
            dateFormat="dd/MM/yyyy"
            highlightDates={dates()}
            calendarStartDay={1}
          />
        </div>
      );
    } else if (filters[5].value === "month") {
      return (
        <div className="filtercontainer_date">
          <label>Seleccionar Mes</label>

          <ReactDatePicker
            className="datepicker"
            selected={startDate}
            onChange={date => onChangeDate(date)}
            dateFormat="MMM/yyyy"
            showMonthYearPicker
          />
        </div>
      );
    } else if (filters[5].value === "year") {
      return (
        <div className="filtercontainer_date">
          <label>Seleccionar año</label>

          <ReactDatePicker
            className="datepicker"
            selected={startDate}
            onChange={date => onChangeDate(date)}
            dateFormat="yyyy"
            showYearPicker
          />
        </div>
      );
    }
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <DirectorLayout>
      <ProspectosStyled>
        <div className="main">
          <div className="barcontainer">
            {isFetchingExecutives ? (
              <Box display="flex" justifyContent="center">
                <div id="ctr_load">
                  <div id="ctr_load__img">
                    <img src="/load.png" />
                  </div>
                  <div id="ctr_load__load">
                    <p>Cargando</p>
                    <LinearProgress color="primary" />
                  </div>
                </div>
              </Box>
            ) : (
              <Bar options={options} data={data} width={100} height={25} />
            )}
          </div>

          <div className={`chipscontainer ${isFetchingExecutives && "disable"}`}>
            <ActiveFilters filters={query} onClickDelete={onClickDelete} isFetchingExecutives={isFetchingExecutives} />
          </div>

          <div className={`filtercontainer ${isFetchingExecutives && "disable"}`} onKeyDown={e => handleKeyDown(e)}>
            <div className="filtercontainer_input">
              <label>Nombre</label>
              <input
                value={filters[0].value === "todos" ? "" : filters[0].value}
                onChange={e => updateFilterValue(0, e.target.value, e.target.value)}
                placeholder="Ejecutivo1"
              />
            </div>

            <div className="filtercontainer_selector">
              <label>Tipo</label>
              <Select variant="outlined" value={filters[2].value} className="filtercontainer_selector_select">
                {optionsTypes?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.value}
                      onClick={() => updateFilterValue(2, item.value, item.label)}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className="filtercontainer_selector">
              <label>Grupo</label>
              <Select variant="outlined" value={filters[3].value} className="filtercontainer_selector_select">
                {optionsGroup?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.value}
                      onClick={() => updateFilterValue(3, item.value, item.label)}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="filtercontainer_selector">
              <label>Ordenar</label>
              <Select variant="outlined" value={filters[4].value} className="filtercontainer_selector_select">
                {orderBy?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.value}
                      onClick={() => updateFilterValue(4, item.value, item.label)}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="filtercontainer_selector">
              <label>Periodo</label>
              <Select variant="outlined" value={filters[5].value} className="filtercontainer_selector_select">
                {optionsPeriods?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.value}
                      onClick={() => updateFilterValue(5, item.value, item.label)}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            {showDate()}
            <div className="btn">
              <Button variant="contained" color="primary" onClick={handleAplyFilters}>
                Aplicar
              </Button>
            </div>
            {/* <div className="btn"> 
               <IconButton variant="contained" color="primary" size="small" onClick={handleClick}>
                <MoreVert />
              </IconButton> 
            </div>*/}
          </div>

          <div className="container">
            <TableLimenka
              data={executivesTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              heads={heads}
              id="tableexecutivesresports"
              isFetching={isFetchingExecutives}
              customColums={[
                {
                  columname: "ejecutivo",
                  component: (item, itemData, isPar, isNew) => {
                    return (
                      <Tooltip title="Ver ejecutivo">
                        <td onClick={() => hadleClickName(itemData.itemBD.id)}>
                          <div className="row">
                            <div className="avatar">
                              <Avatar src={itemData.itemBD?.photo ? itemData.itemBD?.photo : ""} />
                            </div>
                            <div className="imagename">
                              <p className="titlegroup">{itemData.itemBD?.fullname}</p>
                              <p className="subtitle">
                                <b>Creado el: </b> {dayjs(itemData.itemBD?.createdAt).format("DD/MM/YYYY")}
                              </p>
                              <p className="subtitle">
                                <b>Grupo: </b>
                                {itemData.itemBD?.group?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                      </Tooltip>
                    );
                  },
                },
              ]}
            />
            <PaginationDirector count={count} limit={limit} handlePage={handlePage} page={page} typeOfTitle="grupos" />
          </div>
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="popover-body">
            <Button>opcion1</Button>
          </div>
        </Popover>
      </ProspectosStyled>
    </DirectorLayout>
  );
}

/**
 * Reports pages
 * @author Montoya
 */
function ActiveFilters({ filters, onClickDelete, isFetchingExecutives }) {
  // Para limpiar los valores correctamente:
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const handleClickDelete = () => {
      setNewValue(
        { type: "Nombre", value: "todos", label: "{...Todos...}", active: false },
        { type: "Agrupar", value: "todos", label: "{...Todos...}", active: false },
        { type: "Tipo", value: "todos", label: "{...Todos...}", active: false },
        { type: "Grupo", value: "todos", label: "{...Todos...}", active: false },
        { type: "Ordenar", value: "fullname", label: "nombre", active: false },
        { type: "Periodo", value: "todos", label: "{...Todos...}", active: false }
      );
    };

    window.addEventListener("click", handleClickDelete);

    return () => {
      window.removeEventListener("click", handleClickDelete);
    };
  }, []);

  const handleChange = e => {
    setNewValue(e.target.value ? e.target.value : "");
  };

  return (
    <div className="activefilterssection">
      {filters?.map((item, index) => {
        return (
          <CustomChip
            key={item.type}
            color="primary"
            size="small"
            onDelete={() => onClickDelete(index)}
            label={`${item.type} : ${item.label}`}
            disabled={!item.active}
            value={newValue}
            className="chip"
            style={{ marginRight: 10 }}
            onChange={handleChange}
            deleteIcon={!isFetchingExecutives ? item.active ? <Close /> : <RadioButtonUnchecked /> : <HourglassEmpty />}
          />
        );
      })}
    </div>
  );
}
