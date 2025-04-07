import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Drawer } from "@material-ui/core";
import Select from "react-select";
import { toUpperCaseChart } from "../../utils";
import { Close, InfoOutlined } from "@material-ui/icons";

export default function FiltersGoals(data) {
  useEffect(() => {
    if (data.endPeriod !== "" && data.initialPeriod !== "") {
      if (data.endPeriod >= data.initialPeriod) {
        data.setRangeIsOk(true);
      } else {
        data.setRangeIsOk(false);
      }
    } else {
      data.setRangeIsOk(false);
    }
  }, [data.initialPeriod, data.endPeriod]);
  const handleSearchBy = (item) => {
    if (item === "") {
      data.setSearchBy({});
      data.setEjecutiveSearch({});
      data.setGroupSearch({});
    } else {
      data.setSearchBy(item);
      data.setGoalType({});
    }
  };
  const handleNamesGoals = (item) => {
    if (item === "") {
      data.setGoalNameId("");
    } else {
      data.setGoalNameId(item.id);
    }
  };
  const handleTypesGoals = (item) => {
    let goal = {
      id: item.id,
      name: item.name,
    };
    if (item === "") {
      data.setGoalType({});
    } else {
      data.setSearchBy({});
      data.setGroupSearch({});
      data.setEjecutiveSearch({});
      data.setGoalType(goal);
    }
  };
  const handlePeriod = (item) => {
    if (item === "") {
      data.setPeriodName("");
      data.setInitialPeriod("");
      data.setEndPeriod("");
    } else {
      data.setPeriodName(item);
    }
  };
  const handleEjecutive = (item) => {
    if (item === "") {
      data.setEjecutiveSearch({});
    } else {
      let ejecutive = {
        id: item.id,
        name: item.name,
        lastname: item.lastname,
        email: item.email,
      };
      data.setEjecutiveSearch(ejecutive);
      data.setGroupSearch({});
    }
  };
  const handleGroup = (item) => {
    if (item === "") {
      data.setGroupSearch({});
    } else {
      let group = {
        id: item.id,
        name: item.name,
      };
      data.setEjecutiveSearch({});
      data.setGroupSearch(group);
    }
  };
  const applyButton = () => {
    data.setRefetch(!data.refetch);
    data.setOpen(!data.open);
    data.setPage(1);
  };
  const cancelButton = () => {
    data.setOpen(!data.open);
    data.setSearchBy({});
    data.setGoalNameId("");
    data.setGoalType({});
    data.setPeriodName("");
    data.setInitialPeriod("");
    data.setEndPeriod("");
    data.setEjecutiveSearch({});
    data.setRefetch(!data.refetch);
  };
  const showSelectSearchBy = (search) => {
    switch (search) {
      case "ejecutive":
        return (
          <Select
            className="drawerContainer__selectContainer__Select space"
            placeholder="Selecciona al Ejecutivo"
            isClearable={true}
            options={data.dataEjecutives}
            value={data.dataEjecutives.filter((item) => item.id === data.ejecutiveSearch.id)}
            onChange={(e) => (e === null ? handleEjecutive("") : handleEjecutive(e))}
            getOptionValue={(option) => `${option["id"]}`}
            getOptionLabel={(option) => `${toUpperCaseChart(option.name + " " + option.lastname)} - ${option.email} `}
          />
        );
      case "group":
        return (
          <Select
            className="drawerContainer__selectContainer__Select space"
            placeholder="Selecciona el Grupo"
            isClearable={true}
            options={data.dataGroups}
            value={data.dataGroups?.filter((item) => item.id === data?.groupSearch.id)}
            onChange={(e) => (e === null ? handleGroup("") : handleGroup(e))}
            getOptionValue={(option) => `${option["id"]}`}
            getOptionLabel={(option) => `${toUpperCaseChart(option.name)}`}
          />
        );
      default:
        break;
    }
  };

  return (
    <DrawerFilters
      anchor="right"
      open={data.open}
      onClose={() => {
        data.setOpen(!data.open);
      }}
    >
      <div className="drawerContainer">
        <div className="drawerContainer__header">
          <p className="drawerContainer__header__title">Filtra por tu preferencia</p>
          <Close className="drawerContainer__header__icon" onClick={() => data.setOpen(!data.open)} />
        </div>
        <div className="drawerContainer__body">
          <div className="drawerContainer__selectContainer">
            <p className="drawerContainer__selectContainer__title">Buscar por</p>
            <Select
              className="drawerContainer__selectContainer__Select"
              placeholder="Selecciona búsqueda por..."
              isClearable={true}
              options={optionsSearch}
              value={optionsSearch.filter((item) => item.value === data?.searchBy.value)}
              onChange={(e) => (e === null ? handleSearchBy("") : handleSearchBy(e))}
              getOptionValue={(option) => `${option["value"]}`}
              getOptionLabel={(option) => `${toUpperCaseChart(option.name)} `}
            />
            {showSelectSearchBy(data.searchBy.value)}
          </div>
          <div className="drawerContainer__selectContainer">
            <p className="drawerContainer__selectContainer__title">Periodo</p>
            <Select
              className="drawerContainer__selectContainer__Select"
              placeholder="Selecciona el Periodo"
              isClearable={true}
              options={optionsPeriods}
              value={data.periodName}
              onChange={(e) => (e === null ? handlePeriod("") : handlePeriod(e))}
            />
          </div>
          {data.periodName.value === "period" && (
            <div className="drawerContainer__datePeriod">
              <div className="drawerContainer__datePeriod__containerDates">
                <div className="dateContainerLeft">
                  <p className="dateContainerLeft__title">Inicio</p>
                  <input
                    className="inputDate"
                    type="date"
                    value={data.initialPeriod}
                    onChange={(e) => data.setInitialPeriod(e.target.value)}
                  />
                </div>
                <div className="dateContainerRight">
                  <p className="dateContainerRight__title">Fin</p>
                  <input className="inputDate" type="date" value={data.endPeriod} onChange={(e) => data.setEndPeriod(e.target.value)} />
                </div>
              </div>
              {data.rangeIsOk === false && (
                <div className="alert">
                  <InfoOutlined className="alert__iconAlert" />
                  <p className="alert__title">La Fecha de Inicio No puede ser Menor a la de Fin</p>
                </div>
              )}
            </div>
          )}

          <div className="drawerContainer__selectContainer">
            <p className="drawerContainer__selectContainer__title">Metas</p>
            <Select
              className="drawerContainer__selectContainer__Select"
              placeholder="Selecciona el Tipo de Meta"
              isClearable={true}
              options={data.dataGoalNames}
              value={data.dataGoalNames.filter((item) => item.id === data.goalNameId)}
              onChange={(e) => (e === null ? handleNamesGoals("") : handleNamesGoals(e))}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) => `${toUpperCaseChart(option.name)} `}
            />
          </div>
          <div className="drawerContainer__selectContainer">
            <p className="drawerContainer__selectContainer__title">Mostrar</p>
            <Select
              className="drawerContainer__selectContainer__Select"
              placeholder="Selecciona las Metas a Mostrar"
              isClearable={true}
              options={data.dataGoalTypes}
              value={data.dataGoalTypes.filter((item) => item.id === data.goalType?.id)}
              onChange={(e) => (e === null ? handleTypesGoals("") : handleTypesGoals(e))}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) => `${toUpperCaseChart(option.name)} `}
            />
          </div>
        </div>
        <div className="drawerContainer__buttons">
          <button className="drawerContainer__buttons__cancel" onClick={() => cancelButton()}>
            Cancelar
          </button>
          <button className="drawerContainer__buttons__accept" onClick={() => applyButton()}>
            Aplicar
          </button>
        </div>
      </div>
    </DrawerFilters>
  );
}

