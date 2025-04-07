import { Button, Dialog, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { DialogStyle } from "./styles";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ModalChart({ open, toggleModal, data: results, view }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${getChartTitle(view)}`,
      },
    },
  };
  const [ejecutiveGoalsData, setEjecutiveGoals] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    let [valuesProgress, labels] = normalizeValues(results);
    let datasetsOne = {
      label: `${getChartSubtitle(view)}`,
      data: valuesProgress,
      backgroundColor: "rgba(44, 175, 254,1)",
    };
    setEjecutiveGoals({
      labels,
      datasets: [datasetsOne],
    });
  }, [results]);

  const normalizeValues = ejecutives => {
    let valuesProgress = [];

    let labels = [];
    let ex = ejecutives.slice(0, ejecutives.length);

    ex.map(item => {
      valuesProgress.push(item.Total);
      labels.push(item["Nombre"]?.slice(0, 10));
    });

    return [valuesProgress, labels];
  };

  const [expand, setExpand] = useState(false);

  const expandChart = () => {
    setExpand(!expand);
  };

  return (
    <DialogStyle open={open} onClose={toggleModal} fullScreen={expand}>
      <div className="body">
        <div className="buttons">
          <IconButton className="button" onClick={expandChart}>
            {expand == false ? <Fullscreen className="iconScreen" /> : <FullscreenExit className="icon" />}
          </IconButton>
          <IconButton className="button" onClick={toggleModal}>
            <Close className="icon" />
          </IconButton>
        </div>
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
    </DialogStyle>
  );
}
const getChartTitle = viewType => {
  if (viewType?.type === "prospects") {
    return `Gráfica Prospectos`;
  }
  if (viewType?.type === "oportunities") {
    return `Gráfica Oportunidades`;
  }
  if (viewType?.type === "sales") {
    return `Gráfica Ventas `;
  }
  return "Gráfica";
};
const getChartSubtitle = viewType => {
  if (viewType?.view === "byprospectEntities") {
    return `Total prospectos por Estado`;
  }
  if (viewType?.view === "byprospectOrigins") {
    return ` Total prospectos por Origen`;
  }
  if (viewType?.view === "byprospectType") {
    return `Total prospectos por Tipo`;
  }
  if (viewType?.view === "bycategory") {
    return `Monto Por Producto`;
  }
  if (viewType?.view === "byentities") {
    return `Monto Por Estado`;
  }
  if (viewType?.view === "byorigin") {
    return `Monto Por Origen`;
  }
  if (viewType?.view === "bycategory") {
    return `Monto Por Producto`;
  }
  if (viewType?.view === "byphase") {
    return `Monto Por Fase`;
  }
  if (viewType?.view === "bytotalentities") {
    return `Total Por Estado`;
  }
  if (viewType?.view === "bytotalproducts") {
    return `Total Por Producto`;
  }
  if (viewType?.view === "bysalesOrigin") {
    return `Monto de ventas por Origen`;
  }
  if (viewType?.view === "bysalesEntities") {
    return `Monto de ventas por Estado`;
  }
  if (viewType?.view === "bysalesProducts") {
    return `Monto de ventas por Producto`;
  }

  return "Gráfica";
};
