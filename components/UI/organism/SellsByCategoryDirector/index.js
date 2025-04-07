import React, { useState } from "react";
import styled from "styled-components";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Box, Tooltip as TooltipMaterial } from "@material-ui/core";
import { api, URL_SPACE } from "../../../../services/api";
import useFetch from "../../../../hooks/useFetch";
import { useEffect } from "react";
import { formatNumber } from "../../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { userSelector } from "../../../../redux/slices/userSlice";
import { FiberManualRecord } from "@material-ui/icons";
import PaginationTableHome from "../../molecules/PaginationTableHome";
import usePagination from "../../../../hooks/usePagination";
ChartJS.register(ArcElement, Tooltip, Legend);
const defaultColors = ["#6ada7d", "#fa896b", "#5ea3cb", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"];

export default function SellsByCategoryDirector({ groupId }) {
  const { page, limit, handlePage } = usePagination({ defaultLimit: 5, defaultPage: 1 });
  const { company, id_user } = useSelector(userSelector);
  const { groupSelected, startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [dataPie, setdataPie] = useState([]);

  let query = {
    companyId: company,
    system: false,
    oportunity: {
      iscloseout: true,
      soldat: {
        $gte: startDateGlobal,
        $lte: finishDateGlobal,
      },
    },
  };

  let params = {
    where: query,
    order: "-totalAmount",
    limit: limit,
    skip: page,
    count: 1,
  };

  const { data, isFetching } = useFetch({
    path: "dashboard/categoriesamount",
    params,
    condition: true,
    refetch: startDateGlobal,
    page: page,
  });

  const { results: categories = [], count } = data;

  useEffect(() => {
    let labelsDateSet = categories.map((item, index) => item.name);
    let dataSetData = categories.map((item, index) => item.totalAmount);
    setLabels(labelsDateSet);
    setDataSets(dataSetData);
    let newData = categories.map((item, index) => {
      return {
        name: item.name,
        value: item.totalAmount,
        color: defaultColors[index],
      };
    });
    setdataPie(newData);
  }, [categories]);

  const dataPieFake = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: dataSets,
        backgroundColor: defaultColors,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // if (groupSelected === null) {
  //   return <ResumeGroupDirectorStyled></ResumeGroupDirectorStyled>;
  // }

  if (isFetching) {
    return (
      <ResumeGroupDirectorStyled>
        <p>cargando</p>
      </ResumeGroupDirectorStyled>
    );
  }

  return (
    <ResumeGroupDirectorStyled>
      <div className="top">
        <div className="row">
          <h3>Categorias mas vendidas </h3>
        </div>
      </div>

      <div className="divider"></div>
      <div className="values">
        {dataPie.map((item, index) => {
          return (
            <NumberCard className="numbers" bg={item.color} key={index}>
              <div className="circle">
                <FiberManualRecord className={"icon"} />
              </div>
              <div className="column">
                <p className="total">{formatNumber(item.value)}</p>
                <TooltipMaterial title={item.name}>
                  <p className="title">{item.name.slice(0, 12)}...</p>
                </TooltipMaterial>
              </div>
            </NumberCard>
          );
        })}
      </div>
      <div className="graph">
        <div className="pie">
          <Pie
            data={dataPieFake}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>

      <PaginationTableHome title={"Categorias"} page={page} limit={limit} handlePage={handlePage} count={count} />
    </ResumeGroupDirectorStyled>
  );
}

const ResumeGroupDirectorStyled = styled.div`
  padding: 10px;
  min-height: 400px;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .top {
    display: flex;
  }
  h3 {
    text-transform: capitalize;
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
  .row {
    display: flex;
    align-items: center;
  }

  .graph {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie {
  }
  .values {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const NumberCard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  .icon {
    font-size: 12px;
    margin-right: 5px;

    color: ${props => props.bg};
  }
  .title {
    font-size: 12px;
    color: #878a99;
  }
  .total {
    color: #495057;
    font-weight: bold;
    font-size: 12px;
  }
`;
