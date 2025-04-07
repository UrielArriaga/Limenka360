import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, LabelList, ResponsiveContainer } from "recharts";
import { Tooltip } from "@material-ui/core";
import { formatNumber } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Add, Close, FilterList, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Button, Grid, IconButton, LinearProgress, withStyles } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
import SelectFiltersDirector from "../../atoms/SelectFiltersDirector";
import { Skeleton } from "@material-ui/lab";
import LoaderGoals from "../../molecules/LoaderGoalsDirector";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
export default function GoalsChartDirector() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { company } = useSelector(userSelector);
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  const [dataGoals, setDataGoals] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [totalGoals, setTotalGoals] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  //local storage goalsname
  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let filter = localStorage.getItem("goalsnameDirector");
    if (filter) {
      let objectFilter = JSON.parse(filter);
      if (objectFilter?.id) {
        setSearchBy(objectFilter);
      }
    }
  };

  const generateQuery = () => {
    let queryGoals = {};
    // queryGoals.companyId = company;
    queryGoals.initialperiodate = {
      $gte: startDateGlobal,
      $lte: finishDateGlobal,
    };

    if (searchBy !== "") {
      queryGoals.goal = {
        goalnameId: searchBy?.id,
      };
    } else {
      delete queryGoals.goal;
    }
    return {
      include: "goal,goal.goaltype,goal.goalname,group",
      where: JSON.stringify(queryGoals),
      skip: page,
      limit: limit,
      count: "1",
      order: "-progress",
    };
  };

  const { response, isFetching } = useFetch({
    path: "ejecutivesgoals",
    condition: true,
    params: generateQuery(),
    paramsfn: generateQuery,
    refetch: searchBy?.id,
    refetchPage: page,
  });

  const { response: resGoals, isFetching: isFetchingGoals } = useFetch({
    path: "goalnames",
    condition: true,
    params: {
      where: {
        companyId: company,
      },
      all: 1,
      order: "name",
    },
  });

  useEffect(() => {
    if (response) {
      let data = response.results.map((item, index) => ({
        name: item.goal.alias,
        item: item,
        Progreso: Number(item.progress),
        Meta: Number(item.finalgoal),
      }));
      setDataGoals(data);
      setTotalGoals(response.count);
    }
  }, [response, isFetching]);

  const handleClickFilter = value => {
    setShowFilters(value);
  };

  const handleOnChangeSelect = e => {
    if (e) {
      setSearchBy(e);
      saveDataLocalStorage("goalsnameDirector", e);
    } else {
      setSearchBy("");
      saveDataLocalStorage("goalsnameDirector", "");
    }
    if (page > 1) setPage(1);
  };
  const saveDataLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  if (response.results.length === 0) {
    return (
      <GoalsChartDirectorEmpty>
        <div className="container">
          <div className="title">
            <h3>Metas Actuales</h3>
            <Tooltip placement="top" title="Agregar nueva meta">
              <Add className="add" onClick={() => router.push("/herramientas/metas")} />
            </Tooltip>
          </div>
          <SelectFiltersDirector
            selectOptions={resGoals.results}
            changeFilterValue={handleOnChangeSelect}
            handleClickFilter={handleClickFilter}
            showList={showFilters}
            searchBy={searchBy}
            total={totalGoals}
          />
        </div>
        <div className="divider"></div>
        <div className="content">
          <div className="nodata">
            <p>No hay registros disponibles</p>
          </div>
          <p>
            Monitore los avances de tus grupos,crea nuevas metas por diferentes parameteros
            <span className="createnew">crear nueva meta</span>
          </p>
        </div>
      </GoalsChartDirectorEmpty>
    );
  }

  return (
    <GoalsChartDirectorStyled>
      <div className="container">
        <div className="title">
          <h3>Metas Actuales</h3>
          <Tooltip placement="top" title="Agregar nueva meta">
            <Add className="add" onClick={() => router.push("/herramientas/metas")} />
          </Tooltip>
        </div>
        <SelectFiltersDirector
          selectOptions={resGoals.results}
          changeFilterValue={handleOnChangeSelect}
          handleClickFilter={handleClickFilter}
          showList={showFilters}
          searchBy={searchBy}
          total={totalGoals}
        />
      </div>

      <div className="divider"></div>
      {isFetching ? (
        <div className="containerResults">
          <LoaderGoals />
        </div>
      ) : (
        <div className="containerResults">
          {response.results.map((item, index) => {
            const { progress, finalgoal } = item;
            return (
              <div key={index}>
                <Grid container className="">
                  <Grid item md={3} style={{ marginBottom: 10 }}>
                    <p className="titlegroup">{item?.group?.name}</p>
                    <p className="subtitle">{item.goal.goalname.name}</p>
                  </Grid>

                  <Grid item md={3}>
                    <p className="title">{item.identifier === "count" ? item.progress : formatNumber(item.progress)}</p>
                    <p className=" subtitle progress">Progreso</p>
                  </Grid>
                  <Grid item md={3}>
                    <p className="title">
                      {item.identifier === "count" ? item.finalgoal : formatNumber(item.finalgoal)}
                    </p>
                    <p className=" subtitle progress">Meta final</p>
                  </Grid>

                  <Grid item md={3}>
                    <p className="percentage">%{(progress / finalgoal).toFixed(3)}</p>
                    <BorderLinearProgress variant="determinate" value={(progress * 100) / finalgoal} />
                  </Grid>
                </Grid>
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
      )}

      <div className="tfooter">
        <div className="ctr_button"></div>
        <div className="ctr_pagination">
          <p className="total">{`Total de Metas: ${totalGoals}`}</p>
          <div className="pagination">
            <p className="totalPage">{`Paginas: ${page} - ${Math.ceil(totalGoals / limit) || 1}`}</p>
            <IconButton
              color="primary"
              disabled={page <= 1 ? true : false}
              className="pagination__before"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              color="primary"
              disabled={page >= Math.ceil(totalGoals / limit) ? true : false}
              className="pagination__next"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <NavigateNext />
            </IconButton>
          </div>
        </div>
      </div>
    </GoalsChartDirectorStyled>
  );
}

const GoalsChartDirectorEmpty = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;
  overflow-y: scroll;

  .container {
    display: flex;
    align-items: initial;
    justify-content: space-between;
  }
  .title {
    display: flex;
    align-items: flex-start;
    .add {
      background: #0d47a1c7;
      border-radius: 50%;
      color: rgb(255, 255, 255);
      margin-left: 6px;
      cursor: pointer;
    }
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
  }
  .createnew {
    color: ${colors.bgDirector};
    font-weight: bold;
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  .nodata {
    width: 100%;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    p {
      font-weight: bold;
    }
  }
`;

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 300 : 900],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
}))(LinearProgress);

const GoalsChartDirectorStyled = styled.div`
  background-color: #fff;
  padding: 15px 10px 10px 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;

  .container {
    display: flex;
    align-items: initial;
    justify-content: space-between;
  }
  .title {
    display: flex;
    align-items: flex-start;
    .add {
      background: #0d47a1c7;
      border-radius: 50%;
      color: rgb(255, 255, 255);
      margin-left: 6px;
      cursor: pointer;
    }
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .custom-tooltip {
    border-radius: 10px;
    padding: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  .filter {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    svg {
      cursor: pointer;
    }
  }

  .containerResults {
    height: 69%;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #9e9e9e;
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
    color: #512da8;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .ctr_pagination {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .total {
        font-weight: 500;
        color: #585858;
        font-size: 14px;
      }
      .pagination {
        display: flex;
        align-items: center;
        .totalPage {
          font-weight: 500;
          color: #585858;
          font-size: 13px;
        }

        &__before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
        &__next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
      }
    }
  }
`;
