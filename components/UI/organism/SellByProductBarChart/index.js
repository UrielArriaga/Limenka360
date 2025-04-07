import React, { useRef, useState } from "react";
import styled from "styled-components";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Box, Tooltip as TooltipMaterial } from "@material-ui/core";
import { api, URL_SPACE } from "../../../../services/api";
import useFetch from "../../../../hooks/useFetch";
import { useEffect } from "react";
import { formatNumber, formatNumberNoSymbol } from "../../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, getDatasetAtEvent, getElementsAtEvent, Pie } from "react-chartjs-2";
import { FiberManualRecord } from "@material-ui/icons";
import PaginationDirector from "../../molecules/PaginationDirector";
import usePagination from "../../../../hooks/usePagination";
import PaginationTableHome from "../../molecules/PaginationTableHome";
import { userSelector } from "../../../../redux/slices/userSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SellByProductBarChart() {
  const chartRef = useRef();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const { company } = useSelector(userSelector);
  const { groupSelected } = useSelector(dashboardDirectorSelector);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [dataPie, setdataPie] = useState([]);
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  let query = {
    totalAmount: { $gte: 1 },
    ejecutive: {
      companyId: company,
    },
    system: false,
    oportunity: {
      soldat: {
        $gte: startDateGlobal,
        $lte: finishDateGlobal,
      },
    },
  };
  let params = {
    where: query,
    order: "-totalAmount",
    limit: 10,
    skip: page,
    count: 1,
  };
  const { data, isFetching, handleRefetchRequest } = useFetch({
    path: "dashboard/productsalesamount",
    params,
    condition: true,
    refetch: startDateGlobal,
    page: page,
  });

  const { results: categories = [], count } = data;

  const defaultColors = ["#024b7a", "#171717", "#7a30ab", "#e083fa", "#b5d63d", "#e7e34e", "#c02323", "#1bd4d4"];

  useEffect(() => {
    let labelsDateSet = categories.map((item, index) => cutName(item.name));
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

  const cutName = name => {
    if (name && name.length > 10) {
      return `${name.slice(0, 10)}...`;
    }
    return name;
  };

  const onClick = event => {
    console.log(getElementsAtEvent(chartRef.current, event));
  };

  const refetchRequest = () => {
    handleRefetchRequest();
  };

  const dataPieFake = {
    labels: labels,
    datasets: [
      {
        label: "Total de ventas",
        data: dataSets,
        backgroundColor: defaultColors,
        borderColor: [
          "rgba(106, 218, 125,0.5)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <ResumeGroupDirectorStyled>
      {isFetching ? (
        <p>cargando</p>
      ) : (
        <>
          <div className="top">
            <div className="row">
              <h3>Productos mas vendidos </h3>
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
              <Bar
                height={400}
                data={dataPieFake}
                ref={chartRef}
                onClick={onClick}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <PaginationTableHome title={"Productos"} page={page} limit={limit} handlePage={handlePage} count={count} />
        </>
      )}
    </ResumeGroupDirectorStyled>
  );
}

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
const ResumeGroupDirectorStyled = styled.div`
  min-height: 400px;
  padding: 10px;
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
    height: 200px;
    width: 100%;
  }

  .values {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
