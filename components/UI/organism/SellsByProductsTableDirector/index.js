import React, { useState } from "react";
import styled from "styled-components";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Box } from "@material-ui/core";
import { api, URL_SPACE } from "../../../../services/api";
import useFetch from "../../../../hooks/useFetch";
import { useEffect } from "react";
import { formatNumber } from "../../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SellsByProductsTableDirector() {
  const { groupSelected } = useSelector(dashboardDirectorSelector);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [isFetching, setisFetching] = useState();
  const [dataPie, setdataPie] = useState([]);

  let query = {
    // totalAmount: { $gte: 1 },
    // oportunity: {
    //   createdAt: {
    //     $gte: "2023-03-01T13:28:55.097Z",
    //   },
    // },
  };

  let params = {
    where: query,
    order: "-totalAmount",
    limit: 8,
  };

  const { data } = useFetch({
    path: "dashboard/clienttypesaleamount",
    params,
    condition: true,
    refetch: groupSelected,
  });

  const { results: categories = [] } = data;

  useEffect(() => {
    let labelsDateSet = categories.map((item, index) => item.name);

    let dataSetData = categories.map((item, index) => item.totalAmount);
    setLabels(labelsDateSet);
    setDataSets(dataSetData);
    let newData = categories.map((item, index) => {
      return {
        name: item.name,
        value: item.totalAmount,
      };
    });

    console.log(newData);

    setdataPie(newData);
  }, [categories]);

  const dataPieFake = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: dataSets,
        backgroundColor: [
          "#133f5c",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // if (groupSelected === null) {
  //   return <ResumeGroupDirectorStyled></ResumeGroupDirectorStyled>;
  // }

  return (
    <ResumeGroupDirectorStyled>
      <div className="top">
        <div className="row">
          <h3>Tipos de clientes principales </h3>
        </div>
      </div>

      <div className="graph">
        <div className="pie">
          <Pie data={dataPieFake} options={{ maintainAspectRatio: true }} />
        </div>
      </div>
    </ResumeGroupDirectorStyled>
  );
}

const ResumeGroupDirectorStyled = styled.div`
  min-height: 400px;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .top {
    display: flex;
  }
  h3 {
    text-transform: capitalize;
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
`;