export const DrawerFilters = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .drawerContainer {
    &__header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      &__title {
        font-size: 16px;
        font-weight: bold;
      }
      &__icon {
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__selectContainer {
      margin-bottom: 15px;
      .space {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      &__title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
      }
      &__Select {
        width: 100%;
      }
    }
    &__datePeriod {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      &__containerDates {
        display: flex;
        justify-content: space-between;

        .dateContainerLeft {
          width: 100%;
          &__title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .inputDate {
            background-color: hsl(0, 0%, 100%);
            border-color: hsl(0, 0%, 80%);
            border-radius: 4px;
            border-style: solid;
            border-width: 1px;
            min-height: 38px;
            outline: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            cursor: pointer;
            padding: 1px;
          }
        }
        .dateContainerRight {
          width: 100%;
          &__title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .inputDate {
            background-color: hsl(0, 0%, 100%);
            border-color: hsl(0, 0%, 80%);
            border-radius: 4px;
            border-style: solid;
            border-width: 1px;
            min-height: 38px;
            outline: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            cursor: pointer;
            padding: 1px;
          }
        }
      }
    }
    .alert {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 5px;
      border-radius: 5px;
      margin-top: 10px;
      background-color: rgb(255, 0, 0, 0.1);
      &__title {
        font-size: 14px;
        font-weight: 500;
      }
      &__iconAlert {
        font-size: 18px;
        margin-right: 5px;
        color: red;
      }
    }
    &__buttons {
      display: flex;
      justify-content: right;
      margin-top: 40px;
      &__cancel {
        background: #0c203b;
        margin-right: 10px;
        color: #fff;
        text-transform: capitalize;
        border: 1px solid transparent;
        padding: 6px 16px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        &:hover {
          cursor: pointer;
        }
      }
      &__accept {
        background: #405189;
        border: 1px solid transparent;
        color: #fff;
        text-transform: capitalize;
        padding: 6px 16px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
const optionsPeriods = [
  {
    label: "Especificar Periodo",
    value: "period",
  },
  {
    label: "Año Actual",
    value: "year now",
  },
  {
    label: "Semestre Actual",
    value: "semestry now",
  },
  {
    label: "Cuatrimestre Actual",
    value: "four-month now",
  },
  {
    label: "Trimestre Actual",
    value: "trimestry now",
  },
  {
    label: "Bimestre Actual",
    value: "bimestry now",
  },
  {
    label: "Mes Actual",
    value: "month now",
  },
  // {
  //   label: "Quincena Actual",
  //   value: "fortnight now",
  // },
  {
    label: "Semana Actual",
    value: "week now",
  },
  {
    label: "Hoy",
    value: "today",
  },
  {
    label: "Año Pasado",
    value: "year past",
  },
  // {
  //   label: "Semestre Pasado",
  //   value: "semestry past",
  // },
  // {
  //   label: "Cuatrimestre Pasado",
  //   value: "four-month past",
  // },
  // {
  //   label: "Trimestre Pasado",
  //   value: "trimestry past",
  // },
  // {
  //   label: "Bimestre Pasado",
  //   value: "bimestry past",
  // },
  {
    label: "Mes Pasado",
    value: "month past",
  },
  // {
  //   label: "Quincena Pasada",
  //   value: "fortnight past",
  // },
  {
    label: "Semana Pasada",
    value: "week past",
  },
  {
    label: "Ayer",
    value: "yesterday",
  },
];
const optionsSearch = [
  {
    name: "Nombre del Ejecutivo",
    value: "ejecutive",
  },
  {
    name: "Nombre del Grupo",
    value: "group",
  },
];
