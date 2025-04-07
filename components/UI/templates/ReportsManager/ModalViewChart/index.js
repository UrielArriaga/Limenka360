import { Button, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grafica Grupal",
    },
  },
};

export default function ModalViewChart({ open, toggleModal, data: results }) {
  //  const [dataSet, setdataSet] = useState(second)
  const [ejecutiveGoalsData, setEjecutiveGoals] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    let [valuesProgress, valuesGoals, labels] = normalizeValues(results);

    let datasetsOne = {
      label: "Cotizado",
      data: valuesProgress,
      backgroundColor: "rgba(44, 175, 254,1)",
    };

    let datasetsTwo = {
      label: "Vendido",
      data: valuesGoals,
      backgroundColor: "rgba(84, 79, 197, 1)",
    };

    setEjecutiveGoals({
      labels,
      datasets: [datasetsOne, datasetsTwo],
    });
  }, [results]);

  const normalizeValues = ejecutives => {
    let valuesProgress = [];
    let valuesGoals = [];
    let labels = [];
    let ex = ejecutives.slice(1, ejecutives.length);

    ex.map(item => {
      valuesProgress.push(item.Cotizado);
      valuesGoals.push(item.Vendido);
      labels.push(item["Nombre"].slice(0, 10));
    });

    return [valuesProgress, valuesGoals, labels];
  };

  const [expand, setExpand] = useState(false);

  const expandChart = () => {
    setExpand(!expand);
  };

  return (
    <DialogStyle open={open} onClose={toggleModal} fullScreen={expand}>
      <div className="body">
        <Button onClick={toggleModal}>Cerrar</Button>
        <Button onClick={expandChart}>Expandir</Button>
        <div className="chart">
          <Bar
            options={options}
            data={{
              labels: ejecutiveGoalsData.labels,
              datasets: ejecutiveGoalsData.datasets,
            }}
          />
        </div>
      </div>

      {/* </DialogStyle> */}
    </DialogStyle>
  );
}

export const DialogStyle = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    /* background-color: rgba(68, 138, 255, 0.3); */
    min-width: 900px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
  }
  .content {
    width: 100%;
  }

  .body {
    width: 100%;
    padding: 10px;
    overflow-y: auto;
  }

  .chart {
    width: 100%;
    /* height: 100%; */
    overflow: auto;
  }
`;
